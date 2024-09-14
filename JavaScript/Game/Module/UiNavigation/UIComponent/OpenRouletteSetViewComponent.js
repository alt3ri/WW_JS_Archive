"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenRouletteSetViewComponent = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class OpenRouletteSetViewComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, !0);
  }
  OnPress() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OpenRouletteSetView,
    );
  }
}
exports.OpenRouletteSetViewComponent = OpenRouletteSetViewComponent;
//# sourceMappingURL=OpenRouletteSetViewComponent.js.map
