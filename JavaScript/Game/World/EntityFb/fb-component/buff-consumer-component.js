"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffConsumerComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BuffConsumerComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBuffConsumerComponent(t, e) {
    return (e || new BuffConsumerComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBuffConsumerComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BuffConsumerComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  buffId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  producerEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBuffConsumerComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addBuffId(t, e) {
    t.addFieldInt64(1, e, BigInt("0"));
  }
  static addBulletId(t, e) {
    t.addFieldInt64(2, e, BigInt("0"));
  }
  static addProducerEntityId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endBuffConsumerComponent(t) {
    return t.endObject();
  }
  static createBuffConsumerComponent(t, e, n, s, o) {
    return (
      BuffConsumerComponent.startBuffConsumerComponent(t),
      BuffConsumerComponent.addDisabled(t, e),
      BuffConsumerComponent.addBuffId(t, n),
      BuffConsumerComponent.addBulletId(t, s),
      BuffConsumerComponent.addProducerEntityId(t, o),
      BuffConsumerComponent.endBuffConsumerComponent(t)
    );
  }
}
exports.BuffConsumerComponent = BuffConsumerComponent;
//# sourceMappingURL=buff-consumer-component.js.map
