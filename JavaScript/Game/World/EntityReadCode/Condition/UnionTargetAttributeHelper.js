"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTargetAttributeHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbPlayerAttribute_1 = require("./FbPlayerAttribute");
class UnionTargetAttributeHelper {
  static GetUnionTargetAttributeObject(t) {
    if (t === fb_condition_1.UnionTargetAttribute.PlayerAttribute)
      return new fb_condition_1.PlayerAttribute();
  }
  static ReadUnionTargetAttribute(t, e) {
    return void 0 !== e &&
      t === fb_condition_1.UnionTargetAttribute.PlayerAttribute
      ? FbPlayerAttribute_1.FbPlayerAttribute.Create(e)
      : void 0;
  }
}
exports.UnionTargetAttributeHelper = UnionTargetAttributeHelper;
//# sourceMappingURL=UnionTargetAttributeHelper.js.map
