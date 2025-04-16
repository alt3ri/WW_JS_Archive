"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionVarConfigHelper = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  FbPosAndRot_1 = require("./FbPosAndRot");
class UnionVarConfigHelper {
  static GetUnionVarConfigObject(r) {
    switch (r) {
      case fb_var_1.UnionVarConfig.BooleanValue:
        return new fb_var_1.BooleanValue();
      case fb_var_1.UnionVarConfig.IntValue:
        return new fb_var_1.IntValue();
      case fb_var_1.UnionVarConfig.StringValue:
        return new fb_var_1.StringValue();
      case fb_var_1.UnionVarConfig.FloatValue:
        return new fb_var_1.FloatValue();
      case fb_var_1.UnionVarConfig.EntityValue:
        return new fb_var_1.EntityValue();
      case fb_var_1.UnionVarConfig.QuestValue:
        return new fb_var_1.QuestValue();
      case fb_var_1.UnionVarConfig.QuestStateValue:
        return new fb_var_1.QuestStateValue();
      case fb_var_1.UnionVarConfig.TransformValue:
        return new fb_var_1.TransformValue();
      case fb_var_1.UnionVarConfig.PrefabValue:
        return new fb_var_1.PrefabValue();
      default:
        return;
    }
  }
  static ReadUnionVarConfig(r, e) {
    if (void 0 !== e)
      switch (r) {
        case fb_var_1.UnionVarConfig.BooleanValue:
        case fb_var_1.UnionVarConfig.IntValue:
        case fb_var_1.UnionVarConfig.StringValue:
        case fb_var_1.UnionVarConfig.FloatValue:
        case fb_var_1.UnionVarConfig.EntityValue:
        case fb_var_1.UnionVarConfig.QuestValue:
        case fb_var_1.UnionVarConfig.QuestStateValue:
          return e?.v();
        case fb_var_1.UnionVarConfig.TransformValue:
          return FbPosAndRot_1.FbPosAndRot.Create(e?.v());
        case fb_var_1.UnionVarConfig.PrefabValue:
          return e?.v();
        default:
          return;
      }
  }
}
exports.UnionVarConfigHelper = UnionVarConfigHelper;
//# sourceMappingURL=UnionVarConfigHelper.js.map
