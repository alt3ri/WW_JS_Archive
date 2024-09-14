"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueController =
    exports.INSTANT_CUE_HANDLE =
    exports.INVALID_CUE_HANDLE =
      void 0);
const Log_1 = require("../../../../../../../../Core/Common/Log"),
  PreloadConfigStatementPart3_1 = require("../../../../../../../Preload/PreloadConfigStatementPart3"),
  GameplayCueBeamCommonItem_1 = require("../CommonItem/GameplayCueBeamCommonItem"),
  GameplayCueHookCommonItem_1 = require("../CommonItem/GameplayCueHookCommonItem");
(exports.INVALID_CUE_HANDLE = 0), (exports.INSTANT_CUE_HANDLE = -1);
class GameplayCueController {
  static SpawnGameplayCueHook(e, t, o, a) {
    return GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(
      e,
      t,
      o,
      a,
    );
  }
  static DestroyGameplayCueHook(e) {
    e.Destroy();
  }
  static SpawnGameplayCueBeam(e, t) {
    return GameplayCueBeamCommonItem_1.GameplayCueBeamCommonItem.Spawn(e, t);
  }
  static TickBeam(e, t, o) {
    e.Tick(t, o);
  }
  static DestroyGameplayCueBeam(e) {
    e.Destroy();
  }
  static GetConfigById(e) {
    var t = PreloadConfigStatementPart3_1.configGameplayCueById.GetConfig(e);
    if (t) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Battle", 29, "无法找到Cue配置！", ["cueId", e]);
  }
  static GenerateHandle() {
    return ++this.Gja;
  }
}
(exports.GameplayCueController = GameplayCueController).Gja = 0;
//# sourceMappingURL=GameplayCueController.js.map
