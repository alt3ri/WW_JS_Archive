"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTimePointRewardData = exports.TimePointRewardData = void 0);
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ActivityData_1 = require("../../ActivityData");
class TimePointRewardData {
  constructor() {
    (this.Id = 0),
      (this.RewardTime = 0),
      (this.HasClaimed = !1),
      (this.HasUnlock = !1);
  }
  get RewardState() {
    return this.HasClaimed ? 2 : this.HasUnlock ? 1 : 0;
  }
}
exports.TimePointRewardData = TimePointRewardData;
class ActivityTimePointRewardData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.cXs = new Map());
  }
  PhraseEx(t) {
    this.cXs.clear();
    const e = t.N$s;
    if (e) {
      for (const i of e.zbs) {
        const e = new TimePointRewardData();
        (e.Id = i.J4n),
          (e.RewardTime = Number(MathUtils_1.MathUtils.LongToBigInt(i.F$s))),
          (e.HasClaimed = i.aLs),
          (e.HasUnlock = i.vxs),
          this.cXs.set(i.J4n, e);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
    }
  }
  GetExDataRedPointShowState() {
    for (const t of this.cXs.values()) if (1 === t.RewardState) return !0;
    return !1;
  }
  SetRewardToGotState(t) {
    const e = this.cXs.get(t);
    if (e) {
      (e.HasClaimed = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshCommonActivityRedDot,
          this.Id,
        );
      for (const e of this.cXs.values()) if (2 !== e.RewardState) return;
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshActivityTab,
        this.Id,
      );
    }
  }
  GetRewardDataList() {
    return Array.from(this.cXs.values()).sort((t, e) => t.Id - e.Id);
  }
}
exports.ActivityTimePointRewardData = ActivityTimePointRewardData;
//# sourceMappingURL=ActivityTimePointRewardData.js.map
