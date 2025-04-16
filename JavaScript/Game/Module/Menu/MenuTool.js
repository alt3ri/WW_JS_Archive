"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionItemViewTool = exports.MenuTool = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils");
class MenuTool {
  static GetLanguageDefineData() {
    return LanguageSystem_1.LanguageSystem.GetAllLanguageDefines();
  }
}
exports.MenuTool = MenuTool;
class FunctionItemViewTool {
  static GetSliderPosition(t, e, a = 0) {
    var s = t[0],
      t = t[1],
      s = MathUtils_1.MathUtils.GetRangePct(s, t, e);
    return MathUtils_1.MathUtils.GetFloatPointFloor(s * t, a);
  }
  static GetSliderDisplayValue(t, e) {
    var a = t.SliderRange,
      s = a[0],
      a = a[1],
      i = t.SliderRangeDisplay,
      r = i[0],
      i = i[1],
      e = MathUtils_1.MathUtils.RangeClamp(e, s, a, r, i);
    return MathUtils_1.MathUtils.GetRoundToNDecimalPlaces(e, t.SliderDigits);
  }
  static GetActualSliderStep(t, e) {
    var a = t.SliderRange,
      s = a[0],
      a = a[1],
      t = t.SliderRangeDisplay,
      i = t[0];
    return (e / (t[1] - i)) * (a - s);
  }
}
exports.FunctionItemViewTool = FunctionItemViewTool;
//# sourceMappingURL=MenuTool.js.map
