"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionCameraInputItem = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../../InputSettings/InputSettings"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerDefine_1 = require("../../../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../../../Ui/TouchFinger/TouchFingerManager"),
  UiCameraControlRotationComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent"),
  UiCameraManager_1 = require("../../../UiCamera/UiCameraManager"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
class VisionCameraInputItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.A6i = !1),
      (this.CanPitchInput = !1),
      (this.P6i = void 0),
      (this.OnPlayCameraAnimationStart = () => {
        this.Pause();
      }),
      (this.OnActivateUiCameraAnimationHandle = () => {
        var e;
        (this.A6i = this.x6i()),
          this.A6i &&
            this.P6i &&
            ((e = UE.KuroCollectActorComponent.GetActorWithTag(
              FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
              1,
            ).K2_GetActorLocation()),
            this.P6i.UpdateData(e, 0, 0, 0, 0),
            this.P6i.Activate(),
            this.P6i.ResumeTick());
      }),
      (this.w6i = void 0),
      (this.B6i = (e) => {
        this.A6i && (this.w6i = e.GetLocalPointInPlane());
      }),
      (this.b6i = (e) => {
        var t;
        !this.A6i ||
        1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() ||
        InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
          ? (this.w6i = void 0)
          : ((t = this.w6i),
            (this.w6i = e.GetLocalPointInPlane()),
            t &&
              (0 != (e = this.w6i.X - t.X) && this.P6i.AddYawInput(e),
              0 != (e = this.w6i.Y - t.Y)) &&
              this.CanPitchInput &&
              this.P6i.AddPitchInput(e));
      }),
      (this.q6i = (e) => {
        this.A6i && (this.w6i = void 0);
      }),
      (this.G6i = (e, t) => {
        0 !== t &&
          this.A6i &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.CanPitchInput &&
          this.P6i.AddPitchInput(-t);
      }),
      (this.N6i = (e, t) => {
        0 !== t &&
          this.A6i &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.P6i.AddYawInput(t);
      }),
      (this.O6i = (e) => {
        this.A6i &&
          0 !== e.scrollAxisValue &&
          this.P6i.AddZoomInput(-e.scrollAxisValue);
      }),
      (this.k6i = (e, t) => {
        0 !== t &&
          this.A6i &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.P6i.AddZoomInput(t);
      }),
      (this.F6i = (e, t) => {
        0 !== t &&
          this.A6i &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.P6i.AddZoomInput(t);
      }),
      (this.pbt = (e, t) => {
        this.A6i && 2 === t.TouchType && this.lCt();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlayCameraAnimationStart,
      this.OnPlayCameraAnimationStart,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.OnActivateUiCameraAnimationHandle,
      );
    var e = this.GetDraggable(0);
    e.OnPointerBeginDragCallBack.Bind(this.B6i),
      e.OnPointerDragCallBack.Bind(this.b6i),
      e.OnPointerEndDragCallBack.Bind(this.q6i),
      e.OnPointerScrollCallBack.Bind(this.O6i),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.G6i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.N6i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.k6i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.F6i,
      ),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.pbt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayCameraAnimationStart,
      this.OnPlayCameraAnimationStart,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.OnActivateUiCameraAnimationHandle,
      );
    var e = this.GetDraggable(0);
    e.OnPointerBeginDragCallBack.Unbind(),
      e.OnPointerDragCallBack.Unbind(),
      e.OnPointerEndDragCallBack.Unbind(),
      e.OnPointerScrollCallBack.Unbind(),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.G6i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.N6i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.k6i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.F6i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.pbt,
      );
  }
  OnStart() {
    this.V6i();
  }
  OnBeforeShow() {
    this.OnActivateUiCameraAnimationHandle(), this.OnAddEventListener();
  }
  OnBeforeHide() {
    this.P6i?.Deactivate(), this.OnRemoveEventListener(), (this.A6i = !1);
  }
  OnBeforeDestroy() {
    this.H6i();
  }
  Pause() {
    (this.A6i = !1), this.P6i?.PauseTick();
  }
  V6i() {
    var e = UiCameraManager_1.UiCameraManager.Get(),
      e =
        ((this.P6i = e.AddUiCameraComponent(
          UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
          !1,
        )),
        ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(
          "声骸",
        ));
    this.P6i.InitDataByConfig(e);
  }
  H6i() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
      UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
    ),
      (this.P6i = void 0);
  }
  x6i() {
    return !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation();
  }
  lCt() {
    var e;
    1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() &&
      ((e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      )),
      this.P6i.AddZoomInput(-e));
  }
}
exports.VisionCameraInputItem = VisionCameraInputItem;
//# sourceMappingURL=VisionCameraInputItem.js.map
