"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../../../GlobalData"),
  CharacterFlowComponent_1 = require("../../../../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent"),
  DynamicFlowController_1 = require("../../../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
  TsAiController_1 = require("../../../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPlayBubble extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.FlowListName = ""),
      (this.FlowId = 0),
      (this.StateId = 0),
      (this.IsInitTsVariables = !1),
      (this.TsFlowListName = ""),
      (this.TsFlowId = 0),
      (this.TsStateId = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsFlowListName = this.FlowListName),
      (this.TsFlowId = this.FlowId),
      (this.TsStateId = this.StateId));
  }
  ReceiveExecuteAI(e, o) {
    var t, r;
    this.InitTsVariables(),
      e instanceof TsAiController_1.default
        ? this.TsFlowListName
          ? (r = e.AiController.CharActorComp)
            ? ((t = {
                FlowListName: this.TsFlowListName,
                FlowId: this.TsFlowId,
                StateId: this.TsStateId,
              }),
              (r = r.CreatureData.GetPbDataId()),
              (r = this.CreateCharacterFlowData(r, t)),
              DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(r))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "BehaviorTree",
                51,
                "[TsTaskPlayBubble]无效的ActorComp",
                ["Type", e.GetClass().GetName()],
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              51,
              "[TsTaskPlayBubble]无效的FlowListName",
              ["Type", e.GetClass().GetName()],
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
      this.FinishExecute(!0);
  }
  CreateCharacterFlowData(e, o) {
    var t = new DynamicFlowController_1.CharacterDynamicFlowData(),
      e = {
        EntityIds: [e],
        EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
        LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
        Flow: o,
        WaitTime: 0,
        RedDot: !1,
      };
    return (t.BubbleData = e), t;
  }
}
exports.default = TsTaskPlayBubble;
//# sourceMappingURL=TsTaskPlayBubble.js.map
