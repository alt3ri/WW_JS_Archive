"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogReportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimeUtil_1 = require("../../Common/TimeUtil");
const LogReportController_1 = require("./LogReportController");
const LogReportDefine_1 = require("./LogReportDefine");
const RECORD_HANG_UP_OFFSET = 30;
class LogReportModel extends ModelBase_1.ModelBase {
  static get HangUpTime() {
    return this.Vpi;
  }
  static RecordOperateTime(e = !1, o = "", t = 0) {
    const r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if ((this.Hpi === 0 && (this.Hpi = r), e && o)) {
      e = this.jpi.get(o);
      if ((e === 0 && this.jpi.set(o, t), e === t)) return;
      this.jpi.set(o, t);
    }
    e = (r - this.Hpi) * TimeUtil_1.TimeUtil.Millisecond;
    e > RECORD_HANG_UP_OFFSET &&
      ((this.Vpi += e),
      ((o = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time =
        e.toString()),
      LogReportController_1.LogReportController.LogReport(o)),
      (this.Hpi = r);
  }
}
((exports.LogReportModel = LogReportModel).Hpi = 0),
  (LogReportModel.Vpi = 0),
  (LogReportModel.jpi = new Map());
// # sourceMappingURL=LogReportModel.js.map
