"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAngularConstraintMotion =
    exports.PhysicsAngularLimit =
    exports.AcmLocked =
    exports.AcmLimited =
    exports.AcmFree =
      void 0);
var acm_free_js_1 = require("./fb-physics/acm-free.js"),
  acm_limited_js_1 =
    (Object.defineProperty(exports, "AcmFree", {
      enumerable: !0,
      get: function () {
        return acm_free_js_1.AcmFree;
      },
    }),
    require("./fb-physics/acm-limited.js")),
  acm_locked_js_1 =
    (Object.defineProperty(exports, "AcmLimited", {
      enumerable: !0,
      get: function () {
        return acm_limited_js_1.AcmLimited;
      },
    }),
    require("./fb-physics/acm-locked.js")),
  physics_angular_limit_js_1 =
    (Object.defineProperty(exports, "AcmLocked", {
      enumerable: !0,
      get: function () {
        return acm_locked_js_1.AcmLocked;
      },
    }),
    require("./fb-physics/physics-angular-limit.js")),
  union_angular_constraint_motion_js_1 =
    (Object.defineProperty(exports, "PhysicsAngularLimit", {
      enumerable: !0,
      get: function () {
        return physics_angular_limit_js_1.PhysicsAngularLimit;
      },
    }),
    require("./fb-physics/union-angular-constraint-motion.js"));
Object.defineProperty(exports, "UnionAngularConstraintMotion", {
  enumerable: !0,
  get: function () {
    return union_angular_constraint_motion_js_1.UnionAngularConstraintMotion;
  },
});
//# sourceMappingURL=fb-physics.js.map
