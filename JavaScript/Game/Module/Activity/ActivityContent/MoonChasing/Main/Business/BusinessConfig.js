"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessConfig = void 0);
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  CharacterById_1 = require("../../../../../../../Core/Define/ConfigQuery/CharacterById"),
  EntrustFinishDialogByEntrustIdAndLevel_1 = require("../../../../../../../Core/Define/ConfigQuery/EntrustFinishDialogByEntrustIdAndLevel"),
  EntrustRoleAll_1 = require("../../../../../../../Core/Define/ConfigQuery/EntrustRoleAll"),
  EntrustRoleById_1 = require("../../../../../../../Core/Define/ConfigQuery/EntrustRoleById"),
  EntrustTypeById_1 = require("../../../../../../../Core/Define/ConfigQuery/EntrustTypeById"),
  EvaluateById_1 = require("../../../../../../../Core/Define/ConfigQuery/EvaluateById"),
  PopularityAll_1 = require("../../../../../../../Core/Define/ConfigQuery/PopularityAll"),
  RoleDevelopCurveByGroupId_1 = require("../../../../../../../Core/Define/ConfigQuery/RoleDevelopCurveByGroupId"),
  RoleDevelopTypeById_1 = require("../../../../../../../Core/Define/ConfigQuery/RoleDevelopTypeById"),
  TrackMoonEntrustById_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonEntrustById"),
  TrainRoleDialogByRoleIdAndTrainType_1 = require("../../../../../../../Core/Define/ConfigQuery/TrainRoleDialogByRoleIdAndTrainType"),
  ConfigBase_1 = require("../../../../../../../Core/Framework/ConfigBase");
class BusinessConfig extends ConfigBase_1.ConfigBase {
  GetDelegationConfig(e) {
    return TrackMoonEntrustById_1.configTrackMoonEntrustById.GetConfig(e);
  }
  GetEvaluateByLevel(e) {
    return EvaluateById_1.configEvaluateById.GetConfig(e);
  }
  GetCharacterConfig(e) {
    return CharacterById_1.configCharacterById.GetConfig(e);
  }
  GetEntrustRoleById(e) {
    return EntrustRoleById_1.configEntrustRoleById.GetConfig(e);
  }
  GetEntrustRoleAll() {
    return EntrustRoleAll_1.configEntrustRoleAll.GetConfigList();
  }
  GetPopularityAll() {
    return PopularityAll_1.configPopularityAll.GetConfigList();
  }
  GetRoleDevelopCurveByGroupId(e) {
    return RoleDevelopCurveByGroupId_1.configRoleDevelopCurveByGroupId.GetConfigList(
      e,
    );
  }
  GetEntrustFinishDialogByIdAndLevel(e, r) {
    return EntrustFinishDialogByEntrustIdAndLevel_1.configEntrustFinishDialogByEntrustIdAndLevel.GetConfig(
      e,
      r,
    );
  }
  GetEntrustTypeById(e) {
    return EntrustTypeById_1.configEntrustTypeById.GetConfig(e);
  }
  GetTrainRoleDialogByIdAndType(e, r) {
    return TrainRoleDialogByRoleIdAndTrainType_1.configTrainRoleDialogByRoleIdAndTrainType.GetConfig(
      e,
      r,
    );
  }
  GetRoleDevelopTypeById(e) {
    return RoleDevelopTypeById_1.configRoleDevelopTypeById.GetConfig(e);
  }
  GetPowerItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonFiestaEnergyItemId",
    );
  }
  GetCoinItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonFiestaCoinItemId",
    );
  }
  GetWishItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonFiestaWishItemId",
    );
  }
  GetPopularityItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonFiestaPopularityItemId",
    );
  }
  GetTokenItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonFiestaTokenItemId",
    );
  }
  GetTipsCommonRoleIcon() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "MoonFiestaHintRole",
    );
  }
  GetSkipAnimDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonChasingBusinessSkipAnimDelayTime",
    );
  }
  GetEntrustScoreMax() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonChasingEntrustScoreMax",
    );
  }
  GetRoleCharacterMax() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MoonChasingRoleCharacterMax",
    );
  }
}
exports.BusinessConfig = BusinessConfig;
//# sourceMappingURL=BusinessConfig.js.map
