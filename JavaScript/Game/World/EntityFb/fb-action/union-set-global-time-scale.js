"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetGlobalTimeScale =
    exports.unionToUnionSetGlobalTimeScale =
    exports.UnionSetGlobalTimeScale =
      void 0);
const close_global_time_scale_js_1 = require("../fb-action/close-global-time-scale.js"),
  open_global_time_scale_js_1 = require("../fb-action/open-global-time-scale.js");
var UnionSetGlobalTimeScale;
function unionToUnionSetGlobalTimeScale(e, l) {
  switch (UnionSetGlobalTimeScale[e]) {
    case "NONE":
      return;
    case "CloseGlobalTimeScale":
      return l(new close_global_time_scale_js_1.CloseGlobalTimeScale());
    case "OpenGlobalTimeScale":
      return l(new open_global_time_scale_js_1.OpenGlobalTimeScale());
    default:
      return;
  }
}
function unionListToUnionSetGlobalTimeScale(e, l, o) {
  switch (UnionSetGlobalTimeScale[e]) {
    case "NONE":
      return;
    case "CloseGlobalTimeScale":
      return l(o, new close_global_time_scale_js_1.CloseGlobalTimeScale());
    case "OpenGlobalTimeScale":
      return l(o, new open_global_time_scale_js_1.OpenGlobalTimeScale());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CloseGlobalTimeScale = 1)] = "CloseGlobalTimeScale"),
    (e[(e.OpenGlobalTimeScale = 2)] = "OpenGlobalTimeScale");
})(
  (UnionSetGlobalTimeScale =
    exports.UnionSetGlobalTimeScale || (exports.UnionSetGlobalTimeScale = {})),
),
  (exports.unionToUnionSetGlobalTimeScale = unionToUnionSetGlobalTimeScale),
  (exports.unionListToUnionSetGlobalTimeScale =
    unionListToUnionSetGlobalTimeScale);
//# sourceMappingURL=union-set-global-time-scale.js.map
