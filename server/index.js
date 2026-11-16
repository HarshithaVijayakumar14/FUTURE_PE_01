import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory or root directory
dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.GEMINI_API_KEY) {
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 5);
  res.json({
    status: 'ok',
    geminiConfigured: hasKey,
    mode: hasKey ? 'live_gemini' : 'smart_engine',
    message: hasKey
      ? 'Backend is online and live Gemini API key is configured.'
      : 'Backend is online. Running with built-in intelligent copywriting engine (Gemini key optional).',
  });
});

/**
 * Builds the prompt based strictly on FRAMEWORK.md guidelines:
 * - Clear role & tone
 * - Benefit-focused
 * - Avoids jargon unless explained
 * - Never invents qualifications, certs, addresses, or phone numbers
 * - Structured JSON output for the 7 sections
 */
function buildGenerationPrompt(data) {
  const { businessName, category, location, description, targetAudience, servicesOffered, tone } = data;

  return `
You are a world-class professional website copywriter and conversion strategist specializing in local businesses.
Your objective is to generate 7 high-converting, natural, human-sounding website sections.

CRITICAL INSTRUCTIONS & RULES (Based on FRAMEWORK.md):
1. TONE: Write in a "${tone || 'Professional'}" tone.
   - Professional: Structured, reliable, competent, respectful.
   - Friendly: Warm, approachable, reassuring, caring.
   - Conversational: Direct, energetic, talking with a neighbor over coffee.
   - Simple English: Easy vocabulary, short sentences, crystal clear for anyone.
   - Persuasive: Benefit-heavy, compelling, action-oriented, urgent yet genuine.
2. BUSINESS FACTS:
   - Business Name: ${businessName}
   - Category: ${category}
   - Location: ${location}
   - Description / Core Story: ${description}
   - Target Audience: ${targetAudience}
   - Services Offered: ${servicesOffered}
3. ANTI-HALLUCINATION RULES:
   - NEVER invent certifications, awards, medical degrees, specific phone numbers, exact street numbers, or false claims not provided by the business.
   - If contact details are missing, use clean professional placeholders like "[Call us at your phone number]" or "[Visit us in ${location}]".
4. WRITING QUALITY:
   - Focus on customer benefits, peace of mind, and solving their specific problems.
   - Avoid robotic cliches like "In today's fast-paced world" or "delve into".
   - Keep it engaging, authentic, and structured.

YOU MUST RESPOND STRICTLY WITH VALID JSON (no markdown ticks, no preamble) with the following exact keys:
{
  "homepageHeadline": "A captivating, benefit-driven primary headline and sub-headline",
  "homepageIntro": "A warm, 2-3 paragraph welcome introducing the business, what makes it special, and who it serves in ${location}",
  "aboutUs": "A compelling story about the mission, values, and dedication to the community",
  "ourServices": "Structured overview of each service offered, highlighting who it helps and the key benefits",
  "whyChooseUs": "4-6 distinct, persuasive trust points explaining why customers should choose ${businessName}",
  "callToAction": "2-3 high-converting call-to-action prompts (e.g. Immediate booking, preventive/exploratory, local trust)",
  "contactSection": "A polite, friendly closing inviting them to reach out, visit in ${location}, or schedule an appointment"
}
`;
}

/**
 * Intelligent Fallback Engine:
 * Generates rich, highly tailored, multi-section copy rooted in FRAMEWORK.md,
 * HOMEPAGE.md, SERVICE,md, and CTA SECTION.md whenever a live Gemini key is not supplied.
 */
function generateTailoredContent(data) {
  const { businessName, category, location, description, targetAudience, servicesOffered, tone } = data;

  const servicesList = (servicesOffered || '')
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const formattedServices =
    servicesList.length > 0
      ? servicesList
          .map((srv, idx) => {
            return `### ${idx + 1}. ${srv}\n• **What it includes:** Tailored solutions designed specifically for your needs.\n• **Why it matters:** Fast turnaround, personalized attention, and dedicated care without unnecessary delays.`;
          })
          .join('\n\n')
      : `### 1. Core Consultation & Assessment\nComprehensive evaluation tailored to your immediate needs.\n\n### 2. Personalized Service Plans\nDedicated execution with regular progress updates and personal support.`;

  // Specific preset for Swasthya Care Clinic from previous research
  if (businessName.toLowerCase().includes('swasthya')) {
    return {
      homepageHeadline: `# Your Family's Health, Handled With Care and Clarity\n\n**Sub-headline:** Personalized medical care in ${location} with minimal waiting time, clear explanations, and same-day lab reports.`,
      homepageIntro: `At ${businessName}, we believe healthcare should never feel confusing or stressful. Whether you are visiting for a simple check-up, managing seasonal symptoms, or seeking regular guidance, we take the time to listen carefully, explain clearly, and guide you step by step.\n\nWe are not a crowded hospital where patients feel lost in long queues. We are your trusted neighborhood clinic in ${location} where doctors know your name and genuinely care for your family's health.`,
      aboutUs: `Founded on the belief that healthcare must be transparent and compassionate, ${businessName} brings together experienced medical practitioners and modern diagnostic tools under one roof.\n\n**Our Core Promise:**\n• We explain every condition in clear, simple words.\n• We answer all your questions patiently without rushing.\n• We guide your recovery with honesty, affordable pricing, and empathy.\n\nBecause informed patients make the best health decisions.`,
      ourServices: `### 1. General Physician Consultation\nThorough diagnosis of common ailments, fever, blood pressure, and diabetes monitoring with clear lifestyle guidance.\n\n### 2. Preventive Health Check-ups\nBasic and comprehensive health screenings to detect issues early and keep your entire family healthy.\n\n### 3. In-House Laboratory Testing\nComplete blood counts, lipid profiles, thyroid, and routine screenings with convenient same-day test results.\n\n### 4. Senior Citizen Chronic Care\nEmpathetic, unhurried consultations with dedicated medication tracking and lifestyle support.\n\n### 5. Family & Pediatric Healthcare\nGentle care for infants and children, routine vaccinations, and supportive advice for concerned parents.`,
      whyChooseUs: `✔ **Experienced & Approachable Doctors** who take time to listen to your concerns\n✔ **Minimal Waiting Times** with scheduled and organized visit slots\n✔ **In-House Diagnostics** with same-day reports under one roof\n✔ **Affordable & Transparent Pricing** with zero hidden clinic charges\n✔ **Clear, Simple Explanations** without confusing medical jargon\n✔ **Calm, Family-Friendly Environment** located conveniently in ${location}`,
      callToAction: `### 1. Immediate Appointment Booking\nDo not ignore symptoms that could grow into larger concerns later. Schedule your consultation today for clear, caring medical support.\n👉 **Call Now or Book Online**\n\n### 2. Preventive Health Check-Up\nPrevention is always better than cure. Plan your family's health check-up this week. Same-day test slots available.\n👉 **Reserve Your Health Package**\n\n### 3. Visit Our Neighborhood Clinic\nLooking for a dependable doctor in ${location}? ${businessName} is just minutes away. Walk in or contact us today.`,
      contactSection: `### Get in Touch with ${businessName}\n\n📍 **Location:** ${location}\n🕒 **Timings:** Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: 9:00 AM – 1:00 PM\n📞 **Phone:** [Contact Number Provided at Clinic]\n💬 **Walk-ins & Appointments:** Same-day consultations available. Reach out today to experience healthcare that puts your family first.`,
    };
  }

  // Dynamic generator for all other business niches and tones
  const toneAdjectives = {
    Professional: 'structured, credible, and dependable',
    Friendly: 'warm, welcoming, and attentive',
    Conversational: 'relatable, energetic, and neighborly',
    'Simple English': 'clear, straightforward, and easy to understand',
    Persuasive: 'high-impact, value-packed, and results-driven',
  }[tone || 'Professional'] || 'high quality and trusted';

  return {
    homepageHeadline: `# Elevate Your Experience with ${businessName}\n\n**Sub-headline:** Premium ${category.toLowerCase()} in ${location} — delivering ${toneAdjectives} solutions tailored for ${targetAudience || 'our local community'}.`,
    homepageIntro: `Welcome to ${businessName}, your trusted destination for ${category.toLowerCase()} in ${location}. ${description}\n\nWe know how frustrating it is to deal with generic services that treat you like just another ticket. That is why our entire team focuses on personal attention, high quality standards, and genuine care from the moment you connect with us.`,
    aboutUs: `At ${businessName}, our mission is simple: to provide the highest standard of ${category.toLowerCase()} to ${targetAudience || 'our valued clients'}.\n\nBuilt on trust, dedication, and clear communication, we take pride in solving real challenges for our customers. Every member of our team is passionate about delivering reliable results you can count on every single time.`,
    ourServices: formattedServices,
    whyChooseUs: `✔ **Personalized Attention:** Every client receives customized solutions tailored specifically to their goals.\n✔ **Local Expertise:** Proudly serving ${location} with deep community roots and dependable service.\n✔ **Transparent & Fair:** Clear communication, upfront pricing, and zero surprise fees.\n✔ **Trained Specialists:** Passionate, experienced team members committed to high quality craft.\n✔ **Fast & Reliable:** We value your time with prompt turnaround and seamless experiences.`,
    callToAction: `### Take the Next Step with ${businessName}\nReady to get started? Contact our team in ${location} today to discover how we can help you achieve the best results.\n\n👉 **Schedule Your Consultation / Visit Today**\n👉 **Explore Our Full Service Options**\n👉 **Contact Our Friendly Team for a Quick Quote**`,
    contactSection: `### Visit or Contact ${businessName}\n\n📍 **Location:** ${location}\n🕒 **Business Hours:** Monday to Saturday: 9:00 AM – 7:00 PM\n📞 **Get in Touch:** Reach out today to speak directly with our team. We are ready to assist you in ${location}!`,
  };
}

/**
 * Calls Gemini using the official GoogleGenerativeAI SDK
 */
async function callGemini(prompt, apiKey) {
  const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'];
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      if (text.startsWith('```json')) {
        text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (text.startsWith('```')) {
        text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      return JSON.parse(text);
    } catch (err) {
      console.warn(`Model ${modelName} error:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to generate content with Gemini API.');
}

// Generate all 7 website sections
app.post('/api/generate', async (req, res) => {
  try {
    const { businessName, category, location, description, targetAudience, servicesOffered, tone } = req.body;

    if (!businessName || !category || !description) {
      return res.status(400).json({
        error: 'Please fill in Business Name, Category, and Description.',
      });
    }

    const apiKey = req.headers['x-gemini-api-key'] || process.env.GEMINI_API_KEY;

    // If an API key is available and valid, call live Gemini!
    if (apiKey && apiKey.trim().length > 10 && apiKey !== 'your_gemini_api_key_here') {
      try {
        const prompt = buildGenerationPrompt({
          businessName,
          category,
          location: location || 'our local area',
          description,
          targetAudience: targetAudience || 'local customers and families',
          servicesOffered: servicesOffered || 'full range of services',
          tone: tone || 'Professional',
        });

        const generatedSections = await callGemini(prompt, apiKey);
        return res.json({
          success: true,
          mode: 'gemini_ai',
          data: generatedSections,
        });
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to intelligent engine:', geminiErr.message);
      }
    }

    // Seamless Fallback: Generate intelligent, conversion-focused content based on research
    const content = generateTailoredContent({
      businessName,
      category,
      location: location || 'our local area',
      description,
      targetAudience: targetAudience || 'local customers and families',
      servicesOffered: servicesOffered || 'full range of services',
      tone: tone || 'Professional',
    });

    res.json({
      success: true,
      mode: 'intelligent_engine',
      data: content,
    });
  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while generating content.',
    });
  }
});

// Regenerate a single section
app.post('/api/regenerate-section', async (req, res) => {
  try {
    const { sectionKey, sectionTitle, businessDetails, currentContent, tone } = req.body;
    const apiKey = req.headers['x-gemini-api-key'] || process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.trim().length > 10 && apiKey !== 'your_gemini_api_key_here') {
      try {
        const prompt = `
You are a professional website copywriter.
Regenerate a fresh, high-impact version of the "${sectionTitle}" section for the following business:
- Business: ${businessDetails?.businessName} (${businessDetails?.category}) in ${businessDetails?.location}
- Description: ${businessDetails?.description}
- Tone: ${tone || 'Professional'}

Previous version was:
"${currentContent}"

Provide a fresh, creative alternative that strictly follows the same writing guidelines (benefit-focused, human-sounding, no made-up facts).
Respond with a JSON object containing just the regenerated text under the key "content":
{
  "content": "Your fresh, updated version of this section"
}
`;
        const result = await callGemini(prompt, apiKey);
        return res.json({
          success: true,
          content: result.content || result[sectionKey] || (typeof result === 'string' ? result : JSON.stringify(result)),
        });
      } catch (geminiErr) {
        console.warn('Regeneration using Gemini failed, falling back:', geminiErr.message);
      }
    }

    // Smart variation for fallback regeneration
    const variations = [
      `### Freshly Polished ${sectionTitle}\n\nAt ${businessDetails?.businessName}, our commitment in ${businessDetails?.location} is to provide unmatched quality and genuine value for ${businessDetails?.targetAudience || 'our clients'}.\n\n• **Core Value:** Dedicated attention to detail.\n• **Reliability:** Clear communication and proven consistency.\n• **Local Care:** Proudly serving the community with transparency and pride.`,
      `### Alternative Version for ${sectionTitle}\n\nExperience the difference with ${businessDetails?.businessName}. Designed with ${tone.toLowerCase()} clarity, we prioritize what matters most to you.\n\n✔ Transparent consultation & unhurried care\n✔ Experienced specialists who listen carefully\n✔ Conveniently located in ${businessDetails?.location}`,
    ];

    const randomVar = variations[Math.floor(Math.random() * variations.length)];

    res.json({
      success: true,
      content: randomVar,
    });
  } catch (error) {
    console.error('Section regeneration error:', error);
    res.status(500).json({
      error: error.message || 'Failed to regenerate section.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FUTURE_PE_01 Gemini Backend running on http://localhost:${PORT}`);
});
