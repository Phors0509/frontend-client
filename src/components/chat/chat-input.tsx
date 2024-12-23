"use client";

import { Send, Smile, Paperclip } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  return (
    <div className="p-4 bg-white border-t">
      <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Paperclip className="text-gray-500 w-5 h-5" />
        </button>
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 bg-transparent focus:outline-none"
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
        />
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Smile className="text-gray-500 w-5 h-5" />
        </button>
        <button 
          onClick={onSend}
          className="bg-orange-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}