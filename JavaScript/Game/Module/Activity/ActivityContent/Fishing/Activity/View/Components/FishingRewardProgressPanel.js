"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRewardProgressPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  SmallItemGrid_1 = require("../../../../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout"),
  REWARD_ITEM_WIDTH = 108;
class FishingRewardProgressPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ProgressLayout = void 0),
      (this.ProgressBarWidth = 0),
      (this.OnClickToGet = void 0),
      (this.lx_ = () => {
        var i = new FishingRewardProgressItem();
        return (i.OnClickToGet = this.OnClickToGet), i;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UISprite],
    ];
  }
  OnStart() {
    (this.ProgressLayout = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(1),
      this.lx_,
    )),
      (this.ProgressBarWidth = this.GetSprite(4).GetWidth());
  }
  async RefreshProgressItem(e, i, t) {
    this.GetText(0).SetText(e.toString()),
      this.GetSprite(3).SetChangeColor(0 < e, this.GetSprite(3).changeColor);
    let s = 0,
      r = 0;
    var h,
      a,
      o,
      n = t.length;
    for (let i = 0; i < n; i++)
      t[i].IsFulfilled()
        ? (s += 1 / n)
        : e <= (h = 0 < i ? t[i - 1].Goal : 0) ||
          ((a = t[i].Goal),
          (o = this.ProgressBarWidth / n - REWARD_ITEM_WIDTH),
          (r = (o * ((e - h) / (a - h))) / this.ProgressBarWidth));
    this.GetSprite(4).SetFillAmount(s + r),
      await this.ProgressLayout.RefreshByDataAsync(t);
  }
}
exports.FishingRewardProgressPanel = FishingRewardProgressPanel;
class FishingRewardProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.gOe = void 0),
      (this.qsi = void 0),
      (this.OnClickToGet = void 0),
      (this.hJs = () => {
        this.Pe.IsReceivable()
          ? this.OnClickToGet?.()
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              this.qsi[0].ItemId,
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.gOe = new SmallItemGrid_1.SmallItemGrid()),
      this.gOe.Initialize(this.GetItem(2).GetOwner()),
      this.gOe.BindOnCanExecuteChange(() => !1),
      this.gOe.BindOnExtendToggleClicked(this.hJs);
  }
  Refresh(i, e, t) {
    this.Pe = i;
    var s =
      ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityMilestone(
        i.Id,
      );
    this.GetText(1).SetText(s.ItemNum.toString()),
      this.GetSprite(0).SetChangeColor(
        i.IsFulfilled(),
        this.GetSprite(0).changeColor,
      ),
      (this.qsi =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
          s.DropId,
        )[0]),
      this.cNe();
  }
  cNe() {
    var i = !this.Pe.IsFulfilled(),
      e = this.Pe.IsDone(),
      t = this.Pe.IsReceivable(),
      e = {
        Data: this.Pe,
        Type: 4,
        ItemConfigId: this.qsi[0].ItemId,
        BottomText: this.qsi[1].toString(),
        IsReceivableVisible: t,
        IsReceivedVisible: e,
        IsRedDotVisible: t,
      };
    this.gOe.Apply(e), this.gOe.SetLockBlackVisible(i);
  }
}
//# sourceMappingURL=FishingRewardProgressPanel.js.map
