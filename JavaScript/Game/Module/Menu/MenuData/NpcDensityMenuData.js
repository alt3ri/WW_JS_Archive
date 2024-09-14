"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcDensityMenuData = void 0);
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender"),
  MenuData_1 = require("../MenuData");
class NpcDensityMenuData extends MenuData_1.MenuData {
  constructor() {
    super(...arguments), (this.pZa = []), (this.vZa = []);
  }
  OnInitialize(e) {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsLowMemoryDevice()
      ? ((this.vZa = e.OptionsValue.slice(
          0,
          GameSettingsDefine_1.NPC_DENSITY_THRESHOLD + 1,
        )),
        (this.pZa = e.OptionsName.slice(
          0,
          GameSettingsDefine_1.NPC_DENSITY_THRESHOLD + 1,
        )))
      : ((this.vZa = e.OptionsValue), (this.pZa = e.OptionsName));
  }
  get OptionsNameList() {
    return this.pZa;
  }
  get OptionsValueList() {
    return this.vZa;
  }
}
exports.NpcDensityMenuData = NpcDensityMenuData;
//# sourceMappingURL=NpcDensityMenuData.js.map
