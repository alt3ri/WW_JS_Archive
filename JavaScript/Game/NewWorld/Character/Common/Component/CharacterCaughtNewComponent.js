"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, s, e) {
    var h,
      o = arguments.length,
      a =
        o < 3
          ? i
          : null === e
            ? (e = Object.getOwnPropertyDescriptor(i, s))
            : e;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, i, s, e);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (h = t[r]) && (a = (o < 3 ? h(a) : 3 < o ? h(i, s, a) : h(i, s)) || a);
    return 3 < o && a && Object.defineProperty(i, s, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterCaughtNewComponent =
    exports.CaughtBindingInfo =
    exports.CaughtTriggerInfo =
      void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  BulletController_1 = require("../../../Bullet/BulletController"),
  BulletUtil_1 = require("../../../Bullet/BulletUtil"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  DEFAULT_CAUGHT_LEVEL = 10,
  ZOOM_PRECENTAGE = 0.1,
  ADD_LENGTH = 5,
  IS_DEBUG = !1,
  PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Camera";
class CaughtTriggerInfo {
  constructor() {
    (this.Jh = void 0),
      (this.Index = 0),
      (this.CaughtId = ""),
      (this.AYo = void 0),
      (this.TriggerInfo = void 0),
      (this.CaughtActor = void 0),
      (this.BulletEntity = void 0),
      (this.BulletActorComponent = void 0),
      (this.Handle = void 0);
  }
  Init(t, i, s, e, h) {
    (this.Jh = s.Entity),
      (this.CaughtId = t),
      (this.AYo = i),
      (this.TriggerInfo = this.AYo.TriggerInfo);
    t = BulletUtil_1.BulletUtil.CreateBulletFromAN(
      s.Actor,
      this.TriggerInfo.BulletId,
      s.ActorTransform,
      h.toString(),
      !1,
      e.CaughtTriggerAnsMessageId,
    );
    (this.BulletEntity =
      ModelManager_1.ModelManager.BulletModel?.GetBulletEntityById(t)),
      (this.BulletActorComponent = this.BulletEntity?.GetComponent(167)),
      this.BulletEntity &&
        ((this.Handle = (t) => {
          var i = t?.Target;
          this.BulletEntity &&
            i?.Valid &&
            this.BulletEntity.Id === t.BulletEntityId &&
            (((t = i.GetComponent(0)).GetEntityType() !==
              Protocol_1.Aki.Protocol.kks.Proto_Player &&
              t.GetEntityType() !==
                Protocol_1.Aki.Protocol.kks.Proto_Monster) ||
              e.TryCaught(this, i));
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharHitLocal,
          this.Handle,
        ));
  }
  Clear() {
    this.BulletEntity &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharHitLocal,
        this.Handle,
      ),
      BulletController_1.BulletController.DestroyBullet(
        this.BulletEntity.Id,
        !1,
      ),
      (this.Index = 0),
      (this.CaughtId = ""),
      (this.TriggerInfo = void 0),
      (this.AYo = void 0),
      this.CaughtActor &&
        ActorSystem_1.ActorSystem.Put(
          "CaughtTriggerInfo.Clear",
          this.CaughtActor,
        ),
      (this.CaughtActor = void 0),
      (this.BulletEntity = void 0),
      (this.BulletActorComponent = void 0),
      (this.Handle = void 0);
  }
}
exports.CaughtTriggerInfo = CaughtTriggerInfo;
class CaughtBindingInfo {
  constructor(t, i, s, e, h) {
    (this.CaughtId = ""),
      (this.AYo = void 0),
      (this.BindingInfo = void 0),
      (this.CaughtActor = void 0),
      (this.BulletEntityId = void 0),
      (this.BulletActorComponent = void 0),
      (this.Targets = []),
      (this.CaughtId = t),
      (this.AYo = i),
      (this.BindingInfo = this.AYo.BindingInfo),
      (this.BulletEntityId = BulletUtil_1.BulletUtil.CreateBulletFromAN(
        s.Actor,
        this.BindingInfo.BulletId,
        s.ActorTransform,
        h.toString(),
        !1,
        e.CaughtBindingAnsMessageId,
      )),
      (this.BulletActorComponent = this.BulletEntity.GetComponent(167));
  }
  get BulletEntity() {
    return EntitySystem_1.EntitySystem.Get(this.BulletEntityId);
  }
  Clear() {
    (this.CaughtId = ""),
      (this.BindingInfo = void 0),
      (this.AYo = void 0),
      this.CaughtActor &&
        ActorSystem_1.ActorSystem.Put(
          "CaughtBindingInfo.Clear",
          this.CaughtActor,
        ),
      (this.CaughtActor = void 0),
      (this.BulletEntityId = void 0),
      (this.BulletActorComponent = void 0);
  }
}
exports.CaughtBindingInfo = CaughtBindingInfo;
let CharacterCaughtNewComponent = class CharacterCaughtNewComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.m1t = void 0),
      (this.Xte = void 0),
      (this.HBr = void 0),
      (this.Gce = void 0),
      (this.cBe = void 0),
      (this.Hte = void 0),
      (this.t4r = void 0),
      (this.i4r = void 0),
      (this.o4r = void 0),
      (this.r4r = void 0),
      (this.nWl = 0),
      (this.n4r = Vector_1.Vector.Create()),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.s4r = new Map()),
      (this.a4r = new Map()),
      (this.h4r = void 0),
      (this.Rg1 = TimeUtil_1.TimeUtil.Millisecond),
      (this.l4r = new Map()),
      (this._4r = (t, i) => {
        i && (this.sWl && this.EndCaught(), this.aWl) && this.EndBeCaught();
      }),
      (this.sWl = !1),
      (this.aWl = !1),
      (this.hWl = !1),
      (this.PendingCaughtList = new Map()),
      (this.lWl = new Map()),
      (this.wmo = 0),
      (this.CaughtTriggerAnsMessageId = void 0),
      (this.CaughtBindingAnsMessageId = void 0),
      (this.Fse = void 0),
      (this.c4r = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.Xxr = Vector_1.Vector.Create()),
      (this.Wxr = !1),
      (this.m4r = !1),
      (this.Wse = Vector_1.Vector.Create()),
      (this.d4r = Vector_1.Vector.Create()),
      (this.C4r = Vector_1.Vector.Create()),
      (this.g4r = Vector_1.Vector.Create()),
      (this.n5t = Vector_1.Vector.Create()),
      (this.OnCatcherForceRemove = (t, i) => {
        (t !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce &&
          t !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal) ||
          (this.aWl && this.EndBeCaught()),
          EventSystem_1.EventSystem.HasWithTarget(
            i,
            EventDefine_1.EEventName.RemoveEntity,
            this.OnCatcherForceRemove,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              i,
              EventDefine_1.EEventName.RemoveEntity,
              this.OnCatcherForceRemove,
            );
      });
  }
  OnInit() {
    return (
      (this.Xte = this.Entity.GetComponent(203)),
      (this.m1t = this.Entity.GetComponent(172)),
      !0
    );
  }
  OnStart() {
    (this.HBr = this.Entity.GetComponent(173)),
      (this.Gce = this.Entity.GetComponent(176)),
      (this.cBe = this.Entity.GetComponent(39)),
      (this.Hte = this.Entity.GetComponent(3));
    var t = this.Entity.GetComponent(0);
    return (
      (this.t4r = t?.GetEntityPropertyConfig()),
      this.f4r(),
      this.p4r(),
      (this.i4r = this.Xte.ListenForTagAddOrRemove(1008164187, this._4r)),
      this.ewr(),
      !0
    );
  }
  OnEnd() {
    this.v4r(),
      this.Xte?.Valid &&
        (this.Xte.RemoveTag(665255436),
        this.Xte.RemoveTag(-648310348),
        this.Xte.RemoveTag(-1697149502)),
      this.i4r && this.i4r.EndTask(),
      (this.i4r = void 0);
    for (var [, t] of this.s4r) t.Clear();
    this.s4r.clear();
    for (var [, i] of this.a4r) i.Clear();
    return this.a4r.clear(), !0;
  }
  OnActivate() {
    this.h4r = ConfigManager_1.ConfigManager.WorldConfig.GetCaughtDataInfo();
  }
  OnChangeTimeDilation(t) {
    var i = this.Entity.GetComponent(120)?.CurrentTimeScale ?? 1;
    this.Rg1 = t * i * TimeUtil_1.TimeUtil.Millisecond;
  }
  OnTick(t) {
    var i = t * this.Rg1;
    if (0 < this.PendingCaughtList.size) {
      var s,
        e,
        h,
        o = [];
      for ([s, e] of this.PendingCaughtList)
        e &&
          (1 < e[2]
            ? (o.push(s),
              CombatLog_1.CombatLog.Info(
                "Caught",
                this.Entity,
                "超时移除抓取搁置",
                ["caught id", s],
              ))
            : (e[2] += i),
          (h = e[0]?.GetComponent(51))?.aWl) &&
          h?.CorrectPosition();
      for (const C of o) this.PendingCaughtList.delete(C);
    }
    if (0 < this.lWl.size) {
      var a,
        r,
        n,
        _ = [];
      for ([a, r] of this.lWl)
        r &&
          (1 < r[2]
            ? (_.push(a),
              CombatLog_1.CombatLog.Info(
                "Caught",
                this.Entity,
                "超时移除远端抓取搁置",
                ["caught id", a],
              ))
            : (r[2] += i),
          (n = r[0]?.GetComponent(51))?.aWl) &&
          n?.CorrectPosition();
      for (const l of _) this.lWl.delete(l);
    }
    this.aWl && this.CorrectPosition();
  }
  p4r() {
    for (let t = 0; t < 33; t++) {
      var i = this.Hte.Actor.CapsuleComponent.GetCollisionResponseToChannel(t);
      this.l4r.set(t, i);
    }
  }
  f4r() {
    switch (this.Entity.GetComponent(0).GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        this.r4r = this.t4r?.CaughtLevel;
        break;
      default:
        this.r4r = DEFAULT_CAUGHT_LEVEL;
    }
  }
  M4r(i, t) {
    if (!i) return !0;
    if (0 === i.Num()) return !0;
    var s = t.GetComponent(203);
    for (let t = 0; t < i.Num(); t++) {
      var e = i.Get(t);
      if (e && s.HasTag(e.TagId)) return !0;
    }
    return !1;
  }
  E4r(t, i) {
    return !t || this.Entity.GetComponent(39).SkillTarget?.Id === i;
  }
  S4r(t, i) {
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(t, i),
      CombatLog_1.CombatLog.Info(
        "Caught",
        this.Entity,
        "抓取设置对象碰撞通道",
        ["通道", t],
        ["应答", i],
      );
  }
  y4r(i) {
    if (i)
      for (let t = i.Num() - 1; 0 <= t; t--) {
        var s = i.GetKey(t);
        this.S4r(s, i.Get(s));
      }
  }
  I4r() {
    if (this.l4r) {
      var t,
        i,
        s = this.Hte.Actor.CapsuleComponent;
      for ([t, i] of this.l4r) s.SetCollisionResponseToChannel(t, i);
    }
  }
  T4r() {
    var t, i;
    this.o4r
      ? "" !== (i = this.o4r.BindingInfo.TargetMontagePath) &&
        (t = this.Entity?.GetComponent(25)) &&
        (i = t.CreateTaskWithName(i)) &&
        t.PlayMontageTaskWhenReady(i, 0, void 0)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Character",
          22,
          "[Caught.PlayCaughtMontage] 没有CaughtInfoInternal数据",
          ["EntityID:", this.Entity.Id],
        );
  }
  L4r(t, i) {
    var s = Vector_1.Vector.Create(),
      e = Vector_1.Vector.Create(),
      t = (t.Subtraction(i, s), Vector_1.Vector.Create()),
      i = this.Hte;
    t.DeepCopy(i.ActorLocationProxy),
      t.Subtraction(s, s),
      i.HalfHeight && e.Set(0, 0, i.HalfHeight / 2),
      s.Addition(e, s),
      i.SetActorLocation(s.ToUeVector(), "抓取.计算当前对象相对位置的坐标", !0);
  }
  D4r(t) {
    var i = Vector_1.Vector.Create();
    if (0 !== this.nWl) {
      var s = EntitySystem_1.EntitySystem.Get(this.nWl),
        e = (this.Gue.Reset(), this.Hte),
        h = e.ActorLocationProxy;
      switch (t.BindingInfo.CaughtDirectionType) {
        case 0:
          i.DeepCopy(s.GetComponent(3).ActorLocationProxy),
            i.SubtractionEqual(h),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              i,
              this.Gce.GravityUp,
              this.Gue,
            );
          break;
        case 1:
          i.FromUeVector(t.BulletActorComponent.ActorLocationProxy),
            i.SubtractionEqual(h),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              i,
              this.Gce.GravityUp,
              this.Gue,
            );
          break;
        case 2:
          i.FromUeVector(t.BulletActorComponent.ActorLocationProxy),
            i.Subtraction(this.n4r, i),
            i.Set(-i.X, -i.Y, 0),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              i,
              this.Gce.GravityUp,
              this.Gue,
            );
      }
      e.SetActorRotation(this.Gue.ToUeRotator(), "抓取", !1);
    }
  }
  R4r(t) {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(t),
      i = this.Hte.Actor.Mesh;
    if (i?.DoesSocketExist(t)) return i.D_GetSocketTransform(t, 0);
  }
  ResetPosition() {
    var t = this.o4r.BulletEntity?.GetComponent(167)?.ActorLocation;
    this.o4r.BulletEntity &&
      t &&
      (this.Hte.SetActorLocation(t, "抓取.重置抓取位置", !1), this.U4r());
  }
  U4r() {
    var t = this.R4r(this.o4r.BindingInfo.TargetBoneName);
    t &&
      this.L4r(
        Vector_1.Vector.Create(t.GetLocation()),
        this.o4r.BulletEntity.GetComponent(167).ActorLocationProxy,
      );
  }
  BeginCaughtTrigger(i, s) {
    if (
      (CombatLog_1.CombatLog.Info("Caught", this.Entity, "开始抓取触发器"), i)
    )
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t),
          h = DataTableUtil_1.DataTableUtil.GetDataTableRow(
            this.h4r,
            e.toString(),
          );
        if (!h)
          return void CombatLog_1.CombatLog.Warn(
            "Caught",
            this.Entity,
            "抓取失败，配置不存在",
            ["caughtId", e],
          );
        this.wmo = s;
        var o = new CaughtTriggerInfo();
        o.Init(e, h, this.Hte, this, this.wmo),
          CombatLog_1.CombatLog.Info(
            "Caught",
            this.Entity,
            "创建抓取触发器信息",
            ["id", e],
          ),
          this.s4r.set(e, o);
      }
  }
  EndCaughtTrigger() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束抓取触发器");
    for (var [, t] of this.s4r) t.Clear();
    this.s4r.clear();
  }
  CheckCaught(t, i) {
    var s = i.GetComponent(203),
      e = i.GetComponent(51);
    return s.HasTag(-648310348) ||
      !this.M4r(t.TriggerInfo.CaughtTargetTag, i) ||
      !this.E4r(t.TriggerInfo.CaughtAimTarget, i.Id) ||
      s.HasTag(943579542)
      ? 2
      : s.HasTag(627353781) ||
          s.HasTag(501201e3) ||
          s.HasTag(-1800191060) ||
          e.A4r(this.Entity) ||
          t.TriggerInfo.CaughtLevel < e.r4r
        ? 1
        : 0;
  }
  SetCaughtTriggerAnsInfo(t) {
    this.CaughtTriggerAnsMessageId = t;
  }
  SetCaughtBindingAnsInfo(t) {
    this.CaughtBindingAnsMessageId = t;
  }
  TryCaught(t, i) {
    switch (this.CheckCaught(t, i)) {
      case 0:
        var s = this.a4r.get(t.CaughtId);
        if (this.sWl && s) {
          if (s.Targets.length >= t.TriggerInfo.CaughtMxNumber) return;
          this.CaughtTarget(s, i);
        } else
          CombatLog_1.CombatLog.Info(
            "Caught",
            this.Entity,
            "抓取目标至搁置",
            ["target Id", i.Id],
            [
              "target",
              ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i.Id),
            ],
            ["caughtId", t.CaughtId],
          ),
            this.PendingCaughtList.set(t.CaughtId, [
              i,
              Time_1.Time.NowSeconds,
              0,
            ]);
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
          this.Entity.Id,
          i.Id,
          t.CaughtId,
          0,
        ),
          this.Entity.GetComponent(112)?.SetTakeOverTick(!0);
        break;
      case 1:
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
          this.Entity.Id,
          i.Id,
          t.CaughtId,
          1,
        );
        break;
      case 2:
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
          this.Entity.Id,
          i.Id,
          t.CaughtId,
          2,
        );
    }
  }
  BeginCaught(i, s) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "开始抓取绑定器"),
      (this.sWl = !0),
      this.Xte?.AddTag(665255436);
    for (let t = 0; t < i.Num(); t++) {
      var e = i.Get(t),
        h = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.h4r,
          e.toString(),
        );
      if (!h)
        return void CombatLog_1.CombatLog.Warn(
          "Caught",
          this.Entity,
          "抓取失败，配置不存在",
          ["caughtId", e],
        );
      this.wmo = s;
      var h = new CaughtBindingInfo(e, h, this.Hte, this, this.wmo),
        o = (this.a4r.set(e, h), this.PendingCaughtList.get(e)),
        o =
          (CombatLog_1.CombatLog.Info(
            "Caught",
            this.Entity,
            "创建抓取绑定信息",
            ["id", e],
            ["target id", o?.[0].Id],
          ),
          o &&
            (CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取搁置目标"),
            this.CaughtTarget(h, o[0])),
          this.lWl.get(e));
      o &&
        (CombatLog_1.CombatLog.Info(
          "Caught",
          this.Entity,
          "抓取远端搁置目标",
          ["id", e],
          ["remote id", o[0].Id],
        ),
        o[0].GetComponent(51).P4r(h, this.Entity, !0));
    }
  }
  CaughtTarget(i, t) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取目标");
    var s = this.Entity.GetComponent(172);
    for (let t = 0; t < i.BindingInfo.SourceBuffIds.Num(); t++)
      s.AddBuff(Number(i.BindingInfo.SourceBuffIds.Get(t)), {
        InstigatorId: s.CreatureDataId,
        PreMessageId: this.CaughtBindingAnsMessageId,
        Reason: "抓取目标添加buff",
      });
    t.GetComponent(51).BeginBeCaught(i, this.Entity);
  }
  EndCaught() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束抓取绑定器"),
      (this.sWl = !1);
    for (var [, t] of this.a4r) {
      for (const i of t.Targets) i.GetComponent(51).EndBeCaught();
      "" !== t.BindingInfo.EndBulletId &&
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          this.Hte.Actor,
          t.BindingInfo.EndBulletId,
          this.Hte.ActorTransform,
          this.wmo.toString(),
          !1,
          this.CaughtBindingAnsMessageId,
        ),
        t.BulletEntityId &&
          t.BindingInfo.DestroyBullet &&
          BulletController_1.BulletController.DestroyBullet(
            t.BulletEntityId,
            t.BindingInfo.SummonChildBullet,
          ),
        t.Clear();
    }
    this.a4r.clear(), this.Xte.RemoveTag(665255436);
  }
  BeginBeCaught(i, t) {
    CombatLog_1.CombatLog.Info(
      "Caught",
      this.Entity,
      "此对象开始被抓取,若联机通知远端",
      ["CaughtId", i.CaughtId],
    );
    var s = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t),
      e =
        (EventSystem_1.EventSystem.HasWithTarget(
          s,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnCatcherForceRemove,
        ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            s,
            EventDefine_1.EEventName.RemoveEntity,
            this.OnCatcherForceRemove,
          ),
        this.cBe.StopAllSkills("CharacterCaughtNewComponent.BeginBeCaught"),
        this.P4r(i, t),
        t.GetComponent(51));
    for (let t = 0; t < i.BindingInfo.TargetBuffIds.Num(); t++)
      this.m1t.AddBuff(Number(i.BindingInfo.TargetBuffIds.Get(t)), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: e.CaughtBindingAnsMessageId,
        Reason: "被抓取者添加buff",
      });
    s = Protocol_1.Aki.Protocol.Le_.create();
    (s.YVn = Protocol_1.Aki.Protocol.L4s.create()),
      (s.YVn.Zjn = MathUtils_1.MathUtils.NumberToLong(
        t.GetComponent(0).GetCreatureDataId(),
      )),
      (s.YVn._Wn = MathUtils_1.MathUtils.BigIntToLong(BigInt(i.CaughtId))),
      (s.YVn.uWn = !1),
      CombatMessage_1.CombatNet.Send(21017, this.Entity, s);
  }
  ka1(t, i) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "远端被抓取");
    var s = i.GetComponent(51),
      e = s.a4r.get(t);
    s.sWl && e
      ? this.P4r(e, i, !0)
      : (CombatLog_1.CombatLog.Info(
          "Caught",
          this.Entity,
          "远端被抓取至搁置",
          ["CaughtId", t],
          ["InCaught", s.sWl],
          ["bindingInfo", !!e],
        ),
        s.lWl.set(t, [this.Entity, Time_1.Time.NowSeconds, 0]));
  }
  P4r(t, i, s = !1) {
    CombatLog_1.CombatLog.Info(
      "Caught",
      this.Entity,
      "开始被抓取",
      ["caught id", t.CaughtId],
      ["位置", this.Hte?.Actor.D_K2_GetActorLocation()],
      ["速度", this.Hte?.ActorVelocity],
    ),
      t.Targets.push(this.Entity),
      this.n5t.Reset(),
      (this.aWl = !0),
      (this.hWl = s),
      (this.o4r = t),
      (this.nWl = i.Id),
      this.Gce.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
      this.Hte?.Actor.KuroSetMovementMode({
        Mode: 5,
        CustomMode: 0,
        Context: "[CharacterCaughtNewComponent.BeginBeCaughtInternal]",
      }),
      this.HBr.SetMoveState(
        CharacterUnifiedStateTypes_1.ECharMoveState.Captured,
      ),
      this.Hte?.SetEnableVoxelDetection(
        !1,
        "被抓取者关闭体素检测，防止因为穿地导致误检测",
      ),
      this.y4r(t.BindingInfo.CollisionResponseToChannel),
      this.T4r(),
      this.Xte.AddTag(-648310348),
      this.Xte.AddTag(-1697149502);
    var e,
      s = this.R4r(t.BindingInfo.TargetBoneName),
      h = t.BulletEntity;
    h?.Valid
      ? ((e = t.BulletActorComponent.Owner.D_K2_GetActorLocation()),
        this.Hte.SetActorLocation(e, "抓取.开始被抓取", !1),
        s
          ? this.L4r(
              Vector_1.Vector.Create(s.GetLocation()),
              Vector_1.Vector.Create(e),
            )
          : this.L4r(
              Vector_1.Vector.Create(this.Hte.ActorLocationProxy),
              Vector_1.Vector.Create(e),
            ),
        ((s =
          BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
            14,
          )).IsParentActor = !1),
        (s.Actor = this.Hte.Actor),
        (s.LocationRule = 2),
        (s.RotationRule = 2),
        (s.ScaleRule = 2),
        (s.WeldSimulatedBodies = !0),
        BulletController_1.BulletController.GetActionRunner().AddAction(
          h.GetBulletInfo(),
          s,
        ))
      : CombatLog_1.CombatLog.Warn("Caught", this.Entity, "抓取绑定失败"),
      this.D4r(t),
      (0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) &&
        this.Hte.SetRadiusAndHalfHeight(
          this.Hte.Radius * ZOOM_PRECENTAGE,
          this.Hte.HalfHeight * ZOOM_PRECENTAGE,
          !1,
        ),
      GlobalData_1.GlobalData.BpEventManager.抓取目标成功时.Broadcast(
        i.Id,
        this.Entity.Id,
        t.CaughtId,
      );
  }
  EndBeCaught() {
    var t;
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束被抓取"),
      this.EndBeCaughtInternal(),
      this.hWl ||
        (((t = Protocol_1.Aki.Protocol.Le_.create()).YVn =
          Protocol_1.Aki.Protocol.L4s.create()),
        (t.YVn.uWn = !0),
        CombatLog_1.CombatLog.Info(
          "Caught",
          this.Entity,
          "此对象结束被抓取,若联机通知远端",
          ["CaughtId", this.o4r?.CaughtId],
        ),
        CombatMessage_1.CombatNet.Send(21017, this.Entity, t));
  }
  EndBeCaughtHandle() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "远端结束被抓取"),
      this.EndBeCaughtInternal();
  }
  EndBeCaughtInternal() {
    var t;
    this.aWl &&
      ((this.aWl = !1),
      CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束被抓取"),
      this.Xte.RemoveTag(-648310348),
      this.Xte.RemoveTag(-1697149502),
      (t = this.Hte) &&
        (t.ResetCapsuleRadiusAndHeight(),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          t.ActorForwardProxy,
          this.Gce.GravityUp,
          this.Gue,
        ),
        t.SetActorRotation(this.Gue.ToUeRotator(), "EndBeCaught", !1)),
      this.nWl && (t?.Actor.K2_DetachFromActor(1, 1, 1), this.I4r()),
      t?.Actor.KuroSetMovementMode({
        Mode: 3,
        CustomMode: 0,
        Context: "[CharacterCaughtNewComponent.EndBeCaughtInternal]",
      }),
      this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other),
      this.x4r(),
      (this.o4r = void 0),
      t?.SetEnableVoxelDetection(!0, "被抓取者结束被抓取状态，恢复体素检测"),
      (this.nWl = 0),
      CombatLog_1.CombatLog.Info(
        "Caught",
        this.Entity,
        "结束被抓取",
        ["位置", t?.Actor.D_K2_GetActorLocation()],
        ["速度", t?.ActorVelocity],
      ));
  }
  x4r() {
    var t = this.Hte,
      i = EntitySystem_1.EntitySystem.Get(this.nWl);
    if (i) {
      var s = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(i);
      EventSystem_1.EventSystem.HasWithTarget(
        s,
        EventDefine_1.EEventName.RemoveEntity,
        this.OnCatcherForceRemove,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          s,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnCatcherForceRemove,
        ),
        this.Fse.HitResult?.Clear(),
        (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
      const e = i.GetComponent(3).ActorLocation;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.Fse,
          t.ActorLocation,
        ),
        (this.Fse.Radius = 0.3),
        (this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Fse,
          PROFILE_KEY2,
        )),
        this.Wxr &&
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.Fse.HitResult,
            0,
            this.n5t,
          ),
          (this.n5t = this.SetAddRadiusLocation(
            this.g4r,
            this.n5t,
            t.Radius + ADD_LENGTH,
          )),
          this.n5t.IsZero() ||
            (t.SetActorLocation(this.n5t.ToUeVector(), "抓取.结束被抓取", !1),
            CombatLog_1.CombatLog.Info(
              "Caught",
              this.Entity,
              "被抓取结束时与抓取者碰撞检测修正",
              ["FixPos", this.n5t],
              ["StartTrace", e],
              ["EndTrace", t.ActorLocation],
              ["Radius", t.Radius],
            )));
    } else
      CombatLog_1.CombatLog.Error(
        "Caught",
        this.Entity,
        "该实体被抓取结束时无法找到抓取者！",
        ["BeCaughtEntity", this.Entity.Id],
      );
    this.Fse.HitResult?.Clear(),
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
    const e = Vector_1.Vector.Create(
      t.ActorLocation.X,
      t.ActorLocation.Y,
      t.ActorLocation.Z + t.Radius + ADD_LENGTH,
    );
    s = Vector_1.Vector.Create(
      t.ActorLocation.X,
      t.ActorLocation.Y,
      t.ActorLocation.Z - t.Radius - ADD_LENGTH,
    );
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, e),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, s),
      (this.Fse.Radius = 0.3),
      (this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Fse,
        PROFILE_KEY2,
      )),
      this.Wxr &&
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Fse.HitResult,
          0,
          this.n5t,
        ),
        this.n5t.Addition(
          Vector_1.Vector.Create(0, 0, t.Radius + ADD_LENGTH),
          this.n5t,
        ),
        this.n5t.IsZero() ||
          (t.SetActorLocation(this.n5t.ToUeVector(), "抓取.结束被抓取", !1),
          CombatLog_1.CombatLog.Info(
            "Caught",
            this.Entity,
            "被抓取结束时地面碰撞检测修正",
            ["FixPos", this.n5t],
            ["StartTrace", e],
            ["EndTrace", t.ActorLocation],
            ["Radius", t.Radius],
          )));
  }
  w4r(t, i) {
    var s = t.GetComponent(175);
    s
      ? s.GetCameraPosition(i)
      : i.DeepCopy(t.GetComponent(1).ActorLocationProxy);
  }
  A4r(t) {
    return (
      this.Fse.HitResult?.Clear(),
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
      this.w4r(t, this.Xxr),
      this.c4r.DeepCopy(this.Xxr),
      this.w4r(this.Entity, this.uae),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.Fse,
        this.c4r,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.Fse,
        this.uae,
      ),
      (this.Fse.Radius = 0.3),
      (this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Fse,
        PROFILE_KEY2,
      )),
      (this.m4r = this.Wxr),
      this.m4r
    );
  }
  CorrectPosition() {
    this.Fse.HitResult?.Clear(),
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
    var t = EntitySystem_1.EntitySystem.Get(this.nWl);
    if (t && t.Valid)
      if (
        (this.w4r(t, this.Xxr),
        this.c4r.DeepCopy(this.Xxr),
        this.w4r(this.Entity, this.uae),
        this.m4r
          ? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.Fse,
              this.uae,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.Fse,
              this.c4r,
            ))
          : (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.Fse,
              this.c4r,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.Fse,
              this.uae,
            )),
        (this.Fse.Radius = 0.3),
        (this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Fse,
          PROFILE_KEY2,
        )),
        this.Wxr)
      ) {
        if (
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.Fse.HitResult,
            0,
            this.Wse,
          ),
          this.m4r)
        ) {
          var i = this.Hte?.ActorLocationProxy;
          if (
            (this.c4r.Subtraction(i, this.C4r),
            this.Wse.Subtraction(this.c4r, this.g4r),
            this.g4r.Size() + this.Hte.Radius / ZOOM_PRECENTAGE >
              this.C4r.Size())
          )
            return (
              (this.n5t = this.SetAddRadiusLocation(
                this.g4r,
                this.Wse,
                this.Hte.Radius / ZOOM_PRECENTAGE + ADD_LENGTH,
              )),
              void this.Hte.SetActorLocation(
                this.n5t.ToUeVector(),
                "抓取.检测抓取者跟被抓取者之间是否有碰撞",
                !0,
              )
            );
        } else {
          i = this.Hte?.ActorLocationProxy;
          this.c4r.Subtraction(i, this.C4r),
            this.c4r.Subtraction(this.Wse, this.g4r),
            this.Wse.Subtraction(i, this.d4r),
            this.g4r.Size() - this.Hte.Radius / ZOOM_PRECENTAGE <
              this.C4r.Size() &&
              ((this.n5t = this.SetAddRadiusLocation(
                this.g4r,
                this.Wse,
                this.Hte.Radius / ZOOM_PRECENTAGE + ADD_LENGTH,
              )),
              this.Hte.SetActorLocation(
                this.n5t.ToUeVector(),
                "抓取.检测抓取者跟被抓取者之间是否有碰撞",
                !0,
              ));
        }
        this.d4r.Size() <= t.GetComponent(3).Radius &&
          t.GetComponent(176).SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      } else this.ResetPosition();
    else this.aWl && this.EndBeCaught();
  }
  ewr() {
    (this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Fse.bIsSingle = !0),
      (this.Fse.bIgnoreSelf = !0),
      (this.Fse.bTraceComplex = !0),
      (0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) &&
        (this.Fse.Radius = this.Hte.DefaultRadius),
      IS_DEBUG && ((this.Fse.DrawTime = 5), this.Fse.SetDrawDebugTrace(1)),
      this.Fse.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      this.Fse.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
      );
  }
  v4r() {
    this.Fse && (this.Fse.Dispose(), (this.Fse = void 0));
  }
  GetBoneTransform(t, i) {
    t = t.GetComponent(3)?.Actor?.Mesh;
    if (-1 !== t.GetAllSocketNames().FindIndex(i))
      return t.D_GetSocketTransform(i, 0);
  }
  SetAddRadiusLocation(t, i, s) {
    var e = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create();
    return (
      h.DeepCopy(i),
      e.DeepCopy(t),
      e.Normalize(),
      e.Multiply(s, e),
      h.Addition(e, h),
      h
    );
  }
  static CaughtNotify(t, i) {
    var s = MathUtils_1.MathUtils.LongToBigInt(i.YVn._Wn).toString(),
      t =
        (CombatLog_1.CombatLog.Info(
          "Caught",
          t,
          "收到抓取Notify",
          ["抓取Id", s],
          ["is end", i.YVn.uWn],
        ),
        t?.GetComponent(51));
    t &&
      (i.YVn.uWn
        ? t.EndBeCaughtHandle()
        : ((i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
            MathUtils_1.MathUtils.LongToNumber(i.YVn.Zjn),
          )),
          t.ka1(s, i.Entity)));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("zFn", !0)],
  CharacterCaughtNewComponent,
  "CaughtNotify",
  null,
),
  (CharacterCaughtNewComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(51)],
    CharacterCaughtNewComponent,
  )),
  (exports.CharacterCaughtNewComponent = CharacterCaughtNewComponent);
//# sourceMappingURL=CharacterCaughtNewComponent.js.map
