"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLinkageData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ActivityLinkageById_1 = require("../../../../../Core/Define/ConfigQuery/ActivityLinkageById"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityLinkageDefine_1 = require("./ActivityLinkageDefine"),
  ACTIVITYLINKAGE_RED_DOT_CACHE_KEY = 100;
class ActivityLinkageData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.TabDataMap = new Map());
  }
  PhraseEx(e) {
    e = e.Ro1;
    if (e && e.R5n)
      for (const t of e.R5n) {
        let e = this.TabDataMap.get(t.wo1);
        ((e = e || new ActivityLinkageDefine_1.ActivityLinkageTabData()).TabId =
          t.wo1),
          (e.EndTimeStamp = MathUtils_1.MathUtils.LongToNumber(t.dps)),
          (e.IsReceive = t.Ao1),
          this.TabDataMap.set(t.wo1, e);
      }
  }
  ReceiveReward(e) {
    var t = this.TabDataMap.get(e);
    t
      ? ((t.IsReceive = !0),
        this.TabDataMap.set(e, t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshCommonActivityRedDot,
          this.Id,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 71, "活动联合页领取奖励，页签数据错误", [
          "tabId",
          e,
        ]);
  }
  ReadRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      ACTIVITYLINKAGE_RED_DOT_CACHE_KEY,
      0,
      0,
      1,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  GetExDataRedPointShowState() {
    var e;
    if (
      0 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        ACTIVITYLINKAGE_RED_DOT_CACHE_KEY,
        0,
        0,
      )
    )
      return !0;
    for ([, e] of this.TabDataMap) if (!e.IsReceive) return !0;
    return !1;
  }
  IsReceiveReward(e) {
    var t = this.TabDataMap.get(e);
    return t
      ? t.IsReceive
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 71, "活动联动页页签id未找到", [
            "tabId",
            e,
          ]),
        !1);
  }
  GetTabInfoList() {
    return Array.from(this.TabDataMap.values()).sort((e, t) => {
      var i = ActivityLinkageById_1.configActivityLinkageById.GetConfig(
          e.TabId,
        ).Rank,
        r = ActivityLinkageById_1.configActivityLinkageById.GetConfig(
          t.TabId,
        ).Rank;
      return i !== r ? r - i : t.TabId - e.TabId;
    });
  }
}
exports.ActivityLinkageData = ActivityLinkageData;
//# sourceMappingURL=ActivityLinkageData.js.map
