"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VarComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  var_define_js_1 = require("../fb-var/var-define.js");
class VarComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsVarComponent(t, r) {
    return (r || new VarComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVarComponent(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new VarComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  vars(t, r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (r || new var_define_js_1.VarDefine()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  varsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startVarComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addVars(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createVarsVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) r.addOffset(e[t]);
    return r.endVector();
  }
  static startVarsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endVarComponent(t) {
    return t.endObject();
  }
  static createVarComponent(t, r, e) {
    return (
      VarComponent.startVarComponent(t),
      VarComponent.addDisabled(t, r),
      VarComponent.addVars(t, e),
      VarComponent.endVarComponent(t)
    );
  }
}
exports.VarComponent = VarComponent;
//# sourceMappingURL=var-component.js.map
