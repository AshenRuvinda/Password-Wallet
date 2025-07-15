"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import CreditCardDisplay from '../../components/CreditCardDisplay';
import { ICard } from '../../models/Card';
import Link from 'next/link';

interface CardWithId extends ICard {
  _id: string;
}

export default function CardsPage() {
  const [cards, setCards] = useState<CardWithId[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('/api/cards', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCards(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch cards');
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Your Cards
          </h2>
          <Link
            href="/cards/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add New Card
          </Link>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Cards Display */}
        {!isLoading && !error && (
          <div>
            {cards.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  No cards found. Get started by adding a new card!
                </p>
                <Link
                  href="/cards/add"
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                  Add Your First Card
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                  <div
                    key={card._id}
                    className="transform transition-all duration-500 ease-out"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CreditCardDisplay card={card} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .transform {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}