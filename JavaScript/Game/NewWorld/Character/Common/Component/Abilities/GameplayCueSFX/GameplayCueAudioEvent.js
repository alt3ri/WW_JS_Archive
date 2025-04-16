"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueAudioEvent = void 0);
const AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueAudioEvent extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments), (this.Zge = 0);
  }
  OnCreate() {
    var e = this.EntityHandle.Entity?.GetComponent(50);
    e &&
      0 !== this.CueConfig.Parameters.length &&
      (this.Zge = AudioSystem_1.AudioSystem.PostEvent(
        this.CueConfig.Parameters[0],
        e.GetAkComponent(),
      ));
  }
  OnDestroy() {
    0 !== this.Zge && AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0);
  }
}
exports.GameplayCueAudioEvent = GameplayCueAudioEvent;
//# sourceMappingURL=GameplayCueAudioEvent.js.map
