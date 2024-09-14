"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    var a,
      o = arguments.length,
      s =
        o < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, n))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, n, r);
    else
      for (var p = e.length - 1; 0 <= p; p--)
        (a = e[p]) && (s = (o < 3 ? a(s) : 3 < o ? a(t, n, s) : a(t, n)) || s);
    return 3 < o && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerGameplayCueComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BaseGameplayCueComponent_1 = require("../../Character/Common/Component/Abilities/BaseGameplayCueComponent"),
  playerGameplayCueType = [0, 4, 2, 14, 5, 9];
let PlayerGameplayCueComponent = class PlayerGameplayCueComponent extends BaseGameplayCueComponent_1.BaseGameplayCueComponent {
  constructor() {
    super(...arguments),
      (this.xie = (e, t) => {
        for (const n of this.GetAllCurrentCueRef())
          n.EntityHandle !== e && n.OnChangeRole(e);
      });
  }
  OnStart() {
    return (
      super.OnStart(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      super.OnEnd(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      !0
    );
  }
  CreatePlayerGameplayCue(e, t = {}) {
    var n = this.CreateGameplayCueInner(e, t);
    n && !t.Instant && this.AddToOtherCueMap(t.Buff.Handle, e, n);
  }
  DestroyPlayerGameplayCue(e, t) {
    this.RemoveFromOtherCueMap(e, t);
  }
  GetEntityHandle() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e)
        ?.GetCurrentGroup()
        ?.GetCurrentRole()?.CreatureDataId;
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(e ?? 0);
  }
  static IsSupportedCueType(e) {
    return playerGameplayCueType.includes(e);
  }
};
(PlayerGameplayCueComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(208)],
  PlayerGameplayCueComponent,
)),
  (exports.PlayerGameplayCueComponent = PlayerGameplayCueComponent);
//# sourceMappingURL=PlayerGameplayCueComponent.js.map
