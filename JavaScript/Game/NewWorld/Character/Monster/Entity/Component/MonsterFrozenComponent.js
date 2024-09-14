"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    var r,
      s = arguments.length,
      i =
        s < 3
          ? o
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(o, t))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, o, t, n);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (r = e[l]) && (i = (s < 3 ? r(i) : 3 < s ? r(o, t, i) : r(o, t)) || i);
    return 3 < s && i && Object.defineProperty(o, t, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterFrozenComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  BaseFrozenComponent_1 = require("../../../Common/Component/Abilities/BaseFrozenComponent"),
  GameplayCueController_1 = require("../../../Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController"),
  frozenCueId = 1003n,
  cancelFrozenCueId = 100302n;
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
      var o = this.Entity.GetComponent(110);
      const n = this.Entity.GetComponent(19);
      var t = this.Entity.GetComponent(190)?.TagContainer;
      e
        ? ((this.FrozenHandle =
            this.FrozenHandle ?? o?.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 6)),
          this.FrozenCueHandle === GameplayCueController_1.INVALID_CUE_HANDLE &&
            (this.FrozenCueHandle = n.CreateGameplayCue(frozenCueId)),
          t && (t.AddExactTag(6, -752177221), t.AddExactTag(6, 1447214865)))
        : (void 0 !== this.FrozenHandle &&
            (o?.RemoveTimeScale(this.FrozenHandle),
            (this.FrozenHandle = void 0)),
          n.DestroyGameplayCueByHandle(this.FrozenCueHandle),
          (this.FrozenCueHandle = n.CreateGameplayCue(cancelFrozenCueId, {
            EndCallback: () => {
              n.DestroyGameplayCueByHandle(this.FrozenCueHandle),
                (this.FrozenCueHandle =
                  GameplayCueController_1.INVALID_CUE_HANDLE);
            },
          })),
          t && (t.RemoveTag(6, -752177221), t.RemoveTag(6, 1447214865)));
    }
  }
};
(MonsterFrozenComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(169)],
  MonsterFrozenComponent,
)),
  (exports.MonsterFrozenComponent = MonsterFrozenComponent);
//# sourceMappingURL=MonsterFrozenComponent.js.map
