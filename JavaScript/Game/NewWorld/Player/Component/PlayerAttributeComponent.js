"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    let n;
    const a = arguments.length;
    let i =
      a < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, r)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(e, t, r, o);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (n = e[s]) && (i = (a < 3 ? n(i) : a > 3 ? n(t, r, i) : n(t, r)) || i);
    return a > 3 && i && Object.defineProperty(t, r, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerAttributeComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BaseAttributeComponent_1 = require("../../Character/Common/Component/Abilities/BaseAttributeComponent");
let PlayerAttributeComponent = class PlayerAttributeComponent extends BaseAttributeComponent_1.BaseAttributeComponent {
  constructor() {
    super(...arguments), (this.PlayerId = 0);
  }
  OnCreate(e) {
    return (this.PlayerId = e?.PlayerId ?? 0), !0;
  }
  UpdateCurrentValue(e) {
    super.UpdateCurrentValue(e);
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
      this.PlayerId,
    ))
      ModelManager_1.ModelManager.CreatureModel.GetEntity(t.GetCreatureDataId())
        ?.Entity?.GetComponent(155)
        ?.UpdateCurrentValue(e);
  }
};
(PlayerAttributeComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(179)],
  PlayerAttributeComponent,
)),
  (exports.PlayerAttributeComponent = PlayerAttributeComponent);
// # sourceMappingURL=PlayerAttributeComponent.js.map
