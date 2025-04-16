"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VolumeTriggerShape =
    exports.UnionTriggerShape =
    exports.UnionRange =
    exports.UnionCombinationTriggerShape =
    exports.SphereTriggerShape =
    exports.HollowSphereTriggerShape =
    exports.HollowCylinderTriggerShape =
    exports.CylinderTriggerShape =
    exports.Cylinder =
    exports.ConeTriggerShape =
    exports.CombinationTriggerShape =
    exports.CircleRange =
    exports.BoxTriggerShape =
    exports.BoxRange =
    exports.ActorRefVolume =
    exports.ActorCollisionTriggerShape =
      void 0);
var actor_collision_trigger_shape_js_1 = require("./fb-shape/actor-collision-trigger-shape.js"),
  actor_ref_volume_js_1 =
    (Object.defineProperty(exports, "ActorCollisionTriggerShape", {
      enumerable: !0,
      get: function () {
        return actor_collision_trigger_shape_js_1.ActorCollisionTriggerShape;
      },
    }),
    require("./fb-shape/actor-ref-volume.js")),
  box_range_js_1 =
    (Object.defineProperty(exports, "ActorRefVolume", {
      enumerable: !0,
      get: function () {
        return actor_ref_volume_js_1.ActorRefVolume;
      },
    }),
    require("./fb-shape/box-range.js")),
  box_trigger_shape_js_1 =
    (Object.defineProperty(exports, "BoxRange", {
      enumerable: !0,
      get: function () {
        return box_range_js_1.BoxRange;
      },
    }),
    require("./fb-shape/box-trigger-shape.js")),
  circle_range_js_1 =
    (Object.defineProperty(exports, "BoxTriggerShape", {
      enumerable: !0,
      get: function () {
        return box_trigger_shape_js_1.BoxTriggerShape;
      },
    }),
    require("./fb-shape/circle-range.js")),
  combination_trigger_shape_js_1 =
    (Object.defineProperty(exports, "CircleRange", {
      enumerable: !0,
      get: function () {
        return circle_range_js_1.CircleRange;
      },
    }),
    require("./fb-shape/combination-trigger-shape.js")),
  cone_trigger_shape_js_1 =
    (Object.defineProperty(exports, "CombinationTriggerShape", {
      enumerable: !0,
      get: function () {
        return combination_trigger_shape_js_1.CombinationTriggerShape;
      },
    }),
    require("./fb-shape/cone-trigger-shape.js")),
  cylinder_js_1 =
    (Object.defineProperty(exports, "ConeTriggerShape", {
      enumerable: !0,
      get: function () {
        return cone_trigger_shape_js_1.ConeTriggerShape;
      },
    }),
    require("./fb-shape/cylinder.js")),
  cylinder_trigger_shape_js_1 =
    (Object.defineProperty(exports, "Cylinder", {
      enumerable: !0,
      get: function () {
        return cylinder_js_1.Cylinder;
      },
    }),
    require("./fb-shape/cylinder-trigger-shape.js")),
  hollow_cylinder_trigger_shape_js_1 =
    (Object.defineProperty(exports, "CylinderTriggerShape", {
      enumerable: !0,
      get: function () {
        return cylinder_trigger_shape_js_1.CylinderTriggerShape;
      },
    }),
    require("./fb-shape/hollow-cylinder-trigger-shape.js")),
  hollow_sphere_trigger_shape_js_1 =
    (Object.defineProperty(exports, "HollowCylinderTriggerShape", {
      enumerable: !0,
      get: function () {
        return hollow_cylinder_trigger_shape_js_1.HollowCylinderTriggerShape;
      },
    }),
    require("./fb-shape/hollow-sphere-trigger-shape.js")),
  sphere_trigger_shape_js_1 =
    (Object.defineProperty(exports, "HollowSphereTriggerShape", {
      enumerable: !0,
      get: function () {
        return hollow_sphere_trigger_shape_js_1.HollowSphereTriggerShape;
      },
    }),
    require("./fb-shape/sphere-trigger-shape.js")),
  union_combination_trigger_shape_js_1 =
    (Object.defineProperty(exports, "SphereTriggerShape", {
      enumerable: !0,
      get: function () {
        return sphere_trigger_shape_js_1.SphereTriggerShape;
      },
    }),
    require("./fb-shape/union-combination-trigger-shape.js")),
  union_range_js_1 =
    (Object.defineProperty(exports, "UnionCombinationTriggerShape", {
      enumerable: !0,
      get: function () {
        return union_combination_trigger_shape_js_1.UnionCombinationTriggerShape;
      },
    }),
    require("./fb-shape/union-range.js")),
  union_trigger_shape_js_1 =
    (Object.defineProperty(exports, "UnionRange", {
      enumerable: !0,
      get: function () {
        return union_range_js_1.UnionRange;
      },
    }),
    require("./fb-shape/union-trigger-shape.js")),
  volume_trigger_shape_js_1 =
    (Object.defineProperty(exports, "UnionTriggerShape", {
      enumerable: !0,
      get: function () {
        return union_trigger_shape_js_1.UnionTriggerShape;
      },
    }),
    require("./fb-shape/volume-trigger-shape.js"));
Object.defineProperty(exports, "VolumeTriggerShape", {
  enumerable: !0,
  get: function () {
    return volume_trigger_shape_js_1.VolumeTriggerShape;
  },
});
//# sourceMappingURL=fb-shape.js.map
