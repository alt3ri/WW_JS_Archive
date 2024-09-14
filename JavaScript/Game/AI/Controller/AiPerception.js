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
  CombatLog_1 = require("../../Utils/CombatLog"),
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
      (this.Eoe = new Set()),
      (this.f6 = new Array()),
      (this.EntitiesInSense = new Map()),
      (this.EntitiesToAdd = new Map()),
      (this.Soe = new Array()),
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
      (this.tha = !1),
      (this.xoe = Stats_1.Stat.Create("IsActorInSense")),
      (this.woe = Stats_1.Stat.Create("FindNewInSenseActor")),
      (this.Boe = Stats_1.Stat.Create("FindOutSenseActor")),
      (this.boe = Stats_1.Stat.Create("SenseActor")),
      (this.qoe = Stats_1.Stat.Create("FindShareAlly")),
      (this.Goe = Stats_1.Stat.Create("RefreshAllEnemies"));
    var e = t.CharActorComp?.CreatureData;
    (this.tha = 122000237 === e?.GetPbDataId()),
      (this.E0 = t.CharActorComp.Entity.Id),
      (this.Noe = t.CharActorComp.Actor.Camp),
      this.EntitiesInSense.set(this.E0, 0),
      this.Roe.set(0, new Set()),
      this.Roe.set(1, new Set());
    let h = -1;
    for (const n of s) {
      var r = new AiSenseObject(n);
      this.Loe.push(r),
        0 < ++h ||
          (this.tha &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              6,
              "EnableAiSense Init",
              ["Actor", this.Bte.CharActorComp.Actor.GetName()],
              ["AiSenseObject", r.AiSense.Id],
            ),
          r.WithAngleHorizontal && ++this.Uoe,
          r.WithAngleVertical && ++this.Aoe,
          n.SenseDistanceRange.Max > this.MaxSenseRange &&
            (this.MaxSenseRange = n.SenseDistanceRange.Max),
          this.Roe.get(r.AiSense.SenseTarget)?.add(r));
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
      CombatLog_1.CombatLog.Info(
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
      (this.Soe.length = 0),
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
  Qoe(t, i, s, e = !1) {
    this.xoe.Start();
    var h = this.Bte.CharActorComp.ActorLocationProxy,
      r = t.GetComponent(1),
      n = e && r.CreatureData.IsRole(),
      o = (r.ActorLocationProxy.Subtraction(h, this.Lz), this.Lz.SizeSquared());
    let a = 0,
      _ = 0;
    (this.Uoe || this.Aoe) &&
      (this.Lz.FromUeVector(
        this.Bte.CharActorComp.ActorRotation.UnrotateVector(
          this.Lz.ToUeVector(),
        ),
      ),
      this.Uoe &&
        (a = MathUtils_1.MathUtils.RadToDeg * Math.atan2(this.Lz.Y, this.Lz.X)),
      this.Aoe) &&
      (_ =
        MathUtils_1.MathUtils.RadToDeg * Math.asin(this.Lz.Z / Math.sqrt(o)));
    var e = t.GetComponent(92),
      f = e?.Valid
        ? e.PositionState
        : CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
      S = e?.Valid
        ? e.MoveState
        : CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, h),
      this.Toe.clear();
    for (const l of this.Roe.get(s))
      if (l.InArea(o, a, _, f, S, i)) {
        if (
          (n &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              6,
              "Mingzhongzhigui Ai InArea",
              ["actor", r.Owner?.GetName()],
              ["CantBeBlock", l.AiSense.CantBeBlock],
            ),
          !l.AiSense.CantBeBlock)
        ) {
          if (this.Toe.has(l.AiSense.BlockType)) continue;
          if (
            (this.uoe.SetTraceTypeQuery(l.AiSense.BlockType),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              this.uoe,
              r.ActorLocationProxy,
            ),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              this.uoe,
              PROFILE_KEY,
            ))
          ) {
            var c = this.uoe.HitResult;
            if (c.bBlockingHit && c.Actors.Get(0) !== r.Owner) {
              n &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "AI",
                  6,
                  "Mingzhongzhigui Ai Hit",
                  ["actor", c.Actors.Get(0)?.GetName()],
                  ["Comp", c.Components.Get(0)?.GetName()],
                ),
                this.Toe.add(l.AiSense.BlockType);
              continue;
            }
          }
        }
        return this.xoe.Stop(), !0;
      }
    return this.xoe.Stop(), !1;
  }
  Hoe() {
    this.woe.Start();
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
              62,
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
              (this.Qoe(r.Entity, !1, i, this.tha) &&
                (this.tha &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 6, "Mingzhongzhigui In Sense", [
                    "actor",
                    r.Id,
                  ]),
                this.EntitiesToAdd.set(r.Entity.Id, i))));
      }
    this.woe.Stop();
  }
  joe() {
    this.Boe.Start(), (this.Soe.length = 0);
    for (var [t, i] of this.EntitiesInSense) {
      var s;
      t !== this.E0 &&
        ((s = EntitySystem_1.EntitySystem.Get(t))?.Valid && s.Active
          ? this.Qoe(s, !0, i)
            ? this.yoe.delete(t)
            : this.Soe.push(t)
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
    for (const r of this.Soe)
      this.yoe.has(r) ||
        this.yoe.set(
          r,
          Time_1.Time.Now +
            MathUtils_1.MathUtils.GetRandomRange(
              this.AiSenseGroup.LoseDelay.Min,
              this.AiSenseGroup.LoseDelay.Max,
            ),
        );
    this.Boe.Stop();
  }
  Voe(i, s) {
    this.boe.Start();
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
    this.boe.Stop();
  }
  Woe() {
    if (!(this.AiSenseGroup.ShareDis <= 0)) {
      this.qoe.Start();
      var t,
        i,
        s = this.Bte.CharActorComp.ActorLocationProxy,
        e =
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
            s,
            this.AiSenseGroup.ShareDis,
            62,
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
          ((t = r.Entity.GetComponent(40))?.Valid &&
            t.AiController.AiPerception?.Moe.add(this.E0));
      for (const n of this.ShareAllyLink)
        this.voe.has(n) ||
          ((i = EntitySystem_1.EntitySystem.Get(n))?.Valid &&
            (i = i.GetComponent(40))?.Valid &&
            i.AiController.AiPerception?.Moe.delete(this.E0));
      var h = this.voe;
      (this.voe = this.ShareAllyLink),
        (this.ShareAllyLink = h),
        this.qoe.Stop();
    }
  }
  Koe() {
    this.Goe.Start(), this.AllEnemies.clear();
    for (const i of this.Enemies) this.AllEnemies.add(i);
    this.Eoe.clear(), (this.f6.length = 0), this.Eoe.add(this.E0);
    for (const s of this.Moe) this.f6.push(s), this.Eoe.add(s);
    for (; 0 < this.f6.length; ) {
      var t = this.f6.pop(),
        t = EntitySystem_1.EntitySystem.Get(t);
      if (t?.Valid) {
        t = t.GetComponent(40);
        if (t?.Valid && t.AiController.AiPerception) {
          for (const e of t.AiController.AiPerception.Enemies)
            this.AllEnemies.add(e);
          for (const h of t.AiController.AiPerception.Moe)
            this.Eoe.has(h) || (this.Eoe.add(h), this.f6.push(h));
        }
      }
    }
    this.Goe.Stop();
  }
}
exports.AiPerception = AiPerception;
//# sourceMappingURL=AiPerception.js.map
