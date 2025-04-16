"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSetHeadIconVisible = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetHeadIconVisible extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.nYa = !1),
      (this.$$i = () => {
        this?.nYa && ((this.nYa = !1), this.FinishExecute(!0));
      });
  }
  OnExecute() {
    var e = this.ActionInfo.Params;
    (this.nYa = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdatePortraitVisible,
        e,
        this.$$i,
      );
  }
  OnInterruptExecute() {
    (this.nYa = !1), this.FinishExecute(!0);
  }
}
exports.FlowActionSetHeadIconVisible = FlowActionSetHeadIconVisible;
//# sourceMappingURL=FlowActionSetHeadIconVisible.js.map
