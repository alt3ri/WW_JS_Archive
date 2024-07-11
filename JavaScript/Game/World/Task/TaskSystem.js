"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskSystem = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue");
class TaskSystem {
  static get Promise() {
    return this.KEr?.Promise;
  }
  static Initialize() {
    return (this.Ife = !0);
  }
  static async Run(s) {
    return (
      !!this.Ife &&
      (this.Running
        ? this.KEr.Promise
        : ((this.QEr = s),
          (this.Running = !0),
          (this.KEr = new CustomPromise_1.CustomPromise()),
          this.XEr()))
    );
  }
  static AddTask(s) {
    this.Ife && s.Init() && this.$Er.Push(s);
  }
  static Clear() {
    (this.Ife = !1), this.AW();
  }
  static AW() {
    this.$Er.Clear(),
      (this.QEr = void 0),
      (this.HasLoadingTask = !1),
      (this.Running = !1);
  }
  static async XEr() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 3, "TaskSystem:开始", [
        "Task个数",
        this.$Er.Size,
      ]);
    let s = !0,
      t = -1;
    for (; this.$Er.Size; ) {
      var e = this.$Er.Pop(),
        i =
          (t++,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "World",
              3,
              "TaskSystem:执行Task前",
              ["Index", t],
              ["Name", e.Name],
              ["剩余Task个数", this.$Er.Size],
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
            ["剩余Task个数", this.$Er.Size],
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
      this.KEr.SetResult(s);
    var a = this.QEr;
    return this.AW(), a?.(s), s;
  }
}
((exports.TaskSystem = TaskSystem).$Er = new Queue_1.Queue()),
  (TaskSystem.HasLoadingTask = !1),
  (TaskSystem.Running = !1),
  (TaskSystem.Ife = !1);
//# sourceMappingURL=TaskSystem.js.map
