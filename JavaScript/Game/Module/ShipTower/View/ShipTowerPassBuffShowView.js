"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerPassBuffShowView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ShipTowerPassBuffShowItem_1 = require("./ShipTowerPassBuffShowItem");
class ShipTowerPassBuffShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.OpenParam = void 0), (this.RA_ = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.RA_ = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        () => new ShipTowerPassBuffShowItem_1.ShipTowerPassBuffShowItem(),
      ));
  }
  OnBeforeShow() {
    var e = this.OpenParam?.StageData.GetPassUnlockBuffList() ?? [];
    this.RA_?.RefreshByData(e);
  }
}
exports.ShipTowerPassBuffShowView = ShipTowerPassBuffShowView;
//# sourceMappingURL=ShipTowerPassBuffShowView.js.map
