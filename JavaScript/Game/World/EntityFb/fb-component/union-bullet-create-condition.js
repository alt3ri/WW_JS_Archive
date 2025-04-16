"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionBulletCreateCondition =
    exports.unionToUnionBulletCreateCondition =
    exports.UnionBulletCreateCondition =
      void 0);
const on_collision_condition_js_1 = require("../fb-component/on-collision-condition.js"),
  on_hit_condition_js_1 = require("../fb-component/on-hit-condition.js"),
  on_matching_condition_js_1 = require("../fb-component/on-matching-condition.js"),
  on_open_gravity_collision_condition_js_1 = require("../fb-component/on-open-gravity-collision-condition.js"),
  on_throw_trigger_time_condition_js_1 = require("../fb-component/on-throw-trigger-time-condition.js");
var UnionBulletCreateCondition;
function unionToUnionBulletCreateCondition(n, o) {
  switch (UnionBulletCreateCondition[n]) {
    case "NONE":
      return;
    case "OnCollisionCondition":
      return o(new on_collision_condition_js_1.OnCollisionCondition());
    case "OnHitCondition":
      return o(new on_hit_condition_js_1.OnHitCondition());
    case "OnMatchingCondition":
      return o(new on_matching_condition_js_1.OnMatchingCondition());
    case "OnOpenGravityCollisionCondition":
      return o(
        new on_open_gravity_collision_condition_js_1.OnOpenGravityCollisionCondition(),
      );
    case "OnThrowTriggerTimeCondition":
      return o(
        new on_throw_trigger_time_condition_js_1.OnThrowTriggerTimeCondition(),
      );
    default:
      return;
  }
}
function unionListToUnionBulletCreateCondition(n, o, i) {
  switch (UnionBulletCreateCondition[n]) {
    case "NONE":
      return;
    case "OnCollisionCondition":
      return o(i, new on_collision_condition_js_1.OnCollisionCondition());
    case "OnHitCondition":
      return o(i, new on_hit_condition_js_1.OnHitCondition());
    case "OnMatchingCondition":
      return o(i, new on_matching_condition_js_1.OnMatchingCondition());
    case "OnOpenGravityCollisionCondition":
      return o(
        i,
        new on_open_gravity_collision_condition_js_1.OnOpenGravityCollisionCondition(),
      );
    case "OnThrowTriggerTimeCondition":
      return o(
        i,
        new on_throw_trigger_time_condition_js_1.OnThrowTriggerTimeCondition(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.OnCollisionCondition = 1)] = "OnCollisionCondition"),
    (n[(n.OnHitCondition = 2)] = "OnHitCondition"),
    (n[(n.OnMatchingCondition = 3)] = "OnMatchingCondition"),
    (n[(n.OnOpenGravityCollisionCondition = 4)] =
      "OnOpenGravityCollisionCondition"),
    (n[(n.OnThrowTriggerTimeCondition = 5)] = "OnThrowTriggerTimeCondition");
})(
  (UnionBulletCreateCondition =
    exports.UnionBulletCreateCondition ||
    (exports.UnionBulletCreateCondition = {})),
),
  (exports.unionToUnionBulletCreateCondition =
    unionToUnionBulletCreateCondition),
  (exports.unionListToUnionBulletCreateCondition =
    unionListToUnionBulletCreateCondition);
//# sourceMappingURL=union-bullet-create-condition.js.map
