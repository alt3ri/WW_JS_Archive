"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, a, i) {
    var r,
      s = arguments.length,
      o =
        s < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, a))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, a, i);
    else
      for (var u = e.length - 1; 0 <= u; u--)
        (r = e[u]) && (o = (s < 3 ? r(o) : 3 < s ? r(t, a, o) : r(t, a)) || o);
    return 3 < s && o && Object.defineProperty(t, a, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGameplayCueComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  GameplayCueById_1 = require("../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  GameplayCueBeam_1 = require("./GameplayCueSFX/GameplayCueBeam"),
  GameplayCueCameraEffect_1 = require("./GameplayCueSFX/GameplayCueCameraEffect"),
  GameplayCueEffect_1 = require("./GameplayCueSFX/GameplayCueEffect"),
  GameplayCueFixHook_1 = require("./GameplayCueSFX/GameplayCueFixHook"),
  GameplayCueFollow_1 = require("./GameplayCueSFX/GameplayCueFollow"),
  GameplayCueFromSummoned_1 = require("./GameplayCueSFX/GameplayCueFromSummoned"),
  GameplayCueHideBone_1 = require("./GameplayCueSFX/GameplayCueHideBone"),
  GameplayCueHideMesh_1 = require("./GameplayCueSFX/GameplayCueHideMesh"),
  GameplayCueHookUp_1 = require("./GameplayCueSFX/GameplayCueHookUp"),
  GameplayCueManipulateInteract_1 = require("./GameplayCueSFX/GameplayCueManipulateInteract"),
  GameplayCueMaterial_1 = require("./GameplayCueSFX/GameplayCueMaterial"),
  GameplayCueMoveSpline_1 = require("./GameplayCueSFX/GameplayCueMoveSpline"),
  GameplayCueUIEffect_1 = require("./GameplayCueSFX/GameplayCueUIEffect");
let CharacterGameplayCueComponent = class CharacterGameplayCueComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.ybr = void 0),
      (this.m1t = void 0),
      (this._kn = void 0),
      (this.VQo = new Map()),
      (this.wqr = new Set()),
      (this.Vna = new Map()),
      (this.Hna = new Map()),
      (this.jna = new Map()),
      (this.Wna = new Map());
  }
  OnStart() {
    return (
      (this.n$t = this.Entity.CheckGetComponent(3)),
      (this.ybr = this.Entity.CheckGetComponent(109)),
      (this.m1t = this.Entity.CheckGetComponent(159)),
      (this._kn = this.Entity.GetComponent(174)),
      !0
    );
  }
  OnClear() {
    for (const e of this.GetAllCurrentCueRef()) e.Destroy();
    return !0;
  }
  OnEnable() {
    this.SetHidden(!1);
  }
  OnDisable() {
    this.SetHidden(!0);
  }
  OnTick(e) {
    var t = e * TimeUtil_1.TimeUtil.Millisecond;
    for (const a of this.GetAllCurrentCueRef()) a.Tick(t);
  }
  OnChangeTimeDilation(t) {
    for (const e of this.GetAllCurrentCueRef()) e.ChangeTimeDilation(t);
    this.wqr.forEach((e) => {
      EffectSystem_1.EffectSystem.IsValid(e)
        ? EffectSystem_1.EffectSystem.SetTimeScale(
            e,
            this.ybr.CurrentTimeScale * t,
          )
        : this.wqr.delete(e);
    });
  }
  CreateGameplayCue(e, t = {}) {
    var a = t.Buff,
      i = a?.IsInstantBuff() ?? !0,
      i = this.Bqr(e, i);
    if (i)
      return (
        (i = i.Spawn({
          CueConfig: e,
          Entity: this.Entity,
          Actor: this.n$t.Actor,
          CueComp: this,
          Buff: a,
          BeginCallback: t.BeginCallback,
          EndCallback: t.EndCallback,
        })),
        t.Sync && this.GXs(e.Id),
        i
      );
  }
  CreateGameplayCueByBuff(i) {
    const r = i.Handle;
    this.jna.has(r) ||
      this.VQo.has(r) ||
      i.Config.GameplayCueIds?.forEach((t) => {
        var a = GameplayCueById_1.configGameplayCueById.GetConfig(t);
        if (a) {
          let e = this.Vna.get(t);
          (e =
            !e && this.x$s(a, i)
              ? this.CreateGameplayCue(a, { Buff: i })
              : e) &&
            !i.IsInstantBuff() &&
            (this.P$s(r, t, e), this.Qna(r, t, e));
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 29, "无法找到Cue配置！", [
              "cueConfigId:",
              t,
            ]);
      });
  }
  AddEffectToSet(e) {
    this.wqr.add(e),
      EffectSystem_1.EffectSystem.AddFinishCallback(e, (e) => {
        this.wqr.delete(e);
      }),
      EffectSystem_1.EffectSystem.SetTimeScale(
        e,
        this.ybr.CurrentTimeScale * this.Entity.TimeDilation,
      ),
      this.Active ||
        EffectSystem_1.EffectSystem.GetEffectActor(e).SetActorHiddenInGame(!0);
  }
  *GetAllCurrentCueRef() {
    for (const e of this.VQo.values()) for (const t of e.values()) yield t;
    for (const a of this.Vna.values()) yield a;
  }
  DestroyGameplayCueByBuff(e) {
    const t = e.Handle;
    this.jna.delete(t),
      e.Config.GameplayCueIds?.forEach((e) => {
        this.Kna(t, e), this.$na(t, e);
      });
  }
  OnAnyBuffInhibitionChanged(e, t) {
    this.VQo.get(e)?.forEach((e) => {
      t ? e.Destroy() : e.Create();
    }),
      this.jna.get(e)?.forEach((e) => {
        var t = this.Hna.get(e),
          t = Array.from(t),
          a = t.every((e) => {
            return this.GetBuffByHandleId(e)?.IsActive();
          }),
          t = t.every((e) => {
            return !this.GetBuffByHandleId(e)?.IsActive();
          }),
          e = this.Vna.get(e);
        a && !e?.IsActive ? e?.Create() : t && e?.IsActive && e?.Destroy();
      });
  }
  SetHidden(t) {
    for (const e of this.GetAllCurrentCueRef()) t ? e.Disable() : e.Enable();
    this.wqr.forEach((e) => {
      EffectSystem_1.EffectSystem.IsValid(e)
        ? EffectSystem_1.EffectSystem.GetEffectActor(e).SetActorHiddenInGame(t)
        : this.wqr.delete(e);
    });
  }
  P$s(e, t, a) {
    0 !== a.CueConfig.CueType &&
      (this.VQo.has(e) || this.VQo.set(e, new Map()),
      this.VQo.get(e).set(t, a));
  }
  Qna(t, a, e) {
    if (0 === e.CueConfig.CueType) {
      this.Vna.set(a, e);
      {
        let e = this.Hna.get(a);
        e || ((e = new Set()), this.Hna.set(a, e)), e.add(t);
      }
      {
        let e = this.jna.get(t);
        e || ((e = new Set()), this.jna.set(t, e)), e.add(a);
      }
      0 < e.CueConfig.Group &&
        ((t = this.Wna.get(e.CueConfig.Group))
          ? t.CueConfig.Priority <= e.CueConfig.Priority &&
            t !== e &&
            (this.$na(t.ActiveHandleId, t.CueConfig.Id),
            this.Wna.set(e.CueConfig.Group, e))
          : this.Wna.set(e.CueConfig.Group, e));
    }
  }
  Kna(e, t) {
    var a = this.VQo.get(e)?.get(t);
    a &&
      (a.Destroy(), (a = this.VQo.get(e))) &&
      (a.delete(t), a.size <= 0) &&
      this.VQo.delete(e);
  }
  $na(e, t) {
    var a,
      i = this.Vna.get(t);
    i &&
      (a = this.Hna.get(t)) &&
      (a.delete(e), a.size <= 0) &&
      (this.Hna.delete(t),
      this.Vna.delete(t),
      0 < i.CueConfig.Group && this.Wna.delete(i.CueConfig.Group),
      i.Destroy());
  }
  x$s(e, t) {
    return (
      !!t.IsInstantBuff() ||
      0 !== e.CueType ||
      e.Group <= 0 ||
      !(t = this.Wna.get(e.Group)) ||
      t.CueConfig.Priority <= e.Priority
    );
  }
  GetBuffByHandleId(e) {
    let t = this.m1t.GetBuffByHandle(e);
    return (t = t || this._kn?.GetFormationBuffComp()?.GetBuffByHandle(e));
  }
  Bqr(e, t) {
    switch (e.CueType) {
      case 0:
        return e.bSoftFollow
          ? GameplayCueFollow_1.GameplayCueFollow
          : GameplayCueEffect_1.GameplayCueEffect;
      case 1:
        return GameplayCueMaterial_1.GameplayCueMaterial;
      case 4:
      case 2:
      case 14:
        return t ? void 0 : GameplayCueUIEffect_1.GameplayCueUIEffect;
      case 5:
        return GameplayCueUIEffect_1.GameplayCueUIEffect;
      case 3:
        return GameplayCueMoveSpline_1.GameplayCueMoveSpline;
      case 6:
        return t ? void 0 : GameplayCueBeam_1.GameplayCueBeam;
      case 7:
        return t ? void 0 : GameplayCueHookUp_1.GameplayCueHookUp;
      case 8:
        return t ? void 0 : GameplayCueFixHook_1.GameplayCueFixHook;
      case 9:
        return GameplayCueCameraEffect_1.GameplayCueCameraEffect;
      case 10:
        return GameplayCueFromSummoned_1.GameplayCueFromSummoned;
      case 11:
        return GameplayCueHideMesh_1.GameplayCueHideMesh;
      case 12:
        return GameplayCueHideBone_1.GameplayCueHideBone;
      case 13:
        return GameplayCueManipulateInteract_1.GameplayCueManipulateInteract;
      default:
        return;
    }
  }
  GXs(e) {
    var t = Protocol_1.Aki.Protocol.RXs.create();
    (t.DXs = MathUtils_1.MathUtils.BigIntToLong(e)),
      CombatMessage_1.CombatNet.Call(4881, this.Entity, t, () => {});
  }
  static GameplayCueNotify(e, t) {
    (e = e?.GetComponent(19)),
      (t = MathUtils_1.MathUtils.LongToBigInt(t.DXs)),
      (t = GameplayCueById_1.configGameplayCueById.GetConfig(t));
    t && e?.CreateGameplayCue(t);
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("LXs")],
  CharacterGameplayCueComponent,
  "GameplayCueNotify",
  null,
),
  (CharacterGameplayCueComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(19)],
    CharacterGameplayCueComponent,
  )),
  (exports.CharacterGameplayCueComponent = CharacterGameplayCueComponent);
//# sourceMappingURL=CharacterGameplayCueComponent.js.map
