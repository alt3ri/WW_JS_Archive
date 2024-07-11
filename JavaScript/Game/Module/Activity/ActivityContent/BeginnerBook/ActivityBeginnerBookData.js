"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityBeginnerBookData = void 0);
const ConfigCommon_1 = require("../../../../../Core/Config/ConfigCommon"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityData_1 = require("../../ActivityData");
class ActivityBeginnerBookData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.AllBeginnerTargetList = []),
      (this.UnLockBeginnerMap = new Map()),
      (this.FinishBeginnerMap = new Map());
  }
  PhraseEx(t) {
    this.AllBeginnerTargetList = [];
    var e = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetAllActivityBeginnerConfig(),
    );
    e?.sort((t, e) => t.Sort - e.Sort);
    for (const i of e) this.AllBeginnerTargetList.push(i.Id);
  }
  GetEnableJump(t) {
    return (
      0 ===
        ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
          t,
        ).ConditionId ||
      (this.UnLockBeginnerMap.get(t) ?? !1)
    );
  }
  GetFinishState(t) {
    return this.FinishBeginnerMap.get(t) ?? !1;
  }
}
exports.ActivityBeginnerBookData = ActivityBeginnerBookData;
//# sourceMappingURL=ActivityBeginnerBookData.js.map
