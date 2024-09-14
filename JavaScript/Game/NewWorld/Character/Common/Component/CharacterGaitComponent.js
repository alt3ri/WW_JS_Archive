"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, a) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? t
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(t, i))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, i, a);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (n = (r < 3 ? s(n) : 3 < r ? s(t, i, n) : s(t, i)) || n);
    return 3 < r && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGaitComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  STOP_SPEED = 5;
let CharacterGaitComponent = class CharacterGaitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.HBr = void 0);
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.GetComponent(3)),
      (this.Gce = this.Entity.GetComponent(164)),
      (this.HBr = this.Entity.GetComponent(161)),
      !(!this.Hte || !this.Gce || !this.HBr)
    );
  }
  OnTick(e) {
    var t, i;
    this.Hte.IsAutonomousProxy &&
      ((t = this.HBr.MoveState),
      (i = this.HBr.PositionState),
      this.Gce.HasMoveInput || this.UpdateMoveReleasing(i, t));
  }
  UpdateMoveReleasing(e, t) {
    if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground)
      switch (t) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
          this.Gce.Speed < STOP_SPEED &&
            this.HBr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Other,
            );
          break;
        default:
          this.Gce.Speed > STOP_SPEED && this.SetRunStop();
      }
  }
  SetRunStop() {
    switch (this.HBr.MoveState) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
        this.HBr.SetMoveState(
          CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop,
        );
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Dodge:
      case CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll:
        this.Gce.Speed <
        this.Gce.MovementData.FaceDirection.Standing.SprintSpeed -
          TsBaseRoleConfig_1.tsBaseRoleConfig.MaxRunStopSpeed
          ? this.HBr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.RunStop,
            )
          : this.HBr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop,
            );
    }
  }
};
(CharacterGaitComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(51)],
  CharacterGaitComponent,
)),
  (exports.CharacterGaitComponent = CharacterGaitComponent);
//# sourceMappingURL=CharacterGaitComponent.js.map
