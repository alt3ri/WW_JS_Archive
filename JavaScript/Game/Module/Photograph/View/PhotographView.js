"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiTimeDilation_1 = require("../../../Ui/Base/UiTimeDilation"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiCameraManager_1 = require("../../UiCamera/UiCameraManager"),
  PhotographController_1 = require("../PhotographController"),
  PhotographDefine_1 = require("../PhotographDefine"),
  PhotographEntityPanel_1 = require("./PhotographEntityPanel"),
  CHANGE_FOV_INTERVAL = 100;
class PhotographView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.vQi = void 0),
      (this.MQi = 0),
      (this.EQi = 0),
      (this.SQi = void 0),
      (this.yQi = 0),
      (this.IQi = void 0),
      (this.PYe = new UE.Vector2D(0, 0)),
      (this.TQi = new UE.Vector2D(0, 0)),
      (this.A$e = new UE.Vector2D(1, -1)),
      (this.LQi = new UE.Vector2D(0, 0)),
      (this.DQi = new UE.Vector2D(0, 0)),
      (this.RQi = new UE.Vector2D(0, 0)),
      (this.bOi = (t, e) => {
        0 !== e && this.UQi(!0);
      }),
      (this.N8i = (t) => {
        0 !== t.scrollAxisValue && (this.UQi(!0), this.AQi(t.scrollAxisValue));
      }),
      (this.O8i = (t, e) => {
        0 !== e && Info_1.Info.IsInGamepad() && this.AQi(-e);
      }),
      (this.k8i = (t, e) => {
        0 !== e && Info_1.Info.IsInGamepad() && this.AQi(-e);
      }),
      (this.PQi = (t, e) => {
        1 === e &&
          PhotographController_1.PhotographController.ScreenShot({
            ScreenShot: !0,
            IsHiddenBattleView: !1,
            HandBookPhotoData: void 0,
            GachaData: void 0,
            FragmentMemory: void 0,
          });
      }),
      (this.Eqt = (t, e) => {
        this.UQi(!0);
        (e = e.TouchType), (t = Number(t));
        2 === e && this.Egt(t);
      }),
      (this.xQi = (t) => {
        this.wQi(!t);
      }),
      (this.Igt = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.UpValue = -1)
          : (ModelManager_1.ModelManager.PhotographModel.UpValue = 1),
          this.UQi(!0);
      }),
      (this.Tgt = () => {
        (ModelManager_1.ModelManager.PhotographModel.UpValue = 0), this.UQi(!0);
      }),
      (this.Sgt = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.UpValue = 1)
          : (ModelManager_1.ModelManager.PhotographModel.UpValue = -1),
          this.UQi(!0);
      }),
      (this.ygt = () => {
        (ModelManager_1.ModelManager.PhotographModel.UpValue = 0), this.UQi(!0);
      }),
      (this.Lgt = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.RightValue = 1)
          : (ModelManager_1.ModelManager.PhotographModel.RightValue = -1),
          this.UQi(!0);
      }),
      (this.Dgt = () => {
        (ModelManager_1.ModelManager.PhotographModel.RightValue = 0),
          this.UQi(!0);
      }),
      (this.Rgt = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.RightValue = -1)
          : (ModelManager_1.ModelManager.PhotographModel.RightValue = 1),
          this.UQi(!0);
      }),
      (this.Ugt = () => {
        (ModelManager_1.ModelManager.PhotographModel.RightValue = 0),
          this.UQi(!0);
      }),
      (this.BQi = (t, e = 0) => {
        var i;
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? PhotographController_1.PhotographController.MinFov &&
            PhotographController_1.PhotographController.MaxFov &&
            ((i = MathUtils_1.MathUtils.RangeClamp(
              t,
              PhotographController_1.PhotographController.MinFov.Value,
              PhotographController_1.PhotographController.MaxFov.Value,
              PhotographController_1.PhotographController.MaxFov.Value,
              PhotographController_1.PhotographController.MinFov.Value,
            )),
            PhotographController_1.PhotographController.SetFov(i))
          : ((i = MathUtils_1.MathUtils.RangeClamp(
              t,
              PhotographDefine_1.MIN_FOV,
              PhotographDefine_1.MAX_FOV,
              PhotographDefine_1.MAX_FOV,
              PhotographDefine_1.MIN_FOV,
            )),
            PhotographController_1.PhotographController.SetFov(i)),
          this.UQi(!0);
      }),
      (this.bQi = (t) => {
        if (
          (this.UQi(!0),
          !(1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount()))
        ) {
          t = t.pointerPosition;
          if (this.SQi) {
            var e =
              ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
            if (!e) return;
            var i = (t.Y - this.SQi.Y) * this.yQi,
              o = (this.SQi.X - t.X) * this.yQi;
            e.AddCameraArmPitchInput(i),
              e.AddPhotographerYawInput(-o),
              e.AddCameraArmYawInput(-o);
          }
          this.SQi = t;
        }
      }),
      (this.Pgt = () => {
        this.UQi(!0);
      }),
      (this.xgt = () => {
        this.UQi(!0), (this.SQi = void 0);
      }),
      (this.qQi = () => {
        this.UQi(!0),
          this.GQi(),
          (this.vQi = TimerSystem_1.TimerSystem.Forever(
            this.NQi,
            CHANGE_FOV_INTERVAL,
          ));
      }),
      (this.OQi = () => {
        this.UQi(!0), this.GQi();
      }),
      (this.kQi = () => {
        this.UQi(!0),
          this.GQi(),
          (this.vQi = TimerSystem_1.TimerSystem.Forever(
            this.FQi,
            CHANGE_FOV_INTERVAL,
          ));
      }),
      (this.VQi = () => {
        this.UQi(!0), this.GQi();
      }),
      (this.NQi = () => {
        this.UQi(!0), this.AQi(1);
      }),
      (this.FQi = () => {
        this.UQi(!0), this.AQi(-1);
      }),
      (this.HQi = () => {
        this.UQi(!0), this.AQi(1);
      }),
      (this.jQi = () => {
        this.UQi(!0), this.AQi(-1);
      }),
      (this.WQi = () => {
        this.UQi(!0), UiManager_1.UiManager.OpenView("PhotographSetupView", 1);
      }),
      (this.Ixi = () => {
        this.UQi(!0),
          PhotographController_1.PhotographController.ResetCamera(),
          this.GetSlider(10).SetValue(PhotographDefine_1.DEFAULT_FOV, !1);
      }),
      (this.KQi = () => {
        this.UQi(!0),
          UiManager_1.UiManager.IsViewOpen("PhotographSetupView") &&
            UiManager_1.UiManager.CloseView("PhotographSetupView"),
          Net_1.Net.Send(20793, Protocol_1.Aki.Protocol._Zn.create()),
          PhotographController_1.PhotographController.ScreenShot({
            ScreenShot: !0,
            IsHiddenBattleView: !1,
            HandBookPhotoData: void 0,
            GachaData: void 0,
            FragmentMemory: void 0,
          });
      }),
      (this.QQi = () => {
        PhotographController_1.PhotographController.ClosePhotograph();
      }),
      (this.XQi = () => {
        this.UiViewSequence.PlaySequence("ShowChanging"),
          this.UiViewSequence.PlaySequence("Loop"),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_camera_task");
      }),
      (this.$Qi = (t, e) => {
        t = this.IQi.GetInfoItemByDesc(t);
        t &&
          (this.YQi(t, e), !e) &&
          PhotographController_1.PhotographController.IsLastChecked &&
          (this.UiViewSequence.StopSequenceByKey("Loop"),
          this.UiViewSequence.SequencePlayReverseByKey("ShowChanging", !1));
      }),
      (this.xQe = () => {
        var t = Global_1.Global.CharacterController,
          e = (0, puerts_1.$ref)(void 0),
          i = (0, puerts_1.$ref)(void 0),
          t = (t.GetViewportSize(e, i), (0, puerts_1.$unref)(e)),
          e = (0, puerts_1.$unref)(i),
          i = (this.PYe.Set(t, e), UiLayer_1.UiLayer.UiRootItem);
        i &&
          (this.DQi.Set(i.GetWidth(), i.GetHeight()),
          this.TQi.Set(0.5 * -i.GetWidth(), 0.5 * -i.GetHeight()));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UISprite],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UISliderComponent],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIDraggableComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.HQi],
        [5, this.jQi],
        [7, this.Ixi],
        [8, this.KQi],
        [9, this.QQi],
        [14, this.WQi],
      ]);
  }
  OnStart() {
    GlobalData_1.GlobalData.BpEventManager.OnEnterPhotograph.Broadcast();
    var t =
      ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    t?.Valid &&
      t.GetComponent(102)?.SetLodBias(PhotographDefine_1.MAX_LOD_BIAS);
  }
  OnAfterDestroy() {
    GlobalData_1.GlobalData.BpEventManager.OnExitPhotograph.Broadcast();
    var t =
      ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    t?.Valid &&
      t.GetComponent(102)?.SetLodBias(PhotographDefine_1.DEFAULT_LOD_BIAS);
  }
  OnAddEventListener() {
    var t = this.GetButton(0),
      e = this.GetButton(1),
      i = this.GetButton(2),
      o = this.GetButton(3),
      r = this.GetSlider(10),
      h = this.GetButton(4),
      n = this.GetButton(5),
      s = this.GetDraggable(13);
    t.OnPointDownCallBack.Bind(this.Igt),
      t.OnPointUpCallBack.Bind(this.Tgt),
      t.OnPointCancelCallBack.Bind(this.Tgt),
      e.OnPointDownCallBack.Bind(this.Sgt),
      e.OnPointUpCallBack.Bind(this.ygt),
      e.OnPointCancelCallBack.Bind(this.ygt),
      i.OnPointDownCallBack.Bind(this.Lgt),
      i.OnPointUpCallBack.Bind(this.Dgt),
      i.OnPointCancelCallBack.Bind(this.Dgt),
      o.OnPointDownCallBack.Bind(this.Rgt),
      o.OnPointUpCallBack.Bind(this.Ugt),
      o.OnPointCancelCallBack.Bind(this.Ugt),
      h.OnPointDownCallBack.Bind(this.qQi),
      h.OnPointUpCallBack.Bind(this.OQi),
      n.OnPointDownCallBack.Bind(this.kQi),
      n.OnPointUpCallBack.Bind(this.VQi),
      r.OnValueChangeCb.Bind(this.BQi),
      s.OnPointerDragCallBack.Bind(this.bQi),
      s.OnPointerBeginDragCallBack.Bind(this.Pgt),
      s.OnPointerEndDragCallBack.Bind(this.xgt),
      s.OnPointerDownCallBack.Bind(this.Pgt),
      s.OnPointerUpCallBack.Bind(this.xgt),
      s.OnPointerScrollCallBack.Bind(this.N8i),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveForward,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.拍照,
        this.PQi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.O8i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.k8i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
        this.xQi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEntityCameraSearchGreat,
        this.XQi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
        this.$Qi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetImageQuality,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetResolution,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetDisplayMode,
        this.xQe,
      );
  }
  OnRemoveEventListener() {
    var t = this.GetButton(0),
      e = this.GetButton(1),
      i = this.GetButton(2),
      o = this.GetButton(3),
      r = this.GetSlider(10),
      h = this.GetButton(4),
      n = this.GetButton(5),
      s = this.GetDraggable(13);
    t.OnPointDownCallBack.Unbind(),
      t.OnPointUpCallBack.Unbind(),
      e.OnPointDownCallBack.Unbind(),
      e.OnPointUpCallBack.Unbind(),
      i.OnPointDownCallBack.Unbind(),
      i.OnPointUpCallBack.Unbind(),
      o.OnPointDownCallBack.Unbind(),
      o.OnPointUpCallBack.Unbind(),
      h.OnPointDownCallBack.Unbind(),
      h.OnPointUpCallBack.Unbind(),
      n.OnPointDownCallBack.Unbind(),
      n.OnPointUpCallBack.Unbind(),
      r.OnValueChangeCb.Unbind(),
      s.OnPointerDragCallBack.Unbind(),
      s.OnPointerBeginDragCallBack.Unbind(),
      s.OnPointerEndDragCallBack.Unbind(),
      s.OnPointerDownCallBack.Unbind(),
      s.OnPointerUpCallBack.Unbind(),
      s.OnPointerScrollCallBack.Unbind(),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveForward,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.bOi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.拍照,
        this.PQi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.O8i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.k8i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
        this.xQi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEntityCameraSearchGreat,
        this.XQi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
        this.$Qi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetImageQuality,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetResolution,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetDisplayMode,
        this.xQe,
      );
  }
  OnAfterTick(t) {
    super.OnAfterTick(t),
      1 === PhotographController_1.PhotographController.CameraCaptureType &&
        this.ehi();
  }
  OnBeforeCreate() {
    PhotographController_1.PhotographController.InitPhotographRelativeContent();
  }
  OnBeforeShow() {
    var t,
      e,
      i,
      o =
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    o &&
      (this.UQi(!0),
      (t = Global_1.Global.BaseCharacter) &&
        PhotographController_1.PhotographController.GetFightCameraActor() &&
        1 === PhotographController_1.PhotographController.CameraCaptureType &&
        ((t = new UE.Vector(
          t?.K2_GetActorLocation().X,
          t?.K2_GetActorLocation().Y,
          PhotographController_1.PhotographController.GetFightCameraActor().K2_GetActorLocation().Z,
        )),
        (e =
          PhotographController_1.PhotographController.GetFightCameraActor().K2_GetActorRotation()),
        (i =
          PhotographController_1.PhotographController.GetFightCameraActor().GetActorScale3D()),
        o.SetSpringArmLength(0),
        o.SetCameraInitializeTransform(new UE.Transform(e, t, i))),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      ),
      AudioSystem_1.AudioSystem.SetState("game_state", "normal"),
      UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
        ViewId: this.GetViewId(),
        TimeDilation: 1,
        DebugName: "PhotographView",
        Reason: "Photograph",
      }),
      this.JQi());
  }
  OnAfterHide() {
    InputDistributeController_1.InputDistributeController.UnBindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.Eqt,
    );
  }
  JQi() {
    var t;
    1 === PhotographController_1.PhotographController.CameraCaptureType &&
      (this.SetEntityCameraVisibility(!0),
      (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      ModelManager_1.ModelManager.PhotographModel.SetEntityEnable(t, !1));
  }
  Egt(t) {
    if (
      ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()
    ) {
      var e = TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount();
      if (!(e <= 1)) {
        let t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(
          TouchFingerDefine_1.EFingerIndex.One,
        );
        (t?.IsTouchEmpty() ||
          t?.IsTouchComponentContainTag(PhotographDefine_1.ignoreTouchTag)) &&
          ((t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(
            TouchFingerDefine_1.EFingerIndex.Two,
          ))?.IsTouchEmpty() ||
            t?.IsTouchComponentContainTag(PhotographDefine_1.ignoreTouchTag)) &&
          ((e =
            TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
              TouchFingerDefine_1.EFingerIndex.One,
              TouchFingerDefine_1.EFingerIndex.Two,
            )),
          (e = MathUtils_1.MathUtils.RangeClamp(
            e,
            PhotographDefine_1.MIN_TOUCH_MOVE_DIFFERENCE,
            PhotographDefine_1.MAX_TOUCH_MOVE_DIFFERENCE,
            -1,
            1,
          )),
          this.AQi(e));
      }
    }
  }
  OnTick(t) {
    super.OnTick(t),
      Info_1.Info.IsInTouch() &&
        ((this.EQi += t), this.EQi >= this.MQi) &&
        this.UQi(!1);
  }
  UQi(t) {
    t && (this.EQi = 0);
    var e = this.GetItem(11);
    1 === PhotographController_1.PhotographController.CameraCaptureType
      ? (e.SetUIActive(!0),
        this.GetButton(14).RootUIComp.SetUIActive(!1),
        this.GetButton(7).RootUIComp.SetUIActive(!1))
      : 2 === PhotographController_1.PhotographController.CameraCaptureType
        ? (e.SetUIActive(!0), this.GetButton(14).RootUIComp.SetUIActive(!1))
        : e.IsUIActiveSelf() !== t && e.SetUIActive(t);
  }
  wQi(t) {
    this.GetItem(12).SetUIActive(t),
      this.GetButton(9).RootUIComp.SetUIActive(t);
  }
  GQi() {
    TimerSystem_1.TimerSystem.Has(this.vQi) &&
      TimerSystem_1.TimerSystem.Remove(this.vQi);
  }
  async OnBeforeStartAsync() {
    (this.IQi = new PhotographEntityPanel_1.PhotographEntityPanel()),
      await this.IQi.CreateByActorAsync(this.GetItem(15).GetOwner()),
      this.zQi(),
      this.IQi.SetActive(!1),
      (this.MQi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "PhotoDeltaHideDelay",
      )),
      (this.yQi =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ControlCameraRate",
        ) / CommonDefine_1.PERCENTAGE_FACTOR),
      this.ZQi(),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !1),
      this.xQe();
  }
  OnBeforeDestroy() {
    this.GQi(),
      this.IQi.Destroy(),
      (this.IQi = void 0),
      this.LQi.Set(0, 0),
      UiCameraManager_1.UiCameraManager.Clear(),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !0);
  }
  ZQi() {
    var t,
      e,
      i,
      o = this.GetSlider(10);
    0 === PhotographController_1.PhotographController.CameraCaptureType
      ? (o.SetMinValue(PhotographDefine_1.MIN_FOV, !1, !1),
        o.SetMaxValue(PhotographDefine_1.MAX_FOV, !1, !1),
        o.SetValue(PhotographDefine_1.DEFAULT_FOV, !1))
      : ((t = parseInt(
          PhotographController_1.PhotographController.MaxFov.Value,
        )),
        (e = parseInt(
          PhotographController_1.PhotographController.MinFov.Value,
        )),
        o.SetMinValue(e, !1, !1),
        o.SetMaxValue(t, !1, !1),
        o.SetValue((i = (t - e) / 2 + e), !0),
        this.BQi(i),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Photo",
            46,
            "实体拍照RefreshFov：",
            ["MaxValue:", o.GetMaxValue()],
            ["MinValue:", o.GetMinValue()],
            ["NowValue:", o.GetValue()],
            ["max:", t],
            ["min", e],
          ));
  }
  AQi(t) {
    var e = this.GetSlider(10),
      t = e.GetValue() + t;
    e.SetValue(t, !0);
  }
  SetEntityCameraVisibility(t) {
    this.GetItem(15).SetUIActive(t),
      PhotographController_1.PhotographController.CheckIfInMission()
        ? this.GetItem(17).SetUIActive(!0)
        : this.GetItem(17).SetUIActive(!1);
  }
  zQi() {
    var t = 1 === PhotographController_1.PhotographController.CameraCaptureType;
    this.IQi.SetActive(t), t && this.eXi();
  }
  eXi() {
    var t = PhotographController_1.PhotographController.Missions?.length;
    if (!t || t <= 0) this.IQi.SetInfoPanelVisible(!1);
    else {
      this.IQi.SetInfoPanelVisible(!0);
      var e = [];
      for (const o of PhotographController_1.PhotographController.Missions) {
        var i = { Text: o.Description, IsFinish: o.IsFinished };
        e.push(i);
      }
      this.IQi.Refresh(e);
    }
  }
  YQi(t, e) {
    t.RefreshFinishState(e),
      !e &&
        this.UiViewSequence?.HasSequenceNameInPlaying("Loop") &&
        this.UiViewSequence.StopSequenceByKey("Loop", !1, !0);
  }
  tXi(t) {
    return t
      .op_Multiply(this.DQi)
      .op_Division(this.PYe)
      .op_Addition(this.TQi)
      .op_Multiply(this.A$e);
  }
  ehi() {
    var r = [],
      t =
        PhotographController_1.PhotographController.GetNowBehaviorNode()
          ?.TakeTargetArray;
    if (t && !(t.length <= 0))
      for (const P of t) {
        var h = PhotographController_1.PhotographController.GetAllCheckPoints(
          P.EntityId,
        );
        if (h && !(h.length <= 0)) {
          let e = "RequiredPointsCenter";
          var n = PhotographController_1.PhotographController.GetPointType(
            P.EntityId,
          );
          switch ((e = n ? n.Type : e)) {
            case "EntityZero":
              var s =
                PhotographController_1.PhotographController.GetCheckEntityPosition(
                  P.EntityId,
                );
              if (!s) continue;
              s = PhotographController_1.PhotographController.GetPosition2D(s);
              if (
                !s ||
                !PhotographController_1.PhotographController.GetEntityFinishSituation(
                  P.EntityId,
                )
              ) {
                r.push({
                  Id: P.EntityId.toString(),
                  Vector: this.RQi,
                  NotShow: !0,
                });
                continue;
              }
              s = this.tXi(s);
              r.push({ Id: P.EntityId.toString(), Vector: s, NotShow: !1 });
              continue;
            case "CustomPoints":
              var a = n.Points,
                _ =
                  PhotographController_1.PhotographController.GetCheckEntityPosition(
                    P.EntityId,
                  );
              if (!_) continue;
              for (let t = 0; t < a.length; t++) {
                var l = (a[t].X ?? 0) + (_.X ?? 0),
                  p = (a[t].Y ?? 0) + (_.Y ?? 0),
                  g = (a[t].Z ?? 0) + (_.Z ?? 0),
                  l = Vector_1.Vector.Create(l, p, g),
                  p =
                    PhotographController_1.PhotographController.GetPosition2D(
                      l,
                    );
                p &&
                PhotographController_1.PhotographController.GetEntityFinishSituation(
                  P.EntityId,
                )
                  ? ((g = this.tXi(p)),
                    r.push({
                      Id: P.EntityId.toString() + t.toString(),
                      Vector: g,
                      NotShow: !1,
                    }))
                  : r.push({
                      Id: P.EntityId.toString() + t.toString(),
                      Vector: this.RQi,
                      NotShow: !0,
                    });
              }
              continue;
          }
          var u = h.length;
          let i = !0,
            o = !1;
          this.LQi.Set(0, 0);
          for (let t = 0; t < h.length; t++) {
            var C = h[t],
              D =
                (PhotographController_1.PhotographController.GetEntityFinishSituation(
                  P.EntityId,
                ) || (o = !0),
                PhotographController_1.PhotographController.GetPosition2D(C));
            D
              ? ((D = this.tXi(D)),
                "RequiredPoints" === e
                  ? (r.push({
                      Id: P.EntityId.toString() + t.toString(),
                      Vector: D,
                      NotShow:
                        !PhotographController_1.PhotographController.CheckInUi(
                          C,
                        ) ||
                        !PhotographController_1.PhotographController.CheckLineTrace(
                          C.ToUeVector(),
                        ),
                    }),
                    (i = !1))
                  : (this.LQi = this.LQi.op_Addition(D)))
              : "RequiredPoints" === e
                ? r.push({
                    Id: P.EntityId.toString() + t.toString(),
                    Vector: this.RQi,
                    NotShow: !0,
                  })
                : r.push({
                    Id: P.EntityId.toString(),
                    Vector: this.RQi,
                    NotShow: !0,
                  });
          }
          i &&
            ((this.LQi.X = this.LQi.X / u),
            (this.LQi.Y = this.LQi.Y / u),
            (u = { Id: P.EntityId.toString(), Vector: this.LQi, NotShow: o }),
            r.push(u));
        }
      }
    this.IQi.UpdateIcons(r);
  }
}
exports.PhotographView = PhotographView;
//# sourceMappingURL=PhotographView.js.map
