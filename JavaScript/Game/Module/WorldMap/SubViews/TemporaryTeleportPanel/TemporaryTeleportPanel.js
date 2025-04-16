"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemporaryTeleportPanel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  WorldMapSecondaryUiLayoutB_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutB");
class TemporaryTeleportPanel extends WorldMapSecondaryUiLayoutB_1.WorldMapSecondaryUiLayoutB {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.OnMiddleCenterBtnClick = () => {
        MapController_1.MapController.RequestTeleportToTargetByTemporaryTeleport(
          this.u2o.TeleportId,
        ),
          this.Close();
      }),
      (this.OnDelBtnClick = () => {
        this.ySc();
      }),
      (this.SSc = () => {
        ControllerHolder_1.ControllerHolder.MapExploreToolController.RemoveTemporaryTeleportRequest(
          this.u2o.TeleportId,
          this.u2o.MarkId,
        ),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiItem_TemporaryTeleportPanel_Prefab";
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1), super.OnStart();
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.u2o = e),
      this.GetText(1).SetText(
        StringUtils_1.StringUtils.Format(
          "{0}{1}/{2}",
          this.u2o.GetTitleText(),
          ModelManager_1.ModelManager.MapModel.GetMarkCountByType(
            15,
          ).toString(),
          CommonParamById_1.configCommonParamById
            .GetIntConfig("TemporaryTeleportCountLimit")
            .toString(),
        ),
      ),
      this.RightConfirmBtn.SetUiActive(!1),
      this.LeftConfirmBtn.SetUiActive(!1),
      this.MiddleCenterBtn.SetUiActive(!0),
      this.SetDelBtnActive(!0),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetText(2).SetText(this.u2o.GetDescText()),
      this.GetText(3).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.l_i(),
      this.MSc();
  }
  ySc() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(263);
    e.FunctionMap.set(2, this.SSc),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  l_i() {
    this.MiddleCenterBtn.SetLocalText("TeleportFastMove"),
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
        ? this.SetDelBtnActive(
            ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
          )
        : this.SetDelBtnActive(!0),
      this.MiddleCenterBtn.SetEnableClick(!this.u2o.IsServerDisable);
  }
  MSc() {
    var e = this.u2o.ShowSecondaryUiMultiMapIcon(),
      e =
        (this.GetSprite(11).SetUIActive(!0),
        e
          ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH
          : WorldMapDefine_1.TEMPORARY_TELEPORT_NORMAL_ICON_PATH),
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(e, this.GetSprite(11), !1);
  }
}
exports.TemporaryTeleportPanel = TemporaryTeleportPanel;
//# sourceMappingURL=TemporaryTeleportPanel.js.map
