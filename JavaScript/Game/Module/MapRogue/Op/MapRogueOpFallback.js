"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpFallback = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpFallback extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments),
      (this.StepSize = 1),
      (this.AutoFinish = !0),
      (this.ExecuteInMapView = !1);
  }
  ToString() {
    return `[Fallback] IncId:${this.IncId} Step:` + this.CurrentStep;
  }
  OnUpdate() {}
  OnStartExecute(e) {
    UiManager_1.UiManager.OpenView("RogueBattleFallbackView", this.IncId);
  }
  OnExecute(e) {
    this.AutoFinish && this.Execute(e);
  }
  OnFinish(e) {}
  OnDelete(e) {
    UiManager_1.UiManager.IsViewOpen("RogueBattleFallbackView") &&
      UiManager_1.UiManager.CloseView("RogueBattleFallbackView");
  }
}
exports.MapRogueOpFallback = MapRogueOpFallback;
//# sourceMappingURL=MapRogueOpFallback.js.map
