"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerSwitchRightTeamComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiNavigationViewManager_1 = require("../New/UiNavigationViewManager"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class ShipTowerSwitchRightTeamComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    var r = this.oZ_();
    r &&
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.InteractClickByListener(
        r,
      );
  }
  oZ_() {
    var e =
        UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle(),
      r = this.GetBindButtonTag();
    return e.MainPanel?.GetListenerListByTag(r)?.find((e) => {
      return 1 !== e.GetSelectableComponent().GetToggleState();
    });
  }
  OnRefreshSelfHotKeyState(e) {
    var r = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(r) ||
      ((r = ModelManager_1.ModelManager.ShipTowerModel.IsShowLeftTeamPanel),
      this.SetVisibleMode(2, r));
  }
}
exports.ShipTowerSwitchRightTeamComponent = ShipTowerSwitchRightTeamComponent;
//# sourceMappingURL=ShipTowerSwitchRightTeamComponent.js.map
