"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueController =
    exports.INSTANT_CUE_HANDLE =
    exports.INVALID_CUE_HANDLE =
      void 0);
const Log_1 = require("../../../../../../../../Core/Common/Log"),
  GameplayCueById_1 = require("../../../../../../../../Core/Define/ConfigQuery/GameplayCueById");
(exports.INVALID_CUE_HANDLE = 0), (exports.INSTANT_CUE_HANDLE = -1);
class GameplayCueController {
  static GetConfigById(e) {
    var r = GameplayCueById_1.configGameplayCueById.GetConfig(e);
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Battle", 28, "无法找到Cue配置！", ["cueId", e]);
  }
  static GenerateHandle() {
    return ++this.i$a;
  }
}
(exports.GameplayCueController = GameplayCueController).i$a = 0;
//# sourceMappingURL=GameplayCueController.js.map
