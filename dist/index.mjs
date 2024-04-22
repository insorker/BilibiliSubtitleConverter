var E = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, I = { exports: {} };
(function(e, a) {
  (function(i, t) {
    e.exports = t();
  })(E, function() {
    return function i(t, n, c) {
      var l = window, f = "application/octet-stream", d = c || f, o = t, b = !n && !c && o, s = document.createElement("a"), B = function(r) {
        return String(r);
      }, u = l.Blob || l.MozBlob || l.WebKitBlob || B, g = n || "download", p, R;
      if (u = u.call ? u.bind(l) : Blob, String(this) === "true" && (o = [o, d], d = o[0], o = o[1]), b && b.length < 2048 && (g = b.split("/").pop().split("?")[0], s.href = b, s.href.indexOf(b) !== -1)) {
        var h = new XMLHttpRequest();
        return h.open("GET", b, !0), h.responseType = "blob", h.onload = function(r) {
          i(r.target.response, g, f);
        }, setTimeout(function() {
          h.send();
        }, 0), h;
      }
      if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(o))
        if (o.length > 1024 * 1024 * 1.999 && u !== B)
          o = C(o), d = o.type || f;
        else
          return navigator.msSaveBlob ? navigator.msSaveBlob(C(o), g) : w(o);
      else if (/([\x80-\xff])/.test(o)) {
        var y = 0, x = new Uint8Array(o.length), L = x.length;
        for (y; y < L; ++y)
          x[y] = o.charCodeAt(y);
        o = new u([x], { type: d });
      }
      p = o instanceof u ? o : new u([o], { type: d });
      function C(r) {
        var m = r.split(/[:;,]/), v = m[1], _ = m[2] == "base64" ? atob : decodeURIComponent, U = _(m.pop()), A = U.length, S = 0, k = new Uint8Array(A);
        for (S; S < A; ++S)
          k[S] = U.charCodeAt(S);
        return new u([k], { type: v });
      }
      function w(r, m) {
        if ("download" in s)
          return s.href = r, s.setAttribute("download", g), s.className = "download-js-link", s.innerHTML = "downloading...", s.style.display = "none", document.body.appendChild(s), setTimeout(function() {
            s.click(), document.body.removeChild(s), m === !0 && setTimeout(function() {
              l.URL.revokeObjectURL(s.href);
            }, 250);
          }, 66), !0;
        if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))
          return /^data:/.test(r) && (r = "data:" + r.replace(/^data:([\w\/\-\+]+)/, f)), window.open(r) || confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`) && (location.href = r), !0;
        var v = document.createElement("iframe");
        document.body.appendChild(v), !m && /^data:/.test(r) && (r = "data:" + r.replace(/^data:([\w\/\-\+]+)/, f)), v.src = r, setTimeout(function() {
          document.body.removeChild(v);
        }, 333);
      }
      if (navigator.msSaveBlob)
        return navigator.msSaveBlob(p, g);
      if (l.URL)
        w(l.URL.createObjectURL(p), !0);
      else {
        if (typeof p == "string" || p.constructor === B)
          try {
            return w("data:" + d + ";base64," + l.btoa(p));
          } catch {
            return w("data:" + d + "," + encodeURIComponent(p));
          }
        R = new FileReader(), R.onload = function(r) {
          w(this.result);
        }, R.readAsDataURL(p);
      }
      return !0;
    };
  });
})(I);
const M = I.exports;
let O = {
  font_size: 0.4,
  font_color: "#FFFFFF",
  background_alpha: 0.5,
  background_color: "#9C27B0",
  Stroke: "none"
};
function j(e) {
  return JSON.parse(e);
}
function D(e) {
  return JSON.stringify(e);
}
function N(e) {
  let a = {}, t = e.replace(/\n$/, "").split(`

`);
  for (let n of t) {
    let c = n.split(`
`), l = parseInt(c[0]), f = c[1].split(" --> "), d = c.slice(2).join();
    a[l] = {
      from: f[0],
      to: f[1],
      content: d
    };
  }
  return a;
}
function q(e) {
  let a = "";
  for (let i in e) {
    let t = e[i].from + " --> " + e[i].to, n = e[i].content;
    a += [i, t, n].join(`
`) + `

`;
  }
  return a;
}
function z(e, a) {
  let i = {
    ...O,
    ...a,
    body: []
  }, t = (n) => {
    let c = n.split(":"), l = parseInt(c[0]), f = parseInt(c[1]), d = parseFloat(c[2].replace(",", "."));
    return l * 60 * 60 + f * 60 + d;
  };
  for (let n in e)
    i.body[n] = {
      from: t(e[n].from),
      to: t(e[n].to),
      location: 2,
      content: e[n].content
    };
  return i;
}
function G(e) {
  let a = {}, i = (t) => [[Math.trunc(t / 60 / 60), Math.trunc(t / 60), Math.trunc(t % 60)].map((n) => n.toString().padEnd(2, "0")).join(":"), (t % 1).toString().slice(2).padEnd(3, "0")].join(",");
  return e.body.forEach((t, n) => {
    a[n] = {
      from: i(t.from),
      to: i(t.to),
      content: t.content
    };
  }), a;
}
let F = M, T = document.getElementById("bsc-converter");
T != null && (T.onchange = () => {
  let e = new FileReader(), a = T.value.split(".").pop(), i = "result";
  e.readAsText(T.files[0], "utf-8"), e.onload = () => {
    let t = e.result;
    if (a == "bcc") {
      let n = j(t), c = G(n), l = q(c);
      F(l, i + ".srt", "text/plain");
    } else if (a == "srt") {
      let n = N(t), c = z(n), l = D(c);
      F(l, i + ".bcc", "text/plain");
    } else
      alert("文件缺少.srt/.bcc后缀");
  }, T.value = "", console.log("s");
});
