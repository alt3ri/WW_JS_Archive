"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentAreaItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapUtil_1 = require("../../MapUtil"),
  EnrichmentAreaItemView_1 = require("../MarkItemView/EnrichmentAreaItemView"),
  ServerMarkItem_1 = require("./ServerMarkItem");
class EnrichmentAreaItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, t, i) {
    super(e, r, t, i),
      (this.sGa = 0),
      (this.aGa = !1),
      (this.hGa = 0),
      (this.lGa = void 0),
      (this.O3a = void 0);
  }
  get MarkConfig() {
    return this.lGa;
  }
  set MarkConfig(e) {
    this.lGa = e;
  }
  get MarkRange() {
    return this.sGa;
  }
  get MarkType() {
    return 22;
  }
  OnCreateView() {
    this.InnerView = new EnrichmentAreaItemView_1.EnrichmentAreaItemView(this);
  }
  Initialize() {
    super.Initialize();
    var e,
      r = this.ServerMarkInfo;
    if (
      (this.SetTrackData(r.TrackTarget),
      (this.O3a =
        ConfigManager_1.ConfigManager.MapConfig.GetEnrichmentAreaConfigByEnrichmentId(
          r.EntityConfigId,
        )),
      (this.MapId = this.O3a.LevelId),
      ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaEntityId !==
        r.EntityConfigId)
    ) {
      var t = this.O3a.EntityIds;
      if (t) {
        var i = [];
        for (const s of t) {
          var a = MapUtil_1.MapUtil.GetEntityPosition(
            s,
            !1,
            this.IsInCurrentInstance(),
          );
          a.Equality(Vector_1.Vector.ZeroVectorProxy)
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Map",
                64,
                "[地图系统]_富集区标记->采集物实体坐标异常，请检查配置",
                ["富集区Id", r.EntityConfigId],
                ["采集物Id", s],
              )
            : ((a = MapUtil_1.MapUtil.WorldPosition2UiPosition(a)), i.push(a));
        }
        const n = MapUtil_1.MapUtil.GetSmallestEnclosingCircle(i);
        ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaWorldMapCircle =
          n;
      }
      ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaEntityId =
        r.EntityConfigId ?? 0;
    }
    const n =
      ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaWorldMapCircle;
    n &&
      ((t = MapUtil_1.MapUtil.UiPosition2WorldPosition(
        Vector_1.Vector.Create(n.X, n.Y, 0),
      )),
      (e = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "RichZoneExtraRadius",
      )),
      (this.sGa = n.R + e),
      this.SetTrackData(t));
    let o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      this.EntityConfigId,
    );
    (o =
      o ||
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        this.EntityConfigId,
      )),
      (this.aGa = o?.IsMultiMap ?? !1),
      (this.hGa = o?.MultiMapIdInternal ?? 0);
    this.SetConfigId(5), this.UpdateTrackState();
  }
  IsMultiMap() {
    return this.aGa;
  }
  GetMultiMapId() {
    return this.hGa;
  }
  SetConfigId(e) {
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    (this.lGa = e),
      this.OnAfterSetConfigId({
        ShowRange: e.ShowRange,
        MarkPic: e.UnlockMarkPic,
        ShowPriority: e.ShowPriority,
        Scale: e.Scale,
        CornerScale: e.CornerScale,
      });
  }
  GetEnrichmentItemNameId() {
    return ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.O3a.ItemId)
      .Name;
  }
  CheckCanShowIcon() {
    var e = this.MapType;
    return (
      !(
        (1 === this.MarkConfig.MapShow && 1 !== e) ||
        (2 === this.MarkConfig.MapShow && 1 === e)
      ) && super.CheckCanShowView()
    );
  }
}
exports.EnrichmentAreaItem = EnrichmentAreaItem;
//# sourceMappingURL=EnrichmentAreaItem.js.map
