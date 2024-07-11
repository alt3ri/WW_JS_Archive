"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
class TsUiGlass extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments),
      (this.EventListenState = !1),
      (this.SetState = !1),
      (this.OnCloseViewCall = void 0);
  }
  OnEnableBP() {
    TsUiGlass.CurrentGlassItemSet ||
      (TsUiGlass.CurrentGlassItemSet = new Set()),
      this.SetUnderItemGlassState(!0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("UiCommon", 28, "创建 TsUiGlass"),
      this.RefreshGlassShowState(),
      (this.OnCloseViewCall = () => {
        this.RefreshGlassShowState();
      }),
      this.ListenEvent();
  }
  CheckItemRecursively(s, t) {
    const i = s.GetAttachUIChildren();
    for (let s = 0, e = i.Num(); s < e; ++s) {
      const a = i.Get(s);
      const l = a
        .GetOwner()
        .GetComponentByClass(UE.UIBaseRenderable.StaticClass());
      l && this.TrySetItemState(l, t), this.CheckItemRecursively(a, t);
    }
  }
  SetUnderItemGlassState(s) {
    let e;
    this.SetState !== s &&
      ((this.SetState = s),
      (e = this.GetOwner().GetComponentByClass(UE.UIItem.StaticClass())),
      this.CheckItemRecursively(e, s));
  }
  TrySetItemState(s, e) {
    e
      ? (TsUiGlass.CurrentGlassItemSet.has(s) ||
          TsUiGlass.CurrentGlassItemSet.add(s),
        s.SetUIRenderAfterBlurPartial(!0),
        s.SetUIRenderAfterBlur(!0))
      : (TsUiGlass.CurrentGlassItemSet.delete(s),
        s.SetUIRenderAfterBlurPartial(!1),
        s.SetUIRenderAfterBlur(!1));
  }
  ListenEvent() {
    this.EventListenState ||
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.OnCloseViewCall,
      ),
      (this.EventListenState = !0));
  }
  RemoveEvent() {
    this.EventListenState &&
      (EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.OnCloseViewCall,
      ),
      (this.EventListenState = !1));
  }
  RefreshGlassShowState() {
    !(
      UE.LGUIManagerActor.GetGlobalUiBlurIndex(GlobalData_1.GlobalData.World) >
      0
    ) && TsUiGlass.CurrentGlassItemSet.size > 0
      ? this.OpenPartialBlur()
      : this.ClosePartialBlur();
  }
  OpenPartialBlur() {
    TsUiGlass.GlassShowState ||
      ((TsUiGlass.GlassShowState = !0),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.kuro.LGUIBlurTexture.save 1",
      ));
  }
  ClosePartialBlur() {
    TsUiGlass.GlassShowState &&
      ((TsUiGlass.GlassShowState = !1),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.kuro.LGUIBlurTexture.save 0",
      ));
  }
  OnDisableBP() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("UiCommon", 28, "销毁TsUiGlass"),
      this.SetUnderItemGlassState(!1),
      this.RefreshGlassShowState(),
      this.RemoveEvent();
  }
  OnDestroyBP() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("UiCommon", 28, "销毁TsUiGlass"),
      this.SetUnderItemGlassState(!1),
      this.RefreshGlassShowState(),
      this.RemoveEvent(),
      TsUiGlass.CurrentGlassItemSet.size === 0 &&
        UE.LGUIBPLibrary.FreeUnusedResourcesInRenderTargetPool();
  }
}
(TsUiGlass.GlassShowState = !1), (exports.default = TsUiGlass);
// # sourceMappingURL=TsUiGlass.js.map
