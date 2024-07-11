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
      (this.uli = 0),
      (this.Tfi = !1),
      (this.Lfi = 0),
      (this.ac = 0),
      (this.Dfi = !1),
      (this.TrackRadiusSquared = 0),
      (this.CacheDistanceSquared = 0),
      (this.cli = ""),
      (this.mli = 0),
      (this.dli = 0),
      (this.Cli = 0),
      (this.Rfi = void 0),
      (this.Ufi = void 0),
      (this.fli = void 0),
      (this.pli = 0),
      (this.Afi = 0),
      (this.vli = 0),
      (this.Mli = void 0),
      (this.Sli = void 0),
      (this.Pfi = void 0),
      (this.xfi = void 0),
      (this.wfi = "Local"),
      (this.Bfi = void 0),
      (this.uli = t),
      (this.Tfi = !1),
      (this.Lfi = 0),
      (this.ac = 0),
      (this.CacheDistanceSquared = -1);
  }
  get Id() {
    return this.uli;
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
      this.Ufi &&
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
    return this.Tfi;
  }
  get RefreshTime() {
    return this.Lfi;
  }
  get CanGetReward() {
    return this.Dfi;
  }
  get Name() {
    return this.cli;
  }
  get LevelPlayEntityId() {
    return this.mli;
  }
  get MapId() {
    return this.dli;
  }
  get InstanceId() {
    return this.Cli;
  }
  get MarkConfig() {
    return this.Rfi;
  }
  get NeedShowInMap() {
    return void 0 !== this.MarkConfig;
  }
  get TrackPriority() {
    return (
      this.Ufi?.TrackPriority ??
      LevelPlayDefine_1.INVALID_LEVELPLAY_TRACKPRIORITY
    );
  }
  get RewardConfig() {
    return this.fli;
  }
  get RewardId() {
    return this.pli;
  }
  get FirstRewardId() {
    return this.Afi;
  }
  get RewardEntityId() {
    return this.vli;
  }
  get AfterGetRewardAction() {
    return this.Mli;
  }
  get LevelPlayOpenAction() {
    return this.Sli;
  }
  get LevelPlayFirstPassAction() {
    return this.Pfi;
  }
  get LevelPlayEnterAction() {
    return this.xfi;
  }
  get OnlineType() {
    return this.wfi;
  }
  get IsInteractValid() {
    return (
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      "Local" !== this.OnlineType
    );
  }
  get LevelPlayType() {
    return this.Bfi;
  }
  InitConfig() {
    var t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
      this.uli,
    );
    if (t) {
      switch (
        ((this.dli = t.LevelId),
        (this.mli = t.LevelPlayEntityId),
        (this.Cli = t.InstanceId ?? 0),
        (this.cli = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)),
        (this.Rfi = t.LevelPlayMark),
        (this.Ufi = t.LevelPlayTrack),
        (this.Dfi = !0),
        (this.Sli = t.LevelPlayOpenActions),
        (this.xfi = t.EnterInRangeActions),
        (this.wfi = t.OnlineType),
        (this.Bfi = t.Type),
        t.LevelPlayRewardConfig.Type)
      ) {
        case "Interact":
          (this.pli = t.LevelPlayRewardConfig.RewardId),
            (this.Afi = t.LevelPlayRewardConfig.FirstRewardId ?? 0),
            (this.vli = t.LevelPlayRewardConfig.RewardEntityId),
            (this.Mli = t.LevelPlayRewardConfig.RewardCompleteActions),
            (this.Pfi = t.LevelPlayRewardConfig.FirstCompleteActions);
          break;
        case "Automatic":
          (this.pli = t.LevelPlayRewardConfig.RewardId),
            (this.Afi = t.LevelPlayRewardConfig.FirstRewardId ?? 0);
      }
      this.Ufi && this.ChangeLevelPlayTrackRange(this.Ufi.TrackRadius);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 19, "创建玩法时找不到玩法配置", [
          "玩法id",
          this.uli,
        ]);
  }
  UpdateFirstPass(t) {
    this.Tfi = t ?? !1;
  }
  UpdateState(t) {
    (this.ac = t ?? 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnLevelPlayStateChange,
        this.uli,
      );
  }
  UpdateRefreshTime(t) {
    this.Lfi = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  UpdateCanGetReward(t) {
    this.Dfi = t;
  }
  UpdateDistanceSquared(t) {
    var e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(
      this.LevelPlayEntityId,
    );
    e
      ? (this.CacheDistanceSquared = this.bfi(e, t))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneGameplay", 19, "配置的玩法追踪坐标为空", [
          "玩法id",
          this.uli,
        ]);
  }
  IsInTrackRange() {
    return (
      !(this.CacheDistanceSquared < 0) &&
      this.CacheDistanceSquared < this.TrackRadiusSquared
    );
  }
  bfi(t, e) {
    return (
      Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2) + Math.pow(e.Z - t.Z, 2)
    );
  }
  GetUiPriority() {
    return this.Ufi ? this.Ufi.TrackPriority : super.GetUiPriority();
  }
  ChangeLevelPlayTrackRange(t) {
    t = t ?? this.Ufi.TrackRadius;
    this.TrackRadiusSquared = t * t;
  }
}
exports.LevelPlayInfo = LevelPlayInfo;
//# sourceMappingURL=LevelPlay.js.map
