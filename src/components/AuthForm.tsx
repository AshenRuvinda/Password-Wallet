"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { validateAuthForm } from '../utils/validators';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Props {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    masterPin: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateAuthForm(formData, type);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const url = type === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(url, formData);
      if (type === 'login') {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      } else {
        setError('Registration successful! Please log in.');
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container card max-w-md w-full"
      >
        <h2 className="text-3xl mb-6 text-center font-extrabold text-text dark:text-text-dark">
          {type === 'login' ? 'Login' : 'Register'}
        </h2>
        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href="/login"
            className={`nav-link px-4 py-2 rounded-lg text-sm font-medium ${
              pathname === '/login' ? 'nav-link-active' : ''
            }`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`nav-link px-4 py-2 rounded-lg text-sm font-medium ${
              pathname === '/register' ? 'nav-link-active' : ''
            }`}
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
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {type === 'register' && (
            <div>
              <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
          {type === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                  Master PIN
                </label>
                <input
                  type="password"
                  value={formData.masterPin}
                  onChange={(e) => setFormData({ ...formData, masterPin: e.target.value })}
                  className="input-field"
                  placeholder="Enter 4-digit PIN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                  Security Question
                </label>
                <input
                  type="text"
                  value={formData.securityQuestion}
                  onChange={(e) => setFormData({ ...formData, securityQuestion: e.target.value })}
                  className="input-field"
                  placeholder="e.g., What is your pet's name?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                  Security Answer
                </label>
                <input
                  type="text"
                  value={formData.securityAnswer}
                  onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
                  className="input-field"
                  placeholder="Enter your answer"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="btn-primary w-full"
          >
            {type === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}