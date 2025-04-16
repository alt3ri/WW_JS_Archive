"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorInitialMontage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  montage_id_js_1 = require("../fb-action/montage-id.js");
class ActorInitialMontage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsActorInitialMontage(t, i) {
    return (i || new ActorInitialMontage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorInitialMontage(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ActorInitialMontage()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  montageId(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new montage_id_js_1.MontageId()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startActorInitialMontage(t) {
    t.startObject(1);
  }
  static addMontageId(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endActorInitialMontage(t) {
    return t.endObject();
  }
  static createActorInitialMontage(t, i) {
    return (
      ActorInitialMontage.startActorInitialMontage(t),
      ActorInitialMontage.addMontageId(t, i),
      ActorInitialMontage.endActorInitialMontage(t)
    );
  }
}
exports.ActorInitialMontage = ActorInitialMontage;
//# sourceMappingURL=actor-initial-montage.js.map
