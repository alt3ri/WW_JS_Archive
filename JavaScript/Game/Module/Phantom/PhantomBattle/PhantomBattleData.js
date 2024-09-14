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
    (this.wTt = t.b9n ?? 0),
      (this.PhantomLevel = t.$ws ?? 0),
      (this.ItemId = t.s5n ?? 0),
      (this.PhantomExp = t.Hws ?? 0),
      (this.PhantomMainProp = t.jws ?? []),
      (this.PhantomSubProp = t.Wws ?? []),
      (this.FetterGroupId = t.Kws ?? 0),
      (this.FuncValue = t.Vws ?? 0),
      this.SetSkinId(t.Z7n ?? 0),
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
            n.Yws,
          ),
        a = new PhantomBattleModel_1.PhantomSortStruct();
      (a.PhantomPropId = e.PropId),
        (a.Value = n.e5n),
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
            o.Yws,
          ),
        a =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            o.Yws,
          ),
        n = new PhantomBattleModel_1.PhantomSortStruct();
      (n.PhantomPropId = e.Id),
        (n.Value = o.e5n),
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
