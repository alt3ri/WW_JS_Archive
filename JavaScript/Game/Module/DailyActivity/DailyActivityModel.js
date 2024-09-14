"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  DailyActivityTaskItem_1 = require("./DailyActivityTask/DailyActivityTaskItem");
class DailyActivityModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.wkt = 0),
      (this.Bkt = 0),
      (this.bkt = new Map()),
      (this.qkt = []),
      (this.Gkt = 0),
      (this.Nkt = void 0),
      (this.AreaId = 0);
  }
  get ActivityValue() {
    return this.wkt;
  }
  get ActivityMaxValue() {
    return this.Bkt;
  }
  get DailyActivityGoalMap() {
    return this.bkt;
  }
  get DailyActivityTaskList() {
    return this.qkt;
  }
  get DayEndTime() {
    return this.Gkt;
  }
  get RewardData() {
    return this.Nkt;
  }
  set RewardData(t) {
    this.Nkt = t;
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
    this.bkt = new Map();
    var t =
      ConfigManager_1.ConfigManager.DailyActivityConfig.GetAllActivityGoalData();
    for (const s of t) {
      var e = [];
      for (const a of ConfigManager_1.ConfigManager.DailyActivityConfig.GetDropShowInfo(
        s.DropId,
      ).entries())
        e.push([{ IncId: 0, ItemId: a[0] }, a[1]]);
      var i = { Id: s.Id, Goal: s.Goal, Rewards: e, Achieved: !1, State: 2 };
      this.bkt.set(s.Id, i);
    }
    this.Bkt = t[t.length - 1].Goal;
  }
  RefreshActivityInfo(t) {
    for (const i of t) {
      var e = this.bkt.get(i);
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
    (this.wkt = t),
      this.bkt.forEach((t, e) => {
        t.State = this.GetActivityGoalState(t.Goal, t.Achieved);
      }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DailyActivityValueChange,
        this.wkt,
      ),
      this.EmitDailyActivityStateCheck();
  }
  GetActivityRewardById(t) {
    return this.bkt.get(t).Rewards;
  }
  RefreshDailyActivityData(s) {
    (this.wkt = s?.wxs ?? 0),
      (this.Gkt = Number(MathUtils_1.MathUtils.LongToBigInt(s?.rEs ?? 0))),
      this.bkt.forEach((t, e) => {
        var i = s.xxs.includes(t.Id);
        (t.Achieved = i), (t.State = this.GetActivityGoalState(t.Goal, i));
      }),
      (this.AreaId = s.p6n),
      (this.qkt = []);
    for (const a of s.cMs) {
      var t = new DailyActivityTaskItem_1.DailyActiveTaskData(),
        e =
          ((t.TaskId = a.s5n),
          (t.CurrentProgress = a.lMs),
          (t.TargetProgress = a.j6n),
          (t.IsFunctionUnlock = a.bxs),
          a.dMs
            ? a.mMs
              ? (t.TaskState = 3)
              : (t.TaskState = 1)
            : (t.TaskState = 2),
          ConfigManager_1.ConfigManager.DailyActivityConfig.GetActivityTaskConfigById(
            a.s5n,
          )),
        i = ((t.Sort = e.SortRank), []);
      for (const r of e.TaskReward.entries())
        i.push([{ ItemId: r[0], IncId: 0 }, r[1]]);
      (t.RewardItemList = i), this.qkt.push(t);
    }
    this.SortTaskDataList(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DailyActivityRefresh,
      ),
      this.EmitDailyActivityStateCheck();
  }
  UpdateDailyActivityData(t) {
    this.wkt = t?.wxs ?? 0;
    for (const s of t.xxs) {
      var e = this.bkt.get(s);
      e &&
        ((e.Achieved = !0), (e.State = this.GetActivityGoalState(e.Goal, !0)));
    }
    this.AreaId = t.p6n;
    for (const a of t.cMs) {
      var i = this.qkt.find((t) => t.TaskId === a.s5n);
      (i.CurrentProgress = a.lMs),
        a.dMs
          ? a.mMs
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
    this.qkt.sort((t, e) =>
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
  Okt() {
    if (!(this.wkt >= this.Bkt))
      for (const t of this.DailyActivityTaskList)
        if (1 === t.TaskState) return !0;
    return !1;
  }
  kkt() {
    let t = !1;
    for (const e of this.bkt.entries())
      if (1 === e[1].State) {
        t = !0;
        break;
      }
    return t;
  }
  CheckIsRewardWaitTake() {
    return this.Okt() || this.kkt();
  }
  CheckIsFinish() {
    return this.wkt >= this.Bkt;
  }
}
exports.DailyActivityModel = DailyActivityModel;
//# sourceMappingURL=DailyActivityModel.js.map
