"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapAlterMapComponent = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapAlterMapComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.WorldMapViewPlaySequenceFunction = void 0),
      (this.InverTowerCtrlRoot = void 0),
      (this.BDc = void 0),
      (this.$An = (e) => {
        "Invert" === e && (this.BDc?.SetResult(!0), (this.BDc = void 0));
      });
  }
  get ComponentType() {
    return 9;
  }
  get NYa() {
    var e = this.Parent;
    if (void 0 !== e) return e;
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  OnEnable() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnDisable() {
    this.kDc(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.$An,
      );
  }
  kDc() {
    this.BDc?.SetResult(!1), (this.BDc = void 0);
  }
  async ChangeMapAsync(e, t) {
    var i = this.NYa.Map;
    i.UnBindMapTileDelegate(),
      ControllerHolder_1.ControllerHolder.WorldMapController.ClearFocalMarkItem(),
      this.NYa.CancelAllTasks(),
      this.NYa.ReloadComponent(8),
      void 0 !== t &&
        e === i.MapId &&
        (this.InverTowerCtrlRoot.SetUIActive(!0),
        this.kDc(),
        (this.BDc = new CustomPromise_1.CustomPromise()),
        this.WorldMapViewPlaySequenceFunction?.("InverTower", !0).then(() => {
          this.InverTowerCtrlRoot.SetUIActive(!1);
        })),
      await this.ODc(e, t);
  }
  async ODc(e, t) {
    var i;
    !1 === (await this.BDc?.Promise)
      ? (this.BDc = void 0)
      : ((i = this.NYa.Map),
        ModelManager_1.ModelManager.WorldMapModel.SetWorldMapSelectedGravity(
          e,
          t,
        ),
        await i.ChangeMapAsync(
          e,
          ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity ?? 1,
        ),
        (this.NYa.MapId = e),
        this.NYa.RecalculateMapSize(),
        this.NYa.ReloadComponent(2),
        this.NYa.MultiFloorComponent.Reset(),
        this.NYa.Reset(void 0 === t),
        this.NYa.WorldMapStreamingComponent.BindAll(i.GetAllMapTileItems()),
        this.NYa.WorldMapStreamingComponent.Update());
  }
  ChangeMapGravity() {
    var e = ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity;
    let t = e;
    switch (e) {
      case 1:
        t = 2;
        break;
      case 2:
        t = 1;
        break;
      default:
        return;
    }
    ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity = t;
    e = this.NYa.Map;
    this.ChangeMapAsync(
      e.MapId,
      ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity,
    );
  }
  get CanChangeMapGravity() {
    var e = this.NYa.Map.MapId;
    return ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(e);
  }
  OnRemove() {
    ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity = void 0;
  }
}
exports.WorldMapAlterMapComponent = WorldMapAlterMapComponent;
//# sourceMappingURL=WorldMapAlterMapComponent.js.map
