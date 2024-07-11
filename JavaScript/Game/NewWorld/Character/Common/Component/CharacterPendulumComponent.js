"use strict";
let CharacterPendulumComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, n, i) {
    let r;
    const s = arguments.length;
    let o =
      s < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, n)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, e, n, i);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (r = t[h]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, n, o) : r(e, n)) || o);
    return s > 3 && o && Object.defineProperty(e, n, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPendulumComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const LIMIT_FRAME_TIME = 33;
const LIMIT_FRAME_TIME2 = 50;
const UPDATE_UP_Z = 5;
const UPDATE_UP_Z2 = 11;
const LIMIT_FORCE = 6e5;
let CharacterPendulumComponent =
  (CharacterPendulumComponent_1 = class CharacterPendulumComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Pjr = void 0),
        (this.xjr = !1),
        (this.wjr = 0),
        (this.Bjr = Vector_1.Vector.Create()),
        (this.kCe = ""),
        (this.bjr = 0),
        (this.qjr = 0),
        (this.Gjr = 0),
        (this.Njr = 0),
        (this.Ojr = 0),
        (this.wrr = Vector_1.Vector.Create()),
        (this.kjr = (t) => {}),
        (this.Fjr = (t, e, n, i, r) => {});
    }
    set Hooked(t) {
      this.xjr = t;
    }
    get Hooked() {
      return this.xjr;
    }
    set UpLength(t) {
      this.wjr = t;
    }
    get UpLength() {
      return this.wjr;
    }
    set GrabPoint(t) {
      this.Bjr.FromUeVector(t);
    }
    get GrabPoint() {
      return this.Bjr.ToUeVector();
    }
    set SocketName(t) {
      this.kCe = t;
    }
    get SocketName() {
      return this.kCe;
    }
    set RopeForce(t) {
      this.bjr = t;
    }
    get RopeForce() {
      return this.bjr;
    }
    set DistanceRopeToActor(t) {
      this.qjr = t;
    }
    get DistanceRopeToActor() {
      return this.qjr;
    }
    set AirControl(t) {
      this.Gjr = t;
    }
    get AirControl() {
      return this.Gjr;
    }
    OnStart() {
      var t = this.Entity.CheckGetComponent(3);
      var t =
        ((this.Pjr = t.Actor),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMovePendulum,
          this.kjr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharMovementModeChanged,
          this.Fjr,
        ),
        this.Entity.GetComponent(161).CharacterMovement);
      return (this.Ojr = t.AirControl), !0;
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMovePendulum,
          this.kjr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharMovementModeChanged,
          this.Fjr,
        ),
        this.Vjr(),
        !0
      );
    }
    OnTick(t) {
      this.Njr === 1 ? (this.Njr = 0) : this.Hjr(t);
    }
    DrawCube(t, e) {
      let n, i, r, s;
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
    Hjr(t) {
      let e, n, i;
      this.xjr &&
        (this.wrr.FromUeVector(this.Pjr.GetVelocity()),
        (e = 1),
        t > LIMIT_FRAME_TIME &&
          ((i =
            t > LIMIT_FRAME_TIME2
              ? t / LIMIT_FRAME_TIME2
              : t / LIMIT_FRAME_TIME),
          (e = this.wrr.Size() / i) > 1) &&
          this.wrr.Z < 0 &&
          ((i = this.Entity.GetComponent(161)),
          (n = t > LIMIT_FRAME_TIME2 ? UPDATE_UP_Z2 : UPDATE_UP_Z),
          CharacterPendulumComponent_1.TmpVector.Set(
            0,
            0,
            (Math.abs(this.wrr.Z) / e) * n,
          ),
          i.MoveCharacter(
            CharacterPendulumComponent_1.TmpVector,
            t * MathUtils_1.MathUtils.MillisecondToSecond,
            "钩锁.ThrowRopeAndSwing",
          )),
        (e = Vector_1.Vector.Create(
          this.Pjr.K2_GetActorLocation(),
        )).Subtraction(this.Bjr, e),
        (n = Vector_1.Vector.DotProduct(this.wrr, e)),
        e.Normalize(),
        (i = Vector_1.Vector.Create()),
        e.Multiply(n, i),
        i.Multiply(this.RopeForce, i),
        (t = this.Entity.GetComponent(161).CharacterMovement),
        i.Size() > LIMIT_FORCE && (i.Normalize(), i.Multiply(LIMIT_FORCE, i)),
        t.AddForce(i.ToUeVector()),
        (t.AirControl = this.Gjr));
    }
    Vjr() {
      (this.xjr = !1),
        (this.Entity.GetComponent(161).CharacterMovement.AirControl = this.Ojr);
    }
    SetPendulumData(t, e, n, i, r, s, o, h, _, a, E) {
      (this.xjr = !0), (this.Njr = 1);
    }
    Reset() {
      (this.Njr = 0), this.Vjr();
    }
  });
(CharacterPendulumComponent.TmpVector = Vector_1.Vector.Create()),
  (CharacterPendulumComponent = CharacterPendulumComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(60)],
      CharacterPendulumComponent,
    )),
  (exports.CharacterPendulumComponent = CharacterPendulumComponent);
// # sourceMappingURL=CharacterPendulumComponent.js.map
