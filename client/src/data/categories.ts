export interface Category {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export const categories: Category[] = [
  {
    title: "Content Marketing",
    slug: "content-marketing",
    description: "Articles on creating valuable, relevant content that attracts and engages your target audience.",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    title: "Conversion Optimization",
    slug: "conversion-optimization",
    description: "Techniques to convert more website visitors into leads and customers through strategic optimization.",
    imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    title: "Analytics & Measurement",
    slug: "analytics",
    description: "Resources on tracking, measuring, and analyzing marketing performance to make data-driven decisions.",
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
  },
  {
    title: "Social Media Marketing",
    slug: "social-media",
    description: "Strategies to build your brand, engage your audience, and drive results through social media platforms.",
    imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Email Marketing",
    slug: "email-marketing",
    description: "Tactics for building email lists, creating engaging campaigns, and automating email sequences for maximum impact.",
    imageUrl: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Brand Strategy",
    slug: "brand-strategy",
    description: "Insights on developing a strong brand identity, positioning, and communication that resonates with your audience.",
    imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];
