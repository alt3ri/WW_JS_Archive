"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAngularConstraintMotion =
    exports.unionToUnionAngularConstraintMotion =
    exports.UnionAngularConstraintMotion =
      void 0);
const acm_free_js_1 = require("../fb-physics/acm-free.js"),
  acm_limited_js_1 = require("../fb-physics/acm-limited.js"),
  acm_locked_js_1 = require("../fb-physics/acm-locked.js");
var UnionAngularConstraintMotion;
function unionToUnionAngularConstraintMotion(n, e) {
  switch (UnionAngularConstraintMotion[n]) {
    case "NONE":
      return;
    case "AcmFree":
      return e(new acm_free_js_1.AcmFree());
    case "AcmLimited":
      return e(new acm_limited_js_1.AcmLimited());
    case "AcmLocked":
      return e(new acm_locked_js_1.AcmLocked());
    default:
      return;
  }
}
function unionListToUnionAngularConstraintMotion(n, e, t) {
  switch (UnionAngularConstraintMotion[n]) {
    case "NONE":
      return;
    case "AcmFree":
      return e(t, new acm_free_js_1.AcmFree());
    case "AcmLimited":
      return e(t, new acm_limited_js_1.AcmLimited());
    case "AcmLocked":
      return e(t, new acm_locked_js_1.AcmLocked());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.AcmFree = 1)] = "AcmFree"),
    (n[(n.AcmLimited = 2)] = "AcmLimited"),
    (n[(n.AcmLocked = 3)] = "AcmLocked");
})(
  (UnionAngularConstraintMotion =
    exports.UnionAngularConstraintMotion ||
    (exports.UnionAngularConstraintMotion = {})),
),
  (exports.unionToUnionAngularConstraintMotion =
    unionToUnionAngularConstraintMotion),
  (exports.unionListToUnionAngularConstraintMotion =
    unionListToUnionAngularConstraintMotion);
//# sourceMappingURL=union-angular-constraint-motion.js.map
