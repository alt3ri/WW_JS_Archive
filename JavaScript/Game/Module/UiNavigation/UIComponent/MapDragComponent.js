"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapDragRightComponent = exports.MapDragForwardComponent = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class MapDragForwardComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    e.GetFocusListener(), this.SetVisibleMode(2, !0);
  }
  OnInputAxis(e, t) {
    0 !== t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapDragMoveForward,
        t,
      );
  }
}
exports.MapDragForwardComponent = MapDragForwardComponent;
class MapDragRightComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    e.GetFocusListener(), this.SetVisibleMode(2, !0);
  }
  OnInputAxis(e, t) {
    0 !== t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapDragMoveRight,
        t,
      );
  }
}
exports.MapDragRightComponent = MapDragRightComponent;
//# sourceMappingURL=MapDragComponent.js.map
