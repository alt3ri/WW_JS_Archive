"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerInputHandle = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
  LguiEventSystemManager_1 = require("../Ui/LguiEventSystem/LguiEventSystemManager"),
  TouchFingerManager_1 = require("../Ui/TouchFinger/TouchFingerManager"),
  CombinationActionHandle_1 = require("./CombinationActionHandle"),
  CombinationAxisHandle_1 = require("./CombinationAxisHandle");
class PlayerInputHandle {
  constructor() {
    (this.Zde = new Map()),
      (this.IsPrintKeyName = !1),
      (this.eCe = void 0),
      (this.tCe = void 0),
      (this.RDa = new Map()),
      (this.YHa = new Map()),
      (this.Wja = new Map()),
      (this.Qja = new Set()),
      (this.zHa = !1),
      (this.J$a = !1),
      (this.fZt = (t) => {
        this.zHa !== t && (this.zHa = t) && (this.J$a = !0);
      });
  }
  Initialize() {
    (this.eCe = new CombinationActionHandle_1.CombinationActionHandle()),
      (this.tCe = new CombinationAxisHandle_1.CombinationAxisHandle()),
      Info_1.Info.AxisInputOptimize &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnShowMouseCursor,
          this.fZt,
        );
  }
  Clear() {
    this.eCe.Clear(),
      (this.eCe = void 0),
      this.tCe.Clear(),
      (this.tCe = void 0),
      this.RDa.clear(),
      this.Wja?.clear(),
      (this.Wja = void 0),
      this.Qja?.clear(),
      (this.Qja = void 0),
      Info_1.Info.AxisInputOptimize &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnShowMouseCursor,
          this.fZt,
        );
  }
  Tick(t) {
    if ((this.tCe?.Tick(t), Info_1.Info.AxisInputOptimize))
      if (this.J$a) {
        this.J$a = !1;
        for (const e of this.RDa)
          InputDistributeController_1.InputDistributeController.InputAxis(
            e[0],
            0,
          );
        for (const i of this.YHa)
          InputDistributeController_1.InputDistributeController.InputAxis(
            i[0],
            0,
          );
      } else {
        for (const n of this.RDa)
          InputDistributeController_1.InputDistributeController.InputAxis(
            n[0],
            n[1],
          );
        if (ModelManager_1.ModelManager.InputModel.LastClearAxisValue) {
          for (const o of this.YHa)
            InputDistributeController_1.InputDistributeController.InputAxis(
              o[0],
              o[1],
            );
          ModelManager_1.ModelManager.InputModel.ResetLastTemporaryClearAxisValues();
        }
      }
  }
  InputAction(t, e, i) {
    this.Kja(t) &&
      ((i = i.KeyName.toString()), this.$ja(i)) &&
      this.iCe(i) &&
      this.Xja(t) &&
      InputDistributeController_1.InputDistributeController.InputAction(t, e);
  }
  InputAxis(t, e, i = !1) {
    (Info_1.Info.IsMobilePlatform() && Info_1.Info.IsInTouch()) ||
      (Info_1.Info.AxisInputOptimize
        ? i
          ? this.RDa.set(t, e)
          : (this.YHa.set(t, e),
            InputDistributeController_1.InputDistributeController.InputAxis(
              t,
              e,
            ))
        : InputDistributeController_1.InputDistributeController.InputAxis(
            t,
            e,
          ));
  }
  TouchBegin(t, e) {
    var t = Number(t),
      i = { TouchType: 0, TouchId: t, TouchPosition: this.oCe(t, e) };
    TouchFingerManager_1.TouchFingerManager.StartTouch(t, e),
      LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(
        !0,
        t,
        e,
      ),
      InputDistributeController_1.InputDistributeController.InputTouch(t, i);
  }
  TouchEnd(t, e) {
    var t = Number(t),
      i = { TouchType: 1, TouchId: t, TouchPosition: this.oCe(t, e) };
    TouchFingerManager_1.TouchFingerManager.EndTouch(t),
      LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(
        !1,
        t,
        e,
      ),
      InputDistributeController_1.InputDistributeController.InputTouch(t, i);
  }
  TouchMove(t, e) {
    var t = Number(t),
      i = { TouchType: 2, TouchId: t, TouchPosition: this.oCe(t, e) };
    TouchFingerManager_1.TouchFingerManager.MoveTouch(t, e),
      LguiEventSystemManager_1.LguiEventSystemManager.InputLguiTouchMove(t, e),
      InputDistributeController_1.InputDistributeController.InputTouch(t, i);
  }
  PressAnyKey(t) {
    var e;
    (Info_1.Info.IsMobilePlatform() && Info_1.Info.IsInTouch()) ||
      ((e = t.KeyName.toString()),
      this.eCe.PressAnyKey(e),
      this.tCe.PressAnyKey(e),
      this.Yja(e, !0),
      this.IsPrintKeyName &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InputSettings", 8, "按下按键", ["KeyName", e]),
      InputDistributeController_1.InputDistributeController.InputKey(e, !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputAnyKey,
        !0,
        t,
      ));
  }
  ReleaseAnyKey(t) {
    var e;
    (Info_1.Info.IsMobilePlatform() && Info_1.Info.IsInTouch()) ||
      ((e = t.KeyName.toString()),
      this.eCe.ReleaseAnyKey(e),
      this.tCe.ReleaseAnyKey(e),
      this.Yja(e, !1),
      this.IsPrintKeyName &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InputSettings", 8, "抬起按键", ["KeyName", e]),
      InputDistributeController_1.InputDistributeController.InputKey(e, !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputAnyKey,
        !1,
        t,
      ));
  }
  Yja(t, e) {
    var i = this.zja(t);
    if (i && this.$ja(t) && this.iCe(t))
      for (const n of i) {
        if (!this.Xja(n) && e) return;
        InputDistributeController_1.InputDistributeController.InputAction(n, e);
      }
  }
  $ja(t) {
    if (Info_1.Info.IsMobilePlatform()) {
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
  Xja(t) {
    return this.eCe.CheckCombinationAction(t);
  }
  rCe(t) {
    return this.Zde.get(t);
  }
  oCe(t, e) {
    var i = this.rCe(t);
    return i ? (i.Set(e.X, e.Y, e.Z), i) : this.nCe(t, e);
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
    let i = this.Wja?.get(t);
    i || ((i = new Set()), this.Wja?.set(t, i)),
      i.add(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "InputSettings",
          8,
          "[CustomAction]设置临时Action输入按键",
          ["keyName", t],
          ["actionName", e],
          ["CustomKeyActionMap", this.Wja],
        );
  }
  ResetAllCustomAction(t) {
    this.Wja?.delete(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "InputSettings",
          8,
          "[CustomAction]还原所有临时Action输入按键",
          ["keyName", t],
          ["CustomKeyActionMap", this.Wja],
        );
  }
  ResetCustomAction(t, e) {
    var i = this.Wja?.get(t);
    i &&
      (i.delete(e), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "InputSettings",
        8,
        "[CustomAction]还原临时Action输入按键",
        ["keyName", t],
        ["CustomKeyActionMap", this.Wja],
      );
  }
  zja(t) {
    t = this.Wja?.get(t);
    if (t) return t;
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    if (this.Wja) {
      var e,
        i,
        n = Info_1.Info.IsInKeyBoard(),
        o = Info_1.Info.IsInGamepad(),
        r = [];
      for ([e, i] of this.Wja)
        i.has(t) &&
          ((n && InputSettings_1.InputSettings.IsKeyboardKey(e)) ||
            (o && InputSettings_1.InputSettings.IsGamepadKey(e))) &&
          r.push(e);
      if (!(r.length <= 0)) return r;
    }
  }
  SetActionEnable(t, e) {
    e ? this.Qja?.delete(t) : this.Qja?.add(t);
  }
  Kja(t) {
    return !this.Qja?.has(t);
  }
}
exports.PlayerInputHandle = PlayerInputHandle;
//# sourceMappingURL=PlayerInputHandle.js.map
