"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryTipPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class DarkCoastDeliveryTipPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.OHa = () => {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.Config.JumpId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.OHa]]);
  }
  RefreshUi(i) {
    (this.Pe = i),
      this.SetTextureShowUntilLoaded(i.Config.TipIcon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Config.TipName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Config.TipDesc),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(6),
        i.Config.UnlockCondition,
      ),
      this.GetText(3).SetText("X" + i.Config.RewardCount);
    i = i.GetDarkCoastDeliveryGuardState();
    this.GetItem(5).SetUIActive(0 === i),
      this.GetButton(4).RootUIComp.SetUIActive(0 !== i),
      this.GetItem(7).SetUIActive(3 === i),
      this.GetItem(8).SetUIActive(4 === i);
  }
}
exports.DarkCoastDeliveryTipPanel = DarkCoastDeliveryTipPanel;
//# sourceMappingURL=DarkCoastDeliveryTipPanel.js.map
