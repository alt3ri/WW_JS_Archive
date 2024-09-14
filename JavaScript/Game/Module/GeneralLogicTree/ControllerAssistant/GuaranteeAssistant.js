"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GuaranteeActionCenter_1 = require("../../../LevelGamePlay/Guarantee/GuaranteeActionCenter"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class GuaranteeAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.rIe = (e, t, n, s = 0) => {
        var r, o;
        t &&
          6 === t.Type &&
          t.TreeIncId &&
          (r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t.TreeIncId,
            )) &&
          ((o =
            GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(
              n.Name,
            )),
          r.AddGuaranteeActionInfo(e, t.NodeId, n, o));
      }),
      (this.nIe = (e, t, n, s = 0) => {
        t &&
          6 === t.Type &&
          t.TreeIncId &&
          (t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t.TreeIncId,
            )) &&
          t.PopGuaranteeActionInfo(e, n);
      }),
      (this.DQt = (e, t, n) => {
        if (6 === e.Type && e.TreeIncId) {
          var s =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              e.TreeIncId,
            );
          if (s) {
            var r = s.GetRollbackPoint();
            switch (n) {
              case Protocol_1.Aki.Protocol.BNs._5n:
                r && e.NodeId === r && s.ClearGuaranteeActions();
                break;
              case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
              case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
                r || s.ClearGuaranteeActions(e.NodeId);
            }
          }
        }
      });
  }
  OnDestroy() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AddGuaranteeAction,
      this.rIe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemGuaranteeAction,
        this.nIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DQt,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddGuaranteeAction,
      this.rIe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemGuaranteeAction,
        this.nIe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DQt,
      );
  }
}
exports.GuaranteeAssistant = GuaranteeAssistant;
//# sourceMappingURL=GuaranteeAssistant.js.map
