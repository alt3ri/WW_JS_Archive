"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel");
class TeleportPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.ZAt = void 0),
      (this.k4a = void 0),
      (this.N4a = void 0),
      (this.oza = void 0),
      (this.T2o = () => {
        this.u2o &&
          (this.u2o.IsLocked
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Map", 50, "追踪", ["markId", this.u2o.MarkId]),
              MapController_1.MapController.RequestTrackMapMark(
                this.u2o.MarkType,
                this.u2o.MarkId,
                !this.u2o.IsTracked,
              ),
              this.L2o(),
              this.Close())
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Map", 50, "传送", ["markId", this.u2o.MarkId]),
              WorldMapController_1.WorldMapController.TryTeleport(this.u2o)));
      }),
      (this.F4a = () => {
        var t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
          this.Map,
          this.u2o,
        );
        t &&
          MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(this.u2o, t, () => {
            this.Close();
          });
      }),
      (this.P8e = () => {
        var t = this.u2o;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            64,
            "[地图系统]TeleportPanel->追踪标记",
            ["markId", t.MarkId],
            ["IsTracked", t.IsTracked],
          ),
          MapController_1.MapController.RequestTrackMapMark(
            t.MarkType,
            t.MarkId,
            !t.IsTracked,
          ),
          this.L2o(),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
      (this.BtnBindInfo = []);
  }
  async OnBeforeStartAsync() {
    return (
      (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner()),
      super.OnBeforeStartAsync()
    );
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.T2o),
      (this.k4a = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp)),
      this.k4a.SetFunction(this.P8e),
      (this.N4a = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp)),
      this.N4a.SetFunction(this.F4a);
  }
  OnShowWorldMapSecondaryUi(t) {
    this.u2o = t;
    var e = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.u2o.MarkId,
      ),
      i =
        (e.ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable
          ? this.ZAt.SetEnableClick(!1)
          : this.ZAt.SetEnableClick(!0),
        this.L2o(),
        this.GetText(1).SetText(this.u2o.GetTitleText()),
        this.u2o.GetAreaText()),
      i =
        (i && this.GetText(3).SetText(i),
        this.GetText(4).ShowTextNew(this.u2o.GetLocaleDesc()),
        this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
        t.IsMultiMap()),
      i =
        (this.GetSprite(23).SetUIActive(i),
        i &&
          ((i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH,
          )),
          this.SetSpriteByPath(i, this.GetSprite(23), !1)),
        e.ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable),
      i =
        (this.GetSprite(24).SetUIActive(i),
        i &&
          ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            WorldMapDefine_1.BLOCK_MARK_ICON_PATH,
          )),
          this.SetSpriteByPath(e, this.GetSprite(24), !1)),
        this.GetItem(12).SetUIActive(!1),
        this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
        this.GetItem(6).SetUIActive(!1),
        this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(8).SetUIActive(!1),
        MarkUiUtils_1.MarkUiUtils.IsShowGoto(t));
    this.ZAt.SetActive(!i),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(32).SetUIActive(i),
      this.oza.SetUiActive(!1),
      i &&
        ((e = this.GetButton(29)),
        (i = TeleportController_1.TeleportController.CheckCanTeleport()),
        (t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, t)),
        this.oza.SetUiActive(!i || void 0 === t),
        e.SetSelfInteractive(i && void 0 !== t)),
      this.RootItem.SetUIActive(!0);
  }
  L2o() {
    this.u2o &&
      (this.u2o.IsLocked
        ? (this.ZAt.SetLocalText(
            this.u2o.IsTracked
              ? "InstanceDungeonEntranceCancelTrack"
              : "InstanceDungeonEntranceTrack",
          ),
          this.k4a.SetLocalText(
            this.u2o.IsTracked
              ? "InstanceDungeonEntranceCancelTrack"
              : "InstanceDungeonEntranceTrack",
          ))
        : this.ZAt.SetLocalText("TeleportFastMove"));
  }
  OnBeforeDestroy() {
    this.ZAt.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy(),
      this.oza.Destroy();
  }
}
exports.TeleportPanel = TeleportPanel;
//# sourceMappingURL=TeleportPanel.js.map
