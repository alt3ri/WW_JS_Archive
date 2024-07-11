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
      (this.ZPr = void 0),
      (this.nZo = void 0),
      (this.exr = void 0),
      (this.txr = void 0),
      (this.ixr = void 0),
      (this._ae = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.oxr = Vector_1.Vector.Create()),
      (this.nJo = -0),
      (this.ose = -0),
      (this.rxr = -0),
      (this.nxr = -0),
      (this.GPe = UE.NewArray(UE.Actor)),
      (this.m5i = new UE.FrameTime()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.sxr = void 0),
      (this.OnModeChanged = (t, e) => {
        4 === t
          ? this.sxr &&
            (this.Enable(
              this.sxr,
              "[OrbitalCameraPlayerComponent.OnModeChanged] newMode === Orbital",
            ),
            (this.sxr = void 0))
          : 4 !== e ||
            this.sxr ||
            (this.sxr = this.Disable(
              "[OrbitalCameraPlayerComponent.OnModeChanged] oldMode === Orbital",
            ));
      }),
      (this.axr = (t, e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Camera", 6, "Orbital LoadComplete"),
          e === this.ixr && ((this.nZo = t), this.Vtr());
      });
  }
  OnStart() {
    return (
      (this.ZPr = this.Entity.GetComponent(9)),
      (this.sxr = this.Disable("[OrbitalCameraPlayerComponent.OnStart]")),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraModeChanged,
        this.OnModeChanged,
      ),
      !0
    );
  }
  OnEnd() {
    if (((this.nZo = void 0), this.exr)) {
      const t = this.exr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(t);
      }),
        (this.exr = void 0),
        (this.txr = void 0);
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
    this.exr
      ? ((e = this.hxr()), this.lxr(e), this.txr.JumpToFrame(this.m5i))
      : this.sxr
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Camera", 6, "OrbitalCamera Impossible Tick!")
        : (this.sxr = this.Disable(
            "[OrbitalCameraPlayerComponent.OnTick] this.CameraSequenceActor无效",
          ));
  }
  PlayCameraOrbitalPath(t, e, i, s, r) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 6, "Orbital Play"),
      (this.ixr = t),
      this._ae.FromUeVector(e),
      this.uae.FromUeVector(i),
      (this.ose = s),
      (this.rxr = r),
      this.uae.Subtraction(this._ae, this.oxr),
      (this.nJo = this.oxr.Size()),
      this.oxr.DivisionEqual(this.nJo),
      this._xr();
  }
  PlayCameraOrbital(t, e, i, s, r) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 6, "Orbital Play"),
      (this.nZo = t),
      this._ae.FromUeVector(e),
      this.uae.FromUeVector(i),
      (this.ose = s),
      (this.rxr = r),
      this.uae.Subtraction(this._ae, this.oxr),
      (this.nJo = this.oxr.Size()),
      this.oxr.DivisionEqual(this.nJo),
      this.Vtr();
  }
  StopCameraOrbital() {
    if (
      (Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 6, "Orbital Stop"),
      this.ixr || this.nZo)
    ) {
      if (
        (CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
        ),
        CameraController_1.CameraController.ExitCameraMode(4, this.rxr),
        this.nZo && (this.nZo = void 0),
        this.exr)
      ) {
        this.txr.Stop();
        const t = this.exr;
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put(t);
        }),
          (this.exr = void 0),
          (this.txr = void 0);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Camera", 6, "Orbital: No CameraSequenceActor");
      this.ixr = void 0;
    }
  }
  _xr() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      this.ixr,
      UE.LevelSequence,
      this.axr,
    );
  }
  Vtr() {
    var t = new UE.MovieSceneSequencePlaybackSettings();
    (t.bDisableMovementInput = !1),
      (t.bDisableLookAtInput = !1),
      (this.exr = ActorSystem_1.ActorSystem.Get(
        UE.LevelSequenceActor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
        void 0,
        !1,
      )),
      (this.exr.PlaybackSettings = t),
      this.exr.SetSequence(this.nZo),
      (this.txr = this.exr.SequencePlayer),
      this.txr.Play(),
      this.txr.SetPlayRate(0),
      this.txr.Pause(),
      this.GPe.Add(this.ZPr.CineCamera),
      this.exr.SetBindingByTag(SEQUENCE_CAMERA, this.GPe, !1),
      this.GPe.Empty(),
      (this.nxr = this.txr.GetEndTime().Time.FrameNumber.Value),
      CameraController_1.CameraController.EnterCameraMode(4, this.ose, 0);
  }
  hxr() {
    var t;
    return !Global_1.Global.BaseCharacter ||
      this.nJo < MathUtils_1.MathUtils.SmallNumber
      ? 0
      : (Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Subtraction(
          this._ae,
          this.Lz,
        ),
        (t = this.Lz.DotProduct(this.oxr) / this.nJo),
        MathUtils_1.MathUtils.Clamp(t, 0, 1));
  }
  lxr(t) {
    var t = t * this.nxr,
      e = Math.floor(t),
      t = t - e;
    return (this.m5i.FrameNumber.Value = e), (this.m5i.SubFrame = t), this.m5i;
  }
};
(OrbitalCameraPlayerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(6)],
  OrbitalCameraPlayerComponent,
)),
  (exports.OrbitalCameraPlayerComponent = OrbitalCameraPlayerComponent);
//# sourceMappingURL=OrbitalCameraPlayerComponent.js.map
