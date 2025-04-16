"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPlayerInputBehaviorNode = void 0);
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckPlayerInputBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.RXt = !1),
      (this.CSo = "ChallengeAgain"),
      (this.ZMe = void 0),
      (this.bMe = (e, t) => {
        1 === t && this.OnChallengeAgain(e);
      }),
      (this.OnChallengeAgain = (e) => {
        this.RXt || (this.ZMe === e && this.SubmitNode());
      }),
      (this.OnAfterSubmit = (e) => {
        this.RXt = !1;
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.CheckPlayerInput) return !1;
    switch (((this.CSo = e.CheckInput.ButtonType), this.CSo)) {
      case "ChallengeAgain":
        this.ZMe = InputMappingsDefine_1.actionMappings.重新挑战;
        break;
      case "ExitChallenge":
        this.ZMe = InputMappingsDefine_1.actionMappings.玩法放弃;
    }
    return !0;
  }
  AddEventsOnChildQuestStart() {
    this.ZMe &&
      (InputDistributeController_1.InputDistributeController.UnBindAction(
        this.ZMe,
        this.bMe,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        this.ZMe,
        this.bMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChallengeAgain,
        this.OnChallengeAgain,
      ),
      this.ZMe === InputMappingsDefine_1.actionMappings.重新挑战) &&
      this.Blackboard.AddTag(15);
  }
  RemoveEventsOnChildQuestEnd() {
    this.ZMe &&
      (InputDistributeController_1.InputDistributeController.UnBindAction(
        this.ZMe,
        this.bMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChallengeAgain,
        this.OnChallengeAgain,
      ),
      this.ZMe === InputMappingsDefine_1.actionMappings.重新挑战) &&
      this.Blackboard.RemoveTag(15);
  }
  OnBeforeSubmit() {
    this.RXt = !0;
  }
}
exports.CheckPlayerInputBehaviorNode = CheckPlayerInputBehaviorNode;
//# sourceMappingURL=CheckPlayerInputBehaviorNode.js.map
