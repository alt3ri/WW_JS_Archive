"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupComponentRewardList = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
class PopupComponentRewardList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ItemLayout = void 0),
      (this.d2t = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.ItemLayout = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.d2t,
    );
  }
  Refresh(e) {
    if (0 === e.RewardItemIdList.length || e.IsExplore) this.SetActive(!1);
    else {
      var t = [];
      for (const r of e.RewardItemIdList) {
        var o = [{ IncId: 0, ItemId: r }, 0];
        t.push(o);
      }
      this.ItemLayout.RefreshByData(t);
    }
  }
}
exports.PopupComponentRewardList = PopupComponentRewardList;
//# sourceMappingURL=PopupComponentRewardList.js.map
