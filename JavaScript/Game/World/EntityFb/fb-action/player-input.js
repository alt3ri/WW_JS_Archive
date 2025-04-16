"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerInput = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerInput {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayerInput(t, e) {
    return (e || new PlayerInput()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayerInput(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayerInput()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  input() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startPlayerInput(t) {
    t.startObject(1);
  }
  static addInput(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endPlayerInput(t) {
    return t.endObject();
  }
  static createPlayerInput(t, e) {
    return (
      PlayerInput.startPlayerInput(t),
      PlayerInput.addInput(t, e),
      PlayerInput.endPlayerInput(t)
    );
  }
}
exports.PlayerInput = PlayerInput;
//# sourceMappingURL=player-input.js.map
