export type BusinessCategory =
  | 'Healthcare clinics'
  | 'Restaurants'
  | 'Beauty salons'
  | 'Coaching centres'
  | 'Retail shops'
  | 'Small businesses';

export type WritingTone =
  | 'Professional'
  | 'Friendly'
  | 'Conversational'
  | 'Simple English'
  | 'Persuasive';

export interface BusinessFormData {
  businessName: string;
  category: BusinessCategory;
  location: string;
  description: string;
  targetAudience: string;
  servicesOffered: string;
  tone: WritingTone;
}

export interface GeneratedWebsiteContent {
  homepageHeadline: string;
  homepageIntro: string;
  aboutUs: string;
  ourServices: string;
  whyChooseUs: string;
  callToAction: string;
  contactSection: string;
}

export type SectionKey = keyof GeneratedWebsiteContent;

export interface SectionMeta {
  key: SectionKey;
  title: string;
  badge: string;
  iconName: string;
  placeholderPrompt: string;
}
