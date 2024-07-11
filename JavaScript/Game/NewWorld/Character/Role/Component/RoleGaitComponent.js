"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, a) {
    var s,
      r = arguments.length,
      h =
        r < 3
          ? e
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(e, i))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, a);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (h = (r < 3 ? s(h) : 3 < r ? s(e, i, h) : s(e, i)) || h);
    return 3 < r && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGaitComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RoleGaitStatic_1 = require("./Define/RoleGaitStatic"),
  RoleForbidMovementHelper_1 = require("./Helper/RoleForbidMovementHelper"),
  RoleStrengthComponent_1 = require("./RoleStrengthComponent"),
  STOP_SPEED = 5;
let RoleGaitComponent = class RoleGaitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Nce = void 0),
      (this.Gce = void 0),
      (this.zJo = void 0),
      (this.mbr = void 0),
      (this.Xte = void 0),
      (this.RoleForbidMovementHelper = void 0),
      (this.RoleGaitUnEnableState = new Map()),
      (this.don = (t) => {
        t
          ? (this.Xte.RemoveTag(388142570),
            this.zJo.RemoveBuffByTag(388142570),
            this.RoleGaitUnEnableState.get(2).add(-63548288),
            this.RoleGaitUnEnableState.get(3).add(-63548288))
          : (this.RoleGaitUnEnableState.get(2).delete(-63548288),
            this.RoleGaitUnEnableState.get(3).delete(-63548288)),
          this.Con();
      }),
      (this.gon = (t) => {
        t
          ? (this.Xte.RemoveTag(388142570),
            this.zJo.RemoveBuffByTag(388142570),
            this.RoleGaitUnEnableState.get(1).add(229513169),
            this.RoleGaitUnEnableState.get(3).add(229513169))
          : (this.RoleGaitUnEnableState.get(1).delete(229513169),
            this.RoleGaitUnEnableState.get(3).delete(229513169)),
          this.Con();
      }),
      (this.fon = (t) => {
        t
          ? this.RoleGaitUnEnableState.get(1).add(930178923)
          : this.RoleGaitUnEnableState.get(1).delete(930178923),
          this.Con();
      }),
      (this.pon = (t) => {
        t
          ? this.RoleGaitUnEnableState.get(3).add(477750727)
          : this.RoleGaitUnEnableState.get(3).delete(477750727),
          this.Con();
      });
  }
  static get Dependencies() {
    return [3, 161];
  }
  OnInitData() {
    return (
      (this.RoleForbidMovementHelper =
        new RoleForbidMovementHelper_1.RoleForbidMovementHelper()),
      !0
    );
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.CheckGetComponent(3)),
      (this.Gce = this.Entity.CheckGetComponent(161)),
      (this.mbr = this.Entity.CheckGetComponent(158)),
      (this.Xte = this.Entity.CheckGetComponent(185)),
      (this.Nce = this.Entity.CheckGetComponent(52)),
      (this.zJo = this.Entity.CheckGetComponent(157)),
      RoleGaitStatic_1.RoleGaitStatic.Init(),
      this.InitRoleForbidMovementHelper(),
      !0
    );
  }
  InitRoleForbidMovementHelper() {
    this.RoleGaitUnEnableState.set(2, new Set()),
      this.RoleGaitUnEnableState.set(1, new Set()),
      this.RoleGaitUnEnableState.set(3, new Set()),
      (this.RoleForbidMovementHelper.TagComp =
        this.Entity.CheckGetComponent(185)),
      this.RoleForbidMovementHelper.CreateTagHandler(-63548288, 1, this.don),
      this.RoleForbidMovementHelper.CreateTagHandler(229513169, 1, this.gon),
      this.RoleForbidMovementHelper.CreateTagHandler(930178923, 0, this.fon),
      this.RoleForbidMovementHelper.RegisterMutuallyTags([
        -63548288, 930178923,
      ]),
      this.RoleForbidMovementHelper.CreateTagHandler(477750727, 0, this.pon),
      this.RoleForbidMovementHelper.Awake();
  }
  OnClear() {
    return this.RoleForbidMovementHelper.Clear(), !0;
  }
  OnTick(t) {
    this.Con();
  }
  Con() {
    var t, e, i, a;
    this.Hte.IsAutonomousProxy &&
      (this.von(),
      (t = this.mbr.MoveState),
      (e = this.mbr.PositionState),
      (i = this.Xte.HasTag(388142570)),
      (a = this.mbr.DirectionState),
      this.Gce.HasMoveInput
        ? this.UpdateMovePressing(i, e, t, a)
        : this.UpdateMoveReleasing(i, e, t, a));
  }
  EnableRoleGaitState(t) {
    return 0 === this.RoleGaitUnEnableState.get(t).size;
  }
  FindEnableGaitState() {
    for (var [t, e] of this.RoleGaitUnEnableState) if (0 === e.size) return t;
  }
  FindEnableCharMoveState() {
    var t = this.FindEnableGaitState();
    if (t)
      switch (t) {
        case 1:
          return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        case 2:
        case 3:
          return CharacterUnifiedStateTypes_1.ECharMoveState.Run;
      }
  }
  UpdateMovePressing(t, e, i, a) {
    switch (e) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        if (t && this.EnableRoleGaitState(3)) {
          var s =
            FormationAttributeController_1.FormationAttributeController.GetValue(
              1,
            );
          if (i !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) {
            if (s >= RoleStrengthComponent_1.STRENGTH_TOLERANCE) {
              this.mbr.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
              );
              break;
            }
          } else if (0 < s) break;
        }
        this.mbr.IsWalkBaseMode
          ? !this.EnableRoleGaitState(1) && this.EnableRoleGaitState(2)
            ? this.mbr.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Run,
              )
            : this.mbr.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
              )
          : !this.EnableRoleGaitState(2) && this.EnableRoleGaitState(1)
            ? this.mbr.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
              )
            : this.mbr.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Run,
              );
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        i !== CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim &&
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim &&
          this.mbr.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim,
          );
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
        i !== CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb &&
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb &&
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb &&
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb &&
          this.mbr.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb,
          );
    }
  }
  UpdateMoveReleasing(t, e, i, a) {
    switch (
      (t &&
        (this.Xte.RemoveTag(388142570), this.zJo.RemoveBuffByTag(388142570)),
      e)
    ) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        if (a !== CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection)
          switch (i) {
            case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
            case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
            case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
              this.SetRunStop();
              break;
            case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
            case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
            case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
              this.Gce.Speed < STOP_SPEED &&
                this.mbr.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
                );
          }
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        this.mbr.SetMoveState(
          CharacterUnifiedStateTypes_1.ECharMoveState.Other,
        );
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
        this.mbr.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb &&
          this.mbr.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb &&
          this.mbr.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.Other,
          );
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
  von() {
    switch (ModelManager_1.ModelManager.PlatformModel.InputController) {
      case 0:
        break;
      case 1:
        this.Mon();
        break;
      case 2:
        this.Son();
    }
  }
  Mon() {
    this.Nce.GetMoveVectorCache().SizeSquared() >
    MathUtils_1.MathUtils.Square(
      RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate(),
    )
      ? this.mbr.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
        this.mbr.WalkPress()
      : this.mbr.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
        this.mbr.WalkPress();
  }
  Son() {
    this.Nce.GetMoveVectorCache().SizeSquared() >
    MathUtils_1.MathUtils.Square(
      RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate(),
    )
      ? this.mbr.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
        this.mbr.WalkPress()
      : this.mbr.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
        this.mbr.WalkPress();
  }
};
(RoleGaitComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(82)],
  RoleGaitComponent,
)),
  (exports.RoleGaitComponent = RoleGaitComponent);
//# sourceMappingURL=RoleGaitComponent.js.map
