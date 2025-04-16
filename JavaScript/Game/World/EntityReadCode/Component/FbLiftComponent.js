"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLiftComponent = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  FbAutoConfig_1 = require("./FbAutoConfig"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbLiftComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.U6h = !1),
      (this.D6h = 0),
      (this.B6h = !1),
      (this.q6h = void 0),
      (this.k6h = !1),
      (this.G6h = void 0),
      (this.XEh = !1),
      (this.YEh = 0),
      (this.O6h = !1),
      (this.F6h = !1),
      (this.N6h = !1),
      (this.V6h = 0),
      (this.j6h = !1),
      (this.H6h = void 0);
  }
  static Create(t) {
    if (t) return new FbLiftComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get InitialFloor() {
    return (
      this.U6h ||
        ((this.U6h = !0), (this.D6h = this.FbDataInternal.initialFloor())),
      this.D6h
    );
  }
  get StayPositions() {
    if (!this.B6h) {
      (this.B6h = !0), (this.q6h = new Array());
      var i = this.FbDataInternal.stayPositionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stayPositions(
            t,
            new fb_var_1.VectorInfo(),
          );
          this.q6h.push(FbVectorInfo_1.FbVectorInfo.Create(s));
        }
    }
    return this.q6h;
  }
  get AutoConfig() {
    return (
      this.k6h ||
        ((this.k6h = !0),
        (this.G6h = FbAutoConfig_1.FbAutoConfig.Create(
          this.FbDataInternal.autoConfig(),
        ))),
      this.G6h
    );
  }
  get MaxSpeed() {
    return (
      this.XEh ||
        ((this.XEh = !0), (this.YEh = this.FbDataInternal.maxSpeed())),
      this.YEh
    );
  }
  get UniformMovement() {
    return (
      this.O6h ||
        ((this.O6h = !0), (this.F6h = this.FbDataInternal.uniformMovement())),
      this.F6h
    );
  }
  get TurnTime() {
    return (
      this.N6h ||
        ((this.N6h = !0), (this.V6h = this.FbDataInternal.turnTime())),
      this.V6h
    );
  }
  get SafePoint() {
    return (
      this.j6h ||
        ((this.j6h = !0),
        (this.H6h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.safePoint(),
        ))),
      this.H6h
    );
  }
}
exports.FbLiftComponent = FbLiftComponent;
//# sourceMappingURL=FbLiftComponent.js.map
