export type ProjectCategory =
  | "Residential"
  | "Apartments"
  | "Gated communities"
  | "Commercial"
  | "Mixed use";

export type ProjectStatus = "Concept" | "In preparation" | "Pipeline";

export type Project = {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  opportunity: string;
  featuredImage: string;
  gallery: string[];
  scale: string;
  amenities: string[];
  featured: boolean;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  category: "Land" | "Investment" | "Development" | "Market" | "Design";
  excerpt: string;
  author: string;
  date: string;
  featuredImage: string;
  content: string[];
  featured: boolean;
};

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Developments", href: "/developments" },
  { label: "Landowners", href: "/landowners" },
  { label: "Investors", href: "/investors" },
  { label: "Insights", href: "/insights" },
];

export const projectCategories = [
  "All",
  "Residential",
  "Apartments",
  "Gated communities",
  "Commercial",
  "Mixed use",
] as const;

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "the-greenline-residences",
    name: "The Greenline Residences",
    location: "Nairobi metropolitan area",
    category: "Residential",
    status: "Concept",
    description:
      "A placeholder concept for a low-density residential development shaped around landscape, connection and everyday ease.",
    opportunity:
      "This editable project record demonstrates how a strategically positioned parcel can be translated into a considered residential neighbourhood. Replace the concept content with verified project information when ready.",
    featuredImage: "/freco-residential.webp",
    gallery: ["/freco-residential.webp", "/freco-hero.webp"],
    scale: "Project information to be provided",
    amenities: ["Landscape-led planning", "Community spaces", "Project information to be provided"],
    featured: true,
  },
  {
    id: "project-02",
    slug: "the-canopy-apartments",
    name: "The Canopy Apartments",
    location: "Location to be provided",
    category: "Apartments",
    status: "In preparation",
    description:
      "A placeholder apartment development record for a future urban living opportunity with a strong relationship to green space.",
    opportunity:
      "Use this space to explain why the location, access and intended resident experience make the opportunity meaningful. No project claims are made until the facts are supplied.",
    featuredImage: "/freco-apartments.webp",
    gallery: ["/freco-apartments.webp", "/freco-commercial.webp"],
    scale: "Project information to be provided",
    amenities: ["Contemporary urban living", "Shared green space", "Project information to be provided"],
    featured: true,
  },
  {
    id: "project-03",
    slug: "district-02-mixed-use",
    name: "District 02",
    location: "Location to be provided",
    category: "Mixed use",
    status: "Pipeline",
    description:
      "A placeholder mixed-use development record for a future district that brings homes, commerce and public life closer together.",
    opportunity:
      "When the verified development brief is available, this section becomes the narrative layer for the location, market and community opportunity behind the project.",
    featuredImage: "/freco-commercial.webp",
    gallery: ["/freco-commercial.webp", "/freco-apartments.webp"],
    scale: "Project information to be provided",
    amenities: ["Mixed-use planning", "Public-facing spaces", "Project information to be provided"],
    featured: true,
  },
];

export const insights: Insight[] = [
  {
    id: "insight-01",
    slug: "what-makes-land-strategically-valuable",
    title: "What Makes Land Strategically Valuable?",
    category: "Land",
    excerpt: "Land value begins with more than size. Location, access, context and possible futures all matter.",
    author: "FRECO ART Editorial",
    date: "September 13, 2026",
    featuredImage: "/freco-hero.webp",
    content: [
      "Strategic land is not defined by a single metric. It is understood through the relationship between location, movement, infrastructure, demand and what the surrounding area may become over time.",
      "For landowners and development partners, the first question is rarely simply what the land is worth today. The more useful question is what the land can responsibly support, and what structure can help that potential become real.",
      "At FRECO ART, the early work is about seeing the wider picture before a development direction is chosen. That means asking better questions about context, feasibility and purpose.",
    ],
    featured: true,
  },
  {
    id: "insight-02",
    slug: "five-things-to-evaluate-before-developing-land",
    title: "5 Things to Evaluate Before Developing Land",
    category: "Development",
    excerpt: "A practical starting point for understanding whether a parcel is ready for a development conversation.",
    author: "FRECO ART Editorial",
    date: "September 6, 2026",
    featuredImage: "/freco-residential.webp",
    content: [
      "Before a development concept is drawn, a parcel needs to be understood in context. The most attractive idea is only useful when it meets the realities of access, services, planning and demand.",
      "Start with location and movement. Then consider the surrounding development pattern, the likely user, the service infrastructure and the relationship between the site and its wider community.",
      "A strong development conversation is built on evidence and alignment. The earlier those are made visible, the clearer the path forward becomes.",
    ],
    featured: true,
  },
  {
    id: "insight-03",
    slug: "land-vs-development-where-does-value-come-from",
    title: "Land vs Development: Where Does the Real Value Come From?",
    category: "Investment",
    excerpt: "The difference between holding an asset and unlocking what it can become.",
    author: "FRECO ART Editorial",
    date: "August 28, 2026",
    featuredImage: "/freco-apartments.webp",
    content: [
      "Land is an important starting point, but development is the process that connects a site to a real use, a real market and a real experience.",
      "That process requires discipline. A development direction needs to be grounded in location, feasibility, a clear audience and a structure that aligns the people involved.",
      "The opportunity is not simply to build more. It is to create something relevant, durable and purposeful in the place where it stands.",
    ],
    featured: true,
  },
  {
    id: "insight-04",
    slug: "what-landowners-should-understand-before-a-partnership",
    title: "What Landowners Should Understand Before a Development Partnership",
    category: "Partnerships" as Insight["category"],
    excerpt: "The right partnership starts with clear expectations, shared information and a common view of the opportunity.",
    author: "FRECO ART Editorial",
    date: "August 21, 2026",
    featuredImage: "/freco-commercial.webp",
    content: [
      "A development partnership is a serious conversation about land, responsibility and what the opportunity needs from each party.",
      "Before moving forward, landowners should have space to understand the possible direction, the assumptions behind it and the decisions that will shape the relationship.",
      "Clarity is not a formality. It is the foundation for trust and for building something that can create meaningful value beyond the original parcel.",
    ],
    featured: false,
  },
];

export const methodSteps = [
  { number: "01", title: "Identify", text: "We identify land with strategic development potential." },
  { number: "02", title: "Evaluate", text: "We assess location, market potential, feasibility and development possibilities." },
  { number: "03", title: "Structure", text: "We create partnership and development structures aligned with the opportunity." },
  { number: "04", title: "Develop", text: "We coordinate the transformation from concept to tangible development." },
  { number: "05", title: "Unlock", text: "We create value for landowners, investors, buyers and communities." },
];

export const developmentCategories = [
  {
    label: "Residential",
    title: "Purposeful homes designed around how people live.",
    image: "/freco-residential.webp",
    href: "/developments?category=Residential",
  },
  {
    label: "Apartments",
    title: "Modern developments for contemporary urban living.",
    image: "/freco-apartments.webp",
    href: "/developments?category=Apartments",
  },
  {
    label: "Gated communities",
    title: "Integrated communities built around security, lifestyle and long-term value.",
    image: "/freco-residential.webp",
    href: "/developments?category=Gated%20communities",
  },
  {
    label: "Commercial & mixed use",
    title: "Strategically planned places designed to create economic activity and lasting value.",
    image: "/freco-commercial.webp",
    href: "/developments?category=Mixed%20use",
  },
];

export const insightCategories = ["All", "Land", "Investment", "Development", "Market", "Design"] as const;
