import AuthForm from '../../components/AuthForm';

export const metadata = {
  title: 'Register - Password & Credit Card Wallet',
  description: 'Create an account to securely manage your passwords and credit cards',
};

export default function RegisterPage() {
  return <AuthForm type="register" />;
}