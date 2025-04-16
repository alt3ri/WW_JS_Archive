"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAttachTarget =
    exports.unionToUnionAttachTarget =
    exports.UnionAttachTarget =
      void 0);
const actor_attach_target_js_1 = require("../fb-component/actor-attach-target.js"),
  dynamic_attach_target_js_1 = require("../fb-component/dynamic-attach-target.js"),
  entity_attach_target_js_1 = require("../fb-component/entity-attach-target.js");
var UnionAttachTarget;
function unionToUnionAttachTarget(t, a) {
  switch (UnionAttachTarget[t]) {
    case "NONE":
      return;
    case "ActorAttachTarget":
      return a(new actor_attach_target_js_1.ActorAttachTarget());
    case "DynamicAttachTarget":
      return a(new dynamic_attach_target_js_1.DynamicAttachTarget());
    case "EntityAttachTarget":
      return a(new entity_attach_target_js_1.EntityAttachTarget());
    default:
      return;
  }
}
function unionListToUnionAttachTarget(t, a, e) {
  switch (UnionAttachTarget[t]) {
    case "NONE":
      return;
    case "ActorAttachTarget":
      return a(e, new actor_attach_target_js_1.ActorAttachTarget());
    case "DynamicAttachTarget":
      return a(e, new dynamic_attach_target_js_1.DynamicAttachTarget());
    case "EntityAttachTarget":
      return a(e, new entity_attach_target_js_1.EntityAttachTarget());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.ActorAttachTarget = 1)] = "ActorAttachTarget"),
    (t[(t.DynamicAttachTarget = 2)] = "DynamicAttachTarget"),
    (t[(t.EntityAttachTarget = 3)] = "EntityAttachTarget");
})(
  (UnionAttachTarget =
    exports.UnionAttachTarget || (exports.UnionAttachTarget = {})),
),
  (exports.unionToUnionAttachTarget = unionToUnionAttachTarget),
  (exports.unionListToUnionAttachTarget = unionListToUnionAttachTarget);
//# sourceMappingURL=union-attach-target.js.map
