"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const MapController_1 = require("../../../Map/Controller/MapController");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapController_1 = require("../../WorldMapController");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const MULTI_MAP_SELECT_ICON_PATH = "SP_MarkMultiMapSelect";
const BLOCK_MARK_ICON_PATH = "SP_MarkBlock";
class TeleportPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.dko = void 0),
      (this.$Ut = void 0),
      (this.Rko = () => {
        this.dko &&
          (this.dko.IsLocked
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
              MapController_1.MapController.RequestTrackMapMark(
                this.dko.MarkType,
                this.dko.MarkId,
                !this.dko.IsTracked,
              ),
              this.Uko(),
              this.Close())
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Map", 50, "传送", ["markId", this.dko.MarkId]),
              WorldMapController_1.WorldMapController.TryTeleport(this.dko)));
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
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.$Ut.SetFunction(this.Rko);
  }
  OnShowWorldMapSecondaryUi(t) {
    this.dko = t;
    const e = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
      this.dko.MarkId,
    );
    var r =
      (e.ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable
        ? this.$Ut.SetEnableClick(!1)
        : this.$Ut.SetEnableClick(!0),
      this.Uko(),
      this.GetText(1).SetText(this.dko.GetTitleText()),
      this.dko.GetAreaText());
    var r =
      (r && this.GetText(3).SetText(r),
      this.GetText(4).ShowTextNew(this.dko.GetLocaleDesc()),
      this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
      t.IsMultiMapTeleport);
    var r =
      (this.GetSprite(23).SetUIActive(r),
      r &&
        ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          MULTI_MAP_SELECT_ICON_PATH,
        )),
        this.SetSpriteByPath(t, this.GetSprite(23), !1)),
      e.ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable);
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
  Uko() {
    this.dko &&
      (this.dko.IsLocked
        ? this.$Ut.SetLocalText(
            this.dko.IsTracked
              ? "InstanceDungeonEntranceCancelTrack"
              : "InstanceDungeonEntranceTrack",
          )
        : this.$Ut.SetLocalText("TeleportFastMove"));
  }
  OnBeforeDestroy() {
    this.$Ut.Destroy();
  }
}
exports.TeleportPanel = TeleportPanel;
// # sourceMappingURL=TeleportPanel.js.map
