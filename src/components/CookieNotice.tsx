'use client';

import React, { useEffect, useState } from 'react';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('cookieNoticeAccepted');
    if (!seen) setVisible(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cookieNoticeAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 max-w-sm text-sm">
        <p>
          💾 This site uses cookies to save your game progress.{' '}
          <button
            onClick={() => setShowModal(true)}
            className="underline hover:text-gray-300 cursor-pointer"
          >
            Learn more
          </button>
        </p>
        <button
          onClick={handleDismiss}
          className="ml-auto text-sm bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded cursor-pointer"
        >
          Got it
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 max-w-md w-full p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Why we use cookies</h2>
            <p className="mb-4 text-sm">
              We use a cookie to save your current game state (selected rooms,
              items, clues, and score). This lets you continue where you left
              off, even after refreshing the page or closing your browser.
            </p>
            <ul className="list-disc pl-5 text-sm mb-4">
              <li>
                We do <strong>not</strong> collect any personal data.
              </li>
              <li>The cookie expires automatically after 24 hours.</li>
              <li>You can delete it by clicking “Restart”.</li>
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDismiss();
                  setShowModal(false);
                }}
                className="text-sm px-4 py-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
