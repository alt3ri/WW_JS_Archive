"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsBattleUiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetBattleScoreStr() {
    var e = ModelManager_1.ModelManager.BattleScoreModel?.GetCurScoreId();
    return e
      ? `Id:${e},Score:` +
          (ModelManager_1.ModelManager.BattleScoreModel?.GetScore(e) ?? 0)
      : "";
  }
}
exports.default = TsBattleUiBlueprintFunctionLibrary;
//# sourceMappingURL=TsBattleUiBlueprintFunctionLibrary.js.map
