export const SITE = {
  name: "All Things Happening Co",
  tagline: "Pittsburgh's Premier Event Rental Company",
  description: "Providing seamless and memorable event experiences — one rental at a time.",
  instagram: "@allthingshappeningco",
  instagramUrl: "https://www.instagram.com/allthingshappeningco",
  email: "allthingshappeningco@gmail.com",
  serviceArea: "Pittsburgh, PA · 50-Mile Radius",
  bookingLeadTime: "14 Days Minimum",
  deposit: "25% Deposit Required",
  year: "2026",
};

export const NAV_LINKS = [
  { label: "Rentals", to: "/rentals" },
  { label: "Gallery", to: "/gallery" },
  { label: "Partners", to: "/partners" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_SERVICES = [
  { label: "Audio Guest Book", to: "/rentals#phone-booth" },
  { label: "Tattoo Machine", to: "/rentals#tattoo-vending" },
  { label: "Drapery Backdrops", to: "/rentals#drapery" },
  { label: "Table Rentals", to: "/rentals#tables" },
  { label: "Custom Mirrors", to: "/rentals#custom-mirrors" },
  { label: "Custom Signage", to: "/rentals#custom-signage" },
  { label: "Baby Shower Station", to: "/rentals#baby-shower" },
  { label: "Build-A-Bear Station", to: "/rentals#build-a-bear" },
  // Charcuterie Cart is hidden site-wide until it's bookable — see the
  // `hidden` flag on that listing in services.js. Restore both together.
  // { label: "Charcuterie Cart", to: "/rentals#charcuterie-cart" },
  { label: "Custom Accessories", to: "/rentals#custom-accessories" },
];

export const FOOTER_COMPANY = [
  { label: "About Us", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Partners", to: "/partners" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_POLICIES = [
  { label: "Booking Policy", to: "/policies#booking" },
  { label: "Cancellation Policy", to: "/policies#cancellation" },
  { label: "Damage Liability", to: "/policies#damage" },
  { label: "Delivery Info", to: "/policies#delivery" },
  { label: "Privacy Policy", to: "/policies#privacy" },
];

/* ── INSTAGRAM FEED (Home → "Follow Along") ──────────────────────
   Add a post by dropping its image in /public/images and appending
   one entry here — newest first. The grid renders only what's in
   this list, so no empty placeholder tiles ever show.

   Every tile opens the profile (SITE.instagramUrl) in a new tab
   rather than a post permalink, so nothing breaks when a post is
   edited or removed.

   The grid runs 5 across, so keep the count a multiple of 5 to
   avoid a short final row. Tiles are 3:4 and the images are cropped
   to match, so they fill without distortion. For an odd one that a
   3:4 crop would clip, set fit: "contain" on its entry.

   alt → describes the photo; it becomes the link's label, so write
         it as a description of the image, not of the link.
   ──────────────────────────────────────────────────────────────── */
export const INSTAGRAM_POSTS = [
  {
    id: "launch",
    image: "/images/insta1.jpg",
    alt: "Coming soon flyers for All Things Happening Co, printed on vellum and fanned out.",
  },
  {
    id: "handle",
    image: "/images/insta2.jpg",
    alt: "Allthingshappeningco written across a soft pink background.",
  },
  {
    id: "tattoo-machine",
    image: "/images/insta3.jpg",
    alt: "Tattoo and sticker vending machine stocked with custom bride and groom designs.",
  },
  {
    id: "custom-cup",
    image: "/images/insta4.jpg",
    alt: "A cocktail in a custom printed cup reading The Greenaways.",
  },
  {
    id: "phone-booth",
    image: "/images/insta5.jpg",
    alt: "The white vintage telephone booth prop set up on a lawn.",
  },
  {
    id: "guestbook",
    image: "/images/insta6.jpg",
    alt: "A guest in a US Army veteran cap smiling while leaving a message on the audio guest book phone.",
  },
  {
    id: "baby-shower",
    image: "/images/insta7.jpg",
    alt: "A baby shower station dressed in pink drapery with onesies hanging on a rack.",
  },
  {
    id: "owner",
    image: "/images/insta8.jpg",
    alt: "Allie, owner of All Things Happening Co, in front of ivory drapery.",
  },
  {
    id: "custom-mirror",
    image: "/images/insta9.jpg",
    alt: "A custom arched wedding mirror etched with Cam and Allie, draped with a lace veil.",
  },
  {
    id: "favors",
    image: "/images/insta10.jpg",
    alt: "Custom labelled bottles and fresh limes arranged on a tiered stand.",
  },
];

export const VALUES = [
  "Full Customization",
  "Unique Experiences",
  "Seamless Planning",
  "Eco-Friendly",
  "Trusted Partners",
  "50-Mile Radius",
];

export const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Browse & Customize",
    desc: "Explore our full rental catalog and build your perfect setup. Customize colors, names, and personal details across every item.",
  },
  {
    n: "02",
    title: "Book & Confirm",
    desc: "Select your date, review your quote, and secure your booking with a 25% deposit. We confirm availability within 24 hours.",
  },
  {
    n: "03",
    title: "Celebrate",
    desc: "We arrive 1–2 hours early, set everything up with care, and handle full takedown after. You focus on your guests.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Every single detail was perfect. The phone booth was the hit of our reception — guests couldn't stop using it, and we have the most beautiful audio memories from our wedding day.",
    author: "Sarah M.",
    event: "Wedding · September 2025",
  },
  {
    quote: "The tattoo vending machine was such a unique touch for our graduation party. Everyone was completely obsessed. Setup and service were absolutely flawless.",
    author: "Jordan T.",
    event: "Graduation · June 2025",
  },
  {
    quote: "They made everything so easy. One vendor, one quote, and everything arrived on time and looked stunning. I cannot recommend All Things Happening Co enough.",
    author: "Amanda R.",
    event: "Baby Shower · August 2025",
  },
];

export const EVENT_TYPES = [
  "Wedding",
  "Baby Shower",
  "Graduation",
  "Birthday Party",
  "Corporate Event",
  "Holiday Party",
  "Bridal Shower",
  "Gender Reveal",
  "Anniversary",
  "Other",
];

export const INQUIRY_TYPES = [
  { value: "booking", label: "Booking Request", prefix: "[BOOKING]" },
  { value: "question", label: "General Question", prefix: "[QUESTION]" },
  { value: "support", label: "Support", prefix: "[SUPPORT]" },
  { value: "review", label: "Leave a Review", prefix: "[REVIEW]" },
];

export const EMAILJS_CONFIG = {
  serviceId: "service_5v57762",
  templateId: "template_jsikt5b",
  publicKey: "q7fZTk83UsXfsiXZQ",
};
