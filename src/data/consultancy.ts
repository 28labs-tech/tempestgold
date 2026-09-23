import {
  Building2,
  Scale,
  BarChart3,
  Compass,
  KeyRound,
  Handshake,
  HardHat,
  BriefcaseBusiness,
} from "lucide-react";

export const positioning =
  "Tempest Gold Property is a Botswana-based real estate advisory and property consultancy providing practical, evidence-led solutions across the property lifecycle.";
export const introduction =
  "Tempest Gold Property is a Botswana-based real estate advisory and property consultancy delivering professional, evidence-led solutions to individuals, businesses, investors and institutions. Our expertise spans the property lifecycle, from transactions, valuations and market research to feasibility studies, property management, project management and investment advisory. With deep knowledge of the Botswana property market and a commitment to professional excellence, we help clients understand opportunities, manage risk and make informed property decisions.";
export const services = [
  {
    slug: "property-sales-lettings",
    title: "Property Sales & Lettings",
    icon: Building2,
    description:
      "Property marketing, sales and leasing support for residential, commercial, industrial and other property assets.",
    focus: [
      "Property marketing",
      "Sales and leasing support",
      "Transaction coordination",
    ],
  },
  {
    slug: "property-valuations",
    title: "Property Valuations",
    icon: Scale,
    description:
      "Professional valuation advice for transactions, financing, reporting, investment, asset management and other purposes.",
    focus: [
      "Purpose and scope of valuation",
      "Property and market evidence",
      "Advice for your property decision",
    ],
  },
  {
    slug: "market-studies-reports",
    title: "Market Studies & Market Reports",
    icon: BarChart3,
    description:
      "Evidence-led analysis covering market conditions, demand, supply, competition, rentals, pricing and investment opportunities.",
    focus: [
      "Demand and supply",
      "Rental and pricing evidence",
      "Competition and opportunities",
    ],
  },
  {
    slug: "feasibility-studies",
    title: "Feasibility Studies",
    icon: Compass,
    description:
      "Assessment of development concepts, market demand, highest and best use, financial viability, risks and commercial opportunities.",
    focus: [
      "Development concepts",
      "Market demand and viability",
      "Commercial opportunities and risks",
    ],
  },
  {
    slug: "property-asset-management",
    title: "Property & Asset Management",
    icon: KeyRound,
    description:
      "Practical management support designed to protect asset performance, occupier relationships and investment value.",
    focus: ["Asset performance", "Occupier relationships", "Investment value"],
  },
  {
    slug: "investment-transaction-advisory",
    title: "Investment & Transaction Advisory",
    icon: Handshake,
    description:
      "Independent advice supporting acquisition, disposal, investment decisions, negotiations and property transactions.",
    focus: [
      "Acquisition and disposal",
      "Investment decisions",
      "Negotiation and transaction support",
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    icon: HardHat,
    description:
      "Property development and project coordination support from concept through implementation.",
    focus: [
      "Development coordination",
      "Concept and implementation",
      "Project objectives and delivery",
    ],
  },
  {
    slug: "property-consultancy",
    title: "Property Consultancy",
    icon: BriefcaseBusiness,
    description:
      "Tailored strategic, commercial and property-specific guidance.",
    focus: [
      "Strategic property advice",
      "Commercial guidance",
      "Property-specific solutions",
    ],
  },
];
export const differentiators = [
  [
    "Botswana Market Knowledge",
    "Local insight supported by professional property experience.",
  ],
  [
    "Multi-Disciplinary Expertise",
    "Advice across transactions, valuation, research, development and management.",
  ],
  [
    "Evidence-Led Advice",
    "Recommendations informed by market data, analysis and professional judgement.",
  ],
  [
    "Client-Centred Approach",
    "Solutions tailored to the client's objectives rather than a one-size-fits-all service.",
  ],
  [
    "Professional & Independent Perspective",
    "An adviser helping clients make property decisions.",
  ],
  [
    "End-to-End Support",
    "Support across multiple stages of the property lifecycle.",
  ],
];
export const sectors = [
  "Individual Property Owners",
  "Home Buyers & Sellers",
  "Investors",
  "Developers",
  "Corporate Clients",
  "Institutional / Investment Clients",
  "Landowners",
  "Hospitality Operators",
  "Retail Operators",
  "Industrial Property Operators",
];
export const insightCategories = [
  "Market Reports",
  "Feasibility & Development Insights",
  "Property Market Commentary",
  "Investment Insights",
  "Thought Leadership",
  "Research Publications",
  "Selected Projects",
];
export const propertyCategories = [
  "Residential",
  "Commercial",
  "Industrial",
  "Agricultural",
  "Hospitality",
  "Mixed-Use",
  "Development Land / Plots",
  "Office",
  "Retail",
  "Warehouse / Industrial",
  "Other",
];
export const uses = [
  "Sale",
  "Rent / Lease",
  "Investment",
  "Development",
  "Owner Occupation",
  "Commercial Use",
  "Other",
];
// Only populate this configuration with company-verified information.
export const companyContact: {
  address?: string;
  phone?: string;
  phones?: string[];
  email?: string;
  hours?: string;
  registration?: string;
  credentials?: string[];
  locations?: string[];
  social?: { name: string; url: string }[];
} = {
  address:
    "Plot 22116, Fairdeal House, Gaborone West Industrial, Gaborone, Botswana",
  phone: "+267 72 196 950",
  phones: ["+267 72 196 950", "+267 78 758 315", "+267 31 65342"],
  email: "info@tempestgold.online",
  hours: "Monday to Friday, by appointment",
  registration:
    "Registered with the Real Estate Institute of Botswana and the Real Estate Advisory Council.",
  credentials: ["REIB membership 398", "REAC registration 178/18"],
  locations: ["PO Box 1, Metsimotlhabe, Botswana"],
};

export const servicePillars = [
  {
    title: "Advisory",
    strapline: "Evidence-led insights for better decisions.",
    href: "/services/property-consultancy",
    items: [
      "Valuations",
      "Market Studies & Research",
      "Feasibility Studies",
      "Property Investment Advisory",
      "Transaction Advisory",
      "Highest & Best Use Analysis",
    ],
  },
  {
    title: "Property",
    strapline: "Maximising value through expert management.",
    href: "/services/property-asset-management",
    items: [
      "Sales & Lettings",
      "Property Management",
      "Asset Management",
      "Corporate Real Estate Solutions",
      "Land & Property Due Diligence",
      "Portfolio Reviews",
    ],
  },
  {
    title: "Development",
    strapline: "Turning opportunities into sustainable assets.",
    href: "/services/project-management",
    items: [
      "Development Advisory",
      "Project Management",
      "Development Feasibility",
      "Concept Development",
      "Sustainability & ESG Advisory",
      "Public-Private Partnerships",
    ],
  },
];
export const clients = [
  ["Financial Institutions", "Stanbic Bank", "FNB", "LetsGo"],
  [
    "Property Companies & REITs",
    "NAFPROP",
    "Broll",
    "Cushman & Wakefield",
    "Property Heads",
    "Otelli On",
  ],
  ["Developers & Contractors", "Lobatse Estates", "Property Pros"],
  ["Corporate & Professional", "Mogobe Incorporated"],
  ["Academic & Research", "Botho University"],
] as const;
export const memberships = [
  "Real Estate Institute of Botswana (REIB) - membership 398",
  "Real Estate Advisory Council (REAC) - registration 178/18",
  "African Real Estate Society (AfRES)",
  "International Real Estate Society (IRES)",
  "Commonwealth Association of Surveying and Land Economy (CASLE)",
  "Botswana Facilities Management Association (BOFMA)",
];
export interface CaseStudy {
  id: string;
  title: string;
  sector?: string;
  location: string;
  challenge: string;
  scope: string;
  outcome: string;
  service: string;
}
export const caseStudies: CaseStudy[] = [];
