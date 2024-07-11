"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceExpressionSwitchItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
class AdviceExpressionSwitchItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.aHe = 0),
      (this.hHe = (e) => {
        1 === e && this.SelectedCallBack(this.aHe);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.hHe]]);
  }
  OnStart() {
    super.OnStart(), this.GetExtendToggle(0).SetToggleState(0);
  }
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  OnRefresh(e, t, s) {
    this.UpdateTabIcon(e.Data?.GetIcon());
  }
  OnUpdateTabIcon(e) {}
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  UpdateView(e) {
    this.aHe = e;
    e =
      ConfigManager_1.ConfigManager.ChatConfig.GetExpressionGroupConfig(
        e,
      ).GroupTexturePath;
    this.SetTextureByPath(e, this.GetTexture(1));
  }
}
exports.AdviceExpressionSwitchItem = AdviceExpressionSwitchItem;
//# sourceMappingURL=AdviceExpressionSwitchItem.js.map
