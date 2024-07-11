"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const ConfigManager_1 = require("../Manager/ConfigManager");
const SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager");
const LevelGamePlayController_1 = require("./LevelGamePlayController");
class LevelGamePlayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static ApplyScanEffect(e) {
    return LevelGamePlayController_1.LevelGamePlayController.HandleScanResponse(
      e,
    );
  }
  static ClearAllScanEffects() {
    LevelGamePlayController_1.LevelGamePlayController.HandleClearAllScanEffect();
  }
  static SceneInteractionBind(e, a, n) {
    SceneInteractionManager_1.SceneInteractionManager.Get().EmitActor(e, a, n);
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
// # sourceMappingURL=LevelGamePlayBlueprintFunctionLibrary.js.map
