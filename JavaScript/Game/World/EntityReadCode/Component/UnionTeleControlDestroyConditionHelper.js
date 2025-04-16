"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTeleControlDestroyConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCreateBulletDestroyCondition_1 = require("./FbCreateBulletDestroyCondition"),
  FbLetGoDestroyCondition_1 = require("./FbLetGoDestroyCondition"),
  FbThrowDestroyCondition_1 = require("./FbThrowDestroyCondition");
class UnionTeleControlDestroyConditionHelper {
  static GetUnionTeleControlDestroyConditionObject(e) {
    switch (e) {
      case fb_component_1.UnionTeleControlDestroyCondition
        .CreateBulletDestroyCondition:
        return new fb_component_1.CreateBulletDestroyCondition();
      case fb_component_1.UnionTeleControlDestroyCondition
        .LetGoDestroyCondition:
        return new fb_component_1.LetGoDestroyCondition();
      case fb_component_1.UnionTeleControlDestroyCondition
        .ThrowDestroyCondition:
        return new fb_component_1.ThrowDestroyCondition();
      default:
        return;
    }
  }
  static ReadUnionTeleControlDestroyCondition(e, o) {
    if (void 0 !== o)
      switch (e) {
        case fb_component_1.UnionTeleControlDestroyCondition
          .CreateBulletDestroyCondition:
          return FbCreateBulletDestroyCondition_1.FbCreateBulletDestroyCondition.Create(
            o,
          );
        case fb_component_1.UnionTeleControlDestroyCondition
          .LetGoDestroyCondition:
          return FbLetGoDestroyCondition_1.FbLetGoDestroyCondition.Create(o);
        case fb_component_1.UnionTeleControlDestroyCondition
          .ThrowDestroyCondition:
          return FbThrowDestroyCondition_1.FbThrowDestroyCondition.Create(o);
        default:
          return;
      }
  }
}
exports.UnionTeleControlDestroyConditionHelper =
  UnionTeleControlDestroyConditionHelper;
//# sourceMappingURL=UnionTeleControlDestroyConditionHelper.js.map
