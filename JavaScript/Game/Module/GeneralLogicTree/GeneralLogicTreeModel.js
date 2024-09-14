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
      (this.TimeStop = !1),
      (this.CountDownViewClosing = !1),
      (this.DisableInput = !1),
      (this.nno = 0);
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
  CreateBehaviorTree(r) {
    var i = MathUtils_1.MathUtils.LongToBigInt(r.C9n);
    let t = this.CYt.get(i);
    if (t) return t.Recover(r), t;
    let o = !this.IsWakeUp;
    switch (r.hps) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r.sEs);
        e
          ? ((t = new BaseBehaviorTree_1.BaseBehaviorTree(
              i,
              r.sEs,
              r.hps,
              e.DungeonId,
              e.QuestMarkId,
              e.IsNewQuest,
            )),
            e.SetUpBehaviorTree(t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "创建任务行为树时：任务不存在",
              ["任务Id", r.sEs],
            );
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        e =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            r.sEs,
          );
        e
          ? ((a =
              ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkIdByQuestId(
                r.sEs,
              )),
            (t = new BaseBehaviorTree_1.BaseBehaviorTree(
              i,
              r.sEs,
              r.hps,
              ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              a ?? GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID,
            )).SetUseInnerTrackIconId(void 0 !== a),
            e.SetUpBehaviorTree(t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "创建玩法行为树时：玩法不存在",
              ["玩法Id", r.sEs],
            );
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst: {
        var a =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
        if (!a) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "创建副本行为树时：副本不存在",
              ["副本Id", r.sEs],
            );
          break;
        }
        let e = GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID;
        switch (a.SubType) {
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
        (o =
          !ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed),
          (t = new BaseBehaviorTree_1.BaseBehaviorTree(
            i,
            r.sEs,
            r.hps,
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            e,
          )),
          a.SetUpBehaviorTree(t);
        break;
      }
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            19,
            "创建行为树时找不到对应的行为树类型",
            ["行为树类型Id", r.hps],
          );
    }
    if (t) {
      this.CYt.set(i, t), this.fYt.set(i, r.d9n);
      let e = this.gYt.get(r.hps);
      return (
        e || ((e = new Map()), this.gYt.set(r.hps, e)),
        e.set(i, t),
        t.InitTree(r, o),
        t
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "GeneralLogicTree",
        19,
        "创建行为树失败",
        ["行为树类型Id", r.hps],
        ["行为树Id", r.sEs],
      );
  }
  RemoveBehaviorTree(e) {
    var r = this.CYt.get(e);
    r && (r.Destroy(), this.CYt.delete(e), this.gYt.get(r.BtType)?.delete(e));
  }
  GetBehaviorTree(e) {
    return this.CYt.get(e);
  }
  GetBehaviorTrees(e) {
    return this.gYt.get(e);
  }
  GetBehaviorTreeOwnerId(e) {
    if (void 0 !== e) return this.fYt.get(e);
  }
  GetAllBehaviorTrees() {
    return this.CYt;
  }
  SaveUpdateInfo(e, r, i) {
    var t =
        "Disabled" !==
        ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode(),
      e = new GeneralLogicTreeDefine_1.NodeStatusChangeInfo(e, r, t, i);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.QuestUpdateInfoAdd,
      e,
    );
  }
  ForceShowDailyQuestInfo(e, r) {
    var i = this.GetBehaviorTree(e);
    i && this.SaveUpdateInfo(e, r, i.CreateShowBridge());
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
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
        e,
      ),
      (this.ExpressionOccupationTreeIncId = void 0));
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
    let r = "";
    return (
      e &&
        ((e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
          e.BtType,
          e.TreeConfigId,
        )),
        (r = e.Name)),
      r
    );
  }
}
exports.GeneralLogicTreeModel = GeneralLogicTreeModel;
//# sourceMappingURL=GeneralLogicTreeModel.js.map
