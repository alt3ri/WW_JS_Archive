"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowTalkOutline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowTalkOutline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsShowTalkOutline(t, i) {
    return (i || new ShowTalkOutline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsShowTalkOutline(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ShowTalkOutline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  textId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  tidOutline(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  plotLineKey(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startShowTalkOutline(t) {
    t.startObject(3);
  }
  static addTextId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addTidOutline(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addPlotLineKey(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endShowTalkOutline(t) {
    return t.endObject();
  }
  static createShowTalkOutline(t, i, e, s) {
    return (
      ShowTalkOutline.startShowTalkOutline(t),
      ShowTalkOutline.addTextId(t, i),
      ShowTalkOutline.addTidOutline(t, e),
      ShowTalkOutline.addPlotLineKey(t, s),
      ShowTalkOutline.endShowTalkOutline(t)
    );
  }
}
exports.ShowTalkOutline = ShowTalkOutline;
//# sourceMappingURL=show-talk-outline.js.map
