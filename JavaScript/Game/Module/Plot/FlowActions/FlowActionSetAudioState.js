"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSetAudioState = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetAudioState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    e &&
      ControllerHolder_1.ControllerHolder.GameAudioController.UpdateAudioStatebyClient(
        e.AudioConfig,
      );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionSetAudioState = FlowActionSetAudioState;
//# sourceMappingURL=FlowActionSetAudioState.js.map
