"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    let r;
    const s = arguments.length;
    let i =
      s < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, o)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(e, t, o, n);
    else
      for (let C = e.length - 1; C >= 0; C--)
        (r = e[C]) && (i = (s < 3 ? r(i) : s > 3 ? r(t, o, i) : r(t, o)) || i);
    return s > 3 && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterFrozenComponent = void 0);
const GameplayCueById_1 = require("../../../../../../Core/Define/ConfigQuery/GameplayCueById");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const BaseFrozenComponent_1 = require("../../../Common/Component/Abilities/BaseFrozenComponent");
const frozenCueId = 1003n;
const cancelFrozenCueId = 100302n;
let MonsterFrozenComponent = class MonsterFrozenComponent extends BaseFrozenComponent_1.BaseFrozenComponent {
  constructor() {
    super(...arguments),
      (this.FrozenHandle = void 0),
      (this.FrozenCueHandle = void 0),
      (this.IsFrozenInternal = !1);
  }
  IsFrozen() {
    return this.IsFrozenInternal;
  }
  SetFrozen(e) {
    let t, o, n;
    this.IsFrozenInternal !== e &&
      ((this.IsFrozenInternal = e),
      (t = this.Entity.GetComponent(107)),
      (o = this.Entity.GetComponent(19)),
      (n = this.Entity.GetComponent(185)?.TagContainer),
      e
        ? ((this.FrozenHandle =
            this.FrozenHandle ?? t?.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 6)),
          (this.FrozenCueHandle =
            this.FrozenCueHandle ??
            o?.CreateGameplayCue(
              GameplayCueById_1.configGameplayCueById.GetConfig(frozenCueId),
            )),
          n && (n.AddExactTag(6, -752177221), n.AddExactTag(6, 1447214865)))
        : (void 0 !== this.FrozenHandle &&
            (t?.RemoveTimeScale(this.FrozenHandle),
            (this.FrozenHandle = void 0)),
          this.FrozenCueHandle?.Destroy(),
          (this.FrozenCueHandle = o?.CreateGameplayCue(
            GameplayCueById_1.configGameplayCueById.GetConfig(
              cancelFrozenCueId,
            ),
            {
              EndCallback: () => {
                this.FrozenCueHandle?.Destroy(),
                  (this.FrozenCueHandle = void 0);
              },
            },
          )),
          n && (n.RemoveTag(6, -752177221), n.RemoveTag(6, 1447214865))));
  }
};
(MonsterFrozenComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(166)],
  MonsterFrozenComponent,
)),
  (exports.MonsterFrozenComponent = MonsterFrozenComponent);
// # sourceMappingURL=MonsterFrozenComponent.js.map
