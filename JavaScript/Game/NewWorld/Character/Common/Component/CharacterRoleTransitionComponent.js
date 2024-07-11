"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    var i,
      n = arguments.length,
      s =
        n < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, r, o);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (i = e[l]) && (s = (n < 3 ? i(s) : 3 < n ? i(t, r, s) : i(t, r)) || s);
    return 3 < n && s && Object.defineProperty(t, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterRoleTransitionComponent = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../../Global"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterController_1 = require("../../CharacterController"),
  CHECK_CHANGE_ROLE_TIME = 1e3;
let CharacterRoleTransitionComponent = class CharacterRoleTransitionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.sWr = 800),
      (this.aWr = !1),
      (this.hWr = 0),
      (this.lWr = !1);
  }
  OnStart() {
    return (
      (this.hWr = CHECK_CHANGE_ROLE_TIME),
      (this.Hte = this.Entity.CheckGetComponent(3)),
      !0
    );
  }
  OnTick(e) {
    var t;
    this.lWr &&
      ((this.hWr -= e),
      0 < this.hWr ||
        ((this.hWr = CHECK_CHANGE_ROLE_TIME),
        Global_1.Global.BaseCharacter &&
          ((e =
            Global_1.Global.BaseCharacter.CharacterActorComponent
              .ActorLocation),
          (t = this.Hte.ActorLocation),
          (e = Vector_1.Vector.DistSquared(
            Vector_1.Vector.Create(e),
            Vector_1.Vector.Create(t),
          )),
          (this.aWr = e < this.sWr * this.sWr),
          this.Hte.IsAutonomousProxy
            ? this.aWr ||
              ((t = this._Wr())?.Valid &&
                ((e = t.GetComponent(0)), this.uWr(t.Id, e.GetPlayerId())))
            : this.aWr &&
              ((t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
              this.uWr(this.Entity.Id, t)))));
  }
  _Wr() {
    for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      if (r?.IsInit) {
        var e = r.Entity.GetComponent(0);
        if (e.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
          e =
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              r.Id,
            );
          if (
            e &&
            e.Actor !== Global_1.Global.BaseCharacter &&
            e !== this.Hte
          ) {
            var t = this.Hte.ActorLocation,
              e = e.ActorLocation;
            if (
              UE.KismetMathLibrary.Vector_DistanceSquared(t, e) <
              this.sWr * this.sWr
            )
              return r.Entity;
          }
        }
      }
  }
  uWr(e, t) {
    ControllerHolder_1.ControllerHolder.CreatureController.ChangeEntityRoleRequest(
      e,
      t,
    );
  }
};
(CharacterRoleTransitionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(63)],
  CharacterRoleTransitionComponent,
)),
  (exports.CharacterRoleTransitionComponent = CharacterRoleTransitionComponent);
//# sourceMappingURL=CharacterRoleTransitionComponent.js.map
