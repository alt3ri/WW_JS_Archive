"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeographyHandBookItem = void 0);
const UE = require("ue"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  GeographyHandBookChildItem_1 = require("./GeographyHandBookChildItem"),
  HandBookDefine_1 = require("./HandBookDefine");
class GeographyHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = void 0) {
    super(),
      (this.VZt = void 0),
      (this.Cei = []),
      (this.gei = []),
      (this.fei = []),
      (this.WZt = (e, i, t) => {
        i = new GeographyHandBookChildItem_1.GeographyHandBookChildItem(i);
        return i.Refresh(e, !1, t), this.fei.push(i), { Key: t, Value: i };
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
        ((this.Cei = ConfigCommon_1.ConfigCommon.ToList(o)),
        this.Cei.sort((e, i) => e.Id - i.Id),
        this.GetText(0).ShowTextNew(e.TypeDescription),
        (this.gei = []),
        this.Cei.length);
    for (let e = 0; e < r; e++) {
      var s = this.Cei[e],
        n = new HandBookDefine_1.HandBookCommonItemData(),
        a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, s.Id),
        h = void 0 === a,
        a = void 0 !== a && !a.IsRead;
      (n.Config = s), (n.IsLock = h), (n.IsNew = a), this.gei.push(n);
    }
    (this.fei = []),
      (this.VZt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetGridLayout(1),
        this.WZt,
      )),
      this.VZt.RebuildLayoutByDataNew(this.gei);
  }
  GetChildItemList() {
    return this.fei;
  }
  OnBeforeDestroy() {
    this.VZt && (this.VZt.ClearChildren(), (this.VZt = void 0)),
      (this.Cei = []),
      (this.gei = []),
      (this.fei = []);
  }
}
exports.GeographyHandBookItem = GeographyHandBookItem;
//# sourceMappingURL=GeographyHandBookItem.js.map
