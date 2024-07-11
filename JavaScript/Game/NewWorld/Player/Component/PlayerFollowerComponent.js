"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var r,
      l = arguments.length,
      i =
        l < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, o, n);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (r = e[s]) && (i = (l < 3 ? r(i) : 3 < l ? r(t, o, i) : r(t, o)) || i);
    return 3 < l && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerFollowerComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../Module/ScrollingTips/ScrollingTipsController");
let PlayerFollowerComponent = class PlayerFollowerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.j8 = 0),
      (this.Oea = void 0),
      (this.Nea = void 0);
  }
  OnCreate(e) {
    return (this.j8 = e?.PlayerId ?? 0), !0;
  }
  SetFollower(e) {
    var t;
    e.Valid &&
      (t = e.Entity?.GetComponent(202)) &&
      ((this.Oea = e),
      (this.Nea = t),
      this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        e,
      );
  }
  ClearFollower() {
    this.SetFollowerEnable(!1),
      (this.Oea = void 0),
      (this.Nea = void 0),
      this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        );
  }
  SetFollowerEnable(e) {
    e && ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "ExploreTool_BanConnect",
        )
      : this.Nea?.SetEnable(e);
  }
  GetFollower() {
    return this.Oea;
  }
  IsFollowerEnable() {
    return this.Oea?.Entity?.Active ?? !1;
  }
  IsFollowerNeedInput(e, t) {
    return this.Nea?.IsNeedInput(e, t) ?? !1;
  }
};
(PlayerFollowerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(204)],
  PlayerFollowerComponent,
)),
  (exports.PlayerFollowerComponent = PlayerFollowerComponent);
//# sourceMappingURL=PlayerFollowerComponent.js.map
