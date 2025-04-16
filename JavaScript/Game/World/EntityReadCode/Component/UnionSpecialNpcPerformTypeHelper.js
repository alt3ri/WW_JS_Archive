"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSpecialNpcPerformTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbBaseRoleNpcPerform_1 = require("./FbBaseRoleNpcPerform");
class UnionSpecialNpcPerformTypeHelper {
  static GetUnionSpecialNpcPerformTypeObject(e) {
    if (e === fb_component_1.UnionSpecialNpcPerformType.BaseRoleNpcPerform)
      return new fb_component_1.BaseRoleNpcPerform();
  }
  static ReadUnionSpecialNpcPerformType(e, o) {
    return void 0 !== o &&
      e === fb_component_1.UnionSpecialNpcPerformType.BaseRoleNpcPerform
      ? FbBaseRoleNpcPerform_1.FbBaseRoleNpcPerform.Create(o)
      : void 0;
  }
}
exports.UnionSpecialNpcPerformTypeHelper = UnionSpecialNpcPerformTypeHelper;
//# sourceMappingURL=UnionSpecialNpcPerformTypeHelper.js.map
