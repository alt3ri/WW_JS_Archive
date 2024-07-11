"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NumberUtil = void 0);
const MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../Manager/ConfigManager");
class NumberUtil {
  static GetNumberLocalText(e) {
    let t = "";
    e === 1
      ? (t = "One")
      : e === 2
        ? (t = "Two")
        : e === 3
          ? (t = "Three")
          : e === 4
            ? (t = "Four")
            : e === 5
              ? (t = "Five")
              : e === 6
                ? (t = "Six")
                : e === 7
                  ? (t = "Seven")
                  : e === 8
                    ? (t = "Eight")
                    : e === 9
                      ? (t = "Nine")
                      : e === 10 && (t = "Ten");
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(t);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
}
exports.NumberUtil = NumberUtil;
// # sourceMappingURL=NumberUtil.js.map
