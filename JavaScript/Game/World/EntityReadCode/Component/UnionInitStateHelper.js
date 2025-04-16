"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionInitStateHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbInitStateBarrierLock_1 = require("./FbInitStateBarrierLock"),
  FbInitStateBirth_1 = require("./FbInitStateBirth"),
  FbInitStateDigital_1 = require("./FbInitStateDigital"),
  FbInitStateStandby_1 = require("./FbInitStateStandby"),
  FbInitStateWuYinQu_1 = require("./FbInitStateWuYinQu");
class UnionInitStateHelper {
  static GetUnionInitStateObject(t) {
    switch (t) {
      case fb_component_1.UnionInitState.InitStateBarrierLock:
        return new fb_component_1.InitStateBarrierLock();
      case fb_component_1.UnionInitState.InitStateBirth:
        return new fb_component_1.InitStateBirth();
      case fb_component_1.UnionInitState.InitStateDigital:
        return new fb_component_1.InitStateDigital();
      case fb_component_1.UnionInitState.InitStateStandby:
        return new fb_component_1.InitStateStandby();
      case fb_component_1.UnionInitState.InitStateWuYinQu:
        return new fb_component_1.InitStateWuYinQu();
      default:
        return;
    }
  }
  static ReadUnionInitState(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_component_1.UnionInitState.InitStateBarrierLock:
          return FbInitStateBarrierLock_1.FbInitStateBarrierLock.Create(e);
        case fb_component_1.UnionInitState.InitStateBirth:
          return FbInitStateBirth_1.FbInitStateBirth.Create(e);
        case fb_component_1.UnionInitState.InitStateDigital:
          return FbInitStateDigital_1.FbInitStateDigital.Create(e);
        case fb_component_1.UnionInitState.InitStateStandby:
          return FbInitStateStandby_1.FbInitStateStandby.Create(e);
        case fb_component_1.UnionInitState.InitStateWuYinQu:
          return FbInitStateWuYinQu_1.FbInitStateWuYinQu.Create(e);
        default:
          return;
      }
  }
}
exports.UnionInitStateHelper = UnionInitStateHelper;
//# sourceMappingURL=UnionInitStateHelper.js.map
