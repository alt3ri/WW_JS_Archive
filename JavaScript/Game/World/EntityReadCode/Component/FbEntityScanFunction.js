"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityScanFunction = void 0);
const FbScanTraceEffect_1 = require("./FbScanTraceEffect");
class FbEntityScanFunction {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.eUh = !1),
      (this.tUh = 0),
      (this.iUh = !1),
      (this.rUh = !1),
      (this.oUh = !1),
      (this.nUh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityScanFunction(t);
  }
  get ScanId() {
    return (
      this.eUh || ((this.eUh = !0), (this.tUh = this.FbDataInternal.scanId())),
      this.tUh
    );
  }
  get IsConcealed() {
    return (
      this.iUh ||
        ((this.iUh = !0), (this.rUh = this.FbDataInternal.isConcealed())),
      this.rUh
    );
  }
  get TraceEffect() {
    return (
      this.oUh ||
        ((this.oUh = !0),
        (this.nUh = FbScanTraceEffect_1.FbScanTraceEffect.Create(
          this.FbDataInternal.traceEffect(),
        ))),
      this.nUh
    );
  }
}
exports.FbEntityScanFunction = FbEntityScanFunction;
//# sourceMappingURL=FbEntityScanFunction.js.map
