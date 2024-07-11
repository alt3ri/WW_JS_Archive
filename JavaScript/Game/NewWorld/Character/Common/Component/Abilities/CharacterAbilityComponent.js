"use strict";
let CharacterAbilityComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, r) {
    let o;
    const n = arguments.length;
    let a =
      n < 3 ? e : r === null ? (r = Object.getOwnPropertyDescriptor(e, i)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, e, i, r);
    else
      for (let s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return n > 3 && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAbilityComponent =
    exports.EBuffApplyType =
    exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND =
    exports.DEFAULT_SOURCE_SKILL_LEVEL =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
(exports.DEFAULT_SOURCE_SKILL_LEVEL = 1),
  (exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND = -1),
  (exports.EBuffApplyType = Protocol_1.Aki.Protocol.CGs);
let CharacterAbilityComponent =
  (CharacterAbilityComponent_1 = class CharacterAbilityComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.nXt = void 0),
        (this.tqr = void 0),
        (this.Xte = void 0),
        (this.iqr = "");
    }
    OnStart() {
      if (
        ((this.nXt = this.Entity.GetComponent(3)),
        this.nXt.Actor.TryAddTsAbilitySystemComponent(),
        (this.tqr = this.nXt.Actor.AbilitySystemComponent),
        !this.tqr.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "技能组件TsAbilityComponentInternal Add失败，AbilityComponent Start失败",
            ),
          !1
        );
      this.tqr.SetComponentTickEnabled(!1);
      const t = CharacterNameDefines_1.CharacterNameDefines.ABP_BASE;
      return (
        this.nXt.Actor.Mesh.GetLinkedAnimGraphInstanceByTag(t) && this.oqr(t),
        this.InitClass(),
        (this.Xte = this.Entity.CheckGetComponent(185)),
        !0
      );
    }
    OnClear() {
      return (
        this.tqr &&
          (this.tqr.K2_DestroyComponent(this.tqr), (this.tqr = void 0)),
        !0
      );
    }
    OnTick(t) {
      this.tqr.KuroTickComponentOutside(
        t *
          MathUtils_1.MathUtils.MillisecondToSecond *
          this.nXt.Actor.CustomTimeDilation,
      );
    }
    oqr(t) {
      this.tqr.BP_InitAbilityActorInfo(t);
    }
    AddPerformanceTag(t) {
      (this.iqr = t),
        this.Xte.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
    }
    ClearLastPerformanceTag() {
      this.iqr &&
        this.Xte.RemoveTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.iqr),
        );
    }
    SendGameplayEventToActor(t, e = void 0) {
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
        this.nXt.Actor,
        t,
        e || CharacterAbilityComponent_1.rqr,
      );
    }
    TryActivateAbilityByClass(t, e = !0) {
      return this.tqr.TryActivateAbilityByClass(t, e);
    }
    GetCurrentWaitAndPlayedMontageCorrespondingGa() {
      return this.tqr.LocalAnimMontageInfo.AnimatingAbility;
    }
    GetAbility(t) {
      return this.tqr.GetAbility(t);
    }
    ClearAbility(t) {
      this.tqr.RemoveAbility(t);
    }
    InitClass() {
      CharacterAbilityComponent_1.nqr ||
        ((CharacterAbilityComponent_1.rqr = new UE.GameplayEventData()),
        (CharacterAbilityComponent_1.nqr = !0));
    }
  });
(CharacterAbilityComponent.rqr = void 0),
  (CharacterAbilityComponent.nqr = !1),
  (CharacterAbilityComponent = CharacterAbilityComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(17)],
      CharacterAbilityComponent,
    )),
  (exports.CharacterAbilityComponent = CharacterAbilityComponent);
// # sourceMappingURL=CharacterAbilityComponent.js.map
