"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapFocusPlayerComponent =
    exports.MapCheckComponent =
    exports.MapZoomComponent =
    exports.MapMoveRightComponent =
    exports.MapMoveForwardComponent =
      void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class MapInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    var t,
      n = this.GetBindButtonTag();
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
  OnInit() {
    var e = this.GetAxisName();
    ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation.InitAxisLock(
      e,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var e = e.GetFocusListener();
    e &&
    ((e = e.GetNavigationGroup()),
    StringUtils_1.StringUtils.IsEmpty(e.GroupName) ||
      "GroupCursor" !== e.GroupName)
      ? this.SetVisibleMode(2, !1)
      : this.SetVisibleMode(2, !0);
  }
  OnInputAxis(e, t) {
    var n =
      ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation;
    n.InputAxis(e, t),
      n.IsInValid ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.NavigationTriggerMapForward,
          t,
        );
  }
}
exports.MapMoveForwardComponent = MapMoveForwardComponent;
class MapMoveRightComponent extends HotKeyComponent_1.HotKeyComponent {
  OnInit() {
    var e = this.GetAxisName();
    ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation.InitAxisLock(
      e,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var e = e.GetFocusListener();
    e &&
    ((e = e.GetNavigationGroup()),
    StringUtils_1.StringUtils.IsEmpty(e.GroupName) ||
      "GroupCursor" !== e.GroupName)
      ? this.SetVisibleMode(2, !1)
      : this.SetVisibleMode(2, !0);
  }
  OnInputAxis(e, t) {
    var n =
      ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation;
    n.InputAxis(e, t),
      n.IsInValid ||
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
      EventDefine_1.EEventName.WorldMapShowTrackList,
    );
  }
}
exports.MapFocusPlayerComponent = MapFocusPlayerComponent;
//# sourceMappingURL=MapInteractComponent.js.map
