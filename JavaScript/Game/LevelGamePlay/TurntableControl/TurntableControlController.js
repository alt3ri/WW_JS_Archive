"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TurntableControlController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class TurntableControlController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
      this.wwn,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
      this.wwn,
    );
  }
  static Clear() {
    return this.Owe(), super.Clear();
  }
  static kwe() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    e?.CurControllerEntity &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e.CurControllerEntity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.Fwe,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e.CurControllerEntity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.Fwe,
      );
  }
  static Owe() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    e?.CurControllerEntity &&
      EventSystem_1.EventSystem.HasWithTarget(
        e.CurControllerEntity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.Fwe,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e.CurControllerEntity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.Fwe,
      );
  }
  static async OpenTurntableControlView(e) {
    let t;
    return !(
      !UiManager_1.UiManager.IsViewShow("TurntableControlView") &&
      ((t = ModelManager_1.ModelManager.TurntableControlModel)
        .CurControllerEntity && this.Owe(),
      t.SetCurControllerEntity(e),
      !t?.CurControllerEntityComp ||
        !t.CurControllerEntity ||
        (t.CurControllerEntityComp.IsAllRingsAtTarget() ||
          t.CurControllerEntityComp.SetAllowRotate(!0),
        this.kwe(),
        void 0 ===
          (await UiManager_1.UiManager.OpenViewAsync("TurntableControlView"))))
    );
  }
  static HandleTurntableControlViewClose() {
    this.Owe();
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    const t = e.CurControllerEntityComp;
    t &&
      (t.TriggerStopAllRingsRotate(),
      t.DeselectAllRings(!0),
      t.SetAllowRotate(!1)),
      e.ClearCurControllerEntity();
  }
  static GetControllerEntity() {
    return ModelManager_1.ModelManager.TurntableControlModel
      .CurControllerEntity;
  }
  static StartRotateSelected() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    e?.CurControllerEntityComp &&
      e.CurControllerEntityComp.TriggerStartSelectedRingsRotate();
  }
  static StopAllRotate() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    e?.CurControllerEntityComp &&
      e.CurControllerEntityComp.GetControlType() ===
        IComponent_1.EControllerType.FreeAngle &&
      e.CurControllerEntityComp.TriggerStopAllRingsRotate();
  }
  static IsAllRingsAtTarget() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    return (
      !!e?.CurControllerEntityComp &&
      e.CurControllerEntityComp.IsAllRingsAtTarget()
    );
  }
  static IsBusyRotating() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    return (
      !!e?.CurControllerEntityComp && e.CurControllerEntityComp.IsBusyRotating()
    );
  }
  static SwitchSelectedRing() {
    const t = ModelManager_1.ModelManager.TurntableControlModel;
    if (t?.CurControllerEntityComp) {
      let n;
      const r = t.CurControllerEntityComp.GetRingsNum();
      for (let e = 0; e < r; e++)
        if (t.CurControllerEntityComp.IsRingSelectedByIndex(e))
          return (
            (n = e + 1 >= r ? 0 : e + 1), void this.SelectRingByIndex(n, !0)
          );
      this.SelectRingByIndex(0, !0);
    }
  }
  static SelectRingByIndex(e, t) {
    const n = ModelManager_1.ModelManager.TurntableControlModel;
    n?.CurControllerEntityComp &&
      (t
        ? (n.CurControllerEntityComp.DeselectAllRings(!1),
          n.CurControllerEntityComp.SelectRingByIndex(e, !1),
          n.CurControllerEntityComp.UpdateAllRingsSelectedEffect())
        : n.CurControllerEntityComp.SelectRingByIndex(e, !0));
  }
  static DeselectRingByIndex(e) {
    const t = ModelManager_1.ModelManager.TurntableControlModel;
    t?.CurControllerEntityComp &&
      t.CurControllerEntityComp.DeselectRingByIndex(e, !0);
  }
  static ResetRingsAngle() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    e?.CurControllerEntityComp &&
      e.CurControllerEntityComp.TriggerResetAllRingsToInitAngle();
  }
  static GetControlType() {
    const e = ModelManager_1.ModelManager.TurntableControlModel;
    if (e?.CurControllerEntityComp)
      return e.CurControllerEntityComp.GetControlType();
  }
}
(exports.TurntableControlController = TurntableControlController),
  ((_a = TurntableControlController).wwn = () => {
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "SceneItem",
        40,
        "[TurntableControlView] 激活UI相机Seq失败，关闭UI",
      ),
      UiManager_1.UiManager.IsViewOpen("TurntableControlView") &&
        UiManager_1.UiManager.CloseView("TurntableControlView");
  }),
  (TurntableControlController.Fwe = (e, t) => {
    e === 1298716444 &&
      t &&
      (_a.HandleTurntableControlViewClose(),
      UiManager_1.UiManager.CloseView("TurntableControlView"));
  });
// # sourceMappingURL=TurntableControlController.js.map
