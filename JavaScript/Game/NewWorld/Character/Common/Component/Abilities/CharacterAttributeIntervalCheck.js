"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeIntervalCheck = void 0);
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  Macro_1 = require("../../../../../../Core/Preprocessor/Macro"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
class AttributeIntervalCheck {
  constructor(t, e, s, r) {
    (this.MaxAttributeId = void 0),
      (this.LowerBound = -1),
      (this.UpperBound = -1),
      (this.IsPerTenThousand = !1),
      (this.ListenAttributeId = t),
      (this.LowerBound = e),
      (this.UpperBound = s),
      (this.IsPerTenThousand = r),
      this.IsPerTenThousand &&
        (this.MaxAttributeId =
          CharacterAttributeTypes_1.attributeIdsWithMax.get(
            this.ListenAttributeId,
          ));
  }
  CheckListenActiveness(t, e) {
    return this.IsPerTenThousand
      ? (e =
          (t / e.GetCurrentValue(this.MaxAttributeId)) *
          CharacterAttributeTypes_1.PER_TEN_THOUSAND) <= this.UpperBound &&
          e > this.LowerBound
      : t <= this.UpperBound && t > this.LowerBound;
  }
  CheckActiveness(t) {
    var e;
    return (
      !!t &&
      ((e = t.GetCurrentValue(this.ListenAttributeId)),
      this.IsPerTenThousand
        ? (t =
            (e / t.GetCurrentValue(this.MaxAttributeId)) *
            CharacterAttributeTypes_1.PER_TEN_THOUSAND) <= this.UpperBound &&
          t > this.LowerBound
        : e <= this.UpperBound && e > this.LowerBound)
    );
  }
}
exports.AttributeIntervalCheck = AttributeIntervalCheck;
//# sourceMappingURL=CharacterAttributeIntervalCheck.js.map
