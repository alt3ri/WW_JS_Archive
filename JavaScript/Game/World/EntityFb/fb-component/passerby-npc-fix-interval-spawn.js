"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PasserbyNpcFixIntervalSpawn = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PasserbyNpcFixIntervalSpawn {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPasserbyNpcFixIntervalSpawn(t, s) {
    return (s || new PasserbyNpcFixIntervalSpawn()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPasserbyNpcFixIntervalSpawn(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PasserbyNpcFixIntervalSpawn()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  maxSpawnCount() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  minDistance() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  interval() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startPasserbyNpcFixIntervalSpawn(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addMaxSpawnCount(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addMinDistance(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addInterval(t, s) {
    t.addFieldFloat32(3, s, 0);
  }
  static endPasserbyNpcFixIntervalSpawn(t) {
    return t.endObject();
  }
  static createPasserbyNpcFixIntervalSpawn(t, s, a, e, r) {
    return (
      PasserbyNpcFixIntervalSpawn.startPasserbyNpcFixIntervalSpawn(t),
      PasserbyNpcFixIntervalSpawn.addType(t, s),
      PasserbyNpcFixIntervalSpawn.addMaxSpawnCount(t, a),
      PasserbyNpcFixIntervalSpawn.addMinDistance(t, e),
      PasserbyNpcFixIntervalSpawn.addInterval(t, r),
      PasserbyNpcFixIntervalSpawn.endPasserbyNpcFixIntervalSpawn(t)
    );
  }
}
exports.PasserbyNpcFixIntervalSpawn = PasserbyNpcFixIntervalSpawn;
//# sourceMappingURL=passerby-npc-fix-interval-spawn.js.map
