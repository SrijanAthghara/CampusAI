const OpenAI = require('openai');
const Feedback = require('../models/Feedback');

// Check if OpenAI API key is available and not fallback mode
const hasValidOpenAIKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'fallback_mode';

let openai = null;
if (hasValidOpenAIKey) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Controller to submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { name, department, feedback } = req.body;

    if (!department || !feedback) {
      return res.status(400).json({ error: 'Department and feedback are required' });
    }

    // Categorize feedback using OpenAI with fallback
    let category = 'Others';
    
    // First try OpenAI categorization if available
    if (hasValidOpenAIKey && openai) {
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
      const validCategories = ['Canteen', 'Hostel', 'Academics', 'Infrastructure', 'Sports', 'Others'];
      
      console.log(`✅ OpenAI categorization: "${feedback}" -> "${aiCategory}"`);
      
      if (validCategories.includes(aiCategory)) {
        category = aiCategory;
      } else {
        console.log(`❌ Invalid category "${aiCategory}", using fallback`);
        category = fallbackCategorization(feedback);
      }
      } catch (openaiError) {
        console.error('❌ OpenAI API Error:', openaiError.message);
        console.log('🔄 Using fallback keyword-based categorization');
        category = fallbackCategorization(feedback);
      }
    } else {
      console.log('🔄 Using fallback keyword-based categorization (no OpenAI key)');
      category = fallbackCategorization(feedback);
    }

// Fallback keyword-based categorization function
function fallbackCategorization(text) {
  const feedbackLower = text.toLowerCase();
  
  // Sports keywords (check first for priority)
  if (feedbackLower.includes('sports') || feedbackLower.includes('gym') || 
      feedbackLower.includes('playground') || feedbackLower.includes('football') || 
      feedbackLower.includes('cricket') || feedbackLower.includes('basketball') ||
      feedbackLower.includes('tennis') || feedbackLower.includes('swimming') ||
      feedbackLower.includes('fitness') || feedbackLower.includes('ground') ||
      feedbackLower.includes('field') || feedbackLower.includes('court')) {
    return 'Sports';
  }
  
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
      feedbackLower.includes('academic') || feedbackLower.includes('lecture') ||
      feedbackLower.includes('education') || feedbackLower.includes('teaching')) {
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
  
  return 'Others';
}

    // Save feedback to database
    const newFeedback = new Feedback({
      name: name || 'Anonymous',
      department,
      feedback,
      category
    });

    const savedFeedback = await newFeedback.save();
    
    res.status(201).json({
      message: 'Feedback submitted successfully!',
      feedback: savedFeedback
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

// Controller to get all feedback (for admin)
const getAllFeedback = async (req, res) => {
  try {
    const { category } = req.query;
    
    let filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }

    const feedbacks = await Feedback.find(filter).sort({ date: -1 });
    
    res.json({
      count: feedbacks.length,
      feedbacks
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

// Controller to get feedback statistics
const getFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalFeedback = await Feedback.countDocuments();

    res.json({
      totalFeedback,
      categoryStats: stats
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  getFeedbackStats
};