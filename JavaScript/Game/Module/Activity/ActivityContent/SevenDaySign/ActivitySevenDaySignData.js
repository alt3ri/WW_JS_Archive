"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySevenDaySignData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityData_1 = require("../../ActivityData");
class ActivitySevenDaySignData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.B3e = void 0);
  }
  PhraseEx(t) {
    (this.B3e = t.Ops.pps),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Activity",
          38,
          "[ActivitySevenDaySign][Phrase]签到活动签到状态打印",
          ["ActivityId", this.Id],
          ["SignStateList", this.B3e],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ActivityViewRefreshCurrent,
        this.Id,
      );
  }
  GetExDataRedPointShowState() {
    for (const t of this.B3e)
      if (t === Protocol_1.Aki.Protocol.zps.CMs) return !0;
    return !1;
  }
  UpdateActivityData(t) {
    (this.B3e[t.c5n] = t.zps),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Activity",
          38,
          "[ActivitySevenDaySign][UpdateData]签到活动签到状态改变",
          ["ActivityId", this.Id],
          ["SignIndex", t.c5n],
          ["SignState", t.zps],
          ["SignStateList", this.B3e],
        );
  }
  SetRewardToGotState(t) {
    this.B3e[t] = Protocol_1.Aki.Protocol.zps.ovs;
  }
  GetRewardByDay(t) {
    t =
      ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivityRewardByDay(
        this.Id,
        t,
      );
    if (t) return [t];
  }
  GetBigRewardIcon(t) {
    return ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(
      t,
    )?.ImportantRewardIcon;
  }
  GetRewardStateByDay(t) {
    return this.B3e[t];
  }
  GetImportantItemIndex() {
    var t =
      ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(
        this.Id,
      );
    return t ? t.ImportantRewardIndex : 0;
  }
  GetImportantRewardType() {
    var t =
      ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(
        this.Id,
      );
    return t ? t.ImportantRewardType : 0;
  }
}
exports.ActivitySevenDaySignData = ActivitySevenDaySignData;
//# sourceMappingURL=ActivitySevenDaySignData.js.map
