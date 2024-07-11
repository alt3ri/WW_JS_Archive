"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  BlackScreenGlobalData_1 = require("./BlackScreenGlobalData"),
  BlackScreenTransitionView_1 = require("./BlackScreenTransitionView");
class BlackScreenController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      this.i0t,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UiManagerInit,
      this.i0t,
    );
  }
  static AddBlackScreen(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("BlackScreen", 11, "触发开始黑屏", ["标签", t]),
      0 === this.o0t.size && this.r0t.ShowTemp(e);
    e = this.o0t.get(t);
    e ? this.o0t.set(t, ++e) : this.o0t.set(t, 1);
  }
  static async AddBlackScreenAsync(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("BlackScreen", 11, "触发开始黑屏async", ["标签", t]),
      0 === this.o0t.size && this.r0t.ShowTemp(e);
    e = this.o0t.get(t);
    e ? this.o0t.set(t, ++e) : this.o0t.set(t, 1),
      await BlackScreenGlobalData_1.BlackScreenGlobalData.ShowPromise.Promise;
  }
  static RemoveBlackScreen(e, t) {
    var r;
    this.r0t &&
      (r = this.o0t.get(t)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 11, "触发结束黑屏", ["标签", t]),
      1 === r ? this.o0t.delete(t) : this.o0t.set(t, --r),
      0 === this.o0t.size) &&
      this.r0t.HideTemp(e);
  }
  static IsBlackScreenActive() {
    return this.r0t?.IsUiActiveInHierarchy() ?? !1;
  }
  static OnClear() {
    return this.r0t && (this.r0t.Destroy(), (this.r0t = void 0)), !0;
  }
}
(exports.BlackScreenController = BlackScreenController),
  ((_a = BlackScreenController).r0t = void 0),
  (BlackScreenController.o0t = new Map()),
  (BlackScreenController.i0t = () => {
    _a.r0t ||
      ((_a.r0t = new BlackScreenTransitionView_1.BlackScreenTransitionView()),
      _a.r0t.CreateByResourceIdAsync(
        "UiView_BlackScreen_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.CG),
        !0,
      ));
  });
//# sourceMappingURL=BlackScreenController.js.map
