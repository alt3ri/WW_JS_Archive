"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowMessage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowMessage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsShowMessage(e, s) {
    return (s || new ShowMessage()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsShowMessage(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new ShowMessage()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  content(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, e) : void 0;
  }
  static startShowMessage(e) {
    e.startObject(1);
  }
  static addContent(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static endShowMessage(e) {
    return e.endObject();
  }
  static createShowMessage(e, s) {
    return (
      ShowMessage.startShowMessage(e),
      ShowMessage.addContent(e, s),
      ShowMessage.endShowMessage(e)
    );
  }
}
exports.ShowMessage = ShowMessage;
//# sourceMappingURL=show-message.js.map
