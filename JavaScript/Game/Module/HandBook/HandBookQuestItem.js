"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestItem = void 0);
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const HandBookDefine_1 = require("./HandBookDefine");
const HandBookQuestChildItem_1 = require("./HandBookQuestChildItem");
class HandBookQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Vzt = void 0),
      (this.GAn = []),
      (this.gZt = []),
      (this.Wzt = () => {
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
    this.Vzt = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(1),
      this.Wzt,
    );
  }
  Refresh(e, t, i) {
    const o = e;
    var e = o.Id;
    var e =
      ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
        e,
      );
    const r =
      ((this.GAn = ConfigCommon_1.ConfigCommon.ToList(e)),
      this.GAn.sort((e, t) => e.Id - t.Id),
      this.GetText(0).ShowTextNew(o.TypeDescription),
      (this.gZt = []),
      this.GAn.length);
    for (let e = 0; e < r; e++) {
      const s = this.GAn[e];
      const n = new HandBookDefine_1.HandBookCommonItemData();
      let a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
        o.Type,
        s.Id,
      );
      const h = void 0 === a;
      h ||
        ((a = void 0 !== a && !a.IsRead),
        (n.ConfigId = s.Id),
        (n.Config = s),
        (n.IsLock = h),
        (n.IsNew = a),
        this.gZt.push(n));
    }
    this.Vzt?.SetActive(this.gZt.length > 0), this.Vzt?.RefreshByData(this.gZt);
  }
  GetChildItemList() {
    return this.Vzt.GetLayoutItemList();
  }
  OnBeforeDestroy() {
    this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
      (this.GAn = []),
      (this.gZt = []);
  }
}
exports.HandBookQuestItem = HandBookQuestItem;
// # sourceMappingURL=HandBookQuestItem.js.map
