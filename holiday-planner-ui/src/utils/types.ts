interface Image {
    photographer: string;
    photographerUrl: string;
    url: string;
    alt: string;
  }
  
  export interface Holiday {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    numberOfCities: number;
    lastEdited: string; 
    image: Image;
  }
  