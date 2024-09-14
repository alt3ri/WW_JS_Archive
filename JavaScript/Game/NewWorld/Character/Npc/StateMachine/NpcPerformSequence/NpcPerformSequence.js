"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformSequence = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  CameraController_1 = require("../../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  sequenceCameraTag = new UE.FName("SequenceCamera");
class NpcPerformSequence {
  constructor() {
    (this.ktr = ""),
      (this.Fbi = void 0),
      (this.SPe = void 0),
      (this.Ntr = void 0),
      (this.PUo = void 0),
      (this.Otr = void 0),
      (this.lGn = () => {
        this.$ne(), this._Gn();
      }),
      (this.pLo = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            8,
            "[CollectionItemDisplay]Npc表现Sequence播放完成",
            ["SequenceName", this.SPe?.Sequence?.GetName()],
          ),
          this.$ne();
      });
  }
  Destroy() {
    this.SPe?.IsValid() && this.SPe.IsPlaying()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            8,
            "[CollectionItemDisplay]开始销毁Npc表现Sequence时，Sequence仍在播放，等播放完成后销毁",
          ),
        this.SPe.OnFinished.Clear(),
        this.SPe.OnFinished.Add(this.lGn))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            8,
            "[CollectionItemDisplay]开始销毁Npc表现Sequence",
          ),
        this._Gn());
  }
  _Gn() {
    if (
      (this.Fbi &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Fbi),
        (this.Fbi = void 0)),
      this.SPe?.IsValid() &&
        (this.SPe.Stop(), this.SPe.OnFinished.Clear(), (this.SPe = void 0)),
      this.Ntr?.IsValid())
    ) {
      const e = this.Ntr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(e);
      }),
        (this.Ntr = void 0);
    }
    (this.PUo = void 0),
      (this.Otr = void 0),
      CameraController_1.CameraController.ExitCameraMode(1, 0);
  }
  SetTransformOriginEntity(e) {
    e = e.GetComponent(1).Owner;
    this.SetTransformOriginActor(e);
  }
  SetTransformOriginActor(e) {
    this.PUo &&
      ((this.Ntr.bOverrideInstanceData = !0),
      (this.PUo.TransformOriginActor = e));
  }
  Load(e, t) {
    this.ktr === e && this.IsValid()
      ? t && t()
      : ((this.ktr = e),
        (this.Fbi = ResourceSystem_1.ResourceSystem.LoadAsync(
          this.ktr,
          UE.LevelSequence,
          (e) => {
            this.Ftr(e), t && t();
          },
        )));
  }
  Play(e) {
    var t;
    this.IsValid()
      ? (this.IsPlaying() &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "NPC",
              8,
              "[CollectionItemDisplay]尝试播放Npc表现Sequence时，Sequence正在播放中,停止后重新播放",
            ),
          this.Oot()),
        (t =
          CameraController_1.CameraController.SequenceCamera.DisplayComponent
            .CineCamera).ResetSeqCineCamSetting(),
        this.AddBindingByTag(sequenceCameraTag, t),
        CameraController_1.CameraController.EnterCameraMode(1, 0),
        this.Vtr(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayNpcPerformSequence,
        ))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          8,
          "[CollectionItemDisplay]尝试播放Npc表现Sequence时，LevelSequencePlayer为空或不可用",
        );
  }
  AddBindingByTag(e, t) {
    this.Ntr.AddBindingByTag(e, t, !1, !0);
  }
  Ftr(e) {
    (this.Ntr = ActorSystem_1.ActorSystem.Get(
      UE.LevelSequenceActor.StaticClass(),
      new UE.Transform(),
      void 0,
      !1,
    )),
      this.Ntr.SetSequence(e),
      (this.SPe = this.Ntr.SequencePlayer),
      (this.PUo = this.Ntr.DefaultInstanceData);
  }
  Vtr(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "NPC",
        8,
        "[CollectionItemDisplay]开始播放Npc表现Sequence",
        ["SequenceName", this.SPe?.Sequence?.GetName()],
      ),
      (this.Otr = e),
      this.SPe.OnFinished.Add(this.pLo),
      this.SPe.Play();
  }
  Stop() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("NPC", 8, "[CollectionItemDisplay]Npc表现Sequence被停止"),
      this.Oot();
  }
  Oot() {
    CameraController_1.CameraController.ExitCameraMode(1, 0),
      this.SPe?.IsValid() && this.SPe.Stop();
  }
  Pause() {
    this.SPe?.IsValid() && this.SPe.Pause();
  }
  Continue() {
    this.SPe?.IsValid() && this.SPe.Play();
  }
  IsPlaying() {
    return !!this.SPe?.IsValid() && this.SPe.IsPlaying();
  }
  IsValid() {
    return this.SPe?.IsValid() ?? !1;
  }
  $ne() {
    CameraController_1.CameraController.ExitCameraMode(1, 0),
      this.Otr && this.Otr(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnNpcPerformSequenceFinished,
      );
  }
}
exports.NpcPerformSequence = NpcPerformSequence;
//# sourceMappingURL=NpcPerformSequence.js.map
