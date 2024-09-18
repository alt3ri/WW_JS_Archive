"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleGiveData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  TrackMoonPhaseActivityById_1 = require("../../../../../Core/Define/ConfigQuery/TrackMoonPhaseActivityById"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityRoleGiveController_1 = require("./ActivityRoleGiveController");
class ActivityRoleGiveData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.IsGetReward = !1);
  }
  PhraseEx(e) {
    var t = e.cih;
    (ActivityRoleGiveController_1.ActivityRoleGiveController.CurrentActivityId =
      e.s5n),
      t
        ? (this.IsGetReward = t.hih)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("MoonChasing", 35, "ActivityRoleGiveData无数据");
  }
  GetExtraConfig() {
    return TrackMoonPhaseActivityById_1.configTrackMoonPhaseActivityById.GetConfig(
      ActivityRoleGiveController_1.ActivityRoleGiveController.CurrentActivityId,
    );
  }
  GetExDataRedPointShowState() {
    var e = this.GetExtraConfig(),
      t = ModelManager_1.ModelManager.MoonChasingModel?.GetPopularityValue();
    return !!t && !!e && !this.IsGetReward && t >= e?.PopularityNeed;
  }
}
exports.ActivityRoleGiveData = ActivityRoleGiveData;
//# sourceMappingURL=ActivityRoleGiveData.js.map
