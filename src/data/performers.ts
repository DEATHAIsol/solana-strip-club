export interface Performer {
  name: string;
  slug: string;
  age: number;
  location: string;
  height: string;
  heightCm: number;
  weight: string;
  weightKg: number;
  hair: string;
  eyes: string;
  vibe: string;
  bio: string;
  turnOns: string;
  languages: string[];
  imagePath: string;
}

export const performers: Performer[] = [
  {
    name: "Georgia Rae",
    slug: "georgia",
    age: 22,
    location: "Gold Coast, Australia",
    height: "5'6\"",
    heightCm: 168,
    weight: "122 lbs",
    weightKg: 55,
    hair: "Strawberry Blonde",
    eyes: "Green",
    vibe: "Beachy & Bubbly",
    bio: "Georgia's laid-back energy and cheeky Aussie charm make every session feel fun and personal. Catch her in bikinis, doing yoga, or streaming from the sand.",
    turnOns: "Fun accents, playful banter, and outdoorsy types.",
    languages: ["English"],
    imagePath: "/images/performers/georgia.jpg"
  },
  {
    name: "Jess Monroe",
    slug: "jess",
    age: 28,
    location: "Los Angeles, CA, USA",
    height: "5'9\"",
    heightCm: 175,
    weight: "135 lbs",
    weightKg: 61,
    hair: "Jet Black",
    eyes: "Brown",
    vibe: "Boss Babe Energy",
    bio: "A seasoned performer with a sultry, confident presence. Jess knows how to own the room. She's also an entrepreneur and fitness junkie.",
    turnOns: "Power dynamics, roleplay, and confidence.",
    languages: ["English", "French"],
    imagePath: "/images/performers/jess.jpg"
  },
  {
    name: "Bella Noir",
    slug: "bella",
    age: 25,
    location: "Montreal, Canada",
    height: "5'4\"",
    heightCm: 162,
    weight: "118 lbs",
    weightKg: 53,
    hair: "Raven Black",
    eyes: "Icy Grey",
    vibe: "Edgy & Artistic",
    bio: "Bella's aesthetic blends goth-chic with modern sensuality. She's into cosplay, digital art, and intimate storytelling. Every show is a mini experience.",
    turnOns: "Creativity, tattoos, and soft whispers.",
    languages: ["English", "French"],
    imagePath: "/images/performers/bella.jpg"
  },
  {
    name: "Amanda Blaze",
    slug: "amanda",
    age: 24,
    location: "Miami, FL, USA",
    height: "5'7\"",
    heightCm: 170,
    weight: "128 lbs",
    weightKg: 58,
    hair: "Blonde",
    eyes: "Blue",
    vibe: "Glam & Playful",
    bio: "Amanda's signature flirty energy and spontaneous shows have made her a fan favorite. Loves tropical getaways, iced coffee, and lingerie try-ons.",
    turnOns: "Confident vibes, good music, and late-night chats.",
    languages: ["English", "Spanish"],
    imagePath: "/images/performers/amanda.jpg"
  },
  {
    name: "Caitlin Rose",
    slug: "caitlin",
    age: 26,
    location: "Manchester, UK",
    height: "5'5\"",
    heightCm: 165,
    weight: "120 lbs",
    weightKg: 54,
    hair: "Dark Brown",
    eyes: "Hazel",
    vibe: "Sensual & Mysterious",
    bio: "With a velvet voice and seductive energy, Caitlin delivers slow-burn shows with maximum tension. Off-cam, she's into poetry, red wine, and pole fitness.",
    turnOns: "Dirty talk, subtle teasing, and candle-lit vibes.",
    languages: ["English"],
    imagePath: "/images/performers/caitlin.jpg"
  }
]; 