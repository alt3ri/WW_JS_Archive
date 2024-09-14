"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
  PunishReportTargetListPanel_1 = require("./PunishReportTargetListPanel");
class PunishReportPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.ZAt = void 0),
      (this.k4a = void 0),
      (this.N4a = void 0),
      (this.uVa = void 0),
      (this.oza = void 0),
      (this.T2o = () => {
        this.u2o &&
          (MapController_1.MapController.RequestTrackEnrichmentArea(),
          this.L2o(),
          this.Close());
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
            "[地图系统]PunishReportPanel->追踪标记",
            ["markId", t.MarkId],
            ["IsTracked", t.IsTracked],
          ),
          MapController_1.MapController.RequestTrackMapMark(
            t.MarkType,
            t.MarkId,
            !t.IsTracked,
          ),
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
      this.N4a.SetFunction(this.F4a),
      (this.uVa =
        new PunishReportTargetListPanel_1.PunishReportTargetListPanel()),
      this.uVa.Initialize(this.GetVerticalLayout(16));
  }
  OnShowWorldMapSecondaryUi(t) {
    this.u2o = t;
    var i,
      e = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.u2o.MarkId,
      ),
      r =
        (e.ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable
          ? this.ZAt.SetEnableClick(!1)
          : this.ZAt.SetEnableClick(!0),
        this.L2o(),
        this.u2o.MarkConfigId),
      s = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(r);
    s
      ? (this.GetText(1).ShowTextNew(s.MarkTitle),
        (i = this.u2o.GetAreaText()) && this.GetText(3).SetText(i),
        (i = this.u2o.GetPunishReportTarget()),
        (s = s.MarkDesc.split("|")[i.GetBoxNum]),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), s),
        this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
        (i = t.IsMultiMap()),
        this.GetSprite(23).SetUIActive(i),
        i &&
          ((s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH,
          )),
          this.SetSpriteByPath(s, this.GetSprite(23), !1)),
        (i = e.ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable),
        this.GetSprite(24).SetUIActive(i),
        i &&
          ((s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            WorldMapDefine_1.BLOCK_MARK_ICON_PATH,
          )),
          this.SetSpriteByPath(s, this.GetSprite(24), !1)),
        this.GetItem(12).SetUIActive(!1),
        this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
        this.GetItem(6).SetUIActive(!1),
        this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(8).SetUIActive(!1),
        (e = MarkUiUtils_1.MarkUiUtils.IsShowGoto(t)),
        this.ZAt.SetActive(!e),
        this.GetItem(32).SetUIActive(e),
        this.oza.SetUiActive(!1),
        e &&
          ((i = this.GetButton(29)),
          (s = TeleportController_1.TeleportController.CheckCanTeleport()),
          (e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, t)),
          this.oza.SetUiActive(!s || void 0 === e),
          i.SetSelfInteractive(s && void 0 !== e)),
        this.GetItem(14).SetUIActive(!0),
        this.GetItem(26).SetUIActive(!1),
        this.GetVerticalLayout(16).RootUIComp.SetUIActive(!0),
        (t = this.u2o.CanGetReward()),
        this.GetItem(25).SetUIActive(t),
        t &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(30),
            "DarkShoreBossRewardNotGet",
          ),
        this.v4e(),
        this.RootItem.SetUIActive(!0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 64, "缺少标记配置", ["MarkId", r]);
  }
  L2o() {
    this.u2o &&
      (this.ZAt.SetLocalTextNew("Text_TeleportStop_Text"),
      this.k4a.SetLocalText(
        this.u2o.IsTracked
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      ));
  }
  v4e() {
    var i = this.u2o.GetPunishReportTarget();
    for (let t = 0; t < i.States.length; ++t) {
      var e = i.States[t],
        r = i.ConditionTxtIds[t],
        s = this.uVa.AddItemByKey("Target_" + t);
      s.SetDescLocalNewTxt(r),
        s.SetNumTxt("x1"),
        s.SetLockActive(!1),
        s.SetToggleEmptyActive(!0),
        s.SetToggleSelectedActive(2 === e || 1 === e);
    }
  }
  OnBeforeDestroy() {
    this.uVa.Clear(),
      this.ZAt.Destroy(),
      this.oza.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy();
  }
}
exports.PunishReportPanel = PunishReportPanel;
//# sourceMappingURL=PunishReportPanel.js.map
