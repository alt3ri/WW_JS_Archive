"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePhantomData = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PhantomDataBase_1 = require("../../../Phantom/PhantomBattle/Data/PhantomDataBase"),
  RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RolePhantomData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor() {
    super(...arguments),
      (this.PhantomMap = new Map()),
      (this.H0i = !1),
      (this.NQ = new Map()),
      (this.e1o = new Array());
  }
  RefreshPhantom(t, a) {
    this.PhantomMap.set(t, a);
  }
  GetPhantomId(t) {
    return this.PhantomMap.get(t);
  }
  SetIsTrial(t) {
    this.H0i = t;
  }
  SetDataMap(t, a) {
    this.NQ.set(t, a);
  }
  GetDataMap() {
    if (!this.H0i) {
      var e = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        this.RoleId,
      ).GetIncrIdList();
      if (e)
        for (let t = 0, a = e.length; t < a; ++t) {
          var r = e[t],
            r =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                r,
              );
          this.NQ.set(t, r);
        }
    }
    return this.NQ;
  }
  GetDataByIndex(t) {
    return this.GetDataMap().get(t);
  }
  GetMainProp() {
    var t;
    return this.H0i
      ? this.NQ.get(0)
      : ((t = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          this.RoleId,
        ).GetIncrIdList()),
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          t[0],
        ));
  }
  GetPhantomFettersData() {
    const n = new Array();
    return (
      this.GetPhantomFetterMap().forEach((t, r) => {
        t.forEach((t, a) => {
          var e = new PhantomDataBase_1.VisionFetterData();
          (e.FetterGroupId = r),
            (e.FetterId = a),
            (e.NeedActiveNum = t),
            (e.ActiveFetterGroupNum = t),
            (e.ActiveState = !0),
            n.push(e);
        });
      }),
      n
    );
  }
  GetPhantomFetterMap() {
    var t = this.t1o();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterMapResultBySuitMap(
      t,
    );
  }
  GetPhantomFettersList() {
    var t = this.t1o();
    return (
      (this.e1o =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterResultBySuitMap(
          t,
        )),
      this.e1o
    );
  }
  t1o() {
    var t = this.GetDataMap();
    const e = new Array();
    return (
      t.forEach((t, a) => {
        t && e.push(t);
      }),
      PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(e)
    );
  }
  ClearPhantomFettersList() {
    this.e1o.length = 0;
  }
}
exports.RolePhantomData = RolePhantomData;
//# sourceMappingURL=RolePhantomData.js.map
