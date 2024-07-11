"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionCheckInstState = void 0);
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckInstState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments),
      (this.TagName = ""),
      (this.TagId = 0),
      (this.vJ = void 0),
      (this.lne = (t, i) => {
        this.ResultSelf = i;
      });
  }
  OnInit(t) {
    return (
      (this.TagId = t.CondInstStateChange.TagId),
      (this.TagName = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(
        this.TagId,
      )),
      (this.vJ = this.Node.TagComponent.ListenForTagAddOrRemove(
        this.TagId,
        this.lne,
      )),
      (this.CheckForClient = !!t.IsClient),
      (this.ResultSelf = this.Node.TagComponent.HasTag(this.TagId)),
      !0
    );
  }
  OnClear() {
    this.vJ.EndTask(), (this.vJ = void 0);
  }
  ToString(t, i = 0) {
    super.ToString(t, i),
      t.Append(`Tag[${this.TagName}]
`);
  }
}
exports.AiStateMachineConditionCheckInstState =
  AiStateMachineConditionCheckInstState;
//# sourceMappingURL=AiStateMachineConditionCheckInstState.js.map
