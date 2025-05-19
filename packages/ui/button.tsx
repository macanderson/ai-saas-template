import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, className='', ...props }) => (
  <button className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`} {...props}>
    {children}
  </button>
);
