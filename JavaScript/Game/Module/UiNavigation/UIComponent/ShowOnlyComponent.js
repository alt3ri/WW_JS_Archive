"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowOnlyComponent = void 0);
const HotKeyComponent_1 = require("./HotKeyComponent");
class ShowOnlyComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, !0);
  }
  OnIsOccupancyFightInput() {
    return !1;
  }
}
exports.ShowOnlyComponent = ShowOnlyComponent;
//# sourceMappingURL=ShowOnlyComponent.js.map
