"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICard } from '../models/Card';

export default function CreditCardDisplay({ card }: { card: ICard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardStyles: { [key: string]: string } = {
    Visa: 'bg-gradient-to-r from-blue-600 to-blue-400',
    MasterCard: 'bg-gradient-to-r from-red-600 to-orange-400',
  };

  return (
    <div className="relative w-80 h-48 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <AnimatePresence>
        <motion.div
          className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`w-full h-full ${cardStyles[card.cardType] || 'bg-gray-500'}`}>
            {!isFlipped ? (
              <div className="p-4 text-white">
                <img src={`/card-logos/${card.cardType.toLowerCase()}.png`} alt={card.cardType} className="h-10 mb-4" />
                <p className="text-lg font-mono">{card.cardNumber.replace(/.(?=.{4})/g, '**** ')}</p>
                <div className="flex justify-between mt-4">
                  <p>{card.cardholderName}</p>
                  <p>{card.expiryDate}</p>
                </div>
                <p>{card.bankName}</p>
              </div>
            ) : (
              <div className="p-4 bg-black text-white flex items-center justify-center">
                <p className="text-lg font-mono">CVV: {card.cvv}</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}