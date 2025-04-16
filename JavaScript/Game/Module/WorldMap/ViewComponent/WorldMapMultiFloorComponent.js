"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapMultiFloorComponent = void 0);
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ExploreProgressDefine_1 = require("../../ExploreProgress/ExploreProgressDefine"),
  MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapMultiFloorComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.MultiMapFloorLayout = void 0),
      (this.Sal = void 0),
      (this.yal = void 0),
      (this.MultiMapFloorContainer = void 0),
      (this.WorldMapViewPlaySequenceFunction = void 0),
      (this.Eal = !1),
      (this.OnChangeMultiMapFloor = (e, t) => {
        this.Ial(e, !0, t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate,
            e,
          );
      });
  }
  get ComponentType() {
    return 6;
  }
  get NYa() {
    var e = this.Parent;
    if (void 0 !== e) return e;
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get SelectedMultiMapGroupId() {
    return this.Sal;
  }
  get SelectedMultiMapFloorId() {
    return this.yal;
  }
  OnEnable() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapSubMapChanged,
      this.OnChangeMultiMapFloor,
    );
  }
  OnDisable() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapSubMapChanged,
      this.OnChangeMultiMapFloor,
    );
  }
  Reset() {
    (this.Sal = void 0), (this.yal = void 0), (this.Eal = !1);
  }
  InitMultiMap() {
    var e,
      t = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
      i = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByAreaId(t);
    i &&
      ((e = i.GroupId), (i = i.Floor), this.SelectMultiMapFloor(t, e, i, !1));
  }
  UpdateMultiMap() {
    var e = this.Tal(),
      t = this.NYa.Map.GetSubMapGroupIdByPosition();
    this.SelectedMultiMapGroupId === t ||
      (void 0 !== this.SelectedMultiMapFloorId &&
        0 !== this.SelectedMultiMapFloorId) ||
      (0 === t
        ? this.SelectMultiMapFloor(e, void 0, void 0)
        : this.SelectMultiMapFloor(e, t, 0));
  }
  Tal() {
    if (this.NYa.ClickedItem?.IsMultiMap()) {
      var e = this.NYa.ClickedItem.GetMultiMapId(),
        e = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(e);
      if (e) return 0 < e.Area.length ? e.Area[0] : 0;
    }
    return this.NYa.Map.GetWorldMapCenterAreaId();
  }
  SelectMultiMapFloor(e, t, n, s = !0) {
    (e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)),
      (e = e
        ? ModelManager_1.ModelManager.AreaModel.GetAreaId(
            e,
            ExploreProgressDefine_1.AREA_LEVEL,
          )
        : 0),
      (e = ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(e));
    let r = e;
    if (e && void 0 !== t && void 0 !== n) {
      let e =
        ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(t),
        ) ?? [];
      if (
        ((e = e.filter(
          (e) =>
            ModelManager_1.ModelManager.MapModel.CheckUnlockMultiMapIds(e.Id) ||
            0 === e.Floor,
        )).sort((e, t) => t.Floor - e.Floor),
        1 !== e.length)
      ) {
        let i = void 0,
          o = 0;
        void 0 !== n &&
          e.forEach((e, t) => {
            e.Floor === n && ((i = t), (o = e.Id));
          }),
          (this.Sal = t),
          void 0 !== (this.yal = i) &&
            ((ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId =
              o),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapSelectMultiMap,
              o,
            ),
            this.Ial(i, !1, s)),
          this.SetMultiMapMenuActive(r),
          this.MultiMapFloorLayout.RefreshByDataAsync(e, !1),
          this.MultiMapFloorLayout.SelectGridProxy(i ?? 0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate,
            i ?? 0,
          );
      }
    } else
      (this.Sal = void 0),
        (this.yal = void 0),
        (ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId =
          void 0),
        (r = !1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapSelectMultiMap,
          0,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate,
          0,
        ),
        this.Ial(0, !1, s),
        this.SetMultiMapMenuActive(r);
  }
  DeSelectMultiMapFloor(e = !0) {
    var t = this.Tal();
    this.SelectMultiMapFloor(t, void 0, void 0, e);
  }
  async SetMultiMapMenuActive(e) {
    return (
      this.Eal !== e &&
        ((this.Eal = e),
        this.Eal
          ? (this.MultiMapFloorContainer.SetUIActive(!0),
            await this.WorldMapViewPlaySequenceFunction?.("LevelShow", !1))
          : await this.WorldMapViewPlaySequenceFunction?.("LevelHide", !1),
        this.MultiMapFloorContainer.SetUIActive(this.Eal)),
      !0
    );
  }
  Ial(e, t, i) {
    this.Eal &&
      (this.MultiMapFloorLayout.DeselectCurrentGridProxy(),
      this.MultiMapFloorLayout.SelectGridProxy(e)),
      (this.yal = e),
      void 0 === this.SelectedMultiMapGroupId || 0 === e
        ? (this.NYa.Map.HideSubMapTile(), t && this.UpdateMultiMap())
        : this.NYa.Map.ShowSubMapTile(this.SelectedMultiMapGroupId, e, !i);
  }
}
exports.WorldMapMultiFloorComponent = WorldMapMultiFloorComponent;
//# sourceMappingURL=WorldMapMultiFloorComponent.js.map
