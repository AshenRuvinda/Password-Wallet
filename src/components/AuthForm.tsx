"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { validateAuthForm } from '../utils/validators';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface Props {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    masterPin: '',
    fullName: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const validationError = validateAuthForm(formData, type);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const url = type === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = type === 'login' 
        ? { email: formData.email, password: formData.password, masterPin: formData.masterPin }
        : formData;
      const res = await axios.post(url, payload);
      if (type === 'login') {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      } else {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container card max-w-md w-full"
        role="region"
        aria-labelledby={`${type}-form-title`}
      >
        <h2 id={`${type}-form-title`} className="text-3xl mb-6 text-center font-extrabold text-text dark:text-text-dark">
          {type === 'login' ? 'Login' : 'Register'}
        </h2>
        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href="/login"
            className={`nav-link ${pathname === '/login' ? 'nav-link-active' : ''}`}
            aria-current={pathname === '/login' ? 'page' : undefined}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`nav-link ${pathname === '/register' ? 'nav-link-active' : ''}`}
            aria-current={pathname === '/register' ? 'page' : undefined}
          >
            Register
          </Link>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="error-message mb-6"
            role="alert"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="success-message mb-6"
            role="status"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {success}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {type === 'register' && (
            <div className="input-group">
              <label htmlFor="fullName" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="input-field"
                placeholder="Enter your full name"
                aria-required="true"
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              placeholder="Enter your email"
              aria-required="true"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field pr-10"
                placeholder="Enter your password"
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn-icon absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="masterPin" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Master PIN
            </label>
            <div className="relative">
              <input
                id="masterPin"
                type={showPin ? 'text' : 'password'}
                value={formData.masterPin}
                onChange={(e) => setFormData({ ...formData, masterPin: e.target.value })}
                className="input-field pr-10"
                placeholder="Enter 4-digit PIN"
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="btn-icon absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {type === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="securityQuestion" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                  Security Question
                </label>
                <input
                  id="securityQuestion"
                  type="text"
                  value={formData.securityQuestion}
                  onChange={(e) => setFormData({ ...formData, securityQuestion: e.target.value })}
                  className="input-field"
                  placeholder="e.g., What is your pet's name?"
                  aria-required="true"
                />
              </div>
              <div className="input-group">
                <label htmlFor="securityAnswer" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                  Security Answer
                </label>
                <input
                  id="securityAnswer"
                  type="text"
                  value={formData.securityAnswer}
                  onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
                  className="input-field"
                  placeholder="Enter your answer"
                  aria-required="true"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="btn-primary w-full animate-pulse"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? <span className="loader" /> : (type === 'login' ? 'Login' : 'Register')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}