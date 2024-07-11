"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Quest = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LogicTreeContainer_1 = require("../../../GeneralLogicTree/LogicTreeContainer"),
  MapDefine_1 = require("../../../Map/MapDefine"),
  QuestController_1 = require("../../Controller/QuestController"),
  QuestDefine_1 = require("../../QuestDefine");
class Quest extends LogicTreeContainer_1.LogicTreeContainer {
  constructor(t, e) {
    super(),
      (this.InnerId = 0),
      (this.InnerType = void 0),
      (this.InnerMainType = 0),
      (this.InnerStatus = void 0),
      (this.Finished = !1),
      (this.IsNewQuest = !1),
      (this.Lo = void 0),
      (this.QuestNameTid = ""),
      (this.Kro = ""),
      (this.Qro = ""),
      (this.Xro = ""),
      (this.$ro = 0),
      (this.StageRewardId = 0),
      (this.Yro = void 0),
      (this.OnlineType = void 0),
      (this.AutoTrack = !1),
      (this.AutoHideTrackMark = !0),
      (this.DungeonId = 0),
      (this.FunctionId = 0),
      (this.TagId = 0),
      (this.DistributeType = void 0),
      (this.ActiveActions = void 0),
      (this.AcceptActions = void 0),
      (this.FinishActions = void 0),
      (this.TerminateActions = void 0),
      (this.AcceptQuestOptionConfig = void 0),
      (this.Jro = 0),
      e
        ? ((this.InnerId = e.Id),
          (this.InnerStatus = Protocol_1.Aki.Protocol.tTs.Proto_InActive),
          (this.InnerType = t),
          (this.Lo = e),
          (this.QuestNameTid = e.TidName),
          (this.Kro = e.TidDesc),
          (this.$ro = e.RewardId),
          (this.DungeonId = e.DungeonId),
          (this.FunctionId = e.FunctionId),
          (this.DistributeType = e.DistributeType),
          (this.OnlineType = e.OnlineType ?? "SingleHangUpOnline"),
          (this.AcceptQuestOptionConfig = e.AddInteractOption),
          (this.AutoTrack = e.IsAutoTrack),
          (this.Yro = e.RecommendPreQuest),
          (this.TagId = e.TagId ?? 0),
          (t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(
            this.Type,
          )) && (this.InnerMainType = t.MainId),
          (t =
            ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
              this.MainTypeId,
            )) && (this.AutoHideTrackMark = t.AutoHideTrack),
          (this.ActiveActions = e.ActiveActions),
          (this.AcceptActions = e.AcceptActions),
          (this.FinishActions = e.FinishActions),
          (this.TerminateActions = e.TerminateActions))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "找不到任务配置数据",
            ["任务Id", this.InnerId],
            ["配置路径", QuestDefine_1.QUEST_CONFIGPATH],
          );
  }
  get Id() {
    return this.InnerId ?? QuestDefine_1.INVALID_QUEST_ID;
  }
  get Type() {
    return this.InnerType;
  }
  get MainTypeId() {
    return this.InnerMainType;
  }
  get ChapterId() {
    return this.Lo.ChapterId;
  }
  get HideAcceptQuestMark() {
    return this.Lo.IsHideAcceptMarkOnNpc;
  }
  get Status() {
    return this.InnerStatus;
  }
  get IsProgressing() {
    return this.Status === Protocol_1.Aki.Protocol.tTs.zfs;
  }
  get IsInteractValid() {
    return (
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      "SingleHangUpOnline" !== this.OnlineType
    );
  }
  get RewardId() {
    return 0 !== this.StageRewardId ? this.StageRewardId : this.$ro;
  }
  get Name() {
    let t = this.Qro;
    return (
      (void 0 !== t && 0 !== t.length) || (t = this.QuestNameTid),
      PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
    );
  }
  get QuestDescribe() {
    let t = this.Xro;
    return (
      (void 0 !== t && 0 !== t.length) || (t = this.Kro),
      PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
    );
  }
  get QuestShowConditionDescribe() {
    return PublicUtil_1.PublicUtil.GetConfigTextByKey(
      this.Lo.PreShowInfo?.TidPreShowDesc ?? "",
    );
  }
  get QuestShowCondition() {
    return this.Lo.PreShowInfo?.PreShowCondition?.Conditions;
  }
  get UnlockCondition() {
    return this.Lo.ProvideType?.Conditions;
  }
  get QuestMarkId() {
    return ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(
      this.MainTypeId,
    );
  }
  Destroy() {
    (this.Lo = void 0),
      this.AcceptQuestOptionConfig &&
        ModelManager_1.ModelManager.MapModel.RemoveMapMark(12, this.Jro),
      super.Destroy();
  }
  UpdateState(t, e) {
    var i = this.InnerStatus,
      i = ((this.InnerStatus = t), i !== this.InnerStatus);
    if (i) {
      switch (((this.IsNewQuest = 1 === e), t)) {
        case Protocol_1.Aki.Protocol.tTs.hTs:
          this.OnQuestStateToReady();
          break;
        case Protocol_1.Aki.Protocol.tTs.zfs:
          this.OnQuestToProgress();
          break;
        case Protocol_1.Aki.Protocol.tTs.Proto_Finish:
          this.OnQuestToFinish();
          break;
        case Protocol_1.Aki.Protocol.tTs.Proto_Delete:
          this.OnQuestToDelete();
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.Id,
        this.Status,
        e,
      );
    }
  }
  OnQuestStateToReady() {
    switch (this.DistributeType) {
      case "Interact":
        ModelManager_1.ModelManager.QuestNewModel.AddCanAcceptQuest(this.Id),
          this.zro();
        break;
      case "System":
      case "UseItem":
      case "InformationViewCheck":
        break;
      default:
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Quest", 27, "未支持的任务派发类型：", [
            "this.DistributeType",
            this.DistributeType,
          ]);
    }
  }
  zro() {
    var t;
    this.HideAcceptQuestMark ||
      ((t = this.AcceptQuestOptionConfig)
        ? this.Zro(t.EntityId)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 19, "交互接取的任务没有配交互选项", [
            "任务Id",
            this.Id,
          ]));
  }
  OnQuestToProgress() {
    ModelManager_1.ModelManager.QuestNewModel.RemoveCanAcceptQuest(this.Id),
      this.AcceptQuestOptionConfig &&
        ModelManager_1.ModelManager.MapModel.RemoveMapMark(12, this.Jro);
  }
  OnQuestToFinish() {
    this.Finished = !0;
  }
  OnQuestToDelete() {
    var t;
    ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id ===
      this.Id &&
      ((t = this.Finished ? 1 : 0),
      QuestController_1.QuestNewController.RequestTrackQuest(
        this.Id,
        !1,
        2,
        t,
      ));
  }
  Zro(t) {
    var e;
    ModelManager_1.ModelManager.CreatureModel.GetEntityData(t)
      ? (e = this.QuestMarkId) &&
        this.IsInteractValid &&
        ((e = new MapDefine_1.QuestMarkCreateInfo(
          this.DungeonId,
          this.Id,
          0,
          t,
          e,
          12,
          5,
        )),
        (this.Jro = ModelManager_1.ModelManager.MapModel.CreateMapMark(e)))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Quest",
          50,
          "给任务添加地图标记时,找不到对应的实体",
          ["任务Id:", this.Id],
          ["实体Id", t],
        );
  }
  CanShowInUiPanel() {
    if (this.IsQuestCanPreShow()) return !0;
    if (this.Status !== Protocol_1.Aki.Protocol.tTs.zfs) return !1;
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
      this.Id,
    );
    if (
      t &&
      !ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        t,
      )?.CheckIfInOpenTime()
    )
      return !1;
    return super.CanShowInUiPanel();
  }
  IsQuestCanPreShow() {
    return (
      this.Status === Protocol_1.Aki.Protocol.tTs.Proto_InActive &&
      void 0 !== this.Lo.PreShowInfo
    );
  }
  IsQuestHasRecommendPreQuest() {
    return void 0 !== this.Yro;
  }
  GetRecommendPreQuest() {
    return this.Yro;
  }
  SetQuestStageName(t) {
    (this.Qro = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnQuestStageNameChange,
        this.Id,
      );
  }
  SetQuestStageDesc(t) {
    this.Xro = t;
  }
  SetQuestStageReward(t) {
    this.StageRewardId = t;
  }
  SetTrack(t, e = 0) {
    super.SetTrack(t, e),
      t && QuestController_1.QuestNewController.RedDotRequest(this.Id, 0);
  }
}
exports.Quest = Quest;
//# sourceMappingURL=Quest.js.map
