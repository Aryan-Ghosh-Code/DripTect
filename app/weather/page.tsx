'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function weather() {
  useEffect(() => {
    console.log("Hello from HomePage!");
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  );
}