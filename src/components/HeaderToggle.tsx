'use client';

import { useState } from 'react';
import Header from './Header'; // Your existing header
import HeaderJoy from './HeaderJoy'; // The new Joy UI inspired header

interface HeaderToggleProps {
  useJoyHeader?: boolean; // Prop to control which header to use
}

export default function HeaderToggle({ useJoyHeader = false }: HeaderToggleProps) {
  // You can add more complex logic here later, e.g., based on A/B testing, user role, etc.
  if (useJoyHeader) {
    return <HeaderJoy />;
  } else {
    return <Header />;
  }
}
