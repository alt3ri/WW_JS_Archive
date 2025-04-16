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
  Constructor() {
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
      Log_1.Log.Info("InputSettings", 10, "添加PlayerController绑定输入", [
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
      Log_1.Log.Info("InputSettings", 10, "清理PlayerController绑定输入", [
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
            36,
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
            36,
            "BindKeyHandle Failed, TsTouchHandle is undefined",
          )
      : (this.AddTouchBinding(0, this, new UE.FName(this.OnTouchBegin.name)),
        this.AddTouchBinding(1, this, new UE.FName(this.OnTouchEnd.name)),
        this.AddTouchBinding(2, this, new UE.FName(this.OnTouchMove.name)));
  }
  OnInputAction(t, i, e) {
    LogReportModel_1.LogReportModel.RecordOperateTime(),
      this.PlayerInputHandle.InputAction(t, i, e);
  }
  OnInputAxis(t, i, e = !1) {
    LogReportModel_1.LogReportModel.RecordOperateTime(!0, t, i),
      this.PlayerInputHandle.InputAxis(t, i, e);
  }
  OnTouchBegin(t, i) {
    this.PlayerInputHandle.TouchBegin(t, i),
      LogReportModel_1.LogReportModel.RecordOperateTime();
  }
  OnTouchEnd(t, i) {
    this.PlayerInputHandle.TouchEnd(t, i);
  }
  OnTouchMove(t, i) {
    this.PlayerInputHandle.TouchMove(t, i);
  }
  OnPressAnyKey(t) {
    LogReportModel_1.LogReportModel.RecordOperateTime(),
      this.PlayerInputHandle.PressAnyKey(t),
      ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(t);
  }
  OnReleaseAnyKey(t) {
    this.PlayerInputHandle.ReleaseAnyKey(t);
  }
  AddActionHandle(i) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsActionHandleMap || (this.TsActionHandleMap = new Map());
      let t = this.TsActionHandleMap.get(i);
      t ||
        ((t = new TsPureActionHandle_1.TsPureActionHandle()).Initialize(this),
        this.TsActionHandleMap.set(i, t)),
        (this.OnInputActionCallback = (t, i, e) => {
          this.OnInputAction(t, i, e);
        }),
        t.AddActionBinding(i, this.OnInputActionCallback);
    } else {
      let t = this.GetActionHandle(i);
      (t = t || this.NewActionHandle(i)),
        (this.OnInputActionCallback = (t, i, e) => {
          this.OnInputAction(t, i, e);
        }),
        t.AddActionBinding(i, this.OnInputActionCallback);
    }
  }
  NewActionHandle(t) {
    var i;
    if (this.ActionHandleClass && this.ActionHandleClass.IsValid())
      return (
        (i = UE.NewObject(this.ActionHandleClass, this)).Initialize(this),
        this.ActionHandleMap.Add(t, i),
        i
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Controller",
        10,
        "当前Controller中的ActionHandleClass不存在",
        ["ControllerName", this.GetName()],
      );
  }
  RemoveActionHandle(t) {
    var i = this.GetActionHandle(t);
    i && (i.Reset(), this.ActionHandleMap.Remove(t));
  }
  GetActionHandle(t) {
    return this.ActionHandleMap.Get(t);
  }
  ClearActionHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsActionHandleMap) {
        for (const e of this.TsActionHandleMap) {
          var t = e[1];
          if (!t) return;
          t.Reset();
        }
        this.TsActionHandleMap.clear();
      }
    } else {
      for (let t = 0; t < this.ActionHandleMap.Num(); t++) {
        var i = this.ActionHandleMap.GetKey(t),
          i = this.ActionHandleMap.Get(i);
        if (!i) return;
        i.Reset();
      }
      this.ActionHandleMap.Empty();
    }
  }
  AddAxisHandle(i) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsAxisHandleMap || (this.TsAxisHandleMap = new Map());
      let t = this.TsAxisHandleMap.get(i);
      t ||
        ((t = new TsPureAxisHandle_1.TsPureAxisHandle()).Initialize(this),
        this.TsAxisHandleMap.set(i, t)),
        (this.OnInputAxisCallbackNew = (t, i, e) => {
          this.OnInputAxis(t, i, e);
        }),
        t.AddAxisBinding(i, this.OnInputAxisCallbackNew);
    } else {
      let t = this.GetAxisHandle(i);
      (t = t || this.NewAxisHandle(i)),
        (this.OnInputAxisCallback = (t, i) => {
          this.OnInputAxis(t, i);
        }),
        t.AddAxisBinding(i, this.OnInputAxisCallback);
    }
  }
  NewAxisHandle(t) {
    var i;
    if (this.AxisHandleClass && this.AxisHandleClass.IsValid())
      return (
        (i = UE.NewObject(this.AxisHandleClass, this)).Initialize(this),
        this.AxisHandleMap.Add(t, i),
        i
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Controller",
        10,
        "当前Controller中的AxisHandleClass不存在",
        ["ControllerName", this.GetName()],
      );
  }
  RemoveAxisHandle(t) {
    var i = this.GetActionHandle(t);
    i && (i.Reset(), this.ActionHandleMap.Remove(t));
  }
  GetAxisHandle(t) {
    return this.AxisHandleMap.Get(t);
  }
  ClearAxisHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsAxisHandleMap) {
        for (const e of this.TsAxisHandleMap) {
          var t = e[1];
          if (!t) return;
          t.Reset();
        }
        this.TsAxisHandleMap.clear();
      }
    } else {
      for (let t = 0; t < this.AxisHandleMap.Num(); t++) {
        var i = this.AxisHandleMap.GetKey(t),
          i = this.AxisHandleMap.Get(i);
        if (!i) return;
        i.Reset();
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
      i = (0, puerts_1.$ref)(0);
    if (this.GetMousePosition(t, i))
      return (
        (this.CurrentInputPosition.X = (0, puerts_1.$unref)(t)),
        (this.CurrentInputPosition.Y = (0, puerts_1.$unref)(i)),
        this.CurrentInputPosition
      );
  }
  GetTouchPosition(t) {
    var i = (0, puerts_1.$ref)(0),
      e = (0, puerts_1.$ref)(0);
    return (
      this.GetInputTouchState(t, i, e, void 0),
      (this.CurrentInputPosition.X = (0, puerts_1.$unref)(i)),
      (this.CurrentInputPosition.Y = (0, puerts_1.$unref)(e)),
      this.CurrentInputPosition
    );
  }
  IsInTouch(t) {
    var i = (0, puerts_1.$ref)(!1);
    return (
      this.GetInputTouchState(t, void 0, void 0, i), (0, puerts_1.$unref)(i)
    );
  }
  SetIsPrintKeyName(t) {
    this.PlayerInputHandle.IsPrintKeyName = t;
  }
  SimulateTouch(t, i, e) {
    e
      ? this.PlayerInputHandle.TouchBegin(t, i)
      : this.PlayerInputHandle.TouchEnd(t, i);
  }
  SetCustomAction(t, i) {
    this.PlayerInputHandle?.SetCustomAction(t, i);
  }
  ResetAllCustomAction(t) {
    this.PlayerInputHandle?.ResetAllCustomAction(t);
  }
  ResetCustomAction(t, i) {
    this.PlayerInputHandle?.ResetCustomAction(t, i);
  }
  SetActionEnable(t, i) {
    this.PlayerInputHandle?.SetActionEnable(t, i);
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    return this.PlayerInputHandle?.GetCurrentPlatformCustomActionKeyNameList(t);
  }
}
(exports.TsBasePlayerController = TsBasePlayerController),
  (exports.default = TsBasePlayerController);
//# sourceMappingURL=TsBasePlayerController.js.map
