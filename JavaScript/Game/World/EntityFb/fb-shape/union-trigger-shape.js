"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTriggerShape =
    exports.unionToUnionTriggerShape =
    exports.UnionTriggerShape =
      void 0);
const actor_collision_trigger_shape_js_1 = require("../fb-shape/actor-collision-trigger-shape.js"),
  actor_ref_volume_js_1 = require("../fb-shape/actor-ref-volume.js"),
  box_trigger_shape_js_1 = require("../fb-shape/box-trigger-shape.js"),
  combination_trigger_shape_js_1 = require("../fb-shape/combination-trigger-shape.js"),
  cone_trigger_shape_js_1 = require("../fb-shape/cone-trigger-shape.js"),
  cylinder_trigger_shape_js_1 = require("../fb-shape/cylinder-trigger-shape.js"),
  hollow_cylinder_trigger_shape_js_1 = require("../fb-shape/hollow-cylinder-trigger-shape.js"),
  hollow_sphere_trigger_shape_js_1 = require("../fb-shape/hollow-sphere-trigger-shape.js"),
  sphere_trigger_shape_js_1 = require("../fb-shape/sphere-trigger-shape.js"),
  volume_trigger_shape_js_1 = require("../fb-shape/volume-trigger-shape.js");
var UnionTriggerShape;
function unionToUnionTriggerShape(e, r) {
  switch (UnionTriggerShape[e]) {
    case "NONE":
      return;
    case "ActorCollisionTriggerShape":
      return r(
        new actor_collision_trigger_shape_js_1.ActorCollisionTriggerShape(),
      );
    case "ActorRefVolume":
      return r(new actor_ref_volume_js_1.ActorRefVolume());
    case "BoxTriggerShape":
      return r(new box_trigger_shape_js_1.BoxTriggerShape());
    case "CombinationTriggerShape":
      return r(new combination_trigger_shape_js_1.CombinationTriggerShape());
    case "ConeTriggerShape":
      return r(new cone_trigger_shape_js_1.ConeTriggerShape());
    case "CylinderTriggerShape":
      return r(new cylinder_trigger_shape_js_1.CylinderTriggerShape());
    case "HollowCylinderTriggerShape":
      return r(
        new hollow_cylinder_trigger_shape_js_1.HollowCylinderTriggerShape(),
      );
    case "HollowSphereTriggerShape":
      return r(new hollow_sphere_trigger_shape_js_1.HollowSphereTriggerShape());
    case "SphereTriggerShape":
      return r(new sphere_trigger_shape_js_1.SphereTriggerShape());
    case "VolumeTriggerShape":
      return r(new volume_trigger_shape_js_1.VolumeTriggerShape());
    default:
      return;
  }
}
function unionListToUnionTriggerShape(e, r, i) {
  switch (UnionTriggerShape[e]) {
    case "NONE":
      return;
    case "ActorCollisionTriggerShape":
      return r(
        i,
        new actor_collision_trigger_shape_js_1.ActorCollisionTriggerShape(),
      );
    case "ActorRefVolume":
      return r(i, new actor_ref_volume_js_1.ActorRefVolume());
    case "BoxTriggerShape":
      return r(i, new box_trigger_shape_js_1.BoxTriggerShape());
    case "CombinationTriggerShape":
      return r(i, new combination_trigger_shape_js_1.CombinationTriggerShape());
    case "ConeTriggerShape":
      return r(i, new cone_trigger_shape_js_1.ConeTriggerShape());
    case "CylinderTriggerShape":
      return r(i, new cylinder_trigger_shape_js_1.CylinderTriggerShape());
    case "HollowCylinderTriggerShape":
      return r(
        i,
        new hollow_cylinder_trigger_shape_js_1.HollowCylinderTriggerShape(),
      );
    case "HollowSphereTriggerShape":
      return r(
        i,
        new hollow_sphere_trigger_shape_js_1.HollowSphereTriggerShape(),
      );
    case "SphereTriggerShape":
      return r(i, new sphere_trigger_shape_js_1.SphereTriggerShape());
    case "VolumeTriggerShape":
      return r(i, new volume_trigger_shape_js_1.VolumeTriggerShape());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ActorCollisionTriggerShape = 1)] = "ActorCollisionTriggerShape"),
    (e[(e.ActorRefVolume = 2)] = "ActorRefVolume"),
    (e[(e.BoxTriggerShape = 3)] = "BoxTriggerShape"),
    (e[(e.CombinationTriggerShape = 4)] = "CombinationTriggerShape"),
    (e[(e.ConeTriggerShape = 5)] = "ConeTriggerShape"),
    (e[(e.CylinderTriggerShape = 6)] = "CylinderTriggerShape"),
    (e[(e.HollowCylinderTriggerShape = 7)] = "HollowCylinderTriggerShape"),
    (e[(e.HollowSphereTriggerShape = 8)] = "HollowSphereTriggerShape"),
    (e[(e.SphereTriggerShape = 9)] = "SphereTriggerShape"),
    (e[(e.VolumeTriggerShape = 10)] = "VolumeTriggerShape");
})(
  (UnionTriggerShape =
    exports.UnionTriggerShape || (exports.UnionTriggerShape = {})),
),
  (exports.unionToUnionTriggerShape = unionToUnionTriggerShape),
  (exports.unionListToUnionTriggerShape = unionListToUnionTriggerShape);
//# sourceMappingURL=union-trigger-shape.js.map
