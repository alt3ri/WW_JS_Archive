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
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  MIN_HATE = 1,
  ONE_THOUSAND_MILLISECONDS = 1e3,
  tmpVector = Vector_1.Vector.Create();
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
      (this.Uie = (t, i, e, s, h) => {
        var r;
        0 !== s.DamageData.CalculateType ||
          ((s = s.Damage), this.Lie?.Valid && this.Lie.HasTag(-893996770)) ||
          ((r = t.GetComponent(203))?.Valid && r.HasTag(-1566015933)) ||
          ((r = t.CheckGetComponent(3))?.Valid &&
            2 ===
              CampUtils_1.CampUtils.GetCampRelationship(
                this.Bte.CharActorComp.Actor.Camp,
                r.Actor.Camp,
              ) &&
            ((r = this.Aie.get(t.Id))
              ? (r.HatredValue += Math.max(
                  MIN_HATE,
                  r.InDecreasing
                    ? -s * this.vie.IncreaseRateWhenDecreasing
                    : -s,
                ))
              : this.Pie(t.Id, Math.max(MIN_HATE, -s))));
      }),
      (this.xie = (t, i) => {
        var e;
        i &&
          this.vie &&
          (this.Die?.Valid &&
            this.Die === i &&
            (EventSystem_1.EventSystem.EmitWithTarget(
              this.Bte.CharAiDesignComp.Entity,
              EventDefine_1.EEventName.AiHateTargetChanged,
              t.Id,
              i.Id,
            ),
            (this.Die = t),
            ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(
              this.Bte.CharActorComp.Entity.Id,
              "HateTarget",
              t.Id,
            )),
          void 0 !== (e = this.Aie.get(i?.Id))) &&
          (this.wie(t.Id, e, "ChangeRole"), this.Bie(i.Id, "InActive"));
      }),
      (this.Mjs = (t, i) => {
        this.vie &&
          void 0 !== (i = this.Aie.get(i?.Id)) &&
          this.wie(t.Id, i, "VisionMorphBegin");
      }),
      (this.CMl = (t, i) => {
        this.vie &&
          void 0 !== (i = this.Aie.get(i?.Id)) &&
          this.wie(t.Id, i, "VisionMorphEnd");
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
      var i = this.Bte.CharActorComp.Entity.GetComponent(176);
      if (
        (i &&
          ((s = this.Fie()) &&
            ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
              this.Bte.CharActorComp.Entity.Id,
              "CenterLocation",
              s.X,
              s.Y,
              s.Z,
            ),
          i.SetChain(t ? t.MaxMoveFromBorn : 0, s)),
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
        for (var [, e] of this.Aie) e.DisengageTime = -1;
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
            t.DisengageDistanceRange.Max * t.DisengageDistanceRange.Max);
        var i = t.DisengageBornDistance.Min,
          s = t.DisengageBornDistance.Max;
        i < 0 && s < 0
          ? ((this.Iie = Number.MAX_VALUE), (this.Tie = Number.MAX_VALUE))
          : ((this.Iie = i * i), (this.Tie = s * s));
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
    this.Lie = this.Bte.CharAiDesignComp?.Entity?.GetComponent(203);
  }
  GetHatredMap() {
    return this.Aie;
  }
  GetHatredMapDebugText() {
    let t = "";
    for (var [i, e] of this.Aie) {
      i =
        ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
          i,
        );
      i?.Valid &&
        (t +=
          "--" +
          i.Actor.GetName() +
          "(" +
          e.HatredValue +
          "," +
          e.TauntValue +
          "," +
          e.DisengageTime +
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.VisionMorphEnd,
        this.CMl,
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
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.VisionMorphEnd,
        this.CMl,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.VisionMorphEnd,
          this.CMl,
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
    var i;
    this.vie &&
      ((i = this.Bte.CharActorComp.ScaledHalfHeight),
      (t = this.Vie(t * MathUtils_1.MathUtils.MillisecondToSecond, i)),
      (i = this.Die?.Id),
      (this.Die = t
        ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)
        : void 0),
      (t = this.Die?.Id) !== i &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Bte.CharAiDesignComp.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          t,
          i,
        ),
      (t = this.Bte.CharAiDesignComp.Entity.Id),
      this.Die
        ? (ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
            t,
            "HateTarget",
          ) !== this.Die.Id &&
            ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(
              t,
              "HateTarget",
              this.Die.Id,
            ),
          (i = this.Aie.get(this.Die.Id)),
          Time_1.Time.WorldTime > i.DecreaseCdEndTime &&
            i.HatredValue > MIN_HATE &&
            ((i.DecreaseCdEndTime =
              Time_1.Time.WorldTime + this.vie.DecreaseTimeCd),
            (i.DecreaseEndTime =
              Time_1.Time.WorldTime + this.vie.DecreaseTimeLength),
            (i.NextDecreaseTime =
              Time_1.Time.WorldTime + ONE_THOUSAND_MILLISECONDS)))
        : ControllerHolder_1.ControllerHolder.BlackboardController.HasValueByEntity(
            t,
            "HateTarget",
          ) &&
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
            t,
            "HateTarget",
          ));
  }
  wie(t, i, e) {
    this.Aie.has(t)
      ? this.Aie.set(t, i)
      : (this.Aie.set(t, i),
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
  Pie(i, e = MIN_HATE, s) {
    if (this.vie) {
      let t = this.Aie.get(i);
      return (
        t
          ? ((t.HatredValue = e), s && (t.TauntValue = s))
          : (((t = new HatredItem()).HatredValue = e),
            s && (t.TauntValue = s),
            (t.EarliestClearTime =
              Time_1.Time.WorldTime + this.vie.MinClearTime),
            this.Aie.set(i, t),
            (e = EntitySystem_1.EntitySystem.Get(i))?.Valid &&
              (EventSystem_1.EventSystem.EmitWithTarget(
                e,
                EventDefine_1.EEventName.AiHateAddOrRemove,
                !0,
                this.Bte,
              ),
              this.Bte.AiPerceptionEvents.CollectAiHateEvent(!0, e)),
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
  Bie(t, i) {
    if (t) {
      if (this.Aie.has(t)) {
        const s = EntitySystem_1.EntitySystem.Get(t);
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
      for (var [e] of this.Aie) {
        const s = EntitySystem_1.EntitySystem.Get(e);
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
  Vie(t, i) {
    this.Rie.FromUeVector(this.Bte.CharActorComp.GetInitLocation());
    var e = this.Bte.CharActorComp.ActorLocationProxy;
    this.Hie(t, this.Rie, e, i), this.jie(this.Rie, e, i);
    let s = 0;
    for (const h of this.bie) this.Bie(h, this.qie[s]), ++s;
    return this.Gie;
  }
  Hie(t, i, e, s) {
    (this.Gie = 0),
      (this.Nie = this.yie),
      (this.Oie = 0),
      (this.kie = 2),
      (this.bie.length = 0),
      (this.qie.length = 0);
    for (var [h, r] of this.Aie) {
      var n =
        ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
          h,
        );
      if (n && n.Entity.Active) {
        n.ActorLocationProxy.Subtraction(e, tmpVector);
        var a = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
            this.Bte.CharActorComp,
            tmpVector,
          ),
          o = ((a += s - n.ScaledHalfHeight), tmpVector.SizeSquared()),
          _ =
            (i.Subtraction(n.ActorLocationProxy, tmpVector),
            GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(
              this.Bte.CharActorComp,
              tmpVector,
            )),
          a =
            ((r.InMaxArea = this.Wie(o, a, _)),
            r.InMaxArea && this.Kie(o, a, _));
        if (Time_1.Time.WorldTime < r.EarliestClearTime)
          !(r.DisengageTime <= 0) ||
            (r.InMaxArea && a) ||
            (r.DisengageTime =
              Time_1.Time.WorldTime +
              MathUtils_1.MathUtils.GetRandomRange(
                this.vie.DisengageTimeRange.Min,
                this.vie.DisengageTimeRange.Max,
              ));
        else {
          if (!r.InMaxArea) {
            this.bie.push(h), this.qie.push("MaxArea");
            continue;
          }
          if (0 < r.DisengageTime) {
            if (a) r.DisengageTime = -1;
            else if (
              r.TauntValue <= 0 &&
              Time_1.Time.WorldTime > r.DisengageTime
            ) {
              this.bie.push(h), this.qie.push("MinAreaTimer");
              continue;
            }
          } else
            a ||
              (r.DisengageTime =
                Time_1.Time.WorldTime +
                MathUtils_1.MathUtils.GetRandomRange(
                  this.vie.DisengageTimeRange.Min,
                  this.vie.DisengageTimeRange.Max,
                ));
        }
        r.InDecreasing &&
          Time_1.Time.WorldTime > r.NextDecreaseTime &&
          ((r.HatredValue = Math.max(
            MIN_HATE,
            r.HatredValue * this.vie.DecreaseRate,
          )),
          r.AfterTriggerHatredDecrease());
        _ = this.Qie(n.Entity, r.TauntValue);
        if (!(this.kie > _)) {
          if (this.kie === _) {
            if (this.Oie > r.HatredValueActual) continue;
            if (this.Oie === r.HatredValueActual && this.Nie <= o) continue;
          }
          (this.kie = _),
            (this.Oie = r.HatredValue),
            (this.Nie = o),
            (this.Gie = h);
        }
      } else this.bie.push(h), this.qie.push("InActive");
    }
  }
  AddNewHateListForTaunt(t, i) {
    var e = this.Aie.get(t);
    e ? (e.TauntValue = i) : this.Pie(t, MIN_HATE, i);
  }
  RemoveHateListForTaunt(t) {
    t = this.Aie.get(t);
    t && (t.TauntValue = 0);
  }
  jie(t, i, e) {
    if (!(this.vie.BaseHatred <= 0) && this.Bte.AiPerception)
      for (const a of this.Bte.AiPerception.AllEnemies)
        if (!this.Aie.has(a)) {
          var s =
            ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
              a,
            );
          if (s?.Valid) {
            var h = this.Qie(s.Entity, 0);
            if (!(h <= 1)) {
              s.ActorLocationProxy.Subtraction(i, tmpVector);
              var r = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
                  this.Bte.CharActorComp,
                  tmpVector,
                ),
                n = ((r += e - s.HalfHeight), tmpVector.SizeSquared()),
                s =
                  (t.Subtraction(s.ActorLocationProxy, tmpVector),
                  GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(
                    this.Bte.CharActorComp,
                    tmpVector,
                  ));
              if (this.Kie(n, r, s)) {
                r = this.Pie(a);
                if ((r && (r.InMaxArea = !0), !(this.kie > h))) {
                  if (this.kie === h) {
                    if (this.Oie > MIN_HATE) continue;
                    if (this.Oie === MIN_HATE && this.Nie <= n) continue;
                  }
                  (this.kie = h),
                    (this.Oie = MIN_HATE),
                    (this.Nie = n),
                    (this.Gie = a);
                }
              }
            }
          }
        }
  }
  ChangeHatred(t, i, e) {
    if (0 === t)
      for (var [s, h] of this.Aie)
        (h.HatredValue = h.HatredValue * i + e),
          h.HatredValue <= 0 && this.Bie(s, "ForceChanged");
    else {
      var r = this.Aie.get(t);
      r ? (r.HatredValue = r.HatredValue * i + e) : 0 < e && this.Pie(t, e);
    }
  }
  ClearHatred(t) {
    0 === t ? this.Bie(0, "Clear") : this.Bie(t, "Clear");
  }
  Qie(t, i) {
    if (!t?.Active) return 0;
    var e = t.GetComponent(173);
    if (e?.Valid && !e.IsInGame) return 0;
    e = t.GetComponent(203);
    if (e) {
      if (this.Mie && e.HasTag(this.Mie)) return 1;
      if (e.HasTag(1008164187)) return 2;
      if (0 < i) return 6;
      i = t.GetComponent(0).GetPlayerId();
      if (
        !ControllerHolder_1.ControllerHolder.OnlineController.CheckPlayerNetHealthy(
          i,
        )
      )
        return 3;
      if (this.Eie && e.HasTag(this.Eie)) return 5;
    } else {
      i = t.GetComponent(0).GetPlayerId();
      if (
        !ControllerHolder_1.ControllerHolder.OnlineController.CheckPlayerNetHealthy(
          i,
        )
      )
        return 3;
    }
    return 4;
  }
  Kie(t, i, e) {
    return (
      t < this.Sie &&
      MathUtils_1.MathUtils.InRange(i, this.vie.DisengageHeightRange) &&
      e < this.Iie
    );
  }
  Wie(t, i, e) {
    return (
      t < this.yie &&
      MathUtils_1.MathUtils.InRange(i, this.vie.DisengageHeightRangeMax) &&
      e < this.Tie
    );
  }
  SharedHatredTarget(t) {
    var i;
    this.vie &&
      !this.Die &&
      ((i = this.Aie.get(t))
        ? (i.EarliestClearTime = Time_1.Time.WorldTime + this.vie.MinClearTime)
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
            50,
            "CenterPoint实体非法, 请指定【TsEntity_用例_投放】以外的实体",
          );
      }
    }
  }
  OnEntityCampModified(t, i, e) {
    t.Id === this.Bte.CharAiDesignComp?.Entity.Id
      ? this.Bie(0, "ChangeCamp")
      : 2 !==
          CampUtils_1.CampUtils.GetCampRelationship(
            this.Bte.CharActorComp.Actor.Camp,
            e,
          ) &&
        (this.Bie(t.Id, "ChangeCamp"), this.Die?.Id === t.Id) &&
        ((e = this.Bte.CharActorComp.ScaledHalfHeight),
        (t = this.Vie(0, e)),
        (this.Die = t
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)
          : void 0));
  }
}
exports.AiHateList = AiHateList;
//# sourceMappingURL=AiHateList.js.map
