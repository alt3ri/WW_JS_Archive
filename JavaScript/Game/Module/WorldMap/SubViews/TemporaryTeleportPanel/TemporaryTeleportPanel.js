"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemporaryTeleportPanel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonAndTextItem_1 = require("../../../Common/Button/ButtonAndTextItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine");
class TemporaryTeleportPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.wAt = void 0),
      (this.mFo = void 0),
      (this.dFo = () => {
        MapController_1.MapController.RequestTeleportToTargetByTemporaryTeleport(
          this.u2o.TeleportId,
        ),
          this.Close();
      }),
      (this.CFo = () => {
        MapController_1.MapController.RequestRemoveDynamicMapMark(
          this.u2o.MarkId,
        ),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiItem_TemporaryTeleportPanel_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoB;
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.wAt = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(8))),
      this.wAt.BindCallback(this.dFo),
      (this.mFo = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(7))),
      this.mFo.BindCallback(this.CFo);
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
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetText(2).SetText(this.u2o.GetDescText()),
      this.GetText(3).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.l_i();
  }
  l_i() {
    this.mFo.SetText(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "Text_TeleportDelete_Text",
      ),
    );
    var e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
        "TeleportFastMove",
      );
    this.wAt.SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
        ? this.mFo.SetActive(
            ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
          )
        : this.mFo.SetActive(!0),
      this.wAt.RefreshEnable(!this.u2o.IsServerDisable);
  }
}
exports.TemporaryTeleportPanel = TemporaryTeleportPanel;
//# sourceMappingURL=TemporaryTeleportPanel.js.map
