import { BCC, BCC_Custom, SRT } from "./format";

let bcc_default: BCC_Custom = {
  font_size: 0.4,
  font_color: "#FFFFFF",
  background_alpha: 0.5,
  background_color: "#9C27B0",
  Stroke: "none",
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

    srt[index].from = time[0];
    srt[index].to = time[1];
    srt[index].content = content;
  }

  return srt;
}

function srt2string(srt: SRT): string {
  let str: string = "";

  for (let index in srt) {
    let time = srt[index].from + " --> " + srt[index].to;
    let content = srt[index].content;

    str += [ index, time, content ].join('\n') + '\n';
  }

  return str;
}

function srt2bcc(srt: SRT, bcc_custom?: BCC_Custom): BCC {
  let bcc: BCC = {
    ...bcc_default,
    ...bcc_custom,
    body: []
  };
  let timeConverter = (time: string): number => {
    let timeArray: string[] = time.split(':');
    let hh: number = parseInt(timeArray[0]);
    let mm: number = parseInt(timeArray[1]);
    timeArray = timeArray[2].split(',');
    let ss: number = parseInt(timeArray[0]);
    let msms: number = parseInt(timeArray[0]);

    return hh * 60 * 60 + mm * 60 + ss + msms;
  };

  for (let index in srt) {
    bcc.body[index].from = timeConverter(srt[index].from);
    bcc.body[index].to = timeConverter(srt[index].to);
    bcc.body[index].content = srt[index].content;
  }

  return bcc;
}

function bcc2srt(bcc: BCC): SRT {
  let srt: SRT = {};
  let timeConverter = (second: number): string => {
    return [
      [
        Math.trunc(second / 60 / 60),
        Math.trunc(second / 60),
        Math.trunc(second % 60)
      ].join(':'),
      (second % 1).toString().slice(2).padEnd(3, '0')
    ].join(",");
  };

  bcc.body.forEach((item, index) => {
    srt[index].from = timeConverter(item.from);
    srt[index].to = timeConverter(item.to);
    srt[index].content = item.content;
  });

  return srt;
}

export {
  string2bcc,
  string2srt,
  bcc2string,
  srt2string,
  srt2bcc,
  bcc2srt
}