"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralLogicTreeModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MissionViewDefine_1 = require("../BattleUi/Views/MissionView/MissionViewDefine"),
  BaseBehaviorTree_1 = require("./BaseBehaviorTree/BaseBehaviorTree"),
  GeneralLogicTreeDefine_1 = require("./Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeUtil_1 = require("./GeneralLogicTreeUtil");
class GeneralLogicTreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.dYt = void 0),
      (this.CYt = void 0),
      (this.gYt = void 0),
      (this.pKs = void 0),
      (this.fYt = void 0),
      (this.IsWakeUp = !1),
      (this.ExpressionOccupationTreeIncId = void 0),
      (this.CountDownViewClosing = !1),
      (this.DisableInput = !1),
      (this.nno = 0),
      (this.HistorySoarScore = 0);
  }
  OnInit() {
    return (
      (this.dYt = BigInt(0)),
      (this.CYt = new Map()),
      (this.gYt = new Map()),
      (this.fYt = new Map()),
      (this.pKs = new Map()),
      !0
    );
  }
  OnLeaveLevel() {
    return this.pYt(), !0;
  }
  OnChangeMode() {
    return this.pYt(), !0;
  }
  pYt() {
    for (var [, e] of this.CYt) e.SetSleep(!0);
    this.IsWakeUp = !1;
  }
  OnClear() {
    return (
      this.CYt?.clear(),
      (this.CYt = void 0),
      this.gYt?.clear(),
      (this.gYt = void 0),
      this.fYt?.clear(),
      !(this.fYt = void 0)
    );
  }
  SetTimerUiOwnerId(e) {
    this.dYt = e;
  }
  IsTimerUiOwner(e) {
    return this.dYt === e;
  }
  CreateBehaviorTree(i) {
    var r = MathUtils_1.MathUtils.LongToBigInt(i.C9n);
    let t = this.CYt.get(r);
    if (t) return t.Recover(i), t;
    let n = !this.IsWakeUp;
    switch (i.hps) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        var o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i.sEs);
        o
          ? ((e = o.IsSecretQuest || 11 === o.Type),
            (t = new BaseBehaviorTree_1.BaseBehaviorTree(
              r,
              i.sEs,
              i.hps,
              o.DungeonId,
              o.QuestMarkId,
              o.OnlineType,
              o.GetUiPriority(),
              o.IsNewQuest,
              e,
            )),
            o.SetUpBehaviorTree(t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "创建任务行为树时：任务不存在",
              ["任务Id", i.sEs],
            );
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        var e =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            i.sEs,
          );
        e
          ? ((o =
              ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkIdByQuestId(
                i.sEs,
              )),
            (t = new BaseBehaviorTree_1.BaseBehaviorTree(
              r,
              i.sEs,
              i.hps,
              ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              o ?? GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID,
              e.OnlineType,
              e.GetUiPriority(),
            )).SetUseInnerTrackIconId(void 0 !== o),
            e.SetUpBehaviorTree(t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "创建玩法行为树时：玩法不存在",
              ["玩法Id", i.sEs],
            );
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst: {
        o =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
        if (!o) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "创建副本行为树时：副本不存在",
              ["副本Id", i.sEs],
            );
          break;
        }
        let e = GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID;
        switch (o.SubType) {
          case 2:
            e =
              ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(
                1,
              );
            break;
          case 1:
            e =
              ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(
                3,
              );
        }
        (n = !ModelManager_1.ModelManager.GameModeModel.WorldDone),
          (t = new BaseBehaviorTree_1.BaseBehaviorTree(
            r,
            i.sEs,
            i.hps,
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            e,
            o.OnlineType,
            o.GetUiPriority(),
          )),
          o.SetUpBehaviorTree(t);
        break;
      }
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            18,
            "创建行为树时找不到对应的行为树类型",
            ["行为树类型Id", i.hps],
          );
    }
    if (t) {
      this.CYt.set(r, t), this.fYt.set(r, i.d9n);
      let e = this.gYt.get(i.hps);
      return (
        e || ((e = new Map()), this.gYt.set(i.hps, e)),
        e.set(r, t),
        t.InitTree(i, n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CreateBehaviorTree,
          i.hps,
        ),
        t
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "GeneralLogicTree",
        18,
        "创建行为树失败",
        ["行为树类型Id", i.hps],
        ["行为树Id", i.sEs],
      );
  }
  RemoveBehaviorTree(e) {
    var i = this.CYt.get(e);
    i &&
      (i.Destroy(),
      this.CYt.delete(e),
      this.gYt.get(i.BtType)?.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveBehaviorTree,
        i.BtType,
      ));
  }
  GetBehaviorTree(e) {
    return this.CYt.get(e);
  }
  GetBehaviorTreeOwnerId(e) {
    if (void 0 !== e) return this.fYt.get(e);
  }
  GetAllBehaviorTrees() {
    return this.CYt;
  }
  SaveUpdateInfo(e, i) {
    var r,
      t,
      n,
      e = this.GetBehaviorTree(e);
    e &&
      ((n = (e = e.GetBlackBoard()).CreateShowData()),
      (r = e.ContainTag(9)),
      (t =
        "Disabled" !==
        ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode()),
      (n = new MissionViewDefine_1.QuestUpdateTipsShowData(n, t, r, i)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.QuestUpdateInfoAdd,
        n,
      ),
      e.RemoveTag(9));
  }
  SaveUpdateInfoByQuestId(e) {
    var i,
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e &&
      ((i =
        "Disabled" !==
        ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode()),
      (e = MissionViewDefine_1.LackResourceQuestViewShowData.Create(
        e.Id,
        e.QuestMarkId,
        e.NameKey,
        new MissionViewDefine_1.LackResourceQuestTextInfo(
          "quest_lackResource_text",
        ),
        void 0,
      )),
      (e = new MissionViewDefine_1.QuestUpdateTipsShowData(e, i, !0, 0)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.QuestUpdateInfoAdd,
        e,
      ));
  }
  ApplyExpressionOccupation(e) {
    e &&
      this.ExpressionOccupationTreeIncId !== e &&
      ((this.ExpressionOccupationTreeIncId = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
        e,
      ));
  }
  IsExpressionInOccupying() {
    return void 0 !== this.ExpressionOccupationTreeIncId;
  }
  IsExpressionOccupyingByTree(e) {
    return (
      void 0 !== this.ExpressionOccupationTreeIncId &&
      this.ExpressionOccupationTreeIncId === e
    );
  }
  TryReleaseExpressionOccupation(e) {
    this.ExpressionOccupationTreeIncId &&
      this.ExpressionOccupationTreeIncId === e &&
      ((this.ExpressionOccupationTreeIncId = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
        e,
      ));
  }
  UpdateGuideLineStartShowTime() {
    this.nno = TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetGuideLineStartShowTime() {
    return this.nno;
  }
  AddOccupationInfo(e) {
    this.pKs.set(e.qEs, MathUtils_1.MathUtils.LongToBigInt(e.w5n));
  }
  RemoveOccupationInfo(e) {
    this.pKs.delete(e);
  }
  IsOccupationExist(e) {
    return void 0 !== this.pKs.get(e);
  }
  GetOccupationTreeId(e) {
    return this.pKs.get(e);
  }
  GetOccupationQuestName(e) {
    var e = this.pKs.get(e);
    return (e = e && this.GetBehaviorTree(e)) &&
      e.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
      ? (ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId)
          ?.Name ?? "")
      : "";
  }
  GetBehaviorTreeName(e) {
    var e = this.GetBehaviorTree(e);
    let i = "";
    return (
      e &&
        ((e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
          e.BtType,
          e.TreeConfigId,
        )),
        (i = e.Name)),
      i
    );
  }
}
exports.GeneralLogicTreeModel = GeneralLogicTreeModel;
//# sourceMappingURL=GeneralLogicTreeModel.js.map
