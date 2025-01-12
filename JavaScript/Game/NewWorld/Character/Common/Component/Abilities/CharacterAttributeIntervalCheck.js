"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeIntervalCheck = void 0);
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
class AttributeIntervalCheck {
  constructor(t, s, e, i) {
    (this.MaxAttributeId = void 0),
      (this.LowerBound = -1),
      (this.UpperBound = -1),
      (this.IsPerTenThousand = !1),
      (this.ListenAttributeId = t),
      (this.LowerBound = s),
      (this.UpperBound = e),
      (this.IsPerTenThousand = i),
      this.IsPerTenThousand &&
        (this.MaxAttributeId =
          CharacterAttributeTypes_1.attributeIdsWithMax.get(
            this.ListenAttributeId,
          ));
  }
  CheckListenActiveness(t, s) {
    return this.IsPerTenThousand
      ? (s =
          (t / s.GetCurrentValue(this.MaxAttributeId)) *
          CharacterAttributeTypes_1.PER_TEN_THOUSAND) <= this.UpperBound &&
          s > this.LowerBound
      : t <= this.UpperBound && t > this.LowerBound;
  }
  CheckActiveness(t) {
    var s;
    return (
      !!t &&
      ((s = t.GetCurrentValue(this.ListenAttributeId)),
      this.IsPerTenThousand
        ? (t =
            (s / t.GetCurrentValue(this.MaxAttributeId)) *
            CharacterAttributeTypes_1.PER_TEN_THOUSAND) <= this.UpperBound &&
          t > this.LowerBound
        : s <= this.UpperBound && s > this.LowerBound)
    );
  }
}
exports.AttributeIntervalCheck = AttributeIntervalCheck;
//# sourceMappingURL=CharacterAttributeIntervalCheck.js.map
