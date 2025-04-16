"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraInputComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiCameraControlRotationComponent_1 = require("../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent"),
  UiCameraManager_1 = require("../../UiCamera/UiCameraManager"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
class UiCameraInputComponent {
  constructor() {
    (this.Pe = void 0),
      (this.A8i = void 0),
      (this.x8i = void 0),
      (this.C_r = 0),
      (this.CanCameraInput = !0),
      (this.cmo = () => {
        this.TryDeActivate();
      }),
      (this.mmo = (t) => {
        t.GetUiCameraAnimationConfig().bTargetActorAsCenter && this.Activate();
      }),
      (this.w8i = (t) => {
        this.CanCameraInput && (this.x8i = t.GetLocalPointInPlane());
      }),
      (this.B8i = (t) => {
        var i;
        !this.CanCameraInput ||
        1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() ||
        InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
          ? (this.x8i = void 0)
          : ((i = this.x8i),
            (this.x8i = t.GetLocalPointInPlane()),
            i &&
              ((t = this.x8i.X - i.X),
              (i = this.x8i.Y - i.Y),
              0 != t && this.A8i.AddYawInput(t),
              0 != i) &&
              this.A8i.AddPitchInput(i));
      }),
      (this.b8i = (t) => {
        this.CanCameraInput && (this.x8i = void 0);
      }),
      (this.N8i = (t) => {
        this.CanCameraInput &&
          0 !== t.scrollAxisValue &&
          this.A8i.AddZoomInput(-t.scrollAxisValue);
      }),
      (this.q8i = (t) => {
        this.CanCameraInput &&
          0 !== t &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddPitchInput(-t);
      }),
      (this.G8i = (t) => {
        this.CanCameraInput &&
          0 !== t &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddYawInput(t);
      }),
      (this.PUn = (t, i) => {
        this.CanCameraInput &&
          0 !== i &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddZoomInput(i);
      }),
      (this._mo = () => {
        var t;
        this.CanCameraInput &&
          (t =
            UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) &&
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            t.HandleName,
            !0,
            !0,
            "1001",
          );
      }),
      (this.Eqt = (t, i) => {
        this.CanCameraInput && 2 === i.TouchType && this.Egt();
      });
  }
  InitData(t) {
    0 === this.C_r || 5 === this.C_r
      ? ((this.C_r = 1), (this.Pe = t), this.OnInitData())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCommon",
          43,
          "[UiCameraInputComponent] InitData调用异常",
          ["ComponentState", this.C_r],
        );
  }
  UpdateData(t) {
    2 === this.C_r || 4 === this.C_r
      ? (this.Pe = t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCommon",
          75,
          "[UiCameraInputComponent] UpdateData调用异常",
          ["ComponentState", this.C_r],
        );
  }
  Start() {
    1 === this.C_r || 5 === this.C_r
      ? ((this.C_r = 2), this.OnStart())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCommon",
          43,
          "[UiCameraInputComponent] Start调用异常",
          ["ComponentState", this.C_r],
        );
  }
  Activate() {
    2 === this.C_r || 4 === this.C_r
      ? UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCommon",
            43,
            "[UiCameraInputComponent] 在相机动画期间不应该激活相机输入组件",
          )
        : ((this.C_r = 3), this.OnActivate())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCommon",
          43,
          "[UiCameraInputComponent] Activate调用异常",
          ["ComponentState", this.C_r],
        );
  }
  DeActivate() {
    3 === this.C_r
      ? ((this.C_r = 4), this.OnDeActivate())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCommon",
          43,
          "[UiCameraInputComponent] DeActivate调用异常",
          ["ComponentState", this.C_r],
        );
  }
  End() {
    3 === this.C_r && this.DeActivate(),
      2 === this.C_r || 4 === this.C_r
        ? ((this.C_r = 5), this.OnEnd())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCommon",
            43,
            "[UiCameraInputComponent] End调用异常",
            ["ComponentState", this.C_r],
          );
  }
  OnInitData() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiCommon",
        43,
        "[UiCameraInputComponent] 生命周期执行 OnInitData",
      );
    var t = UiCameraManager_1.UiCameraManager.Get();
    this.A8i = t.AddUiCameraComponent(
      UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
      !1,
    );
  }
  OnStart() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiCommon",
        43,
        "[UiCameraInputComponent] 生命周期执行 OnStart",
      ),
      this.AddCameraEventListener();
  }
  AddCameraEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlayCameraAnimationStart,
      this.cmo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      );
  }
  OnActivate() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiCommon",
        43,
        "[UiCameraInputComponent] 生命周期执行 OnActivate",
      ),
      this.ActiveCameraControlRotationComponent(),
      this.A8i?.Activate(),
      this.AddInputEventListener();
  }
  AddInputEventListener() {
    var t = this.Pe.DragComponent;
    t.OnPointerBeginDragCallBack.Bind(this.w8i),
      t.OnPointerDragCallBack.Bind(this.B8i),
      t.OnPointerEndDragCallBack.Bind(this.b8i),
      t.OnPointerScrollCallBack.Bind(this.N8i),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.q8i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.G8i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.PUn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this._mo,
      ),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      );
  }
  OnDeActivate() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiCommon",
        43,
        "[UiCameraInputComponent] 生命周期执行 OnDeActivate",
      ),
      this.A8i?.Deactivate(),
      (this.x8i = void 0),
      this.RemoveInputEventListener();
  }
  RemoveInputEventListener() {
    var t = this.Pe.DragComponent;
    t.OnPointerBeginDragCallBack.Unbind(),
      t.OnPointerDragCallBack.Unbind(),
      t.OnPointerEndDragCallBack.Unbind(),
      t.OnPointerScrollCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.q8i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.G8i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.PUn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this._mo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      );
  }
  RemoveCameraEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayCameraAnimationStart,
      this.cmo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      );
  }
  OnEnd() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiCommon",
        43,
        "[UiCameraInputComponent] 生命周期执行 OnEnd",
      ),
      this.RemoveCameraEventListener();
  }
  GetComponentState() {
    return this.C_r;
  }
  TryActivate() {
    return (
      !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() &&
      (this.Activate(), !0)
    );
  }
  TryDeActivate() {
    return 3 === this.C_r && (this.DeActivate(), !0);
  }
  ActiveCameraControlRotationComponent() {
    this.A8i.InitDataByConfig(this.Pe.CameraSettingConfig),
      this.A8i.SetNeedFloorReflection(!0);
    var t = this.Pe.CameraOffsetConfig;
    t
      ? this.A8i.UpdateData(
          this.Pe.SourceLocation,
          t.镜头浮动最大高度,
          t.镜头浮动最低高度,
          t.镜头浮动最长臂长,
          t.镜头浮动最短臂长,
        )
      : this.A8i.UpdateData(this.Pe.SourceLocation, 0, 0, 0, 0);
  }
  Egt() {
    var t;
    this.CanCameraInput &&
      1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() &&
      ((t = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      )),
      this.A8i.AddZoomInput(-t));
  }
}
exports.UiCameraInputComponent = UiCameraInputComponent;
//# sourceMappingURL=UiCameraInputComponent.js.map
