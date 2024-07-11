"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeographyHandBookItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  GeographyHandBookChildItem_1 = require("./GeographyHandBookChildItem"),
  HandBookDefine_1 = require("./HandBookDefine"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class GeographyHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = void 0) {
    super(),
      (this.Vzt = void 0),
      (this.CZt = []),
      (this.gZt = []),
      (this.fZt = []),
      (this.Wzt = (e, i, t) => {
        i = new GeographyHandBookChildItem_1.GeographyHandBookChildItem(i);
        return i.Refresh(e, !1, t), this.fZt.push(i), { Key: t, Value: i };
      }),
      e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
    ];
  }
  Refresh(e, i, t) {
    var o = e.Id,
      o =
        ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfigByType(
          o,
        ),
      r =
        ((this.CZt = ConfigCommon_1.ConfigCommon.ToList(o)),
        this.CZt.sort((e, i) => e.Id - i.Id),
        this.GetText(0).ShowTextNew(e.TypeDescription),
        (this.gZt = []),
        this.CZt.length);
    for (let e = 0; e < r; e++) {
      var s = this.CZt[e],
        n = new HandBookDefine_1.HandBookCommonItemData(),
        a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, s.Id),
        h = void 0 === a,
        a = void 0 !== a && !a.IsRead;
      (n.Config = s), (n.IsLock = h), (n.IsNew = a), this.gZt.push(n);
    }
    (this.fZt = []),
      (this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetGridLayout(1),
        this.Wzt,
      )),
      this.Vzt.RebuildLayoutByDataNew(this.gZt);
  }
  GetChildItemList() {
    return this.fZt;
  }
  OnBeforeDestroy() {
    this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
      (this.CZt = []),
      (this.gZt = []),
      (this.fZt = []);
  }
}
exports.GeographyHandBookItem = GeographyHandBookItem;
//# sourceMappingURL=GeographyHandBookItem.js.map
