import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { MessageSquare, Search, Send } from 'lucide-react';
import Link from 'next/link';

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all messages for the current user
  const { data: messages } = await supabase
    .from('messages')
    .select(`
      *,
      sender:sender_id(id, full_name),
      receiver:receiver_id(id, full_name)
    `)
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  // Group messages by conversation (other person's ID)
  const conversationsMap = new Map();

  messages?.forEach((msg: any) => {
    const isSender = msg.sender_id === user.id;
    const otherPersonId = isSender ? msg.receiver_id : msg.sender_id;
    const otherPersonName = isSender ? msg.receiver.full_name : msg.sender.full_name;

    if (!conversationsMap.has(otherPersonId)) {
      conversationsMap.set(otherPersonId, {
        id: otherPersonId,
        name: otherPersonName,
        lastMessage: msg.content,
        timestamp: new Date(msg.created_at),
        unread: !isSender && !msg.is_read
      });
    }
  });

  const conversations = Array.from(conversationsMap.values());

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="container mx-auto px-4 max-w-6xl py-8 flex-1 flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm flex-1 flex overflow-hidden min-h-[600px]">
          
          {/* Left Sidebar: Inbox List */}
          <div className="w-1/3 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input 
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-neutral-950 border-none rounded-xl text-sm focus:ring-2 focus:ring-zulu-green outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-neutral-500 flex flex-col items-center">
                  <MessageSquare className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-sm">No messages yet.</p>
                </div>
              ) : (
                conversations.map(conv => (
                  <div key={conv.id} className="p-4 border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-950 cursor-pointer transition-colors relative">
                    {conv.unread && <div className="absolute top-4 right-4 w-2 h-2 bg-zulu-green rounded-full" />}
                    <h3 className={`font-bold text-sm ${conv.unread ? 'text-neutral-900 dark:text-white' : 'text-neutral-700 dark:text-neutral-300'}`}>
                      {conv.name}
                    </h3>
                    <p className={`text-xs mt-1 truncate ${conv.unread ? 'font-medium text-neutral-800 dark:text-neutral-200' : 'text-neutral-500'}`}>
                      {conv.lastMessage}
                    </p>
                    <span className="text-[10px] text-neutral-400 absolute bottom-4 right-4">
                      {conv.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Area: Chat Thread (Placeholder for layout) */}
          <div className="flex-1 flex flex-col bg-neutral-50 dark:bg-neutral-950/50">
            {conversations.length > 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
                <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a conversation to start messaging</p>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-neutral-400">
                <p>No active chats</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
