'use client'

import { useState } from 'react';
import { broadcastMessage, setBotWebhook } from './actions';
import { Trash2, Zap, Radio, Terminal, Send, Activity, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [currentToken, setCurrentToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  // Add Token & Auto Set Webhook
  const addToken = async () => {
    if (currentToken && !tokens.includes(currentToken)) {
      setTokens([...tokens, currentToken]);
      
      // Automatic Webhook Trigger (using a placeholder URL since we are on localhost/vercel)
      // Jab aap Vercel pe deploy karoge, ye logic chalega
      await setBotWebhook(currentToken, window.location.origin);
      
      setCurrentToken('');
    }
  };

  const removeToken = (t: string) => {
    setTokens(tokens.filter(token => token !== t));
  };

  const handleStart = async () => {
    if (tokens.length === 0) return setStatus("❌ No bots added!");
    if (!chatId) return setStatus("❌ Enter Chat ID!");
    
    setIsLoading(true);
    setStatus("🚀 Starting Sequence...");

    const res = await broadcastMessage(tokens, chatId, message, count);
    
    setIsLoading(false);
    setStatus(res.success ? `✅ ${res.message}` : `⚠️ ${res.message}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 z-10"
      >
        <h1 className="text-6xl font-black text-white tracking-tighter mb-2 drop-shadow-lg">
          BOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">BLASTER</span>
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-mono border border-white/10 rounded-full px-4 py-1 bg-black/50 w-fit mx-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
          SYSTEM ONLINE
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-5xl z-10">
        
        {/* LEFT PANEL: CONFIGURATION (Span 8) */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }} 
           animate={{ opacity: 1, x: 0 }}
           className="glass-panel p-8 lg:col-span-8 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 text-accent border-b border-white/5 pb-4">
            <Terminal size={20} />
            <h2 className="font-bold text-lg tracking-wide">COMMAND CENTER</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 font-bold ml-1 mb-2 block">TARGET CHAT ID</label>
              <input 
                type="text" 
                placeholder="-100xxxxxx" 
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="input-field" 
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold ml-1 mb-2 block">LOOP COUNT</label>
              <input 
                type="number" 
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="input-field" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 font-bold ml-1 mb-2 block">MESSAGE PAYLOAD</label>
            <textarea 
              rows={5}
              placeholder="Type your message / HTML supported..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field resize-none" 
            />
          </div>

          <button 
            onClick={handleStart}
            disabled={isLoading}
            className={`btn-primary w-full flex items-center justify-center gap-2 mt-auto ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading ? <Activity className="animate-spin" /> : <Zap fill="currentColor" />}
            {isLoading ? 'EXECUTING...' : 'START BLAST'}
          </button>
          
          {status && (
            <div className="text-center font-mono text-xs text-cyan-400 mt-2">
              {status}
            </div>
          )}
        </motion.div>

        {/* RIGHT PANEL: BOT MANAGER (Span 4) */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }} 
           animate={{ opacity: 1, x: 0 }}
           className="glass-panel p-6 lg:col-span-4 flex flex-col h-full"
        >
          <div className="flex items-center justify-between mb-6 text-primary border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Radio size={20} />
              <h2 className="font-bold text-lg">BOT NET</h2>
            </div>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono">
              {tokens.length}
            </span>
          </div>

          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Paste Token..." 
              value={currentToken}
              onChange={(e) => setCurrentToken(e.target.value)}
              className="input-field py-2 pr-10" 
            />
            <button 
              onClick={addToken}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 max-h-[300px]">
            {tokens.length === 0 ? (
              <div className="text-center text-gray-600 mt-10 text-xs italic">
                Add bot tokens to initialize swarm.
              </div>
            ) : (
              tokens.map((token, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-black/40 rounded border border-white/5 hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="min-w-[8px] h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                    <span className="text-xs font-mono text-gray-300 truncate">
                      {token.substring(0, 8)}...{token.substring(token.length-5)}
                    </span>
                  </div>
                  <button 
                    onClick={() => removeToken(token)}
                    className="text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-500 text-center font-mono">
            AUTO-WEBHOOK: <span className="text-green-500">ACTIVE</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
