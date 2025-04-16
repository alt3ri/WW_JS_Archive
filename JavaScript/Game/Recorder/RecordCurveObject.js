"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecordFloatCurveObject = void 0);
const UE = require("ue");
class RecordFloatCurveObject {
  constructor(t, s, i, h) {
    (this.Olh = t),
      (this.x0 = s),
      (this.ae = i),
      (this.psa = h),
      (this.BIi = UE.NewArray(UE.BuiltinFloat)),
      (this.Glh = UE.NewArray(UE.BuiltinFloat)),
      (this.Cce = -1),
      (this.Cce = this.ae),
      this.BIi.Add(this.ae),
      this.Glh.Add(this.psa);
  }
  RecordTick(t, s) {
    (this.Cce += t),
      this.psa !== s &&
        ((this.psa = s), this.BIi.Add(this.Cce), this.Glh.Add(s));
  }
  RecordStop(t, s, i) {
    s.RecordFloatCurve(
      this.Olh,
      i,
      new UE.FName(this.x0),
      this.BIi,
      this.Glh,
      this.ae,
      t,
    );
  }
}
exports.RecordFloatCurveObject = RecordFloatCurveObject;
//# sourceMappingURL=RecordCurveObject.js.map
