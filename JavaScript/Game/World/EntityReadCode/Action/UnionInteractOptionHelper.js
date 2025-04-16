"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionInteractOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbInteractActions_1 = require("./FbInteractActions"),
  FbInteractFlow_1 = require("./FbInteractFlow");
class UnionInteractOptionHelper {
  static GetUnionInteractOptionObject(t) {
    switch (t) {
      case fb_action_1.UnionInteractOption.InteractActions:
        return new fb_action_1.InteractActions();
      case fb_action_1.UnionInteractOption.InteractFlow:
        return new fb_action_1.InteractFlow();
      default:
        return;
    }
  }
  static ReadUnionInteractOption(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_action_1.UnionInteractOption.InteractActions:
          return FbInteractActions_1.FbInteractActions.Create(e);
        case fb_action_1.UnionInteractOption.InteractFlow:
          return FbInteractFlow_1.FbInteractFlow.Create(e);
        default:
          return;
      }
  }
}
exports.UnionInteractOptionHelper = UnionInteractOptionHelper;
//# sourceMappingURL=UnionInteractOptionHelper.js.map
