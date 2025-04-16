"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowCenterText = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  text_style_js_1 = require("../fb-action/text-style.js");
class ShowCenterText {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsShowCenterText(t, e) {
    return (e || new ShowCenterText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsShowCenterText(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ShowCenterText()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  textId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  tidCenterText(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  plotLineKey(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  totalTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  textStyle(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (t || new text_style_js_1.TextStyle()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  bgImageId(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  isMulLine() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isManualNext() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startShowCenterText(t) {
    t.startObject(8);
  }
  static addTextId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addTidCenterText(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPlotLineKey(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addTotalTime(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static addTextStyle(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addBgImageId(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addIsMulLine(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static addIsManualNext(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static endShowCenterText(t) {
    return t.endObject();
  }
}
exports.ShowCenterText = ShowCenterText;
//# sourceMappingURL=show-center-text.js.map
