"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionAddPlayBubble = void 0);
const DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionAddPlayBubble extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    e &&
      0 !== e.EntityIds.length &&
      ((e = this.BTe(e)),
      DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e),
      this.FinishExecute(!0));
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  BTe(e) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData();
    return (o.BubbleData = e), (o.Type = 4), o;
  }
}
exports.FlowActionAddPlayBubble = FlowActionAddPlayBubble;
//# sourceMappingURL=FlowActionAddPlayBubble.js.map
