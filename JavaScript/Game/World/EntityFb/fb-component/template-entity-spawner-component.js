"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemplateEntitySpawnerComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_spawn_config_js_1 = require("../fb-component/union-spawn-config.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class TemplateEntitySpawnerComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsTemplateEntitySpawnerComponent(t, n) {
    return (n || new TemplateEntitySpawnerComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTemplateEntitySpawnerComponent(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new TemplateEntitySpawnerComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  spawnConditions(t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + n),
          this.bb,
        )
      : void 0;
  }
  clearConditions(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + n),
          this.bb,
        )
      : void 0;
  }
  spawnConfigType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spawn_config_js_1.UnionSpawnConfig.NONE;
  }
  spawnConfig(t) {
    var n = this.bb.__offset(this.bb_pos, 12);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startTemplateEntitySpawnerComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addSpawnConditions(t, n) {
    t.addFieldOffset(1, n, 0);
  }
  static addClearConditions(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static addSpawnConfigType(t, n) {
    t.addFieldInt8(3, n, union_spawn_config_js_1.UnionSpawnConfig.NONE);
  }
  static addSpawnConfig(t, n) {
    t.addFieldOffset(4, n, 0);
  }
  static endTemplateEntitySpawnerComponent(t) {
    return t.endObject();
  }
}
exports.TemplateEntitySpawnerComponent = TemplateEntitySpawnerComponent;
//# sourceMappingURL=template-entity-spawner-component.js.map
