"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformModel = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  MobileSwitchInputController_1 = require("../../Ui/Input/Moblie/MobileSwitchInputController"),
  LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
  PlatformDefine_1 = require("./PlatformDefine");
class PlatformModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LastGamepadAttachedState = !1),
      (this.Iya = (e, t) => {
        this.nEa(),
          this.sEa(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.InputControllerChange,
            e,
            t,
          );
      }),
      (this.Tya = (e, t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ShowTypeChange,
          e,
          t,
        );
      }),
      (this.Lya = (e, t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.InputControllerMainTypeChange,
          e,
          t,
        );
      }),
      (this.aY_ = () => {
        this.sEa();
      });
  }
  OnInit() {
    return (
      Info_1.Info.SetInputTypeChangeFunc(this.Iya),
      Info_1.Info.SetShowTypeChangeFunc(this.Tya),
      Info_1.Info.SetInputMainTypeChangeFunc(this.Lya),
      this.nEa(),
      this.sEa(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InitializeLguiEventSystemActor,
        this.aY_,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InitializeLguiEventSystemActor,
        this.aY_,
      ),
      Info_1.Info.ClearInputTypeChangeFunc(),
      Info_1.Info.ClearShowTypeChangeFunc(),
      Info_1.Info.ClearInputMainTypeChangeFunc(),
      !0
    );
  }
  nEa() {
    Info_1.Info.IsInGamepad()
      ? AudioSystem_1.AudioSystem.SetState("input_controller_type", "gamepad")
      : Info_1.Info.IsInKeyBoard()
        ? AudioSystem_1.AudioSystem.SetState(
            "input_controller_type",
            "Keyboard",
          )
        : AudioSystem_1.AudioSystem.SetState("input_controller_type", "touch");
  }
  sEa() {
    let e = 0;
    Info_1.Info.IsInKeyBoard()
      ? (e = 1)
      : Info_1.Info.IsInGamepad()
        ? (e = 2)
        : Info_1.Info.IsInTouch() && (e = 3);
    var t =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    t?.IsValid() && t.SetCurrentInputKeyType(e),
      UE.BasePlayerController.SetUseSonyGamepadState(Info_1.Info.IsPsGamepad());
  }
  cWa() {
    var t = UE.RawInputFunctionLibrary.GetRegisteredDevices();
    if (!t || 0 === t.Num()) return 0;
    for (let e = 0; e < t.Num(); e++) {
      var r = t.Get(e),
        r = r.VendorID + "_" + r.ProductID,
        r = PlatformDefine_1.deviceIdMap.get(r);
      if (r) return r;
    }
    return 2;
  }
  zu_() {
    var e = CloudGameManager_1.CloudGameManager.CloudGamePadInfo;
    return void 0 === e
      ? 0
      : ((e = e.VendorId + "_" + e.ProductId),
        PlatformDefine_1.deviceIdMap.get(e) || 2);
  }
  mWa(e) {
    this.IsKeyFromGamepadKey(e.KeyName.toString()) &&
      ((e = this.GetCurrentDeviceInputController())
        ? MobileSwitchInputController_1.MobileSwitchInputController.SwitchToGamepad(
            e,
            "PressAnyKey",
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MobileInputSwitch",
            10,
            "有手柄按钮输入但是识别不到对应的手柄设备",
          ));
  }
  dWa(e) {
    UE.KismetInputLibrary.Key_IsGamepadKey(e)
      ? this.RefreshPlatformByDevice("PressAnyKey") ||
        Info_1.Info.SwitchInputControllerType(2, "PressAnyKey")
      : UE.KismetInputLibrary.Key_IsKeyboardKey(e) ||
          UE.KismetInputLibrary.Key_IsMouseButton(e)
        ? Info_1.Info.SwitchInputControllerType(1, "PressAnyKey")
        : Info_1.Info.SwitchInputControllerType(5, "PressAnyKey");
  }
  OnPressAnyKey(e) {
    Info_1.Info.IsMobileInputModel() ? this.mWa(e) : this.dWa(e);
  }
  RefreshPlatformByDevice(e) {
    if (Info_1.Info.IsPs5Platform())
      return Info_1.Info.SwitchInputControllerType(4, e), !0;
    if (CloudGameManager_1.CloudGameManager.IsCloudGame)
      return (
        0 !== (t = this.zu_()) &&
        (Info_1.Info.SwitchInputControllerType(t, e), !0)
      );
    if (Info_1.Info.IsPcPlatform()) {
      var t = this.cWa();
      if (0 !== t) return Info_1.Info.SwitchInputControllerType(t, e), !0;
    }
    return !1;
  }
  GetNetStatus() {
    return Info_1.Info.IsMobilePlatform()
      ? UE.MobilePatchingLibrary.HasActiveWiFiConnection()
        ? Protocol_1.Aki.Protocol.yNs.Proto_Wifi
        : UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
            NetworkDefine_1.ENetworkType.Cell
          ? Protocol_1.Aki.Protocol.yNs.Proto_Stream
          : Protocol_1.Aki.Protocol.yNs.Proto_Other
      : Info_1.Info.IsPcOrGamepadPlatform()
        ? Protocol_1.Aki.Protocol.yNs.Proto_Wired
        : Protocol_1.Aki.Protocol.yNs.Proto_Other;
  }
  IsKeyFromGamepadKey(e) {
    return (
      !e.includes("Android") && InputSettings_1.InputSettings.IsGamepadKey(e)
    );
  }
  GetCurrentDeviceInputController() {
    var e;
    return Platform_1.Platform.IsPcPlatform()
      ? CloudGameManager_1.CloudGameManager.IsCloudGame
        ? this.GetCloudGameInputController()
        : this.cWa()
      : ((e = UE.KismetSystemLibrary.GetCurrentActiveGamepadName()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MobileInputSwitch", 10, "当前激活的手柄", [
            "设备名",
            e,
          ]),
        Platform_1.Platform.IsAndroidPlatform()
          ? "None" === e
            ? 0
            : PlatformDefine_1.deviceIdMap.get(e) || 2
          : Platform_1.Platform.IsIOSPlatform()
            ? e.includes("Xbox")
              ? 2
              : e.includes("DualShock")
                ? 4
                : e.includes("BackBoneOne")
                  ? 6
                  : 0
            : 0);
  }
  IsGamepadAttached() {
    return Platform_1.Platform.IsPcPlatform()
      ? Platform_1.Platform.CloudGamePlatform
        ? 0 !== this.zu_()
        : 0 !== this.cWa()
      : UE.KismetSystemLibrary.IsGamepadAttached();
  }
  GetCloudGameInputController() {
    var e = this.zu_();
    return 0 !== e
      ? e
      : "Mac" === Platform_1.Platform.CloudGamePlatform ||
          "Windows" == Platform_1.Platform.CloudGamePlatform
        ? 1
        : 5;
  }
}
exports.PlatformModel = PlatformModel;
//# sourceMappingURL=PlatformModel.js.map
