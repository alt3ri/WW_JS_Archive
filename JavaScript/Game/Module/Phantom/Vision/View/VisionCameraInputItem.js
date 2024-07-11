"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionCameraInputItem = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../../InputSettings/InputSettings"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
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
      (this.U8i = !1),
      (this.CanPitchInput = !1),
      (this.A8i = void 0),
      (this.OnPlayCameraAnimationStart = () => {
        this.Pause();
      }),
      (this.OnActivateUiCameraAnimationHandle = () => {
        var t;
        (this.U8i = this.P8i()),
          this.U8i &&
            this.A8i &&
            ((t = UE.KuroCollectActorComponent.GetActorWithTag(
              FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
              1,
            ).K2_GetActorLocation()),
            this.A8i.UpdateData(t, 0, 0, 0, 0),
            this.A8i.Activate(),
            this.A8i.ResumeTick());
      }),
      (this.x8i = void 0),
      (this.w8i = (t) => {
        this.U8i && (this.x8i = t.GetLocalPointInPlane());
      }),
      (this.B8i = (t) => {
        var i;
        !this.U8i ||
        1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() ||
        InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
          ? (this.x8i = void 0)
          : ((i = this.x8i),
            (this.x8i = t.GetLocalPointInPlane()),
            i &&
              (0 != (t = this.x8i.X - i.X) && this.A8i.AddYawInput(t),
              0 != (t = this.x8i.Y - i.Y)) &&
              this.CanPitchInput &&
              this.A8i.AddPitchInput(t));
      }),
      (this.b8i = (t) => {
        this.U8i && (this.x8i = void 0);
      }),
      (this.q8i = (t, i) => {
        0 !== i &&
          this.U8i &&
          Info_1.Info.IsInGamepad() &&
          this.CanPitchInput &&
          this.A8i.AddPitchInput(-i);
      }),
      (this.G8i = (t, i) => {
        0 !== i &&
          this.U8i &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddYawInput(i);
      }),
      (this.N8i = (t) => {
        this.U8i &&
          0 !== t.scrollAxisValue &&
          this.A8i.AddZoomInput(-t.scrollAxisValue);
      }),
      (this.O8i = (t, i) => {
        0 !== i &&
          this.U8i &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddZoomInput(i);
      }),
      (this.k8i = (t, i) => {
        0 !== i &&
          this.U8i &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddZoomInput(i);
      }),
      (this.Eqt = (t, i) => {
        this.U8i && 2 === i.TouchType && this.Egt();
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
    var t = this.GetDraggable(0);
    t.OnPointerBeginDragCallBack.Bind(this.w8i),
      t.OnPointerDragCallBack.Bind(this.B8i),
      t.OnPointerEndDragCallBack.Bind(this.b8i),
      t.OnPointerScrollCallBack.Bind(this.N8i),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.q8i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.G8i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.O8i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.k8i,
      ),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
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
    var t = this.GetDraggable(0);
    t.OnPointerBeginDragCallBack.Unbind(),
      t.OnPointerDragCallBack.Unbind(),
      t.OnPointerEndDragCallBack.Unbind(),
      t.OnPointerScrollCallBack.Unbind(),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.q8i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.G8i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.O8i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.k8i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      );
  }
  OnStart() {
    this.F8i();
  }
  OnBeforeShow() {
    this.OnActivateUiCameraAnimationHandle(), this.OnAddEventListener();
  }
  OnBeforeHide() {
    this.A8i?.Deactivate(), this.OnRemoveEventListener(), (this.U8i = !1);
  }
  OnBeforeDestroy() {
    this.V8i();
  }
  Pause() {
    (this.U8i = !1), this.A8i?.PauseTick();
  }
  F8i() {
    var t = UiCameraManager_1.UiCameraManager.Get(),
      t =
        ((this.A8i = t.AddUiCameraComponent(
          UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
          !1,
        )),
        ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(
          "声骸",
        ));
    this.A8i.InitDataByConfig(t);
  }
  V8i() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
      UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
    ),
      (this.A8i = void 0);
  }
  P8i() {
    return !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation();
  }
  Egt() {
    var t;
    1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() &&
      ((t = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      )),
      this.A8i.AddZoomInput(-t));
  }
}
exports.VisionCameraInputItem = VisionCameraInputItem;
//# sourceMappingURL=VisionCameraInputItem.js.map
