"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionFireBullet =
    exports.unionToUnionFireBullet =
    exports.UnionFireBullet =
      void 0);
const fire_bullet_forward_front_js_1 = require("../fb-action/fire-bullet-forward-front.js"),
  fire_bullet_track_position_js_1 = require("../fb-action/fire-bullet-track-position.js"),
  fire_bullet_track_target_js_1 = require("../fb-action/fire-bullet-track-target.js");
var UnionFireBullet;
function unionToUnionFireBullet(e, r) {
  switch (UnionFireBullet[e]) {
    case "NONE":
      return;
    case "FireBulletForwardFront":
      return r(new fire_bullet_forward_front_js_1.FireBulletForwardFront());
    case "FireBulletTrackPosition":
      return r(new fire_bullet_track_position_js_1.FireBulletTrackPosition());
    case "FireBulletTrackTarget":
      return r(new fire_bullet_track_target_js_1.FireBulletTrackTarget());
    default:
      return;
  }
}
function unionListToUnionFireBullet(e, r, t) {
  switch (UnionFireBullet[e]) {
    case "NONE":
      return;
    case "FireBulletForwardFront":
      return r(t, new fire_bullet_forward_front_js_1.FireBulletForwardFront());
    case "FireBulletTrackPosition":
      return r(
        t,
        new fire_bullet_track_position_js_1.FireBulletTrackPosition(),
      );
    case "FireBulletTrackTarget":
      return r(t, new fire_bullet_track_target_js_1.FireBulletTrackTarget());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.FireBulletForwardFront = 1)] = "FireBulletForwardFront"),
    (e[(e.FireBulletTrackPosition = 2)] = "FireBulletTrackPosition"),
    (e[(e.FireBulletTrackTarget = 3)] = "FireBulletTrackTarget");
})(
  (UnionFireBullet = exports.UnionFireBullet || (exports.UnionFireBullet = {})),
),
  (exports.unionToUnionFireBullet = unionToUnionFireBullet),
  (exports.unionListToUnionFireBullet = unionListToUnionFireBullet);
//# sourceMappingURL=union-fire-bullet.js.map
