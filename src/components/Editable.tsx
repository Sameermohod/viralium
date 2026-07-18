import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit2, Save, X, Upload as UploadIcon } from 'lucide-react';

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
  
  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  if (!isAdminMode) {
    return <div className={className}>{children}</div>;
  }

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
    setUploadError('');
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(path, inputValue);
    setIsEditing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload file to S3');
      }

      setInputValue(data.url);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setIsUploading(false);
    }
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
                  Content Value (URL or Text)
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
                
                {/* Upload to S3 Helper */}
                {type === 'url' && (
                  <div className="mt-4 p-4 bg-neutral-900/60 rounded-xl border border-white/5 flex flex-col gap-2">
                    <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <UploadIcon size={12} className="text-[#ff6b00]" />
                      Upload direct to AWS S3
                    </span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="text-xs text-neutral-400 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 file:cursor-pointer disabled:opacity-50"
                    />
                    {isUploading && (
                      <span className="text-xs text-amber-500 animate-pulse block mt-1">Uploading file to S3 bucket...</span>
                    )}
                    {uploadError && (
                      <span className="text-xs text-red-500 block mt-1">{uploadError}</span>
                    )}
                  </div>
                )}

                {type === 'url' && !isUploading && !uploadError && (
                  <p className="text-[10px] text-neutral-500 mt-2">
                    Provide a valid URL or click the file picker above to upload directly.
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
                  disabled={isUploading}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#d4af37] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] transition-all cursor-pointer disabled:opacity-50"
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
