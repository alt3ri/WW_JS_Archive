"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraDebugTool = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../../GlobalData"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiCameraControlRotationComponent_1 = require("./UiCameraComponent/UiCameraControlRotationComponent"),
  UiCameraManager_1 = require("./UiCameraManager");
class UiCameraDebugTool {
  constructor() {
    (this.e__ = void 0),
      (this.t__ = !1),
      (this.i__ = !1),
      (this.r__ = UE.NewMap(UE.BuiltinString, UE.BuiltinString)),
      (this.o__ = () => {
        UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()?.Refresh(),
          UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle(
            !1,
            !1,
          );
      });
  }
  Init() {
    this.e__ = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
      "/Game/Aki/Data/UiCameraAnimation/DT_UiCameraSetting.DT_UiCameraSetting",
      UE.CompositeDataTable,
    );
  }
  GetDtSyncEnabled() {
    return this.t__;
  }
  StartDtSync() {
    if (!this.t__) {
      var a = this.e__?.ParentTables;
      if (a) {
        var t = (0, puerts_1.toManualReleaseDelegate)(this.o__);
        for (let e = 0; e < a.Num(); e++) {
          var r = a.Get(e);
          UE.KuroDataTableFunctionLibrary.AddOnDataTableChangedDelegate(
            r,
            GlobalData_1.GlobalData.World,
            t,
          );
        }
        this.t__ = !0;
      }
    }
  }
  EndDtSync() {
    if (this.t__) {
      var a = this.e__?.ParentTables;
      if (a) {
        for (let e = 0; e < a.Num(); e++) {
          var t = a.Get(e);
          UE.KuroDataTableFunctionLibrary.RemoveOnDataTableChangedDelegate(
            t,
            GlobalData_1.GlobalData.World,
          );
        }
        (0, puerts_1.toManualReleaseDelegate)(this.o__), (this.t__ = !1);
      }
    }
  }
  UpdateDebugCameraProps() {
    var e =
      UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData();
    this.r__.Set("CurrentHandleName", e?.GetHandleName() ?? ""),
      this.r__.Set("DtSync", this.GetDtSyncEnabled() ? "true" : "false"),
      this.r__.Set(
        "ArmLengthSync",
        this.GetArmLengthSyncEnabled() ? "true" : "false",
      );
  }
  GetDebugCameraProps() {
    return this.r__;
  }
  GetArmLengthSyncEnabled() {
    return this.i__;
  }
  StartArmLengthSync() {
    this.i__ = !0;
  }
  EndArmLengthSync() {
    this.i__ = !1;
  }
  ArmLengthSync(e) {
    UiCameraManager_1.UiCameraManager.Get()
      .GetUiCameraComponent(
        UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
      )
      .SetArmLength(e);
  }
}
exports.UiCameraDebugTool = UiCameraDebugTool;
//# sourceMappingURL=UiCameraDebugTool.js.map
