"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DrawMainView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GachaController_1 = require("../GachaController"),
  GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView");
class DrawMainView extends GachaSceneView_1.GachaSceneView {
  constructor() {
    super(...arguments),
      (this.DHt = void 0),
      (this.RHt = void 0),
      (this.UHt = ""),
      (this.AHt = void 0),
      (this.PHt = void 0),
      (this.Xe = 0),
      (this.xHt = 0),
      (this.wHt = 0),
      (this.BHt = 0),
      (this.bHt = void 0),
      (this.qHt = 0),
      (this.GHt = void 0),
      (this.NHt = new UE.Vector2D()),
      (this.OHt = 0),
      (this.kHt = !1),
      (this.SlideCurve = void 0),
      (this.FHt = 0),
      (this.VHt = 0),
      (this.HHt = !1),
      (this.jHt = !1),
      (this.WHt = !1),
      (this.KHt = 0),
      (this.QHt = !1),
      (this.XHt = !1),
      (this.SPe = void 0),
      (this.$Ht = () => {
        (this.WHt = !0), this.HHt && this.ShowNextView();
      }),
      (this.OnDragBeginCallBack = (e) => {
        (this.bHt = e.pointerPosition),
          (this.VHt = this.FHt),
          (this.QHt = !0),
          (this.KHt = 0),
          this.SPe.PlayLevelSequenceByName("DrawTipsHide"),
          (this.XHt = !1);
      }),
      (this.OnDragCallBack = (e) => {
        (this.NHt.X = e.pointerPosition.X), (this.NHt.Y = e.pointerPosition.Y);
        e = (e.pointerPosition.X - this.bHt.X) / this.OHt;
        if (
          ((this.Xe = this.SlideCurve.GetFloatValue(e + this.VHt)),
          (this.FHt = MathUtils_1.MathUtils.Clamp(e + this.VHt, 0, 1)),
          this.Xe > this.xHt)
        ) {
          if (this.kHt) return;
          (this.kHt = !0), this.PlayShowSequence();
        }
        e = MathUtils_1.MathUtils.Clamp(
          (this.Xe - this.BHt) / (this.qHt - this.BHt),
          0,
          1,
        );
        this.PHt?.TSUpdateParameters(this.Xe, e, this.NHt);
      }),
      (this.OnDragEndCallBack = (e) => {
        this.QHt = !1;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIDraggableComponent],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.$Ht]]);
  }
  OnAfterOpenUiScene() {
    this.AHt = CameraController_1.CameraController.Model.CurrentCameraActor;
    var e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
    let t = 1;
    ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, i) => {
      e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          e.e9n.L8n,
        )?.QualityId ?? 0;
      e > t && (t = e);
    });
    var e =
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(
          e,
          t,
        ),
      i = (0, puerts_1.$ref)(0),
      s = (0, puerts_1.$ref)(0),
      i =
        (Global_1.Global.CharacterController.GetViewportSize(i, s),
        (this.PHt = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"),
          0,
        )),
        (0, puerts_1.$unref)(i)),
      s = (0, puerts_1.$unref)(s);
    CameraController_1.CameraController.SetViewTarget(
      this.PHt.SceneCameraActor,
      "OnAfterOpenUi",
    ),
      (this.PHt["Gacha Result"] = t),
      (this.wHt = e.DefaultProcess),
      (this.Xe = 0),
      (this.BHt = e.ChangeColorProcess),
      (this.qHt = e.CompleteChangeColorProcess),
      (this.xHt = e.PlaySequenceProcess),
      this.PHt.TSInitParameters(
        new UE.Vector2D(i, s),
        i * this.wHt,
        this.GHt,
        t,
      ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e.SlideCurveAssetPath,
        UE.CurveFloat,
        (e) => {
          this.SlideCurve = e;
          e = this.GetDraggable(0);
          e.OnPointerDragCallBack.Bind(this.OnDragCallBack),
            e.OnPointerBeginDragCallBack.Bind(this.OnDragBeginCallBack),
            e.OnPointerEndDragCallBack.Bind(this.OnDragEndCallBack);
        },
      ),
      GachaController_1.GachaController.PreloadGachaResultResource((e) => {
        (this.HHt = !0), (this.jHt || this.WHt) && this.ShowNextView();
      });
  }
  InitLevelSequence() {
    var e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
    let t = 1;
    ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, i) => {
      e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          e.e9n.L8n,
        )?.QualityId ?? 0;
      e > t && (t = e);
    });
    e =
      ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(
        e,
        t,
      );
    (this.UHt = e.FinalShowSequencePath),
      (this.GHt = new UE.LinearColor(
        e.FinalColor.R,
        e.FinalColor.G,
        e.FinalColor.B,
        e.FinalColor.A,
      )),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.UHt,
        UE.LevelSequence,
        (e) => {
          var i;
          ObjectUtils_1.ObjectUtils.IsValid(e) &&
            ((e = e),
            ((i = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
              !0),
            (this.DHt = ActorSystem_1.ActorSystem.Get(
              UE.LevelSequenceActor.StaticClass(),
              MathUtils_1.MathUtils.DefaultTransform,
              void 0,
              !1,
            )),
            (this.DHt.PlaybackSettings = i),
            this.DHt.SetSequence(e),
            this.RHt.OnFinished.Add(() => {
              (this.jHt = !0), this.HHt && this.ShowNextView();
            }));
        },
      );
  }
  OnStart() {
    this.InitLevelSequence(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    var e = (0, puerts_1.$ref)(0),
      i = (0, puerts_1.$ref)(0);
    Global_1.Global.CharacterController.GetViewportSize(e, i),
      (this.OHt = (0, puerts_1.$unref)(e));
  }
  OnBeforeDestroy() {
    TimerSystem_1.TimerSystem.Next(() => {
      ActorSystem_1.ActorSystem.Put(this.DHt);
    }),
      (this.DHt = void 0),
      this.SPe.Clear();
  }
  OnTick(e) {
    this.PHt?.SceneCameraActor.IsValid() &&
      ModelManager_1.ModelManager.CameraModel.CurrentCameraActor !==
        this.PHt.SceneCameraActor &&
      !this.kHt &&
      CameraController_1.CameraController.SetViewTarget(
        this.PHt.SceneCameraActor,
        "DrawMainView.OnTick",
      ),
      this.QHt ||
        this.XHt ||
        this.kHt ||
        ((this.KHt += e),
        this.KHt >= 2 * CommonDefine_1.MILLIONSECOND_PER_SECOND &&
          (this.SPe.PlayLevelSequenceByName("DrawTipsShow"), (this.XHt = !0)));
  }
  PlayShowSequence() {
    this.PHt.SetActorHiddenInGame(!0),
      this.GetButton(1).RootUIComp?.SetUIActive(!0),
      this.GetDraggable(0)
        .GetOwner()
        .GetComponentByClass(UE.UIItem.StaticClass())
        .SetUIActive(!1),
      this.DHt?.SequencePlayer.Play();
  }
  ShowNextView() {
    this.RHt?.Stop(),
      CameraController_1.CameraController.SetViewTarget(
        this.AHt,
        "ShowNextView",
      ),
      this.CloseMe(),
      UiManager_1.UiManager.OpenView("GachaScanView");
  }
}
exports.DrawMainView = DrawMainView;
//# sourceMappingURL=DrawMainView.js.map
