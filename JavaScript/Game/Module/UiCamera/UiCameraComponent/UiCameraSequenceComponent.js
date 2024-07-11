"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraSequenceComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  CameraController_1 = require("../../../Camera/CameraController"),
  GlobalData_1 = require("../../../GlobalData"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  BlackScreenView_1 = require("../../UiCameraAnimation/View/BlackScreenView"),
  UiCameraComponent_1 = require("./UiCameraComponent"),
  BLACK_TEXTURE_TAG = new UE.FName("BlackTexture"),
  UI_CAMERA = new UE.FName("UiCamera"),
  FIGHT_CAMERA = new UE.FName("FightCamera");
class UiCameraSequenceComponent extends UiCameraComponent_1.UiCameraComponent {
  constructor() {
    super(...arguments),
      (this.b2t = void 0),
      (this.PUo = void 0),
      (this.xUo = void 0),
      (this.wUo = []),
      (this.BUo = !1),
      (this.bUo = void 0),
      (this.qUo = void 0),
      (this.Fbi = 0),
      (this.GUo = void 0),
      (this.NUo = () => {
        this.GUo.SetResult();
      }),
      (this.kUo = () => {
        this.GUo.SetResult();
      }),
      (this.FUo = () => {
        this.VUo();
      }),
      (this.HUo = () => {
        this.BUo && this.DestroyBlackScreenView();
      });
  }
  OnDestroy() {
    this.DestroyUiCameraSequence();
  }
  PlayUiCameraSequence(e, i = 1, t = !1, s = !0, r) {
    (this.b2t = this.jUo(e)),
      this.b2t &&
        ((this.b2t.bOverrideInstanceData = !1),
        (this.PUo = this.b2t.DefaultInstanceData),
        this.b2t.SetTickableWhenPaused(!0),
        this.SetTransformOriginActor(r),
        this.OUo(this.b2t),
        (this.BUo = s),
        (e = this.b2t.SequencePlayer).SetPlayRate(i),
        e.OnFinished.Add(this.FUo),
        e.OnStop.Add(this.HUo),
        e.OnPlay.Add(this.NUo),
        e.OnPlayReverse.Add(this.kUo),
        t ? e.PlayReverse() : e.Play());
  }
  async LoadAndPlayUiCameraSequence(e, i, t, s) {
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e))
      return (
        this.WUo(!0, 1),
        (this.GUo = new CustomPromise_1.CustomPromise()),
        (this.Fbi = ResourceSystem_1.ResourceSystem.LoadAsync(
          e.ToAssetPathName(),
          UE.LevelSequence,
          (e) => {
            this.PlayUiCameraSequence(e, i, t, !0, s);
          },
        )),
        this.GUo.Promise
      );
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
  DestroyUiCameraSequence(e = !0, i = 0) {
    this.WUo(e, i), this.KUo();
  }
  VUo() {
    for (const e of this.wUo) e();
    this.DestroyUiCameraSequence(this.BUo);
  }
  WUo(e = !0, i = 0) {
    var t;
    this.b2t &&
      ((t = this.b2t.SequencePlayer),
      0 !== i && (t.PlaybackSettings.bRestoreState = 2 === i),
      t.Stop()),
      e && this.DestroyBlackScreenView(),
      0 !== this.Fbi &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Fbi),
        (this.Fbi = 0));
  }
  KUo() {
    this.b2t?.SetShouldLatentDestroy(!0),
      (this.b2t = void 0),
      (this.wUo.length = 0),
      (this.bUo = void 0),
      (this.qUo = void 0);
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
      i =
        (UE.LevelSequencePlayer.CreateLevelSequencePlayer(
          GlobalData_1.GlobalData.World,
          e,
          new UE.MovieSceneSequencePlaybackSettings(),
          i,
        ),
        (0, puerts_1.$unref)(i));
    return i.SetSequence(e), i;
  }
  OUo(i) {
    i.ResetBindings();
    var e = i.GetSequence();
    e.HasBindingTag(BLACK_TEXTURE_TAG, !0) &&
      this.QUo().then(
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
exports.UiCameraSequenceComponent = UiCameraSequenceComponent;
//# sourceMappingURL=UiCameraSequenceComponent.js.map
