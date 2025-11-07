import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [personality, setPersonality] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('currentUser');
    const personalityData = localStorage.getItem('userPersonality');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditedName(parsedUser.name);
    }

    if (personalityData) {
      setPersonality(JSON.parse(personalityData));
    }
  }, []);

  const handleSaveName = () => {
    const updatedUser = { ...user, name: editedName };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleRetakeQuestionnaire = () => {
    localStorage.removeItem('userPersonality');
    navigate('/questionnaire');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? All data will be lost.')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const personalityLabels = {
    adventure_level: {
      label: 'Adventure Level',
      icon: '🌶️',
      options: {
        very_adventurous: 'Very adventurous',
        somewhat_adventurous: 'Somewhat adventurous',
        cautious: 'Cautious',
        very_cautious: 'Very cautious'
      }
    },
    spice_level: {
      label: 'Spice Tolerance',
      icon: '🔥',
      options: {
        very_spicy: 'Bring on the heat',
        medium_spicy: 'Moderately spicy',
        mild: 'Mild flavors',
        no_spice: 'No spice'
      }
    },
    meal_size: {
      label: 'Meal Size',
      icon: '🍱',
      options: {
        large: 'Large portions',
        medium: 'Medium portions',
        small: 'Small portions',
        snack: 'Snack-sized'
      }
    },
    dietary_preference: {
      label: 'Dietary Preference',
      icon: '🥗',
      options: {
        none: 'No restrictions',
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        pescatarian: 'Pescatarian'
      }
    },
    cuisine_style: {
      label: 'Cuisine Style',
      icon: '🍜',
      options: {
        asian: 'Asian cuisine',
        western: 'Western cuisine',
        mixed: 'Mixed/Fusion',
        local: 'Local/Traditional'
      }
    },
    decision_speed: {
      label: 'Decision Speed',
      icon: '⚡',
      options: {
        quick: 'Quick decider',
        moderate: 'Moderate pace',
        slow: 'Take my time',
        indecisive: 'Very indecisive'
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card>
          <p className="text-gray-600 mb-4">Please login to view your profile</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">👤 My Profile</h1>
            <Button variant="outline" onClick={() => navigate('/chat')}>
              Back to Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* User Info Card */}
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-3xl text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  {isEditing ? (
                    <div className="flex gap-2 items-center">
                      <Input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button onClick={handleSaveName} className="text-sm px-3 py-2">
                        Save
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => {
                          setIsEditing(false);
                          setEditedName(user.name);
                        }}
                        className="text-sm px-3 py-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                      <p className="text-gray-600">{user.email}</p>
                      {user.isGuest && (
                        <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                          Guest Account
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-800">
                  {new Date(user.joinedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="font-medium text-gray-800">
                  {user.isGuest ? 'Guest' : 'Registered'}
                </p>
              </div>
            </div>
          </Card>

          {/* Personality Profile Card */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Food Personality</h3>
              <Button variant="outline" onClick={handleRetakeQuestionnaire}>
                Retake Quiz
              </Button>
            </div>

            {personality ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(personality).map(([key, value]) => {
                  const config = personalityLabels[key];
                  if (!config) return null;

                  return (
                    <div
                      key={key}
                      className="bg-orange-50 rounded-lg p-4 border border-orange-100"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{config.icon}</span>
                        <p className="text-sm font-semibold text-gray-700">
                          {config.label}
                        </p>
                      </div>
                      <p className="text-gray-800 font-medium">
                        {config.options[value] || value}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You haven't completed the personality questionnaire yet
                </p>
                <Button onClick={() => navigate('/questionnaire')}>
                  Take Questionnaire
                </Button>
              </div>
            )}
          </Card>

          {/* Actions Card */}
          <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Account Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full" onClick={handleLogout}>
                🚪 Logout
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
                onClick={handleDeleteAccount}
              >
                🗑️ Delete Account
              </Button>
            </div>
          </Card>

          {/* Stats Card (Mock Data) */}
          <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-500">0</p>
                <p className="text-sm text-gray-600 mt-1">Decisions Made</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-500">0</p>
                <p className="text-sm text-gray-600 mt-1">Recommendations</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-500">0</p>
                <p className="text-sm text-gray-600 mt-1">Ratings Given</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-500">-</p>
                <p className="text-sm text-gray-600 mt-1">Favorite Cuisine</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
