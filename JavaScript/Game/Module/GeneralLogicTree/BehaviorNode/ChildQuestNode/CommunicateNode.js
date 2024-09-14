"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommunicateNode = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CommunicateNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.CommunicateId = 0),
      (this.BXt = !1),
      (this.bXt = !1),
      (this.qXt = (e) => {
        e === this.CommunicateId &&
          (this.Blackboard.RemoveTag(7), this.SubmitNode());
      }),
      (this.GXt = (e) => {
        e === this.CommunicateId && this.NXt();
      }),
      (this.OXt = (e, t) => {
        t !== this.TreeIncId ||
          UiManager_1.UiManager.IsViewShow("BattleView") ||
          (this.BXt = this.Blackboard.IsTracking);
      }),
      (this.rbe = () => {
        this.BXt &&
          !UiManager_1.UiManager.IsViewShow("CommunicateView") &&
          (this.NXt(), (this.BXt = !1));
      }),
      (this.$Ge = (e) => {
        "CommunicateView" !== e ||
          this.ChildQuestStatus !==
            Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress ||
          (this.Blackboard.AddTag(7), this.bXt) ||
          this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest ||
          ((this.bXt = !0),
          QuestController_1.QuestNewController.RedDotRequest(
            this.TreeConfigId,
            1,
          ));
      }),
      (this.kXt = () => {
        UiManager_1.UiManager.CloseView("CommunicateView");
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      (e = e.Condition).Type === IQuest_1.EChildQuest.ReceiveTelecom &&
      ((this.CommunicateId = e.TelecomId), !0)
    );
  }
  OnStart(e) {
    super.OnStart(e),
      (this.bXt = !1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CommunicateFinished,
        this.qXt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CommunicateAgain,
        this.GXt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.OXt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.rbe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeMode,
        this.kXt,
      ),
      this.NXt();
  }
  OnEnd(e) {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CommunicateFinished,
      this.qXt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CommunicateAgain,
        this.GXt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.OXt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.rbe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeMode,
        this.kXt,
      ),
      super.OnEnd(e);
  }
  NXt() {
    this.Blackboard.RemoveTag(7),
      UiManager_1.UiManager.OpenView("CommunicateView", this.CommunicateId);
  }
}
exports.CommunicateNode = CommunicateNode;
//# sourceMappingURL=CommunicateNode.js.map
