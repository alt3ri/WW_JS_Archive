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
    );
    (this.BulletEntity =
      ModelManager_1.ModelManager.BulletModel?.GetBulletEntityById(t)),
      (this.BulletActorComponent = this.BulletEntity?.GetComponent(155)),
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
      this.CaughtActor && ActorSystem_1.ActorSystem.Put(this.CaughtActor),
      (this.CaughtActor = void 0),
      (this.BulletEntity = void 0),
      (this.BulletActorComponent = void 0),
      (this.Handle = void 0);
  }
}
exports.CaughtTriggerInfo = CaughtTriggerInfo;
class CaughtBindingInfo {
  constructor(t, i, s, e) {
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
        e.toString(),
        !1,
      )),
      (this.BulletActorComponent = this.BulletEntity.GetComponent(155));
  }
  get BulletEntity() {
    return EntitySystem_1.EntitySystem.Get(this.BulletEntityId);
  }
  Clear() {
    (this.CaughtId = ""),
      (this.BindingInfo = void 0),
      (this.AYo = void 0),
      this.CaughtActor && ActorSystem_1.ActorSystem.Put(this.CaughtActor),
      (this.CaughtActor = void 0),
      (this.BulletEntityId = void 0),
      (this.BulletActorComponent = void 0);
  }
}
exports.CaughtBindingInfo = CaughtBindingInfo;
let CharacterCaughtNewComponent = class CharacterCaughtNewComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.e4r = void 0),
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
      (this.n4r = Vector_1.Vector.Create()),
      (this.s4r = new Map()),
      (this.a4r = new Map()),
      (this.h4r = void 0),
      (this.l4r = new Map()),
      (this._4r = (t, i) => {
        i &&
          (this.InCaught && this.EndCaught(), this.BeCaught) &&
          this.EndBeCaught();
      }),
      (this.InCaught = !1),
      (this.BeCaught = !1),
      (this.RemoteBeCaught = !1),
      (this.PendingCaughtList = new Map()),
      (this.PendingRemoteCaughtList = new Map()),
      (this.wmo = 0),
      (this.u4r = !1),
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
          (this.BeCaught && this.EndBeCaught()),
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
      (this.Xte = this.Entity.GetComponent(190)),
      (this.m1t = this.Entity.GetComponent(160)),
      !0
    );
  }
  OnStart() {
    (this.e4r = this.Entity.GetComponent(49)),
      (this.HBr = this.Entity.GetComponent(161)),
      (this.Gce = this.Entity.GetComponent(164)),
      (this.cBe = this.Entity.GetComponent(34)),
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
  OnTick(t) {
    if (0 < this.PendingCaughtList.size) {
      var i,
        s,
        e,
        h = [];
      for ([i, [s, e]] of this.PendingCaughtList) {
        Time_1.Time.NowSeconds > e + 1 &&
          (h.push(i),
          CombatLog_1.CombatLog.Info(
            "Caught",
            this.Entity,
            "超时移除抓取搁置",
          ));
        var o = s?.GetComponent(45);
        o?.BeCaught && o?.CorrectPosition();
      }
      for (const l of h) this.PendingCaughtList.delete(l);
    }
    if (0 < this.PendingRemoteCaughtList.size) {
      var a,
        r,
        n,
        _ = [];
      for ([a, [r, n]] of this.PendingRemoteCaughtList) {
        Time_1.Time.NowSeconds > n + 1 &&
          (_.push(a),
          CombatLog_1.CombatLog.Info(
            "Caught",
            this.Entity,
            "超时移除远端抓取搁置",
          ));
        var C = r?.GetComponent(45);
        C?.BeCaught && C?.CorrectPosition();
      }
      for (const g of _) this.PendingRemoteCaughtList.delete(g);
    }
    this.BeCaught && this.CorrectPosition();
  }
  p4r() {
    for (let t = 0; t < 33; t++) {
      var i =
        this.Entity.GetComponent(
          3,
        ).Actor.CapsuleComponent.GetCollisionResponseToChannel(t);
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
    var s = t.GetComponent(190);
    for (let t = 0; t < i.Num(); t++) {
      var e = i.Get(t);
      if (e && s.HasTag(e.TagId)) return !0;
    }
    return !1;
  }
  E4r(t, i) {
    return !t || this.Entity.GetComponent(34).SkillTarget?.Id === i;
  }
  S4r(t, i) {
    this.Entity.GetComponent(
      3,
    ).Actor.CapsuleComponent.SetCollisionResponseToChannel(t, i);
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
        s = this.Entity.GetComponent(3).Actor.CapsuleComponent;
      for ([t, i] of this.l4r) s.SetCollisionResponseToChannel(t, i);
    }
  }
  T4r() {
    var t;
    this.o4r
      ? "" !== (t = this.o4r.BindingInfo.TargetMontagePath) &&
        this.Entity?.GetComponent(22).PlayMontageAsync(t)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Character",
          23,
          "[Caught.PlayCaughtMontage] 没有CaughtInfoInternal数据",
          ["EntityID:", this.Entity.Id],
        );
  }
  L4r(t, i) {
    var s = Vector_1.Vector.Create(),
      e = Vector_1.Vector.Create(0, 0, 0),
      t = (t.Subtraction(i, s), Vector_1.Vector.Create()),
      i = this.Entity.GetComponent(3);
    t.DeepCopy(i.ActorLocationProxy),
      t.Subtraction(s, s),
      i?.HalfHeight && e.Set(0, 0, i.HalfHeight / 2),
      s.Addition(e, s),
      i.SetActorLocation(s.ToUeVector(), "抓取.计算当前对象相对位置的坐标", !0);
  }
  D4r(t) {
    var i = Vector_1.Vector.Create();
    if (0 !== this.e4r.RoleId) {
      var s = this.e4r.RoleId,
        e = EntitySystem_1.EntitySystem.Get(s),
        h = Rotator_1.Rotator.Create(Rotator_1.Rotator.ZeroRotatorProxy),
        s = this.Entity.GetComponent(3),
        o = s.ActorLocationProxy;
      switch (t.BindingInfo.CaughtDirectionType) {
        case 0:
          i.DeepCopy(e.GetComponent(3).ActorLocationProxy),
            i.SubtractionEqual(o),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              i,
              Vector_1.Vector.UpVectorProxy,
              h,
            );
          break;
        case 1:
          i.FromUeVector(t.BulletActorComponent.ActorLocationProxy),
            i.SubtractionEqual(o),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              i,
              Vector_1.Vector.UpVectorProxy,
              h,
            );
          break;
        case 2:
          i.FromUeVector(t.BulletActorComponent.ActorLocationProxy),
            i.Subtraction(this.n4r, i),
            i.Set(-i.X, -i.Y, 0),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              i,
              Vector_1.Vector.UpVectorProxy,
              h,
            );
      }
      s.SetActorRotation(h.ToUeRotator(), "抓取", !1);
    }
  }
  R4r(t) {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(t),
      i = this.Entity.GetComponent(3).Actor.Mesh;
    if (i?.DoesSocketExist(t)) return i.GetSocketTransform(t, 0);
  }
  ResetPosition() {
    var t = this.Entity.GetComponent(3),
      i = this.o4r.BulletEntity?.GetComponent(155)?.ActorLocation;
    this.o4r.BulletEntity &&
      i &&
      (t.SetActorLocation(i, "抓取.重置抓取位置", !1), this.U4r());
  }
  U4r() {
    var t = this.R4r(this.o4r.BindingInfo.TargetBoneName);
    t &&
      this.L4r(
        Vector_1.Vector.Create(t.GetLocation()),
        this.o4r.BulletEntity.GetComponent(155).ActorLocationProxy,
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
          CombatLog_1.CombatLog.Info("Caught", this.Entity, "创建触发器信息", [
            "id",
            e,
          ]),
          this.s4r.set(e, o);
      }
  }
  EndCaughtTrigger() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束抓取触发器");
    for (var [, t] of this.s4r) t.Clear();
    this.s4r.clear();
  }
  CheckCaught(t, i) {
    var s = i.GetComponent(190),
      e = i.GetComponent(45);
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
  TryCaught(t, i) {
    switch (this.CheckCaught(t, i)) {
      case 0:
        var s = this.a4r.get(t.CaughtId);
        if (this.InCaught && s) {
          if (s.Targets.length >= t.TriggerInfo.CaughtMxNumber) return;
          this.CaughtTarget(s, i);
        } else
          CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取目标至搁置", [
            "target",
            ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i.Id),
          ]),
            this.PendingCaughtList.set(t.CaughtId, [i, Time_1.Time.NowSeconds]);
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
          this.Entity.Id,
          i.Id,
          t.CaughtId,
          0,
        ),
          this.Entity.GetComponent(102)?.SetTakeOverTick(!0);
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
      (this.InCaught = !0),
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
      var h = new CaughtBindingInfo(e, h, this.Hte, this.wmo),
        o =
          (CombatLog_1.CombatLog.Info("Caught", this.Entity, "创建绑定信息", [
            "id",
            e,
          ]),
          this.a4r.set(e, h),
          this.PendingCaughtList.get(e)),
        o =
          (o &&
            (CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取搁置目标"),
            this.CaughtTarget(h, o[0])),
          this.PendingRemoteCaughtList.get(e));
      o &&
        (CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取远端搁置目标"),
        o[0].GetComponent(45).P4r(h, this.Entity, !0));
    }
  }
  CaughtTarget(i, t) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "执行抓取目标");
    var s = this.Entity.GetComponent(160);
    for (let t = 0; t < i.BindingInfo.SourceBuffIds.Num(); t++)
      s.AddBuffFromAnimNotify(i.BindingInfo.SourceBuffIds.Get(t), void 0, {
        InstigatorId: s.CreatureDataId,
        Reason: "抓取目标添加buff",
      });
    t.GetComponent(45).BeginBeCaught(i, this.Entity);
  }
  EndCaught() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束抓取绑定器"),
      (this.InCaught = !1);
    for (var [, t] of this.a4r) {
      for (const s of t.Targets) s.GetComponent(45).EndBeCaught();
      var i;
      "" !== t.BindingInfo.EndBulletId &&
        ((i = this.Entity.GetComponent(3)),
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          i.Actor,
          t.BindingInfo.EndBulletId,
          i.ActorTransform,
          this.wmo.toString(),
          !1,
        )),
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
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "开始被抓取", [
      "CaughtId",
      i.CaughtId,
    ]);
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
        t.GetComponent(160));
    for (let t = 0; t < i.BindingInfo.TargetBuffIds.Num(); t++)
      this.m1t.AddBuffFromAnimNotify(i.BindingInfo.TargetBuffIds.Get(t), e, {
        InstigatorId: this.m1t.CreatureDataId,
        Reason: "被抓取者添加buff",
      });
    s = Protocol_1.Aki.Protocol.s4n.create();
    (s.YVn = Protocol_1.Aki.Protocol.L4s.create()),
      (s.YVn.Zjn = MathUtils_1.MathUtils.NumberToLong(
        t.GetComponent(0).GetCreatureDataId(),
      )),
      (s.YVn._Wn = MathUtils_1.MathUtils.BigIntToLong(BigInt(i.CaughtId))),
      (s.YVn.uWn = !1),
      CombatMessage_1.CombatNet.Call(23451, this.Entity, s, () => {});
  }
  BeginBeCaughtHandle(t, i) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "远端被抓取");
    var s = i.GetComponent(45),
      e = s.a4r.get(t);
    s.InCaught && e
      ? this.P4r(e, i, !0)
      : (CombatLog_1.CombatLog.Info(
          "Caught",
          this.Entity,
          "远端被抓取至搁置",
          ["CaughtId", t],
          ["InCaught", s.InCaught],
          ["bindingInfo", !!e],
        ),
        s.PendingRemoteCaughtList.set(t, [
          this.Entity,
          Time_1.Time.NowSeconds,
        ]));
  }
  P4r(t, i, s = !1) {
    (this.u4r = !1),
      CombatLog_1.CombatLog.Info("Caught", this.Entity, "执行被抓取"),
      t.Targets.push(this.Entity),
      this.n5t.Reset(),
      (this.BeCaught = !0),
      (this.RemoteBeCaught = s),
      (this.o4r = t),
      this.e4r.SetRoleId(i.Id, 3),
      this.Gce.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
      this.Gce.CharacterMovement.SetMovementMode(5, 0),
      this.HBr.SetMoveState(
        CharacterUnifiedStateTypes_1.ECharMoveState.Captured,
      );
    var e,
      s = this.Entity.GetComponent(3),
      h =
        (s.SetEnableVoxelDetection(
          !1,
          "被抓取者关闭体素检测，防止因为穿地导致误检测",
        ),
        this.y4r(t.BindingInfo.CollisionResponseToChannel),
        this.T4r(),
        this.Xte.AddTag(-648310348),
        this.Xte.AddTag(-1697149502),
        this.R4r(t.BindingInfo.TargetBoneName)),
      o = this.Entity.GetComponent(3),
      a = t.BulletEntity;
    a?.Valid
      ? ((e = t.BulletActorComponent.Owner.K2_GetActorLocation()),
        o.SetActorLocation(e, "抓取.开始被抓取", !1),
        h
          ? this.L4r(
              Vector_1.Vector.Create(h.GetLocation()),
              Vector_1.Vector.Create(e),
            )
          : this.L4r(
              Vector_1.Vector.Create(o.ActorLocationProxy),
              Vector_1.Vector.Create(e),
            ),
        ((h =
          BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
            14,
          )).IsParentActor = !1),
        (h.Actor = s.Actor),
        (h.LocationRule = 2),
        (h.RotationRule = 2),
        (h.ScaleRule = 2),
        (h.WeldSimulatedBodies = !0),
        BulletController_1.BulletController.GetActionRunner().AddAction(
          a.GetBulletInfo(),
          h,
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
  get IsContinue() {
    return this.u4r && !(this.u4r = !1);
  }
  EndBeCaught() {
    var t;
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束被抓取"),
      this.EndBeCaughtInternal(),
      this.RemoteBeCaught ||
        (((t = Protocol_1.Aki.Protocol.s4n.create()).YVn =
          Protocol_1.Aki.Protocol.L4s.create()),
        (t.YVn.uWn = !0),
        CombatMessage_1.CombatNet.Call(23451, this.Entity, t, () => {}));
  }
  EndBeCaughtHandle() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "远端结束被抓取"),
      this.EndBeCaughtInternal();
  }
  EndBeCaughtInternal() {
    (this.u4r = !0),
      CombatLog_1.CombatLog.Info("Caught", this.Entity, "执行结束被抓取"),
      (this.BeCaught = !1),
      this.Xte.RemoveTag(-648310348),
      this.Xte.RemoveTag(-1697149502);
    var t = this.Entity.GetComponent(3);
    t &&
      (t.ResetCapsuleRadiusAndHeight(),
      t.SetActorRotation(
        new UE.Rotator(0, t.ActorRotationProxy.Yaw, 0),
        "EndBeCaught",
        !1,
      )),
      this.e4r.RoleId &&
        0 !== this.e4r.RoleId &&
        (this.Entity.GetComponent(3).Actor.K2_DetachFromActor(1, 1, 1),
        this.I4r()),
      this.Entity.GetComponent(164).CharacterMovement.SetMovementMode(3, 0),
      this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other),
      this.x4r(),
      (this.o4r = void 0),
      t.SetEnableVoxelDetection(!0, "被抓取者结束被抓取状态，恢复体素检测"),
      this.e4r.SetRoleId(0, 0);
  }
  x4r() {
    var t = this.Entity.GetComponent(3),
      i = EntitySystem_1.EntitySystem.Get(this.e4r.RoleId);
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
    var s = t.GetComponent(163);
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
    var t = this.Entity.GetComponent(49)?.RoleId,
      t = EntitySystem_1.EntitySystem.Get(t);
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
          var i = this.Entity.GetComponent(3)?.ActorLocationProxy;
          if (
            (this.c4r.Subtraction(i, this.C4r),
            this.Wse.Subtraction(this.c4r, this.g4r),
            this.g4r.Size() +
              this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE >
              this.C4r.Size())
          )
            return (
              (this.n5t = this.SetAddRadiusLocation(
                this.g4r,
                this.Wse,
                this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE +
                  ADD_LENGTH,
              )),
              void this.Entity.GetComponent(3).SetActorLocation(
                this.n5t.ToUeVector(),
                "抓取.检测抓取者跟被抓取者之间是否有碰撞",
                !0,
              )
            );
        } else {
          i = this.Entity.GetComponent(3)?.ActorLocationProxy;
          this.c4r.Subtraction(i, this.C4r),
            this.c4r.Subtraction(this.Wse, this.g4r),
            this.Wse.Subtraction(i, this.d4r),
            this.g4r.Size() -
              this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE <
              this.C4r.Size() &&
              ((this.n5t = this.SetAddRadiusLocation(
                this.g4r,
                this.Wse,
                this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE +
                  ADD_LENGTH,
              )),
              this.Entity.GetComponent(3).SetActorLocation(
                this.n5t.ToUeVector(),
                "抓取.检测抓取者跟被抓取者之间是否有碰撞",
                !0,
              ));
        }
        this.d4r.Size() <= t.GetComponent(3).Radius &&
          t.GetComponent(164).SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      } else this.ResetPosition();
    else this.BeCaught && this.EndBeCaught();
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
      return t.GetSocketTransform(i, 0);
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
    var s,
      t = t?.GetComponent(45);
    t &&
      (i.YVn.uWn
        ? t.EndBeCaughtHandle()
        : ((s = ModelManager_1.ModelManager.CreatureModel.GetEntity(
            MathUtils_1.MathUtils.LongToNumber(i.YVn.Zjn),
          )),
          t.BeginBeCaughtHandle(
            MathUtils_1.MathUtils.LongToBigInt(i.YVn._Wn).toString(),
            s.Entity,
          )));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("zFn")],
  CharacterCaughtNewComponent,
  "CaughtNotify",
  null,
),
  (CharacterCaughtNewComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(45)],
    CharacterCaughtNewComponent,
  )),
  (exports.CharacterCaughtNewComponent = CharacterCaughtNewComponent);
//# sourceMappingURL=CharacterCaughtNewComponent.js.map
