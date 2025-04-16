"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPhysicsAttachTarget =
    exports.unionToUnionPhysicsAttachTarget =
    exports.UnionPhysicsAttachTarget =
      void 0);
const actor_attach_target_js_1 = require("../fb-component/actor-attach-target.js"),
  entity_attach_target_js_1 = require("../fb-component/entity-attach-target.js"),
  point_attach_target_js_1 = require("../fb-component/point-attach-target.js");
var UnionPhysicsAttachTarget;
function unionToUnionPhysicsAttachTarget(t, a) {
  switch (UnionPhysicsAttachTarget[t]) {
    case "NONE":
      return;
    case "ActorAttachTarget":
      return a(new actor_attach_target_js_1.ActorAttachTarget());
    case "EntityAttachTarget":
      return a(new entity_attach_target_js_1.EntityAttachTarget());
    case "PointAttachTarget":
      return a(new point_attach_target_js_1.PointAttachTarget());
    default:
      return;
  }
}
function unionListToUnionPhysicsAttachTarget(t, a, e) {
  switch (UnionPhysicsAttachTarget[t]) {
    case "NONE":
      return;
    case "ActorAttachTarget":
      return a(e, new actor_attach_target_js_1.ActorAttachTarget());
    case "EntityAttachTarget":
      return a(e, new entity_attach_target_js_1.EntityAttachTarget());
    case "PointAttachTarget":
      return a(e, new point_attach_target_js_1.PointAttachTarget());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.ActorAttachTarget = 1)] = "ActorAttachTarget"),
    (t[(t.EntityAttachTarget = 2)] = "EntityAttachTarget"),
    (t[(t.PointAttachTarget = 3)] = "PointAttachTarget");
})(
  (UnionPhysicsAttachTarget =
    exports.UnionPhysicsAttachTarget ||
    (exports.UnionPhysicsAttachTarget = {})),
),
  (exports.unionToUnionPhysicsAttachTarget = unionToUnionPhysicsAttachTarget),
  (exports.unionListToUnionPhysicsAttachTarget =
    unionListToUnionPhysicsAttachTarget);
//# sourceMappingURL=union-physics-attach-target.js.map
