"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SuperCatapult = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  catapult_param_js_1 = require("../fb-action/catapult-param.js");
class SuperCatapult {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsSuperCatapult(t, a) {
    return (a || new SuperCatapult()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSuperCatapult(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new SuperCatapult()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  param(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a
      ? (t || new catapult_param_js_1.CatapultParam()).__init(
          this.bb.__indirect(this.bb_pos + a),
          this.bb,
        )
      : void 0;
  }
  static startSuperCatapult(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addParam(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endSuperCatapult(t) {
    return t.endObject();
  }
}
exports.SuperCatapult = SuperCatapult;
//# sourceMappingURL=super-catapult.js.map
