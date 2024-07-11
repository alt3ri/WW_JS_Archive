"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, n) {
    let o;
    const r = arguments.length;
    let s =
      r < 3 ? i : n === null ? (n = Object.getOwnPropertyDescriptor(i, e)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, i, e, n);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(i, e, s) : o(i, e)) || s);
    return r > 3 && s && Object.defineProperty(i, e, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterVisionComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const CharacterAbilityComponent_1 = require("../Abilities/CharacterAbilityComponent");
const GameplayAbilityVisionControl_1 = require("./GA/GameplayAbilityVisionControl");
const GameplayAbilityVisionExplore_1 = require("./GA/GameplayAbilityVisionExplore");
const GameplayAbilityVisionMorph_1 = require("./GA/GameplayAbilityVisionMorph");
const GameplayAbilityVisionSummon_1 = require("./GA/GameplayAbilityVisionSummon");
const visionTypes = {
  0: GameplayAbilityVisionSummon_1.GameplayAbilityVisionSummon,
  1: GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph,
  2: GameplayAbilityVisionExplore_1.GameplayAbilityVisionExplore,
  3: GameplayAbilityVisionControl_1.GameplayAbilityVisionControl,
};
let CharacterVisionComponent = class CharacterVisionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Ren = new Map()),
      (this.Aen = new Map()),
      (this.Uen = 0),
      (this.Pen = 0),
      (this.xen = void 0),
      (this.rQt = !1),
      (this.Gfr = () => {
        PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Entity, !1);
      });
  }
  OnStart() {
    let t = this.Entity.GetComponent(0);
    (this.Pen = t.VisionSkillServerEntityId),
      this.xen
        ? (this.wen(this.xen), (this.xen = void 0))
        : (t = t.ComponentDataMap.get("Fvs")?.Fvs?.Wps) && this.wen(t);
    for (const i of Object.keys(visionTypes))
      this.Aen.set(Number(i), visionTypes[Number(i)].Create(this));
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.Gfr,
      ),
      (this.rQt = !0)
    );
  }
  OnEnd() {
    for (const t of this.Aen.values()) t.Destroy();
    return (
      this.Ren.clear(),
      this.Aen.clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.Gfr,
      ),
      !0
    );
  }
  OnTick(t) {
    for (const i of this.Aen.values()) i.Tick(t);
  }
  SetVisionSkillInformationList(t, i) {
    const e = this.Pen;
    if (((this.Pen = i), this.rQt)) {
      if ((this.wen(t), this.Pen !== e))
        for (const n of this.Aen.values()) n.OnVisionChanged();
    } else this.xen = t;
  }
  wen(t) {
    if ((this.Ren.clear(), (this.Uen = 0), t)) {
      const i = this.Entity.GetComponent(186);
      for (const n of t) {
        const e = PhantomUtil_1.PhantomUtil.GetVisionData(n.vkn);
        e &&
          (this.Ren.set(e.类型, n), [0, 1].includes(e.类型)) &&
          (i.ModifyCdInfo(
            PhantomUtil_1.PhantomUtil.GetSkillGroupId(n.vkn),
            PhantomUtil_1.PhantomUtil.GetSkillCd(n.vkn),
          ),
          (this.Uen = n.vkn));
      }
    }
  }
  GetVisionIdList() {
    const t = UE.NewArray(UE.BuiltinInt);
    for (const i of this.Ren.values()) t.Add(i.vkn);
    return t;
  }
  GetVisionLevelList() {
    const t = UE.NewArray(UE.BuiltinInt);
    for (const i of this.Ren.values()) t.Add(i.rSs);
    return t;
  }
  GetVisionLevelByBuffId(t) {
    for (const i of this.Ren.values())
      if (i.rSs > 0)
        if (PhantomUtil_1.PhantomUtil.GetSkillBuffIds(i.vkn).includes(t))
          return i.rSs;
    return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionLevelByDamageId(t) {
    for (const i of this.Ren.values())
      if (i.rSs > 0)
        if (PhantomUtil_1.PhantomUtil.GetSkillSettleIds(i.vkn).includes(t))
          return i.rSs;
    return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionData(i) {
    if ([...this.Ren.values()].some((t) => t.vkn === i))
      return PhantomUtil_1.PhantomUtil.GetVisionData(i);
  }
  ActivateAbilityVision(t) {
    return this.Aen.get(t).ActivateAbility();
  }
  EndAbilityVision(t) {
    return this.Aen.get(t).EndAbility();
  }
  GetVisionId() {
    return this.Uen;
  }
  GetVisionSkillInformation(t) {
    return this.Ren.get(t);
  }
  ExitMultiSkillStateOfMorphVision() {
    const t = this.Aen.get(1);
    t && t.ExitMultiSkillState();
  }
  OnGoDown() {
    const t = this.Aen.get(1);
    t && t.OnGoDown();
  }
  SetKeepMultiSkillState(t, i) {
    const e = this.Aen.get(1);
    e && e.SetKeepMultiSkillState(t, i);
  }
  SetEnableAttackInputActionOfMorphVision(t) {
    const i = this.Aen.get(1);
    i && i.SetEnableAttackInputAction(t);
  }
  CanSummonerStartNextMultiSkill() {
    const t = this.Aen.get(1);
    return !!t && t.CanSummonerStartNextMultiSkill();
  }
};
(CharacterVisionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(34)],
  CharacterVisionComponent,
)),
  (exports.CharacterVisionComponent = CharacterVisionComponent);
// # sourceMappingURL=CharacterVisionComponent.js.map
