"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConvertShieldAttribute = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
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
    var i = t.ExtraEffectParameters;
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
      var s,
        e = e.CheckGetComponent(64),
        h = this.OwnerEntity?.CheckGetComponent(156),
        e = e?.GetShieldValue(this.wQo) ?? 0;
      let t = e >= this.bQo,
        i = e;
      0 < this.qQo && (i = Math.min(i, this.qQo));
      e =
        (i =
          0 < this.BQo &&
          ((s = h?.GetCurrentValue(this.BQo) ?? 0),
          (t =
            e >= s * this.bQo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
          0 < this.qQo)
            ? Math.min(
                e,
                s * this.qQo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
              )
            : i) *
          this.NQo *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
        this.GQo;
      t &&
        0 !== e &&
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
//# sourceMappingURL=ExtraEffectShieldToAttribute.js.map
