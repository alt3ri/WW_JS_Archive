"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AsyncUtil = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  EntityHelper_1 = require("../../Core/Entity/EntityHelper"),
  JsModelManager_1 = require("../../Core/Model/JsModelManager"),
  AiConfig_1 = require("../AI/Common/AiConfig"),
  CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
class AsyncUtil {
  static InitializeEnvironment() {
    if (!this.Sq_) {
      if (
        (JsModelManager_1.JsModelManager.InitializeEnvironment(),
        (AiConfig_1.AiConfig.AsyncAiPerception = !0),
        (AiConfig_1.AiConfig.CppAsyncAiPerception = !0),
        AiConfig_1.AiConfig.CppAsyncAiPerception)
      ) {
        var e = UE.NewArray(UE.BuiltinName);
        for (const t of EntityHelper_1.globalEntityTypeQueryName)
          e.Add(new UE.FName(t));
        cpp_1.FKuroAIPerceptionUtils.Initialize(
          e,
          62,
          1,
          6,
          CharacterUnifiedStateTypes_1.ECharMoveState.Other,
          CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
          CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
          CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop,
          CharacterUnifiedStateTypes_1.ECharMoveState.Glide,
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
          0,
        );
      }
      this.Sq_ = !0;
    }
  }
  static DestroyEnvironment() {
    this.Sq_ &&
      (cpp_1.FKuroAIPerceptionUtils.Clear(),
      JsModelManager_1.JsModelManager.DestroyEnvironment(),
      (this.Sq_ = !1));
  }
}
(exports.AsyncUtil = AsyncUtil).Sq_ = !1;
//# sourceMappingURL=AsyncUtil.js.map
