"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatInterface() {
  const [subject, setSubject] = useState('Math');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I am your AI learning assistant. I'm here to help you study, practice, or clarify concepts. What subject would you like to focus on today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          subject: subject,
        }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || data.error || "I'm sorry, I couldn't process that.",
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Network error. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
      
      {/* BOLDER HEADER - GRADIENT BACKGROUND */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-gradient-to-r from-zulu-green/5 to-transparent">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-zulu-green to-green-600 p-2 rounded-lg shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-zulu-green to-green-600 bg-clip-text text-transparent">
              Zulu AI Tutor
            </h3>
            <p className="text-xs text-neutral-500">Powered by Groq • Instant responses</p>
          </div>
        </div>
        <div>
          <select 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-sm border-2 border-zulu-green/30 rounded-lg px-3 py-1.5 bg-white dark:bg-neutral-900 focus:outline-none focus:border-zulu-green font-medium"
          >
            <option value="Math">📐 Math</option>
            <option value="Science">🔬 Science</option>
            <option value="English">📖 English</option>
            <option value="History">🏛️ History</option>
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-zulu-yellow text-neutral-900' : 'bg-zulu-green text-white'}`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${message.role === 'user' ? 'bg-zulu-green text-white rounded-tr-none' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-tl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex space-x-3 max-w-[80%]">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-zulu-green text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 rounded-tl-none flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-zulu-green" />
                <span className="text-sm text-neutral-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask me anything about ${subject}...`}
            className="w-full bg-neutral-100 dark:bg-neutral-800 border-none rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-zulu-green text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-zulu-green text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}