"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, a) {
    let s;
    const r = arguments.length;
    let n =
      r < 3 ? t : a === null ? (a = Object.getOwnPropertyDescriptor(t, i)) : a;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(e, t, i, a);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (s = e[h]) && (n = (r < 3 ? s(n) : r > 3 ? s(t, i, n) : s(t, i)) || n);
    return r > 3 && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGaitComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const STOP_SPEED = 5;
let CharacterGaitComponent = class CharacterGaitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.mbr = void 0);
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.GetComponent(3)),
      (this.Gce = this.Entity.GetComponent(161)),
      (this.mbr = this.Entity.GetComponent(158)),
      !(!this.Hte || !this.Gce || !this.mbr)
    );
  }
  OnTick(e) {
    let t, i;
    this.Hte.IsAutonomousProxy &&
      ((t = this.mbr.MoveState),
      (i = this.mbr.PositionState),
      this.Gce.HasMoveInput || this.UpdateMoveReleasing(i, t));
  }
  UpdateMoveReleasing(e, t) {
    if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground)
      switch (t) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
          this.Gce.Speed < STOP_SPEED &&
            this.mbr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Other,
            );
          break;
        default:
          this.Gce.Speed > STOP_SPEED && this.SetRunStop();
      }
  }
  SetRunStop() {
    switch (this.mbr.MoveState) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
        this.mbr.SetMoveState(
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
          ? this.mbr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.RunStop,
            )
          : this.mbr.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop,
            );
    }
  }
};
(CharacterGaitComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(49)],
  CharacterGaitComponent,
)),
  (exports.CharacterGaitComponent = CharacterGaitComponent);
// # sourceMappingURL=CharacterGaitComponent.js.map
