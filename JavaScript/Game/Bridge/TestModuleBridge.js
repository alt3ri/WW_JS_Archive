"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TestModuleBridge = void 0);
const Log_1 = require("../../Core/Common/Log");
class TestModuleBridge {
  static async TryGetTestModuleExports() {
    if (this.QUa) return this.QUa;
    try {
      var e = await Promise.resolve().then(() =>
        require("../../Test/TestModuleExports"),
      );
      if (e) return (this.QUa = e.TestModuleExports), this.QUa;
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 62, "找不到Test模块入口", [
            "error",
            e.stack || e.message,
          ])
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 62, "找不到Test模块入口", ["error", e]);
    }
  }
}
(exports.TestModuleBridge = TestModuleBridge).QUa = void 0;
//# sourceMappingURL=TestModuleBridge.js.map
