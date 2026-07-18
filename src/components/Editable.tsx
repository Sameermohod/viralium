import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit2, Save, X } from 'lucide-react';

interface EditableProps {
  children: React.ReactNode;
  path: string[];
  label: string;
  type?: 'text' | 'textarea' | 'url';
  className?: string;
}

export default function Editable({ children, path, label, type = 'text', className = '' }: EditableProps) {
  const { isAdminMode, content, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  if (!isAdminMode) {
    return <div className={className}>{children}</div>;
  }

  // Get current value from path
  const getCurrentValue = () => {
    let current: any = content;
    for (const key of path) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return '';
      }
    }
    return typeof current === 'string' ? current : '';
  };

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue(getCurrentValue());
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(path, inputValue);
    setIsEditing(false);
  };

  return (
    <div className={`group relative border border-dashed border-transparent hover:border-[#ff6b00]/40 p-1 rounded-lg transition-all duration-300 ${className}`}>
      {children}
      
      {/* Floating Edit Pencil Icon */}
      <button
        onClick={handleStartEdit}
        className="absolute top-1 right-1 bg-[#ff6b00] hover:bg-orange-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 hover:scale-100 z-30 cursor-pointer"
        title={`Edit ${label}`}
      >
        <Edit2 size={12} />
      </button>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold tracking-tight text-white mb-4 font-syne flex items-center gap-2">
              <Edit2 size={16} className="text-[#ff6b00]" />
              Edit {label}
            </h3>

            <form onSubmit={handleSave}>
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
                  Content Field
                </label>
                {type === 'textarea' ? (
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={4}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors leading-relaxed"
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b00] transition-colors"
                    autoFocus
                  />
                )}
                {type === 'url' && (
                  <p className="text-[10px] text-neutral-500 mt-1.5">
                    Provide a valid image or video URL (e.g. Unsplash image link or Vimeo MP4 video stream link).
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#d4af37] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] transition-all cursor-pointer"
                >
                  <Save size={13} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
