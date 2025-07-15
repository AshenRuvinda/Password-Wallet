import { motion } from 'framer-motion';
import { IPassword } from '../models/Password';

export default function PasswordCard({ password }: { password: IPassword }) {
  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{password.site}</h3>
      <p className="text-gray-700 dark:text-gray-300">Username: {password.username}</p>
      <p className="text-gray-700 dark:text-gray-300">Password: {'*'.repeat(password.password.length)}</p>
      <p className="text-gray-700 dark:text-gray-300">Notes: {password.notes || 'None'}</p>
    </motion.div>
  );
}