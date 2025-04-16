"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionThrowMotion =
    exports.unionToUnionThrowMotion =
    exports.UnionThrowMotion =
      void 0);
const circumnutation_js_1 = require("../fb-component/circumnutation.js"),
  projectile_motion_js_1 = require("../fb-component/projectile-motion.js"),
  throw_motion_levitate_js_1 = require("../fb-component/throw-motion-levitate.js"),
  throw_motion_track_target_js_1 = require("../fb-component/throw-motion-track-target.js");
var UnionThrowMotion;
function unionToUnionThrowMotion(o, t) {
  switch (UnionThrowMotion[o]) {
    case "NONE":
      return;
    case "Circumnutation":
      return t(new circumnutation_js_1.Circumnutation());
    case "ProjectileMotion":
      return t(new projectile_motion_js_1.ProjectileMotion());
    case "ThrowMotionLevitate":
      return t(new throw_motion_levitate_js_1.ThrowMotionLevitate());
    case "ThrowMotionTrackTarget":
      return t(new throw_motion_track_target_js_1.ThrowMotionTrackTarget());
    default:
      return;
  }
}
function unionListToUnionThrowMotion(o, t, n) {
  switch (UnionThrowMotion[o]) {
    case "NONE":
      return;
    case "Circumnutation":
      return t(n, new circumnutation_js_1.Circumnutation());
    case "ProjectileMotion":
      return t(n, new projectile_motion_js_1.ProjectileMotion());
    case "ThrowMotionLevitate":
      return t(n, new throw_motion_levitate_js_1.ThrowMotionLevitate());
    case "ThrowMotionTrackTarget":
      return t(n, new throw_motion_track_target_js_1.ThrowMotionTrackTarget());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.Circumnutation = 1)] = "Circumnutation"),
    (o[(o.ProjectileMotion = 2)] = "ProjectileMotion"),
    (o[(o.ThrowMotionLevitate = 3)] = "ThrowMotionLevitate"),
    (o[(o.ThrowMotionTrackTarget = 4)] = "ThrowMotionTrackTarget");
})(
  (UnionThrowMotion =
    exports.UnionThrowMotion || (exports.UnionThrowMotion = {})),
),
  (exports.unionToUnionThrowMotion = unionToUnionThrowMotion),
  (exports.unionListToUnionThrowMotion = unionListToUnionThrowMotion);
//# sourceMappingURL=union-throw-motion.js.map
