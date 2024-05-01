import { string2bcc, string2srt, bcc2string, srt2string, srt2bcc, bcc2srt } from "./converter";
import { exportFile } from 'fs-browsers'
// TODO : downloadjs 处理部分中文编码存在问题
// let download = require("downloadjs");

// converte
let bsc_converter = document.getElementById('bsc-converter');

if (bsc_converter != null) {
  bsc_converter.onchange = () => {
    let reader = new FileReader();
    let type = bsc_converter.value.split('.').pop();
    let name = "result";

    reader.readAsText(bsc_converter.files[0], 'utf-8');
    reader.onload = () => {
      let txt = reader.result;

      if (type == 'bcc') {
        let bcc = string2bcc(txt);
        let srt = bcc2srt(bcc);
        let res = srt2string(srt);

        exportFile(res, name + '.srt')
      }
      else if (type == 'srt') {
        let srt = string2srt(txt);
        let bcc = srt2bcc(srt);
        let res = bcc2string(bcc);
      
        exportFile(res, name + '.bcc')
      }
      else {
        alert("文件缺少.srt/.bcc后缀")
      }
    };
    
    bsc_converter.value = ''
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