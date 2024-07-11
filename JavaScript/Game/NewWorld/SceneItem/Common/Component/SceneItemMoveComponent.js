"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      r =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (r = (h < 3 ? o(r) : 3 < h ? o(e, i, r) : o(e, i)) || r);
    return 3 < h && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMoveComponent = exports.MoveTarget = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class MoveTarget {
  constructor(t, e, i = 0, s = -1, o = -1) {
    (this.TargetPosData = t),
      (this.MoveTime = e),
      (this.StayTime = i),
      (this.MaxSpees = s),
      (this.Acceleration = o);
  }
}
exports.MoveTarget = MoveTarget;
let SceneItemMoveComponent = class SceneItemMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.o4o = void 0),
      (this.Nln = void 0),
      (this.Oln = void 0),
      (this.kln = !1),
      (this.Anr = Vector_1.Vector.Create()),
      (this.Fln = []),
      (this._ii = 1),
      (this._ae = Vector_1.Vector.Create()),
      (this.Due = Vector_1.Vector.Create()),
      (this.Vln = Vector_1.Vector.Create()),
      (this.Hln = -0),
      (this.jln = !1),
      (this.Wln = !1),
      (this.INn = !1),
      (this.TNn = []),
      (this.hIn = []),
      (this.lIn = () => {
        this.INn = !0;
        for (const t of this.hIn) t(this.Entity);
        this.INn = !1;
        for (const e of this.TNn) this.hIn.push(e);
        this.TNn.length = 0;
      });
  }
  static get Dependencies() {
    return [185, 0];
  }
  get IsMovingPrepareCompleted() {
    return this.Wln;
  }
  get IsMoving() {
    return Info_1.Info.EnableForceTick
      ? 0 < this.Fln.length || 0 === this._ii
      : this.IsMovingPrepareCompleted
        ? this.o4o.IsMoving()
        : 0 < this.Fln.length;
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    return (
      (this.ActorComp = this.Entity.GetComponent(185)),
      (this.Nln = this.Entity.GetComponent(144)),
      (this.Oln = this.Entity.GetComponent(117)),
      this.Nln?.SetEnableMovementSync(!1, "SceneItemMoveComponent OnStart"),
      t &&
        t.GetPbEntityInitData() &&
        !Info_1.Info.EnableForceTick &&
        ((this.o4o = this.ActorComp.Owner.GetComponentByClass(
          UE.KuroSceneItemMoveComponent.StaticClass(),
        )),
        this.o4o?.IsValid() ||
          (this.o4o = this.ActorComp.Owner.AddComponentByClass(
            UE.KuroSceneItemMoveComponent.StaticClass(),
            !1,
            new UE.Transform(),
            !1,
          )),
        this.o4o.SetTickingMoveEnable(!1)),
      !0
    );
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && 0 < this.Fln.length) {
      for (const t of this.Fln)
        this.o4o.AddMoveTarget(
          new UE.Vector(
            t.TargetPosData.X ?? 0,
            t.TargetPosData.Y ?? 0,
            t.TargetPosData.Z ?? 0,
          ),
          t.MoveTime,
          t.StayTime,
        );
      (this.Fln = []),
        this.o4o.SetTickingMoveEnable(!0),
        (this.Oln.IsMoving = !0);
    }
    this.Wln = !0;
  }
  Kln() {
    return Vector_1.Vector.DistSquared(this._ae, this.Vln) >= this.Hln;
  }
  OnTick(t) {
    this.Oln.IsMoving
      ? (this.IsMoving && 2 !== this.o4o.GetSimpleRunState()) ||
        (this.Oln.IsMoving = !1)
      : this.IsMoving &&
        1 === this.o4o.GetSimpleRunState() &&
        (this.Oln.IsMoving = !0),
      this.kln &&
        !this.IsMoving &&
        ((this.kln = !1),
        this.Nln?.SetEnableMovementSync(!1, "SceneItemMoveComponent MoveStop"));
  }
  OnForceTick(t) {
    var e, i;
    super.OnTick(t),
      0 === this._ii
        ? (this.Anr.Addition(this.ActorComp.ActorLocationProxy, this.Vln),
          this.Kln()
            ? (this.ActorComp.SetActorLocation(this.Due.ToUeVector()),
              (this._ii = 1))
            : this.ActorComp.SetActorLocation(this.Vln.ToUeVector()))
        : this.Fln &&
          0 !== this.Fln.length &&
          ((e = this.Fln[0]),
          this.Fln.splice(0, 1),
          (this.Due = Vector_1.Vector.Create(
            e.TargetPosData.X,
            e.TargetPosData.Y,
            e.TargetPosData.Z,
          )),
          e.MoveTime <= MathUtils_1.MathUtils.KindaSmallNumber
            ? this.ActorComp.SetActorLocation(this.Due.ToUeVector())
            : (this._ae.DeepCopy(this.ActorComp.ActorLocationProxy),
              (this.Hln = Vector_1.Vector.DistSquared(this._ae, this.Due)),
              (i = Vector_1.Vector.Create()),
              this.Due.Subtraction(this._ae, i),
              i.Division(
                (e.MoveTime * TimeUtil_1.TimeUtil.InverseMillisecond) / t,
                i,
              ),
              (this.Anr = i),
              (this._ii = 0)));
  }
  Opa(t) {
    !Info_1.Info.EnableForceTick && this.IsMovingPrepareCompleted
      ? (this.o4o.AddMoveTarget(
          new UE.Vector(
            t.TargetPosData.X ?? 0,
            t.TargetPosData.Y ?? 0,
            t.TargetPosData.Z ?? 0,
          ),
          t.MoveTime,
          t.StayTime,
          t.MaxSpees,
          t.Acceleration,
        ),
        this.Oln.IsMoving || this.AddStopMoveCallback(this.lIn),
        this.o4o.SetTickingMoveEnable(!0),
        2 !== this.o4o.GetSimpleRunState() && (this.Oln.IsMoving = !0))
      : this.Fln.push(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Movement",
          32,
          "添加路径点",
          ["moveTargetX", t.TargetPosData.X],
          ["moveTargetY", t.TargetPosData.Y],
          ["moveTargetZ", t.TargetPosData.Z],
          ["Time", t.MoveTime],
        );
  }
  AddMoveTarget(e) {
    if (this.jln)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          32,
          "当前SceneItem正在巡逻中,不可再添加目标点",
          ["PbDataId", this.Entity.GetComponent(0).GetPbDataId()],
        );
    else {
      let t = void 0;
      var i;
      (t =
        e instanceof MoveTarget
          ? e
          : ((i =
              e.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion
                ? -1
                : e.MoveMotion?.Time ?? 0),
            new MoveTarget(e.Point, i))),
        this.Opa(t),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          this.RequestMoveToTarget(t);
    }
  }
  RequestMoveToTarget(t) {
    var e = Protocol_1.Aki.Protocol.sda.create();
    (e.dda = Protocol_1.Aki.Protocol.mda.create()),
      (e.dda.P4n = this.ActorComp.CreatureData.GetCreatureDataId()),
      (e.dda.y5n = {
        X: t.TargetPosData.X,
        Y: t.TargetPosData.Y,
        Z: t.TargetPosData.Z,
      }),
      (e.dda.lda = t.MoveTime),
      (e.dda._da = t.StayTime),
      (e.dda.uda = t.MaxSpees),
      (e.dda.cda = t.Acceleration),
      Net_1.Net.Call(28769, e, (t) => {});
  }
  HandleMoveToTarget(t) {
    t = new MoveTarget(
      { X: t.dda.y5n.X, Y: t.dda.y5n.Y, Z: t.dda.y5n.Z },
      t.dda.lda,
      t.dda._da,
      t.dda.uda,
      t.dda.cda,
    );
    this.Opa(t);
  }
  StartPatrol(t, e, i, s, o, h, r) {
    (this.jln = !0),
      this.o4o.StartMoveWithSpline(t, s, o, h, e, i),
      (this.kln = !0),
      this.Nln?.SetEnableMovementSync(!0, "SceneItemMoveComponent StartPatrol"),
      r && this.AddStopMoveCallback(r);
  }
  StopPatrol() {
    this.jln = !1;
  }
  StopMove() {
    Info_1.Info.EnableForceTick
      ? ((this.Fln = []), (this._ii = 1))
      : this.IsMovingPrepareCompleted
        ? (this.o4o.OnStopCallback.Clear(),
          (this.hIn.length = 0),
          this.o4o.StopAllMove())
        : (this.Fln = []);
  }
  GetNextTarget() {
    var t, e;
    return this.o4o?.IsValid()
      ? ((t = (0, puerts_1.$ref)(new UE.Vector())),
        (e = (0, puerts_1.$ref)(new UE.Vector())),
        {
          HasTarget: this.o4o.GetNextMoveTarget(t, e),
          Target: (0, puerts_1.$unref)(t),
          Velocity: (0, puerts_1.$unref)(e),
        })
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            32,
            "SceneItemMoveComponent不存在",
            ["PbDataId", this.Entity.GetComponent(0).GetPbDataId()],
            ["IsEntityInit", this.Entity.IsInit],
          ),
        { HasTarget: !1, Target: new UE.Vector(), Velocity: new UE.Vector() });
  }
  AddStopMoveCallback(t) {
    this.o4o.OnStopCallback.Add(t);
  }
  RemoveStopMoveCallback(t) {
    this.o4o.OnStopCallback.Remove(t);
  }
  AddStopMoveCallbackWithEntity(t) {
    (this.INn ? this.TNn : this.hIn).push(t);
  }
  RemoveStopMoveCallbackWithEntity(t) {
    this.hIn.includes(t) && this.hIn.splice(this.hIn.indexOf(t), 1);
  }
  ClearStopMoveCallbackWithEntity() {
    this.hIn.length = 0;
  }
};
(SceneItemMoveComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(115)],
  SceneItemMoveComponent,
)),
  (exports.SceneItemMoveComponent = SceneItemMoveComponent);
//# sourceMappingURL=SceneItemMoveComponent.js.map
