"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerRewardButtonItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  LguiUtil_1 = require("../Util/LguiUtil");
class PowerRewardButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.Nwn = () => {
        this.Pe?.RewardCallBack();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.Nwn]]);
  }
  OnStart() {
    this.SetItemIcon(this.GetTexture(3), ItemDefines_1.EItemId.Power);
  }
  Update(e) {
    (this.Pe = e), this.Refresh();
  }
  Refresh() {
    this.Pe &&
      (this.GetText(4)?.SetText(this.Pe.PowerNum.toString()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        this.Pe.RewardTextId,
      ),
      this.RefreshPowerState());
  }
  RefreshPowerState() {
    var e, t;
    this.Pe &&
      ((e = this.Pe.PowerNum),
      (e = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e)),
      (t = this.GetText(4)).SetChangeColor(!e, t.changeColor));
  }
}
exports.PowerRewardButtonItem = PowerRewardButtonItem;
//# sourceMappingURL=PowerRewardButtonItem.js.map
