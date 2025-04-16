"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpawnMonsterConstraintAnnularSector = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpawnMonsterConstraintAnnularSector {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsSpawnMonsterConstraintAnnularSector(t, n) {
    return (n || new SpawnMonsterConstraintAnnularSector()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSpawnMonsterConstraintAnnularSector(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new SpawnMonsterConstraintAnnularSector()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var n = this.bb.__offset(this.bb_pos, 4);
    return n ? this.bb.__string(this.bb_pos + n, t) : void 0;
  }
  innerRadius() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  outerRadius() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  angle() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startSpawnMonsterConstraintAnnularSector(t) {
    t.startObject(4);
  }
  static addType(t, n) {
    t.addFieldOffset(0, n, 0);
  }
  static addInnerRadius(t, n) {
    t.addFieldFloat32(1, n, 0);
  }
  static addOuterRadius(t, n) {
    t.addFieldFloat32(2, n, 0);
  }
  static addAngle(t, n) {
    t.addFieldFloat32(3, n, 0);
  }
  static endSpawnMonsterConstraintAnnularSector(t) {
    return t.endObject();
  }
  static createSpawnMonsterConstraintAnnularSector(t, n, r, s, a) {
    return (
      SpawnMonsterConstraintAnnularSector.startSpawnMonsterConstraintAnnularSector(
        t,
      ),
      SpawnMonsterConstraintAnnularSector.addType(t, n),
      SpawnMonsterConstraintAnnularSector.addInnerRadius(t, r),
      SpawnMonsterConstraintAnnularSector.addOuterRadius(t, s),
      SpawnMonsterConstraintAnnularSector.addAngle(t, a),
      SpawnMonsterConstraintAnnularSector.endSpawnMonsterConstraintAnnularSector(
        t,
      )
    );
  }
}
exports.SpawnMonsterConstraintAnnularSector =
  SpawnMonsterConstraintAnnularSector;
//# sourceMappingURL=spawn-monster-constraint-annular-sector.js.map
