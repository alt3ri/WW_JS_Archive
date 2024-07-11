"use strict";
var CharacterLevelShootComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var r,
        h = arguments.length,
        s =
          h < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, o);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (r = t[n]) &&
            (s = (h < 3 ? r(s) : 3 < h ? r(e, i, s) : r(e, i)) || s);
      return 3 < h && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLevelShootComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  Global_1 = require("../../../../Global"),
  LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PROFILE_BULLECT_TRACK =
    "CharacterLevelShootComponent_PreCalculateBulletTrack",
  DEMO_LEVEL_AIM_LINE_EFFECT_PATH =
    "/Game/Aki/Effect/EffectGroup/BigWorld/DA_Fx_Group_SignalSpline.DA_Fx_Group_SignalSpline",
  REFLECT_START_OFFSET = 0.1,
  BULLET_FIRE_BONE_NAME = "WeaponProp01_2",
  MAX_HIT_COUNT_ON_ONE = 10;
let CharacterLevelShootComponent =
  (CharacterLevelShootComponent_1 = class CharacterLevelShootComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.R9r = 5e3),
        (this.dce = !1),
        (this.A9r = void 0),
        (this.U9r = void 0),
        (this.P9r = void 0),
        (this.x9r = void 0),
        (this.w9r = void 0),
        (this.cz = void 0),
        (this.B9r = void 0),
        (this.b9r = void 0),
        (this.q9r = void 0),
        (this.G9r = (t, e) => {});
    }
    OnInitData() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.Lie = this.Entity.GetComponent(185)),
        (this.U9r = new Array()),
        (this.P9r = Vector_1.Vector.Create()),
        (this.x9r = Vector_1.Vector.Create()),
        (this.w9r = Vector_1.Vector.Create()),
        (this.cz = Vector_1.Vector.Create()),
        (this.q9r = Vector_1.Vector.Create()),
        (this.B9r = new Map()),
        !0
      );
    }
    OnActivate() {
      this.N9r(),
        (this.b9r = this.Lie.ListenForTagAddOrRemove(-1167409290, this.G9r));
    }
    End() {
      return (
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.A9r = void 0),
        (this.U9r = void 0),
        (this.P9r = void 0),
        (this.x9r = void 0),
        (this.w9r = void 0),
        (this.cz = void 0),
        this.b9r?.EndTask(),
        (this.b9r = void 0),
        (this.q9r = void 0),
        !(this.B9r = void 0)
      );
    }
    N9r() {
      this.A9r ||
        ((this.A9r = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.A9r.bIsSingle = !0),
        (this.A9r.bIgnoreSelf = !0),
        this.A9r.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
        )),
        (this.A9r.WorldContextObject = this.Hte.Owner);
    }
    OnEnterAimShoot() {
      !this.Lie.HasTag(1441683476) ||
        this.dce ||
        ((this.dce = !0),
        LevelAimLineController_1.LevelAimLineController.PlayEffect(
          DEMO_LEVEL_AIM_LINE_EFFECT_PATH,
        ));
    }
    OnExitAimShoot() {
      this.dce &&
        ((this.dce = !1),
        LevelAimLineController_1.LevelAimLineController.StopEffect());
    }
    OnTick(t) {
      this.dce && this.O9r();
    }
    GetEndPointPosition(t, e) {
      return (
        e.Multiply(this.R9r, this.w9r), t.Addition(this.w9r, this.w9r), this.w9r
      );
    }
    k9r() {
      return CharacterLevelShootComponent_1.Mz.length < 1
        ? Vector_1.Vector.Create()
        : CharacterLevelShootComponent_1.Mz.pop();
    }
    F9r(t) {
      t.Set(0, 0, 0), CharacterLevelShootComponent_1.Mz.push(t);
    }
    V9r() {
      return CharacterLevelShootComponent_1.H9r.length < 1
        ? new Array()
        : CharacterLevelShootComponent_1.H9r.pop();
    }
    Sz(t) {
      for (const e of t) this.F9r(e);
      (t.length = 0), CharacterLevelShootComponent_1.H9r.push(t);
    }
    O9r() {
      var t = this.Hte.SkeletalMesh.GetSocketTransform(
          new UE.FName(BULLET_FIRE_BONE_NAME),
          0,
        ),
        e = Global_1.Global.CharacterCameraManager,
        t =
          (this.x9r.FromUeVector(e.GetActorForwardVector()),
          this.x9r.Multiply(CharacterLevelShootComponent_1.j9r, this.cz),
          this.P9r.FromUeVector(e.GetCameraLocation()),
          this.P9r.Addition(this.cz, this.P9r),
          (this.w9r = this.GetEndPointPosition(this.P9r, this.x9r)),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.A9r,
            this.P9r,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            this.A9r,
            this.w9r,
          ),
          this.P9r.FromUeVector(t ? t.GetLocation() : e.GetCameraLocation()),
          this.U9r.push(this.P9r),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.A9r,
            PROFILE_BULLECT_TRACK,
          ));
      let i = !1,
        o = !1;
      if (t)
        for (var r = this.A9r.HitResult; 0 < r.GetHitCount(); ) {
          var h = this.k9r(),
            s =
              (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(r, 0, h),
              this.U9r.push(h),
              this.U9r[this.U9r.length - 1].Subtraction(
                this.U9r[this.U9r.length - 2],
                this.x9r,
              ),
              this.x9r.Normalize(),
              r.Actors.Get(0)),
            n =
              ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
                s,
              );
          if (!n) {
            i = !0;
            break;
          }
          var a = n.Entity.GetComponent(146);
          if (!a) {
            i = !0;
            break;
          }
          if (this.B9r.has(n.Id)) {
            var _ = this.B9r.get(n.Id);
            for (let t = 0; t < _.length; t += 2) {
              var l = _[t],
                C = _[t + 1];
              if (h.Equals(l) && this.x9r.Equals(C)) {
                o = !0;
                break;
              }
            }
            if (o) break;
            _.push(h);
            var v = this.k9r();
            if (
              (v.DeepCopy(this.x9r), _.push(v), _.length > MAX_HIT_COUNT_ON_ONE)
            ) {
              o = !0;
              break;
            }
          } else {
            var v = this.V9r(),
              c = (v.push(h), this.k9r());
            c.DeepCopy(this.x9r), v.push(c), this.B9r.set(n.Id, v);
          }
          if (!a.CalculateReflectDir(this.x9r, this.x9r, s)) {
            i = !0;
            break;
          }
          this.x9r.Multiply(REFLECT_START_OFFSET, this.cz),
            h.Addition(this.cz, this.cz),
            (this.w9r = this.GetEndPointPosition(h, this.x9r)),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.A9r,
              this.cz,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.A9r,
              this.w9r,
            ),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              this.A9r,
              PROFILE_BULLECT_TRACK,
            );
        }
      let m = -1;
      i || o || (m = this.U9r.push(this.w9r)),
        1 < this.U9r.length
          ? (this.U9r[1].Subtraction(this.U9r[0], this.q9r),
            this.q9r.Normalize(),
            LevelAimLineController_1.LevelAimLineController.UpdatePoints(
              this.U9r,
              0,
            ))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              37,
              "[LevelShoot]Length of SplinePoints less then 2",
            ),
        -1 < m && m < this.U9r.length && this.U9r.splice(m, 1);
      for (let t = 1; t < this.U9r.length; t++) this.F9r(this.U9r[t]);
      for (const E of this.B9r.values()) this.Sz(E);
      (this.U9r.length = 0), this.B9r.clear();
    }
  });
(CharacterLevelShootComponent.j9r = Vector_1.Vector.ForwardVectorProxy),
  (CharacterLevelShootComponent.Mz = new Array()),
  (CharacterLevelShootComponent.H9r = new Array()),
  (CharacterLevelShootComponent = CharacterLevelShootComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(53)],
      CharacterLevelShootComponent,
    )),
  (exports.CharacterLevelShootComponent = CharacterLevelShootComponent);
//# sourceMappingURL=CharacterLevelShootComponent.js.map
