"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBuffConsumerComponent = void 0);
class FbBuffConsumerComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.I5h = !1),
      (this.T5h = 0),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.A5h = !1),
      (this.x5h = 0);
  }
  static Create(t) {
    if (t) return new FbBuffConsumerComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get BuffId() {
    return (
      this.I5h ||
        ((this.I5h = !0), (this.T5h = Number(this.FbDataInternal.buffId()))),
      this.T5h
    );
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get ProducerEntityId() {
    return (
      this.A5h ||
        ((this.A5h = !0), (this.x5h = this.FbDataInternal.producerEntityId())),
      this.x5h
    );
  }
}
exports.FbBuffConsumerComponent = FbBuffConsumerComponent;
//# sourceMappingURL=FbBuffConsumerComponent.js.map
