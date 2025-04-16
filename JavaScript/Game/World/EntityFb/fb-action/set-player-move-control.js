"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetPlayerMoveControl = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetPlayerMoveControl {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetPlayerMoveControl(t, e) {
    return (e || new SetPlayerMoveControl()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetPlayerMoveControl(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetPlayerMoveControl()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  left() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  right() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  forward() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  back() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSetPlayerMoveControl(t) {
    t.startObject(4);
  }
  static addLeft(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addRight(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addForward(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addBack(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endSetPlayerMoveControl(t) {
    return t.endObject();
  }
  static createSetPlayerMoveControl(t, e, r, o, s) {
    return (
      SetPlayerMoveControl.startSetPlayerMoveControl(t),
      SetPlayerMoveControl.addLeft(t, e),
      SetPlayerMoveControl.addRight(t, r),
      SetPlayerMoveControl.addForward(t, o),
      SetPlayerMoveControl.addBack(t, s),
      SetPlayerMoveControl.endSetPlayerMoveControl(t)
    );
  }
}
exports.SetPlayerMoveControl = SetPlayerMoveControl;
//# sourceMappingURL=set-player-move-control.js.map
