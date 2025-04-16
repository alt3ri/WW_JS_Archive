"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTriggerShapeHelper = void 0);
const fb_shape_1 = require("../../../../Game/World/EntityFb/fb-shape"),
  FbActorCollisionTriggerShape_1 = require("./FbActorCollisionTriggerShape"),
  FbActorRefVolume_1 = require("./FbActorRefVolume"),
  FbBoxTriggerShape_1 = require("./FbBoxTriggerShape"),
  FbCombinationTriggerShape_1 = require("./FbCombinationTriggerShape"),
  FbConeTriggerShape_1 = require("./FbConeTriggerShape"),
  FbCylinderTriggerShape_1 = require("./FbCylinderTriggerShape"),
  FbHollowCylinderTriggerShape_1 = require("./FbHollowCylinderTriggerShape"),
  FbHollowSphereTriggerShape_1 = require("./FbHollowSphereTriggerShape"),
  FbSphereTriggerShape_1 = require("./FbSphereTriggerShape"),
  FbVolumeTriggerShape_1 = require("./FbVolumeTriggerShape");
class UnionTriggerShapeHelper {
  static GetUnionTriggerShapeObject(e) {
    switch (e) {
      case fb_shape_1.UnionTriggerShape.ActorCollisionTriggerShape:
        return new fb_shape_1.ActorCollisionTriggerShape();
      case fb_shape_1.UnionTriggerShape.ActorRefVolume:
        return new fb_shape_1.ActorRefVolume();
      case fb_shape_1.UnionTriggerShape.BoxTriggerShape:
        return new fb_shape_1.BoxTriggerShape();
      case fb_shape_1.UnionTriggerShape.CombinationTriggerShape:
        return new fb_shape_1.CombinationTriggerShape();
      case fb_shape_1.UnionTriggerShape.ConeTriggerShape:
        return new fb_shape_1.ConeTriggerShape();
      case fb_shape_1.UnionTriggerShape.CylinderTriggerShape:
        return new fb_shape_1.CylinderTriggerShape();
      case fb_shape_1.UnionTriggerShape.HollowCylinderTriggerShape:
        return new fb_shape_1.HollowCylinderTriggerShape();
      case fb_shape_1.UnionTriggerShape.HollowSphereTriggerShape:
        return new fb_shape_1.HollowSphereTriggerShape();
      case fb_shape_1.UnionTriggerShape.SphereTriggerShape:
        return new fb_shape_1.SphereTriggerShape();
      case fb_shape_1.UnionTriggerShape.VolumeTriggerShape:
        return new fb_shape_1.VolumeTriggerShape();
      default:
        return;
    }
  }
  static ReadUnionTriggerShape(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_shape_1.UnionTriggerShape.ActorCollisionTriggerShape:
          return FbActorCollisionTriggerShape_1.FbActorCollisionTriggerShape.Create(
            r,
          );
        case fb_shape_1.UnionTriggerShape.ActorRefVolume:
          return FbActorRefVolume_1.FbActorRefVolume.Create(r);
        case fb_shape_1.UnionTriggerShape.BoxTriggerShape:
          return FbBoxTriggerShape_1.FbBoxTriggerShape.Create(r);
        case fb_shape_1.UnionTriggerShape.CombinationTriggerShape:
          return FbCombinationTriggerShape_1.FbCombinationTriggerShape.Create(
            r,
          );
        case fb_shape_1.UnionTriggerShape.ConeTriggerShape:
          return FbConeTriggerShape_1.FbConeTriggerShape.Create(r);
        case fb_shape_1.UnionTriggerShape.CylinderTriggerShape:
          return FbCylinderTriggerShape_1.FbCylinderTriggerShape.Create(r);
        case fb_shape_1.UnionTriggerShape.HollowCylinderTriggerShape:
          return FbHollowCylinderTriggerShape_1.FbHollowCylinderTriggerShape.Create(
            r,
          );
        case fb_shape_1.UnionTriggerShape.HollowSphereTriggerShape:
          return FbHollowSphereTriggerShape_1.FbHollowSphereTriggerShape.Create(
            r,
          );
        case fb_shape_1.UnionTriggerShape.SphereTriggerShape:
          return FbSphereTriggerShape_1.FbSphereTriggerShape.Create(r);
        case fb_shape_1.UnionTriggerShape.VolumeTriggerShape:
          return FbVolumeTriggerShape_1.FbVolumeTriggerShape.Create(r);
        default:
          return;
      }
  }
}
exports.UnionTriggerShapeHelper = UnionTriggerShapeHelper;
//# sourceMappingURL=UnionTriggerShapeHelper.js.map
