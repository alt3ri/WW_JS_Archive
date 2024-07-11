"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformModel = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
  PlatformDefine_1 = require("./PlatformDefine");
class PlatformModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CMa = (e, t) => {
        this.iga(),
          this.rga(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.InputControllerChange,
            e,
            t,
          );
      }),
      (this.gMa = (e, t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ShowTypeChange,
          e,
          t,
        );
      }),
      (this.fMa = (e, t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.InputControllerMainTypeChange,
          e,
          t,
        );
      });
  }
  OnInit() {
    return (
      Info_1.Info.SetInputTypeChangeFunc(this.CMa),
      Info_1.Info.SetShowTypeChangeFunc(this.gMa),
      Info_1.Info.SetInputMainTypeChangeFunc(this.fMa),
      this.iga(),
      this.rga(),
      !0
    );
  }
  OnClear() {
    return (
      Info_1.Info.ClearInputTypeChangeFunc(),
      Info_1.Info.ClearShowTypeChangeFunc(),
      Info_1.Info.ClearInputMainTypeChangeFunc(),
      !0
    );
  }
  iga() {
    Info_1.Info.IsInGamepad()
      ? AudioSystem_1.AudioSystem.SetState("input_controller_type", "gamepad")
      : Info_1.Info.IsInKeyBoard()
        ? AudioSystem_1.AudioSystem.SetState(
            "input_controller_type",
            "Keyboard",
          )
        : AudioSystem_1.AudioSystem.SetState("input_controller_type", "touch");
  }
  rga() {
    let e = 0;
    Info_1.Info.IsInKeyBoard()
      ? (e = 1)
      : Info_1.Info.IsInGamepad()
        ? (e = 2)
        : Info_1.Info.IsInTouch() && (e = 3);
    var t =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    t?.IsValid() && t.SetCurrentInputKeyType(e);
  }
  bfa() {
    var t = UE.RawInputFunctionLibrary.GetRegisteredDevices();
    if (t && 0 !== t.Num()) {
      for (let e = 0; e < t.Num(); e++) {
        var r = t.Get(e),
          r = r.VendorID + "_" + r.ProductID,
          r = PlatformDefine_1.deviceIdMap.get(r);
        if (r) return r;
      }
      return 2;
    }
  }
  OnPressAnyKey(e) {
    Info_1.Info.IsMobilePlatform() ||
      (UE.KismetInputLibrary.Key_IsGamepadKey(e)
        ? this.RefreshPlatformByDevice("PressAnyKey") ||
          Info_1.Info.SwitchInputControllerType(2, "PressAnyKey")
        : UE.KismetInputLibrary.Key_IsKeyboardKey(e) ||
            UE.KismetInputLibrary.Key_IsMouseButton(e)
          ? Info_1.Info.SwitchInputControllerType(1, "PressAnyKey")
          : Info_1.Info.SwitchInputControllerType(5, "PressAnyKey"));
  }
  RefreshPlatformByDevice(e) {
    if (Info_1.Info.IsPs5Platform())
      return Info_1.Info.SwitchInputControllerType(4, e), !0;
    if (Info_1.Info.IsPcPlatform()) {
      var t = this.bfa();
      if (t) return Info_1.Info.SwitchInputControllerType(t, e), !0;
    }
    return !1;
  }
  GetPlatformName() {
    return UE.GameplayStatics.GetPlatformName();
  }
  GetNetStatus() {
    return Info_1.Info.IsMobilePlatform()
      ? UE.MobilePatchingLibrary.HasActiveWiFiConnection()
        ? Protocol_1.Aki.Protocol.gNs.Proto_Wifi
        : UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
            NetworkDefine_1.ENetworkType.Cell
          ? Protocol_1.Aki.Protocol.gNs.Proto_Stream
          : Protocol_1.Aki.Protocol.gNs.Proto_Other
      : Info_1.Info.IsPcOrGamepadPlatform()
        ? Protocol_1.Aki.Protocol.gNs.Proto_Wired
        : Protocol_1.Aki.Protocol.gNs.Proto_Other;
  }
  IsKeyFromGamepadKey(e) {
    return (
      !e.KeyName.toString().includes("Android") &&
      UE.KismetInputLibrary.Key_IsGamepadKey(e)
    );
  }
}
exports.PlatformModel = PlatformModel;
//# sourceMappingURL=PlatformModel.js.map
