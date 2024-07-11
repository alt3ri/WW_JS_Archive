"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationGlobalData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class UiNavigationGlobalData {
  static AddBlockListenerFocusTag(a) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiNavigation", 11, "添加禁止切换导航对象标签", [
        "标签",
        a,
      ]),
      this.IBo.add(a);
  }
  static DeleteBlockListenerFocusTag(a) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiNavigation", 11, "移除禁止切换导航对象标签", [
        "标签",
        a,
      ]),
      this.IBo.delete(a);
  }
  static get IsBlockNavigation() {
    return (
      0 < this.IBo.size ||
      ControllerHolder_1.ControllerHolder.BlackScreenController.IsBlackScreenActive()
    );
  }
  static ClearBlockListener() {
    this.IBo.clear();
  }
}
((exports.UiNavigationGlobalData =
  UiNavigationGlobalData).NeedCalculateCurrentPanel = !1),
  (UiNavigationGlobalData.NeedRefreshCurrentPanel = !1),
  (UiNavigationGlobalData.IsAllowCrossNavigationGroup = !1),
  (UiNavigationGlobalData.VisionReplaceViewFindDefault = !0),
  (UiNavigationGlobalData.IBo = new Set());
//# sourceMappingURL=UiNavigationGlobalData.js.map
