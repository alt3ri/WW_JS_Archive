"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomBattleData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  CommonComponentDefine_1 = require("../../Common/CommonComponentDefine"),
  PhantomDataBase_1 = require("./Data/PhantomDataBase"),
  PhantomBattleModel_1 = require("./PhantomBattleModel");
class PhantomBattleData extends PhantomDataBase_1.PhantomDataBase {
  constructor() {
    super(...arguments), (this.wTt = 0);
  }
  SetData(t) {
    (this.wTt = t.L9n ?? 0),
      (this.PhantomLevel = t.qws ?? 0),
      (this.ItemId = t.J4n ?? 0),
      (this.PhantomExp = t.Gws ?? 0),
      (this.PhantomMainProp = t.Ows ?? []),
      (this.PhantomSubProp = t.kws ?? []),
      (this.FetterGroupId = t.Nws ?? 0),
      (this.FuncValue = t.Bws ?? 0),
      this.SetSkinId(t.j7n ?? 0),
      this.SetIncId(this.wTt);
  }
  GetUniqueId() {
    return this.wTt;
  }
  GetMainPropArray() {
    var t = new Array();
    for (const n of this.GetPhantomMainProp()) {
      var e =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
            n.$ws,
          ),
        a = new PhantomBattleModel_1.PhantomSortStruct();
      (a.PhantomPropId = e.PropId),
        (a.Value = n.W4n),
        (a.IfPercentage = e.AddType === CommonComponentDefine_1.RATIO),
        t.push(a);
    }
    return t;
  }
  GetSubPropArray() {
    var t = new Array();
    for (const o of this.GetPhantomSubProp()) {
      var e =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            o.$ws,
          ),
        a =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            o.$ws,
          ),
        n = new PhantomBattleModel_1.PhantomSortStruct();
      (n.PhantomPropId = e.Id),
        (n.Value = o.W4n),
        (n.IfPercentage = a.AddType === CommonComponentDefine_1.RATIO),
        t.push(n);
    }
    return t;
  }
  IsBreach() {
    return 0 < this.PhantomSubProp.length;
  }
}
exports.PhantomBattleData = PhantomBattleData;
//# sourceMappingURL=PhantomBattleData.js.map
