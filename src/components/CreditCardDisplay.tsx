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
    <motion.div
      className="relative w-80 h-48 perspective-1000 hover:scale-105 transition-transform duration-300"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
    >
      <AnimatePresence>
        <motion.div
          className="absolute w-full h-full rounded-xl shadow-xl overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className={`w-full h-full ${cardStyles[card.cardType] || 'bg-gray-500'} text-white p-6 flex flex-col justify-between`}>
            {!isFlipped ? (
              <>
                <img src={`/card-logos/${card.cardType.toLowerCase()}.png`} alt={card.cardType} className="h-12 w-16 object-contain" />
                <p className="text-xl font-mono tracking-wider">{card.cardNumber.replace(/.(?=.{4})/g, '**** ')}</p>
                <div className="flex justify-between text-sm">
                  <p>{card.cardholderName}</p>
                  <p>{card.expiryDate}</p>
                </div>
                <p className="text-sm font-semibold">{card.bankName}</p>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-900">
                <p className="text-lg font-mono">CVV: {card.cvv}</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}