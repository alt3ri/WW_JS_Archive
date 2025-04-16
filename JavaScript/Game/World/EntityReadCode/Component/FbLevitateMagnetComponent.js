"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevitateMagnetComponent = void 0);
class FbLevitateMagnetComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.YHh = !1),
      (this.zHh = 0),
      (this.U7h = !1),
      (this.D7h = 0);
  }
  static Create(t) {
    if (t) return new FbLevitateMagnetComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get MoveSpeed() {
    return (
      this.YHh ||
        ((this.YHh = !0), (this.zHh = this.FbDataInternal.moveSpeed())),
      this.zHh
    );
  }
  get Test() {
    return (
      this.U7h || ((this.U7h = !0), (this.D7h = this.FbDataInternal.test())),
      this.D7h
    );
  }
}
exports.FbLevitateMagnetComponent = FbLevitateMagnetComponent;
//# sourceMappingURL=FbLevitateMagnetComponent.js.map
