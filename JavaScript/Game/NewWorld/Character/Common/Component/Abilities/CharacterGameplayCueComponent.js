"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, a, r) {
    var i,
      s = arguments.length,
      n =
        s < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, a))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, a, r);
    else
      for (var o = e.length - 1; 0 <= o; o--)
        (i = e[o]) && (n = (s < 3 ? i(n) : 3 < s ? i(t, a, n) : i(t, a)) || n);
    return 3 < s && n && Object.defineProperty(t, a, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGameplayCueComponent = void 0);
const Stats_1 = require("../../../../../../Core/Common/Stats"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../../Module/Abilities/FormationDataController"),
  PlayerGameplayCueComponent_1 = require("../../../../Player/Component/PlayerGameplayCueComponent"),
  BaseGameplayCueComponent_1 = require("./BaseGameplayCueComponent"),
  GameplayCueController_1 = require("./GameplayCueSFX/Controller/GameplayCueController");
let CharacterGameplayCueComponent = class CharacterGameplayCueComponent extends BaseGameplayCueComponent_1.BaseGameplayCueComponent {
  constructor() {
    super(...arguments),
      (this.u1t = void 0),
      (this.n$t = void 0),
      (this.ybr = void 0),
      (this.wqr = new Set()),
      (this.Mha = new Map()),
      (this.Sha = new Map()),
      (this.Eha = new Map()),
      (this.yha = new Map());
  }
  OnStart() {
    return (
      (this.u1t = this.Entity.CheckGetComponent(0)),
      (this.n$t = this.Entity.CheckGetComponent(1)),
      (this.ybr = this.Entity.CheckGetComponent(120)),
      !0
    );
  }
  OnEnable() {
    this.SetHidden(!1);
  }
  OnDisable() {
    this.SetHidden(!0);
  }
  OnChangeTimeDilation(t) {
    this.wqr.forEach((e) => {
      EffectSystem_1.EffectSystem.IsValid(e)
        ? EffectSystem_1.EffectSystem.SetTimeScale(
            e,
            this.ybr.CurrentTimeScale * t,
            !0,
          )
        : this.wqr.delete(e);
    });
  }
  GetEntityHandle() {
    return ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
      this.Entity,
    );
  }
  AddCueEffectToSet(e) {
    this.wqr.add(e),
      EffectSystem_1.EffectSystem.AddFinishCallback(e, (e) => {
        this.wqr.delete(e);
      }),
      EffectSystem_1.EffectSystem.SetTimeScale(
        e,
        this.ybr.CurrentTimeScale * this.Entity.TimeDilation,
        !0,
      ),
      this.Active ||
        EffectSystem_1.EffectSystem.SetEffectHidden(
          e,
          !0,
          "CharacterGameplayCueComponent.AddCueEffectToSet",
        );
  }
  AddToOtherCueMap(e, t, a) {
    0 !== a.CueConfig.CueType && super.AddToOtherCueMap(e, t, a);
  }
  OnAnyBuffInhibitionChanged(e, t) {
    super.OnAnyBuffInhibitionChanged(e, t),
      this.Eha.get(e)?.forEach((e) => {
        var t = this.Sha.get(e),
          t = Array.from(t),
          a = t.every((e) => {
            return this.GetBuffByHandleId(e)?.IsActive();
          }),
          t = t.every((e) => {
            return !this.GetBuffByHandleId(e)?.IsActive();
          }),
          e = this.Mha.get(e);
        a && !e?.IsActive ? e?.Create() : t && e?.IsActive && e?.Destroy();
      });
  }
  CreateGameplayCueByBuff(i) {
    const s = i.Handle;
    this.Eha.has(s) ||
      this.OtherCueMap.has(s) ||
      i.Config.GameplayCueIds?.forEach((t) => {
        var a = GameplayCueController_1.GameplayCueController.GetConfigById(t);
        if (a) {
          var r = i.IsInstantBuff();
          if (this.dRa(i, a.CueType))
            this.HXa() &&
              !this.CRa()?.GetCueById(t) &&
              this.CRa()?.CreatePlayerGameplayCue(t, { Buff: i, Instant: r });
          else {
            let e = this.Mha.get(t);
            (e =
              !e && this.yYs(a, i)
                ? this.CreateGameplayCueInner(t, { Buff: i, Instant: r })
                : e) &&
              !r &&
              (this.Iha(s, t, e), this.AddToOtherCueMap(s, t, e));
          }
        }
      });
  }
  DestroyGameplayCueByBuff(a) {
    const r = a.Handle;
    this.Eha.delete(r),
      a.Config.GameplayCueIds?.forEach((e) => {
        var t = GameplayCueController_1.GameplayCueController.GetConfigById(e);
        t &&
          (this.dRa(a, t.CueType)
            ? this.HXa() && this.CRa()?.DestroyPlayerGameplayCue(r, e)
            : (this.Lha(r, e), this.RemoveFromOtherCueMap(r, e)));
      });
  }
  SetHidden(t) {
    for (const e of this.GetAllCurrentCueRef())
      t ? e.OnDisable() : e.OnEnable();
    this.wqr.forEach((e) => {
      EffectSystem_1.EffectSystem.IsValid(e)
        ? EffectSystem_1.EffectSystem.SetEffectHidden(
            e,
            t,
            "CharacterGameplayCueComponent.SetHidden",
          )
        : this.wqr.delete(e);
    });
  }
  Iha(t, a, e) {
    if (0 === e.CueConfig.CueType) {
      this.Mha.set(a, e);
      {
        let e = this.Sha.get(a);
        e || ((e = new Set()), this.Sha.set(a, e)), e.add(t);
      }
      {
        let e = this.Eha.get(t);
        e || ((e = new Set()), this.Eha.set(t, e)), e.add(a);
      }
      0 < e.CueConfig.Group &&
        ((t = this.yha.get(e.CueConfig.Group))
          ? t.CueConfig.Priority <= e.CueConfig.Priority &&
            t !== e &&
            (this.Lha(t.ActiveHandleId, t.CueConfig.Id),
            this.yha.set(e.CueConfig.Group, e))
          : this.yha.set(e.CueConfig.Group, e));
    }
  }
  Lha(e, t) {
    var a,
      r = this.Mha.get(t);
    r &&
      (a = this.Sha.get(t)) &&
      (a.delete(e), a.size <= 0) &&
      (this.Sha.delete(t),
      this.Mha.delete(t),
      0 < r.CueConfig.Group && this.yha.delete(r.CueConfig.Group),
      r.Destroy());
  }
  yYs(e, t) {
    return (
      !!t.IsInstantBuff() ||
      0 !== e.CueType ||
      e.Group <= 0 ||
      !(t = this.yha.get(e.Group)) ||
      t.CueConfig.Priority <= e.Priority
    );
  }
  dRa(e, t) {
    return (
      5 === e.Config.FormationPolicy &&
      this.n$t.IsAutonomousProxy &&
      PlayerGameplayCueComponent_1.PlayerGameplayCueComponent.IsSupportedCueType(
        t,
      )
    );
  }
  HXa() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return (
      ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e)
        ?.GetCurrentGroup()
        ?.GetCurrentRole()?.CreatureDataId === this.u1t?.GetCreatureDataId()
    );
  }
  CRa() {
    return FormationDataController_1.FormationDataController.GetPlayerEntity(
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
    )?.GetComponent(223);
  }
};
(CharacterGameplayCueComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(21)],
  CharacterGameplayCueComponent,
)),
  (exports.CharacterGameplayCueComponent = CharacterGameplayCueComponent);
//# sourceMappingURL=CharacterGameplayCueComponent.js.map
