# Food Decider UI Flow

## User Journey

### 1. Landing Page (Questionnaire)
**Route:** `/`

**Components:**
- Progress bar (6 questions)
- Question display with 4 options per question
- Back button
- Skip button

**Questions:**
1. 🌶️ How adventurous are you with food?
2. 🔥 What's your spice tolerance?
3. 🍱 What's your typical meal size preference?
4. 🥬 Any dietary preferences?
5. 🍜 What's your go-to cuisine style?
6. ⚡ How do you usually decide what to eat?

**Data Flow:**
- Answers stored in state during questionnaire
- Upon completion → Save to `localStorage`
- Navigate to `/chat`

---

### 2. Chat Interface
**Route:** `/chat`

**Layout:**
```
┌─────────────────────────────────────┐
│  Header: 🍽️ Food Decider           │
│  [Reset Preferences]                │
├─────────────────────────────────────┤
│  Mode Selector:                     │
│  [🤔 Help Me Decide] [✨ Recommend] │
├─────────────────────────────────────┤
│                                     │
│  Chat Messages Area                 │
│  (scrollable)                       │
│                                     │
│  - System welcome message           │
│  - User messages (right, orange)    │
│  - AI responses (left, white card)  │
│  - Rating component below AI msgs   │
│                                     │
├─────────────────────────────────────┤
│  Input Area (fixed bottom):         │
│  [Text Input________________] [Send]│
│  💡 Contextual tip based on mode    │
└─────────────────────────────────────┘
```

**Two Modes:**

**Mode 1: Help Me Decide** 🤔
- User provides options
- AI chooses the best one
- Example inputs:
  - "Pizza or Sushi?"
  - "Starbucks, McDonald's, or KFC?"
  - "Chinese food or Italian?"

**Mode 2: Recommend Me Something** ✨
- User describes preferences/mood
- AI suggests specific items
- Example inputs:
  - "I want something spicy"
  - "Recommend me a healthy lunch"
  - "Something light and refreshing"

**Message Types:**
1. **System** - Blue card, informational
2. **User** - Orange bubble, right-aligned
3. **AI** - White card with avatar, left-aligned
4. **Error** - Red card, left-aligned

**AI Response Card:**
```
┌─────────────────────────────────────┐
│ 🍽️  Food Decider AI                │
│                                     │
│ [Recommendation text]               │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Why: [Reasoning text]           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Rate this response:                 │
│ ⭐⭐⭐⭐⭐ (4/5)                      │
└─────────────────────────────────────┘
```

---

## Color Scheme

**Primary Colors:**
- Orange: `#F97316` (primary actions, user messages)
- Yellow: `#FEF3C7` (background gradient)
- Gray: Various shades for text and cards

**Gradients:**
- Background: `from-orange-50 to-yellow-50`

**Component Colors:**
- Primary Button: Orange 500 → Orange 600 (hover)
- Secondary Button: Gray 200 → Gray 300 (hover)
- Outline Button: Orange 500 border with hover fill
- Cards: White with shadow
- Input Focus: Orange 500 ring

---

## Responsive Design

**Desktop (>768px):**
- Max width: 4xl (896px) centered
- Full feature set
- Side-by-side mode selector

**Mobile (<768px):**
- Full width with padding
- Stacked layout
- Touch-optimized buttons
- Bottom input stays fixed

---

## Interactions

### Questionnaire
1. Click option → Automatically advance
2. Back button → Previous question
3. Skip → Jump to chat (saves partial data)
4. Progress bar animates

### Chat
1. Type message → Send button activates
2. Send → Message appears instantly
3. Loading animation (3 bouncing dots)
4. AI response → Rating appears
5. Click star → Submit rating, hide rating UI
6. Mode switch → Update placeholder text
7. Reset → Clear localStorage, return to `/`

### Rating
1. Hover star → Fill up to hovered star
2. Click star → Lock rating
3. Display current rating beside stars

---

## State Management

**localStorage:**
```javascript
{
  "userPersonality": {
    "adventure_level": "very_adventurous",
    "spice_level": "medium_spicy",
    "meal_size": "medium",
    "dietary_preference": "none",
    "cuisine_style": "asian",
    "decision_speed": "quick"
  }
}
```

**Chat Component State:**
```javascript
{
  messages: [...],      // Array of message objects
  input: "",           // Current input value
  mode: "decide",      // "decide" or "recommend"
  isLoading: false,    // API call in progress
  showRating: null     // Message ID to show rating for
}
```

---

## API Integration Points

1. **Submit message** → POST `/api/recommend`
2. **Submit rating** → POST `/api/rate`
3. **Save personality** → POST `/api/personality` (optional)

---

## Error Handling

1. **API Error:**
   - Show error message in chat
   - Use mock data in development
   - Log to console

2. **Network Error:**
   - Display user-friendly message
   - Suggest retry

3. **Validation:**
   - Empty input → Disable send button
   - No personality → Redirect to questionnaire

---

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus states on all inputs
- Color contrast meets WCAG AA
- Screen reader friendly messages

---

## Performance

- Lazy load pages with React Router
- Optimize re-renders with proper key props
- Debounce input if needed
- Smooth scroll animations
- Image optimization (if added later)
