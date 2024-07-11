"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskPlayBubble = void 0);
const CharacterFlowComponent_1 = require("../../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent"),
  DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
  LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayBubble extends LevelAiTask_1.LevelAiTask {
  ExecuteTask() {
    var e = this.Params;
    if (!e) return 1;
    const o = e.EntityId;
    e = this.BTe(o, e.Flow);
    return (
      (e.Callback = () => {
        DynamicFlowController_1.DynamicFlowController.RemoveDynamicFlow(o);
      }),
      DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e),
      0
    );
  }
  BTe(e, o) {
    var r = new DynamicFlowController_1.CharacterDynamicFlowData(),
      e = {
        EntityIds: [e],
        EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
        LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
        Flow: o,
        WaitTime: 0,
        RedDot: !1,
      };
    return (r.BubbleData = e), (r.Type = 1), r;
  }
}
exports.LevelAiTaskPlayBubble = LevelAiTaskPlayBubble;
//# sourceMappingURL=LevelAiTaskPlayBubble.js.map
