"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopUtils = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine"),
  EXP_ID = 1,
  GOLD_ID = 2,
  DIAMOND_ID = 3;
class ShopUtils {
  static GetResource(e) {
    return e === EXP_ID
      ? ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(1) || 0
      : e === GOLD_ID
        ? ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(2) || 0
        : e === DIAMOND_ID
          ? ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(3) ||
            0
          : ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              e,
            );
  }
  static FormatTime(e) {
    var i = Math.trunc(e / TimeOfDayDefine_1.TOD_SECOND_PER_DAY),
      a = Math.trunc(
        (e % TimeOfDayDefine_1.TOD_SECOND_PER_DAY) /
          TimeOfDayDefine_1.TOD_SECOND_PER_HOUR,
      ),
      r = Math.trunc(
        (e % TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE,
      ),
      e = Math.trunc(e) % TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
    return 0 < i
      ? StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopTimeStr1"),
          i.toString(),
          a.toString(),
        )
      : 0 < a
        ? StringUtils_1.StringUtils.Format(
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "ShopTimeStr2",
            ),
            a.toString(),
            r.toString(),
          )
        : 0 < r
          ? StringUtils_1.StringUtils.Format(
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "ShopTimeStr3",
              ),
              r.toString(),
            )
          : StringUtils_1.StringUtils.Format(
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "ShopTimeStr4",
              ),
              e.toString(),
            );
  }
}
exports.ShopUtils = ShopUtils;
//# sourceMappingURL=ShopUtils.js.map
