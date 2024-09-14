"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogReportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LogReportController_1 = require("./LogReportController"),
  LogReportDefine_1 = require("./LogReportDefine"),
  RECORD_HANG_UP_OFFSET = 30;
class LogReportModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.qba = new Map());
  }
  OnInit() {
    return (
      this.qba.set(
        "1012",
        new LogReportDefine_1.ExploreToolAssemblyLogData("1001"),
      ),
      this.qba.set(
        "1013",
        new LogReportDefine_1.ExploreToolAssemblyLogData("1003"),
      ),
      this.qba.set(
        "1014",
        new LogReportDefine_1.ExploreToolAssemblyLogData("1004"),
      ),
      this.qba.set(
        "1025",
        new LogReportDefine_1.ExploreToolAssemblyLogData("1013"),
      ),
      !0
    );
  }
  static get HangUpTime() {
    return this.Vvi;
  }
  static RecordOperateTime(e = !1, t = "", o = 0) {
    var r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if ((0 === this.Hvi && (this.Hvi = r), e && t)) {
      e = this.jvi.get(t);
      if ((0 === e && this.jvi.set(t, o), e === o)) return;
      this.jvi.set(t, o);
    }
    e = (r - this.Hvi) * TimeUtil_1.TimeUtil.Millisecond;
    e > RECORD_HANG_UP_OFFSET &&
      ((this.Vvi += e),
      ((t = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time =
        e.toString()),
      LogReportController_1.LogReportController.LogReport(t)),
      (this.Hvi = r);
  }
  GetTimerAssemblyLogData(e) {
    return this.qba.get(e);
  }
  GetAllTimerAssemblyLogData() {
    return Array.from(this.qba.values());
  }
}
((exports.LogReportModel = LogReportModel).Hvi = 0),
  (LogReportModel.Vvi = 0),
  (LogReportModel.jvi = new Map());
//# sourceMappingURL=LogReportModel.js.map
