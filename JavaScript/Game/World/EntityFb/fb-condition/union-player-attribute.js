"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPlayerAttribute =
    exports.unionToUnionPlayerAttribute =
    exports.UnionPlayerAttribute =
      void 0);
const health_attribute_js_1 = require("../fb-condition/health-attribute.js");
var UnionPlayerAttribute;
function unionToUnionPlayerAttribute(t, e) {
  switch (UnionPlayerAttribute[t]) {
    case "NONE":
      return;
    case "HealthAttribute":
      return e(new health_attribute_js_1.HealthAttribute());
    default:
      return;
  }
}
function unionListToUnionPlayerAttribute(t, e, r) {
  switch (UnionPlayerAttribute[t]) {
    case "NONE":
      return;
    case "HealthAttribute":
      return e(r, new health_attribute_js_1.HealthAttribute());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"), (t[(t.HealthAttribute = 1)] = "HealthAttribute");
})(
  (UnionPlayerAttribute =
    exports.UnionPlayerAttribute || (exports.UnionPlayerAttribute = {})),
),
  (exports.unionToUnionPlayerAttribute = unionToUnionPlayerAttribute),
  (exports.unionListToUnionPlayerAttribute = unionListToUnionPlayerAttribute);
//# sourceMappingURL=union-player-attribute.js.map
