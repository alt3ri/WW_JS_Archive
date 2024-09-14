"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResolutionMenuData = void 0);
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender"),
  MenuData_1 = require("../MenuData");
class ResolutionMenuData extends MenuData_1.MenuData {
  OnInitialize(e) {
    (this.RelationFuncIds = [5]), (this.OptionsValueListInternal = []);
    for (
      let e = 0;
      e <
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionList()
        .length;
      e++
    )
      this.OptionsValueListInternal.push(e);
  }
}
exports.ResolutionMenuData = ResolutionMenuData;
//# sourceMappingURL=ResolutionMenuData.js.map
