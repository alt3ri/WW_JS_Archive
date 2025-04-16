"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerInputHandle = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  LguiEventSystemManager_1 = require("../Ui/LguiEventSystem/LguiEventSystemManager"),
  TouchFingerManager_1 = require("../Ui/TouchFinger/TouchFingerManager"),
  CombinationActionHandle_1 = require("./CombinationActionHandle"),
  CombinationAxisHandle_1 = require("./CombinationAxisHandle"),
  CustomKeyActionData_1 = require("./CustomKeyActionData");
class PlayerInputHandle {
  constructor() {
    (this.Zde = new Map()),
      (this.IsPrintKeyName = !1),
      (this.eCe = void 0),
      (this.tCe = void 0),
      (this.wDa = new Map()),
      (this.JQa = new Map()),
      (this.BT1 = new CustomKeyActionData_1.CustomKeyActionData()),
      (this.ZQa = !1),
      (this.QJa = !1),
      (this.fZt = (t) => {
        this.ZQa !== t && (this.ZQa = t) && (this.QJa = !0);
      }),
      (this.$Q_ = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("MobileInputSwitch", 10, "手柄断开,清理输入缓存");
        for (const t of this.wDa)
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
            t[0],
            0,
          );
        this.wDa.clear();
        for (const e of this.JQa)
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
            e[0],
            0,
          );
        this.JQa.clear();
      }),
      (this.kT1 = (t) => {
        this.BT1.DisableCustomInputData(t);
      }),
      (this.OT1 = (t) => {
        this.BT1.EnableCustomInputData(t);
      });
  }
  Initialize() {
    (this.eCe = new CombinationActionHandle_1.CombinationActionHandle()),
      (this.tCe = new CombinationAxisHandle_1.CombinationAxisHandle()),
      Info_1.Info.AxisInputOptimize &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnShowMouseCursor,
          this.fZt,
        ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MobileGamepadDisconnect,
        this.$Q_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisableCustomInputData,
        this.kT1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnableCacheCustomInputData,
        this.OT1,
      );
  }
  Clear() {
    this.eCe.Clear(),
      (this.eCe = void 0),
      this.tCe.Clear(),
      (this.tCe = void 0),
      this.wDa.clear(),
      this.BT1.Clear(),
      Info_1.Info.AxisInputOptimize &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnShowMouseCursor,
          this.fZt,
        ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MobileGamepadDisconnect,
        this.$Q_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DisableCustomInputData,
        this.kT1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnableCacheCustomInputData,
        this.OT1,
      );
  }
  Tick(t) {
    if ((this.tCe?.Tick(t), Info_1.Info.AxisInputOptimize))
      if (this.QJa) {
        this.QJa = !1;
        for (const e of this.wDa)
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
            e[0],
            0,
          );
        for (const n of this.JQa)
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
            n[0],
            0,
          );
      } else {
        for (const o of this.wDa)
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
            o[0],
            o[1],
          );
        if (ModelManager_1.ModelManager.InputModel.LastClearAxisValue) {
          for (const i of this.JQa)
            ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
              i[0],
              i[1],
              !0,
            );
          ModelManager_1.ModelManager.InputModel.ResetLastTemporaryClearAxisValues();
        }
      }
  }
  InputAction(t, e, n) {
    this.BT1.IsActionEnable(t) &&
      ((n = n.KeyName.toString()), this.c$a(n)) &&
      this.iCe(n) &&
      (this.m$a(t)
        ? ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(
            t,
            e,
          )
        : this.yF_(t, e));
  }
  InputAxis(t, e, n = !1) {
    (Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInTouch()) ||
      (Info_1.Info.AxisInputOptimize
        ? n
          ? this.wDa.set(t, e)
          : (this.JQa.set(t, e),
            ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
              t,
              e,
            ))
        : ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(
            t,
            e,
          ));
  }
  TouchBegin(t, e) {
    var t = Number(t),
      n = { TouchType: 0, TouchId: t, TouchPosition: this.oCe(t, e) };
    TouchFingerManager_1.TouchFingerManager.StartTouch(t, e),
      LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(
        !0,
        t,
        e,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(
        t,
        n,
      );
  }
  TouchEnd(t, e) {
    var t = Number(t),
      n = { TouchType: 1, TouchId: t, TouchPosition: this.oCe(t, e) };
    TouchFingerManager_1.TouchFingerManager.EndTouch(t),
      LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(
        !1,
        t,
        e,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(
        t,
        n,
      );
  }
  TouchMove(t, e) {
    var t = Number(t),
      n = { TouchType: 2, TouchId: t, TouchPosition: this.oCe(t, e) };
    TouchFingerManager_1.TouchFingerManager.MoveTouch(t, e),
      LguiEventSystemManager_1.LguiEventSystemManager.InputLguiTouchMove(t, e),
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(
        t,
        n,
      );
  }
  PressAnyKey(t) {
    var e;
    (Info_1.Info.IsMobileInputModel() &&
      Info_1.Info.IsInTouch() &&
      ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(
        t.KeyName.toString(),
      )) ||
      ((e = t.KeyName.toString()),
      this.eCe.PressAnyKey(e),
      this.tCe.PressAnyKey(e),
      this.d$a(e, !0),
      this.IsPrintKeyName &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InputSettings", 10, "按下按键", ["KeyName", e]),
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputKey(
        e,
        !0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputAnyKey,
        !0,
        t,
      ));
  }
  ReleaseAnyKey(t) {
    var e;
    (Info_1.Info.IsMobileInputModel() &&
      Info_1.Info.IsInTouch() &&
      ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(
        t.KeyName.toString(),
      )) ||
      ((e = t.KeyName.toString()),
      this.eCe.ReleaseAnyKey(e),
      this.tCe.ReleaseAnyKey(e),
      this.d$a(e, !1),
      this.IsPrintKeyName &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InputSettings", 10, "抬起按键", ["KeyName", e]),
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputKey(
        e,
        !1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputAnyKey,
        !1,
        t,
      ));
  }
  d$a(t, e) {
    var n = this.BT1.GetCustomActionName(t);
    if (n && this.c$a(t) && this.iCe(t))
      for (const o of n) {
        if (!this.m$a(o) && e) return;
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(
          o,
          e,
        );
      }
  }
  c$a(t) {
    if (Info_1.Info.IsMobileInputModel()) {
      if (
        InputSettings_1.InputSettings.IsKeyboardKey(t) ||
        InputSettings_1.InputSettings.IsMouseButton(t)
      )
        return !1;
      if (
        Info_1.Info.IsInTouch() &&
        ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(t)
      )
        return !1;
      if (
        Info_1.Info.IsInGamepad() &&
        !ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(t)
      )
        return !1;
    }
    return !0;
  }
  m$a(t) {
    return this.eCe.CheckCombinationAction(t);
  }
  yF_(t, e) {
    e ||
      (ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(t) &&
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(
          t,
          !1,
        ));
  }
  rCe(t) {
    return this.Zde.get(t);
  }
  oCe(t, e) {
    var n = this.rCe(t);
    return n ? (n.Set(e.X, e.Y, e.Z), n) : this.nCe(t, e);
  }
  nCe(t, e) {
    e = Vector_1.Vector.Create(e);
    return this.Zde.set(t, e), e;
  }
  iCe(t) {
    return (
      !!Info_1.Info.IsGmLockGamepad ||
      !(
        (Info_1.Info.IsInGamepad() &&
          InputSettings_1.InputSettings.IsKeyboardKey(t)) ||
        (Info_1.Info.IsInKeyBoard() &&
          InputSettings_1.InputSettings.IsGamepadKey(t))
      )
    );
  }
  SetCustomAction(t, e) {
    this.BT1.SetCustomAction(t, e);
  }
  ResetAllCustomAction(t) {
    this.d$a(t, !1), this.BT1.ResetAllCustomAction(t);
  }
  ResetCustomAction(t, e) {
    this.BT1.ResetCustomAction(t, e);
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    return this.BT1.GetCurrentPlatformCustomActionKeyNameList(t);
  }
  SetActionEnable(t, e) {
    this.BT1.SetActionEnable(t, e);
  }
}
exports.PlayerInputHandle = PlayerInputHandle;
//# sourceMappingURL=PlayerInputHandle.js.map
