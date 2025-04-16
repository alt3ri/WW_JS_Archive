"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalculateComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  number_var_js_1 = require("../fb-action/number-var.js"),
  type_function_js_1 = require("../fb-action/type-function.js");
class CalculateComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCalculateComponent(t, e) {
    return (e || new CalculateComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCalculateComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CalculateComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  vars(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (e || new number_var_js_1.NumberVar()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  varsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  functions(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (e || new type_function_js_1.TypeFunction()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  functionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCalculateComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addVars(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createVarsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startVarsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addFunctions(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createFunctionsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startFunctionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endCalculateComponent(t) {
    return t.endObject();
  }
  static createCalculateComponent(t, e, s, a) {
    return (
      CalculateComponent.startCalculateComponent(t),
      CalculateComponent.addDisabled(t, e),
      CalculateComponent.addVars(t, s),
      CalculateComponent.addFunctions(t, a),
      CalculateComponent.endCalculateComponent(t)
    );
  }
}
exports.CalculateComponent = CalculateComponent;
//# sourceMappingURL=calculate-component.js.map
