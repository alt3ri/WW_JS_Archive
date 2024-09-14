"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsPureTouchHandle = void 0);
const cpp_1 = require("cpp"),
  LogReportModel_1 = require("../Module/LogReport/LogReportModel");
class TsPureTouchHandle {
  constructor() {
    (this.R$e = void 0),
      (this.CDa = void 0),
      (this.OnTouchBegin = (t, s) => {
        this.CDa.TouchBegin(t, s),
          LogReportModel_1.LogReportModel.RecordOperateTime();
      }),
      (this.OnTouchEnd = (t, s) => {
        this.CDa.TouchEnd(t, s);
      }),
      (this.OnTouchMove = (t, s) => {
        this.CDa.TouchMove(t, s);
      });
  }
  Initialize(t, s) {
    (this.R$e = t), (this.CDa = s);
  }
  Reset() {
    (this.R$e = void 0), (this.CDa = void 0);
  }
  BindTouch() {
    cpp_1.FKuroInputInterface.RegisterTouchBinding(
      0,
      this.R$e,
      this,
      this.OnTouchBegin,
    ),
      cpp_1.FKuroInputInterface.RegisterTouchBinding(
        1,
        this.R$e,
        this,
        this.OnTouchEnd,
      ),
      cpp_1.FKuroInputInterface.RegisterTouchBinding(
        2,
        this.R$e,
        this,
        this.OnTouchMove,
      );
  }
}
exports.TsPureTouchHandle = TsPureTouchHandle;
//# sourceMappingURL=TsPureTouchHandle.js.map
