var q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, A = { exports: {} };
(function(e, l) {
  (function(i, t) {
    e.exports = t();
  })(q, function() {
    return function i(t, n, a) {
      var c = window, f = "application/octet-stream", d = a || f, o = t, b = !n && !a && o, s = document.createElement("a"), T = function(r) {
        return String(r);
      }, u = c.Blob || c.MozBlob || c.WebKitBlob || T, g = n || "download", p, x;
      if (u = u.call ? u.bind(c) : Blob, String(this) === "true" && (o = [o, d], d = o[0], o = o[1]), b && b.length < 2048 && (g = b.split("/").pop().split("?")[0], s.href = b, s.href.indexOf(b) !== -1)) {
        var h = new XMLHttpRequest();
        return h.open("GET", b, !0), h.responseType = "blob", h.onload = function(r) {
          i(r.target.response, g, f);
        }, setTimeout(function() {
          h.send();
        }, 0), h;
      }
      if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(o))
        if (o.length > 1024 * 1024 * 1.999 && u !== T)
          o = C(o), d = o.type || f;
        else
          return navigator.msSaveBlob ? navigator.msSaveBlob(C(o), g) : w(o);
      else if (/([\x80-\xff])/.test(o)) {
        var y = 0, R = new Uint8Array(o.length), L = R.length;
        for (y; y < L; ++y)
          R[y] = o.charCodeAt(y);
        o = new u([R], { type: d });
      }
      p = o instanceof u ? o : new u([o], { type: d });
      function C(r) {
        var m = r.split(/[:;,]/), v = m[1], F = m[2] == "base64" ? atob : decodeURIComponent, _ = F(m.pop()), E = _.length, B = 0, I = new Uint8Array(E);
        for (B; B < E; ++B)
          I[B] = _.charCodeAt(B);
        return new u([I], { type: v });
      }
      function w(r, m) {
        if ("download" in s)
          return s.href = r, s.setAttribute("download", g), s.className = "download-js-link", s.innerHTML = "downloading...", s.style.display = "none", document.body.appendChild(s), setTimeout(function() {
            s.click(), document.body.removeChild(s), m === !0 && setTimeout(function() {
              c.URL.revokeObjectURL(s.href);
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
      if (c.URL)
        w(c.URL.createObjectURL(p), !0);
      else {
        if (typeof p == "string" || p.constructor === T)
          try {
            return w("data:" + d + ";base64," + c.btoa(p));
          } catch {
            return w("data:" + d + "," + encodeURIComponent(p));
          }
        x = new FileReader(), x.onload = function(r) {
          w(this.result);
        }, x.readAsDataURL(p);
      }
      return !0;
    };
  });
})(A);
const M = A.exports;
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
  let l = {}, t = e.replace(/\n$/, "").split(`

`);
  for (let n of t) {
    let a = n.split(`
`), c = parseInt(a[0]), f = a[1].split(" --> "), d = a.slice(2).join();
    l[c] = {
      from: f[0],
      to: f[1],
      content: d
    };
  }
  return l;
}
function G(e) {
  let l = "";
  for (let i in e) {
    let t = e[i].from + " --> " + e[i].to, n = e[i].content;
    l += [i, t, n].join(`
`) + `

`;
  }
  return l;
}
function H(e, l) {
  let i = {
    ...O,
    ...l,
    body: []
  }, t = (n) => {
    let a = n.split(":"), c = parseInt(a[0]), f = parseInt(a[1]), d = parseFloat(a[2].replace(",", "."));
    return c * 60 * 60 + f * 60 + d;
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
function z(e) {
  let l = {}, i = (t) => [[Math.trunc(t / 60 / 60), Math.trunc(t / 60), Math.trunc(t % 60)].map((n) => n.toString().padEnd(2, "0")).join(":"), (t % 1).toString().slice(2).padEnd(3, "0")].join(",");
  return e.body.forEach((t, n) => {
    l[n] = {
      from: i(t.from),
      to: i(t.to),
      content: t.content
    };
  }), l;
}
let U = M, S = document.getElementById("bsc-converter");
S != null && (S.onchange = () => {
  let e = new FileReader(), l = S.value.split(".").pop();
  e.readAsText(S.files[0], "utf-8"), e.onload = () => {
    let i = e.result;
    if (l == "bcc") {
      let t = j(i), n = z(t), a = G(n);
      U(a, "res.srt", "text/plain");
    } else if (l == "srt") {
      let t = N(i), n = H(t), a = D(n);
      U(a, "res.bcc", "text/plain");
    }
  };
});
let k = document.getElementById("bsc-request"), J = document.getElementById("bsc-request-submit");
J.onclick = () => {
  k.value && new XMLHttpRequest().open(GET, k.value);
};
