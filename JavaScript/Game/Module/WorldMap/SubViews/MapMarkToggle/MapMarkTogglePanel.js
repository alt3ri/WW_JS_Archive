"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapMarkTogglePanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  MapMarkToggleItem_1 = require("../MapMarkToggle/MapMarkToggleItem");
class MapMarkTogglePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.zJa = void 0),
      (this.bNl = void 0),
      (this.qNl = () => {
        return ModelManager_1.ModelManager.WorldMapModel.CustomMarksIsShow
          ? 1
          : 0;
      }),
      (this.GNl = (e) =>
        ModelManager_1.ModelManager.WorldMapModel.SetCustomMarksShow(1 === e)),
      (this.kNl = () => {
        return ModelManager_1.ModelManager.WorldMapModel
          .CompletedPlayPointMarkIsShow
          ? 1
          : 0;
      }),
      (this.ONl = (e) =>
        ModelManager_1.ModelManager.WorldMapModel.SetCompletedPlayPointMarkShow(
          1 === e,
        ));
  }
  GetResourceId() {
    return "UiView_MapPopupAssistant";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.Close),
      (this.bNl = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        () => new MapMarkToggleItem_1.MapMarkToggleItem(),
      )),
      await this.bNl.RefreshByDataAsync(this.NNl());
  }
  OnShowWorldMapSecondaryUi() {}
  OnCloseWorldMapSecondaryUi() {}
  OnBeforeDestroy() {
    (this.zJa = void 0), (this.bNl = void 0);
  }
  GetNeedBgItem() {
    return !0;
  }
  NNl() {
    var e = [];
    return (
      e.push({
        NameId: "CustomMark_Text",
        GetToggleResultCallback: this.qNl,
        SetToggleStateCallback: this.GNl,
      }),
      e.push({
        NameId: "CompletedGamePlayPoints_Text",
        GetToggleResultCallback: this.kNl,
        SetToggleStateCallback: this.ONl,
      }),
      e
    );
  }
}
exports.MapMarkTogglePanel = MapMarkTogglePanel;
//# sourceMappingURL=MapMarkTogglePanel.js.map
