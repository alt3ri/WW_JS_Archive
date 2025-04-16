"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenFishingItemDeliveryWithReturn = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class OpenFishingItemDeliveryWithReturn {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsOpenFishingItemDeliveryWithReturn(e, t) {
    return (t || new OpenFishingItemDeliveryWithReturn()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsOpenFishingItemDeliveryWithReturn(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new OpenFishingItemDeliveryWithReturn()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  presetId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  returnVarType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  returnVar(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startOpenFishingItemDeliveryWithReturn(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addPresetId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addReturnVarType(e, t) {
    e.addFieldInt8(2, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addReturnVar(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endOpenFishingItemDeliveryWithReturn(e) {
    return e.endObject();
  }
  static createOpenFishingItemDeliveryWithReturn(e, t, i, r, n) {
    return (
      OpenFishingItemDeliveryWithReturn.startOpenFishingItemDeliveryWithReturn(
        e,
      ),
      OpenFishingItemDeliveryWithReturn.addType(e, t),
      OpenFishingItemDeliveryWithReturn.addPresetId(e, i),
      OpenFishingItemDeliveryWithReturn.addReturnVarType(e, r),
      OpenFishingItemDeliveryWithReturn.addReturnVar(e, n),
      OpenFishingItemDeliveryWithReturn.endOpenFishingItemDeliveryWithReturn(e)
    );
  }
}
exports.OpenFishingItemDeliveryWithReturn = OpenFishingItemDeliveryWithReturn;
//# sourceMappingURL=open-fishing-item-delivery-with-return.js.map
