"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelUpModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class LevelUpModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.CanBreakTipsShowFlag = !0), (this.GNn = void 0);
  }
  SetExpChange(e, r, t, i, s) {
    this.ovi({ AddExp: !0, PreLevel: e, PreExp: t, CurLevel: e, CurExp: r });
  }
  SetLevelUp(e, r, t, i, s, a, h, l) {
    this.ovi({ AddExp: 0 < l, PreLevel: e, PreExp: i, CurLevel: r, CurExp: t });
  }
  SetShowLevelOnly(e) {
    var r = ModelManager_1.ModelManager.FunctionModel.GetPlayerExp() ?? 0;
    this.ovi({ AddExp: !1, PreLevel: e, PreExp: r, CurLevel: e, CurExp: r });
  }
  ONn(e) {
    this.GNn &&
      (e.AddExp && (this.GNn.AddExp = e.AddExp),
      e.PreExp <= this.GNn.PreExp && (this.GNn.PreExp = e.PreExp),
      e.PreLevel <= this.GNn.PreLevel && (this.GNn.PreLevel = e.PreLevel),
      e.CurExp >= this.GNn.CurExp && (this.GNn.CurExp = e.CurExp),
      e.CurLevel >= this.GNn.CurLevel) &&
      (this.GNn.CurLevel = e.CurLevel);
  }
  ovi(e) {
    UiManager_1.UiManager.IsViewOpen("LevelUpView") && this.GNn
      ? this.ONn(e)
      : ((this.GNn = e),
        UiManager_1.UiManager.OpenView("LevelUpView", this.GNn));
  }
  GetCacheData() {
    return this.GNn;
  }
  ClearCacheData() {
    this.GNn = void 0;
  }
}
exports.LevelUpModel = LevelUpModel;
//# sourceMappingURL=LevelUpModel.js.map
