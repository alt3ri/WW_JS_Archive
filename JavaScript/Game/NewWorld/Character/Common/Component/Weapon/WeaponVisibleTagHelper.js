"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponVisibleTagHelper = void 0);
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
class WeaponVisibleTagHelper {
  constructor() {
    (this.CZo = 0),
      (this.gZo = (i, s) => {
        var t = this.CZo;
        s ? this.CZo++ : this.CZo--,
          0 === t && 0 < this.CZo
            ? this.fZo(!0, this.Owner)
            : 0 < t && 0 === this.CZo && this.fZo(!1, this.Owner);
      }),
      (this.Tags = []),
      (this.TagComp = void 0),
      (this.pZo = new Array()),
      (this.fZo = void 0),
      (this.Owner = void 0);
  }
  Init(i, s, t, h) {
    if (t) {
      this.Clear(),
        (this.CZo = 0),
        (this.TagComp = s),
        (this.fZo = h),
        (this.Owner = i);
      for (const e of t) {
        var o;
        "" !== e &&
          ((o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
          this.Tags.push(o));
      }
      for (const a of this.Tags)
        s.HasTag(a) && this.CZo++,
          this.pZo.push(s.ListenForTagAddOrRemove(a, this.gZo));
      0 < this.CZo && this.fZo(!0, this.Owner);
    }
  }
  Clear() {
    (this.Owner = void 0), (this.TagComp = void 0), (this.fZo = void 0);
    for (const i of this.pZo) i.EndTask();
    (this.pZo.length = 0), (this.Tags.length = 0);
  }
}
exports.WeaponVisibleTagHelper = WeaponVisibleTagHelper;
//# sourceMappingURL=WeaponVisibleTagHelper.js.map
