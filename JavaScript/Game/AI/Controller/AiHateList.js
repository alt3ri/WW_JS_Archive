"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiHateList = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  OnlineController_1 = require("../../Module/Online/OnlineController"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  MIN_HATE = 1,
  ONE_THOUSAND_MILLISECONDS = 1e3;
class HatredItem {
  constructor() {
    (this.HatredValue = 0),
      (this.TauntValue = 0),
      (this.DisengageTime = -1),
      (this.DecreaseCdEndTime = 0),
      (this.DecreaseEndTime = 0),
      (this.NextDecreaseTime = 0),
      (this.EarliestClearTime = 0),
      (this.InMaxArea = !1);
  }
  get InDecreasing() {
    return 0 < this.NextDecreaseTime;
  }
  get HatredValueActual() {
    return this.HatredValue + this.TauntValue;
  }
  AfterTriggerHatredDecrease() {
    Time_1.Time.WorldTime > this.DecreaseEndTime
      ? (this.NextDecreaseTime = 0)
      : (this.NextDecreaseTime += ONE_THOUSAND_MILLISECONDS);
  }
}
class AiHateList {
  constructor(t) {
    (this.Bte = t),
      (this.vie = void 0),
      (this.Mie = 0),
      (this.Eie = 0),
      (this.Sie = 0),
      (this.yie = 0),
      (this.Iie = 0),
      (this.Tie = 0),
      (this.Lie = void 0),
      (this.Die = void 0),
      (this.Rie = Vector_1.Vector.Create()),
      (this.Uie = (t, e, i, s, r, h, n) => {
        0 !== s.CalculateType ||
          (this.Lie?.Valid && this.Lie.HasTag(-893996770)) ||
          ((s = t.GetComponent(190))?.Valid && s.HasTag(-1566015933)) ||
          ((s = t.CheckGetComponent(3))?.Valid &&
            2 ===
              CampUtils_1.CampUtils.GetCampRelationship(
                this.Bte.CharActorComp.Actor.Camp,
                s.Actor.Camp,
              ) &&
            ((s = this.Aie.get(t.Id))
              ? (s.HatredValue += Math.max(
                  MIN_HATE,
                  s.InDecreasing
                    ? -i * this.vie.IncreaseRateWhenDecreasing
                    : -i,
                ))
              : this.Pie(t.Id, Math.max(MIN_HATE, -i))));
      }),
      (this.xie = (t, e) => {
        var i;
        e &&
          this.vie &&
          (this.Die?.Valid &&
            this.Die === e &&
            (EventSystem_1.EventSystem.EmitWithTarget(
              this.Bte.CharAiDesignComp.Entity,
              EventDefine_1.EEventName.AiHateTargetChanged,
              t.Id,
              e.Id,
            ),
            (this.Die = t),
            BlackboardController_1.BlackboardController.SetEntityIdByEntity(
              this.Bte.CharActorComp.Entity.Id,
              "HateTarget",
              t.Id,
            )),
          void 0 !== (i = this.Aie.get(e?.Id))) &&
          (this.wie(t.Id, i, "ChangeRole"), this.Bie(e.Id, "InActive"));
      }),
      (this.Mjs = (t, e) => {
        this.vie &&
          void 0 !== (e = this.Aie.get(e?.Id)) &&
          this.wie(t.Id, e, "VisionMorph");
      }),
      (this.Aie = new Map()),
      (this.bie = new Array()),
      (this.qie = new Array()),
      (this.Gie = 0),
      (this.Nie = 0),
      (this.Oie = 0),
      (this.kie = 2);
  }
  get AiHate() {
    return this.vie;
  }
  set AiHate(t) {
    if (this.vie !== t) {
      var e,
        i = this.Bte.CharActorComp.Entity.GetComponent(164);
      if (
        (i &&
          ((e = this.Fie()) &&
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              this.Bte.CharActorComp.Entity.Id,
              "CenterLocation",
              e.X,
              e.Y,
              e.Z,
            ),
          i.SetChain(t ? t.MaxMoveFromBorn : 0, e)),
        (this.vie = t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "AiHateInternal Changed",
            ["Actor", this.Bte.CharActorComp?.Actor.GetName()],
            ["Id", t?.Id],
          ),
        t)
      ) {
        for (var [, s] of this.Aie) s.DisengageTime = -1;
        t.ExcludeTag &&
          (this.Mie = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            t.ExcludeTag,
          )),
          t.SwornHatredTag &&
            (this.Eie = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
              t.SwornHatredTag,
            )),
          (this.Sie =
            t.DisengageDistanceRange.Min * t.DisengageDistanceRange.Min),
          (this.yie =
            t.DisengageDistanceRange.Max * t.DisengageDistanceRange.Max),
          (this.Iie =
            t.DisengageBornDistance.Min * t.DisengageBornDistance.Min),
          (this.Tie =
            t.DisengageBornDistance.Max * t.DisengageBornDistance.Max);
      } else
        (this.Die = void 0),
          this.Aie.clear(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              6,
              "RemoveHatredItem",
              ["AiActor", this.Bte.CharActorComp?.Actor.GetName()],
              ["Reason", "SetAiHate"],
            );
    }
  }
  RefreshAbilityComp() {
    this.Lie = this.Bte.CharAiDesignComp?.Entity?.GetComponent(190);
  }
  GetHatredMap() {
    return this.Aie;
  }
  GetHatredMapDebugText() {
    let t = "";
    for (var [e, i] of this.Aie) {
      e =
        CharacterController_1.CharacterController.GetCharacterActorComponentById(
          e,
        );
      e?.Valid &&
        (t +=
          "--" +
          e.Actor.GetName() +
          "(" +
          i.HatredValue +
          "," +
          i.TauntValue +
          "," +
          i.DisengageTime +
          ")\n");
    }
    return (t += "AiHateConfig:" + this.AiHate.Id);
  }
  GetCurrentTarget() {
    return this.Die;
  }
  get IsCurrentTargetInMaxArea() {
    var t;
    return !!this.Die && !!(t = this.Aie.get(this.Die.Id)) && t.InMaxArea;
  }
  BindEvents() {
    this.vie &&
      (EventSystem_1.EventSystem.AddWithTarget(
        this.Bte.CharAiDesignComp.Entity,
        EventDefine_1.EEventName.CharBeDamage,
        this.Uie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.VisionMorphBegin,
        this.Mjs,
      ));
  }
  UnBindEvents() {
    this.Bte.CharAiDesignComp.Valid &&
      EventSystem_1.EventSystem.HasWithTarget(
        this.Bte.CharAiDesignComp.Entity,
        EventDefine_1.EEventName.CharBeDamage,
        this.Uie,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Bte.CharAiDesignComp.Entity,
        EventDefine_1.EEventName.CharBeDamage,
        this.Uie,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.VisionMorphBegin,
        this.Mjs,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.VisionMorphBegin,
          this.Mjs,
        );
  }
  Clear(t = !0) {
    t && (this.vie = void 0),
      (this.Die = void 0),
      (this.Lie = void 0),
      this.UnBindEvents(),
      this.Bie(0, "Clear");
  }
  Tick(t) {
    var e;
    this.vie &&
      ((e = this.Bte.CharActorComp.ScaledHalfHeight),
      (t = this.Vie(t * MathUtils_1.MathUtils.MillisecondToSecond, e)),
      (e = this.Die?.Id),
      (this.Die = t
        ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)
        : void 0),
      (t = this.Die?.Id) !== e &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Bte.CharAiDesignComp.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          t,
          e,
        ),
      (t = this.Bte.CharAiDesignComp.Entity.Id),
      this.Die
        ? (BlackboardController_1.BlackboardController.GetEntityIdByEntity(
            t,
            "HateTarget",
          ) !== this.Die.Id &&
            BlackboardController_1.BlackboardController.SetEntityIdByEntity(
              t,
              "HateTarget",
              this.Die.Id,
            ),
          (e = this.Aie.get(this.Die.Id)),
          Time_1.Time.WorldTime > e.DecreaseCdEndTime &&
            e.HatredValue > MIN_HATE &&
            ((e.DecreaseCdEndTime =
              Time_1.Time.WorldTime + this.vie.DecreaseTimeCd),
            (e.DecreaseEndTime =
              Time_1.Time.WorldTime + this.vie.DecreaseTimeLength),
            (e.NextDecreaseTime =
              Time_1.Time.WorldTime + ONE_THOUSAND_MILLISECONDS)))
        : BlackboardController_1.BlackboardController.HasValueByEntity(
            t,
            "HateTarget",
          ) &&
          BlackboardController_1.BlackboardController.RemoveValueByEntity(
            t,
            "HateTarget",
          ));
  }
  wie(t, e, i) {
    this.Aie.has(t)
      ? this.Aie.set(t, e)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "AddHatredItem",
            ["AiActor", this.Bte.CharActorComp.Actor.GetName()],
            ["Target", t],
            ["Reason", i],
          ),
        this.Aie.set(t, e),
        (i = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
          (EventSystem_1.EventSystem.EmitWithTarget(
            i,
            EventDefine_1.EEventName.AiHateAddOrRemove,
            !0,
            this.Bte,
          ),
          this.Bte.AiPerceptionEvents.CollectAiHateEvent(!0, i)),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Bte.CharAiDesignComp.Entity,
          EventDefine_1.EEventName.AiInFight,
          0 < this.Aie.size,
        ));
  }
  Pie(e, i = MIN_HATE, s) {
    if (this.vie) {
      let t = this.Aie.get(e);
      return (
        t
          ? ((t.HatredValue = i), s && (t.TauntValue = s))
          : (((t = new HatredItem()).HatredValue = i),
            s && (t.TauntValue = s),
            (t.EarliestClearTime =
              Time_1.Time.WorldTime + this.vie.MinClearTime),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                6,
                "AddHatredItem",
                ["AiActor", this.Bte.CharActorComp?.Actor?.GetName()],
                ["Target", e],
                ["Reason", "AddHatredItemByValue"],
              ),
            this.Aie.set(e, t),
            (i = EntitySystem_1.EntitySystem.Get(e))?.Valid &&
              (EventSystem_1.EventSystem.EmitWithTarget(
                i,
                EventDefine_1.EEventName.AiHateAddOrRemove,
                !0,
                this.Bte,
              ),
              this.Bte.AiPerceptionEvents.CollectAiHateEvent(!0, i)),
            this.Bte.CharAiDesignComp?.Entity &&
              EventSystem_1.EventSystem.EmitWithTarget(
                this.Bte.CharAiDesignComp.Entity,
                EventDefine_1.EEventName.AiInFight,
                0 < this.Aie.size,
              )),
        t
      );
    }
  }
  Bie(t, e) {
    if (
      ("MaxArea" === e &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          6,
          "RemoveHatredItem",
          ["AiActor", this.Bte.CharActorComp?.Actor.GetName()],
          ["Init", this.Rie],
          ["HateId", this.AiHate?.Id],
          ["SquaredDistMax", this.yie],
          ["SquaredInitDistMax", this.Tie],
          ["Height", this.vie?.DisengageHeightRangeMax.Min],
          ["Height2", this.vie?.DisengageHeightRangeMax.Max],
        ),
      t)
    ) {
      if (this.Aie.has(t)) {
        const s = EntitySystem_1.EntitySystem.Get(t);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "RemoveHatredItem",
            ["AiActor", this.Bte.CharActorComp.Actor.GetName()],
            ["Target", s?.Id],
            ["Reason", e],
            ["Valid", s?.Valid],
            ["Self Location", this.Bte.CharActorComp.ActorLocationProxy],
            ["Target Location", s?.GetComponent(1)?.ActorLocationProxy],
          ),
          s?.Valid &&
            (EventSystem_1.EventSystem.EmitWithTarget(
              s,
              EventDefine_1.EEventName.AiHateAddOrRemove,
              !1,
              this.Bte,
            ),
            this.Bte.AiPerceptionEvents.CollectAiHateEvent(!1, s)),
          this.Aie.delete(t),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Bte.CharAiDesignComp.Entity,
            EventDefine_1.EEventName.AiInFight,
            0 < this.Aie.size,
          );
      }
    } else if (this.Aie.size) {
      for (var [i] of this.Aie) {
        const s = EntitySystem_1.EntitySystem.Get(i);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "RemoveHatredItem",
            ["AiActor", this.Bte.CharActorComp?.Actor.GetName()],
            ["Target", s?.Id],
            ["Reason", e],
            ["IsInit", s?.IsInit],
            ["All", this.Bte.CharActorComp?.ActorLocationProxy],
          ),
          s?.IsInit &&
            (EventSystem_1.EventSystem.EmitWithTarget(
              s,
              EventDefine_1.EEventName.AiHateAddOrRemove,
              !1,
              this.Bte,
            ),
            this.Bte.AiPerceptionEvents.CollectAiHateEvent(!1, s));
      }
      this.Aie.clear(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Bte.CharAiDesignComp.Entity,
          EventDefine_1.EEventName.AiInFight,
          0 < this.Aie.size,
        );
    }
  }
  Vie(t, e) {
    this.Rie.FromUeVector(this.Bte.CharActorComp.GetInitLocation());
    var i = this.Bte.CharActorComp.ActorLocationProxy;
    this.Hie(t, this.Rie, i, e), this.jie(this.Rie, i, e);
    let s = 0;
    for (const r of this.bie) this.Bie(r, this.qie[s]), ++s;
    return this.Gie;
  }
  Hie(t, e, i, s) {
    (this.Gie = 0),
      (this.Nie = this.yie),
      (this.Oie = 0),
      (this.kie = 2),
      (this.bie.length = 0),
      (this.qie.length = 0);
    for (var [r, h] of this.Aie) {
      var n =
        CharacterController_1.CharacterController.GetCharacterActorComponentById(
          r,
        );
      if (n && n.Entity.Active) {
        var a = Vector_1.Vector.DistSquared2D(i, n.ActorLocationProxy),
          o = n.ActorLocationProxy.Z - i.Z + s - n.ScaledHalfHeight,
          _ = Vector_1.Vector.DistSquared2D(e, n.ActorLocationProxy),
          o =
            ((h.InMaxArea = this.Wie(a, o, _)),
            h.InMaxArea && this.Kie(a, o, _));
        if (Time_1.Time.WorldTime < h.EarliestClearTime)
          !(h.DisengageTime <= 0) ||
            (h.InMaxArea && o) ||
            (h.DisengageTime =
              Time_1.Time.WorldTime +
              MathUtils_1.MathUtils.GetRandomRange(
                this.vie.DisengageTimeRange.Min,
                this.vie.DisengageTimeRange.Max,
              ));
        else {
          if (!h.InMaxArea) {
            this.bie.push(r), this.qie.push("MaxArea");
            continue;
          }
          if (0 < h.DisengageTime) {
            if (o) h.DisengageTime = -1;
            else if (
              h.TauntValue <= 0 &&
              Time_1.Time.WorldTime > h.DisengageTime
            ) {
              this.bie.push(r), this.qie.push("MinAreaTimer");
              continue;
            }
          } else
            o ||
              (h.DisengageTime =
                Time_1.Time.WorldTime +
                MathUtils_1.MathUtils.GetRandomRange(
                  this.vie.DisengageTimeRange.Min,
                  this.vie.DisengageTimeRange.Max,
                ));
        }
        h.InDecreasing &&
          Time_1.Time.WorldTime > h.NextDecreaseTime &&
          ((h.HatredValue = Math.max(
            MIN_HATE,
            h.HatredValue * this.vie.DecreaseRate,
          )),
          h.AfterTriggerHatredDecrease());
        _ = this.Qie(n.Entity, h.TauntValue);
        if (!(this.kie > _)) {
          if (this.kie === _) {
            if (this.Oie > h.HatredValueActual) continue;
            if (this.Oie === h.HatredValueActual && this.Nie <= a) continue;
          }
          (this.kie = _),
            (this.Oie = h.HatredValue),
            (this.Nie = a),
            (this.Gie = r);
        }
      } else this.bie.push(r), this.qie.push("InActive");
    }
  }
  AddNewHateListForTaunt(t, e) {
    var i = this.Aie.get(t);
    i ? (i.TauntValue = e) : this.Pie(t, MIN_HATE, e);
  }
  RemoveHateListForTaunt(t) {
    t = this.Aie.get(t);
    t && (t.TauntValue = 0);
  }
  jie(t, e, i) {
    if (!(this.vie.BaseHatred <= 0) && this.Bte.AiPerception)
      for (const a of this.Bte.AiPerception.AllEnemies)
        if (!this.Aie.has(a)) {
          var s =
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              a,
            );
          if (s?.Valid) {
            var r = this.Qie(s.Entity, 0);
            if (!(r <= 1)) {
              var h = Vector_1.Vector.DistSquared2D(e, s.ActorLocationProxy),
                n = s.ActorLocationProxy.Z - e.Z + i - s.HalfHeight,
                s = Vector_1.Vector.DistSquared2D(t, s.ActorLocationProxy);
              if (this.Kie(h, n, s)) {
                n = this.Pie(a);
                if ((n && (n.InMaxArea = !0), !(this.kie > r))) {
                  if (this.kie === r) {
                    if (this.Oie > MIN_HATE) continue;
                    if (this.Oie === MIN_HATE && this.Nie <= h) continue;
                  }
                  (this.kie = r),
                    (this.Oie = MIN_HATE),
                    (this.Nie = h),
                    (this.Gie = a);
                }
              }
            }
          }
        }
  }
  ChangeHatred(t, e, i) {
    if (0 === t)
      for (var [s, r] of this.Aie)
        (r.HatredValue = r.HatredValue * e + i),
          r.HatredValue <= 0 && this.Bie(s, "ForceChanged");
    else {
      var h = this.Aie.get(t);
      h ? (h.HatredValue = h.HatredValue * e + i) : 0 < i && this.Pie(t, i);
    }
  }
  ClearHatred(t) {
    0 === t ? this.Bie(0, "Clear") : this.Bie(t, "Clear");
  }
  Qie(t, e) {
    if (!t?.Active) return 0;
    var i = t.GetComponent(161);
    if (i?.Valid && !i.IsInGame) return 0;
    i = t.GetComponent(190);
    if (i) {
      if (this.Mie && i.HasTag(this.Mie)) return 1;
      if (i.HasTag(1008164187)) return 2;
      if (0 < e) return 6;
      e = t.GetComponent(0).GetPlayerId();
      if (!OnlineController_1.OnlineController.CheckPlayerNetHealthy(e))
        return 3;
      if (this.Eie && i.HasTag(this.Eie)) return 5;
    } else {
      e = t.GetComponent(0).GetPlayerId();
      if (!OnlineController_1.OnlineController.CheckPlayerNetHealthy(e))
        return 3;
    }
    return 4;
  }
  Kie(t, e, i) {
    return (
      t < this.Sie &&
      MathUtils_1.MathUtils.InRange(e, this.vie.DisengageHeightRange) &&
      i < this.Iie
    );
  }
  Wie(t, e, i) {
    return (
      t < this.yie &&
      MathUtils_1.MathUtils.InRange(e, this.vie.DisengageHeightRangeMax) &&
      i < this.Tie
    );
  }
  SharedHatredTarget(t) {
    var e;
    this.vie &&
      ((e = this.Aie.get(t))
        ? (e.EarliestClearTime = Time_1.Time.WorldTime + this.vie.MinClearTime)
        : this.Pie(t));
  }
  Fie() {
    var t = this.Bte.CharActorComp.CreatureData.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "AiComponent",
      )?.CenterPoint;
      if (t) {
        var t =
          ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
        if (t)
          return (
            (t = Vector_1.Vector.Create(
              t.Transform?.Pos.X ?? 0,
              t.Transform?.Pos.Y ?? 0,
              t.Transform?.Pos.Z ?? 0,
            )),
            Vector_1.Vector.Create(t.X, t.Y, t.Z)
          );
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            51,
            "CenterPoint实体非法, 请指定【TsEntity_用例_投放】以外的实体",
          );
      }
    }
  }
}
exports.AiHateList = AiHateList;
//# sourceMappingURL=AiHateList.js.map
