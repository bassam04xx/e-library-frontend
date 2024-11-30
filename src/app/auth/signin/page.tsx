'use client';

import Link from 'next/link';
import { useEffect, useActionState } from 'react';
import { signin } from './actions';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [state, action, pending] = useActionState(signin, { errors: {} }, "signin-action");
  const router = useRouter();

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);
  
  return (
    <>
      <h2 className="text-3xl font-bold text-center">Sign In</h2>
      {state?.errors?.fail && <p className="text-red-500">{state.errors.fail}</p>}
      <form action={action} className="mt-8 space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {pending ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}