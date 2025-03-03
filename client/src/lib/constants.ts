import {
  Wifi,
  Waves,
  Dumbbell,
  Car,
  PawPrint,
  Tv,
  Thermometer,
  Cigarette,
  Cable,
  Maximize,
  Bath,
  Phone,
  Sprout,
  Hammer,
  Bus,
  Mountain,
  VolumeX,
  Home,
  Warehouse,
  Building,
  Castle,
  Trees,
  LucideIcon,
  FileText,
  Settings,
  Heart,
} from 'lucide-react'

export enum AmenityEnum {
  WasherDryer = 'WasherDryer',
  AirConditioning = 'AirConditioning',
  Dishwasher = 'Dishwasher',
  HighSpeedInternet = 'HighSpeedInternet',
  HardwoodFloors = 'HardwoodFloors',
  WalkInClosets = 'WalkInClosets',
  Microwave = 'Microwave',
  Refrigerator = 'Refrigerator',
  Pool = 'Pool',
  Gym = 'Gym',
  Parking = 'Parking',
  PetsAllowed = 'PetsAllowed',
  WiFi = 'WiFi',
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Dishwasher: Waves,
  HighSpeedInternet: Wifi,
  HardwoodFloors: Home,
  WalkInClosets: Maximize,
  Microwave: Tv,
  Refrigerator: Thermometer,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  PetsAllowed: PawPrint,
  WiFi: Wifi,
}

export enum HighlightEnum {
  HighSpeedInternetAccess = 'HighSpeedInternetAccess',
  WasherDryer = 'WasherDryer',
  AirConditioning = 'AirConditioning',
  Heating = 'Heating',
  SmokeFree = 'SmokeFree',
  CableReady = 'CableReady',
  SatelliteTV = 'SatelliteTV',
  DoubleVanities = 'DoubleVanities',
  TubShower = 'TubShower',
  Intercom = 'Intercom',
  SprinklerSystem = 'SprinklerSystem',
  RecentlyRenovated = 'RecentlyRenovated',
  CloseToTransit = 'CloseToTransit',
  GreatView = 'GreatView',
  QuietNeighborhood = 'QuietNeighborhood',
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  HighSpeedInternetAccess: Wifi,
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Heating: Thermometer,
  SmokeFree: Cigarette,
  CableReady: Cable,
  SatelliteTV: Tv,
  DoubleVanities: Maximize,
  TubShower: Bath,
  Intercom: Phone,
  SprinklerSystem: Sprout,
  RecentlyRenovated: Hammer,
  CloseToTransit: Bus,
  GreatView: Mountain,
  QuietNeighborhood: VolumeX,
}

export enum PropertyTypeEnum {
  Rooms = 'Rooms',
  Tinyhouse = 'Tinyhouse',
  Apartment = 'Apartment',
  Villa = 'Villa',
  Townhouse = 'Townhouse',
  Cottage = 'Cottage',
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
}

// Add this constant at the end of the file
export const NAVBAR_HEIGHT = 52 // in pixels

export const featureCardContents = [
  {
    imageSrc: '/landing-search1.png',
    title: 'Trustworthy and Verified Listings',
    description:
      'Discover the best rental options with user reviews, photos, and floor plans.',
    linkText: 'Explore',
    linkHref: '/explore',
  },
  {
    imageSrc: '/landing-search2.png',
    title: 'Browse Rental Listings with Ease',
    description:
      'Find the perfect rental property with our easy-to-use search filters.',
    linkText: 'Search',
    linkHref: '/search',
  },
  {
    imageSrc: '/landing-search3.png',
    title: 'Simplify Your Rental Search with Advanced',
    description:
      'Search filters that help you find the perfect rental property.',
    linkText: 'Discover',
    linkHref: '/discover',
  },
]

export const discoverCardContents = [
  {
    imageSrc: '/landing-icon-wand.png',
    title: 'Search for Properties',
    description:
      'Browse through our extensive collection of rental properties in your desired location.',
  },
  {
    imageSrc: '/landing-icon-calendar.png',
    title: 'Book Your Rental',
    description:
      "Once you've found the perfect rental property, easily book it online with just a few clicks.",
  },
  {
    imageSrc: '/landing-icon-heart.png',
    title: 'Enjoy your New Home',
    description:
      'Move into your new rental property and start enjoying your dream home.',
  },
]

export const managerLinks = [
  {
    icon: Building,
    label: 'Properties',
    href: '/managers/properties',
  },
  {
    icon: FileText,
    label: 'Applications',
    href: '/managers/applications',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/managers/settings',
  },
]

export const tenantLinks = [
  {
    icon: Heart,
    label: 'Favorites',
    href: '/tenants/favorites',
  },
  {
    icon: FileText,
    label: 'Applications',
    href: '/tenants/applications',
  },
  {
    icon: Home,
    label: 'Residences',
    href: '/tenants/residences',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/tenants/settings',
  },
]

export const minPriceRanges = [500, 1000, 1500, 2000, 3000, 5000, 10000]
export const maxPriceRanges = [1000, 2000, 3000, 5000, 10000]

// Test users for development
export const testUsers = {
  tenant: {
    username: 'Carol White',
    userId: 'us-east-2:76543210-90ab-cdef-1234-567890abcdef',
    signInDetails: {
      loginId: 'carol.white@example.com',
      authFlowType: 'USER_SRP_AUTH',
    },
  },
  tenantRole: 'tenant',
  manager: {
    username: 'John Smith',
    userId: 'us-east-2:12345678-90ab-cdef-1234-567890abcdef',
    signInDetails: {
      loginId: 'john.smith@example.com',
      authFlowType: 'USER_SRP_AUTH',
    },
  },
  managerRole: 'manager',
}
