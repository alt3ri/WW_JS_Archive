"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentAreaItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MapUtil_1 = require("../../MapUtil"),
  EnrichmentAreaItemView_1 = require("../MarkItemView/EnrichmentAreaItemView"),
  ServerMarkItem_1 = require("./ServerMarkItem");
class EnrichmentAreaItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, t, i) {
    super(e, r, t, i), (this.gNa = void 0), (this._M1 = void 0);
  }
  get MarkConfig() {
    return this.gNa;
  }
  set MarkConfig(e) {
    this.gNa = e;
  }
  get EnrichmentAreaConf() {
    return (
      void 0 === this._M1 &&
        (this._M1 =
          ConfigManager_1.ConfigManager.MapConfig.GetEnrichmentAreaConfigByEnrichmentId(
            this.EntityConfigId,
          )),
      this._M1
    );
  }
  get MarkType() {
    return 22;
  }
  get MapId() {
    return this.EnrichmentAreaConf.LevelId;
  }
  get InstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  GetMarkItemViewType() {
    return 7;
  }
  CreateView() {
    return new EnrichmentAreaItemView_1.EnrichmentAreaItemView(this);
  }
  OnInitialize() {
    super.OnInitialize();
    var e,
      r = this.ServerMarkInfo;
    if (
      (this.SetTrackData(r.TrackTarget),
      ModelManager_1.ModelManager.MapModel.CacheEnrichmentAreaEntityId !==
        r.EntityConfigId)
    ) {
      var t = this.EnrichmentAreaConf.EntityIds;
      if (t) {
        var i = [];
        for (const o of t) {
          var a = MapUtil_1.MapUtil.GetEntityPositionByConfig(o, this.MapId);
          a.Equality(Vector_1.Vector.ZeroVectorProxy)
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Map",
                63,
                "[地图系统]_富集区标记->采集物实体坐标异常，请检查配置",
                ["富集区Id", r.EntityConfigId],
                ["采集物Id", o],
              )
            : ((a = MapUtil_1.MapUtil.WorldPosition2UiPosition(a)),
              i.push(Vector2D_1.Vector2D.Create(a.X, a.Y)));
        }
        const n = MapUtil_1.MapUtil.MinBoundingCircle(i);
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
      (this.MarkItemEntity.GetComponent(11).RangeSize = n.R + e),
      this.SetTrackData(t));
    this.SetConfigId(5), this.UpdateVisibleRelativeState();
  }
  SetConfigId(e) {
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    (this.gNa = e),
      this.OnAfterSetConfigId({
        ShowRange: e.ShowRange,
        MarkPic: e.UnlockMarkPic,
        ShowPriority: e.ShowPriority,
        Scale: e.Scale,
        CornerScale: e.CornerScale,
      });
  }
  GetEnrichmentItemNameId() {
    return ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
      this.EnrichmentAreaConf.ItemId,
    ).Name;
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
  SetTitleText(e) {
    var r = this.MarkConfig.MarkTitle,
      t = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
        this.GetEnrichmentItemNameId(),
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, r, t);
  }
}
exports.EnrichmentAreaItem = EnrichmentAreaItem;
//# sourceMappingURL=EnrichmentAreaItem.js.map
