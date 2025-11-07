import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Personality questions for food preferences
  const questions = [
    {
      id: 'adventure_level',
      question: 'How adventurous are you with food?',
      options: [
        { value: 'very_adventurous', label: '🌶️ Very adventurous - I love trying new things!' },
        { value: 'somewhat_adventurous', label: '🍜 Somewhat adventurous - Open to new experiences' },
        { value: 'cautious', label: '🍕 Cautious - Prefer familiar foods' },
        { value: 'very_cautious', label: '🍔 Very cautious - Stick to what I know' }
      ]
    },
    {
      id: 'spice_level',
      question: 'What\'s your spice tolerance?',
      options: [
        { value: 'very_spicy', label: '🔥 Bring on the heat!' },
        { value: 'medium_spicy', label: '🌶️ Moderately spicy' },
        { value: 'mild', label: '🧈 Mild flavors' },
        { value: 'no_spice', label: '🥛 No spice please' }
      ]
    },
    {
      id: 'meal_size',
      question: 'What\'s your typical meal size preference?',
      options: [
        { value: 'large', label: '🍱 Large - I love big portions' },
        { value: 'medium', label: '🍽️ Medium - Just right' },
        { value: 'small', label: '🥗 Small - Light eater' },
        { value: 'snack', label: '🥨 Snack-sized portions' }
      ]
    },
    {
      id: 'dietary_preference',
      question: 'Any dietary preferences?',
      options: [
        { value: 'none', label: '🍖 No restrictions' },
        { value: 'vegetarian', label: '🥬 Vegetarian' },
        { value: 'vegan', label: '🌱 Vegan' },
        { value: 'pescatarian', label: '🐟 Pescatarian' }
      ]
    },
    {
      id: 'cuisine_style',
      question: 'What\'s your go-to cuisine style?',
      options: [
        { value: 'asian', label: '🍜 Asian (Chinese, Japanese, Thai, etc.)' },
        { value: 'western', label: '🍔 Western (American, Italian, etc.)' },
        { value: 'mixed', label: '🌍 Mixed/Fusion' },
        { value: 'local', label: '🏠 Local/Traditional' }
      ]
    },
    {
      id: 'decision_speed',
      question: 'How do you usually decide what to eat?',
      options: [
        { value: 'quick', label: '⚡ Quick - First thing that looks good' },
        { value: 'moderate', label: '🤔 Moderate - Think about it briefly' },
        { value: 'slow', label: '⏰ Slow - Take my time deciding' },
        { value: 'indecisive', label: '😅 Very indecisive - Need help!' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value
    };
    setAnswers(newAnswers);

    // Move to next question or complete
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save personality profile and navigate to main app
      localStorage.setItem('userPersonality', JSON.stringify(newAnswers));
      navigate('/chat');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🍽️ Food Decider
          </h1>
          <p className="text-gray-600">
            Let's get to know your food preferences!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all duration-200 ${
                  answers[questions[currentQuestion].id] === option.value
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <span className="text-lg">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestion === 0}
          >
            ← Back
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              localStorage.setItem('userPersonality', JSON.stringify(answers));
              navigate('/chat');
            }}
          >
            Skip for now
          </Button>
        </div>
      </Card>
    </div>
  );
}
