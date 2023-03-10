import { string2bcc, string2srt, bcc2string, srt2string, srt2bcc, bcc2srt } from "./converter";
let download = require("downloadjs");

// converte
let bsc_converter = document.getElementById('bsc-converter');

if (bsc_converter != null) {
  bsc_converter.onchange = () => {
    let reader = new FileReader();
    let type = bsc_converter.value.split('.').pop();

    reader.readAsText(bsc_converter.files[0], 'utf-8');
    reader.onload = () => {
      let txt = reader.result;

      if (type == 'bcc') {
        let bcc = string2bcc(txt);
        let srt = bcc2srt(bcc);
        let res = srt2string(srt);

        download(res, "res.srt", "text/plain");
      }
      else if (type == 'srt') {
        let srt = string2srt(txt);
        let bcc = srt2bcc(srt);
        let res = bcc2string(bcc);
      
        download(res, "res.bcc", "text/plain");
      }
    };
  };
}

// request
// let bsc_request = document.getElementById('bsc-request');
// let bsc_request_submit = document.getElementById('bsc-request-submit');

// bsc_request_submit.onclick = () => {
//   if (bsc_request.value) {
//     let xhr = new XMLHttpRequest();
//     xhr.open(GET, bsc_request.value);


//   }
// }