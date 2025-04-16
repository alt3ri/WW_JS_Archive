"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MontageData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  montage_param_js_1 = require("../fb-action/montage-param.js");
class MontageData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsMontageData(t, a) {
    return (a || new MontageData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMontageData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new MontageData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  actorIndex() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  montageId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isAbpMontage() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isLoop() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  keepPose() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  endLoopingMontage() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  endMontageDirectly() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  startFromLoop() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  overlayMontage(t) {
    var a = this.bb.__offset(this.bb_pos, 22);
    return a
      ? (t || new montage_param_js_1.MontageParam()).__init(
          this.bb.__indirect(this.bb_pos + a),
          this.bb,
        )
      : void 0;
  }
  faceExpressionId() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startMontageData(t) {
    t.startObject(11);
  }
  static addActorIndex(t, a) {
    t.addFieldInt32(0, a, 0);
  }
  static addMontageId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static addIsAbpMontage(t, a) {
    t.addFieldInt8(2, +a, 0);
  }
  static addIsLoop(t, a) {
    t.addFieldInt8(3, +a, 0);
  }
  static addKeepPose(t, a) {
    t.addFieldInt8(4, +a, 0);
  }
  static addDelayTime(t, a) {
    t.addFieldFloat32(5, a, 0);
  }
  static addEndLoopingMontage(t, a) {
    t.addFieldInt8(6, +a, 0);
  }
  static addEndMontageDirectly(t, a) {
    t.addFieldInt8(7, +a, 0);
  }
  static addStartFromLoop(t, a) {
    t.addFieldInt8(8, +a, 0);
  }
  static addOverlayMontage(t, a) {
    t.addFieldOffset(9, a, 0);
  }
  static addFaceExpressionId(t, a) {
    t.addFieldInt32(10, a, 0);
  }
  static endMontageData(t) {
    return t.endObject();
  }
}
exports.MontageData = MontageData;
//# sourceMappingURL=montage-data.js.map
