"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlinePlayerConditionTargetParticipator = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnlinePlayerConditionTargetParticipator {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsOnlinePlayerConditionTargetParticipator(t, i) {
    return (i || new OnlinePlayerConditionTargetParticipator()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOnlinePlayerConditionTargetParticipator(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new OnlinePlayerConditionTargetParticipator()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  anyPlayer() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startOnlinePlayerConditionTargetParticipator(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAnyPlayer(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static endOnlinePlayerConditionTargetParticipator(t) {
    return t.endObject();
  }
  static createOnlinePlayerConditionTargetParticipator(t, i, r) {
    return (
      OnlinePlayerConditionTargetParticipator.startOnlinePlayerConditionTargetParticipator(
        t,
      ),
      OnlinePlayerConditionTargetParticipator.addType(t, i),
      OnlinePlayerConditionTargetParticipator.addAnyPlayer(t, r),
      OnlinePlayerConditionTargetParticipator.endOnlinePlayerConditionTargetParticipator(
        t,
      )
    );
  }
}
exports.OnlinePlayerConditionTargetParticipator =
  OnlinePlayerConditionTargetParticipator;
//# sourceMappingURL=online-player-condition-target-participator.js.map
