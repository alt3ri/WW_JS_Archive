"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsDataTool = exports.AttributeModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  CommonComponentDefine_1 = require("../Common/CommonComponentDefine"),
  AttributeDefine_1 = require("./AttributeDefine");
class AttributeModel extends ModelBase_1.ModelBase {
  GetFormatAttributeValueString(e, t, r = !1) {
    var o = t;
    return ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
      e,
    ).IsPercent
      ? MathUtils_1.MathUtils.GetFloatPointFloorString(o / 100, 1) + "%"
      : r
        ? MathUtils_1.MathUtils.GetFloatPointFloorString(100 * o, 1) + "%"
        : Math.floor(t).toString();
  }
  GetFormatAttributeValueByAddType(e, t) {
    return 1 === t
      ? "" + TipsDataTool.GetPropRatioValue(e, !1).toString()
      : 2 === t
        ? TipsDataTool.GetPropRatioValue(e, !0).toString() + "%"
        : 3 === t
          ? e.toString() + "s"
          : e.toString();
  }
}
exports.AttributeModel = AttributeModel;
class TipsDataTool {
  static GetCommonTipsAttributeData(e, t, r, o) {
    e = TipsDataTool.GetAttributeValue(e, t, r);
    return new CommonComponentDefine_1.TipsAttributeData(o, e, r);
  }
  static GetAttributeValue(e, t, r) {
    let o = 0;
    return (o = r
      ? (e / AttributeDefine_1.TEN_THOUSANDTH_RATIO) *
        (t / AttributeDefine_1.TEN_THOUSANDTH_RATIO)
      : e * (t / AttributeDefine_1.TEN_THOUSANDTH_RATIO));
  }
  static GetPropRatioValue(e, t) {
    let r = 0;
    return (r = t ? e / AttributeDefine_1.TEN_THOUSANDTH_RATIO : e);
  }
}
exports.TipsDataTool = TipsDataTool;
//# sourceMappingURL=AttributeModel.js.map
