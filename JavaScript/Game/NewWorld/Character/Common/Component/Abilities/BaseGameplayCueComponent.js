"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, a, t, r) {
    var u,
      l = arguments.length,
      m =
        l < 3
          ? a
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(a, t))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      m = Reflect.decorate(e, a, t, r);
    else
      for (var C = e.length - 1; 0 <= C; C--)
        (u = e[C]) && (m = (l < 3 ? u(m) : 3 < l ? u(a, t, m) : u(a, t)) || m);
    return 3 < l && m && Object.defineProperty(a, t, m), m;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseGameplayCueComponent = void 0);
const Stats_1 = require("../../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  GameplayCueController_1 = require("./GameplayCueSFX/Controller/GameplayCueController"),
  GameplayCueAnimBeam_1 = require("./GameplayCueSFX/GameplayCueAnimBeam"),
  GameplayCueAudioEvent_1 = require("./GameplayCueSFX/GameplayCueAudioEvent"),
  GameplayCueBeam_1 = require("./GameplayCueSFX/GameplayCueBeam"),
  GameplayCueCameraEffect_1 = require("./GameplayCueSFX/GameplayCueCameraEffect"),
  GameplayCueEffect_1 = require("./GameplayCueSFX/GameplayCueEffect"),
  GameplayCueFixHook_1 = require("./GameplayCueSFX/GameplayCueFixHook"),
  GameplayCueFollow_1 = require("./GameplayCueSFX/GameplayCueFollow"),
  GameplayCueFromSummoned_1 = require("./GameplayCueSFX/GameplayCueFromSummoned"),
  GameplayCueHideBone_1 = require("./GameplayCueSFX/GameplayCueHideBone"),
  GameplayCueHideMesh_1 = require("./GameplayCueSFX/GameplayCueHideMesh"),
  GameplayCueHitEffect_1 = require("./GameplayCueSFX/GameplayCueHitEffect"),
  GameplayCueHookUp_1 = require("./GameplayCueSFX/GameplayCueHookUp"),
  GameplayCueManipulateInteract_1 = require("./GameplayCueSFX/GameplayCueManipulateInteract"),
  GameplayCueMaterial_1 = require("./GameplayCueSFX/GameplayCueMaterial"),
  GameplayCueMoveSpline_1 = require("./GameplayCueSFX/GameplayCueMoveSpline"),
  GameplayCueSkillTargetBeam_1 = require("./GameplayCueSFX/GameplayCueSkillTargetBeam"),
  GameplayCueSkinDamage_1 = require("./GameplayCueSFX/GameplayCueSkinDamage"),
  GameplayCueTraceRay_1 = require("./GameplayCueSFX/GameplayCueTraceRay"),
  GameplayCueUIEffect_1 = require("./GameplayCueSFX/GameplayCueUIEffect");
function getGameplayCueClass(e, a) {
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
    case 20:
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
    case 15:
      return GameplayCueHitEffect_1.GameplayCueHitEffect;
    case 16:
      return GameplayCueSkillTargetBeam_1.GameplayCueSkillTargetBeam;
    case 17:
      return GameplayCueAnimBeam_1.GameplayCueAnimBeam;
    case 18:
      return GameplayCueTraceRay_1.GameplayCueTraceRay;
    case 19:
      return GameplayCueSkinDamage_1.GameplayCueSkinDamage;
    case 21:
      return GameplayCueAudioEvent_1.GameplayCueAudioEvent;
    default:
      return;
  }
}
let BaseGameplayCueComponent = class BaseGameplayCueComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.CueContainer = new Map()),
      (this.OtherCueMap = new Map());
  }
  OnEnd() {
    for (const e of this.GetAllCurrentCueRef()) e.Destroy();
    return !0;
  }
  OnTick(e) {
    var a = e * TimeUtil_1.TimeUtil.Millisecond;
    for (const t of this.GetAllCurrentCueRef()) t.Tick(a);
  }
  AddCue(e, a = {}) {
    return (
      this.CreateGameplayCueInner(e, a)?.Handle ??
      GameplayCueController_1.INVALID_CUE_HANDLE
    );
  }
  RemoveCue(e) {
    e = this.GetCueById(e);
    e && e.Destroy();
  }
  RemoveCueByHandle(e) {
    e = this.CueContainer.get(e);
    e && e.Destroy();
  }
  AddCueEffectToSet(e) {}
  OnAnyBuffInhibitionChanged(e, a) {
    this.OtherCueMap.get(e)?.forEach((e) => {
      a ? e.Destroy() : e.Create(this.GetEntityHandle());
    });
  }
  GetEntityHandle() {}
  AddToOtherCueMap(e, a, t) {
    this.OtherCueMap.has(e) || this.OtherCueMap.set(e, new Map()),
      this.OtherCueMap.get(e).set(a, t);
  }
  RemoveFromOtherCueMap(e, a) {
    var t = this.OtherCueMap.get(e)?.get(a);
    t &&
      (t.Destroy(), (t = this.OtherCueMap.get(e))) &&
      (t.delete(a), t.size <= 0) &&
      this.OtherCueMap.delete(e);
  }
  *GetAllCurrentCueRef() {
    for (const e of this.CueContainer.values()) yield e;
  }
  GetCueById(e) {
    for (const a of this.CueContainer.values())
      if (a.CueConfig.Id === e) return a;
  }
  GetCueByHandle(e) {
    return this.CueContainer.get(e);
  }
  GetBuffByHandleId(e) {
    var a;
    let t = this.GetEntityHandle()
      ?.Entity?.GetComponent(172)
      ?.GetBuffByHandle(e);
    return (
      t ||
        ((a = this.GetEntityHandle()?.Entity?.GetComponent(188)),
        (t = a?.GetFormationBuffComp()?.GetBuffByHandle(e))),
      t
    );
  }
  xJs(e) {
    var a = Protocol_1.Aki.Protocol.he_.create();
    (a.TJs = MathUtils_1.MathUtils.NumberToLong(e)),
      CombatMessage_1.CombatNet.Send(19657, this.GetEntityHandle().Entity, a);
  }
  static GameplayCueNotify(e, a) {
    (e = e?.GetComponent(21)), (a = MathUtils_1.MathUtils.LongToNumber(a.TJs));
    e?.AddCue(a, { Instant: !0 });
  }
  CreateGameplayCueInner(e, a = {}) {
    var t,
      r,
      u,
      l = GameplayCueController_1.GameplayCueController.GetConfigById(e);
    if (l)
      return (
        (t = a.Buff),
        (u = getGameplayCueClass(l, (r = a.Instant ?? !1)))
          ? ((u = u.Spawn({
              CueConfig: l,
              EntityHandle: this.GetEntityHandle(),
              CueComp: this,
              Buff: t,
              Instant: r,
              BeginCallback: a.BeginCallback,
              EndCallback: a.EndCallback,
              Instigator: t?.GetInstigator()
                ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
                    t.GetInstigator(),
                  )
                : a.Instigator,
            })),
            a.Sync && this.xJs(e),
            u)
          : void 0
      );
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("EJs", !0)],
  BaseGameplayCueComponent,
  "GameplayCueNotify",
  null,
),
  (BaseGameplayCueComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(222)],
    BaseGameplayCueComponent,
  )),
  (exports.BaseGameplayCueComponent = BaseGameplayCueComponent);
//# sourceMappingURL=BaseGameplayCueComponent.js.map
