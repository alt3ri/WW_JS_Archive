"use strict";
var RoleQteComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var r,
        n = arguments.length,
        s =
          n < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, o);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (s = (n < 3 ? r(s) : 3 < n ? r(e, i, s) : r(e, i)) || s);
      return 3 < n && s && Object.defineProperty(e, i, s), s;
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
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
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
let RoleQteComponent = (RoleQteComponent_1 = class RoleQteComponent extends (
  EntityComponent_1.EntityComponent
) {
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
      (this.jqn = []),
      (this.Wqn = new Map()),
      (this.Kqn = ""),
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
            )?.IsControl() || this.gon.SetRoleDisableWithEffect()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharInQteChanged,
            this.Entity.Id,
            this.IsInQte,
          );
      }),
      (this.Qqn = (t, e) => {
        e
          ? (this.Wqn.set(
              t,
              ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().get(
                t,
              ),
            ),
            this.Xqn())
          : ((e = this.Wqn.get(t)),
            this.Wqn.delete(t),
            this.Kqn === e && this.Xqn());
      });
  }
  OnStart() {
    return (
      (this.n$t = this.Entity.GetComponent(3)),
      (this.bkr = this.Entity.CheckGetComponent(17)),
      (this.Xte = this.Entity.CheckGetComponent(188)),
      (this.m1t = this.Entity.CheckGetComponent(159)),
      (this.gon = this.Entity.CheckGetComponent(83)),
      (this.tRr = this.Entity.CheckGetComponent(33)),
      (this.gFe = this.Entity.CheckGetComponent(81)),
      this.jqn.push(this.Xte.ListenForTagAddOrRemove(166024319, this.Son)),
      this.jqn.push(this.Xte.ListenForTagAddOrRemove(1674960297, this.Ion)),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.pze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharQteConsume,
        this.yon,
      ),
      this.$qn(),
      !0
    );
  }
  OnEnd() {
    for (const t of this.jqn) t.EndTask();
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
  $qn() {
    this.Xte.AddTag(normalQteTag);
    var t =
        ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().values(),
      e = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    for (const o of t) {
      var i = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, o).QteTag.TagId;
      this.jqn.push(this.Xte.ListenForTagAddOrRemove(i, this.Qqn)),
        this.Xte.HasTag(i) && this.Wqn.set(i, o);
    }
    this.Xqn();
  }
  IsQteReady(e) {
    if (this.IsInQte) return !1;
    if (!FormationDataController_1.FormationDataController.GlobalIsInFight)
      return !1;
    if (this.Xte.HasTag(1008164187)) return !1;
    var t = this.GetQteTagData();
    if (!t) return !1;
    if (this.Xte.HasTag(t.NoTag.TagId)) return !1;
    t = e.Entity.GetComponent(188);
    if (!t.HasTag(166024319) || t.HasTag(1008164187)) return !1;
    if (!t.HasTag(2014048239) && this.Eon.has(e.Id)) return !1;
    t = e.Entity.GetComponent(3);
    if (
      1 < ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length
    ) {
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
    var e,
      i = this.GetQteTagData();
    i &&
      "None" !== i.ExitSkillTrigger.TagName &&
      (RoleQteComponent_1.bpo(t.Id, this.Entity.Id),
      ((e = new UE.GameplayEventData()).Instigator = this.n$t.Actor),
      (e.Target = t.Entity.GetComponent(3).Actor),
      this.bkr.SendGameplayEventToActor(i.ExitSkillTrigger, e));
  }
  ExecuteQte(t) {
    var e = this.GetQteTagData();
    if (!e || "None" === e.QteTrigger.TagName) return !1;
    this.QZr(t),
      this.gon.InterruptDisableWithEffect(),
      this.gon.SetTeamTag(0),
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
        this.Entity,
        !0,
        "RoleQteComponent.ExecuteQte",
      ),
      this.bkr.SendGameplayEventToActor(e.QteTrigger);
    for (let t = 0; t < e.QteBuffs.Num(); t++)
      this.m1t.AddBuff(e.QteBuffs.Get(t), {
        InstigatorId: this.m1t.CreatureDataId,
        Reason: "ExecuteQte",
      });
    var i = t.Entity.GetComponent(81),
      t = t.Entity.GetComponent(188);
    if ((i.ActivateFusion(this.Entity), !t.HasTag(2014048239)))
      for (let t = 0; t < e.ConsumeBuffs.Num(); t++)
        i.ClearElementEnergy(this.Entity, e.ConsumeBuffs.Get(t));
    return !0;
  }
  ExecuteMultiQte(t) {
    var e = this.GetQteTagData();
    if (!e || "None" === e.QteTrigger.TagName) return !1;
    this.bkr.SendGameplayEventToActor(e.QteTrigger);
    for (let t = 0; t < e.QteBuffs.Num(); t++)
      this.m1t.AddBuff(e.QteBuffs.Get(t), {
        InstigatorId: this.m1t.CreatureDataId,
        Reason: "ExecuteQte",
      });
    var i = t.Entity.GetComponent(81);
    if (!t.Entity.GetComponent(188).HasTag(2014048239)) {
      if (2 < ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize())
        i.ClearElementEnergy(this.Entity, CharacterBuffIds_1.buffId.ConsumeQte);
      else
        for (let t = 0; t < e.ConsumeBuffs.Num(); t++)
          i.ClearElementEnergy(this.Entity, e.ConsumeBuffs.Get(t));
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
    var o = i.Entity.GetComponent(48)?.GetFollowActor();
    if (o) for (let t = 0; t < o.Num(); t++) e.ActorsToIgnore.Add(o.Get(t));
  }
  SetQtePosition(n) {
    var s = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (s) {
      let t = s;
      var a = Vector_1.Vector.Create();
      a.DeepCopy(t.ActorLocationProxy),
        n.ReferenceTarget &&
          (h = this.tRr.SkillTarget)?.Valid &&
          ((t = h.Entity.GetComponent(1)),
          (h = this.tRr.GetTargetTransform()),
          a.DeepCopy(h.GetLocation())),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置位置开始",
            ["targetName", t.Owner?.GetName()],
            ["currentLocation", this.n$t.ActorLocationProxy],
            ["targetLocation", a],
          ),
        this.Don(),
        this.Uon(this.von, t, s),
        this.Ron(),
        this.Uon(this.Mon, t, s);
      let e = 0,
        i = 0;
      (0, RegisterComponent_1.isComponentInstance)(t, 3)
        ? ((e = t.ScaledRadius), (i = t.HalfHeight))
        : (0, RegisterComponent_1.isComponentInstance)(t, 185) &&
          ((h = t.GetRadius()), (e = h), (i = h));
      var h = { Location: a, Radius: e, HalfHeight: i };
      let o = void 0,
        r = void 0;
      r =
        1 === n.QteType
          ? ((o = this.Aon(s, n, h)), "Qte.设置空中位置")
          : ((o = this.Pon(s, n, h)), "Qte.设置地面位置");
      var a = this.n$t,
        n = a.ActorLocationProxy,
        h = this.Mon,
        s =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            h,
            s.ActorLocationProxy,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(h, o),
          TraceElementCommon_1.TraceElementCommon.LineTrace(h, PROFILE_KEY)),
        h = h.HitResult,
        h =
          (s &&
            h.bBlockingHit &&
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(h, 0, o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Character",
                49,
                "Qte设置位置，与目标位置间有障碍",
                ["碰撞位置", o],
              ),
            (s = this.cz),
            o.Subtraction(n, s),
            s.Normalize(),
            s.Multiply(a.ScaledRadius, s),
            o.Subtraction(s, o)),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 49, "Qte设置位置", ["location", o]),
          this.n$t.SetActorLocation(o.ToUeVector(), r, !1),
          a.ScaledHalfHeight),
        s = Vector_1.Vector.Create(n.X, n.Y, n.Z + h),
        n = Vector_1.Vector.Create(n.X, n.Y, n.Z - h),
        s =
          ((this.von.Radius = a.ScaledRadius),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, s),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, n),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.von,
            PROFILE_KEY,
          )),
        n = this.von.HitResult;
      if (s && n.bBlockingHit) {
        const t =
          ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, t),
          (t.Z += h),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 49, "Qte设置位置，地面检测修正位置", [
              "location",
              t,
            ]),
          a.SetActorLocation(t.ToUeVector(), "Qte.修正位置", !1);
      }
      n.Clear();
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          23,
          "GetQtePosition error, currentRole not found",
        );
  }
  Aon(t, e, i) {
    let o = e.Length;
    var r = Vector_1.Vector.Create(),
      n =
        (t.ActorLocationProxy.Subtraction(i.Location, r),
        r.IsNearlyZero() ? r.DeepCopy(t.ActorForwardProxy) : (o += i.Radius),
        (r.Z = 0),
        r.RotateAngleAxis(e.Rotate, Vector_1.Vector.UpVectorProxy, r),
        r.Normalize(),
        r.Multiply(o, r),
        Vector_1.Vector.Create()),
      r =
        (n.DeepCopy(i.Location),
        n.Addition(r, n),
        (n.Z += e.Height),
        t.ActorLocationProxy),
      r =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, r),
        (n.Z += i.HalfHeight / 2),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, n),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置空中位置，检测开始",
            ["开始位置", r],
            ["结束位置", n],
          ),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          t.Actor.CapsuleComponent,
          this.von,
          PROFILE_KEY,
          PROFILE_KEY,
        )),
      s = this.von.HitResult;
    return (
      (n.Z -= i.HalfHeight / 2),
      r &&
        s.bBlockingHit &&
        ((r = Vector_1.Vector.Create()),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.von.HitResult,
          0,
          r,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置空中位置，检测结果",
            ["障碍物", s.Actors.Get(0)?.GetName()],
            ["碰撞位置", r],
          ),
        (s = this.cz),
        t.ActorLocationProxy.Subtraction(r, s),
        (s.Z = 0),
        s.Normalize(),
        (i = i.Radius + t.GetRadius()),
        s.Multiply(i, s),
        n.DeepCopy(r),
        n.Addition(s, n),
        (n.Z += e.Height)),
      n
    );
  }
  Pon(t, e, i) {
    var o = Vector_1.Vector.Create(),
      r = (o.DeepCopy(i.Location), i.HalfHeight - SUB_SIZE),
      n = ((o.Z += r), Vector_1.Vector.Create()),
      r =
        (t.ActorLocationProxy.Subtraction(i.Location, n),
        n.IsNearlyZero() && n.DeepCopy(t.ActorForwardProxy),
        (n.Z = 0),
        n.RotateAngleAxis(e.Rotate, Vector_1.Vector.UpVectorProxy, n),
        n.Normalize(),
        r + e.Height - DEFAULT_ADD_HEIGHT),
      s = t.Actor.CharacterMovement.K2_GetWalkableFloorAngle(),
      i = e.Length + i.Radius;
    let a = this.xon(o, n, i, r, s);
    return (
      a ||
        (n.Normalize(),
        n.Multiply(-1, n),
        (a =
          (a = this.xon(o, n, i, r, s)) ||
          Vector_1.Vector.Create(t.ActorLocationProxy))),
      (a.Z += e.Height),
      a
    );
  }
  xon(t, e, i, o, r) {
    var n = this.n$t.Actor.CapsuleComponent,
      s = (e.Multiply(i, e), Vector_1.Vector.Create()),
      t = (s.DeepCopy(t), Vector_1.Vector.Create()),
      e =
        (t.DeepCopy(s),
        t.Addition(e, t),
        this.von.HitResult?.Clear(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            49,
            "Qte设置地面位置，延输入方向检测开始",
            ["开始位置", s],
            ["结束位置", t],
          ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, s),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, t),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          n,
          this.von,
          PROFILE_KEY,
          PROFILE_KEY,
        ));
    let a = this.von.HitResult;
    var h = Vector_1.Vector.Create(),
      _ = Vector_1.Vector.Create();
    if ((s.DeepCopy(t), e && a.bBlockingHit)) {
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
      s.DeepCopy(h);
    }
    i = i / Math.tan(r * MathUtils_1.MathUtils.DegToRad) + o;
    if (
      (t.DeepCopy(s),
      (t.Z -= i),
      this.von.HitResult?.Clear(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          49,
          "Qte设置地面位置，垂直方向检测开始",
          ["开始位置", s],
          ["结束位置", t],
        ),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, s),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, t),
      (e = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        n,
        this.von,
        PROFILE_KEY,
        PROFILE_KEY,
      )),
      (a = this.von.HitResult),
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
  QZr(t) {
    var e = t.Entity.GetComponent(33);
    e.SkillTarget?.Valid &&
    e.SkillTarget?.Entity?.Active &&
    !e.SkillTarget.Entity.GetComponent(188)?.HasTag(1008164187)
      ? ((this.tRr.SkillTarget = e.SkillTarget),
        (this.tRr.SkillTargetSocket = e.SkillTargetSocket))
      : ((e = t.Entity.GetComponent(29)).DetectSoftLockTarget(
          QTE_LOCKON_CONFIG_ID,
        ),
        (this.tRr.SkillTarget = e.GetCurrentTarget()),
        (this.tRr.SkillTargetSocket = e.GetCurrentTargetSocketName()));
  }
  Xqn() {
    const i = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    let o = 0;
    this.Wqn.forEach((t) => {
      var e = DataTableUtil_1.DataTableUtil.GetDataTableRow(i, t);
      e.Priority >= o &&
        ((this.Kqn = t), (this.gFe.TriggerEnergy = e.Energy), (o = e.Priority));
    }),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharQteTagRowNameChanged,
      );
  }
  GetQteTagData() {
    var t;
    if (this.Kqn)
      return (
        (t = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable()),
        DataTableUtil_1.DataTableUtil.GetDataTableRow(t, this.Kqn)
      );
  }
  static bpo(t, e) {
    var i = new Protocol_1.Aki.Protocol.l4n(),
      t = MathUtils_1.MathUtils.NumberToLong(
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t),
      ),
      o = MathUtils_1.MathUtils.NumberToLong(
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
      );
    (i.QWn = t),
      (i.XWn = o),
      CombatMessage_1.CombatNet.Call(2720, e, i, (t) => {});
  }
});
(RoleQteComponent = RoleQteComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(88)],
    RoleQteComponent,
  )),
  (exports.RoleQteComponent = RoleQteComponent);
//# sourceMappingURL=RoleQteComponent.js.map
