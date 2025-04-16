"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerResetView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ShipTowerResetItem_1 = require("./ShipTowerResetItem");
class ShipTowerResetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.Ca_ = void 0),
      (this.ga_ = void 0),
      (this.pa_ = () => {
        this.OpenParam?.StageData.SureResetStage(), this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.CloseMe.bind(this)],
        [3, this.pa_],
      ]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerResetView", [
        "DataParam",
        this.OpenParam,
      ]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      this.Es_(),
      (this.Ca_ = new ShipTowerResetItem_1.ShipTowerResetItem()),
      await this.Ca_.Init(this.GetItem(0)),
      (this.ga_ = new ShipTowerResetItem_1.ShipTowerResetItem()),
      await this.ga_.Init(this.GetItem(1));
  }
  OnBeforeShow() {
    var e = this.OpenParam?.StageData;
    e &&
      (this.Ca_.UpdateData(e.TeamDataList[0]),
      this.ga_.UpdateData(e.TeamDataList[1]));
  }
}
exports.ShipTowerResetView = ShipTowerResetView;
//# sourceMappingURL=ShipTowerResetView.js.map
