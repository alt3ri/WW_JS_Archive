"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoveTrialFollowShooter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemoveTrialFollowShooter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, e) {
    return (this.bb_pos = o), (this.bb = e), this;
  }
  static getRootAsRemoveTrialFollowShooter(o, e) {
    return (e || new RemoveTrialFollowShooter()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsRemoveTrialFollowShooter(o, e) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RemoveTrialFollowShooter()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  id() {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.readInt32(this.bb_pos + o) : 0;
  }
  static startRemoveTrialFollowShooter(o) {
    o.startObject(1);
  }
  static addId(o, e) {
    o.addFieldInt32(0, e, 0);
  }
  static endRemoveTrialFollowShooter(o) {
    return o.endObject();
  }
  static createRemoveTrialFollowShooter(o, e) {
    return (
      RemoveTrialFollowShooter.startRemoveTrialFollowShooter(o),
      RemoveTrialFollowShooter.addId(o, e),
      RemoveTrialFollowShooter.endRemoveTrialFollowShooter(o)
    );
  }
}
exports.RemoveTrialFollowShooter = RemoveTrialFollowShooter;
//# sourceMappingURL=remove-trial-follow-shooter.js.map
