"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopUtils = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine");
const EXP_ID = 1;
const GOLD_ID = 2;
const DIAMOND_ID = 3;
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
    const i = Math.trunc(e / TimeOfDayDefine_1.TOD_SECOND_PER_DAY);
    const a = Math.trunc(
      (e % TimeOfDayDefine_1.TOD_SECOND_PER_DAY) /
        TimeOfDayDefine_1.TOD_SECOND_PER_HOUR,
    );
    const r = Math.trunc(
      (e % TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
        TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE,
    );
    var e = Math.trunc(e) % TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
    return i > 0
      ? StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopTimeStr1"),
          i.toString(),
          a.toString(),
        )
      : a > 0
        ? StringUtils_1.StringUtils.Format(
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "ShopTimeStr2",
            ),
            a.toString(),
            r.toString(),
          )
        : r > 0
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
// # sourceMappingURL=ShopUtils.js.map
