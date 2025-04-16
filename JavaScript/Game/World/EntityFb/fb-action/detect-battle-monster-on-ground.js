"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DetectBattleMonsterOnGround = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DetectBattleMonsterOnGround {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDetectBattleMonsterOnGround(t, e) {
    return (e || new DetectBattleMonsterOnGround()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDetectBattleMonsterOnGround(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DetectBattleMonsterOnGround()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startDetectBattleMonsterOnGround(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endDetectBattleMonsterOnGround(t) {
    return t.endObject();
  }
  static createDetectBattleMonsterOnGround(t, e) {
    return (
      DetectBattleMonsterOnGround.startDetectBattleMonsterOnGround(t),
      DetectBattleMonsterOnGround.addType(t, e),
      DetectBattleMonsterOnGround.endDetectBattleMonsterOnGround(t)
    );
  }
}
exports.DetectBattleMonsterOnGround = DetectBattleMonsterOnGround;
//# sourceMappingURL=detect-battle-monster-on-ground.js.map
