"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSetHeadIconVisible = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetHeadIconVisible extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.JXi = () => {
        this.FinishExecute(!0);
      });
  }
  OnExecute() {
    const e = this.ActionInfo.Params;
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.UpdatePortraitVisible,
      e,
      this.JXi,
    );
  }
  OnInterruptExecute() {}
}
exports.FlowActionSetHeadIconVisible = FlowActionSetHeadIconVisible;
// # sourceMappingURL=FlowActionSetHeadIconVisible.js.map
