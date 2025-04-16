"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetBattleTagConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetBattleTagConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetBattleTagConfig(t, e) {
    return (e || new SetBattleTagConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetBattleTagConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetBattleTagConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  tagConfigId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startSetBattleTagConfig(t) {
    t.startObject(3);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addTagConfigId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addDelayTime(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endSetBattleTagConfig(t) {
    return t.endObject();
  }
  static createSetBattleTagConfig(t, e, i, a) {
    return (
      SetBattleTagConfig.startSetBattleTagConfig(t),
      SetBattleTagConfig.addEntityId(t, e),
      SetBattleTagConfig.addTagConfigId(t, i),
      SetBattleTagConfig.addDelayTime(t, a),
      SetBattleTagConfig.endSetBattleTagConfig(t)
    );
  }
}
exports.SetBattleTagConfig = SetBattleTagConfig;
//# sourceMappingURL=set-battle-tag-config.js.map
