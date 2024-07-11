"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FullScreenEffectView = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  LguiResourceManager_1 = require("../../Ui/LguiResourceManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  DELAY_TIME = 100;
class FullScreenEffectView {
  constructor() {
    (this.RootItem = void 0),
      (this.RootActor = void 0),
      (this.Priority = 0),
      (this.Path = ""),
      (this.O9t = !0),
      (this.k9t = void 0),
      (this.F9t = new Set()),
      (this.hJ = 0),
      (this.V9t = () => {
        this.F9t.clear();
      });
  }
  async Init(e, i) {
    const t = new CustomPromise_1.CustomPromise();
    return (
      (this.hJ =
        LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
          this.Path,
          UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
          (e) => {
            this.H9t(e), t.SetResult(void 0);
          },
        )),
      (this.Priority = i),
      (this.Path = e),
      t.Promise
    );
  }
  SetEffectVisibility(e, i) {
    i &&
      (e
        ? (this.k9t = TimerSystem_1.TimerSystem.Delay(this.V9t, DELAY_TIME))
        : this.j9t()),
      this.O9t !== e && (this.RootItem.SetIsUIActive(e), (this.O9t = e));
  }
  H9t(e) {
    var i = e.GetComponentByClass(UE.UIItem.StaticClass());
    (this.RootActor = e), (this.RootItem = i);
  }
  Destroy() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.hJ),
      this.F9t.clear(),
      ActorSystem_1.ActorSystem.Put(this.RootActor);
  }
  j9t() {
    TimerSystem_1.TimerSystem.Has(this.k9t) &&
      TimerSystem_1.TimerSystem.Remove(this.k9t),
      this.F9t.clear(),
      (this.k9t = void 0);
  }
  DeActive() {
    var i = UE.LGUIBPLibrary.GetComponentsInChildren(
      this.RootActor,
      UE.UINiagara.StaticClass(),
      !1,
    );
    for (let e = 0; e < i.Num(); e++) {
      var t = i.Get(e);
      t && t.DeactivateSystem();
    }
  }
  IsEffectPlay() {
    var i = UE.LGUIBPLibrary.GetComponentsInChildren(
      this.RootActor,
      UE.UINiagara.StaticClass(),
      !1,
    );
    for (let e = 0; e < i.Num(); e++) if (i.Get(e)) return !0;
    return !1;
  }
}
(exports.FullScreenEffectView = FullScreenEffectView).Compare = (e, i) =>
  i.Priority - e.Priority;
//# sourceMappingURL=FullScreenEffectView.js.map
