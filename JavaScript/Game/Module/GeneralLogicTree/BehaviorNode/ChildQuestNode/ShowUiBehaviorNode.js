"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowUiBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ShowUiBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.y$t = !1),
      (this.I$t = void 0),
      (this.T$t = !1),
      (this.bZe = () => {
        this.y$t || this.SubmitNode();
      }),
      (this.OnAfterSubmit = (e) => {
        this.y$t = !1;
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      "ShowUi" === (e = e.Condition).Type &&
      ((this.I$t = e.UiType), (this.T$t = e.KeepUiOpen), !0)
    );
  }
  OnDestroy() {
    super.OnDestroy(), (this.I$t = void 0), (this.T$t = !1);
  }
  OnNodeActive() {
    super.OnNodeActive(),
      this.T$t &&
        "RogueAbilitySelect" === this.I$t.Type &&
        RoguelikeController_1.RoguelikeController.OpenBuffSelectViewByIdAsync(
          this.I$t.BindId,
        );
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart(),
      "All" === this.I$t.Type &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ActiveBattleView,
          this.bZe,
        );
  }
  RemoveEventsOnChildQuestEnd() {
    super.RemoveEventsOnChildQuestEnd(),
      "All" === this.I$t.Type &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ActiveBattleView,
          this.bZe,
        );
  }
  OnBeforeSubmit() {
    this.y$t = !0;
  }
}
exports.ShowUiBehaviorNode = ShowUiBehaviorNode;
//# sourceMappingURL=ShowUiBehaviorNode.js.map
