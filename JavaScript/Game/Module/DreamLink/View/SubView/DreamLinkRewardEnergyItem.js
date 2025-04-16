"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRewardEnergyItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivitySmallItemGrid_1 = require("../../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  DreamLinkController_1 = require("../../DreamLinkController");
class DreamLinkRewardEnergyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.RewardScrollView = void 0),
      (this.W2e = () => {
        return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
      }),
      (this.qOe = () => {
        DreamLinkController_1.DreamLinkController.EnergyRewardRequest(
          this.Data.Id,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [0, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.qOe]]);
  }
  OnStart() {
    (this.RewardScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(6),
      this.W2e,
    )),
      this.GetButton(0).RootUIComp.SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1);
  }
  Refresh(e, r, i) {
    this.Data = e;
    var t,
      s,
      n = ConfigManager_1.ConfigManager.DreamLinkConfig.GetEnergyRewardConfig(
        e.Id,
      );
    n &&
      ((t = 1 === e.Status),
      (s = 2 === e.Status),
      (e = 0 === e.Status),
      this.jqe(n.DropId, s),
      this.GetText(3).SetText(n.NeedEnergy.toString()),
      this.GetText(7).SetUIActive(t),
      this.GetItem(2).SetUIActive(s),
      this.GetButton(1).RootUIComp.SetUIActive(e));
  }
  jqe(e, r) {
    var i = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
      e,
    )) {
      var t = { Item: s, HasClaimed: r };
      i.push(t);
    }
    this.RewardScrollView.RefreshByData(i);
  }
}
exports.DreamLinkRewardEnergyItem = DreamLinkRewardEnergyItem;
//# sourceMappingURL=DreamLinkRewardEnergyItem.js.map
