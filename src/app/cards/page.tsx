"use client";

import { useState, useEffect } from 'react';
import CreditCardDisplay from '../../components/CreditCardDisplay';
import axios from 'axios';
import { ICard } from '../../models/Card';

export default function CardsPage() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get('/api/cards');
      setCards(res.data);
    };
    fetchCards();
  }, []);

  const filteredCards = cards.filter(c => c.cardholderName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Credit Cards</h1>
      <input
        type="text"
        placeholder="Search cards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
      />
      <div className="grid gap-4">
        {filteredCards.map((card) => (
          <CreditCardDisplay key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
}