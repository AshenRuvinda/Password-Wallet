"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { validateSettingsForm } from '../../utils/validators';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    masterPin: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/auth/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFormData({
          fullName: res.data.fullName || '',
          masterPin: '',
          securityQuestion: res.data.securityQuestion || '',
          securityAnswer: '',
        });
      } catch (err) {
        setError('Failed to load user data');
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateSettingsForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.put('/api/auth/user', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('Profile updated successfully');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container card animate-fadeInUp max-w-md"
      >
        <h2 className="text-3xl mb-6 text-center font-extrabold text-text dark:text-text-dark">
          Update Profile
        </h2>
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
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="success-message mb-6"
          >
            {success}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <div>
            <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Master PIN
            </label>
            <input
              type="password"
              value={formData.masterPin}
              onChange={(e) => setFormData({ ...formData, masterPin: e.target.value })}
              className="input-field"
              placeholder="Enter new 4-digit PIN (optional)"
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
              placeholder="Enter your answer (optional)"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
}