"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlySkinChildTabItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class FlySkinChildTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.cNc = 1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
    ];
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  Update(e) {
    this.cNc = e;
    e = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinTabName(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e),
      this.Ovt(),
      this.K8e();
  }
  K8e() {
    var e = this.GetItem(2);
    RedDotController_1.RedDotController.BindRedDot(
      "FlySkinChildTab",
      e,
      void 0,
      this.cNc,
    );
  }
  Ovt() {
    var e = this.GetItem(2);
    RedDotController_1.RedDotController.UnBindGivenUi(
      "FlySkinChildTab",
      e,
      this.cNc,
    );
  }
  SetItemToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleState(e, t);
  }
  AddItemToggleStateChange(e) {
    this.GetExtendToggle(1).OnStateChange.Add(e);
  }
  SetCanItemToggleStateChange(e) {
    this.GetExtendToggle(1).CanExecuteChange.Bind(e);
  }
}
exports.FlySkinChildTabItem = FlySkinChildTabItem;
//# sourceMappingURL=FlySkinChildTabItem.js.map
