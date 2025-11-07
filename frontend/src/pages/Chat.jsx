import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodRecommendation, submitRating } from '../services/api';
import Rating from '../components/Rating';

export default function Chat() {
    const navigate = useNavigate();
    const [mode, setMode] = useState('decide'); // 'decide' or 'recommend'
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [lastRecommendation, setLastRecommendation] = useState(null);
    const messagesEndRef = useRef(null);

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            type: 'user',
            text: input,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await getFoodRecommendation(mode, input);
            const aiMessage = {
                type: 'ai',
                text: response.recommendation,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setLastRecommendation(response);
            setShowRating(true);
        } catch (error) {
            const errorMessage = {
                type: 'error',
                text: 'Sorry, something went wrong. Please try again.',
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRating = async (rating) => {
        if (!lastRecommendation) return;

        try {
            await submitRating(lastRecommendation.id, rating);
            setShowRating(false);
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setShowRating(false);
        setLastRecommendation(null);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Home Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                            title="Home"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </button>

                        {/* New Chat Button */}
                        {messages.length > 0 && (
                            <button
                                onClick={handleNewChat}
                                className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                                title="New Chat"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        )}

                        {/* Mode Selector */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode('decide')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'decide'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-orange-50'
                                    }`}
                            >
                                Decide for Me
                            </button>
                            <button
                                onClick={() => setMode('recommend')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'recommend'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-orange-50'
                                    }`}
                            >
                                Recommend
                            </button>
                        </div>
                    </div>

                    {/* Profile Button */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded-lg transition-colors"
                        title="Profile"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-sm font-semibold text-white">
                            {currentUser.name?.charAt(0).toUpperCase() || 'G'}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{currentUser.name || 'Guest'}</span>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                                <span className="text-4xl">🍽️</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">
                                {mode === 'decide' ? 'Let me decide for you!' : 'Get food recommendations'}
                            </h2>
                            <p className="text-gray-600 max-w-md">
                                {mode === 'decide'
                                    ? 'Tell me what kind of mood you\'re in, and I\'ll pick the perfect meal for you.'
                                    : 'Describe what you\'re looking for, and I\'ll suggest some great options.'}
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto p-6 space-y-6">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.type !== 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-lg">🤖</span>
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[70%] ${message.type === 'user'
                                                ? 'bg-orange-500 text-white rounded-2xl rounded-tr-sm px-4 py-3'
                                                : message.type === 'error'
                                                    ? 'bg-red-50 text-red-700 rounded-2xl rounded-tl-sm px-4 py-3'
                                                    : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm'
                                            }`}
                                    >
                                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {message.text}
                                        </div>
                                        <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-orange-100' : 'text-gray-500'}`}>
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    {message.type === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                                            {currentUser.name?.charAt(0).toUpperCase() || 'G'}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg">🤖</span>
                                    </div>
                                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showRating && !isLoading && (
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-medium text-gray-700 mb-3">How was this recommendation?</p>
                                    <Rating onRatingChange={handleRating} />
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t border-orange-200 bg-white/80 backdrop-blur-sm p-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={
                                    mode === 'decide'
                                        ? 'Tell me what you\'re in the mood for...'
                                        : 'Describe what you\'re looking for...'
                                }
                                className="flex-1 px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-5 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                ↑
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
