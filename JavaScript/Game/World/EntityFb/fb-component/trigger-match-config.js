"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerMatchConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_entity_match_js_1 = require("../fb-component/union-entity-match.js");
class TriggerMatchConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTriggerMatchConfig(t, i) {
    return (i || new TriggerMatchConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTriggerMatchConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TriggerMatchConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityMatchType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_entity_match_js_1.UnionEntityMatch.NONE;
  }
  entityMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  entityMatchCount() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTriggerMatchConfig(t) {
    t.startObject(3);
  }
  static addEntityMatchType(t, i) {
    t.addFieldInt8(0, i, union_entity_match_js_1.UnionEntityMatch.NONE);
  }
  static addEntityMatch(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addEntityMatchCount(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endTriggerMatchConfig(t) {
    return t.endObject();
  }
  static createTriggerMatchConfig(t, i, r, e) {
    return (
      TriggerMatchConfig.startTriggerMatchConfig(t),
      TriggerMatchConfig.addEntityMatchType(t, i),
      TriggerMatchConfig.addEntityMatch(t, r),
      TriggerMatchConfig.addEntityMatchCount(t, e),
      TriggerMatchConfig.endTriggerMatchConfig(t)
    );
  }
}
exports.TriggerMatchConfig = TriggerMatchConfig;
//# sourceMappingURL=trigger-match-config.js.map
