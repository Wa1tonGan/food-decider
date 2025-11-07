# Food Decider - Frontend

A React-based food decision assistant that helps users choose what to eat based on their preferences.

## Features

### 🎯 Personality Questionnaire
- Initial onboarding with 6 personalized questions
- Captures user preferences:
  - Adventure level with food
  - Spice tolerance
  - Meal size preference
  - Dietary restrictions
  - Cuisine style
  - Decision-making speed
- Progress tracking
- Skip option available

### 💬 Chat Interface
Two modes of operation:
1. **Help Me Decide** - Choose between specific options
   - E.g., "Pizza or Sushi?"
   - E.g., "Help me choose between Starbucks, McDonald's, and KFC"

2. **Recommend Me Something** - Get AI-powered recommendations
   - E.g., "I want something spicy"
   - E.g., "Recommend me a healthy lunch"

### ⭐ Rating System
- 5-star rating for each recommendation
- Feedback collection for model improvement
- Visual star interface with hover effects

## UI Components

### Reusable Components
- **Button** - Primary, secondary, and outline variants
- **Input** - Text input with label and error handling
- **Card** - Consistent card layout
- **Rating** - Interactive 5-star rating component

### Pages
- **Questionnaire** - Onboarding personality assessment
- **Chat** - Main conversation interface with AI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update the API URL in `.env`:
```
VITE_API_URL=http://localhost:8000/api
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   └── Rating.jsx
├── pages/              # Page components
│   ├── Questionnaire.jsx
│   └── Chat.jsx
├── services/           # API and backend services
│   └── api.js
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

## Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## API Integration

The frontend expects these backend endpoints:

### POST `/api/recommend`
Request:
```json
{
  "user_input": "Pizza or Sushi?",
  "mode": "decide",
  "personality": {
    "adventure_level": "very_adventurous",
    "spice_level": "medium_spicy",
    ...
  }
}
```

Response:
```json
{
  "id": "unique-id",
  "recommendation": "I recommend Pizza!",
  "reasoning": "Based on your preferences..."
}
```

### POST `/api/rate`
Request:
```json
{
  "message_id": "unique-id",
  "rating": 4
}
```

## Development Notes

- Personality data is stored in `localStorage`
- Mock data is used if backend is unavailable
- Protected route: Chat page requires completed questionnaire
- Responsive design for mobile and desktop

## Future Enhancements

- [ ] User authentication
- [ ] Save conversation history
- [ ] Export recommendations
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Voice input
