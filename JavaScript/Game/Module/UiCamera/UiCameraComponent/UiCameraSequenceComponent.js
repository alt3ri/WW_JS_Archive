"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraSequenceComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../../Camera/CameraController");
const GlobalData_1 = require("../../../GlobalData");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const BlackScreenView_1 = require("../../UiCameraAnimation/View/BlackScreenView");
const UiCameraComponent_1 = require("./UiCameraComponent");
const BLACK_TEXTURE_TAG = new UE.FName("BlackTexture");
const UI_CAMERA = new UE.FName("UiCamera");
const FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequenceComponent extends UiCameraComponent_1.UiCameraComponent {
  constructor() {
    super(...arguments),
      (this.Bkt = void 0),
      (this.BRo = void 0),
      (this.bRo = void 0),
      (this.qRo = []),
      (this.GRo = !1),
      (this.NRo = void 0),
      (this.ORo = void 0),
      (this.FBi = 0),
      (this.kRo = void 0),
      (this.FRo = () => {
        this.VRo(this.Bkt), this.kRo.SetResult();
      }),
      (this.HRo = () => {
        this.VRo(this.Bkt), this.kRo.SetResult();
      }),
      (this.jRo = () => {
        this.WRo();
      }),
      (this.KRo = () => {
        this.GRo && this.DestroyBlackScreenView();
      });
  }
  OnDestroy() {
    this.DestroyUiCameraSequence();
  }
  PlayUiCameraSequence(e, i = 1, t = !1, s = !0, r) {
    (this.Bkt = this.QRo(e)),
      this.Bkt &&
        ((this.Bkt.bOverrideInstanceData = !1),
        (this.BRo = this.Bkt.DefaultInstanceData),
        this.Bkt.SetTickableWhenPaused(!0),
        this.SetTransformOriginActor(r),
        (this.GRo = s),
        (e = this.Bkt.SequencePlayer).SetPlayRate(i),
        e.OnFinished.Add(this.jRo),
        e.OnStop.Add(this.KRo),
        e.OnPlay.Add(this.FRo),
        e.OnPlayReverse.Add(this.HRo),
        t ? e.PlayReverse() : e.Play());
  }
  async LoadAndPlayUiCameraSequence(e, i, t, s) {
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e))
      return (
        this.XRo(!0, 1),
        (this.kRo = new CustomPromise_1.CustomPromise()),
        (this.FBi = ResourceSystem_1.ResourceSystem.LoadAsync(
          e.ToAssetPathName(),
          UE.LevelSequence,
          (e) => {
            this.PlayUiCameraSequence(e, i, t, !0, s);
          },
        )),
        this.kRo.Promise
      );
  }
  Pause() {
    let e;
    this.Bkt?.IsValid() &&
      (e = this.Bkt.SequencePlayer)?.IsValid() &&
      e.Pause();
  }
  Continue() {
    let e;
    this.Bkt?.IsValid() &&
      (e = this.Bkt.SequencePlayer)?.IsValid() &&
      e.IsPaused() &&
      e.Play();
  }
  DestroyUiCameraSequence(e = !0, i = 0) {
    this.XRo(e, i), this.$Ro();
  }
  WRo() {
    for (const e of this.qRo) e();
    this.DestroyUiCameraSequence(this.GRo);
  }
  XRo(e = !0, i = 0) {
    let t;
    this.Bkt &&
      ((t = this.Bkt.SequencePlayer),
      i !== 0 && (t.PlaybackSettings.bRestoreState = i === 2),
      t.Stop()),
      e && this.DestroyBlackScreenView(),
      this.FBi !== 0 &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.FBi),
        (this.FBi = 0));
  }
  $Ro() {
    this.Bkt?.SetShouldLatentDestroy(!0),
      (this.Bkt = void 0),
      (this.qRo.length = 0),
      (this.NRo = void 0),
      (this.ORo = void 0);
  }
  ExecuteUiCameraSequenceEvent(e) {
    this.NRo && this.ORo === e && this.NRo();
  }
  SetTransformOrigin(e) {
    this.BRo &&
      ((this.Bkt.bOverrideInstanceData = !0), (this.BRo.TransformOrigin = e));
  }
  SetTransformOriginActor(e) {
    this.BRo &&
      ((this.Bkt.bOverrideInstanceData = !0),
      (this.BRo.TransformOriginActor = e));
  }
  AddUiCameraSequenceEvent(e, i) {
    (this.ORo = e), (this.NRo = i);
  }
  AddUiCameraSequenceFinishedCallback(e) {
    e && this.qRo.push(e);
  }
  QRo(e) {
    var i = (0, puerts_1.$ref)(void 0);
    var i =
      (UE.LevelSequencePlayer.CreateLevelSequencePlayer(
        GlobalData_1.GlobalData.World,
        e,
        new UE.MovieSceneSequencePlaybackSettings(),
        i,
      ),
      (0, puerts_1.$unref)(i));
    return i.SetSequence(e), i;
  }
  VRo(i) {
    i.ResetBindings();
    let e = i.GetSequence();
    e.HasBindingTag(BLACK_TEXTURE_TAG, !0) &&
      this.YRo().then(
        (e) => {
          e = e.GetBlackScreenTextureActor();
          i.AddBindingByTag(BLACK_TEXTURE_TAG, e);
        },
        () => {},
      ),
      e.HasBindingTag(UI_CAMERA, !0) &&
        i.AddBindingByTag(UI_CAMERA, this.CameraActor),
      e.HasBindingTag(FIGHT_CAMERA, !0) &&
        ((e =
          CameraController_1.CameraController.FightCamera.GetComponent(
            4,
          ).CameraActor),
        i.AddBindingByTag(FIGHT_CAMERA, e));
  }
  async YRo() {
    let e;
    return (
      this.bRo ||
        ((e = UiLayer_1.UiLayer.GetLayerRootUiItem(
          UiLayerType_1.ELayerType.Pop,
        )),
        (this.bRo = new BlackScreenView_1.BlackScreenView()),
        await this.bRo.CreateThenShowByResourceIdAsync(
          "UiView_BlackScreen_Prefab",
          e,
        )),
      this.bRo
    );
  }
  DestroyBlackScreenView() {
    this.bRo && (this.bRo.Destroy(), (this.bRo = void 0));
  }
}
exports.UiCameraSequenceComponent = UiCameraSequenceComponent;
// # sourceMappingURL=UiCameraSequenceComponent.js.map
