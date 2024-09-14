"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SwitchRef = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log");
class SwitchRef {
  constructor(t, i) {
    (this.hs = t), (this.Cbo = i), (this.OC = void 0);
  }
  get State() {
    return this.Cbo;
  }
  set State(t) {
    this.OC?.IsValid()
      ? this.Cbo !== t &&
        ((this.Cbo = t),
        AudioSystem_1.AudioSystem.SetSwitch(this.hs, this.State, this.OC))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Audio", 57, "[Core.SwitchRef] 绑定对象无效", [
          "Group",
          this.hs,
        ]);
  }
  Bind(t) {
    (this.OC = t),
      AudioSystem_1.AudioSystem.SetSwitch(this.hs, this.State, this.OC);
  }
  ClearObject() {
    return !(this.OC = void 0);
  }
}
exports.SwitchRef = SwitchRef;
//# sourceMappingURL=SwitchRef.js.map
