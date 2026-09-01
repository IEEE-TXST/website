/**
 * SITE CONFIGURATION
 *
 * This file contains all the main settings for the IEEE TXST website.
 * Non-technical users can edit these values to update site-wide information.
 */

export const siteConfig = {
  // Organization Info
  organizationName: "IEEE Texas State University",
  organizationShortName: "IEEE TXST",
  tagline: "Advancing technology for humanity",

  // Main IEEE Student Branch Contact Information
  mainIEEEContact: {
    email: "IEEEorg@txstate.edu",
    instagram: "https://instagram.com/txst.ieee/",
    linkedin: "https://linkedin.com/company/ieee-txst",
    discord: "https://discord.gg/UZhDvyDHTc", // Discord invite link that never expires
    groupme: "https://groupme.com/join_group/57175086/Z4pE3PCA",
  },

  // RAS Student Branch Contact Information
  RASContact: {
    email: "rastxst@gmail.com",
    instagram: "https://www.instagram.com/ras.txst/",
    //linkedin: "https://linkedin.com/company/ieee-txst", // Doesn't exist for RAS TXST yet
    discord: "https://discord.gg/bj45eNQv6U", // Discord invite link that never expires
    groupme: "https://groupme.com/join_group/107190883/wfi6XXUr",
  },

  // HKN Student Branch Contact Information
  HKNContact: {
    //email: "rastxst@gmail.com",
    //instagram: "https://www.instagram.com/ras.txst/", // Doesn't exist for HKN TXST yet
    linkedin: "https://www.linkedin.com/company/txst-ieeehkn/posts/?feedView=all", 
    //discord: "https://discord.gg/bj45eNQv6U", // Discord invite link that never expires
    //groupme: "https://groupme.com/join_group/107190883/wfi6XXUr", // Doesn't exist for HKN TXST
  },

  // Computer Society Student Branch Contact Information
  computerSocContact: {
    //email: "rastxst@gmail.com",
    instagram: "https://www.instagram.com/computersociety.txst/",
    // linkedin: "https://www.linkedin.com/company/txst-ieeehkn/posts/?feedView=all", // Doesn't exist for Computer Society TXST
    //discord: "https://discord.gg/bj45eNQv6U", // Discord invite link that never expires
    //groupme: "https://groupme.com/join_group/107190883/wfi6XXUr", // Doesn't exist for Computer Society TXST
  },

  // Meeting Information
  meetings: {
    schedule: "Every Thursday at 6:30 PM",
    location: "Ingram School of Engineering Building, Room 4104",
    virtualLink: "https://zoom.us/j/your-meeting-id", // No zoom link currently
  },

  // Brand Colors (IEEE Official Colors)
  colors: {
    primary: "#00629B",      // IEEE Blue
    secondary: "#FFFFFF",    // White
    accent: "#000000",       // Black
    highlight: "#00A9E0",    // Light Blue
  },

  // Navigation Links
  navigation: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Officers", href: "/officers" },
    { label: "Committees", href: "/committees",
        children: [
          {label: "Overview", href: "/committees"},
          {label: "Robotics (RAS)", href: "/committees/societies/robotics"},
          {label: "Eta Kappa Nu (HKN)", href: "/committees/societies/hkn"},
          {label: "Computer Society", href: "/committees/societies/computersoc"},
        ]
    },
    { label: "Membership", href: "/membership" },
  ],

  // Call to Action Links
  cta: {
    squareSiteUrl: "https://ieeetxst.square.site/s/shop",
    membershipFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfv3l4v_DC_quTEogvxuj_hWZzL_f4XYDqZQ1DHX1sJnPlelQ/viewform?usp=header",
    eventSignupUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdZ_CJmQr9IbvxOCYZE-_KM-xXRYFiyimsrPg0BBaI7Gj5FEQ/viewform?usp=publish-editor",
  },
};
