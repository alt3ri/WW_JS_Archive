"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var r,
      o = arguments.length,
      h =
        o < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (r = t[a]) && (h = (o < 3 ? r(h) : 3 < o ? r(e, i, h) : r(e, i)) || h);
    return 3 < o && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OrbitalCameraPlayerComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Log_1 = require("../../Core/Common/Log"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  CameraController_1 = require("./CameraController"),
  CameraUtility_1 = require("./CameraUtility"),
  SEQUENCE_CAMERA = new UE.FName("SequenceCamera");
let OrbitalCameraPlayerComponent = class OrbitalCameraPlayerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.yxr = void 0),
      (this.hzo = void 0),
      (this.Ixr = void 0),
      (this.Txr = void 0),
      (this.Lxr = void 0),
      (this._ae = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.Dxr = Vector_1.Vector.Create()),
      (this.hYo = -0),
      (this.ose = -0),
      (this.Rxr = -0),
      (this.Axr = -0),
      (this.GPe = UE.NewArray(UE.Actor)),
      (this.d4i = new UE.FrameTime()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Uxr = void 0),
      (this.OnModeChanged = (t, e) => {
        4 === t
          ? this.Uxr &&
            (this.Enable(
              this.Uxr,
              "[OrbitalCameraPlayerComponent.OnModeChanged] newMode === Orbital",
            ),
            (this.Uxr = void 0))
          : 4 !== e ||
            this.Uxr ||
            (this.Uxr = this.Disable(
              "[OrbitalCameraPlayerComponent.OnModeChanged] oldMode === Orbital",
            ));
      }),
      (this.Pxr = (t, e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Camera", 6, "Orbital LoadComplete"),
          e === this.Lxr && ((this.hzo = t), this.jer());
      });
  }
  OnStart() {
    return (
      (this.yxr = this.Entity.GetComponent(9)),
      (this.Uxr = this.Disable("[OrbitalCameraPlayerComponent.OnStart]")),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraModeChanged,
        this.OnModeChanged,
      ),
      !0
    );
  }
  OnEnd() {
    if (((this.hzo = void 0), this.Ixr)) {
      const t = this.Ixr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(t);
      }),
        (this.Ixr = void 0),
        (this.Txr = void 0);
    }
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CameraModeChanged,
        this.OnModeChanged,
      ),
      !0
    );
  }
  OnTick(t) {
    var e;
    this.Ixr
      ? ((e = this.xxr()), this.wxr(e), this.Txr.JumpToFrame(this.d4i))
      : this.Uxr
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Camera", 6, "OrbitalCamera Impossible Tick!")
        : (this.Uxr = this.Disable(
            "[OrbitalCameraPlayerComponent.OnTick] this.CameraSequenceActor无效",
          ));
  }
  PlayCameraOrbitalPath(t, e, i, s, r) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 6, "Orbital Play"),
      (this.Lxr = t),
      this._ae.FromUeVector(e),
      this.uae.FromUeVector(i),
      (this.ose = s),
      (this.Rxr = r),
      this.uae.Subtraction(this._ae, this.Dxr),
      (this.hYo = this.Dxr.Size()),
      this.Dxr.DivisionEqual(this.hYo),
      this.Bxr();
  }
  PlayCameraOrbital(t, e, i, s, r) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 6, "Orbital Play"),
      (this.hzo = t),
      this._ae.FromUeVector(e),
      this.uae.FromUeVector(i),
      (this.ose = s),
      (this.Rxr = r),
      this.uae.Subtraction(this._ae, this.Dxr),
      (this.hYo = this.Dxr.Size()),
      this.Dxr.DivisionEqual(this.hYo),
      this.jer();
  }
  StopCameraOrbital() {
    if (
      (Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 6, "Orbital Stop"),
      this.Lxr || this.hzo)
    ) {
      if (
        (CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
        ),
        CameraController_1.CameraController.ExitCameraMode(4, this.Rxr),
        this.hzo && (this.hzo = void 0),
        this.Ixr)
      ) {
        this.Txr.Stop();
        const t = this.Ixr;
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put(t);
        }),
          (this.Ixr = void 0),
          (this.Txr = void 0);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Camera", 6, "Orbital: No CameraSequenceActor");
      this.Lxr = void 0;
    }
  }
  Bxr() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      this.Lxr,
      UE.LevelSequence,
      this.Pxr,
    );
  }
  jer() {
    var t = new UE.MovieSceneSequencePlaybackSettings();
    (t.bDisableMovementInput = !1),
      (t.bDisableLookAtInput = !1),
      (this.Ixr = ActorSystem_1.ActorSystem.Get(
        UE.LevelSequenceActor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
        void 0,
        !1,
      )),
      (this.Ixr.PlaybackSettings = t),
      this.Ixr.SetSequence(this.hzo),
      (this.Txr = this.Ixr.SequencePlayer),
      this.Txr.Play(),
      this.Txr.SetPlayRate(0),
      this.Txr.Pause(),
      this.GPe.Add(this.yxr.CineCamera),
      this.Ixr.SetBindingByTag(SEQUENCE_CAMERA, this.GPe, !1),
      this.GPe.Empty(),
      (this.Axr = this.Txr.GetEndTime().Time.FrameNumber.Value),
      CameraController_1.CameraController.EnterCameraMode(4, this.ose, 0);
  }
  xxr() {
    var t;
    return !Global_1.Global.BaseCharacter ||
      this.hYo < MathUtils_1.MathUtils.SmallNumber
      ? 0
      : (Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Subtraction(
          this._ae,
          this.Lz,
        ),
        (t = this.Lz.DotProduct(this.Dxr) / this.hYo),
        MathUtils_1.MathUtils.Clamp(t, 0, 1));
  }
  wxr(t) {
    var t = t * this.Axr,
      e = Math.floor(t),
      t = t - e;
    return (this.d4i.FrameNumber.Value = e), (this.d4i.SubFrame = t), this.d4i;
  }
};
(OrbitalCameraPlayerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(6)],
  OrbitalCameraPlayerComponent,
)),
  (exports.OrbitalCameraPlayerComponent = OrbitalCameraPlayerComponent);
//# sourceMappingURL=OrbitalCameraPlayerComponent.js.map
