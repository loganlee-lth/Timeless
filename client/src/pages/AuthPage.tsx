import { ReactElement, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AppContext from '../context/AppContext';

type AuthPageProps = {
  action: 'sign-up' | 'sign-in';
};

export default function AuthPage({ action }: AuthPageProps): ReactElement {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeMessage1 =
    action === 'sign-in' ? 'Sign in' : 'Create an account';

  const welcomeMessage2 =
    action === 'sign-in'
      ? 'Welcome! Please sign in to your account'
      : 'Start enjoying exclusive member benefits right away';

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/images/logo.svg" alt="" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {welcomeMessage1}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            {welcomeMessage2}
          </p>
        </div>
        <AuthForm key={action} action={action} onSignIn={handleSignIn} />
      </div>
    </div>
  );
}
