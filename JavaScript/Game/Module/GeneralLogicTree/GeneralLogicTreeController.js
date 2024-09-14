"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralLogicTreeController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ControllerWithAssistantBase_1 = require("./ControllerAssistant/ControllerWithAssistantBase"),
  GuaranteeAssistant_1 = require("./ControllerAssistant/GuaranteeAssistant"),
  RequestToServerAssistant_1 = require("./ControllerAssistant/RequestToServerAssistant"),
  ServerNotifyAssistant_1 = require("./ControllerAssistant/ServerNotifyAssistant"),
  TreeExpressAssistant_1 = require("./ControllerAssistant/TreeExpressAssistant"),
  assistantMap = { [0]: void 0, 1: void 0, 2: void 0, 3: void 0 };
class GeneralLogicTreeController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnClear() {
    return (GeneralLogicTreeController.uYt = void 0), super.OnClear();
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new ServerNotifyAssistant_1.ServerNotifyAssistant()),
      this.AddAssistant(
        1,
        new RequestToServerAssistant_1.RequestToServerAssistant(),
      ),
      this.AddAssistant(2, new TreeExpressAssistant_1.TreeExpressAssistant()),
      this.AddAssistant(3, new GuaranteeAssistant_1.GuaranteeAssistant());
  }
  static cYt(e) {
    if (this.Assistants) return this.Assistants.get(e);
  }
  static OnAddEvents() {
    super.OnAddEvents(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        GeneralLogicTreeController.EUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        GeneralLogicTreeController.EUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        GeneralLogicTreeController.bZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BehaviorTreeStartActionSession,
        GeneralLogicTreeController.mYt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        GeneralLogicTreeController.HQe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      GeneralLogicTreeController.EUe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        GeneralLogicTreeController.EUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        GeneralLogicTreeController.bZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BehaviorTreeStartActionSession,
        GeneralLogicTreeController.mYt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        GeneralLogicTreeController.HQe,
      ),
      super.OnRemoveEvents();
  }
  static RequestSubmitNode(e, t, r = void 0) {
    this.cYt(1).RequestSubmitNode(e, t, r);
  }
  static RequestSubmitAwakeAndLoadEntityNode(e, t) {
    this.cYt(1).RequestSubmitAwakeAndLoadEntityNode(e, t);
  }
  static RequestSetTimerInfo(e, t, r, s, o) {
    this.cYt(1).RequestSetTimerInfo(e, t, r, s, o);
  }
  static RequestGiveUp(e, t) {
    this.cYt(1).RequestGiveUp(e, t);
  }
  static RequestRollback(e, t) {
    this.cYt(1).RequestRollback(e, t);
  }
  static RequestTimerEnd(e, t) {
    this.cYt(1).RequestTimerEnd(e, t);
  }
  static RequestFinishUiGameplay(e, t) {
    this.cYt(1).RequestFinishUiGameplay(e, t);
  }
  static RequestForcedOccupation(e, t) {
    this.cYt(1).RequestForcedOccupation(e, t);
  }
  static RequestEntityPosition(e, t, r) {
    return this.cYt(1).RequestEntityPosition(e, t, r);
  }
  static GetEntityPos(e, t, r) {
    return this.cYt(1).GetEntityPos(e, t, r);
  }
  static IsShowNodeStatus(e) {
    return this.cYt(2).IsShowNodeStatus(e);
  }
  static GetTitleTrackNodeId(e) {
    return this.cYt(2).GetTitleTrackNodeId(e);
  }
  static IsShowTrackDistance(e, t) {
    return this.cYt(2).IsShowTrackDistance(e, t);
  }
  static IsShowNodeTrackDistance(e, t) {
    return this.cYt(2).IsShowNodeTrackDistance(e, t);
  }
  static GetTitleText(e, t) {
    return this.cYt(2).GetTitleText(e, t);
  }
  static GetNodeTrackText(e, t) {
    return this.cYt(2).GetNodeTrackText(e, t);
  }
  static ApplyOccupyTreeExpression(e, t, r) {
    this.cYt(2).ApplyOccupyTreeExpression(e, t, r);
  }
  static TryReleaseExpressionOccupation(e) {
    this.cYt(2).TryReleaseExpressionOccupation(e);
  }
}
((exports.GeneralLogicTreeController = GeneralLogicTreeController).uYt =
  void 0),
  (GeneralLogicTreeController.EUe = () => {
    var e = () => {
      GeneralLogicTreeController.uYt = void 0;
      var e =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetAllBehaviorTrees();
      if (e && 0 < e.size) for (var [, t] of e) t.SetSleep(!1);
      (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
        );
    };
    UiManager_1.UiManager.IsViewShow("BattleView")
      ? e()
      : ((GeneralLogicTreeController.uYt = new CustomPromise_1.CustomPromise()),
        GeneralLogicTreeController.uYt.Promise.then(e));
  }),
  (GeneralLogicTreeController.bZe = () => {
    GeneralLogicTreeController.uYt?.SetResult(!0);
  }),
  (GeneralLogicTreeController.mYt = (e) => {
    var t,
      r,
      s = e.cvs;
    let o = void 0;
    switch (s.fvs) {
      case Protocol_1.Aki.Protocol.TOs.bvs:
        o = s.bvs.ups;
        break;
      case Protocol_1.Aki.Protocol.TOs.Bvs:
        o = s.Bvs.ups;
        break;
      case Protocol_1.Aki.Protocol.TOs.qvs:
        o = s.qvs.ups;
        break;
      case Protocol_1.Aki.Protocol.TOs.Gvs:
        o = s.Gvs.ups;
        break;
      case Protocol_1.Aki.Protocol.TOs.Ovs:
        o = s.Ovs.ups;
        break;
      case Protocol_1.Aki.Protocol.TOs.$vs:
        o = s.$vs.ups;
    }
    o &&
      ((t = MathUtils_1.MathUtils.LongToBigInt(o.w5n)),
      (r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t))
        ? r.DoAction(s.fvs, o.b5n, e.W5n, e.w5n, e.K5n, e.mvs)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            19,
            "服务器通知执行行为时：对应的数据不存在，联系程序检查Bug",
            ["treeType", o.hps],
            ["treeId", t],
            ["actionIncId", e.w5n],
          ));
  }),
  (GeneralLogicTreeController.HQe = (e) => {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(e);
  });
//# sourceMappingURL=GeneralLogicTreeController.js.map
