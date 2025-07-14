import { IPassword } from '../models/Password';

export default function PasswordCard({ password }: { password: IPassword }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h3 className="text-lg font-bold">{password.site}</h3>
      <p>Username: {password.username}</p>
      <p>Password: {'*'.repeat(password.password.length)}</p>
      <p>Notes: {password.notes}</p>
    </div>
  );
}