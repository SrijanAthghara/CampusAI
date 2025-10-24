// Test fallback categorization without OpenAI
function fallbackCategorization(text) {
  const feedbackLower = text.toLowerCase();
  
  // Canteen keywords
  if (feedbackLower.includes('canteen') || feedbackLower.includes('food') || 
      feedbackLower.includes('dining') || feedbackLower.includes('meal') || 
      feedbackLower.includes('cafeteria') || feedbackLower.includes('kitchen') ||
      feedbackLower.includes('lunch') || feedbackLower.includes('breakfast') ||
      feedbackLower.includes('dinner') || feedbackLower.includes('eat')) {
    return 'Canteen';
  }
  
  // Hostel keywords
  if (feedbackLower.includes('hostel') || feedbackLower.includes('room') || 
      feedbackLower.includes('dormitory') || feedbackLower.includes('accommodation') || 
      feedbackLower.includes('residence') || feedbackLower.includes('wifi') ||
      feedbackLower.includes('wi-fi') || feedbackLower.includes('internet') ||
      feedbackLower.includes('bed') || feedbackLower.includes('living')) {
    return 'Hostel';
  }
  
  // Academics keywords
  if (feedbackLower.includes('class') || feedbackLower.includes('teacher') || 
      feedbackLower.includes('professor') || feedbackLower.includes('library') || 
      feedbackLower.includes('lab') || feedbackLower.includes('laboratory') ||
      feedbackLower.includes('study') || feedbackLower.includes('course') ||
      feedbackLower.includes('exam') || feedbackLower.includes('book') ||
      feedbackLower.includes('academic') || feedbackLower.includes('lecture')) {
    return 'Academics';
  }
  
  // Infrastructure keywords
  if (feedbackLower.includes('building') || feedbackLower.includes('road') || 
      feedbackLower.includes('electricity') || feedbackLower.includes('water') || 
      feedbackLower.includes('maintenance') || feedbackLower.includes('construction') ||
      feedbackLower.includes('parking') || feedbackLower.includes('toilet') ||
      feedbackLower.includes('washroom') || feedbackLower.includes('ac') ||
      feedbackLower.includes('air conditioning') || feedbackLower.includes('lift') ||
      feedbackLower.includes('elevator')) {
    return 'Infrastructure';
  }
  
  // Sports keywords
  if (feedbackLower.includes('sports') || feedbackLower.includes('gym') || 
      feedbackLower.includes('playground') || feedbackLower.includes('football') || 
      feedbackLower.includes('cricket') || feedbackLower.includes('basketball') ||
      feedbackLower.includes('tennis') || feedbackLower.includes('swimming') ||
      feedbackLower.includes('fitness') || feedbackLower.includes('ground')) {
    return 'Sports';
  }
  
  return 'Others';
}

// Test cases
const testFeedbacks = [
  "In my Canteen of L block, the food quality is not up to the mark.",
  "The food in the canteen is always cold and lacks variety.",
  "The Wi-Fi in the hostel is very slow and often disconnects.",
  "We need more practical sessions in the computer lab.",
  "The library AC is not working properly.",
  "The football ground needs better maintenance.",
  "The campus needs more parking spaces.",
  "Thank you for the great education!"
];

console.log('🧪 Testing Fallback Keyword Categorization...\n');

testFeedbacks.forEach(feedback => {
  const category = fallbackCategorization(feedback);
  console.log(`📝 Feedback: "${feedback}"`);
  console.log(`🎯 Category: "${category}"`);
  console.log('---');
});