"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var n,
      s = arguments.length,
      i =
        s < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, o, r);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (i = (s < 3 ? n(i) : 3 < s ? n(t, o, i) : n(t, o)) || i);
    return 3 < s && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StackableChessComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let StackableChessComponent = class StackableChessComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.ActorComp = void 0);
  }
  OnStart() {
    return (this.ActorComp = this.Entity.CheckGetComponent(1)), !0;
  }
  GetStackableLocation() {
    return this.ActorComp?.ActorLocationProxy;
  }
  AttachToTarget(e) {
    var t,
      e = e.ActorComp;
    this.ActorComp?.Valid &&
      e?.Valid &&
      (t = this.GetAttachSocketName()) &&
      this.ActorComp.Owner?.K2_AttachToComponent(
        e.SkeletalMesh,
        t,
        1,
        1,
        1,
        !1,
      );
  }
  DetachFromTarget(e) {
    this.ActorComp?.Valid && this.ActorComp.Owner?.K2_DetachFromActor(1, 1, 1);
  }
  Move(e, t, o) {
    this.ActorComp?.SetActorLocationAndRotation(
      e.ToUeVector(),
      t.ToUeRotator(),
      "ChessMove",
      !1,
    ),
      o();
  }
  Teleport(e, t) {
    this.ActorComp?.SetActorLocationAndRotation(
      e.ToUeVector(),
      t.ToUeRotator(),
      "ChessTeleport",
      !1,
    );
  }
  OnPreviousMoveStateChange(e, t) {}
  IsPerformRecursion(e) {
    return !1;
  }
  Perform(e, t, o) {
    o();
  }
  OnPreviousPerformStateChange(e, t, o) {}
  GetLocation() {
    return this.ActorComp?.ActorLocationProxy;
  }
  GetAttachSocketName() {}
};
(StackableChessComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(279)],
  StackableChessComponent,
)),
  (exports.StackableChessComponent = StackableChessComponent);
//# sourceMappingURL=StackableChessComponent.js.map
