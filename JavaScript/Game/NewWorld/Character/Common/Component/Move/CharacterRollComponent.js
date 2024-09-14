"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    var s,
      o = arguments.length,
      r =
        o < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, n, i);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(t, n, r) : s(t, n)) || r);
    return 3 < o && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterRollComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  CustomMovementDefine_1 = require("./CustomMovementDefine");
let CharacterRollComponent = class CharacterRollComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Gce = void 0),
      (this.Mxa = (0, puerts_1.$ref)(void 0)),
      (this.Sxa = 1200),
      (this.Exa = 0.1),
      (this.yxa = 1e3),
      (this.Ixa = 1960),
      (this.Txa = 100),
      (this.nun = 4e3),
      (this.Lxa = (e) => {
        UE.KuroMovementBPLibrary.KuroRoll(
          e,
          this.Gce.CharacterMovement,
          this.Sxa,
          this.Exa,
          this.yxa,
          this.Mxa,
          this.Ixa,
          this.Txa,
          this.nun,
        );
      });
  }
  static get Dependencies() {
    return [164];
  }
  OnInit(e) {
    return !0;
  }
  OnStart() {
    return (
      (this.Gce = this.Entity.GetComponent(164)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveRoll,
        this.Lxa,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveRoll,
        this.Lxa,
      ),
      !0
    );
  }
  EnterRoll(e, t, n, i, s, o) {
    (this.Sxa = e),
      (this.Exa = t),
      (this.yxa = n),
      (this.Ixa = i),
      (this.Txa = s),
      (this.nun = o),
      this.Gce?.CharacterMovement?.SetMovementMode(
        6,
        CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL,
      );
  }
  LeaveRoll() {
    this.Gce?.CharacterMovement?.SetMovementMode(3);
  }
};
(CharacterRollComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(33)],
  CharacterRollComponent,
)),
  (exports.CharacterRollComponent = CharacterRollComponent);
//# sourceMappingURL=CharacterRollComponent.js.map
