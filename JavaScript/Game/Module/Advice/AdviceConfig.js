"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  AdviceConjunctionAll_1 = require("../../../Core/Define/ConfigQuery/AdviceConjunctionAll"),
  AdviceConjunctionById_1 = require("../../../Core/Define/ConfigQuery/AdviceConjunctionById"),
  AdviceParamsById_1 = require("../../../Core/Define/ConfigQuery/AdviceParamsById"),
  AdviceSentenceAll_1 = require("../../../Core/Define/ConfigQuery/AdviceSentenceAll"),
  AdviceSentenceById_1 = require("../../../Core/Define/ConfigQuery/AdviceSentenceById"),
  AdviceWordAll_1 = require("../../../Core/Define/ConfigQuery/AdviceWordAll"),
  AdviceWordById_1 = require("../../../Core/Define/ConfigQuery/AdviceWordById"),
  AdviceWordByType_1 = require("../../../Core/Define/ConfigQuery/AdviceWordByType"),
  AdviceWordTypeAll_1 = require("../../../Core/Define/ConfigQuery/AdviceWordTypeAll"),
  AdviceWordTypeById_1 = require("../../../Core/Define/ConfigQuery/AdviceWordTypeById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class AdviceConfig extends ConfigBase_1.ConfigBase {
  GetAdviceSentenceConfigs() {
    return AdviceSentenceAll_1.configAdviceSentenceAll.GetConfigList();
  }
  GetAdviceSentenceConfig(e) {
    return AdviceSentenceById_1.configAdviceSentenceById.GetConfig(e);
  }
  GetAdviceConjunctionConfigs() {
    return AdviceConjunctionAll_1.configAdviceConjunctionAll.GetConfigList();
  }
  GetAdviceConjunctionConfig(e) {
    return AdviceConjunctionById_1.configAdviceConjunctionById.GetConfig(e);
  }
  GetAdviceSpecialParams(e) {
    return AdviceParamsById_1.configAdviceParamsById.GetConfig(e);
  }
  GetAdviceSpecialParamsContent(e) {
    e = this.GetAdviceSpecialParams(e);
    if (e)
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Content);
  }
  GetAdviceWordConfigs() {
    return AdviceWordAll_1.configAdviceWordAll.GetConfigList();
  }
  GetAdviceWordConfigsByType(e) {
    return AdviceWordByType_1.configAdviceWordByType.GetConfigList(e);
  }
  GetAdviceWordConfig(e) {
    return AdviceWordById_1.configAdviceWordById.GetConfig(e);
  }
  GetAdviceMotionDefaultConfigId() {
    return -1;
  }
  GetAdviceWordTypeConfigs() {
    return AdviceWordTypeAll_1.configAdviceWordTypeAll.GetConfigList();
  }
  GetAdviceWordTypeConfig(e) {
    return AdviceWordTypeById_1.configAdviceWordTypeById.GetConfig(e);
  }
  GetAdviceWordType(e) {
    return this.GetAdviceWordConfig(e)?.Type;
  }
  GetAdviceSentenceText(e) {
    e = this.GetAdviceSentenceConfig(e);
    if (e) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Text);
  }
  GetAdviceConjunctionText(e) {
    e = this.GetAdviceConjunctionConfig(e);
    if (e) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Text);
  }
  GetAdviceWordText(e) {
    e = this.GetAdviceWordConfig(e);
    if (e) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Text);
  }
  GetAdviceTypeText(e) {
    e = this.GetAdviceWordTypeConfig(e);
    if (e) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Name);
  }
  GetAdviceViewCloseDistance() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "CloseAdviceViewEntityDistance",
      ) ?? 0
    );
  }
  GetAdviceInteractText() {
    var e = this.GetAdviceSpecialParams(-2);
    if (e) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Title);
  }
  GetAdviceDefaultModelConfigId() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "AdviceInteractDefaultModel",
      ) ?? 0
    );
  }
  GetAdviceHighNum() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig("AdviceHighNum") ?? 0
    );
  }
  GetAdviceLikeShowMax() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig("AdviceShowMax") ?? 0
    );
  }
  GetAdviceDefaultModelConfig() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig("AdviceShowModel") ??
      0
    );
  }
  GetAdviceCannotPutDistance() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "AdviceCannotPutDistance",
      ) ?? 0
    );
  }
  GetAdviceModelMat() {
    return (
      CommonParamById_1.configCommonParamById.GetStringConfig(
        "AdviceModelMat",
      ) ?? ""
    );
  }
  GetAdviceCannotPutArea() {
    return (
      CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "AdviceIgnoreArea",
      ) ?? void 0
    );
  }
  GetAdviceCreateText(e) {
    let i = "";
    var r;
    return (i =
      0 === e
        ? ((r =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "AdviceCreate_1",
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r))
        : 1 === e
          ? ((r =
              ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                "AdviceCreate_2",
              )),
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r))
          : ((e =
              ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                "AdviceCreate_3",
              )),
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)));
  }
  GetAdviceTemplateText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
      "AdviceCreate_Template",
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
}
exports.AdviceConfig = AdviceConfig;
//# sourceMappingURL=AdviceConfig.js.map
