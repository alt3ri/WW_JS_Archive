"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckGuideStatus = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGuideStatus extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams || !e.LimitParamsOpe) return !1;
    var t = e.LimitParams.get("GuideGroupId"),
      a = e.LimitParams.get("Status");
    let s = e.LimitParamsOpe.get("Status");
    if (!t || !a) return !1;
    s = s || "";
    return ModelManager_1.ModelManager.GuideModel.CheckGroupStatus(
      parseInt(t),
      parseInt(a),
      s,
    );
  }
}
exports.LevelConditionCheckGuideStatus = LevelConditionCheckGuideStatus;
//# sourceMappingURL=LevelConditionCheckGuideStatus.js.map
