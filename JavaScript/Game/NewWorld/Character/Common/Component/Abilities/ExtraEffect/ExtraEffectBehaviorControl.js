"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraEffectBehaviorControl = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectBehaviorControl extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.rQo = 0), (this.dce = !1);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.rQo = Number(t[0] ?? 0);
  }
  OnCreated() {
    this.TryExecute({}, this.OwnerBuffComponent) ||
      ((this.dce = !1),
      this.OwnerBuffComponent.RemoveBuffByHandle(
        this.ActiveHandleId,
        -1,
        "怪物类型不满足条件，移除自身",
      ));
  }
  OnRemoved() {
    this.dce && (this.nQo(!1), this.rQo === 1) && this.sQo(!1);
  }
  OnExecute() {
    this.dce = !0;
    const t = `被嘲讽buff ${this.BuffId}覆盖`;
    for (const e of this.OwnerEffectManager.FilterById(10))
      e !== this &&
        this.OwnerBuffComponent.RemoveBuffByHandle(e.ActiveHandleId, -1, t);
    this.nQo(!0), this.rQo === 1 && this.sQo(!0);
  }
  nQo(t) {
    EventSystem_1.EventSystem.EmitWithTarget(
      this.OwnerEntity,
      EventDefine_1.EEventName.AiTauntAddOrRemove,
      t,
      this.InstigatorEntityId,
      this.ActiveHandleId,
    );
  }
  sQo(t) {
    t
      ? BlackboardController_1.BlackboardController.SetEntityIdByEntity(
          this.OwnerEntity.Id,
          "TemptTarget",
          this.InstigatorEntityId,
        )
      : BlackboardController_1.BlackboardController.HasValueByEntity(
          this.OwnerEntity.Id,
          "TemptTarget",
        ) &&
        BlackboardController_1.BlackboardController.RemoveValueByEntity(
          this.OwnerEntity.Id,
          "TemptTarget",
        );
  }
}
exports.ExtraEffectBehaviorControl = ExtraEffectBehaviorControl;
// # sourceMappingURL=ExtraEffectBehaviorControl.js.map
