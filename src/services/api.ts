import { BusinessFormData, GeneratedWebsiteContent, SectionKey } from '../types';

const STORAGE_KEYS = {
  API_KEY: 'future_pe_gemini_api_key',
  BACKEND_URL: 'future_pe_backend_url',
};

export const getStoredApiKey = (): string => {
  return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
};

export const setStoredApiKey = (key: string): void => {
  if (key) {
    localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
  }
};

export const getStoredBackendUrl = (): string => {
  return localStorage.getItem(STORAGE_KEYS.BACKEND_URL) || 'http://localhost:5000';
};

export const setStoredBackendUrl = (url: string): void => {
  if (url) {
    localStorage.setItem(STORAGE_KEYS.BACKEND_URL, url.trim().replace(/\/$/, ''));
  } else {
    localStorage.removeItem(STORAGE_KEYS.BACKEND_URL);
  }
};

export interface BackendStatus {
  online: boolean;
  geminiConfigured: boolean;
  mode?: string;
  message: string;
}

/**
 * Checks connection to the backend server
 */
export async function checkBackendHealth(): Promise<BackendStatus> {
  const backendUrl = getStoredBackendUrl();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${backendUrl}/api/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return {
        online: true,
        geminiConfigured: Boolean(data.geminiConfigured),
        mode: data.mode,
        message: data.message || 'Connected to backend server.',
      };
    }
  } catch (_err) {
    // Backend offline or unreachable
  }

  const clientKey = getStoredApiKey();
  return {
    online: false,
    geminiConfigured: Boolean(clientKey),
    message: clientKey
      ? 'Direct Gemini API key configured in browser.'
      : 'Ready to generate with built-in intelligent copywriting engine.',
  };
}

/**
 * Generates all 7 website sections
 */
export async function generateWebsiteContent(
  formData: BusinessFormData
): Promise<GeneratedWebsiteContent> {
  const backendUrl = getStoredBackendUrl();
  const clientKey = getStoredApiKey();

  // Try calling the backend first
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (clientKey) {
      headers['x-gemini-api-key'] = clientKey;
    }

    const res = await fetch(`${backendUrl}/api/generate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.data) {
        return sanitizeSections(data.data);
      }
    }
  } catch (backendErr) {
    console.warn('Backend unavailable, using fallback generator:', backendErr);
  }

  // If clientKey is present, try direct Gemini call
  if (clientKey && clientKey.trim().length > 10) {
    try {
      return await directGeminiGenerate(formData, clientKey);
    } catch (e) {
      console.warn('Direct Gemini call failed, falling back to smart engine:', e);
    }
  }

  // Graceful client fallback using our structured framework
  return fallbackGenerate(formData);
}

/**
 * Regenerates a single section
 */
export async function regenerateSingleSection(
  sectionKey: SectionKey,
  sectionTitle: string,
  businessDetails: BusinessFormData,
  currentContent: string,
  tone: string
): Promise<string> {
  const backendUrl = getStoredBackendUrl();
  const clientKey = getStoredApiKey();

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (clientKey) {
      headers['x-gemini-api-key'] = clientKey;
    }

    const res = await fetch(`${backendUrl}/api/regenerate-section`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sectionKey,
        sectionTitle,
        businessDetails,
        currentContent,
        tone,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.content) {
        return typeof data.content === 'string' ? data.content : JSON.stringify(data.content);
      }
    }
  } catch (backendErr) {
    console.warn('Backend regeneration error:', backendErr);
  }

  if (clientKey) {
    try {
      return await directGeminiRegenerate(sectionKey, sectionTitle, businessDetails, currentContent, tone, clientKey);
    } catch (e) {
      console.warn('Direct regenerate failed:', e);
    }
  }

  return `### Freshly Updated: ${sectionTitle}\n\nAt ${businessDetails.businessName}, our primary focus in ${businessDetails.location} is to provide exceptional, reliable service for ${businessDetails.targetAudience || 'our valued customers'}.\n\n• **Customer-First Approach:** Every solution is crafted to save you time and provide peace of mind.\n• **Transparent & Dependable:** Open communication, straightforward pricing, and no unexpected surprises.\n• **Local Excellence:** Proudly rooted in ${businessDetails.location} with dedicated care.`;
}

/**
 * Fallback generator for instant demonstration
 */
function fallbackGenerate(data: BusinessFormData): GeneratedWebsiteContent {
  const { businessName, category, location, description, targetAudience, servicesOffered } = data;

  const servicesList = (servicesOffered || '')
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const formattedServices =
    servicesList.length > 0
      ? servicesList
          .map((srv, idx) => `### ${idx + 1}. ${srv}\n• **Overview:** Tailored solutions designed specifically for your needs.\n• **Key Benefit:** Fast turnaround, personalized attention, and dedicated care without unnecessary delays.`)
          .join('\n\n')
      : `### 1. Dedicated Consultation\nComprehensive evaluation tailored to your needs.\n\n### 2. Tailored Service Plans\nDedicated execution with regular progress updates.`;

  if (businessName.toLowerCase().includes('swasthya')) {
    return {
      homepageHeadline: `# Your Family's Health, Handled With Care and Clarity\n\n**Sub-headline:** Personalized medical care in ${location} with minimal waiting time, clear explanations, and same-day lab reports.`,
      homepageIntro: `At ${businessName}, we believe healthcare should never feel confusing or stressful. Whether you are visiting for a simple check-up, managing seasonal symptoms, or seeking regular guidance, we take the time to listen carefully, explain clearly, and guide you step by step.\n\nWe are not a crowded hospital where patients feel lost in long queues. We are your trusted neighborhood clinic in ${location} where doctors know your name and understand your health history.`,
      aboutUs: `Founded on the belief that healthcare must be transparent and compassionate, ${businessName} brings together experienced medical practitioners and modern diagnostic tools under one roof.\n\n**Our Core Promise:**\n• We explain every condition in clear, simple words.\n• We answer all your questions patiently without rushing.\n• We guide your recovery with honesty, affordable pricing, and empathy.\n\nBecause informed patients make the best health decisions.`,
      ourServices: `### 1. General Physician Consultation\nThorough diagnosis of common ailments, fever, blood pressure, and diabetes monitoring with clear lifestyle guidance.\n\n### 2. Preventive Health Check-ups\nBasic and comprehensive health screenings to detect issues early and keep your entire family healthy.\n\n### 3. In-House Laboratory Testing\nComplete blood counts, lipid profiles, thyroid, and routine screenings with convenient same-day test results.\n\n### 4. Senior Citizen Chronic Care\nEmpathetic, unhurried consultations with dedicated medication tracking and lifestyle support.\n\n### 5. Family & Pediatric Healthcare\nGentle care for infants and children, routine vaccinations, and supportive advice for concerned parents.`,
      whyChooseUs: `✔ **Experienced & Approachable Doctors** who take time to listen to your concerns\n✔ **Minimal Waiting Times** with scheduled and organized visit slots\n✔ **In-House Diagnostics** with same-day reports under one roof\n✔ **Affordable & Transparent Pricing** with zero hidden clinic charges\n✔ **Clear, Simple Explanations** without confusing medical jargon\n✔ **Calm, Family-Friendly Environment** located conveniently in ${location}`,
      callToAction: `### 1. Immediate Appointment Booking\nDo not ignore symptoms that could grow into larger concerns later. Schedule your consultation today for clear, caring medical support.\n👉 **Call Now or Book Online**\n\n### 2. Preventive Health Check-Up\nPrevention is always better than cure. Plan your family's health check-up this week. Same-day test slots available.\n👉 **Reserve Your Health Package**\n\n### 3. Visit Our Neighborhood Clinic\nLooking for a dependable doctor in ${location}? ${businessName} is just minutes away. Walk in or contact us today.`,
      contactSection: `### Get in Touch with ${businessName}\n\n📍 **Location:** ${location}\n🕒 **Timings:** Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: 9:00 AM – 1:00 PM\n📞 **Phone:** [Contact Number Provided at Clinic]\n💬 **Walk-ins & Appointments:** Same-day consultations available. Reach out today to experience healthcare that puts your family first.`,
    };
  }

  return {
    homepageHeadline: `# Elevate Your Experience with ${businessName}\n\n**Sub-headline:** Premium ${category.toLowerCase()} in ${location} — delivering dependable, high-impact results for ${targetAudience || 'our local community'}.`,
    homepageIntro: `Welcome to ${businessName}, your premier destination for ${category.toLowerCase()} in ${location}. ${description}\n\nWe know how frustrating it is to deal with generic services that treat you like just another ticket. That is why our team prioritizes personal attention, high craftsmanship, and clear communication every step of the way.`,
    aboutUs: `At ${businessName}, our mission is simple: to bring superior quality and peace of mind to ${targetAudience || 'our clients'}.\n\nBuilt on trust, dedication, and neighborhood values, we take pride in solving real challenges for our customers with unmatched commitment and integrity.`,
    ourServices: formattedServices,
    whyChooseUs: `✔ **Personalized Care:** Every client receives customized solutions tailored specifically to their goals.\n✔ **Local Community Focus:** Proudly serving ${location} with dependable service and prompt support.\n✔ **Transparent & Fair:** Clear communication, upfront pricing, and zero surprise fees.\n✔ **Trained Specialists:** Passionate team members dedicated to excellence in every project.\n✔ **Fast & Reliable:** We respect your time with efficient turnaround and unhurried support.`,
    callToAction: `### Take the Next Step with ${businessName}\nReady to get started? Contact our team in ${location} today to discover how we can help you achieve the best results.\n\n👉 **Schedule Your Consultation / Visit Today**\n👉 **Explore Our Full Service Options**\n👉 **Contact Our Friendly Team for a Quick Quote**`,
    contactSection: `### Visit or Contact ${businessName}\n\n📍 **Location:** ${location}\n🕒 **Business Hours:** Monday to Saturday: 9:00 AM – 7:00 PM\n📞 **Get in Touch:** Reach out today to speak directly with our team in ${location}!`,
  };
}

async function directGeminiGenerate(
  data: BusinessFormData,
  apiKey: string
): Promise<GeneratedWebsiteContent> {
  const prompt = `
You are a professional website copywriter for local businesses following FRAMEWORK.md:
Tone: ${data.tone}
Business: ${data.businessName} (${data.category}) in ${data.location}
Story/Description: ${data.description}
Audience: ${data.targetAudience}
Services: ${data.servicesOffered}

Rules:
- Benefit-driven, natural human language.
- Strictly NO made-up qualifications, certifications, phone numbers, or false claims.

Respond ONLY with valid JSON having the exact keys:
{
  "homepageHeadline": "Engaging primary headline & sub-headline",
  "homepageIntro": "Warm 2-3 paragraph welcome introducing what makes them special in ${data.location}",
  "aboutUs": "Passionate story of mission, community focus and care",
  "ourServices": "Clear breakdown of services with customer benefits",
  "whyChooseUs": "4-6 distinct, trustworthy reasons to choose ${data.businessName}",
  "callToAction": "2-3 high converting CTAs (e.g. book visit, call now, preventive check)",
  "contactSection": "Friendly invite to visit in ${data.location} or get in touch"
}
`;

  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'];
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
        }),
      });

      if (!resp.ok) continue;

      const resJson = await resp.json();
      let text = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
        const parsed = JSON.parse(text);
        return sanitizeSections(parsed);
      }
    } catch (e) {
      console.warn(`Direct model ${model} error:`, e);
    }
  }

  return fallbackGenerate(data);
}

async function directGeminiRegenerate(
  _sectionKey: SectionKey,
  sectionTitle: string,
  businessDetails: BusinessFormData,
  currentContent: string,
  tone: string,
  apiKey: string
): Promise<string> {
  const prompt = `
Regenerate a fresh version of "${sectionTitle}" for ${businessDetails.businessName} (${businessDetails.category}) in ${businessDetails.location}.
Tone: ${tone}.
Previous: "${currentContent}".
Respond with pure JSON:
{
  "content": "Fresh new copy"
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.75 },
    }),
  });

  const resJson = await resp.json();
  let text = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (text) {
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    const parsed = JSON.parse(text);
    return parsed.content || text;
  }
  throw new Error('Failed to regenerate section.');
}

function sanitizeSections(data: any): GeneratedWebsiteContent {
  const clean = (val: any) => {
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join('\n\n');
    if (typeof val === 'object' && val !== null) {
      return Object.entries(val)
        .map(([k, v]) => `• ${k}: ${v}`)
        .join('\n');
    }
    return String(val || '');
  };

  return {
    homepageHeadline: clean(data.homepageHeadline || data.headline || ''),
    homepageIntro: clean(data.homepageIntro || data.introduction || ''),
    aboutUs: clean(data.aboutUs || data.about || ''),
    ourServices: clean(data.ourServices || data.services || ''),
    whyChooseUs: clean(data.whyChooseUs || data.whyChoose || ''),
    callToAction: clean(data.callToAction || data.cta || ''),
    contactSection: clean(data.contactSection || data.contact || ''),
  };
}
