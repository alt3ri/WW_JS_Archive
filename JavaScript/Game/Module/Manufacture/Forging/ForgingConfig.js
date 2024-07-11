"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ForgeFormulaAll_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaAll"),
  ForgeFormulaByFormulaItemId_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaByFormulaItemId"),
  ForgeFormulaById_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaById"),
  ForgeFormulaByTypeId_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaByTypeId"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ForgingConfig extends ConfigBase_1.ConfigBase {
  GetLocalText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetForgeFormulaByFormulaItemId(e) {
    var r =
      ForgeFormulaByFormulaItemId_1.configForgeFormulaByFormulaItemId.GetConfig(
        e,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Forging",
            50,
            "锻造配方获取失败，请检查锻造配方配置表是否正确",
            ["FormulaItemId=", e],
          )),
      r
    );
  }
  GetForgeFormulaById(e) {
    var r = ForgeFormulaById_1.configForgeFormulaById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Forging",
            50,
            "锻造配方获取失败，请检查锻造配方配置表是否正确",
            ["Id=", e],
          )),
      r
    );
  }
  GetForgeList() {
    var e = ForgeFormulaAll_1.configForgeFormulaAll.GetConfigList();
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Forging",
            50,
            "获取对应类型锻造数据列表失败，请检查锻造配方配置表是否正确",
          )),
      e
    );
  }
  GetForgeListByType(e) {
    var r = ForgeFormulaByTypeId_1.configForgeFormulaByTypeId.GetConfigList(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Forging",
            50,
            "获取对应类型锻造数据失败，请检查锻造配方配置表是否正确",
            ["TypeId=", e],
          )),
      r
    );
  }
}
exports.ForgingConfig = ForgingConfig;
//# sourceMappingURL=ForgingConfig.js.map
