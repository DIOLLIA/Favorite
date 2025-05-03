'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/mems/upload'
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/mems/upload');
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1>Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button
              type="submit"
              className="mt-4 w-full"
              disabled={isPending}
              aria-disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
          <div className="flex h-8 items-end space-x-1">
            {error && (
                <>
                  <p className="text-sm text-red-500">{error}</p>
                </>
            )}
          </div>
        </div>
      </form>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...rest }: ButtonProps) {
  return (
      <button
          {...rest}
          className={clsx(
              'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
              className,
          )}
      >
        {children}
      </button>
  );
}