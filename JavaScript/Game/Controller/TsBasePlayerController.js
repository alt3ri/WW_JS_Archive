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
  ReceiveTick(e) {
    super.ReceiveTick(e), this.PlayerInputHandle?.Tick(e);
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
  OnInputAction(e, t, i) {
    LogReportModel_1.LogReportModel.RecordOperateTime(),
      this.PlayerInputHandle.InputAction(e, t, i);
  }
  OnInputAxis(e, t, i = !1) {
    LogReportModel_1.LogReportModel.RecordOperateTime(!0, e, t),
      this.PlayerInputHandle.InputAxis(e, t, i);
  }
  OnTouchBegin(e, t) {
    this.PlayerInputHandle.TouchBegin(e, t),
      LogReportModel_1.LogReportModel.RecordOperateTime();
  }
  OnTouchEnd(e, t) {
    this.PlayerInputHandle.TouchEnd(e, t);
  }
  OnTouchMove(e, t) {
    this.PlayerInputHandle.TouchMove(e, t);
  }
  OnPressAnyKey(e) {
    ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(e),
      LogReportModel_1.LogReportModel.RecordOperateTime(),
      this.PlayerInputHandle.PressAnyKey(e);
  }
  OnReleaseAnyKey(e) {
    this.PlayerInputHandle.ReleaseAnyKey(e);
  }
  AddActionHandle(t) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsActionHandleMap || (this.TsActionHandleMap = new Map());
      let e = this.TsActionHandleMap.get(t);
      e ||
        ((e = new TsPureActionHandle_1.TsPureActionHandle()).Initialize(this),
        this.TsActionHandleMap.set(t, e)),
        (this.OnInputActionCallback = (e, t, i) => {
          this.OnInputAction(e, t, i);
        }),
        e.AddActionBinding(t, this.OnInputActionCallback);
    } else {
      let e = this.GetActionHandle(t);
      (e = e || this.NewActionHandle(t)),
        (this.OnInputActionCallback = (e, t, i) => {
          this.OnInputAction(e, t, i);
        }),
        e.AddActionBinding(t, this.OnInputActionCallback);
    }
  }
  NewActionHandle(e) {
    var t;
    if (this.ActionHandleClass && this.ActionHandleClass.IsValid())
      return (
        (t = UE.NewObject(this.ActionHandleClass, this)).Initialize(this),
        this.ActionHandleMap.Add(e, t),
        t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Controller",
        8,
        "当前Controller中的ActionHandleClass不存在",
        ["ControllerName", this.GetName()],
      );
  }
  RemoveActionHandle(e) {
    var t = this.GetActionHandle(e);
    t && (t.Reset(), this.ActionHandleMap.Remove(e));
  }
  GetActionHandle(e) {
    return this.ActionHandleMap.Get(e);
  }
  ClearActionHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsActionHandleMap) {
        for (const i of this.TsActionHandleMap) {
          var e = i[1];
          if (!e) return;
          e.Reset();
        }
        this.TsActionHandleMap.clear();
      }
    } else {
      for (let e = 0; e < this.ActionHandleMap.Num(); e++) {
        var t = this.ActionHandleMap.GetKey(e),
          t = this.ActionHandleMap.Get(t);
        if (!t) return;
        t.Reset();
      }
      this.ActionHandleMap.Empty();
    }
  }
  AddAxisHandle(t) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsAxisHandleMap || (this.TsAxisHandleMap = new Map());
      let e = this.TsAxisHandleMap.get(t);
      e ||
        ((e = new TsPureAxisHandle_1.TsPureAxisHandle()).Initialize(this),
        this.TsAxisHandleMap.set(t, e)),
        (this.OnInputAxisCallbackNew = (e, t, i) => {
          this.OnInputAxis(e, t, i);
        }),
        e.AddAxisBinding(t, this.OnInputAxisCallbackNew);
    } else {
      let e = this.GetAxisHandle(t);
      (e = e || this.NewAxisHandle(t)),
        (this.OnInputAxisCallback = (e, t) => {
          this.OnInputAxis(e, t);
        }),
        e.AddAxisBinding(t, this.OnInputAxisCallback);
    }
  }
  NewAxisHandle(e) {
    var t;
    if (this.AxisHandleClass && this.AxisHandleClass.IsValid())
      return (
        (t = UE.NewObject(this.AxisHandleClass, this)).Initialize(this),
        this.AxisHandleMap.Add(e, t),
        t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Controller",
        8,
        "当前Controller中的AxisHandleClass不存在",
        ["ControllerName", this.GetName()],
      );
  }
  RemoveAxisHandle(e) {
    var t = this.GetActionHandle(e);
    t && (t.Reset(), this.ActionHandleMap.Remove(e));
  }
  GetAxisHandle(e) {
    return this.AxisHandleMap.Get(e);
  }
  ClearAxisHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsAxisHandleMap) {
        for (const i of this.TsAxisHandleMap) {
          var e = i[1];
          if (!e) return;
          e.Reset();
        }
        this.TsAxisHandleMap.clear();
      }
    } else {
      for (let e = 0; e < this.AxisHandleMap.Num(); e++) {
        var t = this.AxisHandleMap.GetKey(e),
          t = this.AxisHandleMap.Get(t);
        if (!t) return;
        t.Reset();
      }
      this.AxisHandleMap.Empty();
    }
  }
  GetInputPosition(e = 0) {
    return Info_1.Info.IsInKeyBoard()
      ? this.GetCursorPosition()
      : Info_1.Info.IsInTouch()
        ? this.GetTouchPosition(e)
        : void 0;
  }
  GetCursorPosition() {
    var e = (0, puerts_1.$ref)(0),
      t = (0, puerts_1.$ref)(0);
    if (this.GetMousePosition(e, t))
      return (
        (this.CurrentInputPosition.X = (0, puerts_1.$unref)(e)),
        (this.CurrentInputPosition.Y = (0, puerts_1.$unref)(t)),
        this.CurrentInputPosition
      );
  }
  GetTouchPosition(e) {
    var t = (0, puerts_1.$ref)(0),
      i = (0, puerts_1.$ref)(0);
    return (
      this.GetInputTouchState(e, t, i, void 0),
      (this.CurrentInputPosition.X = (0, puerts_1.$unref)(t)),
      (this.CurrentInputPosition.Y = (0, puerts_1.$unref)(i)),
      this.CurrentInputPosition
    );
  }
  IsInTouch(e) {
    var t = (0, puerts_1.$ref)(!1);
    return (
      this.GetInputTouchState(e, void 0, void 0, t), (0, puerts_1.$unref)(t)
    );
  }
  SetIsPrintKeyName(e) {
    this.PlayerInputHandle.IsPrintKeyName = e;
  }
  SimulateTouch(e, t, i) {
    i
      ? this.PlayerInputHandle.TouchBegin(e, t)
      : this.PlayerInputHandle.TouchEnd(e, t);
  }
}
(exports.TsBasePlayerController = TsBasePlayerController),
  (exports.default = TsBasePlayerController);
//# sourceMappingURL=TsBasePlayerController.js.map
