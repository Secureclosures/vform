'use client'
import { useState, useRef, useEffect, useCallback } from 'react';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your AI assistant for plastic cap manufacturing services. I can help you with product information, technical specifications, pricing, and more. What would you like to know?",
      timestamp: new Date(),
      suggestions: ['Product Catalog', 'Custom Solutions', 'Get Quote']
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState('bot'); // 'bot' | 'agent' | 'connecting'
  const [customerService, setCustomerService] = useState({
    status: 'online',
    waitTime: '2-3 minutes',
    agentName: 'Sarah Johnson',
    agentAvatar: '👩‍💼',
    rating: 4.9,
    totalChats: 1247
  });
  
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSatisfactionRating, setShowSatisfactionRating] = useState(false);
  const [chatRating, setChatRating] = useState(0);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatTheme, setChatTheme] = useState('light');
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickReplies = [
    { text: "📋 Product Catalog", category: "products" },
    { text: "🔧 Custom Solutions", category: "custom" },
    { text: "📜 Quality Certifications", category: "quality" },
    { text: "💰 Pricing Information", category: "pricing" },
    { text: "🚚 Delivery Timeline", category: "delivery" },
    { text: "🛠️ Technical Support", category: "support" }
  ];

  const advancedResponses = {
    "product catalog": {
      message: "Here's our comprehensive product range:",
      options: [
        "🍾 Bottle Caps (Twist-on, Snap-on)",
        "🔄 Flip-top Caps", 
        "⚽ Sports Caps",
        "💊 Pharmaceutical Closures",
        "🔒 Tamper-evident Caps",
        "🎨 Custom Colored Caps"
      ],
      followUp: "Which product category interests you most? I can provide detailed specifications and compatibility information."
    },
    "custom solutions": {
      message: "Our custom solutions include:",
      options: [
        "🎯 Bespoke Design Consultation",
        "📐 3D Prototyping & Testing",
        "🏭 Custom Tooling Development",
        "🎨 Brand-specific Customization",
        "📊 Performance Optimization"
      ],
      followUp: "What's your specific requirement? Our engineering team can create solutions tailored to your exact needs."
    },
    "quality certifications": {
      message: "We maintain the highest quality standards:",
      options: [
        "✅ ISO 9001:2015 Certified",
        "🏥 FDA Compliant",
        "🍽️ FSSC 22000 Standards",
        "🔬 15-Point Quality Control",
        "📋 Material Traceability"
      ],
      followUp: "Would you like to see our quality documentation or schedule a facility tour?"
    },
    "pricing information": {
      message: "Our competitive pricing structure:",
      options: [
        "📊 Volume-based Discounts",
        "⚡ Express Quote (24hrs)",
        "💡 Cost Optimization Analysis",
        "📈 Long-term Partnership Rates"
      ],
      followUp: "What's your expected order volume and timeline? I'll connect you with our pricing specialists."
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && !isMinimized) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = useCallback(async (message) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setShowQuickReplies(false);
    setIsTyping(true);

    // Simulate advanced bot response with delay
    setTimeout(() => {
      const botResponse = getAdvancedBotResponse(message.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        type: chatMode === 'agent' ? 'agent' : 'bot',
        message: botResponse.message,
        timestamp: new Date(),
        options: botResponse.options,
        suggestions: botResponse.suggestions,
        agentInfo: chatMode === 'agent' ? customerService : null
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 800);
  }, [chatMode, customerService]);

  const getAdvancedBotResponse = (message) => {
    // Smart keyword matching
    for (const key in advancedResponses) {
      if (message.includes(key)) {
        return {
          message: advancedResponses[key].message,
          options: advancedResponses[key].options,
          suggestions: ['Tell me more', 'Get Quote', 'Contact Sales']
        };
      }
    }

    // Context-aware responses
    if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
      return {
        message: "I'd be happy to help with pricing! Our quotes are customized based on specifications, quantities, and requirements.",
        suggestions: ['Request Quote', 'Volume Pricing', 'Contact Sales']
      };
    }

    if (message.includes('delivery') || message.includes('shipping') || message.includes('timeline')) {
      return {
        message: "Delivery times vary by product complexity: Standard items (7-14 days), Custom solutions (3-6 weeks). We also offer expedited services.",
        suggestions: ['Rush Order', 'Standard Delivery', 'Track Order']
      };
    }

    if (message.includes('quality') || message.includes('certification') || message.includes('standard')) {
      return {
        message: "We're committed to the highest quality standards with ISO 9001:2015, FDA compliance, and comprehensive testing protocols.",
        suggestions: ['View Certificates', 'Quality Process', 'Lab Reports']
      };
    }

    return {
      message: "Thank you for your inquiry! I'm analyzing your request and connecting you with the most relevant information. Our specialist team can provide detailed assistance.",
      suggestions: ['Speak to Expert', 'Browse Catalog', 'Get Support']
    };
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply.text || reply);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleTransferToAgent = () => {
    setChatMode('connecting');
    const transferMessage = {
      id: Date.now(),
      type: 'system',
      message: `🔄 Connecting you to ${customerService.agentName} (${customerService.rating}⭐ • ${customerService.totalChats} chats)... Expected wait time: ${customerService.waitTime}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, transferMessage]);
    
    setTimeout(() => {
      setChatMode('agent');
      const agentMessage = {
        id: Date.now() + 1,
        type: 'agent',
        message: `Hi! This is ${customerService.agentName} from our customer service team. I've reviewed your conversation and I'm here to provide personalized assistance. How can I help you today?`,
        timestamp: new Date(),
        agentInfo: customerService,
        suggestions: ['Technical Questions', 'Custom Quote', 'Partnership Inquiry']
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsFileUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const fileMessage = {
        id: Date.now(),
        type: 'user',
        message: `📎 Uploaded: ${file.name}`,
        timestamp: new Date(),
        fileInfo: {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type
        }
      };
      setMessages(prev => [...prev, fileMessage]);
      setIsFileUploading(false);
      
      // Bot response to file
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          message: `Thank you for sharing your file! I've received "${file.name}" and our technical team will review it. You'll receive detailed feedback within 2 hours.`,
          timestamp: new Date(),
          suggestions: ['Track Review', 'Add More Files', 'Discuss Requirements']
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }, 2000);
  };

  const handleEndChat = () => {
    setShowSatisfactionRating(true);
  };

  const submitRating = (rating) => {
    setChatRating(rating);
    const ratingMessage = {
      id: Date.now(),
      type: 'system',
      message: `Thank you for rating this conversation ${rating}/5 stars! Your feedback helps us improve our service.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, ratingMessage]);
    setShowSatisfactionRating(false);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const filteredMessages = messages.filter(msg => 
    searchTerm === '' || 
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chatbot Container */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[700px]'
      } flex flex-col overflow-hidden border border-gray-200 ${
        chatTheme === 'dark' ? 'bg-gray-900 border-gray-700' : ''
      }`}>
        
        {/* Enhanced Header */}
        <div className={`${
          chatMode === 'agent' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
          chatMode === 'connecting' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
          'bg-gradient-to-r from-emerald-500 to-emerald-600'
        } text-white p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              {chatMode === 'agent' ? (
                <span className="text-lg">{customerService.agentAvatar}</span>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="font-semibold">
                {chatMode === 'agent' ? customerService.agentName :
                 chatMode === 'connecting' ? 'Connecting...' :
                 'AI Assistant'}
              </h3>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  chatMode === 'agent' ? 'bg-blue-300' :
                  chatMode === 'connecting' ? 'bg-yellow-300' :
                  'bg-green-300'
                }`}></div>
                <span>
                  {chatMode === 'agent' ? `${customerService.rating}⭐ • Online` :
                   chatMode === 'connecting' ? `Wait: ${customerService.waitTime}` :
                   `${customerService.status} • ${customerService.waitTime}`}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              title="Search messages"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Minimize Toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMinimized ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Search Bar */}
            {showHistory && (
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Enhanced Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {/* Message Header */}
                    {(message.type === 'bot' || message.type === 'agent') && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          message.type === 'agent' ? 'bg-blue-500' : 'bg-emerald-500'
                        }`}>
                          {message.type === 'agent' ? (
                            <span className="text-sm text-white">{message.agentInfo?.agentAvatar}</span>
                          ) : (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {message.type === 'agent' ? message.agentInfo?.agentName : 'AI Assistant'}
                        </span>
                        {message.type === 'agent' && (
                          <span className="text-xs text-gray-400">• Verified Agent</span>
                        )}
                      </div>
                    )}
                    
                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                          : message.type === 'system'
                          ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                          : message.type === 'agent'
                          ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-sm'
                          : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{message.message}</p>
                      
                      {/* File Info */}
                      {message.fileInfo && (
                        <div className="mt-2 p-2 bg-white/20 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span>{message.fileInfo.name}</span>
                            <span className="text-xs opacity-75">({message.fileInfo.size})</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Options */}
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(option)}
                              className="w-full text-left p-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Enhanced Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* File Upload Indicator */}
              {isFileUploading && (
                <div className="flex justify-center">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-sm">Uploading file...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Quick Replies */}
            {showQuickReplies && (
              <div className="p-4 bg-white border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3 font-medium">Popular topics:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="p-3 text-sm bg-gradient-to-r from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-emerald-100 hover:text-emerald-700 rounded-xl transition-all duration-200 text-left border border-gray-200 hover:border-emerald-200"
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Action Buttons */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2 mb-3">
                {chatMode !== 'agent' && (
                  <button
                    onClick={handleTransferToAgent}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Connect to Agent
                  </button>
                )}
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-xl transition-colors flex items-center justify-center"
                  title="Upload file"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                <button 
                  onClick={handleEndChat}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-xl transition-colors flex items-center justify-center"
                  title="End chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Enhanced Input Area */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-xs text-gray-400">{inputMessage.length}/500</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-all duration-200 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Satisfaction Rating Modal */}
        {showSatisfactionRating && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold text-center mb-4">Rate Your Experience</h3>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => submitRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= chatRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                Your feedback helps us improve our service
              </p>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />
      </div>
    </div>
  );
};

export default Chatbot;