"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerGetBuffView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
class ShipTowerGetBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.OpenParam = void 0), (this.H3e = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.CloseMe.bind(this)]]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      this.Es_(),
      (this.H3e = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid(),
      ));
  }
  OnBeforeShow() {
    this.H3e?.RefreshByData(this.OpenParam.ItemDataList, () => {
      this.H3e?.IsExpand && this.H3e?.ScrollToLeft(0);
    });
  }
  OnBeforeDestroy() {
    this.OpenParam?.Promise?.SetResult(!0);
  }
}
exports.ShipTowerGetBuffView = ShipTowerGetBuffView;
//# sourceMappingURL=ShipTowerGetBuffView.js.map
