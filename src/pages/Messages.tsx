import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { dummyChatThreads, dummyMessages } from '@/lib/dummy-data';
import { MessageCircle, Send, ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const selectedChat = selectedThread 
    ? dummyChatThreads.find(thread => thread.id === selectedThread)
    : null;

  const chatMessages = selectedChat 
    ? dummyMessages.filter(msg => msg.productId === selectedChat.productId)
    : [];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Simulate sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-7xl h-[calc(100vh-8rem)]">
        <div className="flex h-full">
          {/* Chat List - Desktop & Mobile */}
          <div className={`${selectedThread ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 border-r`}>
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Messages</h1>
            </div>

            {dummyChatThreads.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start a conversation by contacting a seller!
                </p>
                <Button asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2">
                {dummyChatThreads.map((thread) => (
                  <Card 
                    key={thread.id}
                    className={`cursor-pointer transition-colors ${
                      selectedThread === thread.id ? 'ring-2 ring-primary' : 'hover:bg-accent'
                    }`}
                    onClick={() => setSelectedThread(thread.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${thread.sellerId}`} />
                          <AvatarFallback>{thread.sellerName[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium truncate">{thread.sellerName}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(thread.lastMessageTime).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground truncate mb-2">
                            {thread.product.title}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-sm truncate">{thread.lastMessage}</p>
                            {thread.unreadCount > 0 && (
                              <Badge variant="default" className="text-xs">
                                {thread.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Chat Window */}
          <div className={`${!selectedThread ? 'hidden md:flex' : 'flex'} flex-col flex-1`}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedThread(null)}
                      className="md:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedChat.sellerId}`} />
                      <AvatarFallback>{selectedChat.sellerName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedChat.sellerName}</p>
                      <p className="text-sm text-muted-foreground">
                        About: {selectedChat.product.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/products/${selectedChat.productId}`}>
                        View Item
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === '1'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === '1' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
                  <p className="text-muted-foreground">
                    Choose a chat from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;