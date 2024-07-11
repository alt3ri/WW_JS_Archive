"use strict";
var CharacterAbilityComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, r) {
      var a,
        o = arguments.length,
        n =
          o < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (a = t[s]) &&
            (n = (o < 3 ? a(n) : 3 < o ? a(e, i, n) : a(e, i)) || n);
      return 3 < o && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAbilityComponent =
    exports.EBuffApplyType =
    exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND =
    exports.DEFAULT_SOURCE_SKILL_LEVEL =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  CharacterNameDefines_1 = require("../../CharacterNameDefines");
(exports.DEFAULT_SOURCE_SKILL_LEVEL = 1),
  (exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND = -1),
  (exports.EBuffApplyType = Protocol_1.Aki.Protocol.oFs);
let CharacterAbilityComponent =
  (CharacterAbilityComponent_1 = class CharacterAbilityComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.n$t = void 0),
        (this.Pbr = void 0),
        (this.Xte = void 0),
        (this.xbr = ""),
        (this.gVs = void 0),
        (this.GameplayEventCallbacks = new Map()),
        (this.pVs = (t) => {
          var e = t?.TagId;
          if (void 0 !== e) {
            t = this.GameplayEventCallbacks.get(e);
            if (t) {
              var i = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
              for (const r of [...t])
                try {
                  r(e);
                } catch (t) {
                  t instanceof Error
                    ? Log_1.Log.CheckError() &&
                      Log_1.Log.ErrorWithStack(
                        "Event",
                        29,
                        "gameplayEvent事件回调执行异常",
                        t,
                        ["gameplayEvent", i],
                        ["error", t.message],
                      )
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Event",
                        29,
                        "gameplayEvent事件回调执行异常",
                        ["gameplayEvent", i],
                        ["error", t],
                      );
                }
            }
          }
        });
    }
    OnStart() {
      if (
        ((this.n$t = this.Entity.GetComponent(3)),
        this.n$t.Actor.TryAddTsAbilitySystemComponent(),
        (this.Pbr = this.n$t.Actor.AbilitySystemComponent),
        !this.Pbr.IsValid())
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
      this.Pbr.SetComponentTickEnabled(!1);
      var t = CharacterNameDefines_1.CharacterNameDefines.ABP_BASE;
      return (
        this.n$t.Actor.Mesh.GetLinkedAnimGraphInstanceByTag(t) && this.wbr(t),
        this.InitClass(),
        (this.Xte = this.Entity.CheckGetComponent(188)),
        (this.gVs = this.CreateGameplayEventTask(this.pVs)),
        !0
      );
    }
    OnEnd() {
      return this.gVs && this.gVs.EndTask(), !0;
    }
    OnClear() {
      return (
        this.Pbr &&
          (this.Pbr.K2_DestroyComponent(this.Pbr), (this.Pbr = void 0)),
        !0
      );
    }
    OnTick(t) {
      this.Pbr.KuroTickComponentOutside(
        t *
          MathUtils_1.MathUtils.MillisecondToSecond *
          this.n$t.Actor.CustomTimeDilation,
      );
    }
    wbr(t) {
      this.Pbr.BP_InitAbilityActorInfo(t);
    }
    AddPerformanceTag(t) {
      (this.xbr = t),
        this.Xte.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
    }
    ClearLastPerformanceTag() {
      this.xbr &&
        this.Xte.RemoveTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.xbr),
        );
    }
    SendGameplayEventToActor(t, e = void 0) {
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
        this.n$t.Actor,
        t,
        e || CharacterAbilityComponent_1.Bbr,
      );
    }
    TryActivateAbilityByClass(t, e = !0) {
      return this.Pbr.TryActivateAbilityByClass(t, e);
    }
    GetCurrentWaitAndPlayedMontageCorrespondingGa() {
      return this.Pbr.LocalAnimMontageInfo.AnimatingAbility;
    }
    GetAbility(t) {
      return this.Pbr.GetAbility(t);
    }
    ClearAbility(t) {
      this.Pbr.RemoveAbility(t);
    }
    InitClass() {
      CharacterAbilityComponent_1.bbr ||
        ((CharacterAbilityComponent_1.Bbr = new UE.GameplayEventData()),
        (CharacterAbilityComponent_1.bbr = !0));
    }
    CreateGameplayEventTask(t) {
      var e = UE.AsyncTaskWaitGameplayEvent.ListenForGameplayEvent(this.Pbr);
      return e.EventReceived.Add(t), e;
    }
    AddGameplayEventListener(e, i) {
      if (void 0 !== e && i) {
        let t = this.GameplayEventCallbacks.get(e);
        t || this.GameplayEventCallbacks.set(e, (t = new Set())),
          t.has(i)
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Character",
                29,
                "重复添加回调函数",
                [
                  "gameplayEvent",
                  GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
                ],
                ["callbackName", i.name],
              )
            : t.add(i);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            29,
            "回调函数添加失败",
            [
              "gameplayEvent",
              GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
            ],
            ["callbackName", i?.name],
          );
    }
    RemoveGameplayEventListener(t, e) {
      t = this.GameplayEventCallbacks.get(t);
      t && t.delete(e);
    }
  });
(CharacterAbilityComponent.Bbr = void 0),
  (CharacterAbilityComponent.bbr = !1),
  (CharacterAbilityComponent = CharacterAbilityComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(17)],
      CharacterAbilityComponent,
    )),
  (exports.CharacterAbilityComponent = CharacterAbilityComponent);
//# sourceMappingURL=CharacterAbilityComponent.js.map
