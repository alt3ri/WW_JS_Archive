"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformModel = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager");
const PlatformDefine_1 = require("./PlatformDefine");
class PlatformModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.hQi = 0),
      (this.lQi = 0),
      (this._Qi = 0),
      (this.IsGmLockGamepad = !1),
      (this.uQi = !1);
  }
  get PlatformType() {
    return this.hQi;
  }
  OnInit() {
    return this.RefreshPlatformType(), this.mQi(), !0;
  }
  mQi() {
    (this.uQi =
      UE.KismetSystemLibrary.GetCommandLine()?.includes("-CloudGame") ?? !1),
      this.uQi &&
        (this.SwitchInputControllerType(2), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Platform", 17, "初始化云游戏");
  }
  RefreshPlatformType() {
    let e = 0;
    switch (this.GetPlatformName()) {
      case "IOS":
        e = 1;
        break;
      case "Android":
        e = 2;
        break;
      case "Windows":
        e = 3;
        break;
      case "Mac":
        e = 4;
        break;
      case "Linux":
        e = 5;
        break;
      case "XboxOne":
        e = 6;
        break;
      case "PS4":
        e = 7;
    }
    const t = PlatformDefine_1.inputControllerMap.get(e);
    this.SwitchInputControllerType(t, e);
  }
  SwitchInputControllerType(e, t = void 0) {
    if (!this.IsGmLockGamepad)
      if ((this.dQi(e), t)) this.CQi(t);
      else
        for (const [r, o] of PlatformDefine_1.inputControllerMap)
          if (o === e) {
            this.CQi(r);
            break;
          }
  }
  dQi(t) {
    if (
      (t === 0 &&
        this._Qi === 2 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Platform",
          8,
          "[PlatformDebug]从Touch输入方式切换成了键鼠的输入方式",
          ["lastInputController", this._Qi],
          ["inputController", t],
        ),
      this._Qi !== t)
    ) {
      let r = this._Qi;
      switch (
        ((this._Qi = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.InputControllerChange,
          r,
          this._Qi,
        ),
        t)
      ) {
        case 1:
          AudioSystem_1.AudioSystem.SetState(
            "input_controller_type",
            "gamepad",
          );
          break;
        case 0:
          AudioSystem_1.AudioSystem.SetState(
            "input_controller_type",
            "Keyboard",
          );
          break;
        default:
          AudioSystem_1.AudioSystem.SetState("input_controller_type", "touch");
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Platform",
          17,
          "设置输入方式",
          ["lastInputController", r],
          ["InputController", this._Qi],
        );
      let e = 0;
      switch (t) {
        case 0:
          e = 1;
          break;
        case 1:
          e = 2;
          break;
        case 2:
          e = 3;
      }
      r = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
      r?.IsValid() && r.SetCurrentInputKeyType(e);
    }
  }
  CQi(e) {
    let t, r;
    this.PlatformType !== e &&
      ((t = this.lQi),
      (r = this.PlatformType),
      (this.hQi = e),
      (this.lQi = PlatformDefine_1.operationMap.get(e)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Platform",
          17,
          "设置平台类型",
          ["PlatformType", this.PlatformType],
          ["OperationType", this.lQi],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.PlatformType,
        t,
        this.lQi,
        r,
      ));
  }
  OnPressAnyKey(e) {
    this.IsMobile() ||
      (UE.KismetInputLibrary.Key_IsGamepadKey(e)
        ? this.RefreshPlatformByDevice() || this.SwitchInputControllerType(1, 6)
        : UE.KismetInputLibrary.Key_IsKeyboardKey(e) ||
            UE.KismetInputLibrary.Key_IsMouseButton(e)
          ? this.SwitchInputControllerType(0)
          : this.SwitchInputControllerType(2));
  }
  RefreshPlatformByDevice() {
    const e = this.GetCurrentDeviceControllerPlatform();
    return e !== 0 && (this.SwitchInputControllerType(1, e), !0);
  }
  GetCurrentDeviceControllerPlatform() {
    const t = UE.RawInputFunctionLibrary.GetRegisteredDevices();
    if (t)
      for (let e = 0; e < t.Num(); e++) {
        var r = t.Get(e);
        var r = r.VendorID + "_" + r.ProductID;
        var r = PlatformDefine_1.deviceIdMap.get(r);
        if (r) return r;
      }
    return 0;
  }
  IsPc() {
    return (
      this.PlatformType === 3 ||
      this.PlatformType === 4 ||
      this.PlatformType === 5
    );
  }
  IsMobile() {
    return this.PlatformType === 1 || this.PlatformType === 2;
  }
  IsGamepad() {
    return this.PlatformType === 6 || this.PlatformType === 7;
  }
  IsMobileSource() {
    return Info_1.Info.IsMobile();
  }
  get SourcePlatformType() {
    return Info_1.Info.PlatformType;
  }
  get OperationType() {
    return this.lQi;
  }
  get InputController() {
    return this._Qi;
  }
  GetPlatformName() {
    return UE.GameplayStatics.GetPlatformName();
  }
  IsInGamepad() {
    return this._Qi === 1;
  }
  IsInKeyBoard() {
    return this._Qi === 0;
  }
  GetNetStatus() {
    return this.IsMobile()
      ? UE.MobilePatchingLibrary.HasActiveWiFiConnection()
        ? Protocol_1.Aki.Protocol.D2s.Proto_Wifi
        : UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
            NetworkDefine_1.ENetworkType.Cell
          ? Protocol_1.Aki.Protocol.D2s.Proto_Stream
          : Protocol_1.Aki.Protocol.D2s.Proto_Other
      : this.IsPc()
        ? Protocol_1.Aki.Protocol.D2s.Proto_Wired
        : Protocol_1.Aki.Protocol.D2s.Proto_Other;
  }
  IsKeyFromGamepadKey(e) {
    return (
      !e.KeyName.toString().includes("Android") &&
      UE.KismetInputLibrary.Key_IsGamepadKey(e)
    );
  }
}
exports.PlatformModel = PlatformModel;
// # sourceMappingURL=PlatformModel.js.map
