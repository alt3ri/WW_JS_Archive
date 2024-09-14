"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Blackboard = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest"),
  IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil"),
  BehaviorTreeShowBridge_1 = require("./BehaviorTreeShowBridge"),
  BehaviorTreeTagComponent_1 = require("./BehaviorTreeTagComponent");
class Blackboard extends BehaviorTreeTagComponent_1.BehaviorTreeTagContainer {
  constructor(e, t, i, r, s) {
    switch (
      (super(),
      (this.gQt = 0),
      (this.fQt = 0),
      (this.MarkType = 12),
      (this.TrackSource = void 0),
      (this.MapMarkResident = !1),
      (this.UseInnerTrackIconId = !1),
      (this.CurrentDungeonId = 0),
      (this.ChangeCurrentDungeonIdNodeId = 0),
      (this.IsTracking = !1),
      (this.IsSleeping = !1),
      (this.BtType = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid),
      (this.TreeIncId = BigInt(0)),
      (this.TreeConfigId = 0),
      (this.wDa = []),
      (this.BDa = new Map()),
      (this.bDa = new Set()),
      (this.fZ = void 0),
      (this.pQt = void 0),
      (this.vQt = void 0),
      (this.UiTrackTextInfo = void 0),
      (this.SilentAreaShowInfo = []),
      (this.gKs = void 0),
      (this.RollbackPoint = 0),
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
      (this.TreeConfigId = i),
      (this.gQt = r),
      (this.CurrentDungeonId = r),
      (this.fZ = new Map()),
      (this.pQt = new Map()),
      (this.vQt = new Map()),
      (this.UiTrackTextInfo =
        new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo()),
      (this.gKs = new Map()),
      (this.fQt = s),
      (this.MarkType = 12),
      this.BtType)
    ) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        this.TrackSource = 5;
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        this.TrackSource = 4;
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        this.TrackSource = 2;
    }
  }
  get TaskMarkTableId() {
    return !this.UseInnerTrackIconId &&
      this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
      this.IsChallengeUi()
      ? GeneralLogicTreeDefine_1.CHALLENGELEVELPLAY_TRACKICONID
      : this.fQt;
  }
  get DungeonId() {
    return this.CurrentDungeonId;
  }
  set DungeonId(e) {
    this.CurrentDungeonId = e ?? this.gQt;
  }
  get ChangeDungeonIdNodeId() {
    return this.ChangeCurrentDungeonIdNodeId;
  }
  set ChangeDungeonIdNodeId(e) {
    this.ChangeCurrentDungeonIdNodeId = e;
  }
  get IsOccupied() {
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel;
    return (
      !!e.IsExpressionInOccupying() &&
      !e.IsExpressionOccupyingByTree(this.TreeIncId)
    );
  }
  Dispose() {
    this.EQt(),
      this.vQt?.clear(),
      this.gKs?.clear(),
      this.wDa.splice(0, this.wDa.length),
      this.BDa.clear(),
      this.bDa.clear();
  }
  AddNode(e, t) {
    this.fZ.set(e, t);
  }
  SQt(e) {
    var t = new Map();
    return this.pQt.set(e, t), t;
  }
  AddNodeToStatusGroup(e, t) {
    t = this.GetGroupIdByStatus(t);
    let i = this.GetNodesByGroupId(t);
    (i = i || this.SQt(t)).set(e.NodeId, e);
  }
  UpdateTreeVar(e, t) {
    this.vQt.set(e, t);
  }
  GetTreeVar(e) {
    return this.vQt.get(e);
  }
  ClearTreeVars() {
    this.vQt.clear();
  }
  UpdateNodeInStatusGroup(e, t, i) {
    t !== i &&
      ((t = this.GetGroupIdByStatus(t)),
      (t = this.GetNodesByGroupId(t)) && t.delete(e.NodeId),
      this.AddNodeToStatusGroup(e, i));
  }
  GetAllNodes() {
    return this.fZ;
  }
  GetNode(e) {
    return this.fZ.get(e);
  }
  GetNodesByGroupId(e) {
    return this.pQt.get(e);
  }
  GetCurrentActiveChildQuestNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = void 0;
      for (var [, i] of t)
        if ("ChildQuest" === i.NodeType) {
          e = i;
          break;
        }
      return e;
    }
  }
  GetActiveChildQuestNodesId() {
    var e = this.GetNodesByGroupId(1);
    if (e) {
      var t,
        i = [];
      for ([, t] of e) "ChildQuest" === t.NodeType && i.push(t.NodeId);
      return i;
    }
  }
  EQt() {
    for (var [, e] of this.fZ) e.Destroy();
    this.fZ.clear(), this.pQt.clear();
  }
  GetGroupIdByStatus(e) {
    let t = 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.BNs.Proto_NotActive:
        break;
      case Protocol_1.Aki.Protocol.BNs._5n:
      case Protocol_1.Aki.Protocol.BNs.Proto_Completing:
        t = 1;
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
        t = 2;
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
      case Protocol_1.Aki.Protocol.BNs.Proto_Destroy:
        t = 3;
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_Suspend:
        t = 4;
    }
    return t;
  }
  SetMapMarkResident(e) {
    this.MapMarkResident = e;
  }
  SetUseInnerTrackIconId(e) {
    this.UseInnerTrackIconId = e;
  }
  IsSuspend() {
    return this.ContainTag(9);
  }
  GetCurrentCommunicateId() {
    var e = this.GetCurrentActiveChildQuestNode();
    if (
      "ChildQuest" === e.NodeType &&
      e.ChildQuestType === IQuest_1.EChildQuest.ReceiveTelecom
    )
      return e?.CommunicateId;
  }
  IsChallengeUi() {
    return this.ContainTag(11);
  }
  IsCustomUi() {
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
  AddSilentShowInfo(i, e) {
    var t = this.SilentAreaShowInfo.findIndex((e, t) => e.SourceOfAdd === i);
    t < 0
      ? this.SilentAreaShowInfo.push(
          new GeneralLogicTreeDefine_1.SilentAreaShowInfo(i, e),
        )
      : (this.SilentAreaShowInfo[t].ShowInfo = e);
  }
  RemoveSilentShowInfo(i) {
    var e = this.SilentAreaShowInfo.findIndex((e, t) => e.SourceOfAdd === i);
    e < 0 || this.SilentAreaShowInfo.splice(e, 1);
  }
  IsNeedScaledTrackMark(e) {
    return this.ContainTag(10) && this.UiTrackTextInfo.IsSubTitle(e);
  }
  AddRefOccupationId(e, t) {
    let i = this.gKs.get(t);
    i || ((i = []), this.gKs.set(t, i)), i.push(e);
  }
  RemoveRefOccupationId(t, e) {
    var i,
      e = this.gKs.get(e);
    !e || (i = e.findIndex((e) => e === t)) < 0 || e.splice(i, 1);
  }
  HasRefOccupiedEntity() {
    for (var [e] of this.gKs) {
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
      for (var [e] of this.gKs) {
        var t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetOccupationQuestName(
              e,
            ),
          i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "QuestResourcesIsOccupied",
          ),
          r = UE.NewArray(UE.BuiltinString),
          e =
            ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(
              e,
            );
        return r.Add(e), r.Add(t), UE.KuroStaticLibrary.KuroFormatText(i, r);
      }
  }
  AddGuaranteeActionInfo(t, i, r, e) {
    if (!this.qDa(r, e)) {
      this.wDa.push(r);
      let e = this.BDa.get(i);
      e || ((e = new Set()), this.BDa.set(i, e)),
        e.add(this.wDa.length - 1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GeneralLogicTree",
            19,
            "GeneralLogicTree:添加保底行为：" + r.Name,
            ["触发行为", t],
            ["ActionInfo", r],
            ["treeConfigId", this.TreeConfigId],
          );
    }
  }
  qDa(t, i) {
    return (
      0 !== i &&
      this.wDa.some((e) =>
        1 === i
          ? e.Name === t.Name
          : e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t),
      )
    );
  }
  PopGuaranteeActionInfo(t, i) {
    for (let e = this.wDa.length - 1; 0 <= e; e--) {
      var r = this.wDa[e];
      if (r.Name === i.Name && (0, IUtil_1.deepEquals)(r, i)) {
        this.wDa.splice(e, 1);
        for (var [, s] of this.BDa) s.delete(e);
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GeneralLogicTree",
              19,
              "GeneralLogicTree:移除保底行为：" + i.Name,
              ["触发行为", t],
              ["ActionInfo", i],
              ["treeConfigId", this.TreeConfigId],
            ),
          r
        );
      }
    }
  }
  ClearGuaranteeActions(e) {
    if (e) {
      var t = this.BDa.get(e);
      if (t)
        for (let e = this.wDa.length - 1; 0 <= e; e--)
          t.has(e) && (this.wDa.splice(e, 1), t.delete(e));
    } else this.wDa.splice(0, this.wDa.length);
  }
  GetGuaranteeActions() {
    return this.wDa;
  }
  AddCurrentExecuteActions(e) {
    this.bDa.add(e);
  }
  RemoveCurrentExecuteActions(e) {
    this.bDa.delete(e);
  }
  GetCurrentExecuteActions() {
    return this.bDa;
  }
}
exports.Blackboard = Blackboard;
//# sourceMappingURL=BlackBoard.js.map
