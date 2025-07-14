 "use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { validateSettingsForm } from '../../utils/validators';

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

  // Fetch current user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/auth/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFormData({
          fullName: res.data.fullName || '',
          masterPin: '', // Don't prefill sensitive data
          securityQuestion: res.data.securityQuestion || '',
          securityAnswer: '', // Don't prefill sensitive data
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
      await axios.put(
        '/api/auth/user',
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSuccess('Profile updated successfully');
      setTimeout(() => router.push('/dashboard'), 2000); // Redirect to dashboard after success
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm">Master PIN</label>
            <input
              type="password"
              value={formData.masterPin}
              onChange={(e) => setFormData({ ...formData, masterPin: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter new PIN (leave blank to keep current)"
            />
          </div>
          <div>
            <label className="block text-sm">Security Question</label>
            <input
              type="text"
              value={formData.securityQuestion}
              onChange={(e) => setFormData({ ...formData, securityQuestion: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm">Security Answer</label>
            <input
              type="text"
              value={formData.securityAnswer}
              onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter new answer (leave blank to keep current)"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
