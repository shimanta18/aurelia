export interface Article {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
}

export const mockJournalData: Article[] = [
  {
    id: '1',
    date: '12 JUNE 2026',
    title: 'Dubai Prime Market Review, Q2 2026',
    excerpt: 'Where prices held, where they moved, and the neighbourhoods quietly setting new records.',
    imageUrl: 'https://images.unsplash.com/photo-1582672013024-3a96999311b0?q=80&w=800&auto=format&fit=crop',
    slug: 'dubai-prime-market-review-q2-2026'
  },
  {
    id: '2',
    date: '4 JUNE 2026',
    title: 'Designing a Home That Belongs in Dubai',
    excerpt: 'Six principles that drive human-centric architecture choices which feel authentic and contextual to the region.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    slug: 'designing-a-home-that-belongs-in-dubai'
  },
  {
    id: '3',
    date: '26 MAY 2026',
    title: "A Buyer's Guide to Palm Jumeirah",
    excerpt: 'What to look for, what to avoid, and how the fronds, trunk, and crescent differ in practice.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    slug: 'buyers-guide-to-palm-jumeirah'
  }
];