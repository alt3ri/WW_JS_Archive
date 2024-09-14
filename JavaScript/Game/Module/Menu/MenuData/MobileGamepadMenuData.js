"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MobileGamepadMenuData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  MenuData_1 = require("../MenuData");
class MobileGamepadMenuData extends MenuData_1.MenuData {
  GetEnable() {
    return (
      1 ===
      ModelManager_1.ModelManager.MenuModel.GetGameSettingsHandleEditValue(137)
    );
  }
}
exports.MobileGamepadMenuData = MobileGamepadMenuData;
//# sourceMappingURL=MobileGamepadMenuData.js.map
