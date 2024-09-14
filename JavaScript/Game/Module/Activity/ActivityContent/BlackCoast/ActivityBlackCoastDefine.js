"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastTaskData =
    exports.BlackCoastStageInfo =
    exports.BlackCoastProgressRewardData =
      void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityCommonDefine_1 = require("../../ActivityCommonDefine"),
  ActivityBlackCoastController_1 = require("./ActivityBlackCoastController");
class BlackCoastProgressRewardData {
  constructor() {
    (this.Id = 0),
      (this.Goal = 0),
      (this.Achieved = !1),
      (this.DropId = 0),
      (this.cbe = []),
      (this.GetCurrentGoal = void 0);
  }
  GetPreviewReward() {
    if (0 === this.cbe.length) {
      if (0 === this.DropId) return [];
      var t =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
          this.DropId,
        );
      this.cbe = t;
    }
    return this.cbe;
  }
  GetState() {
    return this.Achieved
      ? 2
      : !this.GetCurrentGoal || this.GetCurrentGoal() < this.Goal
        ? 1
        : 0;
  }
}
exports.BlackCoastProgressRewardData = BlackCoastProgressRewardData;
class BlackCoastStageInfo {
  constructor(t, e) {
    (this.StageId = t),
      (this.Index = e),
      (this.TaskMap = new Map()),
      (this.G9a = !1),
      (this.jOe = (t, e) =>
        t.Status !== e.Status
          ? t.Status - e.Status
          : t.SortId !== e.SortId
            ? t.SortId - e.SortId
            : t.TaskId - e.TaskId),
      (this.k9a = (t) => {
        t &&
          ActivityBlackCoastController_1.ActivityBlackCoastController.RequestTaskReward(
            this.StageId,
            t,
          );
      });
    for (const r of ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetAllTaskConfigByStageId(
      this.StageId,
    )) {
      var s = new BlackCoastTaskData(r.TaskId);
      (s.JumpId = r.JumpId),
        (s.SortId = r.SortId),
        (s.TitleTextId = r.TaskName),
        (s.RewardList =
          ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
            r.DropId,
          )),
        (s.ReceiveDelegate = this.k9a),
        this.TaskMap.set(r.TaskId, s);
    }
  }
  get StageState() {
    if (!this.G9a) return 0;
    for (const t of this.TaskMap.values()) if (!t.IsTaken) return 1;
    return 2;
  }
  get IsUnlock() {
    return 0 !== this.StageState;
  }
  GetVideoSource() {
    return ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(
      this.StageId,
    ).VideoSource;
  }
  GetRewardState() {
    for (const t of this.TaskMap.values()) if (0 === t.Status) return !0;
    return !1;
  }
  GetTaskProgress() {
    var t = this.TaskMap.size;
    let e = 0;
    for (const s of this.TaskMap.values()) s.IsTaken && e++;
    return Math.ceil((e / t) * 100);
  }
  GetTaskList() {
    return Array.from(this.TaskMap.values()).sort(this.jOe);
  }
  GetLockConditionText() {
    var t =
      ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(
        this.StageId,
      );
    return (
      LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
        t.OpenConditionId,
      ) ?? ""
    );
  }
  StageUpdate(t) {
    for (const a of t.cMs) {
      var e,
        s,
        r = this.TaskMap.get(a.s5n);
      r
        ? ((e = r.IsFinished),
          (s =
            ((r.Current = a.lMs),
            (r.Target = a.j6n),
            (r.Status = ActivityCommonDefine_1.taskStateResolver[a.H6n]),
            r.IsFinished)),
          !e && s && this.N9a(r.TaskId))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Activity",
            38,
            "[BlackCoastActivity] 活动Task不存在",
            ["StageId", this.StageId],
            ["TaskId", a.s5n],
          );
    }
    this.G9a = !0;
  }
  SetTaskRewardGot(t) {
    this.TaskMap.get(t).Status = 2;
  }
  N9a(t) {
    var t = this.TaskMap.get(t);
    0 < t.JumpId &&
      8 ===
        (t =
          ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
            t.JumpId,
          )).SkipName &&
      ((t = Number(t.Val1)),
      ModelManager_1.ModelManager.MapModel.RemoveMapMarksByConfigId(7, t));
  }
}
exports.BlackCoastStageInfo = BlackCoastStageInfo;
class BlackCoastTaskData {
  constructor(t) {
    (this.TaskId = t),
      (this.Status = 1),
      (this.Current = 0),
      (this.Target = 0),
      (this.JumpId = 0),
      (this.SortId = 0),
      (this.TitleTextId = ""),
      (this.RewardList = []),
      (this.ReceiveDelegate = void 0);
  }
  get IsFinished() {
    return 1 !== this.Status;
  }
  get IsTaken() {
    return 2 === this.Status;
  }
}
exports.BlackCoastTaskData = BlackCoastTaskData;
//# sourceMappingURL=ActivityBlackCoastDefine.js.map
