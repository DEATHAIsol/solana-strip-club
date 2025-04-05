export interface Streamer {
  id: number;
  username: string;
  displayName: string;
  avatar: string;
  isLive: boolean;
  viewers: number;
  bio: string;
  solanaAddress: string;
  totalDonations: number;
  topDonation: number;
  streamUrl?: string;
  videoUrl?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    onlyfans?: string;
  };
  schedule: {
    [key: string]: string | undefined;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

export const streamers: Streamer[] = [
  {
    id: 1,
    username: "amanda",
    displayName: "Amanda",
    avatar: "/images/performers/amanda.jpg",
    isLive: true,
    viewers: 1234,
    bio: "Hey, I'm Amanda! Come hang out with me 💋",
    solanaAddress: "AmandaSolanaAddress123",
    totalDonations: 1500.75,
    topDonation: 250.00,
    streamUrl: "https://chaturbate.com/ellaharperr/",
    videoUrl: "/videos/amanda.mp4",
    socialLinks: {
      twitter: "https://twitter.com/amanda",
      instagram: "https://instagram.com/amanda",
      onlyfans: "https://onlyfans.com/amanda"
    },
    schedule: {
      monday: "1:00 PM - 8:00 PM, 8:00 PM - 12:00 AM",
      tuesday: "1:00 PM - 8:00 PM",
      wednesday: "1:00 PM - 8:00 PM, 9:00 PM - 1:00 AM",
      thursday: "1:00 PM - 8:00 PM",
      friday: "1:00 PM - 8:00 PM, 10:00 PM - 2:00 AM",
      saturday: "1:00 PM - 8:00 PM",
      sunday: "1:00 PM - 8:00 PM"
    }
  },
  {
    id: 2,
    username: "caitlin",
    displayName: "Caitlin",
    avatar: "/images/performers/caitlin.jpg",
    isLive: true,
    viewers: 856,
    bio: "Caitlin here! Let's have some fun together 💕",
    solanaAddress: "CaitlinSolanaAddress123",
    totalDonations: 2100.50,
    topDonation: 300.00,
    streamUrl: "https://www.twitch.tv/typicalgamer",
    socialLinks: {
      twitter: "https://twitter.com/caitlin",
      instagram: "https://instagram.com/caitlin"
    },
    schedule: {
      monday: "1:00 PM - 8:00 PM",
      tuesday: "1:00 PM - 8:00 PM, 8:30 PM - 12:30 AM",
      wednesday: "1:00 PM - 8:00 PM",
      thursday: "1:00 PM - 8:00 PM, 9:00 PM - 1:00 AM",
      friday: "1:00 PM - 8:00 PM",
      saturday: "1:00 PM - 8:00 PM, 9:30 PM - 1:30 AM",
      sunday: "1:00 PM - 8:00 PM"
    }
  },
  {
    id: 3,
    username: "georgia",
    displayName: "Georgia",
    avatar: "/images/performers/georgia.jpg",
    isLive: true,
    viewers: 567,
    bio: "Georgia 💋 Come join my stream!",
    solanaAddress: "GeorgiaSolanaAddress123",
    totalDonations: 1800.25,
    topDonation: 275.00,
    streamUrl: "https://chaturbate.com/7e00aa2b-24d3-4968-9306-1d35debf09bc",
    socialLinks: {
      twitter: "https://twitter.com/georgia",
      instagram: "https://instagram.com/georgia",
      onlyfans: "https://onlyfans.com/georgia"
    },
    schedule: {
      monday: "1:00 PM - 8:00 PM",
      tuesday: "1:00 PM - 8:00 PM",
      wednesday: "1:00 PM - 8:00 PM, 9:30 PM - 1:30 AM",
      thursday: "1:00 PM - 8:00 PM",
      friday: "1:00 PM - 8:00 PM, 10:00 PM - 2:00 AM",
      saturday: "1:00 PM - 8:00 PM",
      sunday: "1:00 PM - 8:00 PM, 8:30 PM - 12:30 AM"
    }
  },
  {
    id: 4,
    username: "jess",
    displayName: "Jess",
    avatar: "/images/performers/jess.jpg",
    isLive: false,
    viewers: 0,
    bio: "Hey! I'm Jess 💕 Love gaming and chatting!",
    solanaAddress: "JessSolanaAddress123",
    totalDonations: 1200.00,
    topDonation: 150.00,
    streamUrl: "",
    socialLinks: {
      twitter: "https://twitter.com/jess",
      instagram: "https://instagram.com/jess"
    },
    schedule: {
      monday: "1:00 PM - 8:00 PM, 10:00 PM - 2:00 AM",
      tuesday: "1:00 PM - 8:00 PM",
      wednesday: "1:00 PM - 8:00 PM",
      thursday: "1:00 PM - 8:00 PM, 9:00 PM - 1:00 AM",
      friday: "1:00 PM - 8:00 PM",
      saturday: "1:00 PM - 8:00 PM, 8:00 PM - 12:00 AM",
      sunday: "1:00 PM - 8:00 PM"
    }
  },
  {
    id: 5,
    username: "bella",
    displayName: "Bella",
    avatar: "/images/performers/bella.jpg",
    isLive: true,
    viewers: 156,
    bio: "Bella here! 💋 Let's have some fun!",
    solanaAddress: "BellaSolanaAddress123",
    totalDonations: 900.50,
    topDonation: 125.00,
    streamUrl: "https://www.youtube.com/embed/JMQcS-9z4Lg",
    socialLinks: {
      twitter: "https://twitter.com/bella",
      instagram: "https://instagram.com/bella",
      onlyfans: "https://onlyfans.com/bella"
    },
    schedule: {
      monday: "1:00 PM - 8:00 PM",
      tuesday: "1:00 PM - 8:00 PM, 9:00 PM - 1:00 AM",
      wednesday: "1:00 PM - 8:00 PM",
      thursday: "1:00 PM - 8:00 PM",
      friday: "1:00 PM - 8:00 PM, 8:30 PM - 12:30 AM",
      saturday: "1:00 PM - 8:00 PM",
      sunday: "1:00 PM - 8:00 PM, 9:30 PM - 1:30 AM"
    }
  }
]; 