// Mock API service - returns fake data for UI testing
// No backend required!

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockRecommendations = {
  decide: [
    {
      recommendation: '🎯 Based on your preferences, I recommend: **Pizza!**\n\nPizza offers a perfect balance of flavors and is a crowd-pleaser. It\'s versatile, satisfying, and you can customize it with your favorite toppings!',
      reasoning: 'Pizza scored highest based on your adventurous nature and preference for diverse flavors. It also matches your typical meal size preference!'
    },
    {
      recommendation: '🎯 I\'d go with **Sushi!**\n\nSushi is fresh, healthy, and offers an exciting variety of flavors. It\'s perfect for someone who enjoys trying new things!',
      reasoning: 'Given your high spice tolerance and preference for Asian cuisine, sushi aligns perfectly with your taste profile.'
    },
    {
      recommendation: '🎯 My recommendation is **Starbucks!**\n\nFor a quick, satisfying meal with great coffee, Starbucks offers the best combination of quality and convenience among your options.',
      reasoning: 'Considering your decision speed and meal size preference, Starbucks provides the optimal balance.'
    }
  ],
  recommend: [
    {
      recommendation: '✨ I recommend trying **Thai Green Curry**!\n\nIt\'s packed with aromatic flavors, moderately spicy, and has a great balance of protein and vegetables. The coconut milk base makes it creamy and satisfying.',
      reasoning: 'Based on your adventurous nature, preference for Asian cuisine, and medium spice tolerance, this dish is perfect for you!'
    },
    {
      recommendation: '✨ How about **Korean Bibimbap**?\n\nThis colorful rice bowl is loaded with vegetables, protein, and a spicy-sweet sauce. It\'s healthy, filling, and absolutely delicious!',
      reasoning: 'Matches your dietary preferences and your preference for medium-sized, flavorful meals with a kick!'
    },
    {
      recommendation: '✨ I suggest **Mediterranean Mezze Platter**!\n\nFresh hummus, falafel, grilled vegetables, and pita bread. It\'s light yet satisfying, with incredible flavors.',
      reasoning: 'Perfect for your adventurous palate while being on the lighter side. The variety will keep things interesting!'
    },
    {
      recommendation: '✨ Try **Vietnamese Pho**!\n\nA comforting bowl of aromatic broth with rice noodles, herbs, and your choice of protein. It\'s soul-warming and packed with flavor.',
      reasoning: 'Aligns with your Asian cuisine preference and offers the perfect balance of light and satisfying!'
    }
  ]
};

export const getFoodRecommendation = async ({ userInput, mode, personality }) => {
  // Simulate API delay
  await delay(1500);

  // Pick a random mock response based on mode
  const responses = mockRecommendations[mode];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  return {
    id: Date.now().toString(),
    ...randomResponse
  };
};

export const submitRating = async (messageId, rating) => {
  // Simulate API delay
  await delay(500);
  
  console.log('Mock: Rating submitted', { messageId, rating });
  return { success: true };
};

export const savePersonality = async (personality) => {
  // Simulate API delay
  await delay(300);
  
  console.log('Mock: Personality saved', personality);
  return { success: true };
};
