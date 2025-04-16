"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTargetEntityHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbPlayerEntity_1 = require("./FbPlayerEntity"),
  FbSelfEntity_1 = require("./FbSelfEntity"),
  FbTargetEntity_1 = require("./FbTargetEntity"),
  FbTriggeredEntity_1 = require("./FbTriggeredEntity");
class UnionTargetEntityHelper {
  static GetUnionTargetEntityObject(t) {
    switch (t) {
      case fb_condition_1.UnionTargetEntity.PlayerEntity:
        return new fb_condition_1.PlayerEntity();
      case fb_condition_1.UnionTargetEntity.SelfEntity:
        return new fb_condition_1.SelfEntity();
      case fb_condition_1.UnionTargetEntity.TargetEntity:
        return new fb_condition_1.TargetEntity();
      case fb_condition_1.UnionTargetEntity.TriggeredEntity:
        return new fb_condition_1.TriggeredEntity();
      default:
        return;
    }
  }
  static ReadUnionTargetEntity(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_condition_1.UnionTargetEntity.PlayerEntity:
          return FbPlayerEntity_1.FbPlayerEntity.Create(e);
        case fb_condition_1.UnionTargetEntity.SelfEntity:
          return FbSelfEntity_1.FbSelfEntity.Create(e);
        case fb_condition_1.UnionTargetEntity.TargetEntity:
          return FbTargetEntity_1.FbTargetEntity.Create(e);
        case fb_condition_1.UnionTargetEntity.TriggeredEntity:
          return FbTriggeredEntity_1.FbTriggeredEntity.Create(e);
        default:
          return;
      }
  }
}
exports.UnionTargetEntityHelper = UnionTargetEntityHelper;
//# sourceMappingURL=UnionTargetEntityHelper.js.map
