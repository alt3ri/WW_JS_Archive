"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var r,
      s = arguments.length,
      i =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, o, n);
    else
      for (var C = e.length - 1; 0 <= C; C--)
        (r = e[C]) && (i = (s < 3 ? r(i) : 3 < s ? r(t, o, i) : r(t, o)) || i);
    return 3 < s && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterFrozenComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  BaseFrozenComponent_1 = require("../../../Common/Component/Abilities/BaseFrozenComponent"),
  GameplayCueController_1 = require("../../../Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController"),
  FROZEN_CUE_ID = 1003,
  CANCEL_FROZEN_CUE_ID = 100302;
let MonsterFrozenComponent = class MonsterFrozenComponent extends BaseFrozenComponent_1.BaseFrozenComponent {
  constructor() {
    super(...arguments),
      (this.FrozenHandle = void 0),
      (this.FrozenCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE),
      (this.IsFrozenInternal = !1);
  }
  IsFrozen() {
    return this.IsFrozenInternal;
  }
  SetFrozen(e) {
    if (this.IsFrozenInternal !== e) {
      this.IsFrozenInternal = e;
      var t = this.Entity.GetComponent(120);
      const n = this.Entity.GetComponent(21);
      var o = this.Entity.GetComponent(203)?.TagContainer;
      e
        ? ((this.FrozenHandle =
            this.FrozenHandle ?? t?.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 6)),
          this.FrozenCueHandle === GameplayCueController_1.INVALID_CUE_HANDLE &&
            (this.FrozenCueHandle = n.AddCue(FROZEN_CUE_ID)),
          o && (o.AddExactTag(6, -752177221), o.AddExactTag(6, 1447214865)))
        : (void 0 !== this.FrozenHandle &&
            (t?.RemoveTimeScale(this.FrozenHandle),
            (this.FrozenHandle = void 0)),
          n.RemoveCueByHandle(this.FrozenCueHandle),
          (this.FrozenCueHandle = n.AddCue(CANCEL_FROZEN_CUE_ID, {
            EndCallback: () => {
              n.RemoveCueByHandle(this.FrozenCueHandle),
                (this.FrozenCueHandle =
                  GameplayCueController_1.INVALID_CUE_HANDLE);
            },
          })),
          o && (o.RemoveTag(6, -752177221), o.RemoveTag(6, 1447214865)));
    }
  }
};
(MonsterFrozenComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(182)],
  MonsterFrozenComponent,
)),
  (exports.MonsterFrozenComponent = MonsterFrozenComponent);
//# sourceMappingURL=MonsterFrozenComponent.js.map
