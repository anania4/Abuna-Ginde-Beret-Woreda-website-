
export type Language = 'en' | 'om';

export interface TranslationStrings {
  title: string;
  subtitle: string;
  heroTitle: string;
  heroDesc: string;
  navHome: string;
  navAbout: string;
  navSectors: string;
  navServices: string;
  navEvents: string;
  navKebeles: string;
  navGallery: string;
  navContact: string;
  latestNews: string;
  viewAll: string;
  statsResidents: string;
  statsKebeles: string;
  statsAgriculture: string;
  statsHoney: string;
  aboutTitle: string;
  aboutSubtitle: string;
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  sectorsTitle: string;
  sectorsSubtitle: string;
  galleryTitle: string;
  gallerySubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  adminMessageTitle: string;
  adminName: string;
  adminRole: string;
  contactTitle: string;
  contactDesc: string;
  addressLabel: string;
  addressValue: string;
  phoneLabel: string;
  emailLabel: string;
  officeHoursLabel: string;
  officeHoursValue: string;
  footerTagline: string;
  copyright: string;
  adminMessageDesc: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    title: "Abune Ginde Beret",
    subtitle: "Woreda Administration",
    heroTitle: "Welcome to Abune Ginde Beret",
    heroDesc: "A vibrant highland district thriving on sustainable agriculture and community empowerment.",
    navHome: "Home",
    navAbout: "About",
    navSectors: "Sectors",
    navServices: "Services",
    navEvents: "Events",
    navKebeles: "Kebeles",
    navGallery: "Gallery",
    navContact: "Contact",
    latestNews: "Latest Updates",
    viewAll: "View All News",
    statsResidents: "Population",
    statsKebeles: "Kebeles",
    statsAgriculture: "Agriculture Based",
    statsHoney: "Bee Colonies",
    aboutTitle: "About Our Woreda",
    aboutSubtitle: "A highland district in West Shewa Zone, Oromia Region – 170-190 km northwest of Addis Ababa.",
    missionTitle: "Our Mission",
    missionDesc: "To provide transparent, efficient, and inclusive government services that empower our citizens and foster sustainable agricultural development, particularly in beekeeping and highland farming.",
    visionTitle: "Our Vision",
    visionDesc: "To become a model of highland agricultural excellence and beekeeping development in West Shewa Zone by 2030.",
    sectorsTitle: "Government Sectors",
    sectorsSubtitle: "Specialized departments dedicated to serving every aspect of community life.",
    galleryTitle: "Community Gallery",
    gallerySubtitle: "Capturing the beauty, culture, and progress of Abune Ginde Beret.",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Quick answers to common inquiries about our services and region.",
    adminMessageTitle: "Administrator's Message",
    adminName: "Woreda Administrator",
    adminRole: "Woreda Administrator",
    contactTitle: "Contact Us",
    contactDesc: "We are here to serve. Visit our office or reach out via phone or email.",
    addressLabel: "Address",
    addressValue: "Bake Kelate Town, West Shewa Zone, Oromia Region",
    phoneLabel: "Phone",
    emailLabel: "Email",
    officeHoursLabel: "Office Hours",
    officeHoursValue: "Mon - Fri: 8:30 AM - 12:30 PM, 1:30 PM - 5:30 PM",
    footerTagline: "Highland Resilience – Fertile Lands, Strong Communities, Growing Future",
    copyright: "© 2025 Abune Ginde Beret Woreda Administration. All rights reserved.",
    adminMessageDesc: "Welcome to Abune Ginde Beret Woreda Administration official website."
  },
  om: {
    title: "Abune Ginde Beret",
    subtitle: "Bulchiinsa Aanaa",
    heroTitle: "Baga Nagaan Dhuftan",
    heroDesc: "Aanaa Abuna Gindabarat bakkawwan qonnaa fi guddina hawaasaa beekamu.",
    navHome: "Mana",
    navAbout: "Waa'ee Keenya",
    navSectors: "Dameewwan",
    navServices: "Tajaajila",
    navEvents: "Taateewwan",
    navKebeles: "Aanaaleen",
    navGallery: "Galaarii",
    navContact: "Quunnama",
    latestNews: "Oduuwwan Ammee",
    viewAll: "Oduu Hundumaa Ilaali",
    statsResidents: "Jiraattota",
    statsKebeles: "Ganda",
    statsAgriculture: "Qonna irratti kan hundaa'e",
    statsHoney: "Oomisha Dammaa",
    aboutTitle: "Waa'ee Aanaa Keenyaa",
    aboutSubtitle: "Lafa dhaalmayaa fi guddinaa handhuura Shawaa Lixaa keessatti.",
    missionTitle: "Ergaa Keenya",
    missionDesc: "Tajaajila mootummaa iftoomina qabu, gahumsa qabuu fi hunda hammatu kan lammiilee keenya humna qabsiisuu fi guddina waaraa guddisu kennuu.",
    visionTitle: "Mul'ata Keenya",
    visionDesc: "Bara 2030tti naannoo Oromiyaa keessatti fakkeenya misooma baadiyaa fi qonnaa ta'uu.",
    sectorsTitle: "Dameewwan Mootummaa",
    sectorsSubtitle: "Kutaa addaa jireenya hawaasaa hunda tajaajiluuf of kenne.",
    galleryTitle: "Galaarii Hawaasaa",
    gallerySubtitle: "Miidhagina, aadaa fi guddina Abuna Gindabarat fakkiiwwan kanaan agarsiisuu.",
    faqTitle: "Gaaffiiwwan Yeroo Baay'ee Gaafataman",
    faqSubtitle: "Tajaajila keenyaa fi naannoo keenya irratti gaaffiiwwan baramaniif deebii ariifataa.",
    adminMessageTitle: "Dhaamsa Bulchiinsaa",
    adminName: "Obbo [Maqaa]",
    adminRole: "Bulchaa Ol'aanaa",
    contactTitle: "Nu Quunnamaa",
    contactDesc: "Tajaajiluuf as jirra. Waajjira keenya daawwadhaa ykn bilbilaan ykn imeelii nu quunnamaa.",
    addressLabel: "Teessoo",
    addressValue: "Magaalaa Beekee Qalaaxee, Shawaa Lixaa, Oromiyaa",
    phoneLabel: "Bilbila",
    emailLabel: "Imeelii",
    officeHoursLabel: "Sa'aatii Hojii",
    officeHoursValue: "Wiixata - Jimaata: 2:30 - 11:30",
    footerTagline: "Hawaasa iftoominaa fi kutannoodhaan tajaajiluu.",
    copyright: "© 2026 Bulchiinsa Aanaa Abuna Gindabarat. Mirgi hunduu eegamaadha.",
    adminMessageDesc: "Fuula marsariitii bulchiinsa aanaa Abuna Ginda Baratirratti baga nagaa dhuftan."
  }
};
