"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEffectPos2Helper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbAbsolutePos2_1 = require("./FbAbsolutePos2"),
  FbEffectEntityPos2_1 = require("./FbEffectEntityPos2"),
  FbEffectPlayerPos2_1 = require("./FbEffectPlayerPos2");
class UnionEffectPos2Helper {
  static GetUnionEffectPos2Object(e) {
    switch (e) {
      case fb_action_1.UnionEffectPos2.AbsolutePos2:
        return new fb_action_1.AbsolutePos2();
      case fb_action_1.UnionEffectPos2.EffectEntityPos2:
        return new fb_action_1.EffectEntityPos2();
      case fb_action_1.UnionEffectPos2.EffectPlayerPos2:
        return new fb_action_1.EffectPlayerPos2();
      default:
        return;
    }
  }
  static ReadUnionEffectPos2(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionEffectPos2.AbsolutePos2:
          return FbAbsolutePos2_1.FbAbsolutePos2.Create(t);
        case fb_action_1.UnionEffectPos2.EffectEntityPos2:
          return FbEffectEntityPos2_1.FbEffectEntityPos2.Create(t);
        case fb_action_1.UnionEffectPos2.EffectPlayerPos2:
          return FbEffectPlayerPos2_1.FbEffectPlayerPos2.Create(t);
        default:
          return;
      }
  }
}
exports.UnionEffectPos2Helper = UnionEffectPos2Helper;
//# sourceMappingURL=UnionEffectPos2Helper.js.map
