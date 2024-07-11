"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskPlayBubble = void 0);
const CharacterFlowComponent_1 = require("../../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent"),
  DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
  LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayBubble extends LevelAiTask_1.LevelAiTask {
  ExecuteTask() {
    var e,
      o = this.Params;
    return o
      ? ((e = o.EntityId),
        (e = this.BTe(e, o.Flow)),
        DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e),
        0)
      : 1;
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
