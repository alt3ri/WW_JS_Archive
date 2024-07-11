"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponVisibleTagHelper = void 0);
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
class WeaponVisibleTagHelper {
  constructor() {
    (this.cer = 0),
      (this.mer = (i, s) => {
        var t = this.cer;
        s ? this.cer++ : this.cer--,
          0 === t && 0 < this.cer
            ? this.der(!0, this.Owner)
            : 0 < t && 0 === this.cer && this.der(!1, this.Owner);
      }),
      (this.Tags = []),
      (this.TagComp = void 0),
      (this.Cer = new Array()),
      (this.der = void 0),
      (this.Owner = void 0);
  }
  Init(i, s, t, h) {
    if (t) {
      this.Clear(),
        (this.cer = 0),
        (this.TagComp = s),
        (this.der = h),
        (this.Owner = i);
      for (const e of t) {
        var o;
        "" !== e &&
          ((o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
          this.Tags.push(o));
      }
      for (const a of this.Tags)
        s.HasTag(a) && this.cer++,
          this.Cer.push(s.ListenForTagAddOrRemove(a, this.mer));
      0 < this.cer && this.der(!0, this.Owner);
    }
  }
  Clear() {
    (this.Owner = void 0), (this.TagComp = void 0), (this.der = void 0);
    for (const i of this.Cer) i.EndTask();
    (this.Cer.length = 0), (this.Tags.length = 0);
  }
}
exports.WeaponVisibleTagHelper = WeaponVisibleTagHelper;
//# sourceMappingURL=WeaponVisibleTagHelper.js.map
