"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayInfo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
  LogicTreeContainer_1 = require("../GeneralLogicTree/LogicTreeContainer"),
  QuestDefine_1 = require("../QuestNew/QuestDefine"),
  LevelPlayDefine_1 = require("./LevelPlayDefine");
class LevelPlayInfo extends LogicTreeContainer_1.LogicTreeContainer {
  constructor(t) {
    super(),
      (this.u1i = 0),
      (this.Lpi = !1),
      (this.Dpi = 0),
      (this.ac = 0),
      (this.Rpi = !1),
      (this.TrackRadiusSquared = 0),
      (this.CacheDistanceSquared = 0),
      (this.c1i = ""),
      (this.m1i = 0),
      (this.d1i = 0),
      (this.C1i = 0),
      (this.Upi = void 0),
      (this.Api = void 0),
      (this.f1i = void 0),
      (this.p1i = 0),
      (this.Ppi = 0),
      (this.v1i = 0),
      (this.M1i = void 0),
      (this.E1i = void 0),
      (this.xpi = void 0),
      (this.wpi = void 0),
      (this.Bpi = "Local"),
      (this.bpi = void 0),
      (this.u1i = t),
      (this.Lpi = !1),
      (this.Dpi = 0),
      (this.ac = 0),
      (this.CacheDistanceSquared = -1);
  }
  get Id() {
    return this.u1i;
  }
  get PlayState() {
    return this.ac;
  }
  get IsClose() {
    return 0 === this.ac;
  }
  get IsFinish() {
    return 3 === this.ac;
  }
  get CanExecOpenAction() {
    return this.ac < 3;
  }
  get CanTrack() {
    if (
      this.LevelPlayEntityId !== QuestDefine_1.INVALID_ENTITYDATAID &&
      2 === this.ac &&
      this.Api &&
      this.BehaviorTree
    ) {
      if (this.BehaviorTree.IsChallengeUi()) return !0;
      var t = this.BehaviorTree.GetActiveChildQuestNodesId();
      if (t)
        for (const r of t) {
          var e = this.BehaviorTree.GetNode(r),
            i = e
              ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TrackTextConfig)
              : void 0;
          if (i && !StringUtils_1.StringUtils.IsBlank(i) && !e.ContainTag(2))
            return !0;
        }
    }
    return !1;
  }
  get IsFirstPass() {
    return this.Lpi;
  }
  get RefreshTime() {
    return this.Dpi;
  }
  get CanGetReward() {
    return this.Rpi;
  }
  get Name() {
    return this.c1i;
  }
  get LevelPlayEntityId() {
    return this.m1i;
  }
  get MapId() {
    return this.d1i;
  }
  get InstanceId() {
    return this.C1i;
  }
  get MarkConfig() {
    return this.Upi;
  }
  get NeedShowInMap() {
    return void 0 !== this.MarkConfig;
  }
  get TrackPriority() {
    return (
      this.Api?.TrackPriority ??
      LevelPlayDefine_1.INVALID_LEVELPLAY_TRACKPRIORITY
    );
  }
  get RewardConfig() {
    return this.f1i;
  }
  get RewardId() {
    return this.p1i;
  }
  get FirstRewardId() {
    return this.Ppi;
  }
  get RewardEntityId() {
    return this.v1i;
  }
  get AfterGetRewardAction() {
    return this.M1i;
  }
  get LevelPlayOpenAction() {
    return this.E1i;
  }
  get LevelPlayFirstPassAction() {
    return this.xpi;
  }
  get LevelPlayEnterAction() {
    return this.wpi;
  }
  get OnlineType() {
    return this.Bpi;
  }
  get IsInteractValid() {
    return (
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      "Local" !== this.OnlineType
    );
  }
  get LevelPlayType() {
    return this.bpi;
  }
  InitConfig() {
    var t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
      this.u1i,
    );
    if (t) {
      switch (
        ((this.d1i = t.LevelId),
        (this.m1i = t.LevelPlayEntityId),
        (this.C1i = t.InstanceId ?? 0),
        (this.c1i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)),
        (this.Upi = t.LevelPlayMark),
        (this.Api = t.LevelPlayTrack),
        (this.Rpi = !0),
        (this.E1i = t.LevelPlayOpenActions),
        (this.wpi = t.EnterInRangeActions),
        (this.Bpi = t.OnlineType),
        (this.bpi = t.Type),
        t.LevelPlayRewardConfig.Type)
      ) {
        case "Interact":
          (this.p1i = t.LevelPlayRewardConfig.RewardId),
            (this.Ppi = t.LevelPlayRewardConfig.FirstRewardId ?? 0),
            (this.v1i = t.LevelPlayRewardConfig.RewardEntityId),
            (this.M1i = t.LevelPlayRewardConfig.RewardCompleteActions),
            (this.xpi = t.LevelPlayRewardConfig.FirstCompleteActions);
          break;
        case "Automatic":
          (this.p1i = t.LevelPlayRewardConfig.RewardId),
            (this.Ppi = t.LevelPlayRewardConfig.FirstRewardId ?? 0);
      }
      this.Api && this.ChangeLevelPlayTrackRange(this.Api.TrackRadius);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 19, "创建玩法时找不到玩法配置", [
          "玩法id",
          this.u1i,
        ]);
  }
  UpdateFirstPass(t) {
    this.Lpi = t ?? !1;
  }
  UpdateState(t) {
    (this.ac = t ?? 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnLevelPlayStateChange,
        this.u1i,
      );
  }
  UpdateRefreshTime(t) {
    this.Dpi = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  UpdateCanGetReward(t) {
    this.Rpi = t;
  }
  UpdateDistanceSquared(t) {
    var e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(
      this.LevelPlayEntityId,
    );
    e
      ? (this.CacheDistanceSquared = this.qpi(e, t))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneGameplay", 19, "配置的玩法追踪坐标为空", [
          "玩法id",
          this.u1i,
        ]);
  }
  IsInTrackRange() {
    return (
      !(this.CacheDistanceSquared < 0) &&
      this.CacheDistanceSquared < this.TrackRadiusSquared
    );
  }
  qpi(t, e) {
    return (
      Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2) + Math.pow(e.Z - t.Z, 2)
    );
  }
  GetUiPriority() {
    return this.Api ? this.Api.TrackPriority : super.GetUiPriority();
  }
  ChangeLevelPlayTrackRange(t) {
    t = t ?? this.Api.TrackRadius;
    this.TrackRadiusSquared = t * t;
  }
}
exports.LevelPlayInfo = LevelPlayInfo;
//# sourceMappingURL=LevelPlay.js.map
