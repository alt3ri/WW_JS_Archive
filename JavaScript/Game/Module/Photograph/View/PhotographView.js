"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
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
      (this.SQi = void 0),
      (this.yQi = 0),
      (this.IQi = void 0),
      (this.PYe = new UE.Vector2D(0, 0)),
      (this.TQi = new UE.Vector2D(0, 0)),
      (this.A$e = new UE.Vector2D(1, -1)),
      (this.LQi = new UE.Vector2D(0, 0)),
      (this.DQi = new UE.Vector2D(0, 0)),
      (this.RQi = new UE.Vector2D(0, 0)),
      (this.cSl = !1),
      (this.mSl = !0),
      (this.$2_ = void 0),
      (this.N8i = (t) => {
        0 !== t.scrollAxisValue && this.AQi(t.scrollAxisValue);
      }),
      (this.O8i = (t, e) => {
        0 !== e && Info_1.Info.IsInGamepad() && this.AQi(-e);
      }),
      (this.k8i = (t, e) => {
        0 !== e && Info_1.Info.IsInGamepad() && this.AQi(-e);
      }),
      (this.Eqt = (t, e) => {
        (e = e.TouchType), (t = Number(t));
        2 === e && this.Egt(t);
      }),
      (this.xQi = (t) => {
        this.wQi(!t);
      }),
      (this.NEl = () => {
        this.dSl(!0);
      }),
      (this.Igt = () => {
        PhotographController_1.PhotographController.CheckIfInEntityCamera()
          ? (ModelManager_1.ModelManager.PhotographModel.UpValue = -1)
          : (ModelManager_1.ModelManager.PhotographModel.UpValue = 1);
      }),
      (this.Tgt = () => {
        ModelManager_1.ModelManager.PhotographModel.UpValue = 0;
      }),
      (this.Sgt = () => {
        PhotographController_1.PhotographController.CheckIfInEntityCamera()
          ? (ModelManager_1.ModelManager.PhotographModel.UpValue = 1)
          : (ModelManager_1.ModelManager.PhotographModel.UpValue = -1);
      }),
      (this.ygt = () => {
        ModelManager_1.ModelManager.PhotographModel.UpValue = 0;
      }),
      (this.Lgt = () => {
        PhotographController_1.PhotographController.CheckIfInEntityCamera()
          ? (ModelManager_1.ModelManager.PhotographModel.RightValue = 1)
          : (ModelManager_1.ModelManager.PhotographModel.RightValue = -1);
      }),
      (this.Dgt = () => {
        ModelManager_1.ModelManager.PhotographModel.RightValue = 0;
      }),
      (this.Rgt = () => {
        PhotographController_1.PhotographController.CheckIfInEntityCamera()
          ? (ModelManager_1.ModelManager.PhotographModel.RightValue = -1)
          : (ModelManager_1.ModelManager.PhotographModel.RightValue = 1);
      }),
      (this.Ugt = () => {
        ModelManager_1.ModelManager.PhotographModel.RightValue = 0;
      }),
      (this.BQi = (t, e = 0) => {
        var i;
        PhotographController_1.PhotographController.CheckIfInEntityCamera()
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
            PhotographController_1.PhotographController.SetFov(i));
      }),
      (this.bQi = (t) => {
        if (
          ((this.cSl = !0),
          !(1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount()))
        ) {
          t = t.pointerPosition;
          if (this.SQi) {
            var e =
              ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
            if (!e) return;
            var i = (t.Y - this.SQi.Y) * this.yQi,
              o = (this.SQi.X - t.X) * this.yQi;
            e.AddCameraArmPitchInput(-i), e.AddCameraArmYawInput(-o);
          }
          this.SQi = t;
        }
      }),
      (this.Pgt = () => {
        this.cSl = !1;
      }),
      (this.xgt = () => {
        (this.SQi = void 0), this.cSl || this.dSl(!0);
      }),
      (this.qQi = () => {
        this.GQi(),
          (this.vQi = TimerSystem_1.TimerSystem.Forever(
            this.NQi,
            CHANGE_FOV_INTERVAL,
          ));
      }),
      (this.OQi = () => {
        this.GQi();
      }),
      (this.kQi = () => {
        this.GQi(),
          (this.vQi = TimerSystem_1.TimerSystem.Forever(
            this.FQi,
            CHANGE_FOV_INTERVAL,
          ));
      }),
      (this.VQi = () => {
        this.GQi();
      }),
      (this.NQi = () => {
        this.AQi(1);
      }),
      (this.FQi = () => {
        this.AQi(-1);
      }),
      (this.HQi = () => {
        this.AQi(1);
      }),
      (this.jQi = () => {
        this.AQi(-1);
      }),
      (this.WQi = () => {
        UiManager_1.UiManager.OpenView("PhotographSetupView", 1);
      }),
      (this.Ixi = () => {
        PhotographController_1.PhotographController.ResetCamera(),
          this.GetSlider(10).SetValue(PhotographDefine_1.DEFAULT_FOV, !1);
      }),
      (this.KQi = () => {
        UiManager_1.UiManager.IsViewOpen("PhotographSetupView") &&
          UiManager_1.UiManager.CloseView("PhotographSetupView"),
          Net_1.Net.Send(27442, Protocol_1.Aki.Protocol._Zn.create()),
          PhotographController_1.PhotographController.ScreenShot({
            ScreenShot: !0,
            PrepareFullScreenShot: !0,
            IsHiddenBattleView: !1,
            HandBookPhotoData: void 0,
            GachaData: void 0,
            FragmentMemory: void 0,
            RoleSkinData: void 0,
          });
      }),
      (this.QQi = () => {
        PhotographController_1.PhotographController.ClosePhotograph();
      }),
      (this.CSl = () => {
        this.dSl(!1);
      }),
      (this.XQi = () => {
        this.UiViewSequence.PlaySequence("ShowChanging"),
          this.UiViewSequence.PlaySequence("Loop"),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_camera_task");
      }),
      (this.$Qi = (t, e, i) => {
        t = this.IQi.GetInfoItemByDesc(t);
        t && this.YQi(t, e);
      }),
      (this.wa1 = () => {
        PhotographController_1.PhotographController.IsLastChecked &&
          (this.UiViewSequence.StopSequenceByKey("Loop"),
          this.UiViewSequence.SequencePlayReverseByKey("ShowChanging", !1));
      }),
      (this.Thl = (t) => {
        var e = this.IQi.GetInfoItemByDesc(t);
        e && this.Lhl(e, t);
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
      [18, UE.UIButtonComponent],
      [19, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.HQi],
        [5, this.jQi],
        [7, this.Ixi],
        [8, this.KQi],
        [9, this.QQi],
        [14, this.WQi],
        [18, this.CSl],
      ]);
  }
  OnStart() {
    GlobalData_1.GlobalData.BpEventManager.OnEnterPhotograph.Broadcast();
    var t =
      ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    t?.Valid &&
      t.GetComponent(112)?.SetLodBias(PhotographDefine_1.MAX_LOD_BIAS);
  }
  OnAfterDestroy() {
    GlobalData_1.GlobalData.BpEventManager.OnExitPhotograph.Broadcast();
    var t =
      ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    t?.Valid &&
      t.GetComponent(112)?.SetLodBias(PhotographDefine_1.DEFAULT_LOD_BIAS);
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
      h.OnPointCancelCallBack.Bind(this.OQi),
      n.OnPointDownCallBack.Bind(this.kQi),
      n.OnPointUpCallBack.Bind(this.VQi),
      n.OnPointCancelCallBack.Bind(this.VQi),
      r.OnValueChangeCb.Bind(this.BQi),
      s.OnPointerDragCallBack.Bind(this.bQi),
      s.OnPointerBeginDragCallBack.Bind(this.Pgt),
      s.OnPointerEndDragCallBack.Bind(this.xgt),
      s.OnPointerDownCallBack.Bind(this.Pgt),
      s.OnPointerUpCallBack.Bind(this.xgt),
      s.OnPointerScrollCallBack.Bind(this.N8i),
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
        EventDefine_1.EEventName.OnEntityCameraOptionalSituationChanged,
        this.Thl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEntityCameraMissTarget,
        this.wa1,
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhotographSetVisible,
        this.NEl,
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
        EventDefine_1.EEventName.OnEntityCameraOptionalSituationChanged,
        this.Thl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEntityCameraMissTarget,
        this.wa1,
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
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhotographSetVisible,
        this.NEl,
      );
  }
  OnAfterTick(t) {
    super.OnAfterTick(t),
      !PhotographController_1.PhotographController.CheckIfInEntityCamera() ||
        !(t =
          PhotographController_1.PhotographController.GetNowBehaviorNodes()) ||
        t.length <= 0 ||
        t.forEach((t) => {
          this.ehi(t);
        });
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
      (this.gSl(),
      (t = Global_1.Global.BaseCharacter) &&
        PhotographController_1.PhotographController.GetFightCameraActor() &&
        PhotographController_1.PhotographController.CheckIfInEntityCamera() &&
        ((t = new UE.VectorDouble(
          t?.D_K2_GetActorLocation().X,
          t?.D_K2_GetActorLocation().Y,
          PhotographController_1.PhotographController.GetFightCameraActor().D_K2_GetActorLocation().Z,
        )),
        (e =
          PhotographController_1.PhotographController.GetFightCameraActor().K2_GetActorRotation()),
        (i =
          PhotographController_1.PhotographController.GetFightCameraActor().D_GetActorScale3D()),
        o.SetSpringArmLength(0),
        o.SetCameraInitializeTransform(new UE.TransformDouble(e, t, i))),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      ),
      UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag(this.Info.Name),
      this.JQi(),
      RedDotController_1.RedDotController.BindRedDot(
        "FunctionPhotograph",
        this.GetItem(19),
      ));
  }
  OnAfterHide() {
    InputDistributeController_1.InputDistributeController.UnBindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.Eqt,
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "FunctionPhotograph",
        this.GetItem(19),
      ),
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag(
        this.Info.Name,
      );
  }
  JQi() {
    var t;
    PhotographController_1.PhotographController.CheckIfInEntityCamera() &&
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
  dSl(t) {
    var e;
    this.mSl !== t &&
      (this.GetItem(11).SetUIActive(t),
      (e = UiManager_1.UiManager.GetViewByName("PhotographSetupView")) &&
        e.IsShowOrShowing &&
        e.SetPanelVisible(t),
      (this.mSl = t),
      (ModelManager_1.ModelManager.LoadingModel.IsShowUidView = this.mSl));
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
      (this.yQi =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ControlCameraRate",
        ) / CommonDefine_1.PERCENTAGE_FACTOR),
      this.ZQi(),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !1),
      this.xQe();
    var t =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "PhotographDAPath",
        ),
      t =
        (0 !== t?.length &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.KuroSequenceConsoleCommandDataAsset,
            (t) => {
              UE.KuroSequencePerformanceManager.OpenKuroPerformanceModeInPhotographModel(
                t,
              );
            },
          ),
        GlobalData_1.GlobalData.World),
      e = CommonParamById_1.configCommonParamById.GetStringConfig(
        "PhotographPPVLevelPath",
      ),
      i = (0, puerts_1.$ref)(!1);
    if (
      ((this.$2_ = UE.LevelStreamingDynamic.LoadLevelInstance(
        t,
        e,
        Vector_1.Vector.ZeroVector,
        Rotator_1.Rotator.ZeroRotator,
        i,
      )),
      (0, puerts_1.$unref)(i))
    ) {
      const o = new CustomPromise_1.CustomPromise();
      this.$2_.OnLevelShown.Add(() => {
        ModelManager_1.ModelManager.PhotographModel.InitFilterPostProcessVolume(),
          PhotographController_1.PhotographController.InitPostProcessVolBlendWeight(),
          o.SetResult(void 0);
      }),
        await o.Promise;
    }
  }
  OnBeforeDestroy() {
    this.GQi(),
      this.IQi.Destroy(),
      (this.IQi = void 0),
      this.LQi.Set(0, 0),
      UiCameraManager_1.UiCameraManager.Clear(),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !0),
      (ModelManager_1.ModelManager.LoadingModel.IsShowUidView = !0),
      UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode(),
      this.$2_ &&
        (this.$2_.OnLevelShown.Clear(), this.$2_.SetShouldBeLoaded(!1));
  }
  ZQi() {
    var t,
      e,
      i,
      o = this.GetSlider(10);
    PhotographController_1.PhotographController.CheckIfInNormalCamera()
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
            45,
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
    var t = PhotographController_1.PhotographController.CheckIfInEntityCamera();
    this.IQi.SetActive(t), t && this.eXi();
  }
  eXi() {
    var t = PhotographController_1.PhotographController.Missions?.length;
    if (!t || t <= 0) this.IQi.SetInfoPanelVisible(!1);
    else {
      this.IQi.SetInfoPanelVisible(!0);
      var e = [];
      for (const o of PhotographController_1.PhotographController.Missions) {
        var i = {
          Text: o.Description,
          IsFinish: o.IsFinished,
          IsOptionFinished: o.IsOptionalFinished ?? !1,
        };
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
  Lhl(t, e) {
    t.SetTextLine(e);
  }
  tXi(t) {
    return t
      .op_Multiply(this.DQi)
      .op_Division(this.PYe)
      .op_Addition(this.TQi)
      .op_Multiply(this.A$e);
  }
  ehi(t) {
    var r = [];
    if (t) {
      var h = t.TakeTargetArray;
      if (!h || h.length <= 0) this.IQi.UpdateIcons(r, void 0);
      else {
        for (const m of h) {
          var n = PhotographController_1.PhotographController.GetAllCheckPoints(
            m.EntityId,
          );
          if (n && !(n.length <= 0)) {
            let e = "RequiredPointsCenter";
            var s = PhotographController_1.PhotographController.GetPointType(
              m.EntityId,
            );
            switch ((e = s ? s.Type : e)) {
              case "EntityZero":
                var a =
                  PhotographController_1.PhotographController.GetCheckEntityPosition(
                    m.EntityId,
                  );
                if (!a) continue;
                a =
                  PhotographController_1.PhotographController.GetPosition2D(a);
                if (
                  !a ||
                  !PhotographController_1.PhotographController.GetEntityFinishSituation(
                    m.EntityId,
                  )
                ) {
                  r.push({
                    Id: m.EntityId.toString(),
                    Vector: this.RQi,
                    NotShow: !0,
                    IsOptional: m.IsOptionalTarget ?? !1,
                    IsOptionalFinished:
                      PhotographController_1.PhotographController.GetPhotoMissionById(
                        m.EntityId,
                      )?.IsOptionalFinished ?? !1,
                  });
                  continue;
                }
                a = this.tXi(a);
                r.push({
                  Id: m.EntityId.toString(),
                  Vector: a,
                  NotShow: !1,
                  IsOptional: m.IsOptionalTarget ?? !1,
                  IsOptionalFinished:
                    PhotographController_1.PhotographController.GetPhotoMissionById(
                      m.EntityId,
                    )?.IsOptionalFinished ?? !1,
                });
                continue;
              case "CustomPoints":
                var _ = s.Points,
                  l =
                    PhotographController_1.PhotographController.GetCheckEntityPosition(
                      m.EntityId,
                    );
                if (!l) continue;
                for (let t = 0; t < _.length; t++) {
                  var p = (_[t].X ?? 0) + (l.X ?? 0),
                    g = (_[t].Y ?? 0) + (l.Y ?? 0),
                    u = (_[t].Z ?? 0) + (l.Z ?? 0),
                    p = Vector_1.Vector.Create(p, g, u),
                    g =
                      PhotographController_1.PhotographController.GetPosition2D(
                        p,
                      );
                  g &&
                  PhotographController_1.PhotographController.GetEntityFinishSituation(
                    m.EntityId,
                  )
                    ? ((u = this.tXi(g)),
                      r.push({
                        Id: m.EntityId.toString() + t.toString(),
                        Vector: u,
                        NotShow: !1,
                        IsOptional: m.IsOptionalTarget ?? !1,
                        IsOptionalFinished:
                          PhotographController_1.PhotographController.GetPhotoMissionById(
                            m.EntityId,
                          )?.IsOptionalFinished ?? !1,
                      }))
                    : r.push({
                        Id: m.EntityId.toString() + t.toString(),
                        Vector: this.RQi,
                        NotShow: !0,
                        IsOptional: m.IsOptionalTarget ?? !1,
                        IsOptionalFinished:
                          PhotographController_1.PhotographController.GetPhotoMissionById(
                            m.EntityId,
                          )?.IsOptionalFinished ?? !1,
                      });
                }
                continue;
            }
            var C = n.length;
            let i = !0,
              o = !1;
            this.LQi.Set(0, 0);
            for (let t = 0; t < n.length; t++) {
              var v = n[t],
                P =
                  (PhotographController_1.PhotographController.GetEntityFinishSituation(
                    m.EntityId,
                  ) || (o = !0),
                  PhotographController_1.PhotographController.GetPosition2D(v));
              P
                ? ((P = this.tXi(P)),
                  "RequiredPoints" === e
                    ? (r.push({
                        Id: m.EntityId.toString() + t.toString(),
                        Vector: P,
                        NotShow:
                          !PhotographController_1.PhotographController.CheckInUi(
                            v,
                          ) ||
                          !PhotographController_1.PhotographController.CheckLineTrace(
                            v.ToUeVectorOld(),
                            h,
                          ),
                        IsOptional: m.IsOptionalTarget ?? !1,
                        IsOptionalFinished:
                          PhotographController_1.PhotographController.GetPhotoMissionById(
                            m.EntityId,
                          )?.IsOptionalFinished ?? !1,
                      }),
                      (i = !1))
                    : (this.LQi = this.LQi.op_Addition(P)))
                : "RequiredPoints" === e
                  ? r.push({
                      Id: m.EntityId.toString() + t.toString(),
                      Vector: this.RQi,
                      NotShow: !0,
                      IsOptional: m.IsOptionalTarget ?? !1,
                      IsOptionalFinished:
                        PhotographController_1.PhotographController.GetPhotoMissionById(
                          m.EntityId,
                        )?.IsOptionalFinished ?? !1,
                    })
                  : r.push({
                      Id: m.EntityId.toString(),
                      Vector: this.RQi,
                      NotShow: !0,
                      IsOptional: m.IsOptionalTarget ?? !1,
                      IsOptionalFinished:
                        PhotographController_1.PhotographController.GetPhotoMissionById(
                          m.EntityId,
                        )?.IsOptionalFinished ?? !1,
                    });
            }
            i &&
              ((this.LQi.X = this.LQi.X / C),
              (this.LQi.Y = this.LQi.Y / C),
              (C = {
                Id: m.EntityId.toString(),
                Vector: new UE.Vector2D(this.LQi.X, this.LQi.Y),
                NotShow: o,
                IsOptional: m.IsOptionalTarget ?? !1,
                IsOptionalFinished:
                  PhotographController_1.PhotographController.GetPhotoMissionById(
                    m.EntityId,
                  )?.IsOptionalFinished ?? !1,
              }),
              r.push(C));
          }
        }
        this.IQi.UpdateIcons(r, t);
      }
    } else this.IQi.UpdateIcons(r, void 0);
  }
  gSl() {
    1 === PhotographController_1.PhotographController.CameraCaptureType
      ? this.pSl()
      : this.fSl();
  }
  pSl() {
    this.GetItem(11).SetUIActive(!0),
      this.GetButton(14).RootUIComp.SetUIActive(!1),
      this.GetButton(18).RootUIComp.SetUIActive(!1),
      this.GetButton(7).RootUIComp.SetUIActive(!1);
  }
  fSl() {
    this.GetItem(11).SetUIActive(!0);
  }
}
exports.PhotographView = PhotographView;
//# sourceMappingURL=PhotographView.js.map
