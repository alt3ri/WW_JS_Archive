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
        1 === t && e === this.ZMe && this.OnChallengeAgain();
      }),
      (this.OnChallengeAgain = () => {
        this.RXt || this.SubmitNode();
      }),
      (this.OnAfterSubmit = (e) => {
        this.RXt = !1;
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      (e = e.Condition).Type === IQuest_1.EChildQuest.CheckPlayerInput &&
      ((this.CSo = e.CheckInput.ButtonType),
      "ChallengeAgain" === this.CSo &&
        (this.ZMe = InputMappingsDefine_1.actionMappings.重新挑战),
      !0)
    );
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
      this.Blackboard.AddTag(14));
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
      this.Blackboard.RemoveTag(14));
  }
  OnBeforeSubmit() {
    this.RXt = !0;
  }
}
exports.CheckPlayerInputBehaviorNode = CheckPlayerInputBehaviorNode;
//# sourceMappingURL=CheckPlayerInputBehaviorNode.js.map
