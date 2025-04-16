"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckCalabashDevelopRewardCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckCalabashDevelopRewardCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCheckCalabashDevelopRewardCondition(e, t) {
    return (t || new CheckCalabashDevelopRewardCondition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckCalabashDevelopRewardCondition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckCalabashDevelopRewardCondition()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  monsterId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  develop() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  static startCheckCalabashDevelopRewardCondition(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMonsterId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addDevelop(e, t) {
    e.addFieldInt8(2, t, 0);
  }
  static endCheckCalabashDevelopRewardCondition(e) {
    return e.endObject();
  }
  static createCheckCalabashDevelopRewardCondition(e, t, a, i) {
    return (
      CheckCalabashDevelopRewardCondition.startCheckCalabashDevelopRewardCondition(
        e,
      ),
      CheckCalabashDevelopRewardCondition.addType(e, t),
      CheckCalabashDevelopRewardCondition.addMonsterId(e, a),
      CheckCalabashDevelopRewardCondition.addDevelop(e, i),
      CheckCalabashDevelopRewardCondition.endCheckCalabashDevelopRewardCondition(
        e,
      )
    );
  }
}
exports.CheckCalabashDevelopRewardCondition =
  CheckCalabashDevelopRewardCondition;
//# sourceMappingURL=check-calabash-develop-reward-condition.js.map
