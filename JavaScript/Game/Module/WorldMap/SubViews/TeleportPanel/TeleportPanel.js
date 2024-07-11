"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MULTI_MAP_SELECT_ICON_PATH = "SP_MarkMultiMapSelect",
  BLOCK_MARK_ICON_PATH = "SP_MarkBlock";
class TeleportPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.ZAt = void 0),
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
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetFunction(this.T2o);
  }
  OnShowWorldMapSecondaryUi(t) {
    this.u2o = t;
    var e = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.u2o.MarkId,
      ),
      r =
        (e.ShowFlag === Protocol_1.Aki.Protocol.I6s.Proto_ShowDisable
          ? this.ZAt.SetEnableClick(!1)
          : this.ZAt.SetEnableClick(!0),
        this.L2o(),
        this.GetText(1).SetText(this.u2o.GetTitleText()),
        this.u2o.GetAreaText()),
      r =
        (r && this.GetText(3).SetText(r),
        this.GetText(4).ShowTextNew(this.u2o.GetLocaleDesc()),
        this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
        t.IsMultiMapTeleport),
      r =
        (this.GetSprite(23).SetUIActive(r),
        r &&
          ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            MULTI_MAP_SELECT_ICON_PATH,
          )),
          this.SetSpriteByPath(t, this.GetSprite(23), !1)),
        e.ShowFlag === Protocol_1.Aki.Protocol.I6s.Proto_ShowDisable);
    this.GetSprite(24).SetUIActive(r),
      r &&
        ((t =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            BLOCK_MARK_ICON_PATH,
          )),
        this.SetSpriteByPath(t, this.GetSprite(24), !1)),
      this.GetItem(12).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.RootItem.SetUIActive(!0);
  }
  L2o() {
    this.u2o &&
      (this.u2o.IsLocked
        ? this.ZAt.SetLocalText(
            this.u2o.IsTracked
              ? "InstanceDungeonEntranceCancelTrack"
              : "InstanceDungeonEntranceTrack",
          )
        : this.ZAt.SetLocalText("TeleportFastMove"));
  }
  OnBeforeDestroy() {
    this.ZAt.Destroy();
  }
}
exports.TeleportPanel = TeleportPanel;
//# sourceMappingURL=TeleportPanel.js.map
