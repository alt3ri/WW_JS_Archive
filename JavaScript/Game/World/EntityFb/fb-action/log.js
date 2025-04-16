"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Log = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Log {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLog(t, e) {
    return (e || new Log()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLog(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new Log()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  level(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  content(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startLog(t) {
    t.startObject(2);
  }
  static addLevel(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addContent(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endLog(t) {
    return t.endObject();
  }
  static createLog(t, e, s) {
    return (
      Log.startLog(t), Log.addLevel(t, e), Log.addContent(t, s), Log.endLog(t)
    );
  }
}
exports.Log = Log;
//# sourceMappingURL=log.js.map
