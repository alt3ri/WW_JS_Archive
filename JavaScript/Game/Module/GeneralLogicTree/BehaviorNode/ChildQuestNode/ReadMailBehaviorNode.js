"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReadMailBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ReadMailBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.QQt = !1),
      (this.SXt = 0),
      (this.EXt = (e, t) => {
        this.QQt || (t === this.SXt && ((this.QQt = !0), this.SubmitNode()));
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      (e = e.Condition).Type === "ReadMail" &&
      ((this.SXt = e.MailId), !0)
    );
  }
  OnDestroy() {
    super.OnDestroy(), (this.SXt = 0);
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SelectedMail,
        this.EXt,
      );
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SelectedMail,
      this.EXt,
    ),
      super.RemoveEventsOnChildQuestEnd();
  }
}
exports.ReadMailBehaviorNode = ReadMailBehaviorNode;
// # sourceMappingURL=ReadMailBehaviorNode.js.map
