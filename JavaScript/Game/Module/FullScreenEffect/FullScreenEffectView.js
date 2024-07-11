"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FullScreenEffectView = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const LguiResourceManager_1 = require("../../Ui/LguiResourceManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const DELAY_TIME = 100;
class FullScreenEffectView {
  constructor() {
    (this.RootItem = void 0),
      (this.RootActor = void 0),
      (this.Priority = 0),
      (this.Path = ""),
      (this.O8t = !0),
      (this.k8t = void 0),
      (this.F8t = new Set()),
      (this.hJ = 0),
      (this.V8t = () => {
        this.F8t.clear();
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
            this.H8t(e), t.SetResult(void 0);
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
        ? (this.k8t = TimerSystem_1.TimerSystem.Delay(this.V8t, DELAY_TIME))
        : this.j8t()),
      this.O8t !== e && (this.RootItem.SetIsUIActive(e), (this.O8t = e));
  }
  H8t(e) {
    const i = e.GetComponentByClass(UE.UIItem.StaticClass());
    (this.RootActor = e), (this.RootItem = i);
  }
  Destroy() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.hJ),
      this.F8t.clear(),
      ActorSystem_1.ActorSystem.Put(this.RootActor);
  }
  j8t() {
    TimerSystem_1.TimerSystem.Has(this.k8t) &&
      TimerSystem_1.TimerSystem.Remove(this.k8t),
      this.F8t.clear(),
      (this.k8t = void 0);
  }
  DeActive() {
    const i = UE.LGUIBPLibrary.GetComponentsInChildren(
      this.RootActor,
      UE.UINiagara.StaticClass(),
      !1,
    );
    for (let e = 0; e < i.Num(); e++) {
      const t = i.Get(e);
      t && t.DeactivateSystem();
    }
  }
  IsEffectPlay() {
    const i = UE.LGUIBPLibrary.GetComponentsInChildren(
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
// # sourceMappingURL=FullScreenEffectView.js.map
