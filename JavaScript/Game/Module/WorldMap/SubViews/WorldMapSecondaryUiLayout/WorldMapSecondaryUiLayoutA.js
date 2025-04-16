"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryUiLayoutA = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  MapLogger_1 = require("../../../Map/Misc/MapLogger"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
  WorldMapSecondaryUiContext_1 = require("./WorldMapSecondaryUiContext");
class WorldMapSecondaryUiLayoutA extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.ConfirmButton = void 0),
      (this.TrackBtn = void 0),
      (this.GotoBtn = void 0),
      (this.MapTipsActivateTipPanel = void 0),
      (this.LayoutContext = void 0),
      (this.OnConfirmBtnClick = () => {
        this.HandleTeleportAndTrack();
      }),
      (this.OnTrackBtnClick = () => {
        this.HandleTrack();
      }),
      (this.OnGotoBtnClick = () => {
        this.HandleQuickGoto();
      }),
      (this.OnDetailBtnClick = () => {}),
      (this.OnStripBtnClick = () => {}),
      (this.OnDelBtnClick = () => {});
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
      (this.BtnBindInfo = [
        [15, this.OnDetailBtnClick],
        [18, this.OnStripBtnClick],
        [39, this.OnDelBtnClick],
      ]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.ConfirmButton = new ButtonItem_1.ButtonItem(
        this.GetButton(11).RootUIComp,
      )),
      this.ConfirmButton.SetActive(!0),
      this.ConfirmButton.SetFunction(this.OnConfirmBtnClick),
      (this.TrackBtn = new ButtonItem_1.ButtonItem(
        this.GetButton(28).RootUIComp,
      )),
      this.TrackBtn.SetFunction(this.OnTrackBtnClick),
      (this.GotoBtn = new ButtonItem_1.ButtonItem(
        this.GetButton(29).RootUIComp,
      )),
      this.GotoBtn.SetFunction(this.OnGotoBtnClick),
      this.oaa(),
      (this.MapTipsActivateTipPanel =
        new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.MapTipsActivateTipPanel.CreateByActorAsync(
        this.GetItem(31).GetOwner(),
      );
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1);
  }
  oaa() {
    (this.LayoutContext =
      new WorldMapSecondaryUiContext_1.WorldMapSecondaryUiContext()),
      (this.LayoutContext.SetSpriteByPathAction = (
        t,
        i,
        e,
        s = void 0,
        r = void 0,
      ) => {
        this.SetSpriteByPath(t, i, e, s, r);
      }),
      (this.LayoutContext.Icon = this.GetSprite(0)),
      (this.LayoutContext.Title = this.GetText(1)),
      (this.LayoutContext.AreaText = this.GetText(3)),
      (this.LayoutContext.AreaIconItem = this.GetItem(22)),
      (this.LayoutContext.DescriptionText = this.GetText(4)),
      (this.LayoutContext.ConfirmButtonItem = this.ConfirmButton),
      (this.LayoutContext.TrackButtonItem = this.TrackBtn),
      (this.LayoutContext.PanelProgressItem = this.GetItem(14)),
      (this.LayoutContext.PanelListLayout = this.GetVerticalLayout(5)),
      (this.LayoutContext.DelButton = this.GetButton(39));
  }
  OnBeforeDestroy() {
    this.ConfirmButton.Destroy(),
      this.TrackBtn.Destroy(),
      this.GotoBtn.Destroy(),
      this.MapTipsActivateTipPanel.Destroy(),
      super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    this.GetItem(14).SetUIActive(!0),
      this.GetItem(26).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
      this.GetItem(25).SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetVerticalLayout(16).RootUIComp.SetUIActive(!1),
      this.GetSprite(24).SetUIActive(!1),
      this.MapTipsActivateTipPanel.SetUiActive(!1),
      this.GetButton(39).RootUIComp.SetUIActive(!1);
  }
  UpdateQuickGoto() {
    var t = this.LayoutContext.MarkItem,
      t = MarkUiUtils_1.MarkUiUtils.IsShowGoto(t);
    return this.UpdateQuickGotoActive(t), t;
  }
  UpdateQuickGotoActive(t) {
    var i,
      e,
      s = this.LayoutContext.MarkItem;
    this.GetItem(32).SetUIActive(t),
      !t ||
      ((t = this.GetButton(29)),
      (i = TeleportController_1.TeleportController.CheckCanTeleport()),
      (e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, s)),
      t.SetSelfInteractive(i && void 0 !== e),
      (t = s.MarkItemEntity.GamePlay.IsHide),
      this.MapTipsActivateTipPanel.SetUiActive(!i || void 0 === e || t),
      t)
        ? this.UpdateHidePlayMapTipPanel()
        : this.MapTipsActivateTipPanel.SetDistanceTips();
  }
  UpdateHidePlayMapTipPanel() {
    var i = this.LayoutContext.MarkItem,
      e = i.MarkItemEntity.GamePlay.IsHide;
    if ((this.MapTipsActivateTipPanel.SetUiActive(e), e)) {
      let t = void 0;
      void 0 !== i.MarkItemEntity.GetComponent(14)
        ? ((t =
            ModelManager_1.ModelManager.LevelPlayReportModel.GetLevelPlayHideReason(
              i.MarkItemEntity.GetComponent(15).MapMarkConfig.RelativeDungeonId,
              i.MarkItemEntity.GetComponent(15).MapMarkConfig.RelativeId,
            )),
          this.MapTipsActivateTipPanel.SetHideTip(t))
        : ((e = i.MarkItemEntity.GetComponent(18).EntityId ?? 0),
          (t = ModelManager_1.ModelManager.MapModel.GetMarkHideReason(
            i.MapId,
            e,
          )),
          this.MapTipsActivateTipPanel.SetHideTip(t));
    }
  }
  UpdateEnableFastMoveLayout() {
    var t = this.LayoutContext.MarkItem,
      i =
        ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(t.MarkId)
          .ShowFlag !== Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable,
      e = !t.IsLocked,
      t = 1 === t.MarkConfig.EnableQuickTransfer;
    this.ConfirmButton.SetActive(t && e),
      this.ConfirmButton.SetEnableClick(e),
      this.UpdateQuickGotoActive(!t || !e);
    i
      ? this.UpdateTopRightIconActive()
      : ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          WorldMapDefine_1.BLOCK_MARK_ICON_PATH,
        )),
        this.UpdateTopRightIcon(!0, t));
  }
  UpdateMarkItemRelativeLayout() {
    this.UpdateMultiMap(), this.UpdateTopRightIconActive();
  }
  UpdateMultiMap() {
    var t = this.LayoutContext.MarkItem.ShowSecondaryUiMultiMapIcon();
    this.GetSprite(23).SetUIActive(t),
      t &&
        ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH,
        )),
        this.SetSpriteByPath(t, this.GetSprite(23), !1));
  }
  UpdateTopRightIconActive() {
    var t = this.LayoutContext.MarkItem,
      i = t.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(1),
      t = t.MarkItemEntity.Resource.TopRightIconPath;
    this.UpdateTopRightIcon(i, t);
  }
  UpdateTopRightIconByTeleportState() {
    var t;
    !this.LayoutContext.MarkItem.MarkItemEntity.GamePlay.IsDisable
      ? this.UpdateTopRightIcon(!1)
      : ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          WorldMapDefine_1.BLOCK_MARK_ICON_PATH,
        )),
        this.UpdateTopRightIcon(!0, t));
  }
  UpdateTopRightIcon(t, i) {
    this.GetSprite(24).SetUIActive(t),
      t &&
        !StringUtils_1.StringUtils.IsEmpty(i) &&
        this.SetSpriteByPath(i, this.GetSprite(24), !1);
  }
  UpdateRightDownIconActive() {
    this.UpdateMultiMapIconActive();
  }
  UpdateMultiMapIconActive() {
    var t,
      i = this.LayoutContext.MarkItem.ShowSecondaryUiMultiMapIcon();
    i
      ? ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH,
        )),
        this.UpdateDownStateIcon(i, t))
      : this.UpdateDownStateIcon(i);
  }
  UpdateDownStateIcon(t, i) {
    this.GetSprite(23).SetUIActive(t),
      t &&
        !StringUtils_1.StringUtils.IsEmpty(i) &&
        this.SetSpriteByPath(i, this.GetSprite(23), !1);
  }
  HandleTeleportAndTrack() {
    this.HandleTeleport() || this.HandleTrack();
  }
  HandleTeleport() {
    var t = this.LayoutContext.MarkItem;
    return (
      !!t &&
      !t.IsLocked &&
      (MapLogger_1.MapLogger.Debug(
        63,
        "[地图系统]->传送",
        ["markId", t.MarkId],
        ["IsTracked", t.IsTracked],
      ),
      WorldMapController_1.WorldMapController.TryTeleport(t.MarkConfigId),
      !0)
    );
  }
  HandleTrack() {
    var t = this.LayoutContext.MarkItem;
    t &&
      (this.CheckAndShowCrossMapTips(t),
      MapLogger_1.MapLogger.Debug(
        63,
        "[地图系统]->追踪",
        ["markId", t.MarkId],
        ["IsTracked", t.IsTracked],
      ),
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: t.MarkType,
        MarkId: t.MarkId,
        Track: !t.IsTracked,
      }),
      this.Close());
  }
  HandleQuickGoto() {
    var t = this.LayoutContext.MarkItem,
      i = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, t);
    i &&
      MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(t, i, () => {
        this.Close();
      });
  }
}
exports.WorldMapSecondaryUiLayoutA = WorldMapSecondaryUiLayoutA;
//# sourceMappingURL=WorldMapSecondaryUiLayoutA.js.map
