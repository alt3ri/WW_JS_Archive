"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionInputLayer = void 0);
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  InputEnums_1 = require("../../../../../../Input/InputEnums"),
  InputLayer_1 = require("../../../../../../Input/InputLayer");
class VisionInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments), (this.won = void 0), (this.pZo = void 0);
  }
  Init(t) {
    (this.won = t.Entity?.GetComponent(42)),
      (this.pZo = t.Entity?.GetComponent(18));
  }
  Clear() {
    (this.won = void 0), (this.pZo = void 0);
  }
  GetLayerType() {
    return 2;
  }
  HandlePress(t, e) {
    switch (t) {
      case InputEnums_1.EInputAction.攻击:
        if (
          (this.pZo.SendGameplayEventToActor(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(933547498),
          ),
          this.won.HandlePress(t, e) ?? !1)
        )
          return VisionInputLayer.GetSwallowCommand();
        break;
      case InputEnums_1.EInputAction.幻象2:
        if (
          (this.pZo.SendGameplayEventToActor(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(945753440),
          ),
          this.won.HandlePress(t, e) ?? !1)
        )
          return VisionInputLayer.GetSwallowCommand();
    }
  }
  HandleRelease(t, e) {
    t === InputEnums_1.EInputAction.幻象2 &&
      this.pZo.SendGameplayEventToActor(
        GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(1688962249),
      );
  }
}
exports.VisionInputLayer = VisionInputLayer;
//# sourceMappingURL=VisionInputLayer.js.map
