"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, a, t, r) {
    var u,
      l = arguments.length,
      o =
        l < 3
          ? a
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(a, t))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, a, t, r);
    else
      for (var C = e.length - 1; 0 <= C; C--)
        (u = e[C]) && (o = (l < 3 ? u(o) : 3 < l ? u(a, t, o) : u(a, t)) || o);
    return 3 < l && o && Object.defineProperty(a, t, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseGameplayCueComponent = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  GameplayCueController_1 = require("./GameplayCueSFX/Controller/GameplayCueController"),
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
  CreateGameplayCue(e, a = {}) {
    return (
      this.CreateGameplayCueInner(e, a)?.Handle ??
      GameplayCueController_1.INVALID_CUE_HANDLE
    );
  }
  DestroyGameplayCue(e) {
    e = this.GetCueById(e);
    e && e.Destroy();
  }
  DestroyGameplayCueByHandle(e) {
    e = this.CueContainer.get(e);
    e && e.Destroy();
  }
  AddEffectToSet(e) {}
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
  xJs(e) {
    var a = Protocol_1.Aki.Protocol.yJs.create();
    (a.TJs = MathUtils_1.MathUtils.BigIntToLong(e)),
      CombatMessage_1.CombatNet.Call(21675, this.GetEntityHandle().Entity, a);
  }
  static GameplayCueNotify(e, a) {
    (e = e?.GetComponent(19)), (a = MathUtils_1.MathUtils.LongToBigInt(a.TJs));
    e?.CreateGameplayCue(a, { Instant: !0 });
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
  [CombatMessage_1.CombatNet.SyncHandle("EJs")],
  BaseGameplayCueComponent,
  "GameplayCueNotify",
  null,
),
  (BaseGameplayCueComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(207)],
    BaseGameplayCueComponent,
  )),
  (exports.BaseGameplayCueComponent = BaseGameplayCueComponent);
//# sourceMappingURL=BaseGameplayCueComponent.js.map
