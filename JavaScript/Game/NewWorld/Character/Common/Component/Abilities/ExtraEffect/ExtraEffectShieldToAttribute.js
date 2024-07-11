"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConvertShieldAttribute = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ConvertShieldAttribute extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.xQo = void 0),
      (this.wQo = 0),
      (this.ine =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.BQo = 0),
      (this.bQo = 0),
      (this.qQo = 0),
      (this.GQo = 0),
      (this.NQo = 0),
      (this.VKo = void 0),
      (this.ZQe = (t) => {
        this.OQo(), this.kQo();
      });
  }
  InitParameters(t) {
    const i = t.ExtraEffectParameters;
    (this.xQo = Number(i[0])),
      (this.wQo = Number(i[1])),
      (this.ine = Number(i[2])),
      (this.BQo = Number(i[3])),
      (this.bQo = Number(i[4])),
      (this.qQo = Number(i[5])),
      (this.GQo = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters1,
        this.Level,
        0,
      )),
      (this.NQo = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters2,
        this.Level,
        0,
      ));
  }
  OnExecute() {}
  OnCreated() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.OwnerEntity,
      EventDefine_1.EEventName.CharShieldChange,
      this.ZQe,
    ),
      this.kQo();
  }
  kQo() {
    var e = this.xQo ? this.InstigatorEntity?.Entity : this.OwnerEntity;
    if (e) {
      let s;
      var e = e.CheckGetComponent(64);
      const h = this.OwnerEntity?.CheckGetComponent(156);
      var e = e?.GetShieldValue(this.wQo) ?? 0;
      let t = e >= this.bQo;
      let i = e;
      this.qQo > 0 && (i = Math.min(i, this.qQo));
      e =
        (i =
          this.BQo > 0 &&
          ((s = h?.GetCurrentValue(this.BQo) ?? 0),
          (t =
            e >= s * this.bQo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
          this.qQo > 0)
            ? Math.min(
                e,
                s * this.qQo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
              )
            : i) *
          this.NQo *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
        this.GQo;
      t &&
        e !== 0 &&
        (this.VKo = h?.AddModifier(this.ine ?? 0, { Type: 0, Value1: e }));
    }
  }
  OQo() {
    this.VKo &&
      (this.xQo ? this.InstigatorEntity?.Entity : this.OwnerEntity) &&
      (this.OwnerEntity?.CheckGetComponent(156)?.RemoveModifier(
        this.ine ?? 0,
        this.VKo,
      ),
      (this.VKo = void 0));
  }
  OnRemoved() {
    this.OwnerEntity &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.OwnerEntity,
        EventDefine_1.EEventName.CharShieldChange,
        this.ZQe,
      ),
      this.OQo();
  }
}
exports.ConvertShieldAttribute = ConvertShieldAttribute;
// # sourceMappingURL=ExtraEffectShieldToAttribute.js.map
