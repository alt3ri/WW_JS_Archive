"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractPlayerDiractionToLeisure = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractPlayerDiractionToLeisure {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsInteractPlayerDiractionToLeisure(t, e) {
    return (e || new InteractPlayerDiractionToLeisure()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractPlayerDiractionToLeisure(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new InteractPlayerDiractionToLeisure()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  begin() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  end() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startInteractPlayerDiractionToLeisure(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBegin(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addEnd(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endInteractPlayerDiractionToLeisure(t) {
    return t.endObject();
  }
  static createInteractPlayerDiractionToLeisure(t, e, r, i) {
    return (
      InteractPlayerDiractionToLeisure.startInteractPlayerDiractionToLeisure(t),
      InteractPlayerDiractionToLeisure.addType(t, e),
      InteractPlayerDiractionToLeisure.addBegin(t, r),
      InteractPlayerDiractionToLeisure.addEnd(t, i),
      InteractPlayerDiractionToLeisure.endInteractPlayerDiractionToLeisure(t)
    );
  }
}
exports.InteractPlayerDiractionToLeisure = InteractPlayerDiractionToLeisure;
//# sourceMappingURL=interact-player-diraction-to-leisure.js.map
