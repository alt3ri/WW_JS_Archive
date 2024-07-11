"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, a, t, r) {
    let o;
    const i = arguments.length;
    let u =
      i < 3 ? a : r === null ? (r = Object.getOwnPropertyDescriptor(a, t)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      u = Reflect.decorate(e, a, t, r);
    else
      for (let l = e.length - 1; l >= 0; l--)
        (o = e[l]) && (u = (i < 3 ? o(u) : i > 3 ? o(a, t, u) : o(a, t)) || u);
    return i > 3 && u && Object.defineProperty(a, t, u), u;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGameplayCueComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const GameplayCueById_1 = require("../../../../../../Core/Define/ConfigQuery/GameplayCueById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const GameplayCueBeam_1 = require("./GameplayCueSFX/GameplayCueBeam");
const GameplayCueCameraEffect_1 = require("./GameplayCueSFX/GameplayCueCameraEffect");
const GameplayCueEffect_1 = require("./GameplayCueSFX/GameplayCueEffect");
const GameplayCueFixHook_1 = require("./GameplayCueSFX/GameplayCueFixHook");
const GameplayCueFollow_1 = require("./GameplayCueSFX/GameplayCueFollow");
const GameplayCueFromSummoned_1 = require("./GameplayCueSFX/GameplayCueFromSummoned");
const GameplayCueHideBone_1 = require("./GameplayCueSFX/GameplayCueHideBone");
const GameplayCueHideMesh_1 = require("./GameplayCueSFX/GameplayCueHideMesh");
const GameplayCueHookUp_1 = require("./GameplayCueSFX/GameplayCueHookUp");
const GameplayCueManipulateInteract_1 = require("./GameplayCueSFX/GameplayCueManipulateInteract");
const GameplayCueMaterial_1 = require("./GameplayCueSFX/GameplayCueMaterial");
const GameplayCueMoveSpline_1 = require("./GameplayCueSFX/GameplayCueMoveSpline");
const GameplayCueUIEffect_1 = require("./GameplayCueSFX/GameplayCueUIEffect");
let CharacterGameplayCueComponent = class CharacterGameplayCueComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.Qbr = void 0),
      (this.WKo = new Map()),
      (this.oGr = new Set());
  }
  OnStart() {
    return (
      (this.nXt = this.Entity.CheckGetComponent(3)),
      (this.Qbr = this.Entity.CheckGetComponent(107)),
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
    const a = e * TimeUtil_1.TimeUtil.Millisecond;
    for (const t of this.GetAllCurrentCueRef()) t.Tick(a);
  }
  OnChangeTimeDilation(a) {
    for (const e of this.GetAllCurrentCueRef()) e.ChangeTimeDilation(a);
    this.oGr.forEach((e) => {
      EffectSystem_1.EffectSystem.IsValid(e)
        ? EffectSystem_1.EffectSystem.SetTimeScale(
            e,
            this.Qbr.CurrentTimeScale * a,
          )
        : this.oGr.delete(e);
    });
  }
  CreateGameplayCue(e, a = {}) {
    a.Sync && this.w6s(e.Id);
    let t = !0;
    const r = a.Buff;
    const o = (r && (t = r.IsInstantBuff()), this.rGr(e, t));
    if (o)
      return o.Spawn({
        Entity: this.Entity,
        CueConfig: e,
        Actor: this.nXt.Actor,
        CueComp: this,
        Buff: r,
        BeginCallback: a.BeginCallback,
        EndCallback: a.EndCallback,
      });
  }
  CreateGameplayCueByBuff(e) {
    const a = e.Config.GameplayCueIds;
    const t = e.Handle;
    if (a)
      for (const o of a) {
        if (this.WKo.get(t)?.get(o)) return;
        let r = GameplayCueById_1.configGameplayCueById.GetConfig(o);
        if (!r)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 29, "无法找到Cue配置！", [
              "cueConfigId:",
              o,
            ])
          );
        (r = this.CreateGameplayCue(r, { Buff: e })),
          !e.IsInstantBuff() && r && this.nGr(t, o, r);
      }
  }
  AddEffectToSet(e) {
    this.oGr.add(e),
      EffectSystem_1.EffectSystem.AddFinishCallback(e, (e) => {
        this.oGr.delete(e);
      }),
      EffectSystem_1.EffectSystem.SetTimeScale(
        e,
        this.Qbr.CurrentTimeScale * this.Entity.TimeDilation,
      ),
      this.Active ||
        EffectSystem_1.EffectSystem.GetEffectActor(e).SetActorHiddenInGame(!0);
  }
  *GetAllCurrentCueRef() {
    for (const e of this.WKo.values()) for (const a of e.values()) yield a;
  }
  DestroyGameplayCue(e) {
    const a = e.Config.GameplayCueIds;
    const t = e.Handle;
    if (a)
      for (const o of a) {
        let r = this.WKo.get(t)?.get(o);
        if (!r) return;
        r.Destroy();
        r = this.WKo.get(t);
        r && (r.delete(o), r.size <= 0) && this.WKo.delete(t);
      }
  }
  OnAnyBuffInhibitionChanged(e, a) {
    e = this.WKo.get(e);
    if (e) for (const t of e.values()) a ? t.Destroy() : t.Create();
  }
  SetHidden(a) {
    for (const e of this.GetAllCurrentCueRef()) a ? e.Disable() : e.Enable();
    this.oGr.forEach((e) => {
      EffectSystem_1.EffectSystem.IsValid(e)
        ? EffectSystem_1.EffectSystem.GetEffectActor(e).SetActorHiddenInGame(a)
        : this.oGr.delete(e);
    });
  }
  nGr(e, a, t) {
    this.WKo.has(e) || this.WKo.set(e, new Map()), this.WKo.get(e).set(a, t);
  }
  rGr(e, a) {
    switch (e.CueType) {
      case 0:
        return e.bSoftFollow
          ? GameplayCueFollow_1.GameplayCueFollow
          : GameplayCueEffect_1.GameplayCueEffect;
      case 1:
        return GameplayCueMaterial_1.GameplayCueMaterial;
      case 4:
      case 2:
        return a ? void 0 : GameplayCueUIEffect_1.GameplayCueUIEffect;
      case 5:
        return GameplayCueUIEffect_1.GameplayCueUIEffect;
      case 3:
        return GameplayCueMoveSpline_1.GameplayCueMoveSpline;
      case 6:
        return a ? void 0 : GameplayCueBeam_1.GameplayCueBeam;
      case 7:
        return a ? void 0 : GameplayCueHookUp_1.GameplayCueHookUp;
      case 8:
        return a ? void 0 : GameplayCueFixHook_1.GameplayCueFixHook;
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
    }
  }
  w6s(e) {
    const a = Protocol_1.Aki.Protocol.R6s.create();
    (a.A6s = MathUtils_1.MathUtils.BigIntToLong(e)),
      CombatMessage_1.CombatNet.Call(16292, this.Entity, a, () => {});
  }
  static GameplayCueNotify(e, a) {
    (e = e?.GetComponent(19)),
      (a = MathUtils_1.MathUtils.LongToBigInt(a.A6s)),
      (a = GameplayCueById_1.configGameplayCueById.GetConfig(a));
    a && e?.CreateGameplayCue(a);
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("L6s", !1)],
  CharacterGameplayCueComponent,
  "GameplayCueNotify",
  null,
),
  (CharacterGameplayCueComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(19)],
    CharacterGameplayCueComponent,
  )),
  (exports.CharacterGameplayCueComponent = CharacterGameplayCueComponent);
// # sourceMappingURL=CharacterGameplayCueComponent.js.map
