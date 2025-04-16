"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TypeFunction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class TypeFunction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTypeFunction(t, i) {
    return (i || new TypeFunction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTypeFunction(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TypeFunction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  name(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  actions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startTypeFunction(t) {
    t.startObject(2);
  }
  static addName(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endTypeFunction(t) {
    return t.endObject();
  }
  static createTypeFunction(t, i, e) {
    return (
      TypeFunction.startTypeFunction(t),
      TypeFunction.addName(t, i),
      TypeFunction.addActions(t, e),
      TypeFunction.endTypeFunction(t)
    );
  }
}
exports.TypeFunction = TypeFunction;
//# sourceMappingURL=type-function.js.map
