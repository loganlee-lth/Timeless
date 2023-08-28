import { ReactElement, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, signIn, signUp } from '../lib';

type AuthFormProps = {
  action: 'sign-up' | 'sign-in';
  onSignIn: (auth: Auth) => void;
};

export default function AuthForm({
  action,
  onSignIn,
}: AuthFormProps): ReactElement {
  const navigate = useNavigate();
  const [error, setError] = useState<unknown>();
  const [demoUsername, setDemoUsername] = useState<string>('');
  const [demoPassword, setDemoPassword] = useState<string>('');

  function handleDemoAccountClick() {
    setDemoUsername('demo');
    setDemoPassword('timelessDEMOpassword');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    async function handleSignUp(username: string, password: string) {
      await signUp(username, password);
      navigate('/sign-in');
    }
    async function handleSignIn(username: string, password: string) {
      const auth = await signIn(username, password);
      if (auth.user && auth.token) {
        onSignIn(auth);
      }
    }
    event.preventDefault();
    if (event.target === null) throw new Error();
    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    const username = entries.username as string;
    const password = entries.password as string;
    try {
      if (action === 'sign-up') {
        handleSignUp(username, password);
        setDemoUsername('');
        setDemoPassword('');
      } else {
        handleSignIn(username, password);
        setDemoUsername('');
        setDemoPassword('');
      }
    } catch (err) {
      setError(err);
    }
  }

  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateActionText1 =
    action === 'sign-up'
      ? 'Already have an account?'
      : "Don't have an account?";
  const alternateActionText2 = action === 'sign-up' ? 'Sign in' : 'Sign up now';
  const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autoFocus
              required
              value={demoUsername}
              onChange={(e) => setDemoUsername(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={demoPassword}
              onChange={(e) => setDemoPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {submitButtonText}
          </button>
        </div>
        {action !== 'sign-up' && (
          <div>
            <button
              type="button"
              onClick={handleDemoAccountClick}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Demo account
            </button>
          </div>
        )}
        <>
          {error && (
            <div style={{ color: 'red' }}>
              Error: {error instanceof Error ? error.message : 'Unknown Error'}
            </div>
          )}
        </>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        {alternateActionText1}&nbsp;
        <Link
          to={alternateActionTo}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          {alternateActionText2}
        </Link>
      </p>
    </div>
  );
}
