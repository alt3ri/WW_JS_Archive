"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionToggleMapMarkState =
    exports.unionToUnionToggleMapMarkState =
    exports.UnionToggleMapMarkState =
      void 0);
const disable_map_mark_js_1 = require("../fb-action/disable-map-mark.js"),
  hide_map_mark_js_1 = require("../fb-action/hide-map-mark.js"),
  show_map_mark_js_1 = require("../fb-action/show-map-mark.js");
var UnionToggleMapMarkState;
function unionToUnionToggleMapMarkState(a, e) {
  switch (UnionToggleMapMarkState[a]) {
    case "NONE":
      return;
    case "DisableMapMark":
      return e(new disable_map_mark_js_1.DisableMapMark());
    case "HideMapMark":
      return e(new hide_map_mark_js_1.HideMapMark());
    case "ShowMapMark":
      return e(new show_map_mark_js_1.ShowMapMark());
    default:
      return;
  }
}
function unionListToUnionToggleMapMarkState(a, e, r) {
  switch (UnionToggleMapMarkState[a]) {
    case "NONE":
      return;
    case "DisableMapMark":
      return e(r, new disable_map_mark_js_1.DisableMapMark());
    case "HideMapMark":
      return e(r, new hide_map_mark_js_1.HideMapMark());
    case "ShowMapMark":
      return e(r, new show_map_mark_js_1.ShowMapMark());
    default:
      return;
  }
}
!(function (a) {
  (a[(a.NONE = 0)] = "NONE"),
    (a[(a.DisableMapMark = 1)] = "DisableMapMark"),
    (a[(a.HideMapMark = 2)] = "HideMapMark"),
    (a[(a.ShowMapMark = 3)] = "ShowMapMark");
})(
  (UnionToggleMapMarkState =
    exports.UnionToggleMapMarkState || (exports.UnionToggleMapMarkState = {})),
),
  (exports.unionToUnionToggleMapMarkState = unionToUnionToggleMapMarkState),
  (exports.unionListToUnionToggleMapMarkState =
    unionListToUnionToggleMapMarkState);
//# sourceMappingURL=union-toggle-map-mark-state.js.map
