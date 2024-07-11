"use strict";
function calTwoNodePath(e, o, t, r) {
  var a = [],
    s = [{ Path: [e] }];
  let f = 0;
  for (; 0 < s.length && (f++, !r || !r(f, a)); ) {
    var c = s.shift()["Path"],
      i = c[c.length - 1];
    if (i === o) {
      if ((a.push(c), r && r(f, a))) break;
    } else {
      i = t.get(i);
      if (i)
        for (const l of i.Connected)
          c.includes(l) || s.push({ Path: [...c, l] });
    }
  }
  return a;
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.calTwoNodePath = void 0),
  (exports.calTwoNodePath = calTwoNodePath);
//# sourceMappingURL=Graph.js.map
