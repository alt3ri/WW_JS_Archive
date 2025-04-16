"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var i,
      s = arguments.length,
      n =
        s < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, o, r);
    else
      for (var u = e.length - 1; 0 <= u; u--)
        (i = e[u]) && (n = (s < 3 ? i(n) : 3 < s ? i(t, o, n) : i(t, o)) || n);
    return 3 < s && n && Object.defineProperty(t, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAudioComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Global_1 = require("../../../../Global"),
  GameAudioController_1 = require("../../../../Module/Audio/GameAudioController"),
  BaseAudioComponent_1 = require("./BaseAudioComponent");
let CharacterAudioComponent = class CharacterAudioComponent extends BaseAudioComponent_1.BaseAudioComponent {
  constructor() {
    super(...arguments), (this.SummonerId = 0), (this.ActorComp = void 0);
  }
  OnInit() {
    return (
      super.OnInit(), (this.ActorComp = this.Entity.CheckGetComponent(3)), !0
    );
  }
  OnEnd() {
    return (
      super.OnEnd(),
      0 !== this.SummonerId &&
        GameAudioController_1.GameAudioController.RemoveRolePrioritySummon(
          this.SummonerId,
          this.Entity.Id,
        ),
      !0
    );
  }
  OnStart() {
    return (
      super.OnStart(),
      !(!this.ActorComp?.Valid || !this.ActorComp.Owner || (this.Rvl(), 0))
    );
  }
  Rvl() {
    var e;
    this.ActorComp?.Owner &&
      ((e = Global_1.Global.BaseCharacter?.EntityId ?? 0),
      this.ActorComp.IsMyRoleAndCtrlByMe()
        ? this.Entity.Id === e
          ? GameAudioController_1.GameAudioController.SetRolePriority(
              0,
              this.ActorComp.Owner,
            )
          : GameAudioController_1.GameAudioController.SetRolePriority(
              1,
              this.ActorComp.Owner,
            )
        : this.ActorComp.IsMySummonsAndCtrlByMe()
          ? ((this.SummonerId = this.ActorComp.GetSummonerId()),
            this.SummonerId === e
              ? GameAudioController_1.GameAudioController.SetRolePriority(
                  0,
                  this.ActorComp.Owner,
                )
              : GameAudioController_1.GameAudioController.SetRolePriority(
                  1,
                  this.ActorComp.Owner,
                ),
            GameAudioController_1.GameAudioController.AddRolePrioritySummon(
              this.SummonerId,
              this.Entity.Id,
              this.ActorComp.Owner,
            ))
          : GameAudioController_1.GameAudioController.SetRolePriority(
              2,
              this.ActorComp.Owner,
            ));
  }
};
(CharacterAudioComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(50)],
  CharacterAudioComponent,
)),
  (exports.CharacterAudioComponent = CharacterAudioComponent);
//# sourceMappingURL=CharacterAudioComponent.js.map
