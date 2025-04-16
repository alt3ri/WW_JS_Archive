"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalUtils = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
class CiacconaGalUtils {
  static GetAvgSkippingTime() {
    return (
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "CiacconaAvgSkippingTime",
      ) ?? 1
    );
  }
  static GetAvgCoolDownTime() {
    return (
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "CiacconaAvgCoolDownTime",
      ) ?? 1
    );
  }
  static GetAvgTextAnimShortenTime() {
    return (
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "CiacconaAvgTextAnimShortenTime",
      ) ?? 1
    );
  }
  static GetAvgSubEndingDelayTime() {
    return (
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "CiacconaAvgSubEndingDelay",
      ) ?? 1
    );
  }
  static GetAvgChoiceProtectingTime() {
    return (
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "CiacconaAvgChoiceProtectingTime",
      ) ?? 1
    );
  }
}
exports.CiacconaGalUtils = CiacconaGalUtils;
//# sourceMappingURL=CiacconaGalUtils.js.map
