"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideStep = void 0);
class GuideStep {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Controller() {
    return this.controller();
  }
  get SuccessCondition() {
    return this.successcondition();
  }
  get FailureCondition() {
    return this.failurecondition();
  }
  get TimeScale() {
    return this.timescale();
  }
  get ContentType() {
    return this.contenttype();
  }
  get ReportId() {
    return this.reportid();
  }
  get Duration() {
    return this.duration();
  }
  get MinDuration() {
    return this.minduration();
  }
  get ShowDelay() {
    return this.showdelay();
  }
  get IsDangerous() {
    return this.isdangerous();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGuideStep(t, i) {
    return (i || new GuideStep()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  controller(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  successcondition() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  failurecondition() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  timescale() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
  contenttype() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reportid() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  duration() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 5e3;
  }
  minduration() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : -1;
  }
  showdelay() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isdangerous() {
    const t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.GuideStep = GuideStep;
// # sourceMappingURL=GuideStep.js.map
