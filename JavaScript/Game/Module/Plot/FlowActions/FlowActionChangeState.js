"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeState = void 0);
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var t;
    (this.Context.IsBreakdown = !0),
      this.Context.CurShowTalk
        ? ((t = this.Runner), this.FinishExecute(!0, !1), t.FinishTalk())
        : this.FinishExecute(!0);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionChangeState = FlowActionChangeState;
//# sourceMappingURL=FlowActionChangeState.js.map
