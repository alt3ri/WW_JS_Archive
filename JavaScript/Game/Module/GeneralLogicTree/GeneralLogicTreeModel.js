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
  GeneralLogicTreeDefine_1 = require("./Define/GeneralLogicTreeDefine");
class GeneralLogicTreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.dYt = void 0),
      (this.CYt = void 0),
      (this.gYt = void 0),
      (this.IWs = void 0),
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
      (this.IWs = new Map()),
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
    var r = MathUtils_1.MathUtils.LongToBigInt(i.s9n);
    let t = this.CYt.get(r);
    if (t) return t.Recover(i), t;
    let o = !this.IsWakeUp;
    switch (i.tps) {
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest:
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i.ZSs);
        n
          ? ((t = new BaseBehaviorTree_1.BaseBehaviorTree(
              r,
              i.ZSs,
              i.tps,
              n.DungeonId,
              n.QuestMarkId,
              n.IsNewQuest,
            )),
            n.SetUpBehaviorTree(t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "创建任务行为树时：任务不存在",
              ["任务Id", i.ZSs],
            );
        break;
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay:
        n =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            i.ZSs,
          );
        n
          ? ((t = new BaseBehaviorTree_1.BaseBehaviorTree(
              r,
              i.ZSs,
              i.tps,
              ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID,
            )),
            n.SetUpBehaviorTree(t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "创建玩法行为树时：玩法不存在",
              ["玩法Id", i.ZSs],
            );
        break;
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeInst: {
        n =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
        if (!n) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "创建副本行为树时：副本不存在",
              ["副本Id", i.ZSs],
            );
          break;
        }
        let e = GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID;
        switch (n.SubType) {
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
            r,
            i.ZSs,
            i.tps,
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            e,
          )),
          n.SetUpBehaviorTree(t);
        break;
      }
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            19,
            "创建行为树时找不到对应的行为树类型",
            ["行为树类型Id", i.tps],
          );
    }
    if (t) {
      this.CYt.set(r, t), this.fYt.set(r, i.n9n);
      let e = this.gYt.get(i.tps);
      return (
        e || ((e = new Map()), this.gYt.set(i.tps, e)),
        e.set(r, t),
        t.InitTree(i, o),
        t
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "GeneralLogicTree",
        19,
        "创建行为树失败",
        ["行为树类型Id", i.tps],
        ["行为树Id", i.ZSs],
      );
  }
  RemoveBehaviorTree(e) {
    var i = this.CYt.get(e);
    i && (i.Destroy(), this.CYt.delete(e), this.gYt.get(i.BtType)?.delete(e));
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
  SaveUpdateInfo(e, i, r) {
    var t =
        "Disabled" !==
        ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode(),
      e = new GeneralLogicTreeDefine_1.NodeStatusChangeInfo(e, i, t, r);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.QuestUpdateInfoAdd,
      e,
    );
  }
  ForceShowDailyQuestInfo(e, i) {
    var r = this.GetBehaviorTree(e);
    r && this.SaveUpdateInfo(e, i, r.CreateShowBridge());
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
    this.IWs.set(e.AEs, MathUtils_1.MathUtils.LongToBigInt(e.T5n));
  }
  RemoveOccupationInfo(e) {
    this.IWs.delete(e);
  }
  IsOccupationExist(e) {
    return void 0 !== this.IWs.get(e);
  }
  GetOccupationTreeId(e) {
    return this.IWs.get(e);
  }
  GetOccupationQuestName(e) {
    var e = this.IWs.get(e);
    return (e = e && this.GetBehaviorTree(e)) &&
      e.BtType === Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest
      ? ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId)
          ?.Name ?? ""
      : "";
  }
}
exports.GeneralLogicTreeModel = GeneralLogicTreeModel;
//# sourceMappingURL=GeneralLogicTreeModel.js.map
