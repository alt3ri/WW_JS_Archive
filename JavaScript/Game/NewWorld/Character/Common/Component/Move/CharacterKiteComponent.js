"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var r,
      o = arguments.length,
      s =
        o < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, n);
    else
      for (var _ = e.length - 1; 0 <= _; _--)
        (r = e[_]) && (s = (o < 3 ? r(s) : 3 < o ? r(t, i, s) : r(t, i)) || s);
    return 3 < o && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterKiteComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./CustomMovementDefine"),
  KITE_MIN_ACCEL_DIST = 300,
  KITE_MAX_ACCEL_DIST = 900,
  KITE_MIN_ACCEL = 1200,
  KITE_MAX_ACCEL = 18e3,
  KITE_FRICTION = 0.98,
  KITE_FACING_LERP_SPEED = 240,
  KITE_FACING_LERP_RATE = 0.9;
let CharacterKiteComponent = class CharacterKiteComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Gce = void 0),
      (this.M1l = Vector_1.Vector.Create()),
      (this.Die = void 0),
      (this.Nul = 0),
      (this.Cgl = 0),
      (this.S1l = (0, puerts_1.$ref)(void 0)),
      (this.OnMoveStateChanged = (e, t) => {
        e === CharacterUnifiedStateTypes_1.ECharMoveState.Kite &&
          (this.Die = void 0);
      });
  }
  static get Dependencies() {
    return [176];
  }
  KiteMove(e) {
    var t, i;
    this.Die?.Valid && this.Nul === this.Die.SplineMoveEndCount
      ? ((t = UE.KismetMathLibrary.WD_WorldToLocal(
          GlobalData_1.GlobalData.World,
          this.M1l.ToUeVector(),
        )),
        (i = UE.KismetMathLibrary.WD_WorldToLocal(
          GlobalData_1.GlobalData.World,
          this.Die.HookLocation.ToUeVector(),
        )),
        UE.KuroMovementBPLibrary.KuroKite(
          e,
          this.Gce.CharacterMovement,
          t,
          i,
          KITE_MIN_ACCEL_DIST,
          KITE_MAX_ACCEL_DIST,
          KITE_MIN_ACCEL,
          KITE_MAX_ACCEL,
          KITE_FRICTION,
          this.S1l,
          KITE_FACING_LERP_SPEED,
          KITE_FACING_LERP_RATE,
        ),
        this.M1l.DeepCopy(this.Die.HookLocation))
      : (this.Cgl !== this.Die?.SplineMoveBrokenCount &&
          this.Entity.GetComponent(97)?.SetIsHookEndByInterrupt(!0),
        this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[CharacterKiteComponent.KiteMove]",
        }));
  }
  OnInit(e) {
    return !0;
  }
  OnStart() {
    return (
      (this.Gce = this.Entity.GetComponent(176)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.OnMoveStateChanged,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.OnMoveStateChanged,
      ),
      !0
    );
  }
  EnterKite(e) {
    return !(
      !e ||
      !this.Gce?.CharacterMovement ||
      ((this.Die = e),
      (this.Nul = e.SplineMoveEndCount),
      (this.Cgl = e.SplineMoveBrokenCount),
      this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE,
        Context: "[CharacterKiteComponent.EnterKite]",
      }),
      this.M1l.DeepCopy(this.Die.HookLocation),
      0)
    );
  }
};
(CharacterKiteComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(37)],
  CharacterKiteComponent,
)),
  (exports.CharacterKiteComponent = CharacterKiteComponent);
//# sourceMappingURL=CharacterKiteComponent.js.map
