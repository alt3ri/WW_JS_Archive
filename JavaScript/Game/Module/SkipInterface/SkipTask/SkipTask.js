"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTask = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log");
class SkipTask {
  constructor() {
    (this.cp = !1), (this.Lqi = void 0);
  }
  Initialize() {
    this.OnAddEvents(), this.OnInitialize();
  }
  Destroy() {
    this.poi(), this.OnDestroyed(), this.OnRemoveEvents();
  }
  Run(...t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SkipInterface", 8, "开始跳转任务", [
        "Name",
        this.constructor.name,
      ]),
      this.foi(...t);
  }
  async AsyncRun(...t) {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SkipInterface", 8, "开始跳转任务", [
          "Name",
          this.constructor.name,
        ]),
      (this.Lqi = new CustomPromise_1.CustomPromise()),
      this.foi(...t),
      this.Lqi.Promise
    );
  }
  GetIsRunning() {
    return this.cp;
  }
  Finish() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SkipInterface", 8, "结束跳转任务", [
        "Name",
        this.constructor.name,
      ]),
      this.Lqi && this.Lqi.SetResult(0),
      this.OnFinished(),
      this.poi();
  }
  Stop() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SkipInterface", 8, "停止跳转任务", [
        "Name",
        this.constructor.name,
      ]),
      this.Lqi && this.Lqi.SetResult(1),
      this.OnStopped(),
      this.poi();
  }
  foi(...t) {
    (this.cp = !0), this.OnRun(...t);
  }
  poi() {
    (this.cp = !1), (this.Lqi = void 0);
  }
  OnInitialize() {}
  OnRun() {}
  OnFinished() {}
  OnStopped() {}
  OnDestroyed() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
}
exports.SkipTask = SkipTask;
//# sourceMappingURL=SkipTask.js.map
