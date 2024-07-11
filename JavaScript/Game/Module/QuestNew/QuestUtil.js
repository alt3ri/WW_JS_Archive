"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestUtil = void 0);
const ue_1 = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../Map/MapDefine"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class QuestUtil {
  static SetTrackDistanceText(e, r) {
    if (!ObjectUtils_1.ObjectUtils.IsValid(e)) return !1;
    if (!r) return !1;
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!t) return !1;
    let i = 0;
    (i =
      r instanceof Vector_1.Vector
        ? Vector_1.Vector.Dist(r, t) * MapDefine_1.FLOAT_0_01
        : ue_1.Vector.Dist(r, t.ToUeVector()) * MapDefine_1.FLOAT_0_01),
      (i = Math.round(i));
    t = t.Z - r.Z;
    let a = i.toString();
    return (
      (a =
        300 < t
          ? `<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowDown")}/>` +
            i
          : t < -300
            ? i.toString()
            : `<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_YellowArrowUp")}/>` +
              i),
      LguiUtil_1.LguiUtil.SetLocalText(e, "Meter", a),
      !0
    );
  }
}
exports.QuestUtil = QuestUtil;
//# sourceMappingURL=QuestUtil.js.map
