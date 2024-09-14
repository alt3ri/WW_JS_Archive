"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    var o,
      s = arguments.length,
      n =
        s < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, i, r);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (n = (s < 3 ? o(n) : 3 < s ? o(t, i, n) : o(t, i)) || n);
    return 3 < s && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleQteComponent = exports.MAX_MULTI_QTE_DISTANCE = void 0);
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
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  PROFILE_KEY = "RoleQteComponent_SetQtePosition",
  DEFAULT_ADD_HEIGHT = -1e3,
  SUB_SIZE = 5,
  QTE_LOCKON_CONFIG_ID = 4,
  normalQteTag = -658311908;
exports.MAX_MULTI_QTE_DISTANCE = 5e3;
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
      (this.Son = (e, t) => {
        EventSystem_1.EventSystem.Emit(
          t
            ? EventDefine_1.EEventName.CharQteActive
            : EventDefine_1.EEventName.CharQteConsume,
          this.Entity.Id,
        );
      }),
      (this.yon = (e) => {
        this.Entity.Id !== e && this.Eon.delete(e);
      }),
      (this.pze = () => {
        this.Eon.clear();
      }),
      (this.Ion = (e, t) => {
        t
          ? (this.IsInQte = !0)
          : ((this.IsInQte = !1),
            this.m1t.RemoveBuffByTag(-52094810, "QTE结束移除"),
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              this.Entity.Id,
              { ParamType: 1 },
            )?.IsControl() || this.gon.SetRoleDisableWithEffect()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharInQteChanged,
            this.Entity.Id,
            this.IsInQte,
          );
      }),
      (this.iGn = (e, t) => {
        t
          ? (this.eGn.set(
              e,
              ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().get(
                e,
              ),
            ),
            this.rGn())
          : ((t = this.eGn.get(e)),
            this.eGn.delete(e),
            this.tGn === t && this.rGn());
      });
  }
  OnStart() {
    return (
      (this.n$t = this.Entity.GetComponent(3)),
      (this.bkr = this.Entity.CheckGetComponent(17)),
      (this.Xte = this.Entity.CheckGetComponent(190)),
      (this.m1t = this.Entity.CheckGetComponent(160)),
      (this.gon = this.Entity.CheckGetComponent(84)),
      (this.tRr = this.Entity.CheckGetComponent(34)),
      (this.gFe = this.Entity.CheckGetComponent(82)),
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
    for (const e of this.Zqn) e.EndTask();
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
    var e =
        ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().values(),
      t = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    for (const r of e) {
      var i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, r).QteTag.TagId;
      this.Zqn.push(this.Xte.ListenForTagAddOrRemove(i, this.iGn)),
        this.Xte.HasTag(i) && this.eGn.set(i, r);
    }
    this.rGn();
  }
  IsQteReady(t) {
    if (this.IsInQte) return !1;
    if (!FormationDataController_1.FormationDataController.GlobalIsInFight)
      return !1;
    if (this.Xte.HasTag(1008164187)) return !1;
    var e = this.GetQteTagData();
    if (!e) return !1;
    if (this.Xte.HasTag(e.NoTag.TagId)) return !1;
    e = t.Entity.GetComponent(190);
    if (!e.HasTag(166024319) || e.HasTag(1008164187)) return !1;
    if (!e.HasTag(2014048239) && this.Eon.has(t.Id)) return !1;
    e = t.Entity.GetComponent(3);
    if (
      1 < ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length
    ) {
      if (e.IsAutonomousProxy) return !1;
      if (
        !ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
          this.n$t.ActorLocationProxy,
          exports.MAX_MULTI_QTE_DISTANCE,
        ).some((e) => e.EntityHandle === t)
      )
        return !1;
    }
    return !0;
  }
  UseExitSkill(e) {
    var t,
      i = e.Entity.GetComponent(89).GetQteTagData();
    i &&
      "None" !== i.ExitSkillTrigger.TagName &&
      (((t = new UE.GameplayEventData()).Instigator = this.n$t.Actor),
      (t.Target = e.Entity.GetComponent(3).Actor),
      this.bkr.SendGameplayEventToActor(i.ExitSkillTrigger, t));
  }
  ExecuteQte(e) {
    var t = this.GetQteTagData();
    if (!t || "None" === t.QteTrigger.TagName) return !1;
    var i = this.H8a(e);
    this.QZr(e),
      this.gon.InterruptDisableWithEffect(),
      this.gon.SetTeamTag(0),
      this.Entity.EnableByKey(1, !0),
      this.bkr.SendGameplayEventToActor(t.QteTrigger);
    for (let e = 0; e < t.QteBuffs.Num(); e++)
      this.m1t.AddBuff(t.QteBuffs.Get(e), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: i,
        Reason: "ExecuteQte",
      });
    var r = e.Entity.GetComponent(82),
      o = e.Entity.GetComponent(190);
    if ((r.ActivateFusion(this.Entity), !o.HasTag(2014048239)))
      for (let e = 0; e < t.ConsumeBuffs.Num(); e++)
        r.ClearElementEnergy(this.Entity, t.ConsumeBuffs.Get(e));
    return (
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharExecuteQte,
        this.Entity.Id,
        e.Id,
      ),
      !0
    );
  }
  ExecuteMultiQte(e) {
    var t = this.GetQteTagData();
    if (!t || "None" === t.QteTrigger.TagName) return !1;
    var i = this.H8a(e);
    this.bkr.SendGameplayEventToActor(t.QteTrigger);
    for (let e = 0; e < t.QteBuffs.Num(); e++)
      this.m1t.AddBuff(t.QteBuffs.Get(e), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: i,
        Reason: "ExecuteQte",
      });
    var r = e.Entity.GetComponent(82);
    if (!e.Entity.GetComponent(190).HasTag(2014048239)) {
      if (2 < ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize())
        r.ClearElementEnergy(this.Entity, CharacterBuffIds_1.buffId.ConsumeQte);
      else
        for (let e = 0; e < t.ConsumeBuffs.Num(); e++)
          r.ClearElementEnergy(this.Entity, t.ConsumeBuffs.Get(e));
      this.Eon.add(e.Id);
    }
    return (
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.Entity.Id,
        e.Id,
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
  Uon(t, e, i) {
    t.HitResult?.Clear(),
      t.ActorsToIgnore.Empty(),
      t.ActorsToIgnore.Add(e.Owner),
      t.ActorsToIgnore.Add(i.Actor);
    var r = i.Entity.GetComponent(49)?.GetFollowActor();
    if (r) for (let e = 0; e < r.Num(); e++) t.ActorsToIgnore.Add(r.Get(e));
  }
  SetQtePosition(s) {
    var n = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (n) {
      let e = n;
      var a = Vector_1.Vector.Create();
      a.DeepCopy(e.ActorLocationProxy),
        s.ReferenceTarget &&
          (h = this.tRr.SkillTarget)?.Valid &&
          ((e = h.Entity.GetComponent(1)),
          (h = this.tRr.GetTargetTransform()),
          a.DeepCopy(h.GetLocation())),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置位置开始",
            ["targetName", e.Owner?.GetName()],
            ["currentLocation", this.n$t.ActorLocationProxy],
            ["targetLocation", a],
          ),
        this.Don(),
        this.Uon(this.von, e, n),
        this.Ron(),
        this.Uon(this.Mon, e, n);
      let t = 0,
        i = 0;
      (0, RegisterComponent_1.isComponentInstance)(e, 3)
        ? ((t = e.ScaledRadius), (i = e.HalfHeight))
        : (0, RegisterComponent_1.isComponentInstance)(e, 187) &&
          ((h = e.GetRadius()), (t = h), (i = h));
      var h = { Location: a, Radius: t, HalfHeight: i };
      let r = void 0,
        o = void 0;
      o =
        1 === s.QteType
          ? ((r = this.Aon(n, s, h)), "Qte.设置空中位置")
          : ((r = this.Pon(n, s, h)), "Qte.设置地面位置");
      var a = this.n$t,
        s = a.ActorLocationProxy,
        h = this.Mon,
        n =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            h,
            n.ActorLocationProxy,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(h, r),
          TraceElementCommon_1.TraceElementCommon.LineTrace(h, PROFILE_KEY)),
        h = h.HitResult,
        h =
          (n &&
            h.bBlockingHit &&
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(h, 0, r),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Character",
                49,
                "Qte设置位置，与目标位置间有障碍",
                ["碰撞位置", r],
              ),
            (n = this.cz),
            r.Subtraction(s, n),
            n.Normalize(),
            n.Multiply(a.ScaledRadius, n),
            r.Subtraction(n, r)),
          a.ScaledHalfHeight),
        s = Vector_1.Vector.Create(r.X, r.Y, r.Z + h),
        n = Vector_1.Vector.Create(r.X, r.Y, r.Z - h),
        s =
          ((this.von.Radius = a.ScaledRadius),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, s),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, n),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.von,
            PROFILE_KEY,
          )),
        n = this.von.HitResult;
      s && n.bBlockingHit
        ? ((s =
            ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation),
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, s),
          (s.Z += h),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 49, "Qte设置位置，地面检测修正位置", [
              "fixedLocation",
              s,
            ]),
          a.SetActorLocation(s.ToUeVector(), "Qte.修正位置", !1))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 49, "Qte设置位置", ["location", r]),
          a.SetActorLocation(r.ToUeVector(), o, !1));
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          23,
          "GetQtePosition error, currentRole not found",
        );
  }
  Aon(e, t, i) {
    let r = t.Length;
    var o = Vector_1.Vector.Create(),
      s =
        (e.ActorLocationProxy.Subtraction(i.Location, o),
        o.IsNearlyZero() ? o.DeepCopy(e.ActorForwardProxy) : (r += i.Radius),
        (o.Z = 0),
        o.RotateAngleAxis(t.Rotate, Vector_1.Vector.UpVectorProxy, o),
        o.Normalize(),
        o.Multiply(r, o),
        Vector_1.Vector.Create()),
      o =
        (s.DeepCopy(i.Location),
        s.Addition(o, s),
        (s.Z += t.Height),
        e.ActorLocationProxy),
      o =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, o),
        (s.Z += i.HalfHeight / 2),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, s),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            49,
            "Qte设置空中位置，检测开始",
            ["开始位置", o],
            ["结束位置", s],
          ),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          e.Actor.CapsuleComponent,
          this.von,
          PROFILE_KEY,
          PROFILE_KEY,
        )),
      n = this.von.HitResult;
    return (
      (s.Z -= i.HalfHeight / 2),
      o &&
        n.bBlockingHit &&
        ((o = Vector_1.Vector.Create()),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.von.HitResult,
          0,
          o,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            49,
            "Qte设置空中位置，检测结果",
            ["障碍物", n.Actors.Get(0)?.GetName()],
            ["碰撞位置", o],
          ),
        (n = this.cz),
        e.ActorLocationProxy.Subtraction(o, n),
        (n.Z = 0),
        n.Normalize(),
        (i = i.Radius + e.GetRadius()),
        n.Multiply(i, n),
        s.DeepCopy(o),
        s.Addition(n, s),
        (s.Z += t.Height)),
      s
    );
  }
  Pon(e, t, i) {
    var r = Vector_1.Vector.Create(),
      o = (r.DeepCopy(i.Location), i.HalfHeight - SUB_SIZE),
      s = ((r.Z += o), Vector_1.Vector.Create()),
      o =
        (e.ActorLocationProxy.Subtraction(i.Location, s),
        s.IsNearlyZero() && s.DeepCopy(e.ActorForwardProxy),
        (s.Z = 0),
        s.RotateAngleAxis(t.Rotate, Vector_1.Vector.UpVectorProxy, s),
        s.Normalize(),
        o + t.Height - DEFAULT_ADD_HEIGHT),
      n = e.Actor.CharacterMovement.K2_GetWalkableFloorAngle(),
      i = t.Length + i.Radius;
    let a = this.xon(r, s, i, o, n);
    return (
      a ||
        (s.Normalize(),
        s.Multiply(-1, s),
        (a =
          (a = this.xon(r, s, i, o, n)) ||
          Vector_1.Vector.Create(e.ActorLocationProxy))),
      (a.Z += t.Height),
      a
    );
  }
  xon(e, t, i, r, o) {
    var s = this.n$t.Actor.CapsuleComponent,
      n = (t.Multiply(i, t), Vector_1.Vector.Create()),
      e = (n.DeepCopy(e), Vector_1.Vector.Create()),
      t =
        (e.DeepCopy(n),
        e.Addition(t, e),
        this.von.HitResult?.Clear(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            49,
            "Qte设置地面位置，延输入方向检测开始",
            ["开始位置", n],
            ["结束位置", e],
          ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, n),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, e),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          s,
          this.von,
          PROFILE_KEY,
          PROFILE_KEY,
        ));
    let a = this.von.HitResult;
    var h = Vector_1.Vector.Create(),
      _ = Vector_1.Vector.Create();
    if ((n.DeepCopy(e), t && a.bBlockingHit)) {
      if (
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(a, 0, h),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            49,
            "Qte设置地面位置，延输入方向检测结果",
            ["障碍数量", a.Actors.Num()],
            ["障碍物", a.Actors.Get(0)?.GetName()],
            ["碰撞位置", h],
          ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(a, 0, _),
        o <
          MathUtils_1.MathUtils.GetAngleByVectorDot(
            _,
            Vector_1.Vector.UpVectorProxy,
          ))
      )
        return;
      n.DeepCopy(h);
    }
    i = i / Math.tan(o * MathUtils_1.MathUtils.DegToRad) + r;
    if (
      (e.DeepCopy(n),
      (e.Z -= i),
      this.von.HitResult?.Clear(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Character",
          49,
          "Qte设置地面位置，垂直方向检测开始",
          ["开始位置", n],
          ["结束位置", e],
        ),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, n),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, e),
      (t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        s,
        this.von,
        PROFILE_KEY,
        PROFILE_KEY,
      )),
      (a = this.von.HitResult),
      h.Reset(),
      _.Reset(),
      t && a.bBlockingHit)
    )
      return (
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(a, 0, h),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            49,
            "Qte设置地面位置，垂直方向检测结果",
            ["障碍数量", a.Actors.Num()],
            ["障碍物", a.Actors.Get(0)?.GetName()],
            ["碰撞位置", h],
          ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(a, 0, _),
        o <
        MathUtils_1.MathUtils.GetAngleByVectorDot(
          _,
          Vector_1.Vector.UpVectorProxy,
        )
          ? void 0
          : h
      );
  }
  QZr(e) {
    var e = e.Entity,
      t = e.GetComponent(57)?.IsManipulating(),
      i = e.GetComponent(34),
      r = i.SkillTarget;
    !t &&
    r?.Valid &&
    r.Entity?.Active &&
    !r.Entity.GetComponent(190)?.HasTag(1008164187)
      ? ((this.tRr.SkillTarget = r),
        (this.tRr.SkillTargetSocket = i.SkillTargetSocket))
      : ((t = e.GetComponent(29)).DetectSoftLockTarget(QTE_LOCKON_CONFIG_ID),
        (this.tRr.SkillTarget = t.GetCurrentTarget()),
        (this.tRr.SkillTargetSocket = t.GetCurrentTargetSocketName()));
  }
  rGn() {
    const i = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    let r = 0;
    this.eGn.forEach((e) => {
      var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(i, e);
      t.Priority >= r &&
        ((this.tGn = e), (this.gFe.TriggerEnergy = t.Energy), (r = t.Priority));
    }),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharQteTagRowNameChanged,
      );
  }
  GetQteTagData() {
    var e;
    if (this.tGn)
      return (
        (e = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable()),
        DataTableUtil_1.DataTableUtil.GetDataTableRow(e, this.tGn)
      );
  }
  H8a(e) {
    var t = Protocol_1.Aki.Protocol.k8a.create(),
      e =
        ((t.CUs = MathUtils_1.MathUtils.NumberToLong(
          ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
            e.Entity.Id,
          ),
        )),
        (t.mUs = MathUtils_1.MathUtils.NumberToLong(
          ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
            this.Entity.Id,
          ),
        )),
        (t.j8a = UE.GASBPLibrary.FnvHash(this.tGn)),
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId());
    return (
      CombatMessage_1.CombatNet.Call(23356, this.Entity, t, void 0, void 0, e),
      e
    );
  }
  static ExecuteQteNotify(e, t) {
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(t.mUs),
      ),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(t.CUs),
      );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CharExecuteMultiQte,
      i,
      t,
    );
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("fZa")],
  RoleQteComponent,
  "ExecuteQteNotify",
  null,
),
  (RoleQteComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(89)],
    RoleQteComponent,
  )),
  (exports.RoleQteComponent = RoleQteComponent);
//# sourceMappingURL=RoleQteComponent.js.map
