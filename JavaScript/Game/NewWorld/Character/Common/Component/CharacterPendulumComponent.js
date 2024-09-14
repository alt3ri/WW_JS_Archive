"use strict";
var CharacterPendulumComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, n, i) {
      var r,
        s = arguments.length,
        o =
          s < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, n))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, n, i);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (r = t[h]) &&
            (o = (s < 3 ? r(o) : 3 < s ? r(e, n, o) : r(e, n)) || o);
      return 3 < s && o && Object.defineProperty(e, n, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPendulumComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  LIMIT_FRAME_TIME = 33,
  LIMIT_FRAME_TIME2 = 50,
  UPDATE_UP_Z = 5,
  UPDATE_UP_Z2 = 11,
  LIMIT_FORCE = 6e5;
let CharacterPendulumComponent =
  (CharacterPendulumComponent_1 = class CharacterPendulumComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ujr = void 0),
        (this.cjr = !1),
        (this.mjr = 0),
        (this.djr = Vector_1.Vector.Create()),
        (this.kCe = ""),
        (this.Cjr = 0),
        (this.gjr = 0),
        (this.fjr = 0),
        (this.pjr = 0),
        (this.vjr = 0),
        (this.Anr = Vector_1.Vector.Create()),
        (this.Mjr = (t) => {}),
        (this.Ejr = (t, e, n, i, r) => {});
    }
    set Hooked(t) {
      this.cjr = t;
    }
    get Hooked() {
      return this.cjr;
    }
    set UpLength(t) {
      this.mjr = t;
    }
    get UpLength() {
      return this.mjr;
    }
    set GrabPoint(t) {
      this.djr.FromUeVector(t);
    }
    get GrabPoint() {
      return this.djr.ToUeVector();
    }
    set SocketName(t) {
      this.kCe = t;
    }
    get SocketName() {
      return this.kCe;
    }
    set RopeForce(t) {
      this.Cjr = t;
    }
    get RopeForce() {
      return this.Cjr;
    }
    set DistanceRopeToActor(t) {
      this.gjr = t;
    }
    get DistanceRopeToActor() {
      return this.gjr;
    }
    set AirControl(t) {
      this.fjr = t;
    }
    get AirControl() {
      return this.fjr;
    }
    OnStart() {
      var t = this.Entity.CheckGetComponent(3),
        t =
          ((this.ujr = t.Actor),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CustomMovePendulum,
            this.Mjr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharMovementModeChanged,
            this.Ejr,
          ),
          this.Entity.GetComponent(164).CharacterMovement);
      return (this.vjr = t.AirControl), !0;
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMovePendulum,
          this.Mjr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharMovementModeChanged,
          this.Ejr,
        ),
        this.Sjr(),
        !0
      );
    }
    OnTick(t) {
      1 === this.pjr ? (this.pjr = 0) : this.yjr(t);
    }
    DrawCube(t, e) {
      var n, i, r, s;
      t &&
        ((n = 156),
        (n = new UE.LinearColor(n, n, n, n)),
        (i = t.GetLocation()),
        (r = new UE.Vector(10, 10, 10)),
        (r = new UE.Vector(0.5 * r.X, 0.5 * r.Y, 0.5 * r.Z)),
        (s = t.Rotator()),
        UE.KismetSystemLibrary.DrawDebugBox(
          GlobalData_1.GlobalData.World,
          i,
          r,
          n,
          s,
          e,
          30,
        ),
        (i = 0.5),
        (r = UE.KismetMathLibrary.TransformLocation(t, new UE.Vector(i, i, i))),
        (s = UE.KismetMathLibrary.TransformLocation(
          t,
          new UE.Vector(-i, -i, -i),
        )),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          r,
          s,
          n,
          e,
          15,
        ),
        (r = UE.KismetMathLibrary.TransformLocation(
          t,
          new UE.Vector(i, -i, i),
        )),
        (s = UE.KismetMathLibrary.TransformLocation(
          t,
          new UE.Vector(-i, i, i),
        )),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          r,
          s,
          n,
          e,
          15,
        ));
    }
    yjr(t) {
      var e, n, i;
      this.cjr &&
        (this.Anr.FromUeVector(this.ujr.GetVelocity()),
        (e = 1),
        t > LIMIT_FRAME_TIME &&
          ((i =
            t > LIMIT_FRAME_TIME2
              ? t / LIMIT_FRAME_TIME2
              : t / LIMIT_FRAME_TIME),
          1 < (e = this.Anr.Size() / i)) &&
          this.Anr.Z < 0 &&
          ((i = this.Entity.GetComponent(164)),
          (n = t > LIMIT_FRAME_TIME2 ? UPDATE_UP_Z2 : UPDATE_UP_Z),
          CharacterPendulumComponent_1.TmpVector.Set(
            0,
            0,
            (Math.abs(this.Anr.Z) / e) * n,
          ),
          i.MoveCharacter(
            CharacterPendulumComponent_1.TmpVector,
            t * MathUtils_1.MathUtils.MillisecondToSecond,
            "钩锁.ThrowRopeAndSwing",
          )),
        (e = Vector_1.Vector.Create(
          this.ujr.K2_GetActorLocation(),
        )).Subtraction(this.djr, e),
        (n = Vector_1.Vector.DotProduct(this.Anr, e)),
        e.Normalize(),
        (i = Vector_1.Vector.Create()),
        e.Multiply(n, i),
        i.Multiply(this.RopeForce, i),
        (t = this.Entity.GetComponent(164).CharacterMovement),
        i.Size() > LIMIT_FORCE && (i.Normalize(), i.Multiply(LIMIT_FORCE, i)),
        t.AddForce(i.ToUeVector()),
        (t.AirControl = this.fjr));
    }
    Sjr() {
      (this.cjr = !1),
        (this.Entity.GetComponent(164).CharacterMovement.AirControl = this.vjr);
    }
    SetPendulumData(t, e, n, i, r, s, o, h, _, a, E) {
      (this.cjr = !0), (this.pjr = 1);
    }
    Reset() {
      (this.pjr = 0), this.Sjr();
    }
  });
(CharacterPendulumComponent.TmpVector = Vector_1.Vector.Create()),
  (CharacterPendulumComponent = CharacterPendulumComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(63)],
      CharacterPendulumComponent,
    )),
  (exports.CharacterPendulumComponent = CharacterPendulumComponent);
//# sourceMappingURL=CharacterPendulumComponent.js.map
