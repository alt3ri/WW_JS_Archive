"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  PunishReportTargetListPanel_1 = require("./PunishReportTargetListPanel");
class PunishReportPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.z7a = void 0),
      (this.OnConfirmBtnClick = () => {
        this.HandleTeleport();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  OnStart() {
    (this.z7a =
      new PunishReportTargetListPanel_1.PunishReportTargetListPanel()),
      this.z7a.Initialize(this.GetVerticalLayout(16)),
      super.OnStart();
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(r) {
    var e;
    28 === r.MarkType &&
      (this.SetActive(!1),
      (e = r.MarkConfig.RelativeDungeonId),
      (r = r.MarkConfig.RelativeId),
      await ControllerHolder_1.ControllerHolder.LevelPlayReportController.CheckAndRequestLevelPlayVarAsync(
        e,
        r,
      ));
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(r) {
    (this.u2o = r),
      (this.LayoutContext.MarkItem = r),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
        this.LayoutContext,
      );
    var r = this.u2o.MarkConfigId,
      e = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(r);
    e
      ? ((e = e.MarkDesc.split("|")[this.u2o.IsPunishReportFinish() ? 1 : 0]),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
          this.LayoutContext,
        ),
        this.UpdateMultiMap(),
        this.UpdateTopRightIconActive(),
        this.UpdateHidePlayMapTipPanel(),
        (e = this.UpdateQuickGoto()),
        this.ConfirmButton.SetActive(!e),
        this.GetVerticalLayout(16).RootUIComp.SetUIActive(!0),
        (e = this.u2o.CanGetReward()),
        this.GetItem(25).SetUIActive(e),
        e &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(30),
            "DarkShoreBossRewardNotGet",
          ),
        this.v4e())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 63, "缺少标记配置", ["MarkId", r]);
  }
  v4e() {
    var e = this.u2o.GetPunishReportTarget();
    for (let r = 0; r < e.States.length; ++r) {
      var t = e.States[r],
        o = e.ConditionTxtIds[r],
        a = this.z7a.AddItemByKey("Target_" + r),
        o = (a.SetDescLocalNewTxt(o), a.SetNumTxt("x1"), 1 === t ? 2 : 0);
      a.SetState(o);
    }
  }
  OnBeforeDestroy() {
    this.z7a.Clear(), super.OnBeforeDestroy();
  }
}
exports.PunishReportPanel = PunishReportPanel;
//# sourceMappingURL=PunishReportPanel.js.map
