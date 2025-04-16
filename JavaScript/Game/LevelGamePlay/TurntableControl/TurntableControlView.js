"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TurntableControlView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  UiComponentUtil_1 = require("../../Module/Util/UiComponentUtil"),
  UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class TurntableControlView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Fxe = void 0),
      (this.Vxe = void 0),
      (this.Hxe = void 0),
      (this.jxe = void 0),
      (this.Sqn = !1),
      (this.jwe = (e) => {
        "OnOpenTurntableControlViewBlackScreen" === e &&
          ((this.Sqn = !0),
          ControllerHolder_1.ControllerHolder.TurntableControlController.SelectRingByIndex(
            0,
            !0,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              39,
              "[TurntableControlView] Seq触发黑幕进入事件，显示UI",
            ),
          this.GetRootItem().SetUIActive(!0));
      }),
      (this.Wwe = (e, t) => {
        t
          ? (this.Fxe.SetSelfInteractive(!1),
            this.Vxe.SetSelfInteractive(!1),
            this.Hxe.SetSelfInteractive(!1),
            this.jxe.SetSelfInteractive(!1))
          : e
            ? (this.Fxe.SetSelfInteractive(!1),
              this.Vxe.SetSelfInteractive(!0),
              ControllerHolder_1.ControllerHolder.TurntableControlController.GetControlType() ===
              IComponent_1.EControllerType.FixedAngle
                ? this.Hxe.SetSelfInteractive(!1)
                : this.Hxe.SetSelfInteractive(!0),
              this.jxe.SetSelfInteractive(!1))
            : (this.Fxe.SetSelfInteractive(!0),
              this.Vxe.SetSelfInteractive(!0),
              this.Hxe.SetSelfInteractive(!0),
              this.jxe.SetSelfInteractive(!0));
      }),
      (this.DPe = () => {
        this.Wwe(!1, !0), this.Wxe();
      }),
      (this.Kxe = () => {
        ControllerHolder_1.ControllerHolder.TurntableControlController.SwitchSelectedRing();
      }),
      (this.Qxe = () => {
        ControllerHolder_1.ControllerHolder.TurntableControlController.StartRotateSelected();
      }),
      (this.Kwe = () => {
        ControllerHolder_1.ControllerHolder.TurntableControlController.StartRotateSelected();
      }),
      (this.Qwe = () => {
        ControllerHolder_1.ControllerHolder.TurntableControlController.StopAllRotate();
      }),
      (this.LPe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.DPe],
        [1, this.Kxe],
        [3, this.LPe],
      ]),
      ControllerHolder_1.ControllerHolder.TurntableControlController.GetControlType() ===
        IComponent_1.EControllerType.FixedAngle &&
        this.BtnBindInfo.push([2, this.Qxe]);
  }
  OnStart() {
    (this.Fxe = this.GetButton(0)),
      (this.Vxe = this.GetButton(1)),
      (this.Hxe = this.GetButton(2)),
      (this.jxe = this.GetButton(3)),
      ControllerHolder_1.ControllerHolder.TurntableControlController.GetControlType() ===
        IComponent_1.EControllerType.FreeAngle &&
        (this.Hxe.OnPointDownCallBack.Bind(this.Kwe),
        this.Hxe.OnPointUpCallBack.Bind(this.Qwe),
        UiComponentUtil_1.UiComponentUtil.BindAudioEvent(this.Hxe));
  }
  OnBeforeShow() {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag(
      "TurntableControl",
    );
  }
  OnAfterHide() {
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag(
      "TurntableControl",
    );
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TurntableControlController.HandleTurntableControlViewClose(),
      this.Hxe.OnPointDownCallBack.IsBound() &&
        this.Hxe.OnPointDownCallBack.Unbind(),
      this.Hxe.OnPointUpCallBack.IsBound() &&
        this.Hxe.OnPointUpCallBack.Unbind(),
      UiComponentUtil_1.UiComponentUtil.UnBindAudioEvent(this.Hxe),
      (this.Fxe = void 0),
      (this.Vxe = void 0),
      (this.Hxe = void 0),
      (this.jxe = void 0);
  }
  OnAfterShow() {
    ControllerHolder_1.ControllerHolder.TurntableControlController.IsAllRingsAtTarget() &&
      (this.Fxe.SetSelfInteractive(!1),
      this.Vxe.SetSelfInteractive(!1),
      this.Hxe.SetSelfInteractive(!1)),
      this.Sqn ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            39,
            "[TurntableControlView] Seq事件未触发过，初始隐藏UI",
          ),
        this.GetRootItem().SetUIActive(!1));
  }
  OnAddEventListener() {
    var e =
      ControllerHolder_1.ControllerHolder.TurntableControlController.GetControllerEntity();
    e &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
        this.Wwe,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
        this.Wwe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        this.jwe,
      );
  }
  OnRemoveEventListener() {
    var e =
      ControllerHolder_1.ControllerHolder.TurntableControlController.GetControllerEntity();
    e &&
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
        this.Wwe,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
        EventDefine_1.EEventName.OnTurntableControllerBusyStateChange,
        this.Wwe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        this.jwe,
      );
  }
  async Wxe() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "SceneItem",
        39,
        "[TurntableControlView] 重置开始，隐藏UI",
      ),
      await this.HideAsync(),
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(
        4,
        3,
      ),
      ControllerHolder_1.ControllerHolder.TurntableControlController.ResetRingsAngle(),
      ControllerHolder_1.ControllerHolder.TurntableControlController.SelectRingByIndex(
        0,
        !0,
      ),
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(
        4,
        void 0,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneItem",
          39,
          "[TurntableControlView] 重置结束，显示UI",
        ),
      await this.ShowAsync(),
      this.Wwe(!1, !1);
  }
}
exports.TurntableControlView = TurntableControlView;
//# sourceMappingURL=TurntableControlView.js.map
