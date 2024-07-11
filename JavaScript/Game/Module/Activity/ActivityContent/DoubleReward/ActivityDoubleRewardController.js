"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDoubleRewardController = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityDoubleRewardData_1 = require("./ActivityDoubleRewardData"),
  ActivitySubViewDoubleReward_1 = require("./ActivitySubViewDoubleReward");
class ActivityDoubleRewardController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return e.Prefab;
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewDoubleReward_1.ActivitySubViewDoubleReward();
  }
  OnCreateActivityData(e) {
    return (
      ActivityDoubleRewardController.UniversalActivityIdSet.add(e.J4n),
      new ActivityDoubleRewardData_1.ActivityDoubleRewardData()
    );
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return ActivityDoubleRewardController.UniversalActivityIdSet.clear(), !0;
  }
  static GetAdventureUpActivity(e) {
    for (const r of ActivityDoubleRewardController.UniversalActivityIdSet) {
      var t = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(r);
      if (t?.CheckIfInOpenTime() && t?.AdventureGuideUpList.includes(e))
        return t;
    }
  }
  static GetDungeonUpActivity(t, e = !0) {
    for (const i of ActivityDoubleRewardController.UniversalActivityIdSet) {
      var r = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(i);
      if (
        r?.CheckIfInOpenTime() &&
        void 0 !== r.GetDungeonUpList(e).find((e) => t.includes(e))
      )
        return r;
    }
  }
  static GetDungeonUpActivityFullTip(e, t = !0) {
    return ActivityDoubleRewardController.GetDungeonUpActivity(
      e,
      t,
    )?.GetFullTip();
  }
}
(exports.ActivityDoubleRewardController =
  ActivityDoubleRewardController).UniversalActivityIdSet = new Set();
//# sourceMappingURL=ActivityDoubleRewardController.js.map
