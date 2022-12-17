interface BCC {
  font_size: number;
  font_color: string;
  background_alpha: number;
  background_color: string;
  Stroke: string;
  body: {
    "from": number;
    "to": number;
    "location": number;
    "content": string;
  }[];
};

interface BCC_Custom {
  font_size: number;
  font_color: string;
  background_alpha: number;
  background_color: string;
  Stroke: string;
};

interface SRT {
  [ index: number ]: {
    from: string;
    to: string;
    content: string;
  };
};

export { BCC, BCC_Custom, SRT }