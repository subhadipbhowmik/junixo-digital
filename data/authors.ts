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
    avatar: "https://shubhadipbhowmik.vercel.app/me.png",
    role: "Lead Content Strategist",
    social: {
      twitter: "http://x.com/myselfshubhadip",
      linkedin: "https://linkedin.com/in/shubhadip-bhowmik",
    },
  },
  "sarah-mitchell": {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    bio: "Sarah is a senior SEO strategist at Junixo with 8+ years of experience helping brands rank #1 on Google. She specialises in technical SEO and content-led growth.",
    avatar: "https://placehold.co/80x80/eff6ff/3b82f6?text=SM",
    role: "Senior SEO Strategist",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  "james-okafor": {
    id: "james-okafor",
    name: "James Okafor",
    bio: "James leads paid media at Junixo, managing millions in ad spend. He's obsessed with ROAS optimisation and conversion-focused campaign architecture.",
    avatar: "https://placehold.co/80x80/f0fdf4/22c55e?text=JO",
    role: "Head of Paid Media",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  "priya-sharma": {
    id: "priya-sharma",
    name: "Priya Sharma",
    bio: "Priya is a full-stack developer and web performance specialist. She builds blazing-fast websites that rank, convert, and scale.",
    avatar: "https://placehold.co/80x80/fdf4ff/a855f7?text=PS",
    role: "Lead Web Developer",
    social: {
      linkedin: "https://linkedin.com",
      website: "https://junixo.com",
    },
  },
};