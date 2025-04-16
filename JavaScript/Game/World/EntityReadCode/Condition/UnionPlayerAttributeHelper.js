"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPlayerAttributeHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbHealthAttribute_1 = require("./FbHealthAttribute");
class UnionPlayerAttributeHelper {
  static GetUnionPlayerAttributeObject(t) {
    if (t === fb_condition_1.UnionPlayerAttribute.HealthAttribute)
      return new fb_condition_1.HealthAttribute();
  }
  static ReadUnionPlayerAttribute(t, e) {
    return void 0 !== e &&
      t === fb_condition_1.UnionPlayerAttribute.HealthAttribute
      ? FbHealthAttribute_1.FbHealthAttribute.Create(e)
      : void 0;
  }
}
exports.UnionPlayerAttributeHelper = UnionPlayerAttributeHelper;
//# sourceMappingURL=UnionPlayerAttributeHelper.js.map
