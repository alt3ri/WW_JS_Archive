"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiPerception = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  PROFILE_KEY = "AiPerception_IsActorInSense",
  MINUS_HALF = -180,
  MINUS_QUATER = -90;
class AiSenseObject {
  constructor(t) {
    (this.AiSense = t),
      (this.WithAngleHorizontal =
        t.HorizontalAngle.Min > MINUS_HALF || t.HorizontalAngle.Max < 180),
      (this.WithAngleVertical =
        t.VerticalAngle.Min > MINUS_QUATER || t.VerticalAngle.Max < 90),
      (this.Coe = t.SenseDistanceRange.Min * t.SenseDistanceRange.Min),
      (this.goe = t.SenseDistanceRange.Max * t.SenseDistanceRange.Max),
      (this.foe = t.WalkSenseRate * t.WalkSenseRate),
      (this.poe = t.AirSenseRate * t.AirSenseRate);
  }
  InArea(t, i, s, e, h, r) {
    if (
      this.WithAngleHorizontal &&
      !MathUtils_1.MathUtils.InRange(i, this.AiSense.HorizontalAngle)
    )
      return !1;
    if (
      this.WithAngleVertical &&
      !MathUtils_1.MathUtils.InRange(s, this.AiSense.VerticalAngle)
    )
      return !1;
    let n = t;
    return (
      e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground
        ? (h !== CharacterUnifiedStateTypes_1.ECharMoveState.Other &&
            h !== CharacterUnifiedStateTypes_1.ECharMoveState.Stand &&
            h !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
            h !== CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop) ||
          (n /= this.foe)
        : h === CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
          (n /= this.poe),
      !(r ? n > this.goe : n > this.Coe)
    );
  }
}
class AiPerception {
  constructor(t, i, s) {
    (this.Bte = t),
      (this.AiSenseGroup = i),
      (this.Allies = new Set()),
      (this.Enemies = new Set()),
      (this.Neutrals = new Set()),
      (this.SceneItems = new Set()),
      (this.AllEnemies = new Set()),
      (this.ShareAllyLink = new Set()),
      (this.voe = new Set()),
      (this.Moe = new Set()),
      (this.Soe = new Set()),
      (this.f6 = new Array()),
      (this.EntitiesInSense = new Map()),
      (this.EntitiesToAdd = new Map()),
      (this.Eoe = new Array()),
      (this.yoe = new Map()),
      (this.Ioe = []),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Toe = new Set()),
      (this.Loe = new Array()),
      (this.Doe = new Map()),
      (this.Roe = new Map()),
      (this.Uoe = 0),
      (this.Aoe = 0),
      (this.uoe = void 0),
      (this.MaxSenseRange = 0),
      (this.Poe = !1),
      (this.xoe = void 0),
      (this.woe = void 0),
      (this.Boe = void 0),
      (this.boe = void 0),
      (this.qoe = void 0),
      (this.Goe = void 0),
      (this.E0 = t.CharActorComp.Entity.Id),
      (this.Noe = t.CharActorComp.Actor.Camp),
      this.EntitiesInSense.set(this.E0, 0),
      this.Roe.set(0, new Set()),
      this.Roe.set(1, new Set());
    let e = -1;
    for (const r of s) {
      var h = new AiSenseObject(r);
      this.Loe.push(h),
        0 < ++e ||
          (h.WithAngleHorizontal && ++this.Uoe,
          h.WithAngleVertical && ++this.Aoe,
          r.SenseDistanceRange.Max > this.MaxSenseRange &&
            (this.MaxSenseRange = r.SenseDistanceRange.Max),
          this.Roe.get(h.AiSense.SenseTarget)?.add(h));
    }
    (this.Ooe = i ? i.ShareDis * i.ShareDis : 0), this.koe();
  }
  koe() {
    (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.uoe.WorldContextObject = this.Bte.CharActorComp.Actor),
      (this.uoe.bIsSingle = !0),
      (this.uoe.bIgnoreSelf = !0);
  }
  GetEnableAiSenseDebug() {
    let i = "感知配置激活情况: ";
    for (let t = 0; t < this.Loe.length; ++t) {
      var s = this.Loe[t],
        e = this.Loe[t].AiSense.Id,
        s = this.Roe.get(s.AiSense.SenseTarget).has(s);
      i += e + ":" + s + "; ";
    }
    return i;
  }
  Foe(t, i) {
    var s = this.Roe.get(t.AiSense.SenseTarget);
    s.has(t) !== i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          6,
          "EnableAiSense",
          ["Actor", this.Bte.CharActorComp.Actor.GetName()],
          ["AiSenseObject", t.AiSense.Id],
          ["enable", i],
        ),
      i
        ? (t.WithAngleHorizontal && ++this.Uoe,
          t.WithAngleVertical && ++this.Aoe,
          s.add(t))
        : (t.WithAngleHorizontal && --this.Uoe,
          t.WithAngleVertical && --this.Aoe,
          s.delete(t)));
  }
  SetAiSenseEnable(t, i) {
    t < 0 || this.Loe.length <= t || this.Foe(this.Loe[t], i);
  }
  SetAllAiSenseEnable(t) {
    if (!t) {
      for (var [i] of this.EntitiesInSense)
        i !== this.E0 &&
          (i = EntitySystem_1.EntitySystem.Get(i)) &&
          this.Voe(i, !1);
      this.Allies.clear(),
        this.Enemies.clear(),
        this.Neutrals.clear(),
        this.AllEnemies.clear(),
        this.EntitiesInSense.clear(),
        this.EntitiesInSense.set(this.E0, 0);
    }
    (this.Poe = !t),
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Ai",
        this.Bte.CharActorComp?.Entity,
        "禁用全部感知",
        ["forbid", this.Poe],
      );
  }
  AddOrRemoveAiSense(t, i) {
    i &&
      !this.Doe.has(t) &&
      (s = ConfigManager_1.ConfigManager.AiConfig.LoadAiSense(t.toString())) &&
      this.Doe.set(t, new AiSenseObject(s));
    var s = this.Doe.get(t);
    s && this.Foe(s, i);
  }
  EnableAiSenseByType(t, i) {
    for (const e of this.Loe) e.AiSense.SenseType === t && this.Foe(e, i);
    for (var [, s] of this.Doe) s.AiSense.SenseType === t && this.Foe(s, i);
  }
  Clear(t = !0) {
    this.Allies.clear(),
      this.Enemies.clear(),
      this.Neutrals.clear(),
      this.SceneItems.clear(),
      this.AllEnemies.clear(),
      (this.f6.length = 0),
      this.EntitiesInSense.clear(),
      this.EntitiesInSense.set(this.E0, 0),
      this.EntitiesToAdd.clear(),
      (this.Eoe.length = 0),
      this.yoe.clear(),
      t && (this.Ioe.length = 0);
  }
  Tick() {
    if (this.Bte.CharActorComp?.Valid)
      if (this.AiSenseGroup) {
        if (!this.Poe) {
          this.Hoe(), this.joe();
          for (var [t, i] of this.EntitiesToAdd) {
            this.EntitiesInSense.set(t, i);
            i = EntitySystem_1.EntitySystem.Get(t);
            this.Voe(i, !0);
          }
          this.EntitiesToAdd.clear(), this.Woe(), this.Koe();
        }
      } else this.Koe();
  }
  Qoe(t, i, s) {
    var e = this.Bte.CharActorComp.ActorLocationProxy,
      h = t.GetComponent(1),
      r = (h.ActorLocationProxy.Subtraction(e, this.Lz), this.Lz.SizeSquared());
    let n = 0,
      o = 0;
    (this.Uoe || this.Aoe) &&
      (this.Lz.FromUeVector(
        this.Bte.CharActorComp.ActorRotation.UnrotateVector(
          this.Lz.ToUeVector(),
        ),
      ),
      this.Uoe &&
        (n = MathUtils_1.MathUtils.RadToDeg * Math.atan2(this.Lz.Y, this.Lz.X)),
      this.Aoe) &&
      (o =
        MathUtils_1.MathUtils.RadToDeg * Math.asin(this.Lz.Z / Math.sqrt(r)));
    var t = t.GetComponent(89),
      a = t?.Valid
        ? t.PositionState
        : CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
      _ = t?.Valid
        ? t.MoveState
        : CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, e),
      this.Toe.clear();
    for (const l of this.Roe.get(s))
      if (l.InArea(r, n, o, a, _, i)) {
        if (!l.AiSense.CantBeBlock) {
          if (this.Toe.has(l.AiSense.BlockType)) continue;
          if (
            (this.uoe.SetTraceTypeQuery(l.AiSense.BlockType),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.uoe,
              h.ActorLocationProxy,
            ),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              this.uoe,
              PROFILE_KEY,
            ))
          ) {
            var f = this.uoe.HitResult;
            if (f.bBlockingHit && f.Actors.Get(0) !== h.Owner) {
              this.Toe.add(l.AiSense.BlockType);
              continue;
            }
          }
        }
        return !0;
      }
    return !1;
  }
  Hoe() {
    var i,
      s,
      e = this.Bte.CharActorComp.ActorLocationProxy;
    this.EntitiesToAdd.clear();
    for ([i, s] of this.Roe)
      if (0 !== s.size) {
        let t = 0;
        for (const h of s) t = Math.max(t, h.AiSense.SenseDistanceRange.Min);
        0 === i
          ? ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
              e,
              t,
              2,
              this.Ioe,
            )
          : ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
              e,
              t,
              1,
              this.Ioe,
            );
        for (const r of this.Ioe)
          r.Entity?.Valid &&
            r.Entity.Active &&
            (this.EntitiesInSense.has(r.Entity.Id) ||
              (this.Qoe(r.Entity, !1, i) &&
                this.EntitiesToAdd.set(r.Entity.Id, i)));
      }
  }
  joe() {
    this.Eoe.length = 0;
    for (var [t, i] of this.EntitiesInSense) {
      var s;
      t !== this.E0 &&
        ((s = EntitySystem_1.EntitySystem.Get(t))?.Valid && s.Active
          ? this.Qoe(s, !0, i)
            ? this.yoe.delete(t)
            : this.Eoe.push(t)
          : (this.EntitiesInSense.delete(t),
            this.yoe.delete(t),
            this.Allies.delete(t) &&
              this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(
                !1,
                t,
                1,
              ),
            this.Enemies.delete(t) &&
              this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(
                !1,
                t,
                2,
              ),
            this.Neutrals.delete(t) &&
              this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(
                !1,
                t,
                0,
              ),
            this.SceneItems.delete(t)));
    }
    for (var [e, h] of this.yoe)
      Time_1.Time.Now > h &&
        (this.EntitiesInSense.delete(e),
        (h = EntitySystem_1.EntitySystem.Get(e))?.Valid && this.Voe(h, !1),
        this.yoe.delete(e));
    for (const r of this.Eoe)
      this.yoe.has(r) ||
        this.yoe.set(
          r,
          Time_1.Time.Now +
            MathUtils_1.MathUtils.GetRandomRange(
              this.AiSenseGroup.LoseDelay.Min,
              this.AiSenseGroup.LoseDelay.Max,
            ),
        );
  }
  Voe(i, s) {
    var e = i.Id,
      i = i.GetComponent(3);
    if (i?.Valid) {
      var h = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, i.Actor.Camp);
      let t = void 0;
      switch (h) {
        case 1:
          t = this.Allies;
          break;
        case 2:
          t = this.Enemies;
          break;
        default:
          t = this.Neutrals;
      }
      s
        ? t.has(e) ||
          (t.add(e),
          this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(
            !0,
            i,
            h,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAiSenseEntityEnter,
            this.E0,
            i.Entity,
          ))
        : t.delete(e) &&
          (this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(
            !1,
            i,
            h,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAiSenseEntityLeave,
            this.E0,
            i.Entity,
          ));
    } else
      s
        ? this.SceneItems.has(e) ||
          (this.SceneItems.add(e),
          this.Bte.AiPerceptionEvents.OnSenseSceneItem(i))
        : this.SceneItems.delete(e);
  }
  Woe() {
    if (!(this.AiSenseGroup.ShareDis <= 0)) {
      var t,
        i,
        s = this.Bte.CharActorComp.ActorLocationProxy,
        e =
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
            s,
            this.AiSenseGroup.ShareDis,
            2,
            this.Ioe,
          ),
          this.voe.clear(),
          this.voe.add(this.E0),
          this.Bte.CharActorComp.Actor.Camp);
      for (const r of this.Ioe)
        !r.Entity?.Active ||
          this.voe.has(r.Entity.Id) ||
          !(t = r.Entity.GetComponent(3))?.Valid ||
          e !== t.Actor.Camp ||
          Vector_1.Vector.DistSquared(s, t.ActorLocationProxy) > this.Ooe ||
          (this.voe.add(r.Entity.Id), this.ShareAllyLink.has(r.Entity.Id)) ||
          ((t = r.Entity.GetComponent(38))?.Valid &&
            t.AiController.AiPerception?.Moe.add(this.E0));
      for (const n of this.ShareAllyLink)
        this.voe.has(n) ||
          ((i = EntitySystem_1.EntitySystem.Get(n))?.Valid &&
            (i = i.GetComponent(38))?.Valid &&
            i.AiController.AiPerception?.Moe.delete(this.E0));
      var h = this.voe;
      (this.voe = this.ShareAllyLink), (this.ShareAllyLink = h);
    }
  }
  Koe() {
    this.AllEnemies.clear();
    for (const i of this.Enemies) this.AllEnemies.add(i);
    this.Soe.clear(), (this.f6.length = 0), this.Soe.add(this.E0);
    for (const s of this.Moe) this.f6.push(s), this.Soe.add(s);
    for (; 0 < this.f6.length; ) {
      var t = this.f6.pop(),
        t = EntitySystem_1.EntitySystem.Get(t);
      if (t?.Valid) {
        t = t.GetComponent(38);
        if (t?.Valid && t.AiController.AiPerception) {
          for (const e of t.AiController.AiPerception.Enemies)
            this.AllEnemies.add(e);
          for (const h of t.AiController.AiPerception.Moe)
            this.Soe.has(h) || (this.Soe.add(h), this.f6.push(h));
        }
      }
    }
  }
}
exports.AiPerception = AiPerception;
//# sourceMappingURL=AiPerception.js.map
