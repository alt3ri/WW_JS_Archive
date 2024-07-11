"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapFocusPlayerComponent =
    exports.MapCheckComponent =
    exports.MapZoomComponent =
    exports.MapMoveRightComponent =
    exports.MapMoveForwardComponent =
      void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class MapInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    let t;
    const n = this.GetBindButtonTag();
    n &&
    (e = e.GetFocusListener()) &&
    ((t = e.GetNavigationGroup()),
    !StringUtils_1.StringUtils.IsEmpty(t.GroupName)) &&
    e.TagArray?.Contains(n)
      ? this.SetVisibleMode(2, !0)
      : this.SetVisibleMode(2, !1);
  }
}
class MapMoveForwardComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    var e = e.GetFocusListener();
    e &&
    ((e = e.GetNavigationGroup()),
    StringUtils_1.StringUtils.IsEmpty(e.GroupName) ||
      e.GroupName !== "GroupCursor")
      ? this.SetVisibleMode(2, !1)
      : this.SetVisibleMode(2, !0);
  }
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerMapForward,
      t,
    );
  }
}
exports.MapMoveForwardComponent = MapMoveForwardComponent;
class MapMoveRightComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    var e = e.GetFocusListener();
    e &&
    ((e = e.GetNavigationGroup()),
    StringUtils_1.StringUtils.IsEmpty(e.GroupName) ||
      e.GroupName !== "GroupCursor")
      ? this.SetVisibleMode(2, !1)
      : this.SetVisibleMode(2, !0);
  }
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerMapRight,
      t,
    );
  }
}
exports.MapMoveRightComponent = MapMoveRightComponent;
class MapZoomComponent extends MapInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerMapZoom,
      e,
      t,
    );
  }
}
exports.MapZoomComponent = MapZoomComponent;
class MapCheckComponent extends MapInteractComponentBase {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButton(
      e.BindButtonTag,
    );
  }
}
exports.MapCheckComponent = MapCheckComponent;
class MapFocusPlayerComponent extends MapInteractComponentBase {
  OnPress(e) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.WorldMapJoystickFocusPlayer,
    );
  }
}
exports.MapFocusPlayerComponent = MapFocusPlayerComponent;
// # sourceMappingURL=MapInteractComponent.js.map
