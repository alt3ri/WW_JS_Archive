"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressSignInSubView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase"),
  ActivityRegressSignPanel_1 = require("./ActivityRegressSignPanel");
class ActivityRegressSignInSubView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments), (this.nCa = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.nCa = new ActivityRegressSignPanel_1.ActivityRegressSignPanel()),
      await this.nCa.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.ActivityRegressModel.SetSignFirstShowTime();
  }
  OnUpdate() {
    this.nCa.RefreshView();
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
    this.GetItem(1).SetUIActive(1 === e), this.GetItem(2).SetUIActive(2 === e);
  }
}
exports.ActivityRegressSignInSubView = ActivityRegressSignInSubView;
//# sourceMappingURL=ActivityRegressSignInSubView.js.map
