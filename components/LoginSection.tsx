import React, { useState } from 'react';
import { Eye, EyeOff, Zap } from 'lucide-react';

interface LoginSectionProps {
  onLogin: () => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    onLogin();
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-6">
          <Zap className="w-6 h-6 text-brand-primary fill-current" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Login</h1>
        <p className="text-gray-500 text-sm">See your growth and get consulting support!</p>
      </div>

      {/* Social Login */}
      <button
        type="button"
        onClick={onLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 group"
      >
        {/* Microsoft Logo */}
        <svg className="w-5 h-5" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
          <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
          <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
          <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
        </svg>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sign in with Microsoft</span>
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">or Sign in with Email</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="mail@website.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-300 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-300 text-sm pr-10"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-brand-primary hover:text-brand-700">
              Forget password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-brand-primary hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
        >
          Login
        </button>
      </form>

      {/* Footer */}
      <div className="text-center space-y-8">
        <p className="text-sm text-gray-600">
          Not registered yet?{' '}
          <a href="#" className="font-semibold text-brand-primary hover:text-brand-700">
            Create an Account
          </a>
        </p>

        <p className="text-xs text-gray-400 mt-8">
          ©2020 Felix All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginSection;