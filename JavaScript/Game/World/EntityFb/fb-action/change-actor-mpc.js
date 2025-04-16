"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeActorMPC = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeActorMPC {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeActorMPC(t, e) {
    return (e || new ChangeActorMPC()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeActorMPC(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeActorMPC()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  mpcData(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startChangeActorMPC(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMpcData(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endChangeActorMPC(t) {
    return t.endObject();
  }
  static createChangeActorMPC(t, e, r) {
    return (
      ChangeActorMPC.startChangeActorMPC(t),
      ChangeActorMPC.addType(t, e),
      ChangeActorMPC.addMpcData(t, r),
      ChangeActorMPC.endChangeActorMPC(t)
    );
  }
}
exports.ChangeActorMPC = ChangeActorMPC;
//# sourceMappingURL=change-actor-mpc.js.map
