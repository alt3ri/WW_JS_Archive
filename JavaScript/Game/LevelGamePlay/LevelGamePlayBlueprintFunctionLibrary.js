"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager");
class LevelGamePlayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static ApplyScanEffect(e) {
    return ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleScanResponse(
      e,
    );
  }
  static ClearAllScanEffects() {
    ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleClearAllScanEffect();
  }
  static SceneInteractionBind(e, n, r) {
    SceneInteractionManager_1.SceneInteractionManager.Get().EmitActor(e, n, r);
  }
  static GetScanMaxDistance() {
    return (
      ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanMaxDistance ?? 0
    );
  }
  static GetScanInteractionEffectMaxDistance() {
    return (
      ConfigManager_1.ConfigManager.LevelGamePlayConfig
        ?.ScanShowInteractionEffectMaxDistance ?? 0
    );
  }
}
exports.default = LevelGamePlayBlueprintFunctionLibrary;
//# sourceMappingURL=LevelGamePlayBlueprintFunctionLibrary.js.map
