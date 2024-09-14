"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, o) {
    var n,
      r = arguments.length,
      s =
        r < 3
          ? i
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(i, e))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, i, e, o);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (n = t[a]) && (s = (r < 3 ? n(s) : 3 < r ? n(i, e, s) : n(i, e)) || s);
    return 3 < r && s && Object.defineProperty(i, e, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterVisionComponent = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
  CharacterAbilityComponent_1 = require("../Abilities/CharacterAbilityComponent"),
  GameplayAbilityVisionControl_1 = require("./GA/GameplayAbilityVisionControl"),
  GameplayAbilityVisionExplore_1 = require("./GA/GameplayAbilityVisionExplore"),
  GameplayAbilityVisionMorph_1 = require("./GA/GameplayAbilityVisionMorph"),
  GameplayAbilityVisionSummon_1 = require("./GA/GameplayAbilityVisionSummon"),
  visionTypes = {
    [0]: GameplayAbilityVisionSummon_1.GameplayAbilityVisionSummon,
    1: GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph,
    2: GameplayAbilityVisionExplore_1.GameplayAbilityVisionExplore,
    3: GameplayAbilityVisionControl_1.GameplayAbilityVisionControl,
  };
let CharacterVisionComponent = class CharacterVisionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.sen = new Map()),
      (this.aen = new Map()),
      (this.hen = 0),
      (this.len = 0),
      (this._en = void 0),
      (this.rXt = !1),
      (this.bpr = () => {
        PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Entity, !1);
      }),
      (this.Ema = (t, i) => {
        var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          this.Entity,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
        )?.Entity?.GetComponent(34);
        e?.Valid && ((e.SkillTarget = t), (e.SkillTargetSocket = i));
      });
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    (this.len = t.VisionSkillServerEntityId),
      this._en
        ? (this.uen(this._en), (this._en = void 0))
        : (t = t.ComponentDataMap.get("uys")?.uys?.CIs) && this.uen(t);
    for (const i of Object.keys(visionTypes))
      this.aen.set(Number(i), visionTypes[Number(i)].Spawn(this));
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSkillTargetChanged,
        this.Ema,
      ),
      (this.rXt = !0)
    );
  }
  OnEnd() {
    for (const t of this.aen.values()) t.Destroy();
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSkillTargetChanged,
        this.Ema,
      ),
      !0
    );
  }
  OnTick(t) {
    for (const i of this.aen.values()) i.Tick(t);
  }
  SetVisionSkillInformationList(t, i) {
    var e = this.len;
    if (((this.len = i), this.rXt)) {
      if ((this.uen(t), this.len !== e))
        for (const o of this.aen.values()) o.ChangeVision();
    } else this._en = t;
  }
  uen(t) {
    if ((this.sen.clear(), (this.hen = 0), t)) {
      var i = this.Entity.GetComponent(192);
      for (const o of t) {
        var e = PhantomUtil_1.PhantomUtil.GetVisionData(o.r5n);
        e &&
          (this.sen.set(e.类型, o), [0, 1].includes(e.类型)) &&
          (i.ModifyCdInfo(
            PhantomUtil_1.PhantomUtil.GetSkillGroupId(o.r5n),
            PhantomUtil_1.PhantomUtil.GetSkillCd(o.r5n),
          ),
          (this.hen = o.r5n));
      }
    }
  }
  GetVisionIdList() {
    var t = UE.NewArray(UE.BuiltinInt);
    for (const i of this.sen.values()) t.Add(i.r5n);
    return t;
  }
  GetVisionLevelList() {
    var t = UE.NewArray(UE.BuiltinInt);
    for (const i of this.sen.values()) t.Add(i.ATs);
    return t;
  }
  GetVisionLevelByBuffId(t) {
    for (const i of this.sen.values())
      if (0 < i.ATs)
        if (PhantomUtil_1.PhantomUtil.GetSkillBuffIds(i.r5n).includes(t))
          return i.ATs;
    return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionLevelByDamageId(t) {
    for (const i of this.sen.values())
      if (0 < i.ATs)
        if (PhantomUtil_1.PhantomUtil.GetSkillSettleIds(i.r5n).includes(t))
          return i.ATs;
    return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionData(i) {
    if ([...this.sen.values()].some((t) => t.r5n === i))
      return PhantomUtil_1.PhantomUtil.GetVisionData(i);
  }
  ActivateAbilityVision(t) {
    return this.aen.get(t).ActivateAbility();
  }
  EndAbilityVision(t) {
    return this.aen.get(t).EndAbility();
  }
  GetVisionId() {
    return this.hen;
  }
  GetVisionSkillInformation(t) {
    return this.sen.get(t);
  }
};
(CharacterVisionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(36)],
  CharacterVisionComponent,
)),
  (exports.CharacterVisionComponent = CharacterVisionComponent);
//# sourceMappingURL=CharacterVisionComponent.js.map
