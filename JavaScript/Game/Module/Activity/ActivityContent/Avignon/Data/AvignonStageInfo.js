"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonStageInfo = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityCommonDefine_1 = require("../../../ActivityCommonDefine"),
  AvignonController_1 = require("../Controller/AvignonController"),
  AvignonTaskData_1 = require("./AvignonTaskData");
class AvignonStageInfo {
  constructor(e, t) {
    (this.StageId = e),
      (this.Index = t),
      (this.TaskMap = new Map()),
      (this.kja = !1),
      (this.jOe = (e, t) =>
        e.Status !== t.Status ? e.Status - t.Status : e.TaskId - t.TaskId),
      (this.Nja = (e) => {
        e && AvignonController_1.AvignonController.RequestTaskReward(e);
      });
    e =
      ConfigManager_1.ConfigManager.AvignonConfig?.GetAvignonTaskConfigByStageId(
        this.StageId,
      );
    if (e)
      for (const n of e) {
        var r = new AvignonTaskData_1.AvignonTaskData(n.TaskId);
        (r.JumpId = n.JumpId),
          (r.TitleTextId = n.TaskName),
          (r.RewardList =
            ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
              n.TaskReward,
            )),
          (r.ReceiveDelegate = this.Nja),
          this.TaskMap.set(n.TaskId, r);
      }
  }
  get StageState() {
    if (!this.kja) return 0;
    for (const e of this.TaskMap.values()) if (!e.IsTaken) return 1;
    return 2;
  }
  UnlockStage() {
    this.kja = !0;
  }
  get IsUnlock() {
    return 0 !== this.StageState;
  }
  HasNewStageFlag() {
    var e;
    return (
      1 === this.StageState &&
      ((e = ModelManager_1.ModelManager.AvignonModel.GetAvignonActivityId()),
      !ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        e,
        0,
        this.StageId,
        0,
        0,
      ))
    );
  }
  GetRewardState() {
    if (1 === this.StageState)
      for (const e of this.TaskMap.values()) if (0 === e.Status) return !0;
    return !1;
  }
  GetTaskProgress() {
    var e = this.TaskMap.size;
    let t = 0;
    for (const r of this.TaskMap.values()) r.IsTaken && t++;
    return Math.ceil((t / e) * 100);
  }
  GetTaskList() {
    return Array.from(this.TaskMap.values()).sort(this.jOe);
  }
  GetLockConditionText() {
    var e = ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigById(
      this.StageId,
    );
    return (
      LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
        e.OpenConditionId,
      ) ?? ""
    );
  }
  UpdateTask(e) {
    var t,
      r,
      n = this.TaskMap.get(e.s5n);
    n
      ? ((t = n.IsFinished),
        (n.Current = e.lMs),
        (n.Target = e.j6n),
        (n.Status = ActivityCommonDefine_1.taskStateResolver[e.H6n]),
        (r = n.IsFinished),
        !t && r && this.Fja(n.TaskId))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Activity",
          71,
          "[AvignonActivity] 活动Task不存在",
          ["StageId", this.StageId],
          ["TaskId", e.s5n],
        );
  }
  SetTaskRewardGot(e) {
    this.TaskMap.get(e).Status = 2;
  }
  Fja(e) {
    var e = this.TaskMap.get(e);
    0 < e.JumpId &&
      8 ===
        (e =
          ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
            e.JumpId,
          )).SkipName &&
      ((e = Number(e.Val1)),
      ModelManager_1.ModelManager.MapModel.RemoveMapMarksByConfigId(7, e));
  }
}
exports.AvignonStageInfo = AvignonStageInfo;
//# sourceMappingURL=AvignonStageInfo.js.map
