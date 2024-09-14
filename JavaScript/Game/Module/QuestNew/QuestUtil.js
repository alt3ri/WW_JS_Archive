"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestUtil = void 0);
const ue_1 = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../Map/MapDefine"),
  LguiUtil_1 = require("../Util/LguiUtil");
class QuestUtil {
  static SetTrackDistanceText(e, r) {
    if (!e || !ObjectUtils_1.ObjectUtils.IsValid(e)) return !1;
    if (!r) return !1;
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!t) return !1;
    let i = 0;
    (i =
      r instanceof Vector_1.Vector
        ? Vector_1.Vector.Dist(r, t) * MapDefine_1.FLOAT_0_01
        : ue_1.Vector.Dist(r, t.ToUeVector()) * MapDefine_1.FLOAT_0_01),
      (i = Math.round(i));
    var r = r.Z - t.Z,
      t = i.toString();
    LguiUtil_1.LguiUtil.SetLocalText(e, "Meter", t);
    let a = e.GetText();
    return (
      300 < r
        ? ((t =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "T_YellowArrowUp",
            )),
          (a += `<texture=${t}/>`))
        : r < -300 &&
          ((t =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "T_YellowArrowDown",
            )),
          (a += `<texture=${t}/>`)),
      e.SetText(a),
      !0
    );
  }
  static GetQuestMarkId(e, r) {
    if (r) {
      r = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfigByQuestId(r);
      if (r) return r.MarkId;
    }
    return ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(e);
  }
}
exports.QuestUtil = QuestUtil;
//# sourceMappingURL=QuestUtil.js.map
