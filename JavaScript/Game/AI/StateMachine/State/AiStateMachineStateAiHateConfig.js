"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineStateAiHateConfig = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateAiHateConfig extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments), (this.Mne = 0), (this.Ene = void 0);
  }
  OnInit(t) {
    return (this.Mne = t.BindAiHateConfig.ConfigId), !0;
  }
  OnActivate() {
    (this.Ene = this.Node.AiController.AiHateList?.AiHate?.Id),
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
    this.Ene
      ? (this.Node.AiController.AiHateList.AiHate =
          ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(this.Ene))
      : (this.Node.AiController.AiHateList.AiHate =
          ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(
            this.Node.AiController,
            void 0,
          )),
      (this.Ene = void 0);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineStateAiHateConfig = AiStateMachineStateAiHateConfig;
//# sourceMappingURL=AiStateMachineStateAiHateConfig.js.map
