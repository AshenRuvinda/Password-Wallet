import AuthForm from '../../components/AuthForm';

export const metadata = {
  title: 'Login - Password & Credit Card Wallet',
  description: 'Log in to securely manage your passwords and credit cards',
};

export default function LoginPage() {
  return <AuthForm type="login" />;
}