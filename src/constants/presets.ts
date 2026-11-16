import { BusinessFormData, SectionMeta } from '../types';

export const SWASTHYA_CARE_CLINIC_PRESET: BusinessFormData = {
  businessName: 'Swasthya Care Clinic',
  category: 'Healthcare clinics',
  location: 'Indiranagar, Bangalore',
  description:
    'A neighborhood family healthcare & diagnostic clinic committed to personal attention, clear medical explanations in simple language, affordable pricing, and a calm, non-crowded environment with same-day in-house lab reports.',
  targetAudience: 'Families, working professionals, senior citizens, and parents with children in Indiranagar',
  servicesOffered:
    'General Physician Consultation, Preventive Health Check-ups, In-House Laboratory Blood & Urine Tests, Senior Citizen Chronic Disease Monitoring, Pediatric & Child Care',
  tone: 'Professional',
};

export const OTHER_PRESETS: Record<string, BusinessFormData> = {
  restaurant: {
    businessName: 'Spice & Soul Bistro',
    category: 'Restaurants',
    location: 'Koramangala, Bangalore',
    description:
      'An artisanal farm-to-table kitchen serving authentic coastal flavors, woodfired sourdough pizzas, and handcrafted herbal beverages in an open-air garden setting.',
    targetAudience: 'Food lovers, young professionals, weekend family gatherings, and brunch seekers',
    servicesOffered: 'Dine-in tasting menus, weekend live acoustic brunches, private table reservations, craft cocktail pairings',
    tone: 'Conversational',
  },
  salon: {
    businessName: 'Luxe Glow Hair & Skin Studio',
    category: 'Beauty salons',
    location: 'Bandra West, Mumbai',
    description:
      'A boutique organic beauty salon specializing in customized hair transformations, restorative scalp therapies, and cruelty-free botanical skin rituals.',
    targetAudience: 'Modern urban women and men seeking mindful self-care and personalized styling',
    servicesOffered: 'Balayage & creative coloring, organic scalp detox, hydra-glow facials, bridal hair & makeup artistry',
    tone: 'Friendly',
  },
  coaching: {
    businessName: 'Apex STEM & Coding Academy',
    category: 'Coaching centres',
    location: 'Sector 62, Noida',
    description:
      'A modern learning centre dedicated to teaching robotics, AI fundamentals, mathematics, and Olympiad foundations with hands-on projects and micro-batches of only 8 students.',
    targetAudience: 'Parents of students aged 8-16 seeking critical thinking and future-ready tech skills',
    servicesOffered: 'Foundational Python & AI, Robotics lab workshops, Mental math mastery, 1-on-1 Olympiad mentoring',
    tone: 'Persuasive',
  },
  retail: {
    businessName: 'The Green Loom Organics',
    category: 'Retail shops',
    location: 'Jubilee Hills, Hyderabad',
    description:
      'A curated sustainable lifestyle boutique showcasing handwoven cotton apparel, chemical-free home textiles, and zero-waste daily essentials crafted by regional artisan cooperatives.',
    targetAudience: 'Eco-conscious shoppers, interior aesthetics lovers, mindful lifestyle practitioners',
    servicesOffered: 'Organic cotton home linen, handloom apparel, refillable eco-cleaners, handcrafted brassware',
    tone: 'Simple English',
  },
  small_business: {
    businessName: 'NextGen Cloud Accounting',
    category: 'Small businesses',
    location: 'Whitefield, Bangalore',
    description:
      'A proactive financial advisory and bookkeeping studio helping startups, freelancing creators, and local retail stores automate GST compliance, payroll, and cash flow forecasting without spreadsheets.',
    targetAudience: 'Startup founders, boutique owners, freelancers, and growing service firms',
    servicesOffered: 'Automated bookkeeping, monthly GST filings, payroll management, fractional CFO advisory',
    tone: 'Professional',
  },
};

export const SECTIONS_METADATA: SectionMeta[] = [
  {
    key: 'homepageHeadline',
    title: '1. Homepage Headline & Tagline',
    badge: 'Above The Fold',
    iconName: 'Sparkles',
    placeholderPrompt: 'Primary high-converting headline, sub-headline, and quick value hook.',
  },
  {
    key: 'homepageIntro',
    title: '2. Homepage Introduction',
    badge: 'Welcome Story',
    iconName: 'BookOpen',
    placeholderPrompt: 'Warm introductory paragraphs welcoming visitors and explaining what makes the business unique.',
  },
  {
    key: 'aboutUs',
    title: '3. About Us & Our Mission',
    badge: 'Core Identity',
    iconName: 'Users',
    placeholderPrompt: 'Story of how the business started, values, and dedication to the local community.',
  },
  {
    key: 'ourServices',
    title: '4. Our Services & Offerings',
    badge: 'Core Solutions',
    iconName: 'Briefcase',
    placeholderPrompt: 'Detailed breakdowns of each key service with tangible customer benefits.',
  },
  {
    key: 'whyChooseUs',
    title: '5. Why Choose Us',
    badge: 'Trust & Proof',
    iconName: 'CheckCircle',
    placeholderPrompt: 'Specific trust badges, differentiator points, and customer peace-of-mind assurances.',
  },
  {
    key: 'callToAction',
    title: '6. Call To Action (CTA)',
    badge: 'Conversion Engine',
    iconName: 'MousePointerClick',
    placeholderPrompt: 'Action-driving prompts for immediate booking, consultation, or visiting.',
  },
  {
    key: 'contactSection',
    title: '7. Contact & Visit Us',
    badge: 'Local Connect',
    iconName: 'MapPin',
    placeholderPrompt: 'Welcoming directions, visiting hours, and friendly contact encouragement.',
  },
];
