"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalChapterRestartPanel = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../CiacconaGalTextConfig");
class CiacconaGalChapterRestartChoiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.eTt = () => {
        1 === this.Pe.Type
          ? ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenGalViewByStepId(
              this.Pe.ChapterData.BranchingStepId,
              this.Pe.ChapterData.Id,
              "CiacconaGalChapterView",
            )
          : ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenGalViewByChapterId(
              this.Pe.ChapterData.Id,
              "CiacconaGalChapterView",
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Refresh(e) {
    (this.Pe = e),
      this.GetSprite(1).SetUIActive(1 === this.Pe.Type),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Pe.Desc);
  }
}
class CiacconaGalChapterRestartPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.IPc = e),
      (this.eGe = void 0),
      (this.TPc = () => {
        return new CiacconaGalChapterRestartChoiceItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.TPc,
    );
    var e = {
        Type: 0,
        Desc: CiacconaGalDefine_1.TEXT_CIACCONA_BTN_RESTART_FROM_BEGINNING,
        ChapterData: this.IPc,
      },
      t = {
        Type: 1,
        Desc: CiacconaGalDefine_1.TEXT_CIACCONA_BTN_RESTART_FROM_BRANCHING,
        ChapterData: this.IPc,
      },
      t =
        (this.eGe.RefreshByData([t, e]),
        CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
          CiacconaGalDefine_1.TEXT_ID_CIACCONA_RESTART_INTERNAL_TITLE,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
  }
}
exports.CiacconaGalChapterRestartPanel = CiacconaGalChapterRestartPanel;
//# sourceMappingURL=CiacconaGalChapterRestartPanel.js.map
