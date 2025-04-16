"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LongPressConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PressTime() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.presstimeLength(),
      this.presstime,
      this,
    );
  }
  get TriggerTime() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.triggertimeLength(),
      this.triggertime,
      this,
    );
  }
  get AudioIntervalLimit() {
    return this.audiointervallimit();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsLongPressConfig(t, i) {
    return (i || new LongPressConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPresstimeAt(t) {
    return this.presstime(t);
  }
  presstime(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  presstimeLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  presstimeArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetTriggertimeAt(t) {
    return this.triggertime(t);
  }
  triggertime(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  triggertimeLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  triggertimeArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  audiointervallimit() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.LongPressConfig = LongPressConfig;
//# sourceMappingURL=LongPressConfig.js.map
