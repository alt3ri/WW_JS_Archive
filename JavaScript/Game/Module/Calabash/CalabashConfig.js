"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const CalabashDevelopConditionById_1 = require("../../../Core/Define/ConfigQuery/CalabashDevelopConditionById");
const CalabashDevelopRewardAll_1 = require("../../../Core/Define/ConfigQuery/CalabashDevelopRewardAll");
const CalabashDevelopRewardByMonsterId_1 = require("../../../Core/Define/ConfigQuery/CalabashDevelopRewardByMonsterId");
const CalabashLevelAll_1 = require("../../../Core/Define/ConfigQuery/CalabashLevelAll");
const CalabashLevelByLevel_1 = require("../../../Core/Define/ConfigQuery/CalabashLevelByLevel");
const ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById");
const MonsterInfoById_1 = require("../../../Core/Define/ConfigQuery/MonsterInfoById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class CalabashConfig extends ConfigBase_1.ConfigBase {
  GetCalabashConfigByLevel(e) {
    const a = CalabashLevelByLevel_1.configCalabashLevelByLevel.GetConfig(e);
    if (a) return a;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Calabash", 11, "获取鸣域终端配置失败，请检查配置表", [
        "level",
        e,
      ]);
  }
  GetCalabashConfigList() {
    return CalabashLevelAll_1.configCalabashLevelAll.GetConfigList();
  }
  GetCalabashQuality(e) {
    return this.GetCalabashConfigByLevel(e).QualityDescription;
  }
  GetCalabashDevelopList() {
    return CalabashDevelopRewardAll_1.configCalabashDevelopRewardAll.GetConfigList();
  }
  GetCalabashDevelopRewardByMonsterId(e) {
    const a =
      CalabashDevelopRewardByMonsterId_1.configCalabashDevelopRewardByMonsterId.GetConfig(
        e,
      );
    return (
      a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Calabash",
            11,
            "获取鸣域终端养成奖励配置失败, 请检查配置表",
            ["MonsterId", e],
          )),
      a
    );
  }
  GetMonsterNameByMonsterId(e) {
    (e = this.GetCalabashDevelopRewardByMonsterId(e).MonsterInfoId),
      (e = MonsterInfoById_1.configMonsterInfoById.GetConfig(e));
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "";
  }
  GetCalabashConditionById(e) {
    const a =
      CalabashDevelopConditionById_1.configCalabashDevelopConditionById.GetConfig(
        e,
      );
    return (
      a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Calabash",
            11,
            "获取鸣域终端养成条件配置失败, 请检查配置表",
            ["id", e],
          )),
      a
    );
  }
  GetCalabashConditionExp(e) {
    return this.GetCalabashConditionRewardExp(this.GetCalabashConditionById(e));
  }
  GetCalabashConditionRewardExp(e) {
    let a;
    var e = e?.RewardExp;
    return !e ||
      (a =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "CalabashExpItemId",
        ) ?? 0) === 0
      ? 0
      : e.get(a) ?? 0;
  }
  GetCalabashMaxLevel() {
    let e = 0;
    for (const a of this.GetCalabashConfigList()) e < a.Level && (e = a.Level);
    return e;
  }
  GetConditionInfo(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
  get MaxTipCd() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionUnlockDisplayTime",
    );
  }
  get DelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionUnlockDelayTime",
    );
  }
  GetIntensifyCaptureGuarantee() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "IntensifyCaptureGuarantee",
    );
  }
}
exports.CalabashConfig = CalabashConfig;
// # sourceMappingURL=CalabashConfig.js.map
