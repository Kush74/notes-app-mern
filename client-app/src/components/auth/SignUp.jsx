import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const SignUp = () => {
  const [signUpForm, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onSignUp = (event) => {
    event.preventDefault();

    // Form Http Call
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="border border-gray-200 shadow-md rounded-lg px-6 py-10">
        <NavLink to="/">
          <p className="flex justify-center">
            <img src="/logo.svg" alt="Notes Logo" />
          </p>
        </NavLink>

        <h2 className="text-center text-slate-700 font-semibold text-3xl">
          Create Account
        </h2>
        <p className="text-center text-slate-500 mb-4">
          Enter your information below to sign up
        </p>
        <div className="space-y-4">
          <form onSubmit={onSignUp}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                value={signUpForm.name}
                onChange={handleChange}
                className="border border-slate-200 rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="username@example.com"
                value={signUpForm.email}
                onChange={handleChange}
                className="border border-slate-200 rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={signUpForm.password}
                onChange={handleChange}
                className="border border-slate-200 rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="confirm password"
                value={signUpForm.confirmPassword}
                onChange={handleChange}
                className="border border-slate-200 rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mt-8 flex justify-center w-full">
              <button type="submit" className="btn-primary text-sm w-full">
                Register
              </button>
            </div>

            <div className=" mt-4 text-sm text-center text-muted-foreground text-gray-600">
              {" "}
              Already have an account?{" "}
              <NavLink to="/sign-in" className="text-sky-600 font-semibold">
                Sign In
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
