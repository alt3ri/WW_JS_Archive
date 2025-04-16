"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssRewardItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class DangoAbyssRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$Tt = void 0),
      (this.s4e = void 0),
      (this.W2e = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.nqe = () => {
        this.$Tt?.ClickFunction?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIScrollViewWithScrollbarComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.nqe]]);
  }
  OnStart() {
    this.s4e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(7),
      this.W2e,
    );
  }
  Refresh(e, t, i) {
    (this.$Tt = e).NameTextArgs &&
      (this.GetText(6).SetText(e.NameTextArgs[0] + "/" + e.NameTextArgs[1]),
      this.GetText(5).SetText(e.NameText ?? "")),
      this.GetButton(2).RootUIComp.SetUIActive(1 === e.RewardState),
      this.GetItem(3)?.SetUIActive(0 === e.RewardState),
      this.GetItem(4)?.SetUIActive(2 === e.RewardState),
      this.GetItem(1)?.SetUIActive(e.RewardButtonRedDot ?? !1),
      this.s4e?.RefreshByData(e.RewardList ?? []);
    var r = 2 !== e.RewardState ? "SP_ItemBgNor" : "SP_ItemBgFinish",
      r =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(
          r,
        ).Path;
    this.SetSpriteByPath(r, this.GetSprite(0), !1),
      this.GetItem(9)?.SetUIActive(2 === e.RewardState);
  }
}
exports.DangoAbyssRewardItem = DangoAbyssRewardItem;
//# sourceMappingURL=DangoAbyssRewardItem.js.map
