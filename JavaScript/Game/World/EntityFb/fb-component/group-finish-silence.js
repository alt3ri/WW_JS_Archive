"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GroupFinishSilence = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_state_js_1 = require("../fb-component/entity-state.js");
class GroupFinishSilence {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGroupFinishSilence(t, i) {
    return (i || new GroupFinishSilence()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGroupFinishSilence(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GroupFinishSilence()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  switchSpecifiedStatus(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new entity_state_js_1.EntityState()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startGroupFinishSilence(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addSwitchSpecifiedStatus(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endGroupFinishSilence(t) {
    return t.endObject();
  }
}
exports.GroupFinishSilence = GroupFinishSilence;
//# sourceMappingURL=group-finish-silence.js.map
