// src/data/mockData.ts

export interface PropertyCard {
  id: number;
  image: string;
  location: string;
  title: string;
  description: string;
  beds: number;
  baths: number;
  sqft: string;
  price: string;
}

export interface StatItem {
  value: string;
  label: string;
}

// 1. Matrix Brand Statistics Data
export const STATS_DATA: StatItem[] = [
  { value: "12", label: "Active Listings" },
  { value: "AED 206.52M", label: "Portfolio Value" },
  { value: "11", label: "Neighbourhoods" },
  { value: "12", label: "Years In Market" },
];

// 2. Premium Real Estate Listings Data
export const RESIDENCES_DATA: PropertyCard[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    location: "Palm Jumeirah",
    title: "Signature Villa on Palm Jumeirah",
    description: "A sculptural 5-bedroom villa on the eastern crescent of Palm Jumeirah...",
    beds: 5,
    baths: 6,
    sqft: "7,800 ft\u00B2",
    price: "AED 28.5M"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    location: "Downtown Dubai",
    title: "Sky Penthouse, Burj Residences",
    description: "A four-bedroom penthouse on the 72nd floor of Burj Residences with...",
    beds: 4,
    baths: 5,
    sqft: "5,400 ft\u00B2",
    price: "AED 19.25M"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    location: "Emirates Hills",
    title: "Grand Mansion in Emirates Hills",
    description: "A landmark eight-bedroom mansion on a 25,000 sqft plot, with a privat...",
    beds: 8,
    baths: 10,
    sqft: "21,500 ft\u00B2",
    price: "AED 78M"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    location: "JBR",
    title: "Beachfront Duplex on The Walk, JBR",
    description: "Two-storey 3-bedroom duplex with direct access to The Beach at JBR....",
    beds: 3,
    baths: 4,
    sqft: "3,400 ft\u00B2",
    price: "AED 11.5M"
  }
];

export const SERVICES_DATA = [
  {
    id: 1,
    title: "Sales",
    description: "Discreet representation of villas, penthouses, and apartments across Dubai's prime addresses.",
    iconType: "sales"
  },
  {
    id: 2,
    title: "Acquisition",
    description: "Buyer-side advisory for residents, family offices, and international purchasers.",
    iconType: "acquisition"
  },
  {
    id: 3,
    title: "Leasing",
    description: "Long-term leases of furnished and unfurnished residences for the city's professionals.",
    iconType: "leasing"
  },
  {
    id: 4,
    title: "Portfolio",
    description: "Asset management and tenancy stewardship for owners who live abroad.",
    iconType: "portfolio"
  }
];

export const NEIGHBOURHOODS_DATA = [
  { id: 1, name: "Arabian Ranches" },
  { id: 2, name: "Bluewaters Island" },
  { id: 3, name: "Business Bay" },
  { id: 4, name: "Downtown Dubai" },
  { id: 5, name: "Dubai Hills" },
  { id: 6, name: "Dubai Marina" },
  { id: 7, name: "Emirates Hills" },
  { id: 8, name: "JBR" },
  { id: 9, name: "Jumeirah Golf Estates" },
  { id: 10, name: "Mudon" },
  { id: 11, name: "Palm Jumeirah" }
];

export const PROCESS_DATA = [
  {
    step: "01",
    title: "Introduction",
    description: "A conversation with one of our directors to understand the brief."
  },
  {
    step: "02",
    title: "Shortlist",
    description: "A considered selection of three to five residences that match the brief."
  },
  {
    step: "03",
    title: "Viewings",
    description: "Private tours arranged at your convenience, in-person or by video."
  },
  {
    step: "04",
    title: "Closing",
    description: "Negotiation, contract, and registration coordinated end-to-end."
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "They found us a home we did not know existed, in a building we had never heard of. A year in, we are still grateful.",
    author: "FAMILY RELOCATING FROM LONDON"
  },
  {
    id: 2,
    quote: "The studio handled three rounds of negotiation with the same composure. The price reflected it.",
    author: "BUYER, EMIRATES HILLS"
  },
  {
    id: 3,
    quote: "We trusted them with the leasing of two properties while we were abroad. Both let in under a month.",
    author: "OWNER, PALM JUMEIRAH"
  }
];