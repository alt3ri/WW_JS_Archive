"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplashScreenQueue = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  SplashScreenById_1 = require("../../../Core/Define/ConfigQuery/SplashScreenById");
class SplashScreenQueue {
  constructor() {
    (this.TaskQueue = []), (this.Pk_ = void 0), (this.Wp1 = !1);
  }
  EnQueue(s) {
    this.IsTaskInQueue(s)
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SplashScreenTask",
          71,
          "[SplashScreenTask] 任务重复添加",
          ["TaskSourceModule", s.SourceModule],
          ["Status", s.Status],
        )
      : (this.TaskQueue.push(s),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SplashScreenTask",
            71,
            "[SplashScreenTask] 添加任务",
            ["TaskSourceModule", s.SourceModule],
            ["Status", s.Status],
          ));
  }
  ProcessQueueSingle() {
    if (
      !this.IsSplashScreenTaskRunning() &&
      this.TaskQueue &&
      0 !== this.TaskQueue.length
    ) {
      if (
        ((this.Pk_ = this.TaskQueue.shift()),
        1 === this.Pk_?.SplashScreenTimeType)
      ) {
        if (this.Wp1)
          return (this.Pk_ = void 0), void this.ProcessQueueSingle();
        this.Wp1 = !0;
      }
      this.Pk_ &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SplashScreenTask",
            71,
            "[SplashScreenTask] 任务开始执行",
            ["TaskSourceModule", this.Pk_.SourceModule],
            ["Status", this.Pk_.Status],
          ),
        this.Pk_.Run());
    }
  }
  FinishTask(s = 0) {
    this.Pk_
      ? 0 !== s && s !== this.Pk_.SourceModule
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SplashScreenTask",
            71,
            "[SplashScreenTask] 当前执行任务名称与参数名称不一致，结束任务失败",
            ["finishTaskSourceModule", s],
            ["curTaskSourceModule", this.Pk_?.SourceModule],
          )
        : (this.Pk_ && (this.Pk_.FinishTask(), (this.Pk_ = void 0)),
          this.ProcessQueueSingle())
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SplashScreenTask",
          71,
          "[SplashScreenTask] 当前没有正在执行的任务",
          ["finishTaskSourceModule", s],
        );
  }
  ProcessQueue() {
    this.TaskQueue.sort((s, e) => {
      return 1 === s.Type || 1 === e.Type
        ? 1 === s.Type
          ? 1
          : -1
        : ((s = SplashScreenById_1.configSplashScreenById.GetConfig(
            s.SourceModule,
          )),
          SplashScreenById_1.configSplashScreenById.GetConfig(e.SourceModule)
            .Priority - s.Priority);
    }),
      this.ProcessQueueSingle();
  }
  IsSplashScreenTaskRunning() {
    return !!this.Pk_;
  }
  IsTaskInQueue(s) {
    for (const e of this.TaskQueue)
      if (e.SourceModule === s.SourceModule) return !0;
    return !1;
  }
  ClearAllTask() {
    this.Pk_ && (this.Pk_.FailTask(), (this.Pk_ = void 0));
    for (const s of this.TaskQueue) s.CancelTask();
    this.TaskQueue = [];
  }
}
exports.SplashScreenQueue = SplashScreenQueue;
//# sourceMappingURL=SplashScreenQueue.js.map
