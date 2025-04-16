"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionToggleAirWall =
    exports.unionToUnionToggleAirWall =
    exports.UnionToggleAirWall =
      void 0);
const close_air_wall_js_1 = require("../fb-action/close-air-wall.js"),
  open_air_wall_js_1 = require("../fb-action/open-air-wall.js");
var UnionToggleAirWall;
function unionToUnionToggleAirWall(l, e) {
  switch (UnionToggleAirWall[l]) {
    case "NONE":
      return;
    case "CloseAirWall":
      return e(new close_air_wall_js_1.CloseAirWall());
    case "OpenAirWall":
      return e(new open_air_wall_js_1.OpenAirWall());
    default:
      return;
  }
}
function unionListToUnionToggleAirWall(l, e, n) {
  switch (UnionToggleAirWall[l]) {
    case "NONE":
      return;
    case "CloseAirWall":
      return e(n, new close_air_wall_js_1.CloseAirWall());
    case "OpenAirWall":
      return e(n, new open_air_wall_js_1.OpenAirWall());
    default:
      return;
  }
}
!(function (l) {
  (l[(l.NONE = 0)] = "NONE"),
    (l[(l.CloseAirWall = 1)] = "CloseAirWall"),
    (l[(l.OpenAirWall = 2)] = "OpenAirWall");
})(
  (UnionToggleAirWall =
    exports.UnionToggleAirWall || (exports.UnionToggleAirWall = {})),
),
  (exports.unionToUnionToggleAirWall = unionToUnionToggleAirWall),
  (exports.unionListToUnionToggleAirWall = unionListToUnionToggleAirWall);
//# sourceMappingURL=union-toggle-air-wall.js.map
