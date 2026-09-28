export const company = {
  legalName: "MAXIMUSAI LLC",
  brandName: "MAXIMUSAI",
  formationDate: "August 6, 2025",
  state: "Delaware",
  email: "adjustrategy@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://maximusai.llc",
  registeredAgent: {
    name: "Northwest Registered Agent Service, Inc.",
    address: "8 The Green, Ste B",
    city: "Dover",
    county: "Kent",
    state: "DE",
    postalCode: "19901",
    phone: "302-581-4070",
  },
} as const;
