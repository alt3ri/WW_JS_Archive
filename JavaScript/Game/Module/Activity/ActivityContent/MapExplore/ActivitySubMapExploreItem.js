"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubMapExploreItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class ActivitySubMapExploreItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.ClickCallBack = void 0),
      (this.qsi = void 0),
      (this.GetRewardCallBack = void 0),
      (this.Buc = () => {
        var t;
        this.fGt.IsCanGet
          ? this.rJs()
          : ((t = this.fGt.RewardItemId),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t,
            ));
      }),
      (this.rJs = () => {
        this.fGt.IsComplete ||
          (this.qA_()?.SetToggleStateForce(1),
          this.ScrollViewDelegate?.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          ),
          this.fGt.IsCanGet && this.GetRewardCallBack?.(this.fGt));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.rJs]]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.qsi = new SmallItemGrid_1.SmallItemGrid()),
      this.qsi.Initialize(this.GetItem(1).GetOwner()),
      this.qsi.BindOnExtendToggleClicked(this.Buc),
      this.qsi.BindOnCanExecuteChange(() => !1);
  }
  Refresh(t) {
    this.fGt = t;
    (t = this.fGt.RewardDesc),
      (t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t)),
      this.GetText(3).SetText(t),
      this.qsi.Apply({
        Data: this.fGt,
        Type: 4,
        ItemConfigId: this.fGt.RewardItemId,
        BottomText: this.fGt.RewardItemCount?.toString() ?? "",
        IsReceivedVisible: this.fGt.IsComplete,
        IsReceivableVisible: this.fGt.IsCanGet,
      }),
      this.GetTexture(2).SetUIActive(this.fGt.IsCanGet),
      this.GetItem(4).SetUIActive(this.fGt.IsCanGet),
      (t = this.fGt.IsComplete),
      (t = t ? 2 : 0);
    this.qA_()?.SetToggleStateForce(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ExploreProgress", 69, "", ["", this.fGt]);
  }
  qA_() {
    return this.GetExtendToggle(0);
  }
  OnSelected(t) {
    this.qA_()?.SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.qA_()?.SetToggleStateForce(0);
  }
}
exports.ActivitySubMapExploreItem = ActivitySubMapExploreItem;
//# sourceMappingURL=ActivitySubMapExploreItem.js.map
