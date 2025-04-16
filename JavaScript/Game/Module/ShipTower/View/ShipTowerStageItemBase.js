"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerStageItemEndless =
    exports.ShipTowerStageItemRefresh =
    exports.ShipTowerStageItemOneTime =
    exports.ShipTowerStageItemBase =
      void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ShipTowerStageItem_1 = require("./ShipTowerStageItem");
class ShipTowerStageItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.StageItem = void 0),
      (this.ItemData = void 0),
      (this.OnClickBtnEnter = () => {
        this.ItemData.OpenViewStageDesc();
      });
  }
  async Init(e, t) {
    (this.ItemData = t), await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.OnClickBtnEnter]]);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    (this.StageItem = new ShipTowerStageItem_1.ShipTowerStageItem()),
      await this.StageItem.Init(e, this.ItemData);
  }
  UpdateData() {
    this.StageItem.UpdateData();
  }
  SetClickEnable(e) {
    this.GetButton(1)?.SetSelfInteractive(e);
  }
}
class ShipTowerStageItemOneTime extends (exports.ShipTowerStageItemBase =
  ShipTowerStageItemBase) {}
exports.ShipTowerStageItemOneTime = ShipTowerStageItemOneTime;
class ShipTowerStageItemRefresh extends ShipTowerStageItemBase {}
exports.ShipTowerStageItemRefresh = ShipTowerStageItemRefresh;
class ShipTowerStageItemEndless extends ShipTowerStageItemBase {}
exports.ShipTowerStageItemEndless = ShipTowerStageItemEndless;
//# sourceMappingURL=ShipTowerStageItemBase.js.map
