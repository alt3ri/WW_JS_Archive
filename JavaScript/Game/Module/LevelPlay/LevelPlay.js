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
  constructor(e) {
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
      (this.u1i = e),
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
      var e = this.BehaviorTree.GetBlackBoard();
      if (!e.DisableExpression) {
        if (e.IsCustomUi()) return !0;
        e = this.BehaviorTree.GetActiveChildQuestNodesId();
        if (e)
          for (const r of e) {
            var t = this.BehaviorTree.GetNode(r),
              i = t?.MultiTrackText;
            if (i && !StringUtils_1.StringUtils.IsBlank(i) && !t.ContainTag(2))
              return !0;
          }
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
  get LevelPlayTypeNumber() {
    return this.bpi ? LevelPlayDefine_1.levelPlayTypeToNumber[this.bpi] : -1;
  }
  InitConfig() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
      this.u1i,
    );
    if (e) {
      switch (
        ((this.d1i = e.LevelId),
        (this.m1i = e.LevelPlayEntityId),
        (this.C1i = e.InstanceId ?? 0),
        (this.c1i = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidName)),
        (this.Upi = e.LevelPlayMark),
        (this.Api = e.LevelPlayTrack),
        (this.Rpi = !0),
        (this.E1i = e.LevelPlayOpenActions),
        (this.wpi = e.EnterInRangeActions),
        (this.Bpi = e.OnlineType),
        (this.bpi = e.Type),
        e.LevelPlayRewardConfig.Type)
      ) {
        case "Interact":
          (this.p1i = e.LevelPlayRewardConfig.RewardId),
            (this.Ppi = e.LevelPlayRewardConfig.FirstRewardId ?? 0),
            (this.v1i = e.LevelPlayRewardConfig.RewardEntityId),
            (this.M1i = e.LevelPlayRewardConfig.RewardCompleteActions),
            (this.xpi = e.LevelPlayRewardConfig.FirstCompleteActions);
          break;
        case "Automatic":
          (this.p1i = e.LevelPlayRewardConfig.RewardId),
            (this.Ppi = e.LevelPlayRewardConfig.FirstRewardId ?? 0);
      }
      this.Api && this.ChangeLevelPlayTrackRange(this.Api.TrackRadius);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 18, "创建玩法时找不到玩法配置", [
          "玩法id",
          this.u1i,
        ]);
  }
  UpdateFirstPass(e) {
    this.Lpi = e ?? !1;
  }
  UpdateState(e) {
    (this.ac = e ?? 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnLevelPlayStateChange,
        this.u1i,
        this.ac,
      );
  }
  UpdateRefreshTime(e) {
    this.Dpi = Number(MathUtils_1.MathUtils.LongToBigInt(e));
  }
  UpdateCanGetReward(e) {
    this.Rpi = e;
  }
  UpdateDistanceSquared(e) {
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(
      this.LevelPlayEntityId,
    );
    t
      ? (this.CacheDistanceSquared = this.qpi(t, e))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneGameplay", 18, "配置的玩法追踪坐标为空", [
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
  qpi(e, t) {
    return (
      Math.pow(t.X - e.X, 2) + Math.pow(t.Y - e.Y, 2) + Math.pow(t.Z - e.Z, 2)
    );
  }
  GetUiPriority() {
    return this.Api ? this.Api.TrackPriority : super.GetUiPriority();
  }
  ChangeLevelPlayTrackRange(e) {
    e = e ?? this.Api.TrackRadius;
    this.TrackRadiusSquared = e * e;
  }
}
exports.LevelPlayInfo = LevelPlayInfo;
//# sourceMappingURL=LevelPlay.js.map
