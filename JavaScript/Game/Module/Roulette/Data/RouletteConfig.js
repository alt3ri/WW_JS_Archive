"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteConfig = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ExploreRouletteAll_1 = require("../../../../Core/Define/ConfigQuery/ExploreRouletteAll"),
  ExploreRouletteReplaceAll_1 = require("../../../../Core/Define/ConfigQuery/ExploreRouletteReplaceAll"),
  ExploreRouletteReplaceById_1 = require("../../../../Core/Define/ConfigQuery/ExploreRouletteReplaceById"),
  ExploreToolsAll_1 = require("../../../../Core/Define/ConfigQuery/ExploreToolsAll"),
  ExploreToolsByPhantomSkillId_1 = require("../../../../Core/Define/ConfigQuery/ExploreToolsByPhantomSkillId"),
  FuncMenuReplaceAll_1 = require("../../../../Core/Define/ConfigQuery/FuncMenuReplaceAll"),
  FuncMenuReplaceInstSubType_1 = require("../../../../Core/Define/ConfigQuery/FuncMenuReplaceInstSubType"),
  FuncMenuWheelAll_1 = require("../../../../Core/Define/ConfigQuery/FuncMenuWheelAll"),
  FuncMenuWheelByFuncId_1 = require("../../../../Core/Define/ConfigQuery/FuncMenuWheelByFuncId"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class RouletteConfig extends ConfigBase_1.ConfigBase {
  GetExploreConfigById(e) {
    return ExploreToolsByPhantomSkillId_1.configExploreToolsByPhantomSkillId.GetConfig(
      e,
    );
  }
  GetExploreRouletteConfig() {
    return ExploreRouletteAll_1.configExploreRouletteAll.GetConfigList() ?? [];
  }
  GetAllReplaceConfig() {
    return (
      ExploreRouletteReplaceAll_1.configExploreRouletteReplaceAll.GetConfigList() ??
      []
    );
  }
  GetReplaceConfigById(e) {
    return ExploreRouletteReplaceById_1.configExploreRouletteReplaceById.GetConfig(
      e,
    );
  }
  GetFuncConfigById(e) {
    return FuncMenuWheelByFuncId_1.configFuncMenuWheelByFuncId.GetConfig(e);
  }
  GetAllExploreConfig() {
    return ExploreToolsAll_1.configExploreToolsAll.GetConfigList();
  }
  GetAllFuncConfig() {
    return FuncMenuWheelAll_1.configFuncMenuWheelAll.GetConfigList();
  }
  GetFuncReplaceConfig(e) {
    return FuncMenuReplaceInstSubType_1.configFuncMenuReplaceInstSubType.GetConfig(
      e,
    );
  }
  GetAllFuncReplaceConfig() {
    return FuncMenuReplaceAll_1.configFuncMenuReplaceAll.GetConfigList() ?? [];
  }
  GetNameByPhantomSkillId(e) {
    e =
      ExploreToolsByPhantomSkillId_1.configExploreToolsByPhantomSkillId.GetConfig(
        e,
      );
    if (e) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
  }
  GetCostByPhantomSkillId(e) {
    e =
      ExploreToolsByPhantomSkillId_1.configExploreToolsByPhantomSkillId.GetConfig(
        e,
      );
    if (e) return e.Cost;
  }
  GetTreasureBoxDetectorPlaceLimit() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "TreasureBoxDetectionMaxNum",
      ) ?? 0
    );
  }
  GetTempTeleporterPlaceLimit() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "TemporaryTeleportCountLimit",
      ) ?? 0
    );
  }
  GetSoundBoxPlaceLimit() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "SoundBoxUseTimes",
      ) ?? 0
    );
  }
}
exports.RouletteConfig = RouletteConfig;
//# sourceMappingURL=RouletteConfig.js.map
