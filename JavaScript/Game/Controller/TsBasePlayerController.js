"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsBasePlayerController = void 0),
  (Error.stackTraceLimit = 500);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  Vector2D_1 = require("../../Core/Utils/Math/Vector2D"),
  ObjectUtils_1 = require("../../Core/Utils/ObjectUtils"),
  ModelManager_1 = require("../Manager/ModelManager"),
  LogReportModel_1 = require("../Module/LogReport/LogReportModel"),
  HotKeyViewDefine_1 = require("../Module/UiNavigation/HotKeyViewDefine"),
  PlayerInputHandle_1 = require("./PlayerInputHandle"),
  TsPureActionHandle_1 = require("./TsPureActionHandle"),
  TsPureAxisHandle_1 = require("./TsPureAxisHandle"),
  TsPureKeyHandle_1 = require("./TsPureKeyHandle"),
  TsPureTouchHandle_1 = require("./TsPureTouchHandle");
class TsBasePlayerController extends UE.BasePlayerController {
  constructor() {
    super(...arguments),
      (this.ActionHandleClass = void 0),
      (this.AxisHandleClass = void 0),
      (this.ActionHandleMap = void 0),
      (this.AxisHandleMap = void 0),
      (this.TsActionHandleMap = void 0),
      (this.TsAxisHandleMap = void 0),
      (this.CurrentInputPosition = void 0),
      (this.OnInputActionCallback = void 0),
      (this.OnInputAxisCallback = void 0),
      (this.OnInputAxisCallbackNew = void 0),
      (this.PlayerInputHandle = void 0),
      (this.TsKeyHandle = void 0),
      (this.TsTouchHandle = void 0);
  }
  ReceiveSetupInputComponent() {
    this.InitInputHandle(),
      this.AddInputBinding(),
      this.OnSetupInputComponent();
  }
  ReceiveBeginPlay() {
    super.ReceiveBeginPlay(), this.InitInputHandle();
  }
  ReceiveDestroyed() {
    ObjectUtils_1.ObjectUtils.IsValid(this) &&
      (this.ClearInputBinding(),
      this.PlayerInputHandle &&
        (this.PlayerInputHandle.Clear(), (this.PlayerInputHandle = void 0)),
      this.TsKeyHandle &&
        (this.TsKeyHandle.Reset(), (this.TsKeyHandle = void 0)),
      this.TsTouchHandle &&
        (this.TsTouchHandle.Reset(), (this.TsTouchHandle = void 0)),
      super.ReceiveDestroyed());
  }
  ReceiveTick(t) {
    super.ReceiveTick(t), this.PlayerInputHandle?.Tick(t);
  }
  OnReceivedPlayer() {
    UE.KuroInputFunctionLibrary.ResetInputMode(this);
  }
  InitInputHandle() {
    this.PlayerInputHandle ||
      ((this.PlayerInputHandle = new PlayerInputHandle_1.PlayerInputHandle()),
      this.PlayerInputHandle.Initialize(),
      this.TsKeyHandle ||
        ((this.TsKeyHandle = new TsPureKeyHandle_1.TsPureKeyHandle()),
        this.TsKeyHandle.Initialize(this, this.PlayerInputHandle)),
      this.TsTouchHandle) ||
      ((this.TsTouchHandle = new TsPureTouchHandle_1.TsPureTouchHandle()),
      this.TsTouchHandle.Initialize(this, this.PlayerInputHandle));
  }
  AddInputBinding() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "添加PlayerController绑定输入", [
        "PlayerController",
        this.GetName(),
      ]),
      this.BindActionHandle(),
      this.BindAxisHandle(),
      this.BindKeyHandle(),
      this.BindTouchHandle();
  }
  ClearInputBinding() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 8, "清理PlayerController绑定输入", [
        "PlayerController",
        this.GetName(),
      ]),
      Info_1.Info.UseFastInputCallback
        ? cpp_1.FKuroInputInterface.ClearInputBinding(this)
        : (this.ClearActionBindings(),
          this.ClearAxisBindings(),
          this.ClearKeyBindings(),
          this.ClearTouchBindings()),
      this.ClearActionHandle(),
      this.ClearAxisHandle(),
      (this.OnInputActionCallback = void 0),
      (this.OnInputAxisCallback = void 0);
  }
  OnSetupInputComponent() {
    this.CurrentInputPosition = Vector2D_1.Vector2D.Create(0, 0);
  }
  BindActionHandle() {}
  BindAxisHandle() {}
  BindKeyHandle() {
    Info_1.Info.UseFastInputCallback
      ? this.TsKeyHandle
        ? this.TsKeyHandle.BindKey()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Input",
            37,
            "BindKeyHandle Failed, TsKeyHandle is undefined",
          )
      : (this.AddKeyBinding(
          new UE.InputChord(
            new UE.Key(
              FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY),
            ),
            !1,
            !1,
            !1,
            !1,
          ),
          0,
          this,
          new UE.FName(this.OnPressAnyKey.name),
        ),
        this.AddKeyBinding(
          new UE.InputChord(
            new UE.Key(
              FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY),
            ),
            !1,
            !1,
            !1,
            !1,
          ),
          1,
          this,
          new UE.FName(this.OnReleaseAnyKey.name),
        ));
  }
  BindTouchHandle() {
    Info_1.Info.UseFastInputCallback
      ? this.TsTouchHandle
        ? this.TsTouchHandle.BindTouch()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Input",
            37,
            "BindKeyHandle Failed, TsTouchHandle is undefined",
          )
      : (this.AddTouchBinding(0, this, new UE.FName(this.OnTouchBegin.name)),
        this.AddTouchBinding(1, this, new UE.FName(this.OnTouchEnd.name)),
        this.AddTouchBinding(2, this, new UE.FName(this.OnTouchMove.name)));
  }
  OnInputAction(t, e, i) {
    LogReportModel_1.LogReportModel.RecordOperateTime(),
      this.PlayerInputHandle.InputAction(t, e, i);
  }
  OnInputAxis(t, e, i = !1) {
    LogReportModel_1.LogReportModel.RecordOperateTime(!0, t, e),
      this.PlayerInputHandle.InputAxis(t, e, i);
  }
  OnTouchBegin(t, e) {
    this.PlayerInputHandle.TouchBegin(t, e),
      LogReportModel_1.LogReportModel.RecordOperateTime();
  }
  OnTouchEnd(t, e) {
    this.PlayerInputHandle.TouchEnd(t, e);
  }
  OnTouchMove(t, e) {
    this.PlayerInputHandle.TouchMove(t, e);
  }
  OnPressAnyKey(t) {
    LogReportModel_1.LogReportModel.RecordOperateTime(),
      this.PlayerInputHandle.PressAnyKey(t),
      ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(t);
  }
  OnReleaseAnyKey(t) {
    this.PlayerInputHandle.ReleaseAnyKey(t);
  }
  AddActionHandle(e) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsActionHandleMap || (this.TsActionHandleMap = new Map());
      let t = this.TsActionHandleMap.get(e);
      t ||
        ((t = new TsPureActionHandle_1.TsPureActionHandle()).Initialize(this),
        this.TsActionHandleMap.set(e, t)),
        (this.OnInputActionCallback = (t, e, i) => {
          this.OnInputAction(t, e, i);
        }),
        t.AddActionBinding(e, this.OnInputActionCallback);
    } else {
      let t = this.GetActionHandle(e);
      (t = t || this.NewActionHandle(e)),
        (this.OnInputActionCallback = (t, e, i) => {
          this.OnInputAction(t, e, i);
        }),
        t.AddActionBinding(e, this.OnInputActionCallback);
    }
  }
  NewActionHandle(t) {
    var e;
    if (this.ActionHandleClass && this.ActionHandleClass.IsValid())
      return (
        (e = UE.NewObject(this.ActionHandleClass, this)).Initialize(this),
        this.ActionHandleMap.Add(t, e),
        e
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Controller",
        8,
        "当前Controller中的ActionHandleClass不存在",
        ["ControllerName", this.GetName()],
      );
  }
  RemoveActionHandle(t) {
    var e = this.GetActionHandle(t);
    e && (e.Reset(), this.ActionHandleMap.Remove(t));
  }
  GetActionHandle(t) {
    return this.ActionHandleMap.Get(t);
  }
  ClearActionHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsActionHandleMap) {
        for (const i of this.TsActionHandleMap) {
          var t = i[1];
          if (!t) return;
          t.Reset();
        }
        this.TsActionHandleMap.clear();
      }
    } else {
      for (let t = 0; t < this.ActionHandleMap.Num(); t++) {
        var e = this.ActionHandleMap.GetKey(t),
          e = this.ActionHandleMap.Get(e);
        if (!e) return;
        e.Reset();
      }
      this.ActionHandleMap.Empty();
    }
  }
  AddAxisHandle(e) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsAxisHandleMap || (this.TsAxisHandleMap = new Map());
      let t = this.TsAxisHandleMap.get(e);
      t ||
        ((t = new TsPureAxisHandle_1.TsPureAxisHandle()).Initialize(this),
        this.TsAxisHandleMap.set(e, t)),
        (this.OnInputAxisCallbackNew = (t, e, i) => {
          this.OnInputAxis(t, e, i);
        }),
        t.AddAxisBinding(e, this.OnInputAxisCallbackNew);
    } else {
      let t = this.GetAxisHandle(e);
      (t = t || this.NewAxisHandle(e)),
        (this.OnInputAxisCallback = (t, e) => {
          this.OnInputAxis(t, e);
        }),
        t.AddAxisBinding(e, this.OnInputAxisCallback);
    }
  }
  NewAxisHandle(t) {
    var e;
    if (this.AxisHandleClass && this.AxisHandleClass.IsValid())
      return (
        (e = UE.NewObject(this.AxisHandleClass, this)).Initialize(this),
        this.AxisHandleMap.Add(t, e),
        e
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Controller",
        8,
        "当前Controller中的AxisHandleClass不存在",
        ["ControllerName", this.GetName()],
      );
  }
  RemoveAxisHandle(t) {
    var e = this.GetActionHandle(t);
    e && (e.Reset(), this.ActionHandleMap.Remove(t));
  }
  GetAxisHandle(t) {
    return this.AxisHandleMap.Get(t);
  }
  ClearAxisHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsAxisHandleMap) {
        for (const i of this.TsAxisHandleMap) {
          var t = i[1];
          if (!t) return;
          t.Reset();
        }
        this.TsAxisHandleMap.clear();
      }
    } else {
      for (let t = 0; t < this.AxisHandleMap.Num(); t++) {
        var e = this.AxisHandleMap.GetKey(t),
          e = this.AxisHandleMap.Get(e);
        if (!e) return;
        e.Reset();
      }
      this.AxisHandleMap.Empty();
    }
  }
  GetInputPosition(t = 0) {
    return Info_1.Info.IsInKeyBoard()
      ? this.GetCursorPosition()
      : Info_1.Info.IsInTouch()
        ? this.GetTouchPosition(t)
        : void 0;
  }
  GetCursorPosition() {
    var t = (0, puerts_1.$ref)(0),
      e = (0, puerts_1.$ref)(0);
    if (this.GetMousePosition(t, e))
      return (
        (this.CurrentInputPosition.X = (0, puerts_1.$unref)(t)),
        (this.CurrentInputPosition.Y = (0, puerts_1.$unref)(e)),
        this.CurrentInputPosition
      );
  }
  GetTouchPosition(t) {
    var e = (0, puerts_1.$ref)(0),
      i = (0, puerts_1.$ref)(0);
    return (
      this.GetInputTouchState(t, e, i, void 0),
      (this.CurrentInputPosition.X = (0, puerts_1.$unref)(e)),
      (this.CurrentInputPosition.Y = (0, puerts_1.$unref)(i)),
      this.CurrentInputPosition
    );
  }
  IsInTouch(t) {
    var e = (0, puerts_1.$ref)(!1);
    return (
      this.GetInputTouchState(t, void 0, void 0, e), (0, puerts_1.$unref)(e)
    );
  }
  SetIsPrintKeyName(t) {
    this.PlayerInputHandle.IsPrintKeyName = t;
  }
  SimulateTouch(t, e, i) {
    i
      ? this.PlayerInputHandle.TouchBegin(t, e)
      : this.PlayerInputHandle.TouchEnd(t, e);
  }
  SetCustomAction(t, e) {
    this.PlayerInputHandle?.SetCustomAction(t, e);
  }
  ResetAllCustomAction(t) {
    this.PlayerInputHandle?.ResetAllCustomAction(t);
  }
  ResetCustomAction(t, e) {
    this.PlayerInputHandle?.ResetCustomAction(t, e);
  }
  SetActionEnable(t, e) {
    this.PlayerInputHandle?.SetActionEnable(t, e);
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    return this.PlayerInputHandle?.GetCurrentPlatformCustomActionKeyNameList(t);
  }
}
(exports.TsBasePlayerController = TsBasePlayerController),
  (exports.default = TsBasePlayerController);
//# sourceMappingURL=TsBasePlayerController.js.map
