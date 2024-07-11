"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DigitalScreenModel = void 0);
const DigitalScreenById_1 = require("../../../Core/Define/ConfigQuery/DigitalScreenById"),
  DigitalScreenTextById_1 = require("../../../Core/Define/ConfigQuery/DigitalScreenTextById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase");
class DigitalScreenModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ExistTime = 0),
      (this.BackgroundPicture = ""),
      (this.TextFactor = 0),
      (this.StartTimes = []),
      (this.$da = []),
      (this.DelayTimes = []),
      (this.DuringTimes = []),
      (this.TextLength = []),
      (this.Font = []),
      (this.ContentPos = []),
      (this.During = 0),
      (this.Text = "");
  }
  InitDigitalScreen(i) {
    (this.StartTimes = []),
      (this.$da = []),
      (this.DelayTimes = []),
      (this.DuringTimes = []),
      (this.TextLength = []),
      (this.Font = []),
      (this.ContentPos = []),
      (this.During = 0),
      (this.Text = "");
    (i = DigitalScreenById_1.configDigitalScreenById.GetConfig(i)),
      (this.ExistTime = i.ExistTime),
      (this.TextFactor = i.TextFactor),
      (this.BackgroundPicture = i.BackgroundPicture),
      (i = i.TextId);
    if (void 0 === i) return !1;
    for (const s of i) {
      var t = DigitalScreenTextById_1.configDigitalScreenTextById.GetConfig(s),
        e =
          (this.StartTimes.push(t.ShowStartFrame),
          this.$da.push(t.ShowEndFrame),
          t.ShowEndFrame - t.ShowStartFrame),
        e =
          ((this.During += 0 <= e ? e : 1),
          this.DuringTimes.push(0 <= e ? e : 1),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TextContentId));
      (this.Text += e),
        this.TextLength.push(e.length),
        this.Font.push(t?.FontSize ?? 12),
        this.ContentPos.push(t?.Alignment ?? 0);
    }
    for (let i = 0; i < this.StartTimes.length - 1; i++)
      this.$da[i] < this.StartTimes[i + 1]
        ? this.DelayTimes.push(this.StartTimes[i + 1] - this.$da[i])
        : this.DelayTimes.push(0);
    return !0;
  }
  GetDataConfig(i) {
    return DigitalScreenById_1.configDigitalScreenById.GetConfig(i);
  }
}
exports.DigitalScreenModel = DigitalScreenModel;
//# sourceMappingURL=DigitalScreenModel.js.map
