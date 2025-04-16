"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var i,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, n, o);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (i = e[h]) && (r = (s < 3 ? i(r) : 3 < s ? i(t, n, r) : i(t, n)) || r);
    return 3 < s && r && Object.defineProperty(t, n, r), r;
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
      (this.Ixa = (0, puerts_1.$ref)(void 0)),
      (this.Txa = 1200),
      (this.Lxa = 0.1),
      (this.Dxa = 1e3),
      (this.Axa = 1960),
      (this.Rxa = 100),
      (this.nun = 4e3),
      (this.Uxa = (e) => {
        UE.KuroMovementBPLibrary.KuroRoll(
          e,
          this.Gce.CharacterMovement,
          this.Txa,
          this.Lxa,
          this.Dxa,
          this.Ixa,
          this.Axa,
          this.Rxa,
          this.nun,
        );
      });
  }
  static get Dependencies() {
    return [176];
  }
  OnInit(e) {
    return !0;
  }
  OnStart() {
    return (
      (this.Gce = this.Entity.GetComponent(176)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveRoll,
        this.Uxa,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CustomMoveRoll,
        this.Uxa,
      ),
      !0
    );
  }
  EnterRoll(e, t, n, o, i, s) {
    (this.Txa = e),
      (this.Lxa = t),
      (this.Dxa = n),
      (this.Axa = o),
      (this.Rxa = i),
      (this.nun = s),
      this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL,
        Context: "[CharacterRollComponent.EnterRoll]",
      });
  }
  LeaveRoll() {
    this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterRollComponent.LeaveRoll]",
    });
  }
};
(CharacterRollComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(36)],
  CharacterRollComponent,
)),
  (exports.CharacterRollComponent = CharacterRollComponent);
//# sourceMappingURL=CharacterRollComponent.js.map
