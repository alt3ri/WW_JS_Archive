"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HighestFpsMenuData = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender"),
  MenuData_1 = require("../MenuData");
class HighestFpsMenuData extends MenuData_1.MenuData {
  OnInitialize(e) {
    Info_1.Info.IsPcOrGamepadPlatform() &&
      !GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsFrameRate120Device() &&
      (this.OptionsNameListInternal.pop(), this.OptionsValueListInternal.pop());
  }
}
exports.HighestFpsMenuData = HighestFpsMenuData;
//# sourceMappingURL=HighestFpsMenuData.js.map
