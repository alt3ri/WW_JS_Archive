"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskMoveAlong = void 0);
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskMoveAlong extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments),
      (this.PathPoint = void 0),
      (this.Navigation = !0),
      (this.ResetAllPoints = !1),
      (this.Gce = void 0);
  }
  ExecuteTask() {
    var s;
    return (
      (this.Gce = this.CreatureDataComponent.Entity.GetComponent(38)),
      this.Gce
        ? ((s = {
            Points: this.PathPoint,
            Navigation: this.Navigation,
            IsFly: !1,
            DebugMode: !0,
            Loop: !1,
            Callback: (s) => {
              this.wTe(s);
            },
            UsePreviousIndex: !0,
            UseNearestPoint: !0,
            ReturnFalseWhenNavigationFailed: !1,
            ResetAllPoints: this.ResetAllPoints,
          }),
          this.Gce.MoveAlongPath(s),
          3)
        : 1
    );
  }
  AbortTask() {
    return this.Gce.StopMove(!0), 2;
  }
  wTe(s) {
    switch ((this.Gce.StopMove(!0), s)) {
      case 1:
        this.FinishLatentTask(0);
        break;
      case 2:
      case 3:
        this.FinishLatentTask(1);
    }
  }
}
exports.LevelAiTaskMoveAlong = LevelAiTaskMoveAlong;
//# sourceMappingURL=LevelAiTaskMoveAlong.js.map
