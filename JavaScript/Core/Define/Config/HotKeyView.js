"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotKeyView = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class HotKeyView {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get FunctionButtonArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.functionbuttonarrayLength(),
      (t) => this.functionbuttonarray(t),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsHotKeyView(t, i) {
    return (i || new HotKeyView()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFunctionbuttonarrayAt(t) {
    return this.functionbuttonarray(t);
  }
  functionbuttonarray(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  functionbuttonarrayLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  functionbuttonarrayArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.HotKeyView = HotKeyView;
//# sourceMappingURL=HotKeyView.js.map
