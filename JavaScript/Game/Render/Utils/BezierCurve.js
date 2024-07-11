"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BeizerQuadraticCurve = void 0);
class BeizerQuadraticCurve {
  constructor() {
    (this.PointA = void 0),
      (this.PointB = void 0),
      (this.ControlPoint = void 0);
  }
  InitByThreePoints(t, i, s) {
    (this.PointA = t), (this.PointB = i), (this.ControlPoint = s);
  }
  InitByPhysics(t, i, s, e) {
    (this.PointA = t),
      (this.PointB = i),
      (this.ControlPoint = this.PointA.op_Addition(s.op_Multiply(e)));
  }
  GetPos(t) {
    const i = 1 - t;
    return this.PointA.op_Multiply(i * i)
      .op_Addition(this.ControlPoint.op_Multiply(2 * i * t))
      .op_Addition(this.PointB.op_Multiply(t * t));
  }
  GetDerivativeAt(t) {
    const i = 1 - t;
    return this.PointA.op_Multiply(-2 * i)
      .op_Addition(this.ControlPoint.op_Multiply(2 * i - 2 * t))
      .op_Addition(this.PointB.op_Multiply(2 * t));
  }
  GetPolylineLength() {
    return (
      this.ControlPoint.op_Subtraction(this.PointA).Size() +
      this.ControlPoint.op_Subtraction(this.PointB).Size()
    );
  }
}
exports.BeizerQuadraticCurve = BeizerQuadraticCurve;
// # sourceMappingURL=BezierCurve.js.map
