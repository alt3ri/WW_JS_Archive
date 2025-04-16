"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CdRefreshRule = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CdRefreshRule {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCdRefreshRule(e, t) {
    return (t || new CdRefreshRule()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCdRefreshRule(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CdRefreshRule()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  cd() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCdRefreshRule(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCd(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCdRefreshRule(e) {
    return e.endObject();
  }
  static createCdRefreshRule(e, t, s) {
    return (
      CdRefreshRule.startCdRefreshRule(e),
      CdRefreshRule.addType(e, t),
      CdRefreshRule.addCd(e, s),
      CdRefreshRule.endCdRefreshRule(e)
    );
  }
}
exports.CdRefreshRule = CdRefreshRule;
//# sourceMappingURL=cd-refresh-rule.js.map
