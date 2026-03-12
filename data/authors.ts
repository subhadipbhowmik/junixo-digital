// data/authors.ts

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const authors: Record<string, Author> = {
  "junixo-team": {
    id: "junixo-team",
    name: "Junixo Digital Team",
    bio: "The Junixo Digital team is a collective of strategists, developers, and marketers passionate about building high-performance digital experiences that drive real business growth.",
    avatar: "https://placehold.co/80x80/fff7ed/f97316?text=JD",
    role: "Digital Growth Agency",
    social: {
      twitter: "https://twitter.com/junixo",
      linkedin: "https://linkedin.com/company/junixo",
      website: "https://junixo.com",
    },
  },
    "shubhadip-bhowmik": {
    id: "shubhadip-bhowmik",
    name: "Shubhadip Bhowmik",
    bio: "Shubhadip is a lead content strategist at Junixo with 7+ years of experience in creating compelling narratives that drive engagement and conversions.",
    avatar: "https://avatars.githubusercontent.com/u/57017965?v=4",
    role: "Lead Content Strategist",
    social: {
      twitter: "http://x.com/myselfshubhadip",
      linkedin: "https://linkedin.com/in/shubhadip-bhowmik",
    },
  },

};