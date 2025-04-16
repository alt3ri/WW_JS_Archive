"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputKey = void 0);
const UE = require("ue"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputKeyUtils_1 = require("../InputKeyUtils");
class InputKey {
  constructor(t) {
    (this.HEe = ""),
      (this.IsKeyboardKey = !1),
      (this.IsModifierKey = !1),
      (this.IsGamepadKey = !1),
      (this.IsPcPsTouchPadKey = !1),
      (this.IsMouseButton = !1),
      (this.IsDigital = !1),
      (this.IsAnalog = !1),
      (this.IsButtonAxis = !1),
      (this.IsAxis1D = !1),
      (this.IsAxis2D = !1),
      (this.IsAxis3D = !1),
      (this.jEe = void 0),
      (this.HEe = t),
      (this.jEe = new UE.Key(new UE.FName(t))),
      (this.IsKeyboardKey =
        UE.KismetInputLibrary.Key_IsKeyboardKey(this.jEe) ||
        "Keyboard_Invalid" === t),
      (this.IsModifierKey = UE.KismetInputLibrary.Key_IsModifierKey(this.jEe)),
      (this.IsGamepadKey =
        UE.KismetInputLibrary.Key_IsGamepadKey(this.jEe) ||
        "Gamepad_Invalid" === t),
      (this.IsMouseButton = UE.KismetInputLibrary.Key_IsMouseButton(this.jEe)),
      (this.IsDigital = UE.KismetInputLibrary.Key_IsDigital(this.jEe)),
      (this.IsAnalog = UE.KismetInputLibrary.Key_IsAnalog(this.jEe)),
      (this.IsButtonAxis = UE.KismetInputLibrary.Key_IsButtonAxis(this.jEe)),
      (this.IsAxis1D = UE.KismetInputLibrary.Key_IsAxis1D(this.jEe)),
      (this.IsAxis2D = UE.KismetInputLibrary.Key_IsAxis2D(this.jEe)),
      (this.IsAxis3D = UE.KismetInputLibrary.Key_IsAxis3D(this.jEe)),
      (this.IsPcPsTouchPadKey = "GenericUSBController_Button14" === t);
  }
  GetKeyName() {
    return this.HEe;
  }
  ToUeKey() {
    return this.jEe;
  }
  GetConfig() {
    return this.IsKeyboardKey || this.IsMouseButton
      ? ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfig(
          this.HEe,
        )
      : this.IsGamepadKey
        ? ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(
            this.HEe,
          )
        : void 0;
  }
  GetKeyIconPath() {
    return this.IsKeyboardKey || this.IsMouseButton
      ? (ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfig(
          this.HEe,
        )?.KeyIconPath ?? "")
      : this.IsGamepadKey
        ? InputKeyUtils_1.InputKeyUtils.GetGamepadKeyIconPath(this.HEe)
        : "";
  }
  IsInputKeyDown() {
    return Global_1.Global.CharacterController.IsInputKeyDown(this.ToUeKey());
  }
  GetInputAnalogKeyState() {
    return Global_1.Global.CharacterController.GetInputAnalogKeyState(
      this.ToUeKey(),
    );
  }
}
exports.InputKey = InputKey;
//# sourceMappingURL=InputKey.js.map
