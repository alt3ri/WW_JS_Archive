"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkBossInstanceData =
    exports.DreamLinkRewardData =
    exports.DreamLinkRunTaskData =
    exports.signStateResolver =
    exports.WORLD_RUN_ENDING_ID =
    exports.BOSS_INST_ROLE_COUNT =
    exports.CHANGE_STATE_FINISH_COUNT =
      void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  DreamLinkController_1 = require("./DreamLinkController");
(exports.CHANGE_STATE_FINISH_COUNT = 3),
  (exports.BOSS_INST_ROLE_COUNT = 3),
  (exports.WORLD_RUN_ENDING_ID = 3020),
  (exports.signStateResolver = {
    [Protocol_1.Aki.Protocol.zps.Z6n]: 1,
    [Protocol_1.Aki.Protocol.zps.CMs]: 0,
    [Protocol_1.Aki.Protocol.zps.ovs]: 2,
  });
class DreamLinkRunTaskData {
  constructor(e) {
    (this.Id = e),
      (this.Status = 1),
      (this.ConditionGroupId = 0),
      (this.TitleTextId = ""),
      (this.RewardList = []),
      (this.UnlockTime = 0),
      (this.MarkId = 0),
      (this.PlayTime = -1);
  }
  GetLockTxt() {
    let e = "";
    var t;
    return (
      this.UnlockTime <= TimeUtil_1.TimeUtil.GetServerTime()
        ? this.ConditionGroupId &&
          ((t =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              this.ConditionGroupId,
            ) ?? ""),
          (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)))
        : ((t =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "DreamLinkWorldRunLockText",
            ) ?? ""),
          (e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
            this.UnlockTime,
            t,
          ))),
      e
    );
  }
  IsTimeLock() {
    return this.UnlockTime > TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetRewardData() {
    var e = [];
    for (const r of this.RewardList) {
      var t = { Item: r, HasClaimed: 3 === this.Status };
      e.push(t);
    }
    return e;
  }
  JumpDelegate() {
    ModelManager_1.ModelManager.MapModel.CreateTempMapMark(this.MarkId);
    var e = { MarkId: this.MarkId, MarkType: 27 };
    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(1, !1, e);
  }
  ReceiveDelegate() {
    DreamLinkController_1.DreamLinkController.RunTaskRewardRequest(this.Id);
  }
}
exports.DreamLinkRunTaskData = DreamLinkRunTaskData;
class DreamLinkRewardData {
  constructor(e) {
    (this.Id = e), (this.Status = 1), (this.Current = 0), (this.Target = 1);
  }
}
exports.DreamLinkRewardData = DreamLinkRewardData;
class DreamLinkBossInstanceData {
  constructor(e, t, r) {
    (this.TypeId = e),
      (this.InstId = t),
      (this.ConditionGroupId = r),
      (this.Score = 0),
      (this.IsUnlock = !1),
      (this.UnlockTime = 0),
      (this.IsFinished = !1),
      (this.Lml = [0, 0, 0]);
  }
  GetUnlockText() {
    let e = "";
    var t;
    return (
      this.UnlockTime <= TimeUtil_1.TimeUtil.GetServerTime()
        ? this.ConditionGroupId &&
          ((t =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              this.ConditionGroupId,
            ) ?? ""),
          (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? ""))
        : ((t =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "DaMaoUnLockTime",
            ) ?? ""),
          (e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
            this.UnlockTime,
            t,
          ))),
      e
    );
  }
  GetTickState() {
    return !(
      this.IsUnlock || this.UnlockTime <= TimeUtil_1.TimeUtil.GetServerTime()
    );
  }
  SetBossRoleIdByIndex(e, t) {
    this.Lml[e] = t;
  }
  GetBossRoleIdByIndex(e) {
    return this.Lml[e];
  }
  GetBossRoleIdList() {
    return this.Lml;
  }
}
exports.DreamLinkBossInstanceData = DreamLinkBossInstanceData;
//# sourceMappingURL=DreamLinkDefine.js.map
