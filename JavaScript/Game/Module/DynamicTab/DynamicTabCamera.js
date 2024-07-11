"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicTabCamera = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class DynamicTabCamera {
  static GetCameraHandleData() {
    return this.NFt;
  }
  static PlayTabUiCamera(a, e = 0) {}
  static GetUiCameraHandleName(a) {
    var a = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTab(a);
    var e = a.ParentViewName;
    var e = this.OFt.get(e);
    return e ? e(a.UiCameraSettingsName) : a.UiCameraSettingsName;
  }
}
((exports.DynamicTabCamera = DynamicTabCamera).kFt = new Map()),
  (DynamicTabCamera.FFt = (a) => {
    return (
      a +
      "_" +
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance().GetRoleConfig()
        .RoleBody
    );
  }),
  (DynamicTabCamera.OFt = new Map([
    ["RoleRootView", DynamicTabCamera.FFt],
    ["RoleHandBookRootView", DynamicTabCamera.FFt],
  ])),
  (DynamicTabCamera.OnPlayCameraAnimationFinished = (a) => {
    (a = a.ToHandleData.HandleName), (a = DynamicTabCamera.kFt.get(a));
    a && a();
  });
// # sourceMappingURL=DynamicTabCamera.js.map
