export interface PropertyData {
  slug: string;
  type: "apartment" | "house" | "villa" | "penthouse";
  condition: "new" | "renovated" | "good" | "needs-renovation";
  rooms: number;
  halfRooms?: number;
  bedrooms?: number;
  bathrooms: number;
  kitchens?: number;
  totalSurface: number;
  livingArea: number;
  plotSurface?: number;
  terraceSurface?: number;
  balconySurface?: number;
  floor?: number;
  totalFloors?: number;
  ceilingHeight?: number;
  garages?: number;
  parkingSpaces?: number;
  yearBuilt?: number;
  heating?: string;
  flooring?: string[];
  orientation?: string;
  energyRating?: string;
  features: string[];
  price: {
    amount: number;
    currency: "EUR" | "HUF";
    prefix?: "from";
  };
}
