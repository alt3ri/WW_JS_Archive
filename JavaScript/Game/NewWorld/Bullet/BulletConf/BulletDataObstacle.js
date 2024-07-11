"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataObstacle = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataObstacle {
  constructor(t) {
    (this.n9o = void 0), (this.s9o = void 0), (this.Pe = t);
  }
  get Center() {
    return (
      this.n9o || (this.n9o = Vector_1.Vector.Create(this.Pe.检测位置)),
      this.n9o
    );
  }
  get Radius() {
    return void 0 === this.s9o && (this.s9o = this.Pe.检测距离), this.s9o;
  }
  Preload() {
    this.Center;
    return this.Radius, !0;
  }
}
exports.BulletDataObstacle = BulletDataObstacle;
//# sourceMappingURL=BulletDataObstacle.js.map
