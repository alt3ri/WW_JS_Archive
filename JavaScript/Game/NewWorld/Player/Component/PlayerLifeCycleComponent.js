"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    var n,
      i = arguments.length,
      a =
        i < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, o, r);
    else
      for (var l = t.length - 1; 0 <= l; l--)
        (n = t[l]) && (a = (i < 3 ? n(a) : 3 < i ? n(e, o, a) : n(e, o)) || a);
    return 3 < i && a && Object.defineProperty(e, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerLifeCycleComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  FormationDataController_1 = require("../../../Module/Abilities/FormationDataController"),
  CombatLog_1 = require("../../../Utils/CombatLog");
let PlayerLifeCycleComponent = class PlayerLifeCycleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.PlayerId = 0);
  }
  OnInitData() {
    var t,
      e = this.Entity.CheckGetComponent(0);
    return (
      (this.PlayerId = e?.GetPlayerId() ?? 0),
      this.PlayerId
        ? ((t =
            FormationDataController_1.FormationDataController.GetPlayerEntity(
              this.PlayerId,
            )) &&
            CombatLog_1.CombatLog.Error(
              "Actor",
              this.Entity,
              "PlayerId已经存在",
              ["PlayerId", this.PlayerId],
              ["entityId", this.Entity.Id],
              ["oldEntityId", t.Id],
            ),
          FormationDataController_1.FormationDataController.RegisterPlayerEntity(
            this.PlayerId,
            this.Entity,
          ),
          !0)
        : (CombatLog_1.CombatLog.Error(
            "Actor",
            this.Entity,
            "初始化PlayerEntity时找不到合法的PlayerId",
            ["creatureDataId", e?.GetCreatureDataId()],
            ["PlayerId", this.PlayerId],
            ["entityId", this.Entity.Id],
          ),
          !1)
    );
  }
  OnClear() {
    return (
      FormationDataController_1.FormationDataController.UnRegisterPlayerEntity(
        this.PlayerId,
      ),
      !0
    );
  }
};
(PlayerLifeCycleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(186)],
  PlayerLifeCycleComponent,
)),
  (exports.PlayerLifeCycleComponent = PlayerLifeCycleComponent);
//# sourceMappingURL=PlayerLifeCycleComponent.js.map
