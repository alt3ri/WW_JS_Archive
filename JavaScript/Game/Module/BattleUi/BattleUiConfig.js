"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const BasePropertyById_1 = require("../../../Core/Define/ConfigQuery/BasePropertyById");
const ElementInfoById_1 = require("../../../Core/Define/ConfigQuery/ElementInfoById");
const GamepadKeyByKeyName_1 = require("../../../Core/Define/ConfigQuery/GamepadKeyByKeyName");
const PcKeyByKeyName_1 = require("../../../Core/Define/ConfigQuery/PcKeyByKeyName");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class BattleUiConfig extends ConfigBase_1.ConfigBase {
  GetHardnessPercentList() {
    const e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "HardnessPercentStage1",
    );
    const r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "HardnessPercentStage2",
    );
    const a = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "HardnessPercentStage3",
    );
    return [
      CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "HardnessPercentStage4",
      ),
      a,
      r,
      e,
    ];
  }
  GetElementConfig(e) {
    return ElementInfoById_1.configElementInfoById.GetConfig(e);
  }
  GetBufferAnimationSpeed() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "BossHPAttenuateBufferSpeed",
    );
  }
  GetPcKeyConfig(e) {
    return PcKeyByKeyName_1.configPcKeyByKeyName.GetConfig(e);
  }
  GetGamePadKeyConfig(e) {
    return GamepadKeyByKeyName_1.configGamepadKeyByKeyName.GetConfig(e);
  }
  GetPropertyType(e) {
    return BasePropertyById_1.configBasePropertyById.GetConfig(e)
      .ElementPropertyType;
  }
  GetThreadColor(e, r) {
    if (r === 0 || r === 2)
      return ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor3;
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleListHighestLevel();
    const a = ModelManager_1.ModelManager.BattleUiModel.ThreatLevel1;
    const n = ModelManager_1.ModelManager.BattleUiModel.ThreatLevel3;
    let o = void 0;
    r -= e;
    return (o =
      a <= r
        ? ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor3
        : r < a && n <= r
          ? ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor2
          : ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor1);
  }
}
exports.BattleUiConfig = BattleUiConfig;
// # sourceMappingURL=BattleUiConfig.js.map
