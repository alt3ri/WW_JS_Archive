"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionGravityDirection =
    exports.unionToUnionGravityDirection =
    exports.UnionGravityDirection =
      void 0);
const gravity_direction_by_entity_gravity_js_1 = require("../fb-common/gravity-direction-by-entity-gravity.js"),
  gravity_direction_self_rotation_js_1 = require("../fb-common/gravity-direction-self-rotation.js"),
  gravity_direction_vector_info_js_1 = require("../fb-common/gravity-direction-vector-info.js"),
  gravity_direction_world_axis_js_1 = require("../fb-common/gravity-direction-world-axis.js");
var UnionGravityDirection;
function unionToUnionGravityDirection(i, t) {
  switch (UnionGravityDirection[i]) {
    case "NONE":
      return;
    case "GravityDirectionByEntityGravity":
      return t(
        new gravity_direction_by_entity_gravity_js_1.GravityDirectionByEntityGravity(),
      );
    case "GravityDirectionSelfRotation":
      return t(
        new gravity_direction_self_rotation_js_1.GravityDirectionSelfRotation(),
      );
    case "GravityDirectionVectorInfo":
      return t(
        new gravity_direction_vector_info_js_1.GravityDirectionVectorInfo(),
      );
    case "GravityDirectionWorldAxis":
      return t(
        new gravity_direction_world_axis_js_1.GravityDirectionWorldAxis(),
      );
    default:
      return;
  }
}
function unionListToUnionGravityDirection(i, t, r) {
  switch (UnionGravityDirection[i]) {
    case "NONE":
      return;
    case "GravityDirectionByEntityGravity":
      return t(
        r,
        new gravity_direction_by_entity_gravity_js_1.GravityDirectionByEntityGravity(),
      );
    case "GravityDirectionSelfRotation":
      return t(
        r,
        new gravity_direction_self_rotation_js_1.GravityDirectionSelfRotation(),
      );
    case "GravityDirectionVectorInfo":
      return t(
        r,
        new gravity_direction_vector_info_js_1.GravityDirectionVectorInfo(),
      );
    case "GravityDirectionWorldAxis":
      return t(
        r,
        new gravity_direction_world_axis_js_1.GravityDirectionWorldAxis(),
      );
    default:
      return;
  }
}
!(function (i) {
  (i[(i.NONE = 0)] = "NONE"),
    (i[(i.GravityDirectionByEntityGravity = 1)] =
      "GravityDirectionByEntityGravity"),
    (i[(i.GravityDirectionSelfRotation = 2)] = "GravityDirectionSelfRotation"),
    (i[(i.GravityDirectionVectorInfo = 3)] = "GravityDirectionVectorInfo"),
    (i[(i.GravityDirectionWorldAxis = 4)] = "GravityDirectionWorldAxis");
})(
  (UnionGravityDirection =
    exports.UnionGravityDirection || (exports.UnionGravityDirection = {})),
),
  (exports.unionToUnionGravityDirection = unionToUnionGravityDirection),
  (exports.unionListToUnionGravityDirection = unionListToUnionGravityDirection);
//# sourceMappingURL=union-gravity-direction.js.map
