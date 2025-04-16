"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestNewModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ActivityQuestConfigAll_1 = require("../../../../Core/Define/ConfigQuery/ActivityQuestConfigAll"),
  QuestTrackingConfigAll_1 = require("../../../../Core/Define/ConfigQuery/QuestTrackingConfigAll"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IGlobal_1 = require("../../../../UniverseEditor/Interface/IGlobal"),
  IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeConfigUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeConfigUtil"),
  QuestDefine_1 = require("../QuestDefine"),
  QuestTypeDefine_1 = require("./Quest/QuestTypeDefine");
class QuestNewModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.eno = void 0),
      (this.tno = void 0),
      (this.ino = void 0),
      (this.nVa = void 0),
      (this.sb1 = void 0),
      (this.ono = void 0),
      (this.rno = void 0),
      (this.sno = void 0),
      (this.ano = void 0),
      (this.CurShowUpdateTipsQuest = void 0),
      (this.ActivityIdsByQuestId = void 0),
      (this.ActivityStatesByQuestId = new Map()),
      (this.IsServerNotifyEnd = !1),
      (this.IsLackQuestVideoResource = !1),
      (this.QuestVideoResourceDownloadFinished = !1),
      (this.ServerNotifyEndQuestId = 0),
      (this.Zpi = (e) => {
        for (const t of JSON.parse(e).Quests)
          this.ono.set(t.Id, t),
            t.Tree &&
              GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitBehaviorNodeConfig(
                this.rno,
                t.Id,
                t.Tree,
              );
      }),
      (this.SortQuestInView = (e, t) => {
        var i = [];
        for (const s of [e.Id, t.Id]) {
          let e = this.GetQuestBindingActivityId(s);
          0 === e && (e = this.GetQuestActivityId(s));
          var r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
          let t = 0;
          (t =
            void 0 !== r
              ? r.LocalConfig?.IfShowQuestLeftTime &&
                r.CheckIfInOpenTime() &&
                0 !== r.EndOpenTime
                ? 0
                : 1
              : 2),
            i.push(t);
        }
        return i[0] !== i[1] ? i[0] - i[1] : e.Id - t.Id;
      });
  }
  OnInit() {
    return (
      (this.eno = new Map()),
      (this.tno = new Map()),
      (this.ino = new Map()),
      (this.nVa = new Map()),
      (this.sb1 = new Map()),
      (this.ono = new Map()),
      (this.rno = new Map()),
      (this.ano = new Map()),
      (this.ActivityIdsByQuestId = new Map()),
      (this.ActivityStatesByQuestId = new Map()),
      this.InitQuestConfig(),
      this.SetActivityStates(),
      PublicUtil_1.PublicUtil.RegisterEditorLocalConfig(),
      !0
    );
  }
  OnClear() {
    if (this.eno) {
      for (var [, e] of this.eno) e.Destroy();
      this.eno.clear(), (this.eno = void 0);
    }
    return (
      (this.sno = void 0),
      this.ono?.clear(),
      (this.ono = void 0),
      this.rno?.clear(),
      (this.rno = void 0),
      this.tno?.clear(),
      (this.tno = void 0),
      this.ino?.clear(),
      (this.ino = void 0),
      this.nVa?.clear(),
      (this.nVa = void 0),
      this.sb1?.clear(),
      (this.sb1 = void 0),
      this.ActivityIdsByQuestId?.clear(),
      (this.ActivityIdsByQuestId = void 0),
      this.ActivityStatesByQuestId?.clear(),
      (this.IsServerNotifyEnd = !1),
      !(this.ServerNotifyEndQuestId = 0)
    );
  }
  OnLeaveLevel() {
    return !0;
  }
  InitQuestConfig() {
    var e;
    PublicUtil_1.PublicUtil.UseDbConfig() ||
      (this.ono.clear(),
      this.rno.clear(),
      (e = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.QuestListDir,
      )),
      GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitConfig(
        e,
        this.Zpi,
      ));
  }
  AddQuest(e) {
    var t,
      i = this.GetQuestConfig(e);
    if (i)
      return (
        (t = this.eno.get(e)) ||
          ((t = (0, QuestTypeDefine_1.createQuestObj)(i)),
          this.eno.set(e, t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddNewQuest,
            t,
          )),
        t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Quest",
        18,
        "添加任务时找不到任务配置",
        ["配置路径", QuestDefine_1.QUEST_CONFIGPATH],
        ["任务Id", e],
      );
  }
  RemoveQuest(e) {
    var t = this.eno.get(e);
    t && (t.Destroy(), this.eno.delete(e));
  }
  AddFinishedQuest(e) {
    this.ino.set(e, !0);
  }
  GetCanAcceptQuest() {
    return this.tno;
  }
  AddCanAcceptQuest(e) {
    this.tno.set(e, !0);
  }
  RemoveCanAcceptQuest(e) {
    this.tno.delete(e);
  }
  AddPreShowQuest(e) {
    this.nVa.set(e, !0), this.AddQuest(e);
  }
  RemovePreShowQuest(e) {
    this.nVa.delete(e),
      this.GetQuest(e)?.Status === Protocol_1.Aki.Protocol.hTs.Proto_InActive &&
        this.RemoveQuest(e);
  }
  GetPreShowQuests() {
    return this.nVa;
  }
  AddLackResourceQuest(e) {
    this.sb1.set(e, !0);
    e = this.AddQuest(e);
    e && (e.LockByLackResource = !0);
  }
  RemoveLackResourceQuest(e) {
    this.sb1.delete(e);
    e = this.GetQuest(e);
    e && (e.LockByLackResource = !1);
  }
  IsTrackingQuest(e) {
    return this.GetCurTrackedQuest()?.Id === e;
  }
  GetCurTrackedQuest() {
    return this.sno;
  }
  SetQuestTrackState(e, t, i = 0) {
    if (t) {
      t = this.GetQuest(e);
      if (t?.IsProgressing) {
        if (this.sno) {
          if (this.sno.Id === t.Id) return;
          this.sno.SetTrack(!1, i);
        }
        (this.sno = t).SetTrack(!0, i);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Quest", 18, "更新任务追踪时,找不到进行中的任务", [
            "任务Id",
            e,
          ]);
    } else
      this.sno &&
        this.sno.Id === e &&
        (this.sno.SetTrack(!1, i),
        (this.sno = void 0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
        ));
  }
  GetCurQuestTrackPosition(e = 0, t) {
    var i = this.GetCurTrackedQuest();
    if (i) {
      var r = i.GetActiveChildQuestNodesId();
      if (!(0 === r.length || e > r.length - 1))
        return i.GetNodeTrackPosition(r[e]);
    }
  }
  TryGetMapMarkIdByQuestId(e) {
    var t = this.GetQuest(e);
    if (t) {
      var i = t.TreeId,
        t = ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().get(12);
      if (t)
        for (const s of t.values()) {
          var r = s;
          if (r.TreeId === i || r.TreeId === e) return r.MarkId;
        }
    }
  }
  GetQuestConfig(e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.ono.get(e);
    let t = this.ono.get(e);
    if (!t) {
      var i = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestConfig(e);
      if (!i) return;
      (t = JSON.parse(i.Data)), this.ono.set(e, t);
    }
    return t;
  }
  GetQuestNodeConfig(e, t) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.rno.get(e)?.get(t);
    let i = this.rno.get(e),
      r = (i = i || new Map()).get(t);
    if (!r) {
      e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestNodeConfig(e, t);
      if (!e) return;
      (r = JSON.parse(e.Data)), i.set(t, r);
    }
    return r;
  }
  GetQuest(e) {
    return this.eno.get(e);
  }
  GetQuestState(e) {
    var t = this.GetQuest(e);
    return t ? t.Status : this.ino.get(e) ? 3 : this.tno.get(e) ? 1 : 0;
  }
  CheckQuestFinished(e) {
    return 3 === this.GetQuestState(e);
  }
  GetQuestsByType(e) {
    var t,
      i = [];
    for ([, t] of this.eno) t.Type === e && i.push(t);
    return i;
  }
  GetQuestsByTypeAndSubType(e, t) {
    var i,
      r = [];
    for ([, i] of this.eno) i.Type === e && i.SubType === t && r.push(i);
    return r;
  }
  GetFirstShowQuestByType(e) {
    e = this.GetQuestsByType(e);
    e.sort(this.SortQuestInView);
    for (const t of e) if (t.CanShowInUiPanel()) return t;
  }
  GetQuestName(e) {
    e = this.GetQuest(e);
    return e ? e.Name : "";
  }
  SetQuestStageName(e, t) {
    e = this.GetQuest(e);
    e && e.SetQuestStageName(t);
  }
  SetQuestStageDesc(e, t) {
    e = this.GetQuest(e);
    e && e.SetQuestStageDesc(t);
  }
  SetQuestStageReward(e, t) {
    e = this.GetQuest(e);
    e && e.SetQuestStageReward(t);
  }
  GetQuestDetails(e) {
    e = this.GetQuest(e);
    return e ? e.QuestDescribe : "";
  }
  GetShowQuestConditionDescribe(e) {
    e = this.GetQuest(e);
    return e ? e.QuestShowConditionDescribe : "";
  }
  GetUnlockConditions(e) {
    e = this.GetQuest(e);
    if (e) return e.UnlockCondition;
  }
  GetShowQuestChapterIdFromConfig(e) {
    e = this.GetQuestConfig(e);
    return e ? e.ChapterId : 0;
  }
  GetShowQuestConditionFromConfig(e) {
    e = this.GetQuestConfig(e);
    return e
      ? PublicUtil_1.PublicUtil.GetConfigTextByKey(
          e.PreShowInfo?.TidPreShowDesc ?? "",
        )
      : "";
  }
  GetDisplayRewardInfo(e) {
    e = this.GetQuest(e);
    if (e) {
      const o = ConfigManager_1.ConfigManager.QuestNewConfig.GetDropConfig(
        e.RewardId,
      );
      if (o && 0 !== o.DropPreview.size) {
        var t,
          i = [];
        for ([t] of o.DropPreview) {
          var r =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                t,
              ),
            s = o.DropPreview.get(t);
          if (r) {
            const o = new QuestDefine_1.QuestRewardInfo(t, s);
            i.push(o);
          }
        }
        return i;
      }
    }
  }
  GetDisplayRewardCommonInfo(e) {
    e = this.GetQuest(e);
    if (e) {
      var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetDropConfig(
        e.RewardId,
      );
      if (t && 0 !== t.DropPreview.size) {
        var i,
          r = [];
        for ([i] of t.DropPreview) {
          var s =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                i,
              ),
            o = t.DropPreview.get(i);
          s && r.push([{ IncId: 0, ItemId: i }, o]);
        }
        return r;
      }
    }
  }
  GetQuestLockIconPath(t) {
    t = this.GetQuest(t);
    if (t) {
      let e = void 0;
      return (
        t.IsSuspend()
          ? (e =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_IconOccupy",
              ))
          : t.IsQuestCanPreShow()
            ? (e =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  "SP_FuncLock",
                ))
            : t.IsQuestHasRecommendPreQuest()
              ? (e =
                  ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                    "SP_ComExclamation",
                  ))
              : t.HasRefOccupiedEntity() &&
                (e =
                  ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                    "SP_IconOccupy",
                  )),
        e
      );
    }
  }
  SetQuestRedDot(e, t) {
    t ? this.ano.set(e, !0) : this.ano.delete(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Quest",
          18,
          "任务红点状态改变",
          ["questId", e],
          ["bAdd", t],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnQuestRedDotStateChange,
        e,
      );
  }
  CheckQuestRedDotDataState(e) {
    return this.ano.get(e);
  }
  GetAllRedDotData() {
    return this.ano;
  }
  GetCurWorldLevelBreakQuest() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "WorldLevelBreakthroughTask",
    );
    if (void 0 === e) return -1;
    let t = -1;
    return (
      e.forEach((e) => {
        void 0 !== this.GetQuest(e) && (t = e);
      }),
      t
    );
  }
  SetActivityQuestData(e, t) {
    if (t && 0 !== t.length)
      for (const i of t) this.ActivityIdsByQuestId.set(i, e);
  }
  SetActivityStates() {
    var e =
      ActivityQuestConfigAll_1.configActivityQuestConfigAll.GetConfigList();
    if (e)
      for (const t of e)
        this.ActivityStatesByQuestId.set(t.QuestId, [
          t.ActivityId,
          t.IsDisplay,
        ]);
  }
  GetQuestBindingActivityId(e) {
    return this.ActivityIdsByQuestId.get(e) ?? 0;
  }
  GetQuestActivityId(e) {
    return this.ActivityStatesByQuestId.get(e)?.[0] ?? 0;
  }
  GetQuestShowQuestLeftTime(e) {
    return this.ActivityStatesByQuestId.get(e)?.[1] ?? !1;
  }
  GetActivityGuideQuestRemainTimeText(e, t) {
    var e = Math.max(e, 1),
      i = this.FOe(e),
      e =
        TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, i[0], i[1])
          .CountDownText ?? "";
    return StringUtils_1.StringUtils.Format(t, e);
  }
  FOe(e) {
    return e > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : e > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 1]
        : e > CommonDefine_1.SECOND_PER_MINUTE
          ? [1, 0]
          : [0, 0];
  }
  GetSuccessiveQuestId(e) {
    var r =
      QuestTrackingConfigAll_1.configQuestTrackingConfigAll.GetConfigList();
    if (void 0 !== e && r) {
      let t = -1,
        i = void 0;
      for (const s of r)
        if (s.PreQuestIds.includes(e)) {
          let e = !0;
          for (const o of s.PreQuestIds)
            if (!this.CheckQuestFinished(o)) {
              e = !1;
              break;
            }
          e &&
            (s.Priority > t || (s.Priority === t && s.TrackQuestId < i)) &&
            ((t = s.Priority), (i = s.TrackQuestId));
        }
      return i;
    }
  }
  GetHighestPriorityProcessingQuestId() {
    if (this.eno) {
      let e = -1,
        t = void 0;
      for (var [i] of this.eno) {
        var r = this.GetQuestConfig(i);
        r?.RecommendationPriority &&
          !this.CheckQuestFinished(i) &&
          (r?.RecommendationPriority > e ||
            (r?.RecommendationPriority === e && i < t)) &&
          ((e = r?.RecommendationPriority), (t = i));
      }
      return t;
    }
  }
  RefreshResidentQuestMapMark() {
    if (this.eno)
      for (var [, e] of this.eno)
        e.Tree?.GetMapMarkResident() &&
          (e.Tree.Expression?.RefreshMapMark(!0),
          e.Tree.Expression?.RefreshMapMark(!1));
  }
  CheckBehaviorStepFinishState(e, t) {
    var i = e.QuestScheduleType;
    switch (i.Type) {
      case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
        var r =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
        return r
          ? !(r = r.GetNode(i.ChildQuestId)) || r.IsProcessing
            ? 0
            : r.IsSuccess
              ? 1
              : 2
          : 0;
      case IQuest_1.EQuestScheduleType.TimeLeft:
        var r =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
        return r
          ? ((s = i.TimerType),
            (r = r.GetChallengeRemainTime(s)) ? (i.TimeLeft <= r ? 1 : 2) : 0)
          : 0;
      case IQuest_1.EQuestScheduleType.Condition:
        var s =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
        return s
          ? (r = i.Condition)
            ? ((s = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
                s.BtType,
                s.TreeIncId,
                s.TreeConfigId,
              )),
              ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
                r,
                void 0,
                s,
              )
                ? 1
                : 2)
            : 0
          : 0;
    }
    return 0;
  }
}
exports.QuestNewModel = QuestNewModel;
//# sourceMappingURL=QuestModel.js.map
