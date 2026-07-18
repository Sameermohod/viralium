import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Download, RotateCcw, LogOut, Key, Eye } from 'lucide-react';

export default function AdminControls() {
  const { isAdminMode, login, logout, downloadContentJSON, resetToDefaults } = useContent();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (success) {
      setShowLoginModal(false);
      setPasswordInput('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Add key listener to trigger login modal on pressing Ctrl+Alt+A
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        if (isAdminMode) {
          logout();
        } else {
          setShowLoginModal(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminMode, logout]);

  return (
    <>
      {/* Floating Login Trigger Button (in footer or hidden by default, can be clicked) */}
      <div className="fixed bottom-6 left-6 z-[99]">
        <button
          onClick={() => isAdminMode ? logout() : setShowLoginModal(true)}
          className="w-10 h-10 bg-neutral-900/60 hover:bg-[#ff6b00] border border-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
          title={isAdminMode ? "Exit Admin Mode" : "Admin Login"}
        >
          {isAdminMode ? <Eye size={16} /> : <Key size={16} />}
        </button>
      </div>

      {/* Floating Admin Controls Header */}
      {isAdminMode && (
        <div className="fixed top-0 left-0 right-0 h-12 bg-neutral-950 border-b border-[#ff6b00]/30 text-white flex items-center justify-between px-6 z-[9998] shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-neutral-300">
              VIRALIAM ADMIN ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadContentJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-[#ff6b00]/20 border border-white/10 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              title="Download your edits as contentData.json"
            >
              <Download size={13} />
              Export JSON
            </button>
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-red-500/20 border border-white/10 text-xs font-semibold rounded-lg transition-colors text-neutral-400 hover:text-red-400 cursor-pointer"
            >
              <RotateCcw size={13} />
              Reset Defaults
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              ✕
            </button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#d4af37] flex items-center justify-center mb-3">
                <Key className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white font-syne">Admin Console</h3>
              <p className="text-xs text-neutral-400 mt-1">Enter password to enable website editor</p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  className={`w-full bg-neutral-900 border ${loginError ? 'border-red-500' : 'border-white/10'} text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors`}
                  autoFocus
                />
                {loginError && (
                  <p className="text-xs text-red-500 mt-1.5">Incorrect password. Hint: viraliam2026</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff6b00] to-[#d4af37] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all cursor-pointer"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
