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
        (this.h9r = 5e3),
        (this.dce = !1),
        (this.l9r = void 0),
        (this._9r = void 0),
        (this.u9r = void 0),
        (this.c9r = void 0),
        (this.m9r = void 0),
        (this.cz = void 0),
        (this.d9r = void 0),
        (this.C9r = void 0),
        (this.g9r = void 0),
        (this.f9r = (t, e) => {});
    }
    OnInitData() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.Lie = this.Entity.GetComponent(188)),
        (this._9r = new Array()),
        (this.u9r = Vector_1.Vector.Create()),
        (this.c9r = Vector_1.Vector.Create()),
        (this.m9r = Vector_1.Vector.Create()),
        (this.cz = Vector_1.Vector.Create()),
        (this.g9r = Vector_1.Vector.Create()),
        (this.d9r = new Map()),
        !0
      );
    }
    OnActivate() {
      this.p9r(),
        (this.C9r = this.Lie.ListenForTagAddOrRemove(-1167409290, this.f9r));
    }
    End() {
      return (
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.l9r = void 0),
        (this._9r = void 0),
        (this.u9r = void 0),
        (this.c9r = void 0),
        (this.m9r = void 0),
        (this.cz = void 0),
        this.C9r?.EndTask(),
        (this.C9r = void 0),
        (this.g9r = void 0),
        !(this.d9r = void 0)
      );
    }
    p9r() {
      this.l9r ||
        ((this.l9r = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.l9r.bIsSingle = !0),
        (this.l9r.bIgnoreSelf = !0),
        this.l9r.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
        )),
        (this.l9r.WorldContextObject = this.Hte.Owner);
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
      this.dce && this.v9r();
    }
    GetEndPointPosition(t, e) {
      return (
        e.Multiply(this.h9r, this.m9r), t.Addition(this.m9r, this.m9r), this.m9r
      );
    }
    M9r() {
      return CharacterLevelShootComponent_1.Mz.length < 1
        ? Vector_1.Vector.Create()
        : CharacterLevelShootComponent_1.Mz.pop();
    }
    E9r(t) {
      t.Set(0, 0, 0), CharacterLevelShootComponent_1.Mz.push(t);
    }
    S9r() {
      return CharacterLevelShootComponent_1.y9r.length < 1
        ? new Array()
        : CharacterLevelShootComponent_1.y9r.pop();
    }
    Ez(t) {
      for (const e of t) this.E9r(e);
      (t.length = 0), CharacterLevelShootComponent_1.y9r.push(t);
    }
    v9r() {
      var t = this.Hte.SkeletalMesh.GetSocketTransform(
          new UE.FName(BULLET_FIRE_BONE_NAME),
          0,
        ),
        e = Global_1.Global.CharacterCameraManager,
        t =
          (this.c9r.FromUeVector(e.GetActorForwardVector()),
          this.c9r.Multiply(CharacterLevelShootComponent_1.I9r, this.cz),
          this.u9r.FromUeVector(e.GetCameraLocation()),
          this.u9r.Addition(this.cz, this.u9r),
          (this.m9r = this.GetEndPointPosition(this.u9r, this.c9r)),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.l9r,
            this.u9r,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            this.l9r,
            this.m9r,
          ),
          this.u9r.FromUeVector(t ? t.GetLocation() : e.GetCameraLocation()),
          this._9r.push(this.u9r),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.l9r,
            PROFILE_BULLECT_TRACK,
          ));
      let i = !1,
        o = !1;
      if (t)
        for (var r = this.l9r.HitResult; 0 < r.GetHitCount(); ) {
          var h = this.M9r(),
            s =
              (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(r, 0, h),
              this._9r.push(h),
              this._9r[this._9r.length - 1].Subtraction(
                this._9r[this._9r.length - 2],
                this.c9r,
              ),
              this.c9r.Normalize(),
              r.Actors.Get(0)),
            n =
              ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
                s,
              );
          if (!n) {
            i = !0;
            break;
          }
          var a = n.Entity.GetComponent(148);
          if (!a) {
            i = !0;
            break;
          }
          if (this.d9r.has(n.Id)) {
            var _ = this.d9r.get(n.Id);
            for (let t = 0; t < _.length; t += 2) {
              var l = _[t],
                C = _[t + 1];
              if (h.Equals(l) && this.c9r.Equals(C)) {
                o = !0;
                break;
              }
            }
            if (o) break;
            _.push(h);
            var v = this.M9r();
            if (
              (v.DeepCopy(this.c9r), _.push(v), _.length > MAX_HIT_COUNT_ON_ONE)
            ) {
              o = !0;
              break;
            }
          } else {
            var v = this.S9r(),
              c = (v.push(h), this.M9r());
            c.DeepCopy(this.c9r), v.push(c), this.d9r.set(n.Id, v);
          }
          if (!a.CalculateReflectDir(this.c9r, this.c9r, s)) {
            i = !0;
            break;
          }
          this.c9r.Multiply(REFLECT_START_OFFSET, this.cz),
            h.Addition(this.cz, this.cz),
            (this.m9r = this.GetEndPointPosition(h, this.c9r)),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.l9r,
              this.cz,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.l9r,
              this.m9r,
            ),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              this.l9r,
              PROFILE_BULLECT_TRACK,
            );
        }
      let m = -1;
      i || o || (m = this._9r.push(this.m9r)),
        1 < this._9r.length
          ? (this._9r[1].Subtraction(this._9r[0], this.g9r),
            this.g9r.Normalize(),
            LevelAimLineController_1.LevelAimLineController.UpdatePoints(
              this._9r,
              0,
            ))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              37,
              "[LevelShoot]Length of SplinePoints less then 2",
            ),
        -1 < m && m < this._9r.length && this._9r.splice(m, 1);
      for (let t = 1; t < this._9r.length; t++) this.E9r(this._9r[t]);
      for (const E of this.d9r.values()) this.Ez(E);
      (this._9r.length = 0), this.d9r.clear();
    }
  });
(CharacterLevelShootComponent.I9r = Vector_1.Vector.ForwardVectorProxy),
  (CharacterLevelShootComponent.Mz = new Array()),
  (CharacterLevelShootComponent.y9r = new Array()),
  (CharacterLevelShootComponent = CharacterLevelShootComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(54)],
      CharacterLevelShootComponent,
    )),
  (exports.CharacterLevelShootComponent = CharacterLevelShootComponent);
//# sourceMappingURL=CharacterLevelShootComponent.js.map
