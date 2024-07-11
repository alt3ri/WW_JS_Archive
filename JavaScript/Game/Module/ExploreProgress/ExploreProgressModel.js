"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ExploreCountryData_1 = require("./ExploreCountryData");
const ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreProgressModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Y5t = new Map()),
      (this.Q5t = new Map()),
      (this.J5t = []),
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
    const e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList();
    const r = ConfigManager_1.ConfigManager.AreaConfig;
    this.J5t.length = 0;
    for (const i of e) {
      const o = new ExploreCountryData_1.ExploreCountryData();
      const t =
        (o.Initialize(i),
        this.Y5t.set(i.Id, o),
        r.GetAreaConfigByCountryAndLevel(
          i.Id,
          ExploreProgressDefine_1.AREA_LEVEL,
        ));
      for (const n of t) {
        const s = n.AreaId;
        const a = o.AddExploreAreaData(n);
        this.Q5t.set(s, a), this.J5t.push(s);
      }
    }
  }
  InitializeCurrentCountryIdAndAreaId() {
    var e = ModelManager_1.ModelManager.AreaModel;
    var e =
      ((this.SelectedCountryId = e.GetAreaCountryId() ?? 0),
      this.SelectedCountryId <= 0 &&
        ((this.SelectedCountryId = ExploreProgressDefine_1.DEFAULT_COUNTRY_ID),
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
    this.Y5t.clear(), this.Q5t.clear(), (this.J5t.length = 0);
  }
  RefreshExploreAreaData(e) {
    this.Q5t.get(e.wFn)?.Refresh(e);
  }
  GetExploreCountryData(e) {
    return this.Y5t.get(e);
  }
  GetExploreAreaData(e) {
    return this.Q5t.get(e);
  }
  GetExploreCountryDataMap() {
    return this.Y5t;
  }
  GetAllAreaIdList() {
    return this.J5t;
  }
}
exports.ExploreProgressModel = ExploreProgressModel;
// # sourceMappingURL=ExploreProgressModel.js.map
