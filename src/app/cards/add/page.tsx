"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { validateCardForm } from '../../../utils/validators';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function AddCardPage() {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    masterPin: '',
    cardType: 'Visa', // Default value
    bankName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const validationError = validateCardForm({
      cardholderName: formData.cardholderName,
      cardNumber: formData.cardNumber,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      cardType: formData.cardType,
    });
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('/api/cards/add', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('Card added successfully! Redirecting to dashboard...');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add card');
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
        aria-labelledby="add-card-form-title"
      >
        <h2 id="add-card-form-title" className="text-3xl mb-6 text-center font-extrabold text-text dark:text-text-dark">
          Add New Card
        </h2>
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
          <div className="input-group">
            <label htmlFor="cardholderName" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Cardholder Name
            </label>
            <input
              id="cardholderName"
              type="text"
              value={formData.cardholderName}
              onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
              className="input-field"
              placeholder="Enter cardholder name"
              aria-required="true"
            />
          </div>
          <div className="input-group">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="input-field"
              placeholder="Enter 16-digit card number"
              aria-required="true"
              maxLength={16}
            />
          </div>
          <div className="input-group">
            <label htmlFor="cardType" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Card Type
            </label>
            <select
              id="cardType"
              value={formData.cardType}
              onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
              className="input-field"
              aria-required="true"
            >
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Amex">American Express</option>
              <option value="Discover">Discover</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="bankName" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Bank Name (Optional)
            </label>
            <input
              id="bankName"
              type="text"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className="input-field"
              placeholder="Enter bank name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="text"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="input-field"
              placeholder="MM/YY"
              aria-required="true"
              maxLength={5}
            />
          </div>
          <div className="input-group">
            <label htmlFor="cvv" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              CVV
            </label>
            <div className="relative">
              <input
                id="cvv"
                type={showCvv ? 'text' : 'password'}
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="input-field pr-10"
                placeholder="Enter CVV"
                aria-required="true"
                maxLength={4}
              />
              <button
                type="button"
                onClick={() => setShowCvv(!showCvv)}
                className="btn-icon absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label={showCvv ? 'Hide CVV' : 'Show CVV'}
              >
                {showCvv ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="masterPin" className="block text-sm font-medium text-text dark:text-text-dark mb-1">
              Master PIN
            </label>
            <input
              id="masterPin"
              type="password"
              value={formData.masterPin}
              onChange={(e) => setFormData({ ...formData, masterPin: e.target.value })}
              className="input-field"
              placeholder="Enter your 4-digit PIN"
              aria-required="true"
              maxLength={4}
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full animate-pulse"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? <span className="loader" /> : 'Add Card'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}