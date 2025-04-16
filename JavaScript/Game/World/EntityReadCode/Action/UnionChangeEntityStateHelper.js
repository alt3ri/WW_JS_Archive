"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionChangeEntityStateHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbChangeEntityStateBatchDirectly_1 = require("./FbChangeEntityStateBatchDirectly"),
  FbChangeEntityStateDirectly_1 = require("./FbChangeEntityStateDirectly"),
  FbChangeEntityStateLoop_1 = require("./FbChangeEntityStateLoop");
class UnionChangeEntityStateHelper {
  static GetUnionChangeEntityStateObject(t) {
    switch (t) {
      case fb_action_1.UnionChangeEntityState.ChangeEntityStateBatchDirectly:
        return new fb_action_1.ChangeEntityStateBatchDirectly();
      case fb_action_1.UnionChangeEntityState.ChangeEntityStateDirectly:
        return new fb_action_1.ChangeEntityStateDirectly();
      case fb_action_1.UnionChangeEntityState.ChangeEntityStateLoop:
        return new fb_action_1.ChangeEntityStateLoop();
      default:
        return;
    }
  }
  static ReadUnionChangeEntityState(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_action_1.UnionChangeEntityState.ChangeEntityStateBatchDirectly:
          return FbChangeEntityStateBatchDirectly_1.FbChangeEntityStateBatchDirectly.Create(
            e,
          );
        case fb_action_1.UnionChangeEntityState.ChangeEntityStateDirectly:
          return FbChangeEntityStateDirectly_1.FbChangeEntityStateDirectly.Create(
            e,
          );
        case fb_action_1.UnionChangeEntityState.ChangeEntityStateLoop:
          return FbChangeEntityStateLoop_1.FbChangeEntityStateLoop.Create(e);
        default:
          return;
      }
  }
}
exports.UnionChangeEntityStateHelper = UnionChangeEntityStateHelper;
//# sourceMappingURL=UnionChangeEntityStateHelper.js.map
