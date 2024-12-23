"use client";
import Image from "next/image";
interface ChatMessageProps {
  message: string;
  profile: string
  timestamp: string;
  isCurrentUser: boolean;
}

export function ChatMessage({ message, timestamp, isCurrentUser , profile }: ChatMessageProps) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end':  'justify-start'} items-center`}>
      <div className="pr-2">
      {!isCurrentUser && <Image src={profile} alt={profile} className="rounded-full object-cover" width={40} height={40} />}
      </div>
      <div 
        className={`
          max-w-[50%] p-3 rounded-2xl
          ${isCurrentUser 
            ?'bg-orange-500 text-white'
            :'bg-gray-100 text-gray-900 border border-gray-100'}
          transform transition-all duration-200 hover:scale-[1.02]
        `}
      >
        {message}
        <div className={`
          text-xs mt-1 
          ${isCurrentUser ? 'text-orange-100' : 'text-gray-300'}
        `}>
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}