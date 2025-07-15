"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CreditCardDisplay from '../../components/CreditCardDisplay';
import axios from 'axios';
import { ICard } from '../../models/Card';
import { motion } from 'framer-motion';

export default function CardsPage() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view cards');
        router.push('/login');
        return;
      }

      try {
        const res = await axios.get('/api/cards', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCards(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setError('Failed to fetch cards');
        }
      }
    };
    fetchCards();
  }, [router]);

  const filteredCards = cards.filter(c => c.cardholderName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">Credit Cards</h1>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mb-6 text-center"
          >
            {error}
          </motion.p>
        )}
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 mb-6"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCards.map((card) => (
            <CreditCardDisplay key={card._id} card={card} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}