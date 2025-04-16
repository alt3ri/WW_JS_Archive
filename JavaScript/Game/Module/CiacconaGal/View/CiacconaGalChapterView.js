"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalChapterView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  CiacconaGalDefine_1 = require("../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../CiacconaGalTextConfig"),
  CiacconaGalChapterRestartPanel_1 = require("./CiacconaGalChapterRestartPanel"),
  CiacconaGalChapterResultOrInitPanel_1 = require("./CiacconaGalChapterResultOrInitPanel"),
  CiacconaGalTitleItem_1 = require("./CiacconaGalTitleItem");
class CiacconaGalChapterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IPc = void 0),
      (this.APc = void 0),
      (this.PPc = void 0),
      (this.Qyi = void 0),
      (this.l4c = void 0),
      (this.xPc = () => {
        this.IPc.IsFinished
          ? (this.APc.SetActive(!1), this.PPc.SetActive(!0))
          : ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenGalViewByChapterId(
              this.IPc.Id,
              "CiacconaGalChapterView",
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.IPc = this.OpenParam),
      this.SetTextureByPath(this.IPc.ImageLargePath, this.GetTexture(2)),
      (this.APc =
        new CiacconaGalChapterResultOrInitPanel_1.CiacconaGalChapterResultOrInitPanel(
          this.IPc,
          this.xPc,
        )),
      (this.PPc =
        new CiacconaGalChapterRestartPanel_1.CiacconaGalChapterRestartPanel(
          this.IPc,
        )),
      (this.Qyi = new PopupCaptionItem_1.PopupCaptionItem()),
      (this.l4c = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(
        ModelManager_1.ModelManager.CiacconaGalModel.ActivityData,
      ));
    var e = [],
      e =
        (e.push(this.APc.CreateByActorAsync(this.GetItem(3).GetOwner())),
        e.push(this.PPc.CreateByActorAsync(this.GetItem(4).GetOwner())),
        e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
        await Promise.all(e),
        await this.l4c.CreateThenShowByResourceIdAsync(
          "PnlTimeInfo",
          this.Qyi.GetToggleRootItem(),
        ),
        this.APc.SetActive(!0),
        this.PPc.SetActive(!1),
        this.Qyi.SetCloseCallBack(() => {
          this.CloseMe();
        }),
        CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
          CiacconaGalDefine_1.TEXT_ID_CIACCONA_RESTART_TITLE,
        ));
    this.Qyi.SetTitleByTextIdAndArgNew(e);
  }
}
exports.CiacconaGalChapterView = CiacconaGalChapterView;
//# sourceMappingURL=CiacconaGalChapterView.js.map
