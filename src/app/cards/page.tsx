"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import CreditCardDisplay from '../../components/CreditCardDisplay';
import { ICard } from '../../models/Card';

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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-text dark:text-text-dark mb-8">
        Your Cards
      </h2>
      {cards.length === 0 ? (
        <p className="text-center text-text dark:text-text-dark">
          No cards found. Add a card to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <CreditCardDisplay key={card._id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}