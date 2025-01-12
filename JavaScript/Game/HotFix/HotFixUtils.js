"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixUtils = void 0);
const Log_1 = require("../../Core/Common/Log");
class HotFixUtils {
  static EvalScript(script) {
    try {
      const ret = String(eval(script));
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 20, "script evaluated", ["result", ret]);
    } catch (error) {
      error instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Game",
            20,
            "evaluate script error",
            error,
            ["err", error.name],
            ["msg", error.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Game", 20, "evaluate script error", [
            "error",
            String(error),
          ]);
    }
  }
}
exports.HotFixUtils = HotFixUtils;
//# sourceMappingURL=HotFixUtils.js.map
