"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreStateData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreStateData {
  constructor() {
    (this.StateId = 0),
      (this.CountryId = 0),
      (this.StateNameKey = "TowerDefence_lock"),
      (this.IsNoneState = !0),
      (this.ExploreAreaDataList = []);
  }
  Initialize(e, t) {
    (this.CountryId = t),
      (this.StateId = e) !== ExploreProgressDefine_1.NONE_STATE_ID &&
        ((this.IsNoneState = !1),
        (t =
          ConfigManager_1.ConfigManager.ExploreProgressConfig.GetStateConfigByStateId(
            e,
          )),
        (this.StateNameKey = t.StateName));
  }
  PushAreaData(e) {
    this.ExploreAreaDataList.push(e);
  }
  CheckPushAreaData(e) {
    return e.StateId === this.StateId && (this.PushAreaData(e), !0);
  }
  HasCanTakeStageReward() {
    return this.ExploreAreaDataList.some((e) => e.HasCanTakeStageReward());
  }
}
exports.ExploreStateData = ExploreStateData;
//# sourceMappingURL=ExploreStateData.js.map
