"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationFunctionPageButton = void 0);
const NavigationButton_1 = require("../NavigationButton");
class NavigationFunctionPageButton extends NavigationButton_1.NavigationButton {
  OnStart() {
    this.PanelHandle?.GetType() === "MainMenu" &&
      this.PanelHandle.AddNavigationListener(this.Listener);
  }
  OnCheckFindOpposite(t) {
    const i = this.Selectable?.GetRootComponent();
    return !!i?.GetRenderCanvas()?.IsUIVisible(i);
  }
}
exports.NavigationFunctionPageButton = NavigationFunctionPageButton;
// # sourceMappingURL=NavigationFunctionPageButton.js.map
