"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Blackboard = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil"),
  BehaviorTreeShowBridge_1 = require("./BehaviorTreeShowBridge"),
  BehaviorTreeTagComponent_1 = require("./BehaviorTreeTagComponent");
class Blackboard extends BehaviorTreeTagComponent_1.BehaviorTreeTagContainer {
  constructor(e, t, r, i, s) {
    switch (
      (super(),
      (this.gKt = 0),
      (this.fKt = 0),
      (this.MarkType = 12),
      (this.TrackSource = void 0),
      (this.MapMarkResident = !1),
      (this.CurrentDungeonId = 0),
      (this.IsTracking = !1),
      (this.IsSleeping = !1),
      (this.BtType = Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid),
      (this.TreeIncId = BigInt(0)),
      (this.TreeConfigId = 0),
      (this.PreparingRollbackNodes = void 0),
      (this.fZ = void 0),
      (this.pKt = void 0),
      (this.vKt = void 0),
      (this.UiTrackTextInfo = void 0),
      (this.SilentAreaShowInfo = []),
      (this.x5s = void 0),
      (this.TrackViewModel = "All"),
      (this.GetNodeConfig = (e) => {
        var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetNodeConfig(
          this.BtType,
          this.TreeConfigId,
          e,
        );
        return (
          t ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "找不到节点配置",
                [
                  "行为树类型",
                  GeneralLogicTreeDefine_1.btTypeLogString[this.BtType],
                ],
                ["行为树Id", this.TreeConfigId],
                ["节点Id", e],
              )),
          t
        );
      }),
      (this.BtType = e),
      (this.TreeIncId = t),
      (this.TreeConfigId = r),
      (this.gKt = i),
      (this.CurrentDungeonId = i),
      (this.PreparingRollbackNodes = []),
      (this.fZ = new Map()),
      (this.pKt = new Map()),
      (this.vKt = new Map()),
      (this.UiTrackTextInfo =
        new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo()),
      (this.x5s = new Map()),
      (this.fKt = s),
      (this.MarkType = 12),
      this.BtType)
    ) {
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
        this.TrackSource = 5;
        break;
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
        this.TrackSource = 4;
        break;
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
        this.TrackSource = 2;
    }
  }
  get TaskMarkTableId() {
    return this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
      this.IsChallengeUi()
      ? GeneralLogicTreeDefine_1.CHALLENGELEVELPLAY_TRACKICONID
      : this.fKt;
  }
  get DungeonId() {
    return this.CurrentDungeonId;
  }
  set DungeonId(e) {
    this.CurrentDungeonId = e ?? this.gKt;
  }
  get IsOccupied() {
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel;
    return (
      !!e.IsExpressionInOccupying() &&
      !e.IsExpressionOccupyingByTree(this.TreeIncId)
    );
  }
  Dispose() {
    (this.PreparingRollbackNodes = void 0), this.SKt();
  }
  AddNode(e, t) {
    this.fZ.set(e, t);
  }
  EKt(e) {
    var t = new Map();
    return this.pKt.set(e, t), t;
  }
  AddNodeToStatusGroup(e, t) {
    t = this.GetGroupIdByStatus(t);
    let r = this.GetNodesByGroupId(t);
    (r = r || this.EKt(t)).set(e.NodeId, e);
  }
  UpdateTreeVar(e, t) {
    this.vKt.set(e, t);
  }
  GetTreeVar(e) {
    return this.vKt.get(e);
  }
  ClearTreeVars() {
    this.vKt.clear();
  }
  UpdateNodeInStatusGroup(e, t, r) {
    t !== r &&
      ((t = this.GetGroupIdByStatus(t)),
      (t = this.GetNodesByGroupId(t)) && t.delete(e.NodeId),
      this.AddNodeToStatusGroup(e, r));
  }
  GetAllNodes() {
    return this.fZ;
  }
  GetNode(e) {
    return this.fZ.get(e);
  }
  GetNodesByGroupId(e) {
    return this.pKt.get(e);
  }
  GetCurrentActiveChildQuestNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = void 0;
      for (var [, r] of t)
        if ("ChildQuest" === r.NodeType) {
          e = r;
          break;
        }
      return e;
    }
  }
  GetActiveChildQuestNodesId() {
    var e = this.GetNodesByGroupId(1);
    if (e) {
      var t,
        r = [];
      for ([, t] of e) "ChildQuest" === t.NodeType && r.push(t.NodeId);
      return r;
    }
  }
  SKt() {
    for (var [, e] of this.fZ) e.Destroy();
    this.fZ.clear(), this.pKt.clear();
  }
  GetGroupIdByStatus(e) {
    let t = 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.N2s.Proto_NotActive:
        break;
      case Protocol_1.Aki.Protocol.N2s.Lkn:
      case Protocol_1.Aki.Protocol.N2s.Proto_Completing:
        t = 1;
        break;
      case Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess:
        t = 2;
        break;
      case Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed:
      case Protocol_1.Aki.Protocol.N2s.Proto_Destroy:
        t = 3;
        break;
      case Protocol_1.Aki.Protocol.N2s.Proto_Suspend:
        t = 4;
    }
    return t;
  }
  SetMapMarkResident(e) {
    this.MapMarkResident = e;
  }
  RemovePreparingRollbackNode(e) {
    e = this.PreparingRollbackNodes.indexOf(e);
    0 <= e && this.PreparingRollbackNodes.splice(e, 1),
      0 === this.PreparingRollbackNodes.length && this.RemoveTag(6),
      EventSystem_1.EventSystem.EmitWithTarget(
        this,
        EventDefine_1.EEventName.GeneralLogicTreeRemovePrepareRollbackNode,
      );
  }
  IsSuspend() {
    return this.ContainTag(9);
  }
  GetCurrentCommunicateId() {
    var e = this.GetCurrentActiveChildQuestNode();
    if ("ChildQuest" === e.NodeType && "ReceiveTelecom" === e.ChildQuestType)
      return e?.CommunicateId;
  }
  IsChallengeUi() {
    return this.ContainTag(10);
  }
  CreateShowBridge() {
    return BehaviorTreeShowBridge_1.BehaviorTreeShowBridge.Create(this);
  }
  GetTrackTextExpressInfo() {
    return this.UiTrackTextInfo;
  }
  GetSilentAreaShowInfo() {
    if (0 !== this.SilentAreaShowInfo.length) return this.SilentAreaShowInfo[0];
  }
  AddTag(e) {
    super.AddTag(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeAddTag,
        e,
      );
  }
  RemoveTag(e) {
    super.RemoveTag(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeRemoveTag,
        e,
      );
  }
  AddSilentShowInfo(r, e) {
    var t = this.SilentAreaShowInfo.findIndex((e, t) => e.SourceOfAdd === r);
    t < 0
      ? this.SilentAreaShowInfo.push(
          new GeneralLogicTreeDefine_1.SilentAreaShowInfo(r, e),
        )
      : (this.SilentAreaShowInfo[t].ShowInfo = e);
  }
  RemoveSilentShowInfo(r) {
    var e = this.SilentAreaShowInfo.findIndex((e, t) => e.SourceOfAdd === r);
    e < 0 || this.SilentAreaShowInfo.splice(e, 1);
  }
  IsNeedScaledTrackMark(e) {
    return this.ContainTag(10) && this.UiTrackTextInfo.IsSubTitle(e);
  }
  AddRefOccupationId(e, t) {
    let r = this.x5s.get(t);
    r || ((r = []), this.x5s.set(t, r)), r.push(e);
  }
  RemoveRefOccupationId(t, e) {
    var r,
      e = this.x5s.get(e);
    !e || (r = e.findIndex((e) => e === t)) < 0 || e.splice(r, 1);
  }
  HasRefOccupiedEntity() {
    for (var [e] of this.x5s) {
      var t =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.IsOccupationExist(e);
      if (t)
        if (
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetOccupationTreeId(
            e,
          ) !== this.TreeIncId
        )
          return !0;
    }
    return !1;
  }
  GetRefOccupiedEntityText() {
    if (this.HasRefOccupiedEntity())
      for (var [e] of this.x5s) {
        var t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetOccupationQuestName(
              e,
            ),
          r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "QuestResourcesIsOccupied",
          ),
          i = UE.NewArray(UE.BuiltinString),
          e =
            ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(
              e,
            );
        return i.Add(e), i.Add(t), UE.KuroStaticLibrary.KuroFormatText(r, i);
      }
  }
}
exports.Blackboard = Blackboard;
//# sourceMappingURL=BlackBoard.js.map
