"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoDungeonCommandQueue = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  Macro_1 = require("../../../../Core/Preprocessor/Macro");
class DangoDungeonCommandQueue {
  constructor() {
    (this.CurCommandActionIndex = 0),
      (this.gBc = !1),
      (this.fBc = []),
      (this.X2c = void 0),
      (this.qy1 = new Map()),
      (this.Jb1 = void 0),
      (this.oUe = 0);
  }
  Init() {
    this.av();
  }
  AddCommand(t) {
    this.gBc || this.fBc.push(t);
  }
  Abort() {
    this.Jb1 && (this.Jb1.IsAborted = !0), (this.gBc = !0);
  }
  async Execute() {
    for (; 0 < this.fBc.length && !this.gBc; )
      try {
        var t = cpp_1.KuroTime.GetMicroseconds64(),
          i =
            ((this.Jb1 = this.fBc.shift()),
            0 < this.Jb1.ActionIndex &&
              (this.CurCommandActionIndex = this.Jb1.ActionIndex),
            await this.Jb1.Execute(),
            cpp_1.KuroTime.GetMicroseconds64());
        (this.oUe += i - t), this.Gy1(this.Jb1.CommandType, i - t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "RacingBetsDungeon",
              58,
              "DangoDungeonCommandQueue Execute异常",
              t,
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RacingBetsDungeon",
              58,
              "DangoDungeonCommandQueue Execute异常",
              ["error", t],
            );
      }
    this.Fy1(), this.OnEnd(this.gBc);
  }
  Gy1(t, i) {}
  Fy1() {}
  OnEnd(t) {
    this.X2c && this.X2c(t), this.av();
  }
  av() {
    (this.oUe = 0),
      (this.CurCommandActionIndex = 0),
      this.qy1.clear(),
      (this.gBc = !1),
      (this.fBc = []),
      (this.X2c = void 0);
  }
  BindCommandQueueEndCallBack(t) {
    this.X2c = t;
  }
}
exports.DangoDungeonCommandQueue = DangoDungeonCommandQueue;
//# sourceMappingURL=DangoDungeonCommandQueue.js.map
