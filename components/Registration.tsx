"use client";

import { useUsers } from "@/context/UserContext";
import Link from "next/link";
import { useState } from "react";

export function Registration() {
  const { users, postNewUser } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingEmail = users.some((user) => user.email === email);
    if (existingEmail) return setError("existing email");
    if (!checkbox) return setError("xi hamadzayn ches vor");
    const newUser = {
      id: new Date().getTime(),
      userName: name,
      email,
      password,
    };
    try {
      await postNewUser(newUser);
      setName("");
      setEmail("");
      setPassword("");
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-cyan-50 via-white to-indigo-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-400 flex items-center justify-center shadow-inner">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 3L21 8v8l-9 5-9-5V8l9-5z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-slate-900 text-lg font-semibold">
                Create an account
              </h2>
              <p className="text-slate-500 text-sm">Join us to get started</p>
            </div>
          </div>

          <form className="mt-6" onSubmit={createAccount}>
            <label className="block text-xs font-medium text-slate-600">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="mt-2 mb-3 w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:text-sm"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <label className="block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 mb-3 w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:text-sm"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <label className="block text-xs font-medium text-slate-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 mb-2 w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            {error && <p className=" text-red-600"> {error}</p>}

            <div className="flex items-center mt-3 mb-4 text-sm text-slate-600">
              <input
                name="agree"
                type="checkbox"
                required
                className="w-4 h-4 rounded border-gray-300 mr-2"
                checked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
              />
              <span>
                I agree to the
                <Link
                  href="#"
                  className="text-cyan-600 font-medium hover:underline"
                >
                  Terms
                </Link>
                &amp;
                <Link
                  href="#"
                  className="text-cyan-600 font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-md hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-cyan-200 cursor-pointer"
            >
              Create Account
            </button>

            <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">
              <div className="flex-1 h-px bg-gray-200" aria-hidden />
              <span>or sign up with</span>
              <div className="flex-1 h-px bg-gray-200" aria-hidden />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10c1.58 0 3.08-.36 4.4-1.02"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v6h4v-6h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Facebook
              </button>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 text-center text-sm text-slate-600 bg-white/80">
          Already have an account?
          <Link
            className="text-cyan-600 font-semibold hover:underline"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
