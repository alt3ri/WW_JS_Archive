"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskSystem = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
class TaskSystem {
  static get Promise() {
    return this.$Mr?.Promise;
  }
  static Initialize() {
    return (this.Ife = !0);
  }
  static async Run(s) {
    return (
      !!this.Ife &&
      (this.Running
        ? this.$Mr.Promise
        : ((this.YMr = s),
          (this.Running = !0),
          (this.$Mr = new CustomPromise_1.CustomPromise()),
          this.JMr()))
    );
  }
  static AddTask(s) {
    this.Ife && s.Init() && this.zMr.Push(s);
  }
  static Clear() {
    (this.Ife = !1), this.AW();
  }
  static AW() {
    this.zMr.Clear(),
      (this.YMr = void 0),
      (this.HasLoadingTask = !1),
      (this.Running = !1);
  }
  static async JMr() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 3, "TaskSystem:开始", [
        "Task个数",
        this.zMr.Size,
      ]);
    let s = !0;
    let t = -1;
    for (; this.zMr.Size; ) {
      const e = this.zMr.Pop();
      const i =
        (t++,
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "TaskSystem:执行Task前",
            ["Index", t],
            ["Name", e.Name],
            ["剩余Task个数", this.zMr.Size],
          ),
        await e.Run());
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "TaskSystem:执行Task后",
            ["Index", t],
            ["Name", e.Name],
            ["Result", i],
            ["剩余Task个数", this.zMr.Size],
          ),
        !this.Ife)
      )
        break;
      if (!i) {
        s = !1;
        break;
      }
    }
    if (!this.Ife)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "TaskSystem:结束",
            ["InitState", this.Ife],
            ["Success", s],
          ),
        !1
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 3, "TaskSystem:结束", ["Success", s]),
      (this.Running = !1),
      this.$Mr.SetResult(s);
    const a = this.YMr;
    return this.AW(), a?.(s), s;
  }
}
((exports.TaskSystem = TaskSystem).zMr = new Queue_1.Queue()),
  (TaskSystem.HasLoadingTask = !1),
  (TaskSystem.Running = !1),
  (TaskSystem.Ife = !1);
// # sourceMappingURL=TaskSystem.js.map
