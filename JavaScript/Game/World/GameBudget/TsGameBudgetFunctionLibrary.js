"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  GameBudgetAllocatorConfigCreator_1 = require("../Define/GameBudgetAllocatorConfigCreator"),
  TsBlueprintGameBudgetObject_1 = require("./TsBlueprintGameBudgetObject");
class TsGameBudgetFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static RegisterGameBudget(t, r) {
    if ("ScheduledTick" in t) {
      let e = void 0;
      e = r
        ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
            .TsCollisionPlantConfig
        : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
            .TsNormalEntityGroupConfig;
      r = new TsBlueprintGameBudgetObject_1.TsBlueprintGameBudgetObject(t);
      r.RegisterTick(e) &&
        TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.set(t, r);
    }
  }
  static UnregisterGameBudget(e) {
    var t;
    TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.has(e) &&
      ((t = TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.get(e)) &&
        t.UnregisterTick(),
      TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.delete(e));
  }
}
(TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap = new Map()),
  (exports.default = TsGameBudgetFunctionLibrary);
//# sourceMappingURL=TsGameBudgetFunctionLibrary.js.map
