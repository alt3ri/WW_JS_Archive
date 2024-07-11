"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicTabCamera = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class DynamicTabCamera {
  static GetCameraHandleData() {
    return this.O3t;
  }
  static PlayTabUiCamera(a, e = 0) {}
  static GetUiCameraHandleName(a) {
    var a = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTab(a),
      e = a.ParentViewName,
      e = this.k3t.get(e);
    return e ? e(a.UiCameraSettingsName) : a.UiCameraSettingsName;
  }
}
((exports.DynamicTabCamera = DynamicTabCamera).F3t = new Map()),
  (DynamicTabCamera.V3t = (a) => {
    return (
      a +
      "_" +
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance().GetRoleConfig()
        .RoleBody
    );
  }),
  (DynamicTabCamera.k3t = new Map([
    ["RoleRootView", DynamicTabCamera.V3t],
    ["RoleHandBookRootView", DynamicTabCamera.V3t],
  ])),
  (DynamicTabCamera.OnPlayCameraAnimationFinished = (a) => {
    (a = a.ToHandleData.HandleName), (a = DynamicTabCamera.F3t.get(a));
    a && a();
  });
//# sourceMappingURL=DynamicTabCamera.js.map
