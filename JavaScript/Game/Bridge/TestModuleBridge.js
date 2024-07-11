"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TestModuleBridge = void 0);
const Log_1 = require("../../Core/Common/Log");
class TestModuleBridge {
  static async TryGetTestModuleExports() {
    try {
      var e = await Promise.resolve().then(() =>
        require("../../Test/TestModuleExports"),
      );
      if (e) return e.TestModuleExports;
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Game", 63, "找不到Test模块入口", [
            "error",
            e.stack || e.message,
          ])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Game", 63, "找不到Test模块入口", ["error", e]);
    }
  }
}
exports.TestModuleBridge = TestModuleBridge;
//# sourceMappingURL=TestModuleBridge.js.map
