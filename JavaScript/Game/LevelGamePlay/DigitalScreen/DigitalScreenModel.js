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
      (this.LogoIcon = ""),
      (this.TextFactor = 0),
      (this.StartTimes = []),
      (this.Lga = []),
      (this.DelayTimes = []),
      (this.DuringTimes = []),
      (this.TextLength = []),
      (this.Font = []),
      (this.ContentPos = []),
      (this.During = 0),
      (this.Text = ""),
      (this.ViewType = 0),
      (this.Size = 0);
  }
  InitDigitalScreen(i) {
    (this.StartTimes = []),
      (this.Lga = []),
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
      (this.LogoIcon = i.LogoIconPath),
      (this.ViewType = i.Prefab),
      (i = i.TextId);
    if (void 0 === i) return !1;
    this.Size = i.length;
    for (const s of i) {
      var t = DigitalScreenTextById_1.configDigitalScreenTextById.GetConfig(s),
        e =
          (this.StartTimes.push(t.ShowStartFrame),
          this.Lga.push(t.ShowEndFrame),
          t.ShowEndFrame - t.ShowStartFrame),
        e =
          ((this.During += 0 <= e ? e : 1),
          this.DuringTimes.push(0 <= e ? e : 1),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TextContentId)),
        e = ((this.Text += e), 0 === e.length ? 1 : e.length),
        e = (this.TextLength.push(e), 0 === t.FontSize ? 12 : t.FontSize);
      this.Font.push(e), this.ContentPos.push(t.Alignment);
    }
    for (let i = 0; i < this.StartTimes.length - 1; i++)
      this.Lga[i] < this.StartTimes[i + 1]
        ? this.DelayTimes.push(this.StartTimes[i + 1] - this.Lga[i])
        : this.DelayTimes.push(0);
    return !0;
  }
  GetDataConfig(i) {
    return DigitalScreenById_1.configDigitalScreenById.GetConfig(i);
  }
}
exports.DigitalScreenModel = DigitalScreenModel;
//# sourceMappingURL=DigitalScreenModel.js.map
