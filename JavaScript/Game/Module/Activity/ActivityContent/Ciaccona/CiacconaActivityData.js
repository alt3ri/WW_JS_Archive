"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaActivityData = void 0);
const ActivityData_1 = require("../../ActivityData"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class CiacconaActivityData extends ActivityData_1.ActivityBaseData {
  PhraseEx(a) {
    ModelManager_1.ModelManager.CiacconaGalModel.UpdateByServerActivityData(
      a,
      this.Id,
    );
  }
  GetExDataRedPointShowState() {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward(),
      e = ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward(),
      t = ModelManager_1.ModelManager.CiacconaGalModel.HasAnySubEndingReward();
    return a || e || t;
  }
}
exports.CiacconaActivityData = CiacconaActivityData;
//# sourceMappingURL=CiacconaActivityData.js.map
