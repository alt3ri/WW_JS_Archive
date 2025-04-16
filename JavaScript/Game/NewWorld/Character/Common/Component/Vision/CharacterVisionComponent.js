"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, n) {
    var o,
      r = arguments.length,
      s =
        r < 3
          ? i
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(i, e))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, i, e, n);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (o = t[a]) && (s = (r < 3 ? o(s) : 3 < r ? o(i, e, s) : o(i, e)) || s);
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
  InputController_1 = require("../../../../../Input/InputController"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
  SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
  BaseAbilityComponent_1 = require("../Abilities/BaseAbilityComponent"),
  GameplayAbilityVisionControl_1 = require("./GA/GameplayAbilityVisionControl"),
  GameplayAbilityVisionExplore_1 = require("./GA/GameplayAbilityVisionExplore"),
  GameplayAbilityVisionMorph_1 = require("./GA/GameplayAbilityVisionMorph"),
  GameplayAbilityVisionPresent_1 = require("./GA/GameplayAbilityVisionPresent"),
  GameplayAbilityVisionSummon_1 = require("./GA/GameplayAbilityVisionSummon"),
  visionTriggerTag = -579527112,
  visionTypes = {
    [0]: GameplayAbilityVisionSummon_1.GameplayAbilityVisionSummon,
    1: GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph,
    2: GameplayAbilityVisionExplore_1.GameplayAbilityVisionExplore,
    3: GameplayAbilityVisionControl_1.GameplayAbilityVisionControl,
    4: GameplayAbilityVisionPresent_1.GameplayAbilityVisionPresent,
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
      (this.Bhh = void 0),
      (this.KSc = void 0),
      (this.bpr = () => {
        var t = PhantomUtil_1.PhantomUtil.GetVisionData(this.GetVisionId());
        (t && 4 === t.类型) ||
          PhantomUtil_1.PhantomUtil.SetVisionEnable(
            this.Entity,
            !1,
            "OnTeleportStart.SetVisionEnable",
          );
      }),
      (this.Nca = (t, i) => {
        var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          this.Entity,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
        )?.Entity?.GetComponent(39);
        e?.Valid && ((e.SkillTarget = t), (e.SkillTargetSocket = i));
      });
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    (this.len = t.VisionSkillServerEntityId),
      this._en
        ? (this.uen(this._en), (this._en = void 0))
        : (t = t.ComponentDataMap.get("uys")?.uys?.CIs) && this.uen(t);
    const e = this.Entity.GetComponent(203);
    e &&
      (this.KSc = e.ListenForTagAddOrRemove(visionTriggerTag, (t, i) => {
        i &&
          (i = e.GetChildrenTags(t)[0]) &&
          SceneTeamController_1.SceneTeamController.EmitEvent(
            this.Entity,
            EventDefine_1.EEventName.ActivateAbilityVision,
            i,
          );
      }));
    for (const n of Object.keys(visionTypes)) {
      var i = Number(n);
      5 !== i && this.aen.set(i, visionTypes[i].Spawn(this));
    }
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSkillTargetChanged,
        this.Nca,
      ),
      this.Fhh(),
      (this.rXt = !0)
    );
  }
  OnEnd() {
    for (const t of this.aen.values()) t.Destroy();
    return (
      this.KSc && this.KSc.EndTask(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharSkillTargetChanged,
        this.Nca,
      ),
      this.khh(),
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
        for (const n of this.aen.values()) n.ChangeVision();
    } else this._en = t;
  }
  uen(t) {
    if ((this.sen.clear(), (this.hen = 0), t)) {
      var i = this.Entity.GetComponent(205);
      for (const n of t) {
        var e = PhantomUtil_1.PhantomUtil.GetVisionData(n.r5n);
        e &&
          ((e = e.类型), this.sen.set(e, n), [0, 1, 4].includes(e)) &&
          (i?.ModifyCdInfo(
            PhantomUtil_1.PhantomUtil.GetSkillGroupId(n.r5n),
            PhantomUtil_1.PhantomUtil.GetSkillCd(n.r5n),
          ),
          (this.hen = n.r5n));
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
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionLevelByDamageId(t) {
    for (const i of this.sen.values())
      if (0 < i.ATs)
        if (PhantomUtil_1.PhantomUtil.GetSkillSettleIds(i.r5n).includes(t))
          return i.ATs;
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionData(i) {
    if ([...this.sen.values()].some((t) => t.r5n === i))
      return PhantomUtil_1.PhantomUtil.GetVisionData(i);
  }
  ActivateAbilityVision(t) {
    var i = this.aen.get(t)?.ActivateAbility() ?? !1;
    return (
      i &&
        [0, 1, 4].includes(t) &&
        SceneTeamController_1.SceneTeamController.EmitEvent(
          this.Entity,
          EventDefine_1.EEventName.ActivateAbilityVision,
          this.GetVisionId(),
        ),
      i
    );
  }
  EndAbilityVision(t) {
    return this.aen.get(t)?.EndAbility() ?? !1;
  }
  GetVisionId() {
    return this.hen;
  }
  GetVisionSkillInformation(t) {
    return this.sen.get(t);
  }
  Fhh() {
    var t;
    (this.Bhh = InputController_1.InputController.CreateInputLayer(2)),
      this.Bhh &&
        (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
          this.Entity,
        )) &&
        (this.Bhh.Init(t),
        InputController_1.InputController.AddInputLayer(
          this.Entity.Id,
          this.Bhh,
        ));
  }
  khh() {
    this.Bhh &&
      (InputController_1.InputController.RemoveInputLayer(this.Bhh),
      this.Bhh.Clear(),
      (this.Bhh = void 0));
  }
  HandlePress(t, i) {
    for (const e of this.aen.values()) if (e.HandlePress(t, i)) return !0;
    return !1;
  }
};
(CharacterVisionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(42)],
  CharacterVisionComponent,
)),
  (exports.CharacterVisionComponent = CharacterVisionComponent);
//# sourceMappingURL=CharacterVisionComponent.js.map
