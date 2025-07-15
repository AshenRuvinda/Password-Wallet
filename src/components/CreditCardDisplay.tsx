import { ICard } from '../models/Card';

interface CreditCardDisplayProps {
  card: ICard & { _id: string };
}

const cardStyles: { [key: string]: string } = {
  Visa: 'bg-blue-600',
  MasterCard: 'bg-red-600',
  Amex: 'bg-green-600',
  Discover: 'bg-orange-600',
};

export default function CreditCardDisplay({ card }: CreditCardDisplayProps) {
  return (
    <div className="relative w-80 h-48 rounded-lg shadow-lg overflow-hidden">
      <div
        className={`w-full h-full ${
          cardStyles[card.cardType] || 'bg-gray-500'
        } text-white p-6 flex flex-col justify-between`}
      >
        <div className="flex justify-between items-start">
          <img
            src={`/card-logos/${
              card.cardType ? card.cardType.toLowerCase() : 'generic'
            }.png`}
            alt={card.cardType || 'Card'}
            className="h-12 w-16 object-contain"
          />
        </div>
        <div>
          <p className="text-lg font-bold">{card.cardholderName}</p>
          <p className="text-sm font-semibold">
            {card.bankName || 'Unknown Bank'}
          </p>
          <p className="text-sm">**** **** **** {card.cardNumber.slice(-4)}</p>
          <p className="text-sm">Expires: {card.expiryDate}</p>
        </div>
      </div>
    </div>
  );
}