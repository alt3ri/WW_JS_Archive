"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomBattleData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CommonComponentDefine_1 = require("../../Common/CommonComponentDefine"),
  PhantomDataBase_1 = require("./Data/PhantomDataBase"),
  PhantomBattleModel_1 = require("./PhantomBattleModel");
class PhantomBattleData extends PhantomDataBase_1.PhantomDataBase {
  constructor() {
    super(...arguments), (this.wTt = 0);
  }
  SetData(e) {
    (this.wTt = e.b9n ?? 0),
      (this.PhantomLevel = e.$ws ?? 0),
      (this.ItemId = e.s5n ?? 0),
      (this.PhantomExp = e.Hws ?? 0),
      (this.PhantomMainProp = e.jws ?? []),
      (this.PhantomSubProp = e.Wws ?? []),
      (this.FetterGroupId = e.Kws ?? 0),
      (this.FuncValue = e.Vws ?? 0),
      this.SetSkinId(e.Z7n ?? 0),
      this.SetIncId(this.wTt);
  }
  GetUniqueId() {
    return this.wTt;
  }
  GetMainPropArray() {
    var e = new Array();
    for (const r of this.GetPhantomMainProp()) {
      var t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
            r.Yws,
          ),
        a = new PhantomBattleModel_1.PhantomSortStruct();
      (a.PhantomPropId = t.PropId),
        (a.Value = r.e5n),
        (a.IfPercentage = t.AddType === CommonComponentDefine_1.RATIO),
        e.push(a);
    }
    return e;
  }
  GetSubPropArray() {
    var e = new Array();
    for (const n of this.GetPhantomSubProp()) {
      var t =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            n.Yws,
          ),
        a =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            n.Yws,
          ),
        r = new PhantomBattleModel_1.PhantomSortStruct();
      (r.PhantomPropId = t.Id),
        (r.Value = n.e5n),
        (r.IfPercentage = a.AddType === CommonComponentDefine_1.RATIO),
        e.push(r);
    }
    return e;
  }
  GetIfHaveRecommendMainProp(e) {
    var t =
      ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(
        e,
        this.GetCost(),
      )?.GetMainAttrRecommendInfo();
    if (t)
      for (const n of this.GetPhantomMainProp()) {
        var a =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
              n.Yws,
            ),
          r = t.length;
        for (let e = 0; e < r; e++)
          if (a.AddType === t[e].GetAddType() && a.PropId === t[e].GetAttrId())
            return !0;
      }
    return !1;
  }
  GetIfHaveRecommendSubProp(e) {
    var t =
      ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(
        e,
        this.GetCost(),
      )?.GetSubAttrRecommendInfo();
    if (t)
      for (const n of this.GetPhantomSubProp()) {
        var a =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
              n.Yws,
            ),
          r = t.length;
        for (let e = 0; e < r; e++)
          if (a.AddType === t[e].GetAddType() && a.PropId === t[e].GetAttrId())
            return !0;
      }
    return !1;
  }
  IsBreach() {
    return 0 < this.PhantomSubProp.length;
  }
}
exports.PhantomBattleData = PhantomBattleData;
//# sourceMappingURL=PhantomBattleData.js.map
