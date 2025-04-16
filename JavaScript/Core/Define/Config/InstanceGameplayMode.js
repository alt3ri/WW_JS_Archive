"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceGameplayMode = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class InstanceGameplayMode {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get DisableAllPlayerRole() {
    return this.disableallplayerrole();
  }
  get DefaultCameraMode() {
    return this.defaultcameramode();
  }
  get CameraParams() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.cameraparamsLength(),
      this.cameraparams,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsInstanceGameplayMode(t, s) {
    return (s || new InstanceGameplayMode()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  disableallplayerrole() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  defaultcameramode() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetCameraparamsAt(t) {
    return this.cameraparams(t);
  }
  cameraparams(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  cameraparamsLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  cameraparamsArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.InstanceGameplayMode = InstanceGameplayMode;
//# sourceMappingURL=InstanceGameplayMode.js.map
