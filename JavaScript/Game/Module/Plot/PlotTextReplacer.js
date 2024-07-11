"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTextReplacer = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TA = "{TA}",
  PLAYER_NAME = "{PlayerName}";
class PlotTextReplacer {
  constructor() {
    (this.gU = !1),
      (this.azi = !1),
      (this.B9e = ""),
      (this.hzi = ""),
      (this.lzi = /\{(?:Male=(.*?);Female=(.*?)|TA|PlayerName)\}/g),
      (this.Dde = (e, t, i) =>
        void 0 !== t && void 0 !== i
          ? this.azi
            ? t
            : i
          : e === TA
            ? this.hzi
            : e === PLAYER_NAME
              ? this.B9e
              : e);
  }
  Init() {
    this.gU ||
      ((this.azi =
        1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
      (this.B9e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName()),
      (this.hzi = this.azi
        ? ConfigManager_1.ConfigManager.TextConfig.GetTextById("He")
        : ConfigManager_1.ConfigManager.TextConfig.GetTextById("She")),
      (this.gU = !0));
  }
  Clear() {
    this.gU = !1;
  }
  Replace(e, t = !1) {
    if (void 0 !== e)
      return t && this.Clear(), this.Init(), e.replace(this.lzi, this.Dde);
  }
}
exports.PlotTextReplacer = PlotTextReplacer;
//# sourceMappingURL=PlotTextReplacer.js.map
