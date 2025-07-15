"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { validateCardForm } from '../../../utils/validators';

export default function AddCardPage() {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    masterPin: '',
    cardType: 'Visa',
    bankName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const router = useRouter();

  // Input formatting
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv' || name === 'masterPin') {
      formattedValue = value.replace(/\D/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const validationData = {
      ...formData,
      cardNumber: formData.cardNumber.replace(/\s/g, ''),
    };

    const validationError = validateCardForm(validationData);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('/api/cards/add', validationData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('Card added successfully! Redirecting to dashboard...');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add card');
      setIsLoading(false);
    }
  };

  // Card type icon
  const getCardTypeIcon = () => {
    const icons = {
      Visa: 'https://github.com/AshenRuvinda/ProjectImages/blob/master/visa-1-logo-svg-vector.png?raw=true',
      MasterCard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
      Amex: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg',
      Discover: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Discover_Card_logo.svg',
    };
    return icons[formData.cardType] || icons.Visa;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
        role="region"
        aria-labelledby="add-card-form-title"
      >
        {/* Card Preview with Fixed Aspect Ratio */}
        <motion.div
          className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg overflow-hidden w-full aspect-[1.586/1] max-w-[400px] mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="relative h-full flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <CreditCardIcon className="w-10 h-10" />
              <img src={getCardTypeIcon()} alt={`${formData.cardType} logo`} className="h-6" />
            </div>
            <div className="text-lg font-mono tracking-wider">
              {formData.cardNumber || '**** **** **** ****'}
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-xs uppercase opacity-75">Cardholder</p>
                <p className="font-semibold truncate max-w-[150px]">
                  {formData.cardholderName || 'Your Name'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase opacity-75">Expires</p>
                <p className="font-semibold">{formData.expiryDate || 'MM/YY'}</p>
              </div>
              <div>
                <p className="text-xs uppercase opacity-75">CVV</p>
                <p className="font-semibold">{showCvv ? formData.cvv || '***' : '***'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <div className="space-y-6">
          <h2
            id="add-card-form-title"
            className="text-3xl font-extrabold text-gray-900 dark:text-white"
          >
            Add New Card
          </h2>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-200 p-4 rounded-lg flex items-center"
                role="alert"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-700 dark:text-green-200 p-4 rounded-lg flex items-center"
                role="status"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-4" noValidate onSubmit={handleSubmit}>
            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label
                htmlFor="cardholderName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Cardholder Name
              </label>
              <input
                id="cardholderName"
                name="cardholderName"
                type="text"
                value={formData.cardholderName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition"
                placeholder="Enter cardholder name"
                aria-required="true"
              />
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition font-mono"
                placeholder="1234 5678 9012 3456"
                aria-required="true"
                maxLength={19}
              />
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label
                htmlFor="cardType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Card Type
              </label>
              <select
                id="cardType"
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition"
                aria-required="true"
              >
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">American Express</option>
                <option value="Discover">Discover</option>
              </select>
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Bank Name (Optional)
              </label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition"
                placeholder="Enter bank name"
              />
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Expiry Date
              </label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="text"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition"
                placeholder="MM/YY"
                aria-required="true"
                maxLength={5}
              />
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                CVV
              </label>
              <div className="relative">
                <input
                  id="cvv"
                  name="cvv"
                  type={showCvv ? 'text' : 'password'}
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition pr-10"
                  placeholder="CVV"
                  aria-required="true"
                  maxLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  aria-label={showCvv ? 'Hide CVV' : 'Show CVV'}
                >
                  {showCvv ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label
                htmlFor="masterPin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Master PIN
              </label>
              <input
                id="masterPin"
                name="masterPin"
                type="password"
                value={formData.masterPin}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition"
                placeholder="Enter 4-digit PIN"
                aria-required="true"
                maxLength={4}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
              aria-busy={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Card...
                </>
              ) : (
                'Add Card'
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Custom Styles for Card Aspect Ratio */}
      <style jsx>{`
        .aspect-[1.586/1] {
          aspect-ratio: 1.586 / 1;
        }
      `}</style>
    </div>
  );
}