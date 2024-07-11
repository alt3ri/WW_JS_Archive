"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FloatLineFloatTips = void 0);
const UE = require("ue"),
  GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class FloatLineFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments), (this.QYt = void 0), (this.XYt = void 0);
  }
  OnStart() {
    var t;
    super.OnStart(),
      (this.QYt = this.MainText.GetOwner().GetComponentByClass(
        UE.UIEffectTextAnimation.StaticClass(),
      )),
      (this.XYt = this.ExtraText.GetOwner().GetComponentByClass(
        UE.LGUIPlayTweenComponent.StaticClass(),
      )),
      this.QYt?.SetSelectorOffset(1),
      this.XYt &&
        ((t = 0.5 * this.TickDuration),
        (t =
          this.XYt.GetPlayTween().duration > t
            ? t
            : this.XYt.GetPlayTween().duration),
        (this.XYt.GetPlayTween().duration = t),
        this.XYt?.Play());
  }
}
exports.FloatLineFloatTips = FloatLineFloatTips;
//# sourceMappingURL=FloatLineFloatTips.js.map
