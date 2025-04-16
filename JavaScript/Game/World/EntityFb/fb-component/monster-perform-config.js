"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterPerformConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_monster_show_on_death_config_js_1 = require("../fb-component/union-monster-show-on-death-config.js");
class MonsterPerformConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsMonsterPerformConfig(t, o) {
    return (o || new MonsterPerformConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMonsterPerformConfig(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new MonsterPerformConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  showOnDeathType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_monster_show_on_death_config_js_1.UnionMonsterShowOnDeathConfig
          .NONE;
  }
  showOnDeath(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startMonsterPerformConfig(t) {
    t.startObject(2);
  }
  static addShowOnDeathType(t, o) {
    t.addFieldInt8(
      0,
      o,
      union_monster_show_on_death_config_js_1.UnionMonsterShowOnDeathConfig
        .NONE,
    );
  }
  static addShowOnDeath(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endMonsterPerformConfig(t) {
    return t.endObject();
  }
  static createMonsterPerformConfig(t, o, r) {
    return (
      MonsterPerformConfig.startMonsterPerformConfig(t),
      MonsterPerformConfig.addShowOnDeathType(t, o),
      MonsterPerformConfig.addShowOnDeath(t, r),
      MonsterPerformConfig.endMonsterPerformConfig(t)
    );
  }
}
exports.MonsterPerformConfig = MonsterPerformConfig;
//# sourceMappingURL=monster-perform-config.js.map
