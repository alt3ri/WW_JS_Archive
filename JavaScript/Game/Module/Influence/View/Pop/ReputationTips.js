"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReputationTips = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class ReputationTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.bsi = void 0), (this.x5e = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnBeforeCreate() {
    this.x5e = this.OpenParam;
  }
  OnStart() {
    (this.bsi = new ReputationTipsItem(this.GetItem(0))),
      this.GetItem(1).SetUIActive(!1);
  }
  OnAfterShow() {
    this.bsi.UpdateItem(this.x5e[0].Item1, this.x5e[0].Item2);
  }
  OnBeforeDestroy() {
    this.bsi.Destroy(), (this.bsi = void 0);
  }
}
exports.ReputationTips = ReputationTips;
class ReputationTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ];
  }
  UpdateItem(e, t) {
    var e =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e),
      i = e / t;
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ReputationValue", e, t),
      this.GetSprite(1).SetFillAmount(i);
  }
}
//# sourceMappingURL=ReputationTips.js.map
