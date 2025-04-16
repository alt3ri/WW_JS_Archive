"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, r) {
    var o,
      s = arguments.length,
      a =
        s < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (a = (s < 3 ? o(a) : 3 < s ? o(e, i, a) : o(e, i)) || a);
    return 3 < s && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleQteComponent =
    exports.MAX_MULTI_QTE_DISTANCE =
    exports.isMultiQte =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  PROFILE_KEY = "RoleQteComponent_SetQtePosition",
  DEFAULT_ADD_HEIGHT = -1e3,
  SUB_SIZE = 5,
  QTE_LOCKON_CONFIG_ID = 4,
  normalQteTag = -658311908;
function isMultiQte() {
  return (
    1 <
    (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
      ? ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize()
      : ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length)
  );
}
(exports.isMultiQte = isMultiQte), (exports.MAX_MULTI_QTE_DISTANCE = 5e3);
let RoleQteComponent = class RoleQteComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.bkr = void 0),
      (this.Xte = void 0),
      (this.m1t = void 0),
      (this.gon = void 0),
      (this.tRr = void 0),
      (this.gFe = void 0),
      (this.von = void 0),
      (this.Mon = void 0),
      (this.cz = Vector_1.Vector.Create()),
      (this.Eon = new Set()),
      (this.IsInQte = !1),
      (this.Zqn = []),
      (this.eGn = new Map()),
      (this.tGn = ""),
      (this.GoBattleActor = void 0),
      (this.Son = (t, e) => {
        EventSystem_1.EventSystem.Emit(
          e
            ? EventDefine_1.EEventName.CharQteActive
            : EventDefine_1.EEventName.CharQteConsume,
          this.Entity.Id,
        );
      }),
      (this.yon = (t) => {
        this.Entity.Id !== t && this.Eon.delete(t);
      }),
      (this.pze = () => {
        this.Eon.clear();
      }),
      (this.Ion = (t, e) => {
        e
          ? (this.IsInQte = !0)
          : ((this.IsInQte = !1),
            this.m1t.RemoveBuffByTag(-52094810, "QTE结束移除"),
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              this.Entity.Id,
              { ParamType: 1 },
            )?.IsControl() || this.gon.DisableRoleWithEffect()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharInQteChanged,
            this.Entity.Id,
            this.IsInQte,
          );
      }),
      (this.iGn = (t, e) => {
        e
          ? (this.eGn.set(
              t,
              ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().get(
                t,
              ),
            ),
            this.rGn())
          : ((e = this.eGn.get(t)),
            this.eGn.delete(t),
            this.tGn === e && this.rGn());
      });
  }
  OnStart() {
    return (
      (this.n$t = this.Entity.GetComponent(3)),
      (this.bkr = this.Entity.CheckGetComponent(18)),
      (this.Xte = this.Entity.CheckGetComponent(203)),
      (this.m1t = this.Entity.CheckGetComponent(172)),
      (this.gon = this.Entity.CheckGetComponent(91)),
      (this.tRr = this.Entity.CheckGetComponent(39)),
      (this.gFe = this.Entity.CheckGetComponent(89)),
      this.Zqn.push(this.Xte.ListenForTagAddOrRemove(166024319, this.Son)),
      this.Zqn.push(this.Xte.ListenForTagAddOrRemove(1674960297, this.Ion)),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.pze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharQteConsume,
        this.yon,
      ),
      this.oGn(),
      !0
    );
  }
  OnEnd() {
    for (const t of this.Zqn) t.EndTask();
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.pze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharQteConsume,
        this.yon,
      ),
      !0
    );
  }
  oGn() {
    this.Xte.AddTag(normalQteTag);
    var t =
        ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().values(),
      e = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    for (const r of t) {
      var i = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, r).QteTag.TagId;
      this.Zqn.push(this.Xte.ListenForTagAddOrRemove(i, this.iGn)),
        this.Xte.HasTag(i) && this.eGn.set(i, r);
    }
    this.rGn();
  }
  IsQteReady(e) {
    if (this.IsInQte) return !1;
    if (!FormationDataController_1.FormationDataController.GlobalIsInFight)
      return !1;
    if (this.Xte.HasTag(1008164187)) return !1;
    if (this.Xte.HasTag(-373980873)) return !1;
    var t = this.GetQteTagData();
    if (!t) return !1;
    if (this.Xte.HasTag(t.NoTag.TagId)) return !1;
    t = e.Entity.GetComponent(203);
    if (!t.HasTag(166024319) || t.HasTag(1008164187)) return !1;
    if (!t.HasTag(2014048239) && this.Eon.has(e.Id)) return !1;
    t = e.Entity.GetComponent(3);
    if (isMultiQte()) {
      if (t.IsAutonomousProxy) return !1;
      if (
        !ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
          this.n$t.ActorLocationProxy,
          exports.MAX_MULTI_QTE_DISTANCE,
        ).some((t) => t.EntityHandle === e)
      )
        return !1;
    }
    return !0;
  }
  UseExitSkill(t) {
    var e = t.Entity.GetComponent(96).GetQteTagData();
    e &&
      "None" !== e.ExitSkillTrigger.TagName &&
      ((this.GoBattleActor = t.Entity.GetComponent(3).Actor),
      ((t = new UE.GameplayEventData()).Instigator = this.n$t.Actor),
      (t.Target = this.GoBattleActor),
      this.bkr.SendGameplayEventToActor(e.ExitSkillTrigger, t),
      (this.GoBattleActor = void 0));
  }
  ExecuteQte(t) {
    var e = this.GetQteTagData();
    if (!e || "None" === e.QteTrigger.TagName) return !1;
    var i = this.R7a(t);
    this.QZr(t),
      this.gon.InterruptDisableWithEffect(),
      this.gon.SetTeamTag(0),
      this.Entity.EnableByKey(1, !0),
      this.bkr.SendGameplayEventToActor(e.QteTrigger);
    for (let t = 0; t < e.QteBuffs.Num(); t++)
      this.m1t.AddBuff(Number(e.QteBuffs.Get(t)), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: i,
        Reason: "ExecuteQte",
      });
    var r = t.Entity.GetComponent(89),
      o = t.Entity.GetComponent(203);
    if ((r.TriggerEvents(this.Entity), !o.HasTag(2014048239)))
      for (let t = 0; t < e.ConsumeBuffs.Num(); t++)
        r.ClearElementEnergy(this.Entity, Number(e.ConsumeBuffs.Get(t)));
    return (
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharExecuteQte,
        this.Entity.Id,
        t.Id,
      ),
      !0
    );
  }
  ExecuteMultiQte(t) {
    var e = this.GetQteTagData();
    if (!e || "None" === e.QteTrigger.TagName) return !1;
    var i = this.R7a(t);
    this.bkr.SendGameplayEventToActor(e.QteTrigger);
    for (let t = 0; t < e.QteBuffs.Num(); t++)
      this.m1t.AddBuff(Number(e.QteBuffs.Get(t)), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: i,
        Reason: "ExecuteQte",
      });
    var r = t.Entity.GetComponent(89),
      o = t.Entity.GetComponent(203);
    if ((r.TriggerEvents(this.Entity), !o.HasTag(2014048239))) {
      if (2 < ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize())
        r.ClearElementEnergy(this.Entity, CharacterBuffIds_1.buffId.ConsumeQte);
      else
        for (let t = 0; t < e.ConsumeBuffs.Num(); t++)
          r.ClearElementEnergy(this.Entity, Number(e.ConsumeBuffs.Get(t)));
      this.Eon.add(t.Id);
    }
    return (
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.Entity.Id,
        t.Id,
      ),
      !0
    );
  }
  Don() {
    this.von ||
      ((this.von = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.von.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.von.Radius = this.n$t.ScaledRadius),
      (this.von.bIsSingle = !0),
      (this.von.bIgnoreSelf = !0),
      this.von.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
      ));
  }
  Ron() {
    this.Mon ||
      ((this.Mon = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.Mon.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Mon.bIsSingle = !0),
      (this.Mon.bIgnoreSelf = !0),
      this.Mon.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      this.Mon.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
      ));
  }
  Uon(e, t, i) {
    e.HitResult?.Clear(),
      e.ActorsToIgnore.Empty(),
      e.ActorsToIgnore.Add(t.Owner),
      e.ActorsToIgnore.Add(i.Actor);
    var r = i.Entity.GetComponent(55)?.GetFollowActor();
    if (r) for (let t = 0; t < r.Num(); t++) e.ActorsToIgnore.Add(r.Get(t));
  }
  SetQtePosition(s) {
    var a = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (a) {
      let t = a;
      var n = Vector_1.Vector.Create();
      n.DeepCopy(t.ActorLocationProxy),
        s.ReferenceTarget &&
          (_ = this.tRr.SkillTarget)?.Valid &&
          ((t = _.Entity.GetComponent(1)),
          (_ = this.tRr.GetTargetTransform()),
          n.DeepCopy(_.GetLocation())),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            48,
            "Qte设置位置开始",
            ["targetName", t.Owner?.GetName()],
            ["currentLocation", this.n$t.ActorLocationProxy],
            ["targetLocation", n],
          ),
        this.Don(),
        this.Uon(this.von, t, a),
        this.Ron(),
        this.Uon(this.Mon, t, a);
      let e = 0,
        i = 0;
      (0, RegisterComponent_1.isComponentInstance)(t, 3)
        ? ((e = t.ScaledRadius), (i = t.HalfHeight))
        : (0, RegisterComponent_1.isComponentInstance)(t, 200) &&
          ((_ = t.GetRadius()), (e = _), (i = _));
      var _ = { Location: n, Radius: e, HalfHeight: i };
      let r = void 0,
        o = void 0;
      o =
        1 === s.QteType
          ? ((r = this.Aon(a, s, _)), "Qte.设置空中位置")
          : ((r = this.Pon(a, s, _)), "Qte.设置地面位置");
      var n = this.n$t,
        s = n.ActorLocationProxy,
        _ = this.Mon,
        a =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            _,
            a.ActorLocationProxy,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(_, r),
          TraceElementCommon_1.TraceElementCommon.LineTrace(_, PROFILE_KEY)),
        _ = _.HitResult,
        _ =
          (a &&
            _.bBlockingHit &&
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(_, 0, r),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Character",
                48,
                "Qte设置位置，与目标位置间有障碍",
                ["碰撞位置", r],
              ),
            (a = this.cz),
            r.Subtraction(s, a),
            a.Normalize(),
            a.Multiply(n.ScaledRadius, a),
            r.Subtraction(a, r)),
          n.ScaledHalfHeight),
        s = Vector_1.Vector.Create(r),
        a = Vector_1.Vector.Create(r),
        s =
          (GravityUtils_1.GravityUtils.AddZnInGravityForActor(n, s, _),
          GravityUtils_1.GravityUtils.AddZnInGravityForActor(n, a, -_),
          (this.von.Radius = n.ScaledRadius),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, s),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, a),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.von,
            PROFILE_KEY,
          )),
        a = this.von.HitResult;
      s && a.bBlockingHit
        ? ((s =
            ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation),
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(a, 0, s),
          GravityUtils_1.GravityUtils.AddZnInGravityForActor(n, s, _),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 48, "Qte设置位置，地面检测修正位置", [
              "fixedLocation",
              s,
            ]),
          n.SetActorLocation(s.ToUeVector(), "Qte.修正位置", !1))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 48, "Qte设置位置", ["location", r]),
          n.SetActorLocation(r.ToUeVector(), o, !1));
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          22,
          "GetQtePosition error, currentRole not found",
        );
  }
  Aon(t, e, i) {
    let r = e.Length;
    var o = Vector_1.Vector.Create(),
      s =
        (t.ActorLocationProxy.Subtraction(i.Location, o),
        o.IsNearlyZero() ? o.DeepCopy(t.ActorForwardProxy) : (r += i.Radius),
        GravityUtils_1.GravityUtils.SetZnInGravityForActor(t, o, 0),
        o.RotateAngleAxis(e.Rotate, t.MoveComp.GravityUp, o),
        o.Normalize(),
        o.Multiply(r, o),
        Vector_1.Vector.Create()),
      o =
        (s.DeepCopy(i.Location),
        s.Addition(o, s),
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, s, e.Height),
        t.ActorLocationProxy),
      o =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, o),
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(
          t,
          s,
          i.HalfHeight / 2,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, s),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            48,
            "Qte设置空中位置，检测开始",
            ["开始位置", o],
            ["结束位置", s],
          ),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          t.Actor.CapsuleComponent,
          this.von,
          PROFILE_KEY,
          PROFILE_KEY,
        )),
      a = this.von.HitResult;
    return (
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(
        t,
        s,
        -i.HalfHeight / 2,
      ),
      o &&
        a.bBlockingHit &&
        ((o = Vector_1.Vector.Create()),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.von.HitResult,
          0,
          o,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            48,
            "Qte设置空中位置，检测结果",
            ["障碍物", a.Actors.Get(0)?.GetName()],
            ["碰撞位置", o],
          ),
        (a = this.cz),
        t.ActorLocationProxy.Subtraction(o, a),
        GravityUtils_1.GravityUtils.SetZnInGravityForActor(t, a, 0),
        a.Normalize(),
        (i = i.Radius + t.GetRadius()),
        a.Multiply(i, a),
        s.DeepCopy(o),
        s.Addition(a, s),
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, s, e.Height)),
      s
    );
  }
  Pon(t, e, i) {
    var r = Vector_1.Vector.Create(),
      o = (r.DeepCopy(i.Location), i.HalfHeight - SUB_SIZE),
      s =
        (GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, r, o),
        Vector_1.Vector.Create()),
      o =
        (t.ActorLocationProxy.Subtraction(i.Location, s),
        s.IsNearlyZero() && s.DeepCopy(t.ActorForwardProxy),
        GravityUtils_1.GravityUtils.SetZnInGravityForActor(t, s, 0),
        s.RotateAngleAxis(e.Rotate, t.MoveComp.GravityUp, s),
        s.Normalize(),
        o + e.Height - DEFAULT_ADD_HEIGHT),
      a = t.Actor.CharacterMovement.K2_GetWalkableFloorAngle(),
      i = e.Length + i.Radius;
    let n = this.xon(r, s, i, o, a);
    return (
      n ||
        (s.Normalize(),
        s.Multiply(-1, s),
        (n =
          (n = this.xon(r, s, i, o, a)) ||
          Vector_1.Vector.Create(t.ActorLocationProxy))),
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, n, e.Height),
      n
    );
  }
  xon(t, e, i, r, o) {
    var s = this.n$t.Actor.CapsuleComponent,
      a = (e.Multiply(i, e), Vector_1.Vector.Create()),
      t = (a.DeepCopy(t), Vector_1.Vector.Create()),
      e =
        (t.DeepCopy(a),
        t.Addition(e, t),
        this.von.HitResult?.Clear(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            48,
            "Qte设置地面位置，延输入方向检测开始",
            ["开始位置", a],
            ["结束位置", t],
          ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, a),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, t),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          s,
          this.von,
          PROFILE_KEY,
          PROFILE_KEY,
        ));
    let n = this.von.HitResult;
    var _ = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create();
    if ((a.DeepCopy(t), e && n.bBlockingHit)) {
      if (
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, _),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            48,
            "Qte设置地面位置，延输入方向检测结果",
            ["障碍数量", n.Actors.Num()],
            ["障碍物", n.Actors.Get(0)?.GetName()],
            ["碰撞位置", _],
          ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, 0, h),
        o <
          MathUtils_1.MathUtils.GetAngleByVectorDot(
            h,
            this.n$t.MoveComp.GravityUp,
          ))
      )
        return;
      a.DeepCopy(_);
    }
    i = i / Math.tan(o * MathUtils_1.MathUtils.DegToRad) + r;
    if (
      (t.DeepCopy(a),
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.n$t, t, -i),
      this.von.HitResult?.Clear(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Character",
          48,
          "Qte设置地面位置，垂直方向检测开始",
          ["开始位置", a],
          ["结束位置", t],
        ),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, a),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, t),
      (e = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        s,
        this.von,
        PROFILE_KEY,
        PROFILE_KEY,
      )),
      (n = this.von.HitResult),
      _.Reset(),
      h.Reset(),
      e && n.bBlockingHit)
    )
      return (
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, _),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            48,
            "Qte设置地面位置，垂直方向检测结果",
            ["障碍数量", n.Actors.Num()],
            ["障碍物", n.Actors.Get(0)?.GetName()],
            ["碰撞位置", _],
          ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, 0, h),
        o <
        MathUtils_1.MathUtils.GetAngleByVectorDot(
          h,
          this.n$t.MoveComp.GravityUp,
        )
          ? void 0
          : _
      );
  }
  QZr(t) {
    var t = t.Entity,
      e = t.GetComponent(64)?.IsManipulating(),
      i = t.GetComponent(39),
      r = i.SkillTarget;
    !e &&
    r?.Valid &&
    r.Entity?.Active &&
    !r.Entity.GetComponent(203)?.HasTag(1008164187)
      ? ((this.tRr.SkillTarget = r),
        (this.tRr.SkillTargetSocket = i.SkillTargetSocket))
      : ((e = t.GetComponent(32)).DetectSoftLockTarget({
          LockOnConfigId: QTE_LOCKON_CONFIG_ID,
        }),
        (this.tRr.SkillTarget = e.GetCurrentTarget()),
        (this.tRr.SkillTargetSocket = e.GetCurrentTargetSocketName()));
  }
  rGn() {
    const i = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    let r = 0;
    this.eGn.forEach((t) => {
      var e = DataTableUtil_1.DataTableUtil.GetDataTableRow(i, t);
      e.Priority >= r &&
        ((this.tGn = t), (this.gFe.TriggerEnergy = e.Energy), (r = e.Priority));
    }),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharQteTagRowNameChanged,
      );
  }
  GetQteTagData() {
    var t;
    if (this.tGn)
      return (
        (t = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable()),
        DataTableUtil_1.DataTableUtil.GetDataTableRow(t, this.tGn)
      );
  }
  R7a(t) {
    var e = Protocol_1.Aki.Protocol.$e_.create(),
      t =
        ((e.CUs = MathUtils_1.MathUtils.NumberToLong(
          ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
            t.Entity.Id,
          ),
        )),
        (e.mUs = MathUtils_1.MathUtils.NumberToLong(
          ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
            this.Entity.Id,
          ),
        )),
        (e.U7a = UE.GASBPLibrary.FnvHash(this.tGn)),
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId());
    return CombatMessage_1.CombatNet.Send(29932, this.Entity, e, void 0, t), t;
  }
  static ExecuteQteNotify(t, e) {
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(e.mUs),
      ),
      e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(e.CUs),
      );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CharExecuteMultiQte,
      i,
      e,
    );
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("Xsh", !0)],
  RoleQteComponent,
  "ExecuteQteNotify",
  null,
),
  (RoleQteComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(96)],
    RoleQteComponent,
  )),
  (exports.RoleQteComponent = RoleQteComponent);
//# sourceMappingURL=RoleQteComponent.js.map
