"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrainingView = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  TrainingItem_1 = require("./TrainingItem");
class TrainingView {
  constructor() {
    (this.Sui = void 0),
      (this.DRo = (e, i, r) => {
        i = new TrainingItem_1.TrainingItem(i);
        return i.SetData(e), { Key: r, Value: i };
      });
  }
  Show(e) {
    var i, r;
    e &&
      ((i = e.RootUIComp),
      (r =
        ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList()) ||
        i.SetUIActive(!1),
      (this.Sui = new GenericLayoutNew_1.GenericLayoutNew(e, this.DRo)),
      this.Sui.RebuildLayoutByDataNew(r),
      i.SetUIActive(!0));
  }
  Clear() {
    this.Sui && this.Sui.ClearChildren(), (this.Sui = void 0);
  }
}
exports.TrainingView = TrainingView;
//# sourceMappingURL=TrainingView.js.map
