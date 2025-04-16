"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UpdateUiEvent = exports.UpdateReportEvent = void 0);
const HotPatchLogReport_1 = require("../../HotPatchLogReport");
class UpdateReportEvent {
  constructor(t) {
    this.kIc = t;
  }
  Start(t, s) {
    s = s
      ? `${this.kIc}-${s}_${t.s_step_id}_start`
      : `${this.kIc}_${t.s_step_id}_start`;
    (t.s_step_id = s), HotPatchLogReport_1.HotPatchLogReport.Report(t);
  }
  End(t, s) {
    s = s
      ? `${this.kIc}-${s}_${t.s_step_id}_end`
      : `${this.kIc}_${t.s_step_id}_end`;
    (t.s_step_id = s), HotPatchLogReport_1.HotPatchLogReport.Report(t);
  }
  Event(t, s) {
    s = s
      ? `${this.kIc}-${s}_${t.s_step_id}_event`
      : `${this.kIc}_${t.s_step_id}_event`;
    (t.s_step_id = s), HotPatchLogReport_1.HotPatchLogReport.Report(t);
  }
}
exports.UpdateReportEvent = UpdateReportEvent;
class UpdateUiEvent {
  constructor(t, s) {
    (this.OIc = t), (this.lZo = s), (this.ShouldShowNoticeWindow = !1);
  }
  async WaitFrame(t) {
    await this.OIc.WaitFrame(t);
  }
  async ShowInfo(t, s, e = !1) {
    e ? await this.OIc.ShowInfo(t, s, this.lZo) : await this.OIc.ShowInfo(t, s);
  }
  async UpdateProgress(t, s, e, ...o) {
    await this.OIc.UpdateProgress(t, s, e, ...o);
  }
  async UpdatePatchDownProgress(t, s, e, o, a, r) {
    await this.OIc.UpdatePatchDownProgress(t, s, e, o, a, r);
  }
  async ShowDialog(t, s, e, o, a, r, ...i) {
    return this.OIc.ShowDialog(t, s, e, o, a, r, ...i);
  }
  TryShowNoticeWindowOnce() {
    this.ShouldShowNoticeWindow &&
      (this.OIc.ShowNoticeWindow(), (this.ShouldShowNoticeWindow = !1));
  }
  IsCompatible() {
    return !1;
  }
  async ShowNotEnoughSpaceConfirmation(t) {
    throw new Error("旧接口，新版的的不实现，不会进来这里，若进来，有异常！");
  }
  UpdatePatchProgress(t, s, e, o) {}
}
exports.UpdateUiEvent = UpdateUiEvent;
//# sourceMappingURL=UpdateEvent.js.map
