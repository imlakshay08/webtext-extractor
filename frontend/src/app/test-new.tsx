"use client";
import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { WavyBackground } from "@/components/ui/wavy-background";

export  function WavyBackgroundDemo() {

  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/get_text', { url });
      setText(response.data.text);
    } catch (error: unknown) { 
      if (axios.isAxiosError(error)) { 
        setErrorMessage(error.response?.data?.error || 'An error occurred');
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  return (
<WavyBackground className="max-w-4xl mx-auto pb-40">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center h-40"> {/* Container with fixed height */}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-60 px-4 py-2 rounded-md mr-2 text-black"
          />
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white mt-2">
            Get Text
          </button>
        </div>
      </form>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        {text}
      </p>
    </WavyBackground>
  );
}
