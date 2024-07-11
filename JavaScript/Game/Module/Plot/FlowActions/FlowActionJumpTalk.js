"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionJumpTalk = void 0);
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionJumpTalk extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    const e = this.ActionInfo.Params;
    const t = this.Runner;
    this.FinishExecute(!0, !1), t.JumpTalk(e.TalkId);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionJumpTalk = FlowActionJumpTalk;
// # sourceMappingURL=FlowActionJumpTalk.js.map
