"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var h,
      o = arguments.length,
      r =
        o < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, e, s);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (h = t[a]) && (r = (o < 3 ? h(r) : 3 < o ? h(i, e, r) : h(i, e)) || r);
    return 3 < o && r && Object.defineProperty(i, e, r), r;
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
  CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
  BulletController_1 = require("../../../Bullet/BulletController"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  BulletUtil_1 = require("../../../Bullet/BulletUtil"),
  DEFAULT_CAUGHT_LEVEL = 10,
  ZOOM_PRECENTAGE = 0.1,
  ADD_LENGTH = 5,
  IS_DEBUG = !1,
  PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Camera";
class CaughtTriggerInfo {
  constructor(t, i, e, s, h) {
    (this.Jh = void 0),
      (this.Index = 0),
      (this.CaughtId = ""),
      (this.w$o = void 0),
      (this.TriggerInfo = void 0),
      (this.CaughtActor = void 0),
      (this.BulletEntity = void 0),
      (this.BulletActorComponent = void 0),
      (this.Handle = void 0),
      (this.Jh = e.Entity),
      (this.CaughtId = t),
      (this.w$o = i),
      (this.TriggerInfo = this.w$o.TriggerInfo);
    t = BulletUtil_1.BulletUtil.CreateBulletFromAN(
      e.Actor,
      this.TriggerInfo.BulletId,
      e.ActorTransform,
      h.toString(),
      !1,
    );
    (this.BulletEntity =
      ModelManager_1.ModelManager.BulletModel?.GetBulletEntityById(t)),
      (this.BulletActorComponent = this.BulletEntity?.GetComponent(152)),
      this.BulletEntity &&
        ((this.Handle = (t) => {
          var i = t?.Target;
          this.BulletEntity &&
            i?.Valid &&
            this.BulletEntity.Id === t.BulletEntityId &&
            (((t = i.GetComponent(0)).GetEntityType() !==
              Protocol_1.Aki.Protocol.HBs.Proto_Player &&
              t.GetEntityType() !==
                Protocol_1.Aki.Protocol.HBs.Proto_Monster) ||
              s.TryCaught(this, i));
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
      (this.w$o = void 0),
      this.CaughtActor && ActorSystem_1.ActorSystem.Put(this.CaughtActor),
      (this.CaughtActor = void 0),
      (this.BulletEntity = void 0),
      (this.BulletActorComponent = void 0),
      (this.Handle = void 0);
  }
}
exports.CaughtTriggerInfo = CaughtTriggerInfo;
class CaughtBindingInfo {
  constructor(t, i, e, s) {
    (this.CaughtId = ""),
      (this.w$o = void 0),
      (this.BindingInfo = void 0),
      (this.CaughtActor = void 0),
      (this.BulletEntityId = void 0),
      (this.BulletActorComponent = void 0),
      (this.Targets = []),
      (this.CaughtId = t),
      (this.w$o = i),
      (this.BindingInfo = this.w$o.BindingInfo),
      (this.BulletEntityId = BulletUtil_1.BulletUtil.CreateBulletFromAN(
        e.Actor,
        this.BindingInfo.BulletId,
        e.ActorTransform,
        s.toString(),
        !1,
      )),
      (this.BulletActorComponent = this.BulletEntity.GetComponent(152));
  }
  get BulletEntity() {
    return EntitySystem_1.EntitySystem.Get(this.BulletEntityId);
  }
  Clear() {
    (this.CaughtId = ""),
      (this.BindingInfo = void 0),
      (this.w$o = void 0),
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
      (this.S4r = void 0),
      (this.elt = void 0),
      (this.Xte = void 0),
      (this.mbr = void 0),
      (this.Gce = void 0),
      (this.cBe = void 0),
      (this.Hte = void 0),
      (this.E4r = void 0),
      (this.y4r = void 0),
      (this.I4r = void 0),
      (this.T4r = void 0),
      (this.L4r = Vector_1.Vector.Create()),
      (this.D4r = new Map()),
      (this.R4r = new Map()),
      (this.A4r = void 0),
      (this.U4r = new Map()),
      (this.P4r = (t, i) => {
        i &&
          (this.InCaught && this.EndCaught(), this.BeCaught) &&
          this.EndBeCaught();
      }),
      (this.InCaught = !1),
      (this.BeCaught = !1),
      (this.RemoteBeCaught = !1),
      (this.PendingCaughtList = new Map()),
      (this.PendingRemoteCaughtList = new Map()),
      (this.Gco = 0),
      (this.x4r = !1),
      (this.Fse = void 0),
      (this.w4r = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.pwr = Vector_1.Vector.Create()),
      (this.Cwr = !1),
      (this.B4r = !1),
      (this.Wse = Vector_1.Vector.Create()),
      (this.b4r = Vector_1.Vector.Create()),
      (this.q4r = Vector_1.Vector.Create()),
      (this.G4r = Vector_1.Vector.Create()),
      (this.r4t = Vector_1.Vector.Create()),
      (this.OnCatcherForceRemove = (t, i) => {
        (t !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce &&
          t !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeNormal) ||
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
      (this.Xte = this.Entity.GetComponent(185)),
      (this.elt = this.Entity.GetComponent(157)),
      !0
    );
  }
  OnStart() {
    (this.S4r = this.Entity.GetComponent(47)),
      (this.mbr = this.Entity.GetComponent(158)),
      (this.Gce = this.Entity.GetComponent(161)),
      (this.cBe = this.Entity.GetComponent(33)),
      (this.Hte = this.Entity.GetComponent(3));
    var t = this.Entity.GetComponent(0);
    return (
      (this.E4r = t?.GetEntityPropertyConfig()),
      this.N4r(),
      this.O4r(),
      (this.y4r = this.Xte.ListenForTagAddOrRemove(1008164187, this.P4r)),
      this.Iwr(),
      !0
    );
  }
  OnEnd() {
    this.k4r(),
      this.Xte?.Valid &&
        (this.Xte.RemoveTag(665255436),
        this.Xte.RemoveTag(-648310348),
        this.Xte.RemoveTag(-1697149502)),
      this.y4r && this.y4r.EndTask(),
      (this.y4r = void 0);
    for (var [, t] of this.D4r) t.Clear();
    this.D4r.clear();
    for (var [, i] of this.R4r) i.Clear();
    return this.R4r.clear(), !0;
  }
  OnActivate() {
    this.A4r = ConfigManager_1.ConfigManager.WorldConfig.GetCaughtDataInfo();
  }
  OnTick(t) {
    if (0 < this.PendingCaughtList.size) {
      var i,
        e,
        s,
        h = [];
      for ([i, [e, s]] of this.PendingCaughtList) {
        Time_1.Time.NowSeconds > s + 1 &&
          (h.push(i),
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Caught",
            this.Entity,
            "超时移除抓取搁置",
          ));
        var o = e?.GetComponent(43);
        o?.BeCaught && o?.CorrectPosition();
      }
      for (const C of h) this.PendingCaughtList.delete(C);
    }
    if (0 < this.PendingRemoteCaughtList.size) {
      var r,
        a,
        n,
        _ = [];
      for ([r, [a, n]] of this.PendingRemoteCaughtList) {
        Time_1.Time.NowSeconds > n + 1 &&
          (_.push(r),
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Caught",
            this.Entity,
            "超时移除远端抓取搁置",
          ));
        var l = a?.GetComponent(43);
        l?.BeCaught && l?.CorrectPosition();
      }
      for (const u of _) this.PendingRemoteCaughtList.delete(u);
    }
    this.BeCaught && this.CorrectPosition();
  }
  O4r() {
    for (let t = 0; t < 33; t++) {
      var i =
        this.Entity.GetComponent(
          3,
        ).Actor.CapsuleComponent.GetCollisionResponseToChannel(t);
      this.U4r.set(t, i);
    }
  }
  N4r() {
    switch (this.Entity.GetComponent(0).GetEntityType()) {
      case Protocol_1.Aki.Protocol.HBs.Proto_Player:
      case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
        this.T4r = this.E4r?.CaughtLevel;
        break;
      default:
        this.T4r = DEFAULT_CAUGHT_LEVEL;
    }
  }
  F4r(i, t) {
    if (!i) return !0;
    if (0 === i.Num()) return !0;
    var e = t.GetComponent(185);
    for (let t = 0; t < i.Num(); t++) {
      var s = i.Get(t);
      if (s && e.HasTag(s.TagId)) return !0;
    }
    return !1;
  }
  V4r(t, i) {
    return !t || this.Entity.GetComponent(33).SkillTarget?.Id === i;
  }
  H4r(t, i) {
    this.Entity.GetComponent(
      3,
    ).Actor.CapsuleComponent.SetCollisionResponseToChannel(t, i);
  }
  j4r(i) {
    if (i)
      for (let t = i.Num() - 1; 0 <= t; t--) {
        var e = i.GetKey(t);
        this.H4r(e, i.Get(e));
      }
  }
  W4r() {
    if (this.U4r) {
      var t,
        i,
        e = this.Entity.GetComponent(3).Actor.CapsuleComponent;
      for ([t, i] of this.U4r) e.SetCollisionResponseToChannel(t, i);
    }
  }
  K4r() {
    var t;
    this.I4r
      ? "" !== (t = this.I4r.BindingInfo.TargetMontagePath) &&
        this.Entity?.GetComponent(22).PlayMontageAsync(t)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Character",
          23,
          "[Caught.PlayCaughtMontage] 没有CaughtInfoInternal数据",
          ["EntityID:", this.Entity.Id],
        );
  }
  Q4r(t, i) {
    var e = Vector_1.Vector.Create(),
      s = Vector_1.Vector.Create(0, 0, 0),
      t = (t.Subtraction(i, e), Vector_1.Vector.Create()),
      i = this.Entity.GetComponent(3);
    t.DeepCopy(i.ActorLocationProxy),
      t.Subtraction(e, e),
      i?.HalfHeight && s.Set(0, 0, i.HalfHeight / 2),
      e.Addition(s, e),
      i.SetActorLocation(e.ToUeVector(), "抓取.计算当前对象相对位置的坐标", !0);
  }
  X4r(t) {
    var i = Vector_1.Vector.Create();
    if (0 !== this.S4r.RoleId) {
      var e = this.S4r.RoleId,
        s = EntitySystem_1.EntitySystem.Get(e),
        h = Rotator_1.Rotator.Create(Rotator_1.Rotator.ZeroRotatorProxy),
        e = this.Entity.GetComponent(3),
        o = e.ActorLocationProxy;
      switch (t.BindingInfo.CaughtDirectionType) {
        case 0:
          i.DeepCopy(s.GetComponent(3).ActorLocationProxy),
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
            i.Subtraction(this.L4r, i),
            i.Set(-i.X, -i.Y, 0),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              i,
              Vector_1.Vector.UpVectorProxy,
              h,
            );
      }
      e.SetActorRotation(h.ToUeRotator(), "抓取", !1);
    }
  }
  $4r(t) {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(t),
      i = this.Entity.GetComponent(3).Actor.Mesh;
    if (i?.DoesSocketExist(t)) return i.GetSocketTransform(t, 0);
  }
  ResetPosition() {
    var t = this.Entity.GetComponent(3),
      i = this.I4r.BulletEntity?.GetComponent(152)?.ActorLocation;
    this.I4r.BulletEntity &&
      i &&
      (t.SetActorLocation(i, "抓取.重置抓取位置", !1), this.Y4r());
  }
  Y4r() {
    var t = this.$4r(this.I4r.BindingInfo.TargetBoneName);
    t &&
      this.Q4r(
        Vector_1.Vector.Create(t.GetLocation()),
        this.I4r.BulletEntity.GetComponent(152).ActorLocationProxy,
      );
  }
  BeginCaughtTrigger(i, e) {
    if (
      (CombatDebugController_1.CombatDebugController.CombatInfo(
        "Caught",
        this.Entity,
        "开始抓取触发器",
      ),
      i)
    )
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t),
          h = DataTableUtil_1.DataTableUtil.GetDataTableRow(
            this.A4r,
            s.toString(),
          );
        if (!h)
          return void CombatDebugController_1.CombatDebugController.CombatWarn(
            "Caught",
            this.Entity,
            "抓取失败，配置不存在",
            ["caughtId", s],
          );
        this.Gco = e;
        h = new CaughtTriggerInfo(s, h, this.Hte, this, this.Gco);
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Caught",
          this.Entity,
          "创建触发器信息",
          ["id", s],
        ),
          this.D4r.set(s, h);
      }
  }
  EndCaughtTrigger() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "结束抓取触发器",
    );
    for (var [, t] of this.D4r) t.Clear();
    this.D4r.clear();
  }
  CheckCaught(t, i) {
    var e = i.GetComponent(185),
      s = i.GetComponent(43);
    return e.HasTag(-648310348) ||
      !this.F4r(t.TriggerInfo.CaughtTargetTag, i) ||
      !this.V4r(t.TriggerInfo.CaughtAimTarget, i.Id) ||
      e.HasTag(943579542)
      ? 2
      : e.HasTag(627353781) ||
          e.HasTag(501201e3) ||
          e.HasTag(-1800191060) ||
          s.J4r(this.Entity) ||
          t.TriggerInfo.CaughtLevel < s.T4r
        ? 1
        : 0;
  }
  TryCaught(t, i) {
    switch (this.CheckCaught(t, i)) {
      case 0:
        var e = this.R4r.get(t.CaughtId);
        if (this.InCaught && e) {
          if (e.Targets.length >= t.TriggerInfo.CaughtMxNumber) return;
          this.CaughtTarget(e, i);
        } else
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Caught",
            this.Entity,
            "抓取目标至搁置",
            [
              "target",
              ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i.Id),
            ],
          ),
            this.PendingCaughtList.set(t.CaughtId, [i, Time_1.Time.NowSeconds]);
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(
          this.Entity.Id,
          i.Id,
          t.CaughtId,
          0,
        ),
          this.Entity.GetComponent(99)?.SetTakeOverTick(!0);
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
  BeginCaught(i, e) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "开始抓取绑定器",
    ),
      (this.InCaught = !0),
      this.Xte?.AddTag(665255436);
    for (let t = 0; t < i.Num(); t++) {
      var s = i.Get(t),
        h = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.A4r,
          s.toString(),
        );
      if (!h)
        return void CombatDebugController_1.CombatDebugController.CombatWarn(
          "Caught",
          this.Entity,
          "抓取失败，配置不存在",
          ["caughtId", s],
        );
      this.Gco = e;
      var h = new CaughtBindingInfo(s, h, this.Hte, this.Gco),
        o =
          (CombatDebugController_1.CombatDebugController.CombatInfo(
            "Caught",
            this.Entity,
            "创建绑定信息",
            ["id", s],
          ),
          this.R4r.set(s, h),
          this.PendingCaughtList.get(s)),
        o =
          (o &&
            (CombatDebugController_1.CombatDebugController.CombatInfo(
              "Caught",
              this.Entity,
              "抓取搁置目标",
            ),
            this.CaughtTarget(h, o[0])),
          this.PendingRemoteCaughtList.get(s));
      o &&
        (CombatDebugController_1.CombatDebugController.CombatInfo(
          "Caught",
          this.Entity,
          "抓取远端搁置目标",
        ),
        o[0].GetComponent(43).z4r(h, this.Entity, !0));
    }
  }
  CaughtTarget(i, t) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "执行抓取目标",
    );
    var e = this.Entity.GetComponent(157);
    for (let t = 0; t < i.BindingInfo.SourceBuffIds.Num(); t++)
      e.AddBuffFromAnimNotify(i.BindingInfo.SourceBuffIds.Get(t), void 0, {
        InstigatorId: e.CreatureDataId,
        Reason: "抓取目标添加buff",
      });
    t.GetComponent(43).BeginBeCaught(i, this.Entity);
  }
  EndCaught() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "结束抓取绑定器",
    ),
      (this.InCaught = !1);
    for (var [, t] of this.R4r) {
      for (const e of t.Targets) e.GetComponent(43).EndBeCaught();
      var i;
      "" !== t.BindingInfo.EndBulletId &&
        ((i = this.Entity.GetComponent(3)),
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          i.Actor,
          t.BindingInfo.EndBulletId,
          i.ActorTransform,
          this.Gco.toString(),
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
    this.R4r.clear(), this.Xte.RemoveTag(665255436);
  }
  BeginBeCaught(i, t) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "开始被抓取",
      ["CaughtId", i.CaughtId],
    );
    var e = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t),
      s =
        (EventSystem_1.EventSystem.HasWithTarget(
          e,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnCatcherForceRemove,
        ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            e,
            EventDefine_1.EEventName.RemoveEntity,
            this.OnCatcherForceRemove,
          ),
        this.cBe.StopAllSkills("CharacterCaughtNewComponent.BeginBeCaught"),
        this.z4r(i, t),
        t.GetComponent(157));
    for (let t = 0; t < i.BindingInfo.TargetBuffIds.Num(); t++)
      this.elt.AddBuffFromAnimNotify(i.BindingInfo.TargetBuffIds.Get(t), s, {
        InstigatorId: this.elt.CreatureDataId,
        Reason: "被抓取者添加buff",
      });
    e = Protocol_1.Aki.Protocol.ENn.create();
    (e.a5n = Protocol_1.Aki.Protocol.POs.create()),
      (e.a5n.m9n = MathUtils_1.MathUtils.NumberToLong(
        t.GetComponent(0).GetCreatureDataId(),
      )),
      (e.a5n.I9n = MathUtils_1.MathUtils.BigIntToLong(BigInt(i.CaughtId))),
      (e.a5n.T9n = !1),
      CombatMessage_1.CombatNet.Call(3959, this.Entity, e, () => {});
  }
  BeginBeCaughtHandle(t, i) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "远端被抓取",
    );
    var e = i.GetComponent(43),
      s = e.R4r.get(t);
    e.InCaught && s
      ? this.z4r(s, i, !0)
      : (CombatDebugController_1.CombatDebugController.CombatInfo(
          "Caught",
          this.Entity,
          "远端被抓取至搁置",
          ["CaughtId", t],
          ["InCaught", e.InCaught],
          ["bindingInfo", !!s],
        ),
        e.PendingRemoteCaughtList.set(t, [
          this.Entity,
          Time_1.Time.NowSeconds,
        ]));
  }
  z4r(t, i, e = !1) {
    (this.x4r = !1),
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Caught",
        this.Entity,
        "执行被抓取",
      ),
      t.Targets.push(this.Entity),
      this.r4t.Reset(),
      (this.BeCaught = !0),
      (this.RemoteBeCaught = e),
      (this.I4r = t),
      this.S4r.SetRoleId(i.Id, 3),
      this.Gce.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
      this.Gce.CharacterMovement.SetMovementMode(5, 0),
      this.mbr.SetMoveState(
        CharacterUnifiedStateTypes_1.ECharMoveState.Captured,
      );
    var s,
      e = this.Entity.GetComponent(3),
      h =
        (e.SetEnableVoxelDetection(
          !1,
          "被抓取者关闭体素检测，防止因为穿地导致误检测",
        ),
        this.j4r(t.BindingInfo.CollisionResponseToChannel),
        this.K4r(),
        this.Xte.AddTag(-648310348),
        this.Xte.AddTag(-1697149502),
        this.$4r(t.BindingInfo.TargetBoneName)),
      o = this.Entity.GetComponent(3),
      r = t.BulletEntity;
    r?.Valid
      ? ((s = t.BulletActorComponent.Owner.K2_GetActorLocation()),
        o.SetActorLocation(s, "抓取.开始被抓取", !1),
        h
          ? this.Q4r(
              Vector_1.Vector.Create(h.GetLocation()),
              Vector_1.Vector.Create(s),
            )
          : this.Q4r(
              Vector_1.Vector.Create(o.ActorLocationProxy),
              Vector_1.Vector.Create(s),
            ),
        ((h =
          BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
            14,
          )).IsParentActor = !1),
        (h.Actor = e.Actor),
        (h.LocationRule = 2),
        (h.RotationRule = 2),
        (h.ScaleRule = 2),
        (h.WeldSimulatedBodies = !0),
        BulletController_1.BulletController.GetActionRunner().AddAction(
          r.GetBulletInfo(),
          h,
        ))
      : CombatDebugController_1.CombatDebugController.CombatWarn(
          "Caught",
          this.Entity,
          "抓取绑定失败",
        ),
      this.X4r(t),
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
    return this.x4r && !(this.x4r = !1);
  }
  EndBeCaught() {
    var t;
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "结束被抓取",
    ),
      this.EndBeCaughtInternal(),
      this.RemoteBeCaught ||
        (((t = Protocol_1.Aki.Protocol.ENn.create()).a5n =
          Protocol_1.Aki.Protocol.POs.create()),
        (t.a5n.T9n = !0),
        CombatMessage_1.CombatNet.Call(3959, this.Entity, t, () => {}));
  }
  EndBeCaughtHandle() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Caught",
      this.Entity,
      "远端结束被抓取",
    ),
      this.EndBeCaughtInternal();
  }
  EndBeCaughtInternal() {
    (this.x4r = !0),
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Caught",
        this.Entity,
        "执行结束被抓取",
      ),
      (this.BeCaught = !1),
      this.Xte.RemoveTag(-648310348),
      this.Xte.RemoveTag(-1697149502);
    var t = this.Entity.GetComponent(3),
      i = (t?.ResetCapsuleRadiusAndHeight(), t?.Actor?.CapsuleComponent);
    let e = 0;
    i && (e = i.K2_GetComponentRotation().Yaw);
    i = new UE.Rotator(0, e, 0);
    t.Actor.CapsuleComponent.K2_SetWorldRotation(i, !1, void 0, !1),
      this.S4r.RoleId &&
        0 !== this.S4r.RoleId &&
        (this.Entity.GetComponent(3).Actor.K2_DetachFromActor(1, 1, 1),
        this.W4r()),
      this.Entity.GetComponent(161).CharacterMovement.SetMovementMode(3, 0),
      this.mbr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other),
      this.Z4r(),
      (this.I4r = void 0),
      t.SetEnableVoxelDetection(!0, "被抓取者结束被抓取状态，恢复体素检测"),
      this.S4r.SetRoleId(0, 0);
  }
  Z4r() {
    var t = this.Entity.GetComponent(3),
      i = EntitySystem_1.EntitySystem.Get(this.S4r.RoleId);
    if (i) {
      var e = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(i);
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.RemoveEntity,
        this.OnCatcherForceRemove,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          e,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnCatcherForceRemove,
        ),
        this.Fse.HitResult?.Clear(),
        (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
      const s = i.GetComponent(3).ActorLocation;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, s),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.Fse,
          t.ActorLocation,
        ),
        (this.Fse.Radius = 0.3),
        (this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Fse,
          PROFILE_KEY2,
        )),
        this.Cwr &&
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.Fse.HitResult,
            0,
            this.r4t,
          ),
          (this.r4t = this.SetAddRadiusLocation(
            this.G4r,
            this.r4t,
            t.Radius + ADD_LENGTH,
          )),
          this.r4t.IsZero() ||
            (t.SetActorLocation(this.r4t.ToUeVector(), "抓取.结束被抓取", !1),
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "Caught",
              this.Entity,
              "被抓取结束时与抓取者碰撞检测修正",
              ["FixPos", this.r4t],
              ["StartTrace", s],
              ["EndTrace", t.ActorLocation],
              ["Radius", t.Radius],
            )));
    } else
      CombatDebugController_1.CombatDebugController.CombatError(
        "Caught",
        this.Entity,
        "该实体被抓取结束时无法找到抓取者！",
        ["BeCaughtEntity", this.Entity.Id],
      );
    this.Fse.HitResult?.Clear(),
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
    const s = Vector_1.Vector.Create(
      t.ActorLocation.X,
      t.ActorLocation.Y,
      t.ActorLocation.Z + t.Radius + ADD_LENGTH,
    );
    e = Vector_1.Vector.Create(
      t.ActorLocation.X,
      t.ActorLocation.Y,
      t.ActorLocation.Z - t.Radius - ADD_LENGTH,
    );
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, s),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, e),
      (this.Fse.Radius = 0.3),
      (this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Fse,
        PROFILE_KEY2,
      )),
      this.Cwr &&
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Fse.HitResult,
          0,
          this.r4t,
        ),
        this.r4t.Addition(
          Vector_1.Vector.Create(0, 0, t.Radius + ADD_LENGTH),
          this.r4t,
        ),
        this.r4t.IsZero() ||
          (t.SetActorLocation(this.r4t.ToUeVector(), "抓取.结束被抓取", !1),
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Caught",
            this.Entity,
            "被抓取结束时地面碰撞检测修正",
            ["FixPos", this.r4t],
            ["StartTrace", s],
            ["EndTrace", t.ActorLocation],
            ["Radius", t.Radius],
          )));
  }
  e5r(t, i) {
    var e = t.GetComponent(160);
    e
      ? e.GetCameraPosition(i)
      : i.DeepCopy(t.GetComponent(1).ActorLocationProxy);
  }
  J4r(t) {
    return (
      this.Fse.HitResult?.Clear(),
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
      this.e5r(t, this.pwr),
      this.w4r.DeepCopy(this.pwr),
      this.e5r(this.Entity, this.uae),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.Fse,
        this.w4r,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.Fse,
        this.uae,
      ),
      (this.Fse.Radius = 0.3),
      (this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Fse,
        PROFILE_KEY2,
      )),
      (this.B4r = this.Cwr),
      this.B4r
    );
  }
  CorrectPosition() {
    this.Fse.HitResult?.Clear(),
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World);
    var t = this.Entity.GetComponent(47)?.RoleId,
      t = EntitySystem_1.EntitySystem.Get(t);
    if (t && t.Valid)
      if (
        (this.e5r(t, this.pwr),
        this.w4r.DeepCopy(this.pwr),
        this.e5r(this.Entity, this.uae),
        this.B4r
          ? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.Fse,
              this.uae,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.Fse,
              this.w4r,
            ))
          : (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.Fse,
              this.w4r,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.Fse,
              this.uae,
            )),
        (this.Fse.Radius = 0.3),
        (this.Cwr = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Fse,
          PROFILE_KEY2,
        )),
        this.Cwr)
      ) {
        if (
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.Fse.HitResult,
            0,
            this.Wse,
          ),
          this.B4r)
        ) {
          var i = this.Entity.GetComponent(3)?.ActorLocationProxy;
          if (
            (this.w4r.Subtraction(i, this.q4r),
            this.Wse.Subtraction(this.w4r, this.G4r),
            this.G4r.Size() +
              this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE >
              this.q4r.Size())
          )
            return (
              (this.r4t = this.SetAddRadiusLocation(
                this.G4r,
                this.Wse,
                this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE +
                  ADD_LENGTH,
              )),
              void this.Entity.GetComponent(3).SetActorLocation(
                this.r4t.ToUeVector(),
                "抓取.检测抓取者跟被抓取者之间是否有碰撞",
                !0,
              )
            );
        } else {
          i = this.Entity.GetComponent(3)?.ActorLocationProxy;
          this.w4r.Subtraction(i, this.q4r),
            this.w4r.Subtraction(this.Wse, this.G4r),
            this.Wse.Subtraction(i, this.b4r),
            this.G4r.Size() -
              this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE <
              this.q4r.Size() &&
              ((this.r4t = this.SetAddRadiusLocation(
                this.G4r,
                this.Wse,
                this.Entity.GetComponent(3).Radius / ZOOM_PRECENTAGE +
                  ADD_LENGTH,
              )),
              this.Entity.GetComponent(3).SetActorLocation(
                this.r4t.ToUeVector(),
                "抓取.检测抓取者跟被抓取者之间是否有碰撞",
                !0,
              ));
        }
        this.b4r.Size() <= t.GetComponent(3).Radius &&
          t.GetComponent(161).SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      } else this.ResetPosition();
    else this.BeCaught && this.EndBeCaught();
  }
  Iwr() {
    (this.Fse = UE.NewObject(UE.TraceCapsuleElement.StaticClass())),
      (this.Fse.bIsSingle = !0),
      (this.Fse.bIgnoreSelf = !0),
      (this.Fse.bTraceComplex = !0),
      (0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) &&
        ((this.Fse.HalfHeight = this.Hte.DefaultHalfHeight),
        (this.Fse.Radius = this.Hte.DefaultRadius)),
      IS_DEBUG && ((this.Fse.DrawTime = 5), this.Fse.SetDrawDebugTrace(1)),
      this.Fse.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      this.Fse.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
      );
  }
  k4r() {
    this.Fse && (this.Fse.Dispose(), (this.Fse = void 0));
  }
  GetBoneTransform(t, i) {
    t = t.GetComponent(3)?.Actor?.Mesh;
    if (-1 !== t.GetAllSocketNames().FindIndex(i))
      return t.GetSocketTransform(i, 0);
  }
  SetAddRadiusLocation(t, i, e) {
    var s = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create();
    return (
      h.DeepCopy(i),
      s.DeepCopy(t),
      s.Normalize(),
      s.Multiply(e, s),
      h.Addition(s, h),
      h
    );
  }
  static CaughtNotify(t, i) {
    var e,
      t = t?.GetComponent(43);
    t &&
      (i.a5n.T9n
        ? t.EndBeCaughtHandle()
        : ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
            MathUtils_1.MathUtils.LongToNumber(i.a5n.m9n),
          )),
          t.BeginBeCaughtHandle(
            MathUtils_1.MathUtils.LongToBigInt(i.a5n.I9n).toString(),
            e.Entity,
          )));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("d2n")],
  CharacterCaughtNewComponent,
  "CaughtNotify",
  null,
),
  (CharacterCaughtNewComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(43)],
    CharacterCaughtNewComponent,
  )),
  (exports.CharacterCaughtNewComponent = CharacterCaughtNewComponent);
//# sourceMappingURL=CharacterCaughtNewComponent.js.map
