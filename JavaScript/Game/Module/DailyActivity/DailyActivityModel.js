"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const DailyActivityTaskItem_1 = require("./DailyActivityTask/DailyActivityTaskItem");
class DailyActivityModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.xOt = 0),
      (this.wOt = 0),
      (this.BOt = new Map()),
      (this.bOt = []),
      (this.qOt = 0),
      (this.GOt = void 0),
      (this.AreaId = 0);
  }
  get ActivityValue() {
    return this.xOt;
  }
  get ActivityMaxValue() {
    return this.wOt;
  }
  get DailyActivityGoalMap() {
    return this.BOt;
  }
  get DailyActivityTaskList() {
    return this.bOt;
  }
  get DayEndTime() {
    return this.qOt;
  }
  get RewardData() {
    return this.GOt;
  }
  set RewardData(t) {
    this.GOt = t;
  }
  OnInit() {
    return !0;
  }
  EmitDailyActivityStateCheck() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.DailyActivityStateNotify,
    );
  }
  InitGoalData() {
    this.BOt = new Map();
    const t =
      ConfigManager_1.ConfigManager.DailyActivityConfig.GetAllActivityGoalData();
    for (const s of t) {
      const e = [];
      for (const a of ConfigManager_1.ConfigManager.DailyActivityConfig.GetDropShowInfo(
        s.DropId,
      ).entries())
        e.push([{ IncId: 0, ItemId: a[0] }, a[1]]);
      const i = { Id: s.Id, Goal: s.Goal, Rewards: e, Achieved: !1, State: 2 };
      this.BOt.set(s.Id, i);
    }
    this.wOt = t[t.length - 1].Goal;
  }
  RefreshActivityInfo(t) {
    for (const i of t) {
      const e = this.BOt.get(i);
      e &&
        ((e.Achieved = !0), (e.State = this.GetActivityGoalState(e.Goal, !0)));
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.DailyActivityRewardTake,
      t,
    ),
      this.EmitDailyActivityStateCheck();
  }
  RefreshActivityValue(t) {
    (this.xOt = t),
      this.BOt.forEach((t, e) => {
        t.State = this.GetActivityGoalState(t.Goal, t.Achieved);
      }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DailyActivityValueChange,
        this.xOt,
      ),
      this.EmitDailyActivityStateCheck();
  }
  GetActivityRewardById(t) {
    return this.BOt.get(t).Rewards;
  }
  RefreshDailyActivityData(s, t) {
    (this.xOt = s?.sAs ?? 0),
      (this.qOt = Number(MathUtils_1.MathUtils.LongToBigInt(s?.xfs ?? 0))),
      this.BOt.forEach((t, e) => {
        const i = s.aAs.includes(t.Id);
        (t.Achieved = i), (t.State = this.GetActivityGoalState(t.Goal, i));
      }),
      (this.AreaId = s.wFn),
      (this.bOt = []);
    for (const r of s.V0s) {
      const e = new DailyActivityTaskItem_1.DailyActiveTaskData();
      const i =
        ((e.TaskId = r.Ekn),
        (e.CurrentProgress = r.k0s),
        (e.TargetProgress = r.s3n),
        (e.IsFunctionUnlock = r.hAs),
        r.$0s
          ? r.H0s
            ? (e.TaskState = 3)
            : (e.TaskState = 1)
          : (e.TaskState = 2),
        ConfigManager_1.ConfigManager.DailyActivityConfig.GetActivityTaskConfigById(
          r.Ekn,
        ));
      const a = ((e.Sort = i.SortRank), []);
      for (const n of i.TaskReward.entries())
        a.push([{ ItemId: n[0], IncId: 0 }, n[1]]);
      (e.RewardItemList = a), this.bOt.push(e);
    }
    this.SortTaskDataList(),
      t &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DailyUpdateNotify,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DailyActivityRefresh,
      ),
      this.EmitDailyActivityStateCheck();
  }
  UpdateDailyActivityData(t) {
    this.xOt = t?.sAs ?? 0;
    for (const s of t.aAs) {
      const e = this.BOt.get(s);
      e &&
        ((e.Achieved = !0), (e.State = this.GetActivityGoalState(e.Goal, !0)));
    }
    this.AreaId = t.wFn;
    for (const a of t.V0s) {
      const i = this.bOt.find((t) => t.TaskId === a.Ekn);
      (i.CurrentProgress = a.k0s),
        a.$0s
          ? a.H0s
            ? (i.TaskState = 3)
            : (i.TaskState = 1)
          : (i.TaskState = 2);
    }
    this.SortTaskDataList(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DailyActivityTaskUpdate,
      ),
      this.EmitDailyActivityStateCheck();
  }
  SortTaskDataList() {
    this.bOt.sort((t, e) =>
      t.TaskState === e.TaskState
        ? t.Sort === e.Sort
          ? t.TaskId - e.TaskId
          : t.Sort - e.Sort
        : t.TaskState - e.TaskState,
    );
  }
  GetActivityGoalState(t, e) {
    let i = 2;
    return e ? (i = 3) : this.ActivityValue >= t && (i = 1), i;
  }
  NOt() {
    if (!(this.xOt >= this.wOt))
      for (const t of this.DailyActivityTaskList)
        if (t.TaskState === 1) return !0;
    return !1;
  }
  OOt() {
    let t = !1;
    for (const e of this.BOt.entries())
      if (e[1].State === 1) {
        t = !0;
        break;
      }
    return t;
  }
  CheckIsRewardWaitTake() {
    return this.NOt() || this.OOt();
  }
  CheckIsFinish() {
    return this.xOt >= this.wOt;
  }
}
exports.DailyActivityModel = DailyActivityModel;
// # sourceMappingURL=DailyActivityModel.js.map
