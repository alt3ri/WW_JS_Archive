"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputDevice = void 0);
const UE = require("ue"),
  Platform_1 = require("../Platform/Platform"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  dualSenseWirelessController = "1356_3302",
  dualSenseEdgeWirelessController = "1356_3570",
  dualShock4_Cuhzct1x = "1356_1476",
  dualShock4_Cuhzct2x = "1356_2508",
  xboxController = "1118_2834",
  xboxEliteSeries2Controller = "1118_2816",
  xboxOneController2015 = "1118_733",
  xboxOneWirelessController = "1118_736",
  xboxOneEliteController = "1118_739",
  xboxOneController = "1118_746",
  XboxOneSController = "1118_765",
  xboxWirelessAdapterForWindows = "1118_766",
  deviceIdMap = new Map([
    [dualSenseWirelessController, 3],
    [dualSenseEdgeWirelessController, 3],
    [dualShock4_Cuhzct1x, 3],
    [dualShock4_Cuhzct2x, 3],
    [xboxController, 2],
    [xboxEliteSeries2Controller, 2],
    [xboxOneController2015, 2],
    [xboxOneWirelessController, 2],
    [xboxOneEliteController, 2],
    [xboxOneController, 2],
    [XboxOneSController, 2],
    [xboxWirelessAdapterForWindows, 2],
  ]);
class InputDevice {
  static Initialize() {
    switch (Platform_1.Platform.Type) {
      case 1:
      case 2:
        InputDevice.f8o = 5;
        break;
      case 8:
      case 5:
      case 3:
        InputDevice.f8o = 1;
        break;
      case 9:
        InputDevice.f8o = 2;
        break;
      case 6:
        InputDevice.f8o = 3;
        break;
      case 7:
        InputDevice.f8o = 4;
        break;
      default:
        InputDevice.f8o = 1;
    }
    LauncherLog_1.LauncherLog.Info("[PlatformSdkNew]初始化输入类型", [
      "PlatformType",
      InputDevice.f8o,
    ]),
      Platform_1.Platform.IsPcPlatform() || InputDevice.Oba();
  }
  static cXi(e) {
    if (InputDevice.f8o !== e) {
      var t = InputDevice.f8o;
      (InputDevice.f8o = e),
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]设置输入方式",
          ["lastInputController", t],
          ["InputController", InputDevice.f8o],
        );
      for (const r of InputDevice.kba) r(t, e);
    }
  }
  static lEa() {
    var t = UE.RawInputFunctionLibrary.GetRegisteredDevices();
    if (t && 0 !== t.Num()) {
      for (let e = 0; e < t.Num(); e++) {
        var r = t.Get(e),
          r = r.VendorID + "_" + r.ProductID,
          r = deviceIdMap.get(r);
        if (r) return r;
      }
      return 2;
    }
  }
  static Oba() {
    if (Platform_1.Platform.IsPs5Platform()) return InputDevice.Nba(4), !0;
    if (Platform_1.Platform.IsPcPlatform()) {
      var e = InputDevice.lEa();
      if (e) return InputDevice.Nba(e), !0;
    }
    return !1;
  }
  static Nba(e) {
    InputDevice.cXi(e);
  }
  static SwitchInputControllerTypeByKey(e) {
    UE.KismetInputLibrary.Key_IsGamepadKey(e)
      ? InputDevice.Oba() || InputDevice.Nba(2)
      : UE.KismetInputLibrary.Key_IsKeyboardKey(e) ||
          UE.KismetInputLibrary.Key_IsMouseButton(e)
        ? InputDevice.Nba(1)
        : InputDevice.Nba(5);
  }
  static SwitchInputControllerTypeByMouseMove() {
    InputDevice.Nba(1);
  }
  static RegisterInputChangeDelegate(e) {
    InputDevice.kba.add(e);
  }
  static UnRegisterInputChangeDelegate(e) {
    InputDevice.kba.delete(e);
  }
  static IsInKeyBoard() {
    return 1 === InputDevice.f8o;
  }
  static IsInTouch() {
    return 5 === InputDevice.f8o;
  }
  static IsInGamepad() {
    return InputDevice.IsPsGamepad() || InputDevice.IsXboxGamepad();
  }
  static IsPsGamepad() {
    return 3 === InputDevice.f8o || 4 === InputDevice.f8o;
  }
  static IsXboxGamepad() {
    return 2 === InputDevice.f8o;
  }
}
((exports.InputDevice = InputDevice).f8o = void 0),
  (InputDevice.kba = new Set());
//# sourceMappingURL=InputDevice.js.map
