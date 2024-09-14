"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsConfig = void 0);
const DeviceRenderFeatureByDeviceId_1 = require("../../Core/Define/ConfigQuery/DeviceRenderFeatureByDeviceId"),
  ConfigBase_1 = require("../../Core/Framework/ConfigBase");
class GameSettingsConfig extends ConfigBase_1.ConfigBase {
  GetDeviceRenderFeatureConfigListByDeviceId(e) {
    return DeviceRenderFeatureByDeviceId_1.configDeviceRenderFeatureByDeviceId.GetConfigList(
      e,
    );
  }
}
exports.GameSettingsConfig = GameSettingsConfig;
//# sourceMappingURL=GameSettingsConfig.js.map
