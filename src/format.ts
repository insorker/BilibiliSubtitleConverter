interface BCC_Head {
  font_size: number;
  font_color: string;
  background_alpha: number;
  background_color: string;
  stroke: string;
};

interface BCC extends BCC_Head {
  body: {
    "from": number;
    "to": number;
    "location": number;
    "content": string;
  }[];
};

interface SRT {
  [ index: number ]: {
    from: string;
    to: string;
    content: string;
  };
};

export { BCC, BCC_Head, SRT };
