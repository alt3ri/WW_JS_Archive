"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraSequence = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const CameraController_1 = require("../../Camera/CameraController");
const GlobalData_1 = require("../../GlobalData");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const BlackScreenView_1 = require("./View/BlackScreenView");
const BLACK_TEXTURE_TAG = new UE.FName("BlackTexture");
const UI_CAMERA = new UE.FName("UiCamera");
const FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequence {
  constructor() {
    (this.Bkt = void 0),
      (this.BRo = void 0),
      (this.bRo = void 0),
      (this.qRo = []),
      (this.GRo = !1),
      (this.NRo = void 0),
      (this.ORo = void 0),
      (this.jRo = () => {
        this.WRo();
      });
  }
  InitializeUiCameraSequence(e) {
    (this.Bkt = this.QRo(e)),
      (this.Bkt.bOverrideInstanceData = !1),
      (this.BRo = this.Bkt.DefaultInstanceData),
      this.VRo(this.Bkt);
  }
  PlayUiCameraSequence(e = 1, i = !1, t = !0) {
    this.Bkt &&
      ((this.GRo = t),
      (t = this.Bkt.SequencePlayer).SetPlayRate(e),
      t.OnFinished.Add(this.jRo),
      i ? t.PlayReverse() : t.Play());
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
  DestroyUiCameraSequence(e = !0) {
    this.XRo(),
      this.$Ro(),
      e && this.DestroyBlackScreenView(),
      (this.qRo.length = 0),
      (this.NRo = void 0),
      (this.ORo = void 0);
  }
  WRo() {
    for (const e of this.qRo) e(this);
    this.DestroyUiCameraSequence(this.GRo);
  }
  XRo() {
    this.Bkt && this.Bkt.SequencePlayer.Stop();
  }
  $Ro() {
    this.Bkt && (this.Bkt.SetShouldLatentDestroy(!0), (this.Bkt = void 0));
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
    const i = (0, puerts_1.$ref)(void 0);
    var e =
      (UE.LevelSequencePlayer.CreateLevelSequencePlayer(
        GlobalData_1.GlobalData.World,
        e,
        new UE.MovieSceneSequencePlaybackSettings(),
        i,
      ),
      (0, puerts_1.$unref)(i));
    return e;
  }
  VRo(i) {
    i.ResetBindings();
    let e;
    const t = i.GetSequence();
    t.HasBindingTag(BLACK_TEXTURE_TAG, !0) &&
      this.YRo().then(
        (e) => {
          e = e.GetBlackScreenTextureActor();
          i.AddBindingByTag(BLACK_TEXTURE_TAG, e);
        },
        () => {},
      ),
      t.HasBindingTag(UI_CAMERA, !0) &&
        ((e =
          CameraController_1.CameraController.WidgetCamera.GetComponent(
            12,
          ).CineCamera),
        i.AddBindingByTag(UI_CAMERA, e)),
      t.HasBindingTag(FIGHT_CAMERA, !0) &&
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
exports.UiCameraSequence = UiCameraSequence;
// # sourceMappingURL=UiCameraSequence.js.map
