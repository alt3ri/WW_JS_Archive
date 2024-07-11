"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataScale = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataScale {
  constructor(t) {
    (this.M9o = void 0),
      (this.E9o = void 0),
      (this.S9o = !1),
      (this.y9o = void 0),
      (this.Pe = t);
  }
  get SizeScale() {
    return (
      this.M9o || (this.M9o = Vector_1.Vector.Create(this.Pe.缩放倍率)),
      this.M9o
    );
  }
  get ScaleCurve() {
    return (
      this.S9o || ((this.S9o = !0), (this.E9o = this.Pe.缩放倍率曲线)), this.E9o
    );
  }
  get ShapeSwitch() {
    return void 0 === this.y9o && (this.y9o = this.Pe.特定形状开关), this.y9o;
  }
  Preload() {
    this.SizeScale;
    return this.ScaleCurve, !0;
  }
}
exports.BulletDataScale = BulletDataScale;
//# sourceMappingURL=BulletDataScale.js.map
