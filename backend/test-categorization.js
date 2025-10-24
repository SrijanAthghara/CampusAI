const OpenAI = require('openai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test categorization function
async function testCategorization(feedback) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a campus feedback categorization assistant. Analyze the feedback and categorize it into EXACTLY ONE of these categories:

- Canteen: Food quality, food service, dining hall issues, meal complaints, kitchen problems
- Hostel: Accommodation, rooms, hostel facilities, dormitory issues, living conditions
- Academics: Classes, teaching, library, laboratories, courses, studies, exams, curriculum
- Infrastructure: Buildings, roads, electricity, water, maintenance, construction, facilities
- Sports: Sports facilities, gymnasium, playground, sports equipment, athletic activities
- Others: Any feedback that doesn't fit the above categories

Respond with ONLY the category name (Canteen, Hostel, Academics, Infrastructure, Sports, or Others).`
        },
        {
          role: "user",
          content: `Categorize this campus feedback: "${feedback}"`
        }
      ],
      max_tokens: 20,
      temperature: 0.0,
    });

    const aiCategory = completion.choices[0]?.message?.content?.trim();
    return aiCategory;
  } catch (error) {
    console.error('OpenAI Error:', error);
    return 'Others';
  }
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

async function runTests() {
  console.log('🧪 Testing OpenAI Categorization...\n');
  
  for (const feedback of testFeedbacks) {
    const category = await testCategorization(feedback);
    console.log(`📝 Feedback: "${feedback}"`);
    console.log(`🤖 Category: "${category}"`);
    console.log('---');
  }
}

runTests().catch(console.error);