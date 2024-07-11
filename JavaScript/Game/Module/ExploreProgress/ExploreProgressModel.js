"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ExploreCountryData_1 = require("./ExploreCountryData"),
  ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreProgressModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.YVt = new Map()),
      (this.QVt = new Map()),
      (this.JVt = []),
      (this.SelectedCountryId = 0),
      (this.SelectedAreaId = 0);
  }
  OnClear() {
    return this.ClearExploreAreaData(), !0;
  }
  OnLeaveLevel() {
    return this.ClearExploreAreaData(), !0;
  }
  InitializeExploreAreaData() {
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList(),
      r = ConfigManager_1.ConfigManager.AreaConfig;
    this.JVt.length = 0;
    for (const i of e) {
      var o = new ExploreCountryData_1.ExploreCountryData(),
        t =
          (o.Initialize(i),
          this.YVt.set(i.Id, o),
          r.GetAreaConfigByCountryAndLevel(
            i.Id,
            ExploreProgressDefine_1.AREA_LEVEL,
          ));
      for (const n of t) {
        var s = n.AreaId,
          a = o.AddExploreAreaData(n);
        this.QVt.set(s, a), this.JVt.push(s);
      }
    }
  }
  InitializeCurrentCountryIdAndAreaId() {
    var e = ModelManager_1.ModelManager.AreaModel,
      e =
        ((this.SelectedCountryId = e.GetAreaCountryId() ?? 0),
        this.SelectedCountryId <= 0 &&
          ((this.SelectedCountryId =
            ExploreProgressDefine_1.DEFAULT_COUNTRY_ID),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "ExploreProgress",
            8,
            "初始化所有探索度区域数据时，找不到所在国家则选中皇龙",
            ["CountryId", this.SelectedCountryId],
          ),
        ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        ));
    this.GetExploreAreaData(e)
      ? (this.SelectedAreaId = e)
      : ((e = this.GetExploreCountryData(
          this.SelectedCountryId,
        ).GetExploreAreaDataList()),
        (this.SelectedAreaId = e[0].AreaId),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "ExploreProgress",
            8,
            "初始化所有探索度区域数据时，若玩家当前所在区域没有在对应区域探索数据，则选中当前国家的第一个区域",
            ["AreaId", this.SelectedAreaId],
          ));
  }
  ClearExploreAreaData() {
    this.YVt.clear(), this.QVt.clear(), (this.JVt.length = 0);
  }
  RefreshExploreAreaData(e) {
    this.QVt.get(e.l6n)?.Refresh(e);
  }
  GetExploreCountryData(e) {
    return this.YVt.get(e);
  }
  GetExploreAreaData(e) {
    return this.QVt.get(e);
  }
  GetExploreCountryDataMap() {
    return this.YVt;
  }
  GetAllAreaIdList() {
    return this.JVt;
  }
}
exports.ExploreProgressModel = ExploreProgressModel;
//# sourceMappingURL=ExploreProgressModel.js.map
