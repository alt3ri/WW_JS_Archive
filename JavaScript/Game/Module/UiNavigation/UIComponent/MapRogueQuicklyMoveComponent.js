"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueQuicklyMoveComponent = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class MapRogueQuicklyMoveComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    ModelManager_1.ModelManager.MapRogueModel.GameInfo?.OnMove();
  }
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, !0);
  }
}
exports.MapRogueQuicklyMoveComponent = MapRogueQuicklyMoveComponent;
//# sourceMappingURL=MapRogueQuicklyMoveComponent.js.map
