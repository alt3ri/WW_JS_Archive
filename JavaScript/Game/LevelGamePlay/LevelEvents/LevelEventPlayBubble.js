"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayBubble = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterFlowComponent_1 = require("../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent");
const DynamicFlowController_1 = require("../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayBubble extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o, r) {
    if (e) {
      const a = e.EntityId;
      e = this.BTe(a, e.Flow);
      (e.Callback = () => {
        DynamicFlowController_1.DynamicFlowController.RemoveDynamicFlow(a);
      }),
        DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e),
        o?.Type === 6 &&
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            o.TreeIncId,
          )?.AddDynamicFlowNpc(a),
        this.FinishExecute(!0);
    } else this.FinishExecute(!1);
  }
  BTe(e, o) {
    const r = new DynamicFlowController_1.CharacterDynamicFlowData();
    var e = {
      EntityIds: [e],
      EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
      LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      Flow: o,
      WaitTime: 0,
    };
    return (r.BubbleData = e), (r.Type = 2), r;
  }
}
exports.LevelEventPlayBubble = LevelEventPlayBubble;
// # sourceMappingURL=LevelEventPlayBubble.js.map
