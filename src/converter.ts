import { BCC, BCC_Head, SRT } from "./format";

const bcc_head_default: BCC_Head = {
  font_size: 0.4,
  font_color: "#FFFFFF",
  background_alpha: 0.5,
  background_color: "#9C27B0",
  stroke: "none",
};

function string2bcc(str: string): BCC {
  return JSON.parse(str);
}

function bcc2string(bcc: BCC): string {
  return JSON.stringify(bcc);
}

function string2srt(str: string): SRT {
  let srt: SRT = {};
  let strTrimed: string = str.replace(/\n$/, '');
  let strItems: string[] = strTrimed.split('\n\n');
  
  for (let srtItems of strItems) {
    let item: string[] = srtItems.split('\n');
    let index: number = parseInt(item[0]);
    let time: string[] = item[1].split(" --> ");
    let content: string = item.slice(2).join();

    srt[index] = {
      from: time[0],
      to: time[1],
      content: content
    };
  }

  return srt;
}

function srt2string(srt: SRT): string {
  let str: string = "";

  for (let index in srt) {
    let time = srt[index].from + " --> " + srt[index].to;
    let content = srt[index].content;

    str += [ index, time, content ].join('\n') + '\n\n';
  }

  return str;
}

function srt2bcc(srt: SRT, BCC_Head?: BCC_Head): BCC {
  let bcc: BCC = {
    ...bcc_head_default,
    ...BCC_Head,
    body: []
  };
  let timeConverter = (time: string): number => {
    let timeArray: string[] = time.split(':');
    let hh: number = parseInt(timeArray[0]);
    let mm: number = parseInt(timeArray[1]);
    let ss: number = parseFloat(timeArray[2].replace(',', '.'));

    return hh * 60 * 60 + mm * 60 + ss;
  };

  for (let index in srt) {
    bcc.body[index] = {
      from: timeConverter(srt[index].from),
      to: timeConverter(srt[index].to),
      location: 2,
      content: srt[index].content
    }
  }

  return bcc;
}

function bcc2srt(bcc: BCC): SRT {
  let srt: SRT = {};
  let timeConverter = (second: number): string => {
    return [
      [
        Math.trunc(second / 60 / 60),
        Math.trunc((second % 3600) / 60),
        Math.trunc(second % 60)
      ].map((num) => { return num.toString().padStart(2, '0'); }).join(':'),
      (second % 1).toFixed(3).slice(2)
    ].join(",");
  };

  bcc.body.forEach((item, index) => {
    srt[index] = {
      from: timeConverter(item.from),
      to: timeConverter(item.to),
      content: item.content
    };
  });

  return srt;
}

export {
  bcc2srt, bcc2string, srt2bcc, srt2string, string2bcc,
  string2srt
};
