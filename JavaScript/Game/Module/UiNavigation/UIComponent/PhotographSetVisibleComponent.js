"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographSetVisibleComponent = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class PhotographSetVisibleComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPhotographSetVisible,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, !0);
  }
}
exports.PhotographSetVisibleComponent = PhotographSetVisibleComponent;
//# sourceMappingURL=PhotographSetVisibleComponent.js.map
