"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestItem = void 0);
const UE = require("ue"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  HandBookDefine_1 = require("./HandBookDefine"),
  HandBookQuestChildItem_1 = require("./HandBookQuestChildItem");
class HandBookQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.VZt = void 0),
      (this.Vxn = []),
      (this.gei = []),
      (this.WZt = () => {
        return new HandBookQuestChildItem_1.HandBookQuestChildItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
    ];
  }
  OnStart() {
    this.VZt = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(1),
      this.WZt,
    );
  }
  Refresh(e, t, i) {
    var o = e,
      e = o.Id,
      e =
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
          e,
        ),
      r =
        ((this.Vxn = ConfigCommon_1.ConfigCommon.ToList(e)),
        this.Vxn.sort((e, t) => e.Id - t.Id),
        this.GetText(0).ShowTextNew(o.TypeDescription),
        (this.gei = []),
        this.Vxn.length);
    for (let e = 0; e < r; e++) {
      var s = this.Vxn[e],
        n = new HandBookDefine_1.HandBookCommonItemData(),
        a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
          o.Type,
          s.Id,
        ),
        h = void 0 === a;
      h ||
        ((a = void 0 !== a && !a.IsRead),
        (n.ConfigId = s.Id),
        (n.Config = s),
        (n.IsLock = h),
        (n.IsNew = a),
        this.gei.push(n));
    }
    this.VZt?.SetActive(0 < this.gei.length), this.VZt?.RefreshByData(this.gei);
  }
  GetChildItemList() {
    return this.VZt.GetLayoutItemList();
  }
  OnBeforeDestroy() {
    this.VZt && (this.VZt.ClearChildren(), (this.VZt = void 0)),
      (this.Vxn = []),
      (this.gei = []);
  }
}
exports.HandBookQuestItem = HandBookQuestItem;
//# sourceMappingURL=HandBookQuestItem.js.map
