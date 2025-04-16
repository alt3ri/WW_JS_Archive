"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityHandleCallbackPair = void 0);
const Log_1 = require("../../../Core/Common/Log");
class EntityHandleCallbackPair {
  constructor() {
    (this.Handle = void 0),
      (this.Dto = []),
      (this.CreatureDataId = 0),
      (this.PbDataId = 0),
      (this.AngleRatio = 0),
      (this.Priority = 0),
      (this.Order = 0),
      (this.Version = 0);
  }
  AddCallback(t) {
    t && this.Dto.push(t);
  }
  ClearCallbacks() {
    this.Dto.length = 0;
  }
  InvokeCallbacks(s) {
    this.Dto.forEach((t) => {
      try {
        t(s);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Preload",
              60,
              "预加载实体:加载回调异常",
              t,
              ["result", s],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Preload", 60, "预加载实体:加载回调异常", [
              "result",
              s,
            ]);
      }
    });
  }
}
exports.EntityHandleCallbackPair = EntityHandleCallbackPair;
//# sourceMappingURL=EntityHandleCallbackPair.js.map
