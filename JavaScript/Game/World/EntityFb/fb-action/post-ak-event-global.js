"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PostAkEventGlobal = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PostAkEventGlobal {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPostAkEventGlobal(t, s) {
    return (s || new PostAkEventGlobal()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPostAkEventGlobal(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PostAkEventGlobal()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  akEvent(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startPostAkEventGlobal(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addAkEvent(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endPostAkEventGlobal(t) {
    return t.endObject();
  }
  static createPostAkEventGlobal(t, s, e) {
    return (
      PostAkEventGlobal.startPostAkEventGlobal(t),
      PostAkEventGlobal.addType(t, s),
      PostAkEventGlobal.addAkEvent(t, e),
      PostAkEventGlobal.endPostAkEventGlobal(t)
    );
  }
}
exports.PostAkEventGlobal = PostAkEventGlobal;
//# sourceMappingURL=post-ak-event-global.js.map
