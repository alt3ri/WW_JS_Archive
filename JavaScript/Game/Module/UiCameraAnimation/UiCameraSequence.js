"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraSequence = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CameraController_1 = require("../../Camera/CameraController"),
  GlobalData_1 = require("../../GlobalData"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  BlackScreenView_1 = require("./View/BlackScreenView"),
  BLACK_TEXTURE_TAG = new UE.FName("BlackTexture"),
  UI_CAMERA = new UE.FName("UiCamera"),
  FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequence {
  constructor() {
    (this.b2t = void 0),
      (this.PUo = void 0),
      (this.xUo = void 0),
      (this.wUo = []),
      (this.BUo = !1),
      (this.bUo = void 0),
      (this.qUo = void 0),
      (this.FUo = () => {
        this.VUo();
      });
  }
  InitializeUiCameraSequence(e) {
    (this.b2t = this.jUo(e)),
      (this.b2t.bOverrideInstanceData = !1),
      (this.PUo = this.b2t.DefaultInstanceData),
      this.OUo(this.b2t);
  }
  PlayUiCameraSequence(e = 1, i = !1, t = !0) {
    this.b2t &&
      ((this.BUo = t),
      (t = this.b2t.SequencePlayer).SetPlayRate(e),
      t.OnFinished.Add(this.FUo),
      i ? t.PlayReverse() : t.Play());
  }
  Pause() {
    var e;
    this.b2t?.IsValid() &&
      (e = this.b2t.SequencePlayer)?.IsValid() &&
      e.Pause();
  }
  Continue() {
    var e;
    this.b2t?.IsValid() &&
      (e = this.b2t.SequencePlayer)?.IsValid() &&
      e.IsPaused() &&
      e.Play();
  }
  DestroyUiCameraSequence(e = !0) {
    this.WUo(),
      this.KUo(),
      e && this.DestroyBlackScreenView(),
      (this.wUo.length = 0),
      (this.bUo = void 0),
      (this.qUo = void 0);
  }
  VUo() {
    for (const e of this.wUo) e(this);
    this.DestroyUiCameraSequence(this.BUo);
  }
  WUo() {
    this.b2t && this.b2t.SequencePlayer.Stop();
  }
  KUo() {
    this.b2t && (this.b2t.SetShouldLatentDestroy(!0), (this.b2t = void 0));
  }
  ExecuteUiCameraSequenceEvent(e) {
    this.bUo && this.qUo === e && this.bUo();
  }
  SetTransformOrigin(e) {
    this.PUo &&
      ((this.b2t.bOverrideInstanceData = !0), (this.PUo.TransformOrigin = e));
  }
  SetTransformOriginActor(e) {
    this.PUo &&
      ((this.b2t.bOverrideInstanceData = !0),
      (this.PUo.TransformOriginActor = e));
  }
  AddUiCameraSequenceEvent(e, i) {
    (this.qUo = e), (this.bUo = i);
  }
  AddUiCameraSequenceFinishedCallback(e) {
    e && this.wUo.push(e);
  }
  jUo(e) {
    var i = (0, puerts_1.$ref)(void 0),
      e =
        (UE.LevelSequencePlayer.CreateLevelSequencePlayer(
          GlobalData_1.GlobalData.World,
          e,
          new UE.MovieSceneSequencePlaybackSettings(),
          i,
        ),
        (0, puerts_1.$unref)(i));
    return e;
  }
  OUo(i) {
    i.ResetBindings();
    var e,
      t = i.GetSequence();
    t.HasBindingTag(BLACK_TEXTURE_TAG, !0) &&
      this.QUo().then(
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
  async QUo() {
    var e;
    return (
      this.xUo ||
        ((e = UiLayer_1.UiLayer.GetLayerRootUiItem(
          UiLayerType_1.ELayerType.Pop,
        )),
        (this.xUo = new BlackScreenView_1.BlackScreenView()),
        await this.xUo.CreateThenShowByResourceIdAsync(
          "UiView_BlackScreen_Prefab",
          e,
        )),
      this.xUo
    );
  }
  DestroyBlackScreenView() {
    this.xUo && (this.xUo.Destroy(), (this.xUo = void 0));
  }
}
exports.UiCameraSequence = UiCameraSequence;
//# sourceMappingURL=UiCameraSequence.js.map
