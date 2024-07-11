"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var r,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (r = t[a]) && (n = (s < 3 ? r(n) : 3 < s ? r(e, i, n) : r(e, i)) || n);
    return 3 < s && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleQteComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  PROFILE_KEY = "RoleQteComponent_SetQtePosition",
  DEFAULT_ADD_HEIGHT = -1e3,
  SUB_SIZE = 5,
  MAX_MULTI_QTE_DISTANCE = 5e3,
  QTE_LOCKON_CONFIG_ID = 4;
let RoleQteComponent = class RoleQteComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.n2r = void 0),
      (this.Xte = void 0),
      (this.elt = void 0),
      (this.bon = void 0),
      (this.rDr = void 0),
      (this.qon = void 0),
      (this.Gon = void 0),
      (this.Non = void 0),
      (this.Oon = void 0),
      (this.cz = Vector_1.Vector.Create()),
      (this.kon = new Set()),
      (this.IsInQte = !1),
      (this.Fon = (t, e) => {
        EventSystem_1.EventSystem.Emit(
          e
            ? EventDefine_1.EEventName.CharQteActive
            : EventDefine_1.EEventName.CharQteConsume,
          this.Entity.Id,
        );
      }),
      (this.Von = (t) => {
        this.Entity.Id !== t && this.kon.delete(t);
      }),
      (this.sJe = () => {
        this.kon.clear();
      }),
      (this.Hon = (t, e) => {
        e
          ? (this.IsInQte = !0)
          : ((this.IsInQte = !1),
            this.elt.RemoveBuffByTag(-52094810, "QTE结束移除"),
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              this.Entity.Id,
              { ParamType: 1 },
            )?.IsControl() || this.bon.SetRoleDisableWithEffect()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharInQteChanged,
            this.Entity.Id,
            this.IsInQte,
          );
      });
  }
  OnStart() {
    return (
      (this.nXt = this.Entity.GetComponent(3)),
      (this.n2r = this.Entity.CheckGetComponent(17)),
      (this.Xte = this.Entity.CheckGetComponent(185)),
      (this.elt = this.Entity.CheckGetComponent(157)),
      (this.bon = this.Entity.CheckGetComponent(81)),
      (this.rDr = this.Entity.CheckGetComponent(33)),
      (this.qon = this.Xte.ListenForTagAddOrRemove(166024319, this.Fon)),
      (this.Gon = this.Xte.ListenForTagAddOrRemove(1674960297, this.Hon)),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.sJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharQteConsume,
        this.Von,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      this.qon && (this.qon.EndTask(), (this.qon = void 0)),
      this.Gon && (this.Gon.EndTask(), (this.Gon = void 0)),
      (this.Non = void 0),
      (this.Oon = void 0),
      (this.IsInQte = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.sJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharQteConsume,
        this.Von,
      ),
      !0
    );
  }
  IsQteReady(e) {
    if (this.IsInQte) return !1;
    if (!FormationDataController_1.FormationDataController.GlobalIsInFight)
      return !1;
    if (this.Xte.HasTag(1008164187)) return !1;
    if (this.Xte.HasTag(-1732116741)) return !1;
    var t = e.Entity.GetComponent(185);
    if (!t.HasTag(166024319) || t.HasTag(1008164187)) return !1;
    if (!t.HasTag(2014048239) && this.kon.has(e.Id)) return !1;
    t = e.Entity.GetComponent(3);
    if (
      1 < ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length
    ) {
      if (t.IsAutonomousProxy) return !1;
      t = this.nXt.ActorLocationProxy;
      if (
        !ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
          t,
          MAX_MULTI_QTE_DISTANCE,
        ).some((t) => t.EntityHandle === e)
      )
        return !1;
    }
    return !0;
  }
  UseExitSkill(t) {
    var e = new UE.GameplayEventData();
    (e.Instigator = this.nXt.Actor),
      (e.Target = t.Entity.GetComponent(3).Actor),
      this.n2r.SendGameplayEventToActor(
        GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(1574573160),
        e,
      );
  }
  TryExecuteQte(t, e = !1) {
    1 < ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length
      ? this.jon(t)
      : this.Won(t, e);
  }
  Won(t, e = !1) {
    var i = t.Entity.GetComponent(79),
      o = t.Entity.GetComponent(185);
    i.ActivateFusion(this.Entity),
      o.HasTag(2014048239) || i.ClearElementEnergy(this.Entity),
      this.men(t),
      this.bon.SetTeamTag(0),
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
        this.Entity,
        !0,
        "RoleQteComponent.ExecuteQte",
      ),
      this.n2r.SendGameplayEventToActor(
        GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(275057742),
      ),
      this.elt.AddBuff(CharacterBuffIds_1.buffId.QteInvincible, {
        InstigatorId: this.elt.CreatureDataId,
        Reason: "ExecuteQte",
      }),
      e
        ? this.elt.AddBuff(CharacterBuffIds_1.buffId.QteAssistCd, {
            InstigatorId: this.elt.CreatureDataId,
            Reason: "ExecuteQte",
          })
        : this.elt.AddBuff(CharacterBuffIds_1.buffId.QteCd, {
            InstigatorId: this.elt.CreatureDataId,
            Reason: "ExecuteQte",
          });
  }
  jon(t) {
    this.n2r.SendGameplayEventToActor(
      GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(275057742),
    ),
      this.elt.AddBuff(CharacterBuffIds_1.buffId.QteInvincible, {
        InstigatorId: this.elt.CreatureDataId,
        Reason: "ExecuteMultiQte",
      }),
      this.elt.AddBuff(CharacterBuffIds_1.buffId.QteCd, {
        InstigatorId: this.elt.CreatureDataId,
        Reason: "ExecuteMultiQte",
      });
    var e = t.Entity.GetComponent(79);
    t.Entity.GetComponent(185).HasTag(2014048239) ||
      (e.ClearElementEnergy(this.Entity), this.kon.add(t.Id)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.Entity.Id,
        t.Id,
      );
  }
  Kon() {
    this.Non ||
      ((this.Non = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Non.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Non.Radius = this.nXt.ScaledRadius),
      (this.Non.bIsSingle = !0),
      (this.Non.bIgnoreSelf = !0),
      this.Non.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
      ));
  }
  Qon() {
    this.Oon ||
      ((this.Oon = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.Oon.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Oon.bIsSingle = !0),
      (this.Oon.bIgnoreSelf = !0),
      this.Oon.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      this.Oon.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
      ));
  }
  Xon(e, t, i) {
    e.HitResult?.Clear(),
      e.ActorsToIgnore.Empty(),
      e.ActorsToIgnore.Add(t.Owner),
      e.ActorsToIgnore.Add(i.Actor);
    var o = i.Entity.GetComponent(47)?.GetFollowActor();
    if (o) for (let t = 0; t < o.Num(); t++) e.ActorsToIgnore.Add(o.Get(t));
  }
  SetQtePosition(s) {
    var n = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (n) {
      let t = n;
      var a = Vector_1.Vector.Create();
      a.DeepCopy(t.ActorLocationProxy),
        s.ReferenceTarget &&
          (h = this.rDr.SkillTarget)?.Valid &&
          ((t = h.Entity.GetComponent(1)),
          (h = this.rDr.GetTargetTransform()),
          a.DeepCopy(h.GetLocation())),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置位置开始",
            ["targetName", t.Owner?.GetName()],
            ["currentLocation", this.nXt.ActorLocationProxy],
            ["targetLocation", a],
          ),
        this.Kon(),
        this.Xon(this.Non, t, n),
        this.Qon(),
        this.Xon(this.Oon, t, n);
      let e = 0,
        i = 0;
      (0, RegisterComponent_1.isComponentInstance)(t, 3)
        ? ((e = t.ScaledRadius), (i = t.HalfHeight))
        : (0, RegisterComponent_1.isComponentInstance)(t, 182) &&
          ((h = t.GetRadius()), (e = h), (i = h));
      var h = { Location: a, Radius: e, HalfHeight: i };
      let o = void 0,
        r = void 0;
      r =
        1 === s.QteType
          ? ((o = this.$on(n, s, h)), "Qte.设置空中位置")
          : ((o = this.Yon(n, s, h)), "Qte.设置地面位置");
      var a = this.nXt,
        s = a.ActorLocationProxy,
        h = this.Oon,
        n =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            h,
            n.ActorLocationProxy,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(h, o),
          TraceElementCommon_1.TraceElementCommon.LineTrace(h, PROFILE_KEY)),
        h = h.HitResult,
        h =
          (n &&
            h.bBlockingHit &&
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(h, 0, o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Character",
                49,
                "Qte设置位置，与目标位置间有障碍",
                ["碰撞位置", o],
              ),
            (n = this.cz),
            o.Subtraction(s, n),
            n.Normalize(),
            n.Multiply(a.ScaledRadius, n),
            o.Subtraction(n, o)),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 49, "Qte设置位置", ["location", o]),
          this.nXt.SetActorLocation(o.ToUeVector(), r, !1),
          a.ScaledHalfHeight),
        n = Vector_1.Vector.Create(s.X, s.Y, s.Z + h),
        s = Vector_1.Vector.Create(s.X, s.Y, s.Z - h),
        n =
          ((this.Non.Radius = a.ScaledRadius),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Non, n),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, s),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.Non,
            PROFILE_KEY,
          )),
        s = this.Non.HitResult;
      if (n && s.bBlockingHit) {
        const t =
          ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, 0, t),
          (t.Z += h),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 49, "Qte设置位置，地面检测修正位置", [
              "location",
              t,
            ]),
          a.SetActorLocation(t.ToUeVector(), "Qte.修正位置", !1);
      }
      s.Clear();
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          23,
          "GetQtePosition error, currentRole not found",
        );
  }
  $on(t, e, i) {
    let o = e.Length;
    var r = Vector_1.Vector.Create(),
      s =
        (t.ActorLocationProxy.Subtraction(i.Location, r),
        r.IsNearlyZero() ? r.DeepCopy(t.ActorForwardProxy) : (o += i.Radius),
        (r.Z = 0),
        r.RotateAngleAxis(e.Rotate, Vector_1.Vector.UpVectorProxy, r),
        r.Normalize(),
        r.Multiply(o, r),
        Vector_1.Vector.Create()),
      r =
        (s.DeepCopy(i.Location),
        s.Addition(r, s),
        (s.Z += e.Height),
        t.ActorLocationProxy),
      r =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Non, r),
        (s.Z += i.HalfHeight / 2),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, s),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置空中位置，检测开始",
            ["开始位置", r],
            ["结束位置", s],
          ),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          t.Actor.CapsuleComponent,
          this.Non,
          PROFILE_KEY,
          PROFILE_KEY,
        )),
      n = this.Non.HitResult;
    return (
      (s.Z -= i.HalfHeight / 2),
      r &&
        n.bBlockingHit &&
        ((r = Vector_1.Vector.Create()),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Non.HitResult,
          0,
          r,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置空中位置，检测结果",
            ["障碍物", n.Actors.Get(0)?.GetName()],
            ["碰撞位置", r],
          ),
        (n = this.cz),
        t.ActorLocationProxy.Subtraction(r, n),
        (n.Z = 0),
        n.Normalize(),
        (i = i.Radius + t.GetRadius()),
        n.Multiply(i, n),
        s.DeepCopy(r),
        s.Addition(n, s),
        (s.Z += e.Height)),
      s
    );
  }
  Yon(t, e, i) {
    var o = Vector_1.Vector.Create(),
      r = (o.DeepCopy(i.Location), i.HalfHeight - SUB_SIZE),
      s = ((o.Z += r), Vector_1.Vector.Create()),
      r =
        (t.ActorLocationProxy.Subtraction(i.Location, s),
        s.IsNearlyZero() && s.DeepCopy(t.ActorForwardProxy),
        (s.Z = 0),
        s.RotateAngleAxis(e.Rotate, Vector_1.Vector.UpVectorProxy, s),
        s.Normalize(),
        r + e.Height - DEFAULT_ADD_HEIGHT),
      n = t.Actor.CharacterMovement.K2_GetWalkableFloorAngle(),
      i = e.Length + i.Radius;
    let a = this.Jon(o, s, i, r, n);
    return (
      a ||
        (s.Normalize(),
        s.Multiply(-1, s),
        (a =
          (a = this.Jon(o, s, i, r, n)) ||
          Vector_1.Vector.Create(t.ActorLocationProxy))),
      (a.Z += e.Height),
      a
    );
  }
  Jon(t, e, i, o, r) {
    var s = this.nXt.Actor.CapsuleComponent,
      n = (e.Multiply(i, e), Vector_1.Vector.Create()),
      t = (n.DeepCopy(t), Vector_1.Vector.Create()),
      e =
        (t.DeepCopy(n),
        t.Addition(e, t),
        this.Non.HitResult?.Clear(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置地面位置，延输入方向检测开始",
            ["开始位置", n],
            ["结束位置", t],
          ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Non, n),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, t),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          s,
          this.Non,
          PROFILE_KEY,
          PROFILE_KEY,
        ));
    let a = this.Non.HitResult;
    var h = Vector_1.Vector.Create(),
      _ = Vector_1.Vector.Create();
    if ((n.DeepCopy(t), e && a.bBlockingHit)) {
      if (
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(a, 0, h),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置地面位置，延输入方向检测结果",
            ["障碍数量", a.Actors.Num()],
            ["障碍物", a.Actors.Get(0)?.GetName()],
            ["碰撞位置", h],
          ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(a, 0, _),
        r <
          MathUtils_1.MathUtils.GetAngleByVectorDot(
            _,
            Vector_1.Vector.UpVectorProxy,
          ))
      )
        return;
      n.DeepCopy(h);
    }
    i = i / Math.tan(r * MathUtils_1.MathUtils.DegToRad) + o;
    if (
      (t.DeepCopy(n),
      (t.Z -= i),
      this.Non.HitResult?.Clear(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          49,
          "Qte设置地面位置，垂直方向检测开始",
          ["开始位置", n],
          ["结束位置", t],
        ),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Non, n),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, t),
      (e = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        s,
        this.Non,
        PROFILE_KEY,
        PROFILE_KEY,
      )),
      (a = this.Non.HitResult),
      h.Reset(),
      _.Reset(),
      e && a.bBlockingHit)
    )
      return (
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(a, 0, h),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置地面位置，垂直方向检测结果",
            ["障碍数量", a.Actors.Num()],
            ["障碍物", a.Actors.Get(0)?.GetName()],
            ["碰撞位置", h],
          ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(a, 0, _),
        r <
        MathUtils_1.MathUtils.GetAngleByVectorDot(
          _,
          Vector_1.Vector.UpVectorProxy,
        )
          ? void 0
          : h
      );
  }
  men(t) {
    var e = t.Entity.GetComponent(33);
    e.SkillTarget?.Valid &&
    e.SkillTarget?.Entity?.Active &&
    !e.SkillTarget.Entity.GetComponent(185)?.HasTag(1008164187)
      ? ((this.rDr.SkillTarget = e.SkillTarget),
        (this.rDr.SkillTargetSocket = e.SkillTargetSocket))
      : ((e = t.Entity.GetComponent(29)).SelectSoftLockTarget(
          QTE_LOCKON_CONFIG_ID,
        ),
        (this.rDr.SkillTarget = e.GetCurrentTarget()),
        (this.rDr.SkillTargetSocket = e.GetCurrentTargetSocketName()));
  }
};
(RoleQteComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(86)],
  RoleQteComponent,
)),
  (exports.RoleQteComponent = RoleQteComponent);
//# sourceMappingURL=RoleQteComponent.js.map
