"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const SynthesisFormulaByFormulaItemId_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaByFormulaItemId");
const SynthesisFormulaByFormulaType_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaByFormulaType");
const SynthesisFormulaById_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaById");
const SynthesisLevelAll_1 = require("../../../../Core/Define/ConfigQuery/SynthesisLevelAll");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ComposeConfig extends ConfigBase_1.ConfigBase {
  GetLocalText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetSynthesisFormulaByFormulaItemId(e) {
    const o =
      SynthesisFormulaByFormulaItemId_1.configSynthesisFormulaByFormulaItemId.GetConfig(
        e,
      );
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Compose",
            50,
            "合成配方获取失败，请检查合成配方配置表是否正确",
            ["FormulaItemId=", e],
          )),
      o
    );
  }
  GetSynthesisFormulaById(e) {
    const o = SynthesisFormulaById_1.configSynthesisFormulaById.GetConfig(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Compose",
            50,
            "合成配方获取失败，请检查合成配方配置表是否正确",
            ["Id=", e],
          )),
      o
    );
  }
  GetComposeListByType(e) {
    const o =
      SynthesisFormulaByFormulaType_1.configSynthesisFormulaByFormulaType.GetConfigList(
        e,
      );
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Compose",
            50,
            "获取对应类型合成数据失败，请检查合成配方配置表是否正确",
            ["FormulaType=", e],
          )),
      o
    );
  }
  GetComposeLevel() {
    const e = SynthesisLevelAll_1.configSynthesisLevelAll.GetConfigList();
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Compose", 50, "获取制药证书相关配置失败")),
      e
    );
  }
  GetConditionInfo(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
}
exports.ComposeConfig = ComposeConfig;
// # sourceMappingURL=ComposeConfig.js.map
