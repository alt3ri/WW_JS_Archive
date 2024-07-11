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
      (this.VZt = void 0),
      (this.Cei = []),
      (this.gei = []),
      (this.WZt = (e, t, i) => {
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
        ((this.Cei = r),
        this.GetText(0).ShowTextNew(e.TypeDescription),
        (this.gei = []),
        this.Cei.length);
    for (let e = 0; e < o; e++) {
      var s = this.Cei[e],
        n = new HandBookDefine_1.HandBookCommonItemData(),
        a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, s.Id),
        d = void 0 === a,
        a = void 0 !== a && !a.IsRead;
      (n.Config = s), (n.IsLock = d), (n.IsNew = a), this.gei.push(n);
    }
    (this.VZt = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetGridLayout(1),
      this.WZt,
    )),
      this.VZt.RebuildLayoutByDataNew(this.gei);
  }
  GetChildItemList() {
    return this.VZt ? this.VZt.GetLayoutItemList() : [];
  }
  OnBeforeDestroy() {
    (this.Cei = []), (this.gei = []);
  }
}
exports.PlotHandBookItem = PlotHandBookItem;
//# sourceMappingURL=PlotHandBookItem.js.map
