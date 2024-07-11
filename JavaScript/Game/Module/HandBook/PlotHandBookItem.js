"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotHandBookItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  HandBookDefine_1 = require("./HandBookDefine"),
  PlotHandBookChildItem_1 = require("./PlotHandBookChildItem");
class PlotHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = void 0) {
    super(),
      (this.Vzt = void 0),
      (this.CZt = []),
      (this.gZt = []),
      (this.Wzt = (e, t, i) => {
        t = new PlotHandBookChildItem_1.PlotHandBookChildItem(t);
        return t.Refresh(e, !1, i), { Key: i, Value: t };
      }),
      e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
    ];
  }
  Refresh(e, t, i) {
    var r = e.Id,
      r =
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
          r,
        ),
      o =
        ((this.CZt = r),
        this.GetText(0).ShowTextNew(e.TypeDescription),
        (this.gZt = []),
        this.CZt.length);
    for (let e = 0; e < o; e++) {
      var s = this.CZt[e],
        n = new HandBookDefine_1.HandBookCommonItemData(),
        a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, s.Id),
        h = void 0 === a,
        a = void 0 !== a && !a.IsRead;
      (n.Config = s), (n.IsLock = h), (n.IsNew = a), this.gZt.push(n);
    }
    (this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetGridLayout(1),
      this.Wzt,
    )),
      this.Vzt.RebuildLayoutByDataNew(this.gZt);
  }
  GetChildItemList() {
    return this.Vzt ? this.Vzt.GetLayoutItemList() : [];
  }
  OnBeforeDestroy() {
    this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
      (this.CZt = []),
      (this.gZt = []);
  }
}
exports.PlotHandBookItem = PlotHandBookItem;
//# sourceMappingURL=PlotHandBookItem.js.map
