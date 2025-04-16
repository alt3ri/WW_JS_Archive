"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCheckTargetTypeConfigHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbAllPlayerType_1 = require("./FbAllPlayerType");
class UnionCheckTargetTypeConfigHelper {
  static GetUnionCheckTargetTypeConfigObject(e) {
    if (e === fb_condition_1.UnionCheckTargetTypeConfig.AllPlayerType)
      return new fb_condition_1.AllPlayerType();
  }
  static ReadUnionCheckTargetTypeConfig(e, i) {
    return void 0 !== i &&
      e === fb_condition_1.UnionCheckTargetTypeConfig.AllPlayerType
      ? FbAllPlayerType_1.FbAllPlayerType.Create(i)
      : void 0;
  }
}
exports.UnionCheckTargetTypeConfigHelper = UnionCheckTargetTypeConfigHelper;
//# sourceMappingURL=UnionCheckTargetTypeConfigHelper.js.map
