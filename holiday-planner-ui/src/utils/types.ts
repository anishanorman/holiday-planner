export interface Image {
    photographer: string;
    photographerUrl: string;
    src: string;
    alt: string;
  }
  
  export interface Holiday {
    id: number;
    title: string;
    startDate: string;
    endDate: string; 
    image: Image;
    flights: object;
    activities: object;
    accomodations: object;
    createdAt: string;
    updatedAt: string;
  }
  