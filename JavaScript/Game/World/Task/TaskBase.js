"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskBase = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class TaskBase {
  constructor(t, s, e) {
    (this.Name = t),
      (this.LogPrefix = ""),
      (this.InitHandle = s),
      (this.FinishedCallback = e),
      (this.XMr = new CustomPromise_1.CustomPromise());
  }
  SetLogPrefix(t) {
    this.LogPrefix = t;
  }
  Init() {
    if (this.InitHandle && !this.InitHandle()) return !1;
    return this.OnInit();
  }
  get Promise() {
    return this.XMr.Promise;
  }
  async Run() {
    const t = await this.OnRun();
    return this.OnExit(), this.XMr.SetResult(t), t;
  }
  OnInit() {
    return !0;
  }
  OnExit() {}
}
exports.TaskBase = TaskBase;
// # sourceMappingURL=TaskBase.js.map
