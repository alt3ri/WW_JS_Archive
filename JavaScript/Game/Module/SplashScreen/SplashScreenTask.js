"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplashScreenTask = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  SplashScreenById_1 = require("../../../Core/Define/ConfigQuery/SplashScreenById");
class SplashScreenTask {
  constructor(s, e, a) {
    (this.SourceModule = s),
      (this.Type = e),
      (this.jEr = a),
      (this.h0i = 0),
      (this.SplashScreenTimeType = 0) === e &&
        ((a = SplashScreenById_1.configSplashScreenById.GetConfig(s)),
        (this.SplashScreenTimeType = a.Type));
  }
  get Status() {
    return this.h0i;
  }
  Run() {
    if (0 !== this.h0i)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SplashScreenTask",
          71,
          "[SplashScreenTask] 任务被重复执行",
          ["TaskSourceModule", this.SourceModule],
          ["Status", this.Status],
        );
    else
      try {
        (this.h0i = 1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SplashScreenTask",
              71,
              "[SplashScreenTask] 任务开始执行",
              ["TaskSourceModule", this.SourceModule],
            ),
          this.jEr();
      } catch (s) {
        (this.h0i = 4),
          s instanceof Error
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SplashScreenTask",
                71,
                "[SplashScreenTask] 任务执行异常",
                ["TaskSourceModule", this.SourceModule],
                ["error", s.message],
              )
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SplashScreenTask",
                71,
                "[SplashScreenTask] 任务执行异常",
                ["TaskSourceModule", this.SourceModule],
                ["error", String(s)],
              );
      }
  }
  FinishTask() {
    (this.h0i = 2),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("SplashScreenTask", 71, "[SplashScreenTask] 任务完成", [
          "TaskSourceModule",
          this.SourceModule,
        ]);
  }
  CancelTask() {
    (this.h0i = 3),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("SplashScreenTask", 71, "[SplashScreenTask] 任务取消", [
          "TaskSourceModule",
          this.SourceModule,
        ]);
  }
  FailTask() {
    (this.h0i = 4),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("SplashScreenTask", 71, "[SplashScreenTask] 任务失败", [
          "TaskSourceModule",
          this.SourceModule,
        ]);
  }
}
exports.SplashScreenTask = SplashScreenTask;
//# sourceMappingURL=SplashScreenTask.js.map
