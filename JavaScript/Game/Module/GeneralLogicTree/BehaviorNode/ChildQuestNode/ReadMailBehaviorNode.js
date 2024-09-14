"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReadMailBehaviorNode = void 0);
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ReadMailBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.QXt = !1),
      (this.E$t = 0),
      (this.S$t = (e, t) => {
        this.QXt || (t === this.E$t && ((this.QXt = !0), this.SubmitNode()));
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      (e = e.Condition).Type === IQuest_1.EChildQuest.ReadMail &&
      ((this.E$t = e.MailId), !0)
    );
  }
  OnDestroy() {
    super.OnDestroy(), (this.E$t = 0);
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SelectedMail,
        this.S$t,
      );
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SelectedMail,
      this.S$t,
    ),
      super.RemoveEventsOnChildQuestEnd();
  }
}
exports.ReadMailBehaviorNode = ReadMailBehaviorNode;
//# sourceMappingURL=ReadMailBehaviorNode.js.map
