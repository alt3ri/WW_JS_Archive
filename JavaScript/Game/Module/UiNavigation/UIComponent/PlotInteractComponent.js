"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotNextPageComponent =
    exports.PlotZoomComponent =
    exports.PlotMoveRightComponent =
    exports.PlotMoveForwardComponent =
      void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  ZOOM_RATE = 30,
  MOVE_RATE = 0.7;
class PlotInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.Nxo = void 0),
      (this.i8a = (e) => {
        var e = e && this.CheckAxisCanInput() && this.t_h(),
          t = this.Nxo?.IsListenerActive() ?? !1;
        this.SetVisibleMode(2, t && e);
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotEnableControlView,
      this.i8a,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotEnableControlView,
      this.i8a,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = e.GetActiveListenerByTag(t)),
      (this.Nxo = e),
      (t = this.Nxo?.IsListenerActive() ?? !1),
      (e =
        ModelManager_1.ModelManager.PlotModel.CanControlView &&
        this.CheckAxisCanInput() &&
        this.t_h()),
      this.SetVisibleMode(2, t && e));
  }
  t_h() {
    return 0 === ModelManager_1.ModelManager.CameraModel.CameraMode;
  }
  CheckAxisCanInput() {
    return !0;
  }
}
class PlotMoveForwardComponent extends PlotInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerPlotForward,
      t * MOVE_RATE,
    );
  }
  CheckAxisCanInput() {
    return !ModelManager_1.ModelManager.InputModel?.IsAxisBlock(
      InputEnums_1.EInputAxis.LookUp,
    );
  }
}
exports.PlotMoveForwardComponent = PlotMoveForwardComponent;
class PlotMoveRightComponent extends PlotInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerPlotRight,
      t * MOVE_RATE,
    );
  }
  CheckAxisCanInput() {
    return !ModelManager_1.ModelManager.InputModel?.IsAxisBlock(
      InputEnums_1.EInputAxis.Turn,
    );
  }
}
exports.PlotMoveRightComponent = PlotMoveRightComponent;
class PlotZoomComponent extends PlotInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerPlotZoom,
      t * ZOOM_RATE,
    );
  }
  CheckAxisCanInput() {
    return !ModelManager_1.ModelManager.InputModel?.IsAxisBlock(
      InputEnums_1.EInputAxis.Zoom,
    );
  }
}
exports.PlotZoomComponent = PlotZoomComponent;
class PlotNextPageComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.Nxo = void 0),
      (this.Y5a = (e) => {
        var t = this.Nxo?.IsListenerActive() ?? !1;
        this.SetVisibleMode(2, t && e);
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.NavigationRefreshPlotNextPage,
      this.Y5a,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.NavigationRefreshPlotNextPage,
      this.Y5a,
    );
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButton(
      e.BindButtonTag,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = e.GetActiveListenerByTag(t)),
      (this.Nxo = e),
      (t = this.Nxo?.IsListenerActive() ?? !1),
      (e = ModelManager_1.ModelManager.PlotModel?.CanClick ?? !1),
      this.SetVisibleMode(2, t && e));
  }
}
exports.PlotNextPageComponent = PlotNextPageComponent;
//# sourceMappingURL=PlotInteractComponent.js.map
