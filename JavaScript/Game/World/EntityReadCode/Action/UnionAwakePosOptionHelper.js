"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAwakePosOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbAwakeWithTransformVar_1 = require("./FbAwakeWithTransformVar");
class UnionAwakePosOptionHelper {
  static GetUnionAwakePosOptionObject(e) {
    if (e === fb_action_1.UnionAwakePosOption.AwakeWithTransformVar)
      return new fb_action_1.AwakeWithTransformVar();
  }
  static ReadUnionAwakePosOption(e, o) {
    return void 0 !== o &&
      e === fb_action_1.UnionAwakePosOption.AwakeWithTransformVar
      ? FbAwakeWithTransformVar_1.FbAwakeWithTransformVar.Create(o)
      : void 0;
  }
}
exports.UnionAwakePosOptionHelper = UnionAwakePosOptionHelper;
//# sourceMappingURL=UnionAwakePosOptionHelper.js.map
