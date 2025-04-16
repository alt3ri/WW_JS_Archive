"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckJigsawInfoCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_check_jigsaw_info_js_1 = require("../fb-condition/union-check-jigsaw-info.js");
class CheckJigsawInfoCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCheckJigsawInfoCondition(i, t) {
    return (t || new CheckJigsawInfoCondition()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCheckJigsawInfoCondition(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckJigsawInfoCondition()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  jigsawConditionType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_check_jigsaw_info_js_1.UnionCheckJigsawInfo.NONE;
  }
  jigsawCondition(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  static startCheckJigsawInfoCondition(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addJigsawConditionType(i, t) {
    i.addFieldInt8(
      1,
      t,
      union_check_jigsaw_info_js_1.UnionCheckJigsawInfo.NONE,
    );
  }
  static addJigsawCondition(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCheckJigsawInfoCondition(i) {
    return i.endObject();
  }
  static createCheckJigsawInfoCondition(i, t, n, o) {
    return (
      CheckJigsawInfoCondition.startCheckJigsawInfoCondition(i),
      CheckJigsawInfoCondition.addType(i, t),
      CheckJigsawInfoCondition.addJigsawConditionType(i, n),
      CheckJigsawInfoCondition.addJigsawCondition(i, o),
      CheckJigsawInfoCondition.endCheckJigsawInfoCondition(i)
    );
  }
}
exports.CheckJigsawInfoCondition = CheckJigsawInfoCondition;
//# sourceMappingURL=check-jigsaw-info-condition.js.map
