"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
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
      (this.SKi = void 0),
      (this.EKi = 0),
      (this.yKi = 0),
      (this.IKi = void 0),
      (this.TKi = 0),
      (this.LKi = void 0),
      (this.v$e = new UE.Vector2D(0, 0)),
      (this.DKi = new UE.Vector2D(0, 0)),
      (this.pXe = new UE.Vector2D(1, -1)),
      (this.RKi = new UE.Vector2D(0, 0)),
      (this.UKi = new UE.Vector2D(0, 0)),
      (this.AKi = new UE.Vector2D(0, 0)),
      (this.bNi = (t, e) => {
        0 !== e && this.PKi(!0);
      }),
      (this.O6i = (t) => {
        0 !== t.scrollAxisValue && (this.PKi(!0), this.xKi(t.scrollAxisValue));
      }),
      (this.k6i = (t, e) => {
        0 !== e &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.xKi(-e);
      }),
      (this.F6i = (t, e) => {
        0 !== e &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.xKi(-e);
      }),
      (this.wKi = (t, e) => {
        1 === e &&
          PhotographController_1.PhotographController.ScreenShot({
            ScreenShot: !0,
            IsHiddenBattleView: !1,
            HandBookPhotoData: void 0,
            GachaData: void 0,
            FragmentMemory: void 0,
          });
      }),
      (this.pbt = (t, e) => {
        this.PKi(!0);
        (e = e.TouchType), (t = Number(t));
        2 === e && this.lCt(t);
      }),
      (this.BKi = (t) => {
        this.bKi(!t);
      }),
      (this.cCt = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.UpValue = -1)
          : (ModelManager_1.ModelManager.PhotographModel.UpValue = 1),
          this.PKi(!0);
      }),
      (this.mCt = () => {
        (ModelManager_1.ModelManager.PhotographModel.UpValue = 0), this.PKi(!0);
      }),
      (this._Ct = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.UpValue = 1)
          : (ModelManager_1.ModelManager.PhotographModel.UpValue = -1),
          this.PKi(!0);
      }),
      (this.uCt = () => {
        (ModelManager_1.ModelManager.PhotographModel.UpValue = 0), this.PKi(!0);
      }),
      (this.dCt = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.RightValue = 1)
          : (ModelManager_1.ModelManager.PhotographModel.RightValue = -1),
          this.PKi(!0);
      }),
      (this.CCt = () => {
        (ModelManager_1.ModelManager.PhotographModel.RightValue = 0),
          this.PKi(!0);
      }),
      (this.gCt = () => {
        1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (ModelManager_1.ModelManager.PhotographModel.RightValue = -1)
          : (ModelManager_1.ModelManager.PhotographModel.RightValue = 1),
          this.PKi(!0);
      }),
      (this.fCt = () => {
        (ModelManager_1.ModelManager.PhotographModel.RightValue = 0),
          this.PKi(!0);
      }),
      (this.qKi = (t, e = 0) => {
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
          this.PKi(!0);
      }),
      (this.GKi = (t) => {
        if (
          (this.PKi(!0),
          !(1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount()))
        ) {
          t = t.pointerPosition;
          if (this.IKi) {
            var e =
              ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
            if (!e) return;
            var i = (t.Y - this.IKi.Y) * this.TKi,
              o = (this.IKi.X - t.X) * this.TKi;
            e.AddCameraArmPitchInput(i),
              e.AddPhotographerYawInput(-o),
              e.AddCameraArmYawInput(-o);
          }
          this.IKi = t;
        }
      }),
      (this.vCt = () => {
        this.PKi(!0);
      }),
      (this.MCt = () => {
        this.PKi(!0), (this.IKi = void 0);
      }),
      (this.NKi = () => {
        this.PKi(!0),
          this.OKi(),
          (this.SKi = TimerSystem_1.TimerSystem.Forever(
            this.kKi,
            CHANGE_FOV_INTERVAL,
          ));
      }),
      (this.FKi = () => {
        this.PKi(!0), this.OKi();
      }),
      (this.VKi = () => {
        this.PKi(!0),
          this.OKi(),
          (this.SKi = TimerSystem_1.TimerSystem.Forever(
            this.HKi,
            CHANGE_FOV_INTERVAL,
          ));
      }),
      (this.jKi = () => {
        this.PKi(!0), this.OKi();
      }),
      (this.kKi = () => {
        this.PKi(!0), this.xKi(1);
      }),
      (this.HKi = () => {
        this.PKi(!0), this.xKi(-1);
      }),
      (this.WKi = () => {
        this.PKi(!0), this.xKi(1);
      }),
      (this.KKi = () => {
        this.PKi(!0), this.xKi(-1);
      }),
      (this.QKi = () => {
        this.PKi(!0), UiManager_1.UiManager.OpenView("PhotographSetupView", 1);
      }),
      (this.IPi = () => {
        this.PKi(!0),
          PhotographController_1.PhotographController.ResetCamera(),
          this.GetSlider(10).SetValue(PhotographDefine_1.DEFAULT_FOV, !1);
      }),
      (this.XKi = () => {
        this.PKi(!0),
          UiManager_1.UiManager.IsViewOpen("PhotographSetupView") &&
            UiManager_1.UiManager.CloseView("PhotographSetupView"),
          Net_1.Net.Send(15240, Protocol_1.Aki.Protocol.lXn.create()),
          PhotographController_1.PhotographController.ScreenShot({
            ScreenShot: !0,
            IsHiddenBattleView: !1,
            HandBookPhotoData: void 0,
            GachaData: void 0,
            FragmentMemory: void 0,
          });
      }),
      (this.$Ki = () => {
        PhotographController_1.PhotographController.ClosePhotograph();
      }),
      (this.YKi = () => {
        this.UiViewSequence.PlaySequence("ShowChanging"),
          this.UiViewSequence.PlaySequence("Loop"),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_camera_task");
      }),
      (this.JKi = (t, e) => {
        t = this.LKi.GetInfoItemByDesc(t);
        t &&
          (this.zKi(t, e), !e) &&
          PhotographController_1.PhotographController.IsLastChecked &&
          (this.UiViewSequence.StopSequenceByKey("Loop"),
          this.UiViewSequence.SequencePlayReverseByKey("ShowChanging", !1));
      }),
      (this.MKe = () => {
        var t = Global_1.Global.CharacterController,
          e = (0, puerts_1.$ref)(void 0),
          i = (0, puerts_1.$ref)(void 0),
          t = (t.GetViewportSize(e, i), (0, puerts_1.$unref)(e)),
          e = (0, puerts_1.$unref)(i),
          i = (this.v$e.Set(t, e), UiLayer_1.UiLayer.UiRootItem);
        i &&
          (this.UKi.Set(i.GetWidth(), i.GetHeight()),
          this.DKi.Set(0.5 * -i.GetWidth(), 0.5 * -i.GetHeight()));
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
        [4, this.WKi],
        [5, this.KKi],
        [7, this.IPi],
        [8, this.XKi],
        [9, this.$Ki],
        [14, this.QKi],
      ]);
  }
  OnStart() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    t?.Valid && t.GetComponent(99)?.SetLodBias(PhotographDefine_1.MAX_LOD_BIAS);
  }
  OnAfterDestroy() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    t?.Valid &&
      t.GetComponent(99)?.SetLodBias(PhotographDefine_1.DEFAULT_LOD_BIAS);
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
    t.OnPointDownCallBack.Bind(this.cCt),
      t.OnPointUpCallBack.Bind(this.mCt),
      t.OnPointCancelCallBack.Bind(this.mCt),
      e.OnPointDownCallBack.Bind(this._Ct),
      e.OnPointUpCallBack.Bind(this.uCt),
      e.OnPointCancelCallBack.Bind(this.uCt),
      i.OnPointDownCallBack.Bind(this.dCt),
      i.OnPointUpCallBack.Bind(this.CCt),
      i.OnPointCancelCallBack.Bind(this.CCt),
      o.OnPointDownCallBack.Bind(this.gCt),
      o.OnPointUpCallBack.Bind(this.fCt),
      o.OnPointCancelCallBack.Bind(this.fCt),
      h.OnPointDownCallBack.Bind(this.NKi),
      h.OnPointUpCallBack.Bind(this.FKi),
      n.OnPointDownCallBack.Bind(this.VKi),
      n.OnPointUpCallBack.Bind(this.jKi),
      r.OnValueChangeCb.Bind(this.qKi),
      s.OnPointerDragCallBack.Bind(this.GKi),
      s.OnPointerBeginDragCallBack.Bind(this.vCt),
      s.OnPointerEndDragCallBack.Bind(this.MCt),
      s.OnPointerDownCallBack.Bind(this.vCt),
      s.OnPointerUpCallBack.Bind(this.MCt),
      s.OnPointerScrollCallBack.Bind(this.O6i),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveForward,
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.拍照,
        this.wKi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.k6i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.F6i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
        this.BKi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEntityCameraSearchGreat,
        this.YKi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
        this.JKi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetImageQuality,
        this.MKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetResolution,
        this.MKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetDisplayMode,
        this.MKe,
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
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.bNi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.拍照,
        this.wKi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiIncrease,
        this.k6i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiReduce,
        this.F6i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
        this.BKi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEntityCameraSearchGreat,
        this.YKi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
        this.JKi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetImageQuality,
        this.MKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetResolution,
        this.MKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetDisplayMode,
        this.MKe,
      );
  }
  OnAfterTick(t) {
    super.OnAfterTick(t),
      1 === PhotographController_1.PhotographController.CameraCaptureType &&
        this.eai();
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
      (this.PKi(!0),
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
        this.pbt,
      ),
      AudioSystem_1.AudioSystem.SetState("game_state", "normal"),
      UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
        ViewId: this.GetViewId(),
        TimeDilation: 1,
        DebugName: "PhotographView",
        Reason: "Photograph",
      }),
      this.ZKi());
  }
  OnAfterHide() {
    UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
      ViewId: this.GetViewId(),
      TimeDilation: 0,
      DebugName: "PhotographView",
      Reason: "Photograph",
    }),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.pbt,
      );
  }
  ZKi() {
    var t;
    1 === PhotographController_1.PhotographController.CameraCaptureType &&
      (this.SetEntityCameraVisibility(!0),
      (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      ModelManager_1.ModelManager.PhotographModel.SetEntityEnable(t, !1));
  }
  lCt(t) {
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
          this.xKi(e));
      }
    }
  }
  OnTick(t) {
    super.OnTick(t),
      ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
        ((this.yKi += t), this.yKi >= this.EKi) &&
        this.PKi(!1);
  }
  PKi(t) {
    t && (this.yKi = 0);
    var e = this.GetItem(11);
    1 === PhotographController_1.PhotographController.CameraCaptureType
      ? (e.SetUIActive(!0),
        this.GetButton(14).RootUIComp.SetUIActive(!1),
        this.GetButton(7).RootUIComp.SetUIActive(!1))
      : e.IsUIActiveSelf() !== t && e.SetUIActive(t);
  }
  bKi(t) {
    this.GetItem(12).SetUIActive(t),
      this.GetButton(9).RootUIComp.SetUIActive(t);
  }
  OKi() {
    TimerSystem_1.TimerSystem.Has(this.SKi) &&
      TimerSystem_1.TimerSystem.Remove(this.SKi);
  }
  async OnBeforeStartAsync() {
    (this.LKi = new PhotographEntityPanel_1.PhotographEntityPanel()),
      await this.LKi.CreateByActorAsync(this.GetItem(15).GetOwner()),
      this.eQi(),
      this.LKi.SetActive(!1),
      (this.EKi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "PhotoDeltaHideDelay",
      )),
      (this.TKi =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ControlCameraRate",
        ) / CommonDefine_1.PERCENTAGE_FACTOR),
      this.tQi(),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !1),
      this.MKe();
  }
  OnBeforeDestroy() {
    this.OKi(),
      this.LKi.Destroy(),
      (this.LKi = void 0),
      this.RKi.Set(0, 0),
      UiCameraManager_1.UiCameraManager.Clear(),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !0);
  }
  tQi() {
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
        this.qKi(i),
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
  xKi(t) {
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
  eQi() {
    PhotographController_1.PhotographController.UpdateMission();
    var t = 1 === PhotographController_1.PhotographController.CameraCaptureType;
    this.LKi.SetActive(t), t && this.iQi();
  }
  iQi() {
    var t = PhotographController_1.PhotographController.Missions?.length;
    if (!t || t <= 0) this.LKi.SetInfoPanelVisible(!1);
    else {
      this.LKi.SetInfoPanelVisible(!0);
      var e = [];
      for (const o of PhotographController_1.PhotographController.Missions) {
        var i = { Text: o.Description, IsFinish: o.IsFinished };
        e.push(i);
      }
      this.LKi.Refresh(e);
    }
  }
  zKi(t, e) {
    t.RefreshFinishState(e),
      !e &&
        this.UiViewSequence?.HasSequenceNameInPlaying("Loop") &&
        this.UiViewSequence.StopSequenceByKey("Loop", !1, !0);
  }
  oQi(t) {
    return t
      .op_Multiply(this.UKi)
      .op_Division(this.v$e)
      .op_Addition(this.DKi)
      .op_Multiply(this.pXe);
  }
  eai() {
    var r = [],
      t =
        PhotographController_1.PhotographController.BehaviorNode
          ?.TakeTargetArray;
    if (t && !(t.length <= 0))
      for (const M of t) {
        var h = PhotographController_1.PhotographController.GetAllCheckPoints(
          M.EntityId,
        );
        if (h && !(h.length <= 0)) {
          let e = "RequiredPointsCenter";
          var n = PhotographController_1.PhotographController.GetPointType(
            M.EntityId,
          );
          switch ((e = n ? n.Type : e)) {
            case "EntityZero":
              var s =
                PhotographController_1.PhotographController.GetCheckEntityPosition(
                  M.EntityId,
                );
              if (!s) continue;
              s = PhotographController_1.PhotographController.GetPosition2D(s);
              if (
                !s ||
                !PhotographController_1.PhotographController.GetEntityFinishSituation(
                  M.EntityId,
                )
              ) {
                r.push({
                  Id: M.EntityId.toString(),
                  Vector: this.AKi,
                  NotShow: !0,
                });
                continue;
              }
              s = this.oQi(s);
              r.push({ Id: M.EntityId.toString(), Vector: s, NotShow: !1 });
              continue;
            case "CustomPoints":
              var a = n.Points,
                _ =
                  PhotographController_1.PhotographController.GetCheckEntityPosition(
                    M.EntityId,
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
                  M.EntityId,
                )
                  ? ((g = this.oQi(p)),
                    r.push({
                      Id: M.EntityId.toString() + t.toString(),
                      Vector: g,
                      NotShow: !1,
                    }))
                  : r.push({
                      Id: M.EntityId.toString() + t.toString(),
                      Vector: this.AKi,
                      NotShow: !0,
                    });
              }
              continue;
          }
          var u = h.length;
          let i = !0,
            o = !1;
          this.RKi.Set(0, 0);
          for (let t = 0; t < h.length; t++) {
            var C = h[t],
              D =
                (PhotographController_1.PhotographController.GetEntityFinishSituation(
                  M.EntityId,
                ) || (o = !0),
                PhotographController_1.PhotographController.GetPosition2D(C));
            D
              ? ((D = this.oQi(D)),
                "RequiredPoints" === e
                  ? (r.push({
                      Id: M.EntityId.toString() + t.toString(),
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
                  : (this.RKi = this.RKi.op_Addition(D)))
              : "RequiredPoints" === e
                ? r.push({
                    Id: M.EntityId.toString() + t.toString(),
                    Vector: this.AKi,
                    NotShow: !0,
                  })
                : r.push({
                    Id: M.EntityId.toString(),
                    Vector: this.AKi,
                    NotShow: !0,
                  });
          }
          i &&
            ((this.RKi.X = this.RKi.X / u),
            (this.RKi.Y = this.RKi.Y / u),
            (u = { Id: M.EntityId.toString(), Vector: this.RKi, NotShow: o }),
            r.push(u));
        }
      }
    this.LKi.UpdateIcons(r);
  }
}
exports.PhotographView = PhotographView;
//# sourceMappingURL=PhotographView.js.map
