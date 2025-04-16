"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRewardSpecialItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  DreamLinkController_1 = require("../../DreamLinkController"),
  DreamLinkRewardSmallGrid_1 = require("./DreamLinkRewardSmallGrid");
class DreamLinkRewardSpecialItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.RewardData = e),
      (this.RewardScrollView = void 0),
      (this.W2e = () => {
        return new DreamLinkRewardSmallGrid_1.DreamLinkRewardSmallGrid();
      }),
      (this.Ucl = () => {
        DreamLinkController_1.DreamLinkController.LimitTimeRewardRequest(
          this.RewardData.Id,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.RewardScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(4),
      this.W2e,
    );
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.Nqe(), this.jqe();
  }
  Nqe() {
    var e = this.RewardData.Current,
      r = this.RewardData.Target;
    this.GetText(2).SetText(e + "/" + r),
      this.GetSprite(3).SetFillAmount(e / r);
  }
  jqe() {
    var e =
      ConfigManager_1.ConfigManager.DreamLinkConfig.GetLimitTimeRewardConfig(
        this.RewardData.Id,
      );
    if (e) {
      var r = [];
      for (const t of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
        e.TargetReward,
      )) {
        var i = {
          RewardId: this.RewardData.Id,
          Item: t,
          Status: this.RewardData.Status,
          ReceiveDelegate: this.Ucl,
        };
        r.push(i);
      }
      this.RewardScrollView.RefreshByData(r);
    }
  }
}
exports.DreamLinkRewardSpecialItem = DreamLinkRewardSpecialItem;
//# sourceMappingURL=DreamLinkRewardSpecialItem.js.map
