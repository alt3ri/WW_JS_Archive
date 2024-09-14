"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterController = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PROFILE_KEY = "DetectCapsuleSizeLocation",
  HIT_TIME_THREHOLD = 0.95,
  SIN_COS_45 = Math.cos(Math.PI / 4);
class CharacterController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (this.Uqn = new Date()), !0;
  }
  static OnTick(t) {
    CharacterController.dKo() || CharacterController.CKo(),
      Net_1.Net.IsFinishLogin() && this.Rqn();
  }
  static async Rqn() {
    var t,
      e = new Date();
    3 <= (e.getTime() - this.Uqn.getTime()) / 1e3 / 60 &&
      ((this.Uqn = e),
      0 < (e = cpp_1.FuncOpenLibrary.GetEBuffer()).byteLength) &&
      ((t = new Uint8Array(e)),
      (t = new Uint8Array(t)),
      cpp_1.FuncOpenLibrary.FreeArrayBuffer(e),
      ((e = new Protocol_1.Aki.Protocol.CombatMessage.Hfs()).Ujn = t),
      (t = await Net_1.Net.CallAsync(18767, e)),
      cpp_1.FuncOpenLibrary.SetIsCheckEncrypt(t?.JLs ?? ""));
  }
  static InitData(t, e, r) {
    return ModelManager_1.ModelManager.CharacterModel.InitData(t, e, r);
  }
  static Respawn(t, e, r = 0, a) {
    return ModelManager_1.ModelManager.CharacterModel.Respawn(t, e, r, a);
  }
  static AddEntityToAwakeQueue(t, e) {
    ModelManager_1.ModelManager.CharacterModel.AddEntityToAwakeQueue(t, e);
  }
  static InitEntity(t) {
    ModelManager_1.ModelManager.CharacterModel.InitEntity(t);
  }
  static StartEntity(t) {
    ModelManager_1.ModelManager.CharacterModel.StartEntity(t);
  }
  static ActivateEntity(t) {
    ModelManager_1.ModelManager.CharacterModel.ActivateEntity(t);
  }
  static Destroy(t) {
    return ModelManager_1.ModelManager.CharacterModel.Destroy(t);
  }
  static DestroyToLru(t) {
    return ModelManager_1.ModelManager.CharacterModel.DestroyToLru(t);
  }
  static CreateEntity(t, e) {
    return ModelManager_1.ModelManager.CharacterModel.CreateEntity(t, e);
  }
  static SpawnEntity(t) {
    return ModelManager_1.ModelManager.CharacterModel.SpawnEntity(t);
  }
  static GetCharacterActorComponent(t) {
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t.Valid && t.Actor) return t;
    }
  }
  static GetCharacterActorComponentById(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t?.Valid) return t;
    }
  }
  static GetCharacter(t) {
    return t?.Valid && (t = t.GetComponent(3))?.Valid && t.Actor
      ? t.Actor
      : void 0;
  }
  static GetActor(t) {
    return t?.Valid && (t = this.GetActorComponent(t)) ? t.Owner : void 0;
  }
  static GetActorByEntity(t) {
    return t?.Valid && (t = t.GetComponent(1)) ? t.Owner : void 0;
  }
  static GetActorComponent(t) {
    let e = t.Entity.GetComponent(187);
    return (e = e || t.Entity.GetComponent(2));
  }
  static GetTsBaseCharacterByEntity(t) {
    return t.Entity.GetComponent(3)?.Actor;
  }
  static GetUeTsBaseCharacterByEntity(t) {
    t = t.GetComponent(3);
    if (t) return t.Actor;
  }
  static GetEntityByUeTsBaseCharacter(t) {
    return t.CharacterActorComponent.Entity;
  }
  static SetTimeDilation(t) {
    var e = ModelManager_1.ModelManager.CreatureModel;
    for (const r of e.GetAllEntities()) r.IsInit && r.Entity.SetTimeDilation(t);
    for (const a of e.DelayRemoveContainer.GetAllEntities())
      a.IsInit && a.Entity.SetTimeDilation(t);
  }
  static CN() {
    return (
      !this.gKo &&
      0 === ModelManager_1.ModelManager.CharacterModel.AwakeQueue.Size
    );
  }
  static AwakeEntity() {
    var t = ModelManager_1.ModelManager.CharacterModel;
    if (this.gKo) {
      var e = this.gKo[2];
      if (((this.gKo = void 0), e())) return;
    }
    if (t.AwakeQueue.Size)
      for (var r; (r = t.PopAwakeHandler()); )
        if ((0, r[1])()) return void (this.gKo = r);
  }
  static SortItem(t) {
    !t?.Valid ||
      2 & t.Entity.Flag ||
      t.Entity.GetComponent(0).GetRemoveState() ||
      ModelManager_1.ModelManager.CharacterModel.SortItem(t);
  }
  static OnChangeMode() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
      for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        t.Entity.GetComponent(40)?.SwitchControl(!0);
    return !0;
  }
  static Yaa(t, e, r, a, o) {
    return (
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, a),
      TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        t,
        e,
        PROFILE_KEY,
        PROFILE_KEY,
      ) && e.HitResult
        ? e.HitResult.bStartPenetrating ||
          e.HitResult.TimeArray.Get(0) <= MathUtils_1.MathUtils.SmallNumber
          ? 1
          : (TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, a),
            TraceElementCommon_1.TraceElementCommon.ShapeTrace(
              t,
              r,
              PROFILE_KEY,
              PROFILE_KEY,
            ) &&
            r.HitResult &&
            0 < r.HitResult.GetHitCount() &&
            r.HitResult.TimeArray.Get(0) < HIT_TIME_THREHOLD
              ? 0
              : (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                  e.HitResult,
                  0,
                  o,
                ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Movement",
                    6,
                    "DetectCapsuleSizeLocation Found",
                    ["Out", o],
                  ),
                2))
        : 0
    );
  }
  static FindSpaceForExitClimb(t, e, r, a, o) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Movement",
        6,
        "FindSpaceForExitClimb Start",
        ["Id", t.Entity.Id],
        ["HalfHeight", e],
        ["Radius", r],
        ["MinRadius", a],
        ["Location", t.ActorLocationProxy],
      );
    var i,
      n,
      s = t.Actor.CapsuleComponent;
    return s
      ? (((i =
          ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace()).WorldContextObject =
          t.Actor),
        (i.Radius = r),
        (i.HalfHeight = e),
        t.ActorUpProxy.Multiply(1, this.Lz),
        this.Lz.AdditionEqual(t.ActorLocationProxy),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.Lz),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          i,
          t.ActorLocationProxy,
        ),
        i.ActorsToIgnore.Empty(),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          s,
          i,
          PROFILE_KEY,
          PROFILE_KEY,
        ) && i.HitResult
          ? !i.HitResult.bStartPenetrating &&
            i.HitResult.TimeArray.Get(0) > MathUtils_1.MathUtils.SmallNumber
            ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                i.HitResult,
                0,
                o,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Movement",
                  6,
                  "FindSpaceForExitClimb No Start Penetrate",
                  ["Out", o],
                ),
              2)
            : (((n =
                ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject =
                t.Actor),
              (n.Radius = a),
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                n,
                t.ActorLocationProxy,
              ),
              t.ActorUpProxy.Multiply(e / 2, this.Tz),
              t.ActorLocationProxy.Addition(this.Tz, this.Lz),
              2 === (a = this.Yaa(s, i, n, this.Lz, o)) ||
              (1 === a &&
                (this.Lz.AdditionEqual(this.Tz),
                2 === this.Yaa(s, i, n, this.Lz, o))) ||
              (t.ActorForwardProxy.Multiply(-r, this.Tz),
              t.ActorLocationProxy.Addition(this.Tz, this.Lz),
              2 === (a = this.Yaa(s, i, n, this.Lz, o))) ||
              (1 === a &&
                (this.Lz.AdditionEqual(this.Tz),
                2 === this.Yaa(s, i, n, this.Lz, o))) ||
              (t.ActorUpProxy.Multiply(e, this.Lz),
              this.Tz.AdditionEqual(this.Lz),
              t.ActorLocationProxy.Addition(this.Tz, this.Lz),
              2 === (a = this.Yaa(s, i, n, this.Lz, o))) ||
              (1 === a &&
                (this.Lz.AdditionEqual(this.Tz),
                2 === this.Yaa(s, i, n, this.Lz, o)))
                ? 2
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Movement",
                      6,
                      "FindSpaceForExitClimb NoSafety",
                    ),
                  1))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Movement", 6, "FindSpaceForExitClimb No Hit"),
            0))
      : 0;
  }
  static FindSpaceForSafety(t, e, r, a) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Movement",
        6,
        "FindSpaceForSafety Start",
        ["Id", t.Entity.Id],
        ["HalfHeight", e],
        ["Radius", r],
        ["Location", t.ActorLocationProxy],
      );
    var o = t.Actor.CapsuleComponent;
    if (o) {
      var i = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace(),
        n =
          ((i.WorldContextObject = t.Actor),
          (i.Radius = r),
          (i.HalfHeight = e),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            i,
            t.ActorLocationProxy,
          ),
          ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()),
        r =
          ((n.WorldContextObject = t.Actor),
          (n.Radius = 1),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            t.ActorLocationProxy,
          ),
          [
            Vector_1.Vector.Create(0, 0, e / 2),
            Vector_1.Vector.Create(4 * r, 0, e / 2),
            Vector_1.Vector.Create(4 * -r, 0, e / 2),
            Vector_1.Vector.Create(0, 4 * r, e / 2),
            Vector_1.Vector.Create(0, 4 * -r, e / 2),
            Vector_1.Vector.Create(
              SIN_COS_45 * r * 4,
              SIN_COS_45 * r * 4,
              e / 2,
            ),
            Vector_1.Vector.Create(
              -SIN_COS_45 * r * 4,
              SIN_COS_45 * r * 4,
              e / 2,
            ),
            Vector_1.Vector.Create(
              SIN_COS_45 * r * 4,
              -SIN_COS_45 * r * 4,
              e / 2,
            ),
            Vector_1.Vector.Create(
              -SIN_COS_45 * r * 4,
              -SIN_COS_45 * r * 4,
              e / 2,
            ),
          ]);
      for (const c of r) {
        t.ActorQuatProxy.RotateVector(c, this.Tz),
          t.ActorLocationProxy.Addition(this.Tz, this.Lz);
        var s = this.Yaa(o, i, n, this.Lz, a);
        if (2 === s) return !0;
        if (
          1 === s &&
          (this.Lz.AdditionEqual(this.Tz), 2 === this.Yaa(o, i, n, this.Lz, a))
        )
          return !0;
      }
    }
    return !1;
  }
}
((exports.CharacterController = CharacterController).IsTickEvenPausedInternal =
  !0),
  (CharacterController.gKo = void 0),
  (CharacterController.Uqn = void 0),
  (CharacterController.dKo = () => CharacterController.CN()),
  (CharacterController.CKo = () => {
    CharacterController.AwakeEntity();
  }),
  (CharacterController.Lz = Vector_1.Vector.Create()),
  (CharacterController.Tz = Vector_1.Vector.Create());
//# sourceMappingURL=CharacterController.js.map
