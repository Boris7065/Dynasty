/* ------------------------------------------------------------------ */
/*  Verified business data for DYN▲STY Barbers Barbershop              */
/* ------------------------------------------------------------------ */

export const LINKS = {
  booksy:
    "https://booksy.com/en-us/1387789_dynasty-barbers-barbershop_barber-shop_15643_fort-lauderdale",
  crunch:
    "https://dynasty-crunch-member-perk.klpenterprises2012.chatgpt.site/?utm_source=dynasty_site&utm_medium=website&utm_campaign=crunch50_q4_2026",
  coachInstagram: "https://www.instagram.com/esteban.lesmez/",
  phone: "tel:+19546099029",
  phoneDisplay: "954-609-9029",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=4288+S+University+Dr,+Davie,+FL+33328",
  googlePlace:
    "https://www.google.com/maps/place/Dynasty+Barbers/@26.0675007,-80.251489,17z/data=!3m1!4b1!4m6!3m5!1s0x88d9a83fa37ddf6b:0x2631403099ce50b3!8m2!3d26.0675007!4d-80.251489!16s%2Fg%2F11byn18znn",
  mapEmbed:
    "https://maps.google.com/maps?q=4288%20S%20University%20Dr%2C%20Davie%2C%20FL%2033328&z=15&output=embed",
  social: {
    instagram: "https://www.instagram.com/dynasty_barbers/",
    facebook: "https://www.facebook.com/dynasty12",
    tiktok: "https://www.tiktok.com/@dynastybarbersbarbershop",
    youtube: "https://www.youtube.com/channel/UCeZIkcdKnwbx1gLN84vOEmQ",
  },
};

export const ADDRESS = {
  street: "4288 S University Dr",
  city: "Davie, FL 33328",
  context: "Near Griffin Road · South of NSU Fort Lauderdale / Davie",
  areas:
    "Serving Davie, Cooper City, Pembroke Pines, Weston, Plantation, Hollywood and surrounding communities.",
};

/* --------------------------- services ---------------------------------- */

export interface Service {
  id: string;
  name: string;
  price: string;
  note: string;
  flag?: string;
}

export const SERVICES: Service[] = [
  {
    id: "haircut",
    name: "Haircut",
    price: "from $40",
    note: "Clipper or scissor — cut, styled and finished.",
  },
  {
    id: "haircut-beard",
    name: "Haircut + Beard",
    price: "from $50",
    note: "The full service: your cut plus a shaped beard trim.",
    flag: "Most popular",
  },
  {
    id: "kids-haircut",
    name: "Kids' Haircut",
    price: "from $40",
    note: "Patient, careful cuts for the younger chairs.",
  },
  {
    id: "lineup",
    name: "Lineup",
    price: "from $25",
    note: "Crisp edges and a fresh, razor-finished line.",
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    price: "from $30",
    note: "Shaped, blended and lined to frame your face.",
  },
  {
    id: "vip-grooming",
    name: "VIP Grooming",
    price: "from $70",
    note: "The extended sit-down — hair, beard and a full finish.",
  },
];

/* ------------------------- style categories ---------------------------- */

export interface StyleCategory {
  id: string;
  name: string;
  desc: string;
  items: string[];
  img: string;
  alt: string;
}

const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const STYLE_CATEGORIES: StyleCategory[] = [
  {
    id: "fades",
    name: "Fades & Clipper Cuts",
    desc: "Choose your fade height and finish, or keep it short with a buzz cut.",
    items: [
      "Skin / bald fade",
      "Low fade",
      "Mid fade",
      "High fade",
      "Burst fade",
      "Drop fade",
      "Buzz cut",
    ],
    img: px(39559324, 840, 1050),
    alt: "Modern fade haircut with a sharp, shaped beard",
  },
  {
    id: "tapers",
    name: "Tapers",
    desc: "Clean edges at the sideburns and neckline, with room for volume and natural curls.",
    items: [
      "Low taper fade",
      "Mid taper fade",
      "High taper fade",
      "Blowout taper",
      "Curly taper",
    ],
    img: px(9971240, 900, 680),
    alt: "Barber tapering the neckline with a trimmer",
  },
  {
    id: "scissor",
    name: "Scissor Cuts & Longer Styles",
    desc: "Detailed scissor work for shape, movement, and a finish that feels like you.",
    items: [
      "Precision scissor haircut",
      "Bro flow",
      "Middle-part haircut",
      "Curtains",
    ],
    img: px(39559306, 840, 1050),
    alt: "Close-up of scissor and comb work on a client",
  },
  {
    id: "textured",
    name: "Textured Styles",
    desc: "Defined fringes, textured crops, and layered shapes with personality.",
    items: [
      "Textured fringe",
      "French crop",
      "Modern mullet",
      "Men's wolf cut",
      "Modern mod cut",
    ],
    img: px(15932225, 840, 1050),
    alt: "Side profile of a textured, trendy men's haircut",
  },
  {
    id: "grooming",
    name: "Beard & Grooming",
    desc: "From clean shaves to full beard work — finished by hand, not rushed.",
    items: ["Beard trims", "Hot towel razor shaves", "Sharp lineups"],
    img: px(5568407, 900, 680),
    alt: "Barber shaving a client's beard with a straight razor",
  },
];

/* --------------------------- work strip --------------------------------- */

export interface WorkItem {
  src: string;
  caption: string;
  alt: string;
  ratio: string; // aspect-ratio css value
}

export const WORK_STRIP: WorkItem[] = [
  {
    src: px(18503604, 760, 950),
    caption: "Skin fade, razor finish",
    alt: "Barber working a precise skin fade with clippers, close-up",
    ratio: "760 / 950",
  },
  {
    src: px(39559324, 760, 950),
    caption: "Modern fade + sharp beard",
    alt: "Profile of a client with a modern fade and shaped beard",
    ratio: "760 / 950",
  },
  {
    src: px(9971240, 950, 700),
    caption: "Taper & neckline detail",
    alt: "Barber detailing the neckline and taper with a trimmer",
    ratio: "950 / 700",
  },
  {
    src: px(10024232, 760, 950),
    caption: "Hot towel razor shave",
    alt: "Barber shaving a client's beard with a straight razor",
    ratio: "760 / 950",
  },
  {
    src: px(39559325, 760, 950),
    caption: "Buzz cut, clean finish",
    alt: "Client with a clean buzz cut and trimmed beard",
    ratio: "760 / 950",
  },
  {
    src: px(11333875, 760, 950),
    caption: "Clipper work, mid fade",
    alt: "Black and white close-up of clippers blending a mid fade",
    ratio: "760 / 950",
  },
];

/* ----------------------------- gallery ---------------------------------- */

export const GALLERY: WorkItem[] = [
  { src: px(4625626, 800, 1000), caption: "Fresh cut, mid-chair", alt: "Barber performing a stylish haircut in a modern barbershop", ratio: "4 / 5" },
  { src: px(18503604, 800, 1000), caption: "Clipper precision", alt: "Detailed close-up of a barber working with clippers", ratio: "4 / 5" },
  { src: px(9971240, 900, 600), caption: "Neckline & taper", alt: "Barber cutting the back neckline with a trimmer and comb", ratio: "3 / 2" },
  { src: px(39559324, 800, 1066), caption: "Modern fade", alt: "Profile of a modern fade haircut with a sharp beard", ratio: "3 / 4" },
  { src: px(10024232, 800, 1000), caption: "Straight razor work", alt: "Barber expertly shaving a beard with a straight razor", ratio: "4 / 5" },
  { src: px(39559306, 800, 600), caption: "Scissor detail", alt: "Barber cutting hair with scissors and comb, close-up", ratio: "4 / 3" },
  { src: px(7447138, 900, 600), caption: "The full sit-down", alt: "Barber trimming a client's hair in a contemporary setting", ratio: "3 / 2" },
  { src: px(11333875, 800, 1000), caption: "Blend, frame by frame", alt: "Black and white close-up of clippers trimming a fade", ratio: "4 / 5" },
  { src: px(18503658, 800, 1066), caption: "Razor shave", alt: "Man receiving a close shave with a straight razor", ratio: "3 / 4" },
  { src: px(7697481, 900, 600), caption: "Razor edges", alt: "Close-up of a barber using a straight razor for precise grooming", ratio: "3 / 2" },
  { src: px(39559325, 800, 1000), caption: "Buzz & beard", alt: "Client with a clean buzz cut and tidy beard", ratio: "4 / 5" },
  { src: px(31585358, 800, 1066), caption: "Side profile, sharp line", alt: "Side profile portrait of a young man with a sharp haircut", ratio: "3 / 4" },
  { src: px(5568407, 900, 600), caption: "Beard, by hand", alt: "Barber shaping a beard with a straight razor in a barbershop", ratio: "3 / 2" },
  { src: px(15932225, 800, 1000), caption: "Textured crop", alt: "Young man with a trendy textured haircut and beard", ratio: "4 / 5" },
  { src: px(1319461, 900, 600), caption: "Fine detail", alt: "Close-up of a razor trimming beard line with precision", ratio: "3 / 2" },
  { src: px(39559315, 800, 1066), caption: "Scissor work", alt: "Barber giving a haircut with scissors in a salon", ratio: "3 / 4" },
];

/* ----------------------------- reviews ---------------------------------- */
/*  Excerpts published on the shop's current website (Oct 2026 snapshot).    */

export const REVIEWS = {
  google: {
    score: "4.7",
    count: "536",
    asOf: "as of Oct 2026",
    quotes: [
      "Excellent cut and great service from Herbert! Friendly atmosphere, efficient, and clearly skilled.",
      "Great barbers, very professional, and always reliable. Consistent quality every time.",
      "Every fade and line-up was crisp and clean. The blend is seamless.",
    ],
  },
  booksy: {
    score: "5.0",
    count: "300",
    asOf: "as of Oct 2026",
    barber: "Oskr Master Barber",
    quotes: [
      "best barber out there 💯💯",
      "a quality cut every time!",
      "Phenomenal Barber, and very professional.",
    ],
  },
};

/* ---------------------------- navigation --------------------------------- */

export const NAV_LINKS = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "styles", label: "Styles" },
  { id: "offers", label: "Offers" },
  { id: "reviews", label: "Reviews" },
  { id: "coaching", label: "Coaching" },
  { id: "faq", label: "FAQ" },
] as const;
