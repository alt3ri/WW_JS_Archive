"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionGroupAiOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbGroupAiPatrol_1 = require("./FbGroupAiPatrol");
class UnionGroupAiOptionHelper {
  static GetUnionGroupAiOptionObject(o) {
    if (o === fb_component_1.UnionGroupAiOption.GroupAiPatrol)
      return new fb_component_1.GroupAiPatrol();
  }
  static ReadUnionGroupAiOption(o, t) {
    return void 0 !== t && o === fb_component_1.UnionGroupAiOption.GroupAiPatrol
      ? FbGroupAiPatrol_1.FbGroupAiPatrol.Create(t)
      : void 0;
  }
}
exports.UnionGroupAiOptionHelper = UnionGroupAiOptionHelper;
//# sourceMappingURL=UnionGroupAiOptionHelper.js.map
