"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsBlueprintGameBudgetObject = exports.BlueprintGameBudgetActor =
    void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
class BlueprintGameBudgetActor {
  constructor() {
    this.ScheduledTick = void 0;
  }
}
exports.BlueprintGameBudgetActor = BlueprintGameBudgetActor;
class TsBlueprintGameBudgetObject {
  constructor(e) {
    (this.Actor = e),
      (this.ScheduledAfterTick = void 0),
      (this.OnEnabledChange = void 0),
      (this.OnWasRecentlyRenderedOnScreenChange = void 0),
      (this.LocationProxyFunction = void 0),
      (this.nC1 = !1);
  }
  RegisterTick(e) {
    return this.nC1
      ? 0
      : ((this.nC1 = !0),
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
          e.GroupName,
          e.SignificanceGroup,
          this,
          this.Actor,
        ));
  }
  UnregisterTick() {
    this.nC1 &&
      ((this.nC1 = !1),
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
        this,
      ));
  }
  ScheduledTick(e, t, r) {
    this.Actor?.IsValid()
      ? this.Actor.ScheduledTick(e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            36,
            "TsBlueprintGameBudgetObject Tick Invalid Actor",
          ),
        this.UnregisterTick());
  }
}
exports.TsBlueprintGameBudgetObject = TsBlueprintGameBudgetObject;
//# sourceMappingURL=TsBlueprintGameBudgetObject.js.map
