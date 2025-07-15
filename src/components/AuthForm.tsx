"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { validateAuthForm } from '../utils/validators';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
        role="region"
        aria-labelledby={`${type}-form-title`}
      >
        <h2 id={`${type}-form-title`} className="text-4xl font-bold text-white text-center mb-8 tracking-tight">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <div className="flex justify-center space-x-6 mb-8">
          <Link
            href="/login"
            className={`text-lg font-medium transition-all duration-300 ${
              pathname === '/login' ? 'text-white border-b-2 border-white' : 'text-gray-300 hover:text-white'
            }`}
            aria-current={pathname === '/login' ? 'page' : undefined}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`text-lg font-medium transition-all duration-300 ${
              pathname === '/register' ? 'text-white border-b-2 border-white' : 'text-gray-300 hover:text-white'
            }`}
            aria-current={pathname === '/register' ? 'page' : undefined}
          >
            Register
          </Link>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 bg-red-500/20 text-red-100 p-4 rounded-lg mb-6"
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 bg-green-500/20 text-green-100 p-4 rounded-lg mb-6"
              role="status"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </motion.p>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {type === 'register' && (
            <div className="input-group">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-200 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                placeholder="Enter your full name"
                aria-required="true"
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              placeholder="Enter your email"
              aria-required="true"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 pr-12"
                placeholder="Enter your password"
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="masterPin" className="block text-sm font-medium text-gray-200 mb-2">
              Master PIN
            </label>
            <div className="relative">
              <input
                id="masterPin"
                type={showPin ? 'text' : 'password'}
                value={formData.masterPin}
                onChange={(e) => setFormData({ ...formData, masterPin: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 pr-12"
                placeholder="Enter 4-digit PIN"
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {type === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="securityQuestion" className="block text-sm font-medium text-gray-200 mb-2">
                  Security Question
                </label>
                <input
                  id="securityQuestion"
                  type="text"
                  value={formData.securityQuestion}
                  onChange={(e) => setFormData({ ...formData, securityQuestion: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  placeholder="e.g., What is your pet's name?"
                  aria-required="true"
                />
              </div>
              <div className="input-group">
                <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-200 mb-2">
                  Security Answer
                </label>
                <input
                  id="securityAnswer"
                  type="text"
                  value={formData.securityAnswer}
                  onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  placeholder="Enter your answer"
                  aria-required="true"
                />
              </div>
            </>
          )}
          <motion.button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 flex items-center justify-center"
            disabled={isLoading}
            aria-busy={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              type === 'login' ? 'Login' : 'Register'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}