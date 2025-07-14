"use client";

import { useState, useEffect } from 'react';
import PasswordCard from '../../components/PasswordCard';
import axios from 'axios';
import { IPassword } from '../../models/Password';

export default function PasswordsPage() {
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get('/api/passwords');
      setPasswords(res.data);
    };
    fetchCards();
  }, []);

  const filteredPasswords = passwords.filter(p => p.site.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Passwords</h1>
      <input
        type="text"
        placeholder="Search passwords..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
      />
      <div className="grid gap-4">
        {filteredPasswords.map((password) => (
          <PasswordCard key={password._id} password={password} />
        ))}
      </div>
    </div>
  );
}