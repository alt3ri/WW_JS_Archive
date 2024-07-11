"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleHandBookRootView = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const DynamicTabCamera_1 = require("../DynamicTab/DynamicTabCamera");
const RoleRootView_1 = require("../RoleUi/RoleRootView");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
class RoleHandBookRootView extends RoleRootView_1.RoleRootView {
  constructor() {
    super(...arguments), (this.Oho = ""), (this.kho = !0);
  }
  OnCheckIfNeedScene() {
    return this.kho;
  }
  OnHandleLoadScene() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Role", 8, "角色预览界面场景加载成功");
    const e = DynamicTabCamera_1.DynamicTabCamera.GetUiCameraHandleName(
      "RoleHandBookPreviewView",
    );
    this.RoleRootUiCameraHandleData =
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        e,
        !1,
        !1,
      );
  }
  OnHandleReleaseScene() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.RoleRootUiCameraHandleData,
    );
  }
  OnBeforeCreate() {
    (this.Oho = this.OpenParam),
      (this.kho = this.Oho !== "RoleHandBookSelectionView");
  }
  InitRoleIdList() {
    ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1),
    ).sort((e, o) => e.Id - o.Id);
  }
  UpdateSelectRoleInstance() {}
  OnAfterShow() {
    this.TabViewComponent.SetCurrentTabViewState(!0);
  }
  RebuildTabItem() {
    this.TabDataList =
      ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        "RoleHandBookRootView",
      );
    const e = this.TabDataList.length;
    this.TabComponent.RefreshTabItemByLength(e);
  }
  OnStart() {
    this.InitTabComponent(),
      this.GetButton(1).GetRootComponent().SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      this.kho && this.UpdateSelectRoleInstance(),
      this.TabComponent.SelectToggleByIndex(0, !0),
      this.LoadFloorEffect();
  }
  LoadFloorEffect() {
    this.kho && super.LoadFloorEffect();
  }
  OnBeforeDestroy() {
    this.ClearData();
  }
  OnAfterHide() {
    this.TabViewComponent.SetCurrentTabViewState(!1);
  }
}
exports.RoleHandBookRootView = RoleHandBookRootView;
// # sourceMappingURL=RoleHandBookRootView.js.map
