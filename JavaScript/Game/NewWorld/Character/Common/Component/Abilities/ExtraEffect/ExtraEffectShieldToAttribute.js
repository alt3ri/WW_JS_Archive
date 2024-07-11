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
      (this.UXo = void 0),
      (this.AXo = 0),
      (this.ine =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.PXo = 0),
      (this.xXo = 0),
      (this.wXo = 0),
      (this.BXo = 0),
      (this.bXo = 0),
      (this.OQo = void 0),
      (this.u$e = (t) => {
        this.qXo(), this.GXo();
      });
  }
  InitParameters(t) {
    var i = t.ExtraEffectParameters;
    (this.UXo = Number(i[0])),
      (this.AXo = Number(i[1])),
      (this.ine = Number(i[2])),
      (this.PXo = Number(i[3])),
      (this.xXo = Number(i[4])),
      (this.wXo = Number(i[5])),
      (this.BXo = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters1,
        this.Level,
        0,
      )),
      (this.bXo = AbilityUtils_1.AbilityUtils.GetLevelValue(
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
      this.u$e,
    ),
      this.GXo();
  }
  GXo() {
    var e = this.UXo ? this.InstigatorEntity?.Entity : this.OwnerEntity;
    if (e) {
      var s,
        e = e.CheckGetComponent(66),
        h = this.OwnerEntity?.CheckGetComponent(158),
        e = e?.GetShieldValue(this.AXo) ?? 0;
      let t = e >= this.xXo,
        i = e;
      0 < this.wXo && (i = Math.min(i, this.wXo));
      e =
        (i =
          0 < this.PXo &&
          ((s = h?.GetCurrentValue(this.PXo) ?? 0),
          (t =
            e >= s * this.xXo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
          0 < this.wXo)
            ? Math.min(
                e,
                s * this.wXo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
              )
            : i) *
          this.bXo *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
        this.BXo;
      t &&
        0 !== e &&
        (this.OQo = h?.AddModifier(this.ine ?? 0, { Type: 0, Value1: e }));
    }
  }
  qXo() {
    this.OQo &&
      (this.UXo ? this.InstigatorEntity?.Entity : this.OwnerEntity) &&
      (this.OwnerEntity?.CheckGetComponent(158)?.RemoveModifier(
        this.ine ?? 0,
        this.OQo,
      ),
      (this.OQo = void 0));
  }
  OnRemoved() {
    this.OwnerEntity &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.OwnerEntity,
        EventDefine_1.EEventName.CharShieldChange,
        this.u$e,
      ),
      this.qXo();
  }
}
exports.ConvertShieldAttribute = ConvertShieldAttribute;
//# sourceMappingURL=ExtraEffectShieldToAttribute.js.map
