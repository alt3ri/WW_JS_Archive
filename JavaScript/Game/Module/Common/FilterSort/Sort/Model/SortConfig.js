"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SortConfig = void 0);
const FilterSortGroupById_1 = require("../../../../../../Core/Define/ConfigQuery/FilterSortGroupById"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  SortById_1 = require("../../../../../../Core/Define/ConfigQuery/SortById"),
  SortRuleByIdAndDataId_1 = require("../../../../../../Core/Define/ConfigQuery/SortRuleByIdAndDataId"),
  ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase");
class SortConfig extends ConfigBase_1.ConfigBase {
  GetSortConfig(e) {
    return SortById_1.configSortById.GetConfig(e);
  }
  GetSortRuleName(e, r) {
    e = SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.GetConfig(e, r);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "";
  }
  GetSortRuleIcon(e, r) {
    return SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.GetConfig(e, r)
      .Icon;
  }
  GetSortRuleAttributeId(e, r) {
    return SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.GetConfig(e, r)
      .AttributeId;
  }
  GetSortId(e) {
    return FilterSortGroupById_1.configFilterSortGroupById.GetConfig(e).SortId;
  }
}
exports.SortConfig = SortConfig;
//# sourceMappingURL=SortConfig.js.map
