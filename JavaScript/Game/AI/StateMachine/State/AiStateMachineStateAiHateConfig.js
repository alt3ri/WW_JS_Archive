"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineStateAiHateConfig = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateAiHateConfig extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments), (this.Mne = 0), (this.Sne = void 0);
  }
  OnInit(t) {
    return (this.Mne = t.BindAiHateConfig.ConfigId), !0;
  }
  OnActivate() {
    (this.Sne = this.Node.AiController.AiHateList?.AiHate?.Id),
      this.Mne
        ? (this.Node.AiController.AiHateList.AiHate =
            ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(this.Mne))
        : (this.Node.AiController.AiHateList.AiHate =
            ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(
              this.Node.AiController,
              void 0,
            ));
  }
  OnDeactivate() {
    this.Sne
      ? (this.Node.AiController.AiHateList.AiHate =
          ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(this.Sne))
      : (this.Node.AiController.AiHateList.AiHate =
          ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(
            this.Node.AiController,
            void 0,
          )),
      (this.Sne = void 0);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineStateAiHateConfig = AiStateMachineStateAiHateConfig;
// # sourceMappingURL=AiStateMachineStateAiHateConfig.js.map
