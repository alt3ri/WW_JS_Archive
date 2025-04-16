"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayDynamicSettlement = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_dynamic_settlement_config_js_1 = require("../fb-action/union-dynamic-settlement-config.js");
class PlayDynamicSettlement {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayDynamicSettlement(t, e) {
    return (e || new PlayDynamicSettlement()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayDynamicSettlement(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayDynamicSettlement()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  dynamicSettlementConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_dynamic_settlement_config_js_1.UnionDynamicSettlementConfig.NONE;
  }
  dynamicSettlementConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startPlayDynamicSettlement(t) {
    t.startObject(2);
  }
  static addDynamicSettlementConfigType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_dynamic_settlement_config_js_1.UnionDynamicSettlementConfig.NONE,
    );
  }
  static addDynamicSettlementConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endPlayDynamicSettlement(t) {
    return t.endObject();
  }
  static createPlayDynamicSettlement(t, e, n) {
    return (
      PlayDynamicSettlement.startPlayDynamicSettlement(t),
      PlayDynamicSettlement.addDynamicSettlementConfigType(t, e),
      PlayDynamicSettlement.addDynamicSettlementConfig(t, n),
      PlayDynamicSettlement.endPlayDynamicSettlement(t)
    );
  }
}
exports.PlayDynamicSettlement = PlayDynamicSettlement;
//# sourceMappingURL=play-dynamic-settlement.js.map
