"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskPlayBubble = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  CharacterFlowComponent_1 = require("../../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent"),
  DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
  LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayBubble extends LevelAiTask_1.LevelAiTask {
  ExecuteTask() {
    var e,
      r = this.Params;
    return r
      ? ((e = r.EntityId),
        (e = this.BTe(e, r.Flow)),
        ControllerHolder_1.ControllerHolder.DynamicFlowController.AddDynamicFlow(
          e,
        ),
        0)
      : 1;
  }
  BTe(e, r) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData(),
      e = {
        EntityIds: [e],
        EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
        LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
        Flow: r,
        WaitTime: 0,
        RedDot: !1,
      };
    return (o.BubbleData = e), (o.Type = 1), o;
  }
}
exports.LevelAiTaskPlayBubble = LevelAiTaskPlayBubble;
//# sourceMappingURL=LevelAiTaskPlayBubble.js.map
