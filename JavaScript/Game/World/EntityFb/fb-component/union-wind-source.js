"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionWindSource =
    exports.unionToUnionWindSource =
    exports.UnionWindSource =
      void 0);
const wind_directional_js_1 = require("../fb-component/wind-directional.js");
var UnionWindSource;
function unionToUnionWindSource(n, i) {
  switch (UnionWindSource[n]) {
    case "NONE":
      return;
    case "WindDirectional":
      return i(new wind_directional_js_1.WindDirectional());
    default:
      return;
  }
}
function unionListToUnionWindSource(n, i, o) {
  switch (UnionWindSource[n]) {
    case "NONE":
      return;
    case "WindDirectional":
      return i(o, new wind_directional_js_1.WindDirectional());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"), (n[(n.WindDirectional = 1)] = "WindDirectional");
})(
  (UnionWindSource = exports.UnionWindSource || (exports.UnionWindSource = {})),
),
  (exports.unionToUnionWindSource = unionToUnionWindSource),
  (exports.unionListToUnionWindSource = unionListToUnionWindSource);
//# sourceMappingURL=union-wind-source.js.map
