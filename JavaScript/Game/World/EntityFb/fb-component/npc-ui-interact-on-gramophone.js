"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcUiInteractOnGramophone = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  play_flow_js_1 = require("../fb-action/play-flow.js");
class NpcUiInteractOnGramophone {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsNpcUiInteractOnGramophone(t, i) {
    return (i || new NpcUiInteractOnGramophone()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcUiInteractOnGramophone(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new NpcUiInteractOnGramophone()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  enterMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  standByMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  switchMusicMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  exitMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  enterFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  failedFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  successFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startNpcUiInteractOnGramophone(t) {
    t.startObject(8);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEnterMontage(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addStandByMontage(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addSwitchMusicMontage(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addExitMontage(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addEnterFlow(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addFailedFlow(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addSuccessFlow(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endNpcUiInteractOnGramophone(t) {
    return t.endObject();
  }
}
exports.NpcUiInteractOnGramophone = NpcUiInteractOnGramophone;
//# sourceMappingURL=npc-ui-interact-on-gramophone.js.map
