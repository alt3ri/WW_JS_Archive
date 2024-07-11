"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const StateBase_1 = require("../../../../Core/Utils/StateMachine/StateBase");
const RenderModuleController_1 = require("../../Manager/RenderModuleController");
class PostProcessTriggerStateBase extends StateBase_1.StateBase {
  OnEnter(e) {}
  OnUpdate(e) {}
  OnExit(e) {}
  GetTargetDefaultValue() {
    const e = this.Owner.GetWuYinQuBattleState();
    const t = this.Owner.GetWuYinQuBattleKey();
    return e === 0 || e === 4
      ? RenderModuleController_1.RenderModuleController.GetIdleClearAtmosphere(
          this.Owner.GetWuYinQuBattleKey(),
        )
        ? 0
        : 1
      : (e === 1 || e === 2 || e === 3) &&
          e ===
            RenderModuleController_1.RenderModuleController.GetCurrentKeyState(
              t,
            )
        ? 1
        : 0;
  }
}
exports.default = PostProcessTriggerStateBase;
// # sourceMappingURL=PostProcessTriggerStateBase.js.map
