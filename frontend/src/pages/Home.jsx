import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home() {
  const currentUser = localStorage.getItem('currentUser');
  const isLoggedIn = !!currentUser;

  const clearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🍽️ Food Decider
          </h1>
          <p className="text-gray-600 text-lg">
            Let AI help you decide what to eat!
          </p>
        </div>

        {isLoggedIn && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center">
              ✓ You're logged in! Welcome back.
            </p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
            <h3 className="font-semibold text-gray-800 mb-2">Two Ways to Use:</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>🤔 <strong>Help Me Decide:</strong> Give me options, I'll pick the best one</li>
              <li>✨ <strong>Recommend Something:</strong> Tell me your mood, I'll suggest dishes</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          {!isLoggedIn ? (
            <Link to="/login" className="block">
              <Button className="w-full">
                Login / Sign Up
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/questionnaire" className="block">
                <Button className="w-full">
                  Start with Questionnaire
                </Button>
              </Link>
              
              <Link to="/chat" className="block">
                <Button variant="secondary" className="w-full">
                  Go to Chat
                </Button>
              </Link>

              <Link to="/profile" className="block">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </>
          )}

          <button onClick={clearData} className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">
            Clear All Data & Restart
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 text-center">Quick Navigation:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/login">
              <button className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                Login
              </button>
            </Link>
            <Link to="/questionnaire">
              <button className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                Questionnaire
              </button>
            </Link>
            <Link to="/chat">
              <button className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                Chat
              </button>
            </Link>
            <Link to="/profile">
              <button className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                Profile
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
