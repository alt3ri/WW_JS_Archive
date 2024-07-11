"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableChantState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableChantState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(e, t, n) {
    super(e),
      (this.pYi = void 0),
      (this.Znr = void 0),
      (this.pYi = t),
      (this.Znr = n),
      (this.StateType = "Reset");
  }
  OnEnter() {
    this.StartCameraShake(this.pYi),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.Znr,
      ),
      (this.SceneItem.NeedRemoveControllerId = !0);
  }
  OnExit() {
    this.StopCameraShake(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveSubCameraTag,
        this.Znr,
      );
  }
}
exports.SceneItemManipulableChantState = SceneItemManipulableChantState;
//# sourceMappingURL=SceneItemManipulableChantState.js.map
