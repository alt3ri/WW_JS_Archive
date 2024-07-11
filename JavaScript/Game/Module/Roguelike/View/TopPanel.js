"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopPanel = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeController_1 = require("../RoguelikeController");
class TopPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.nVt = void 0),
      (this.CloseCallback = void 0),
      (this.Xno = () => {
        this.CloseCallback?.();
      }),
      (this.Gho = (e) => {
        ModelManager_1.ModelManager.RoguelikeModel.UpdateDescModel(e === 1);
      }),
      (this.Nho = () => {
        RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIExtendToggle],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.Xno],
        [2, this.Gho],
        [4, this.Nho],
      ]);
  }
  OnStart() {
    (this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.nVt.SetCloseBtnActive(!1),
      this.nVt.SetHelpBtnActive(!1);
  }
  OnBeforeShow() {
    this.RefreshTabBtn();
  }
  RefreshTabBtn() {
    const e =
      ModelManager_1.ModelManager.RoguelikeModel.GetDescModel() === 0 ? 1 : 0;
    this.GetExtendToggle(2)?.SetToggleState(e, !0);
  }
  OnBeforeDestroy() {
    this.CloseCallback = void 0;
  }
  RefreshTitle(e) {
    this.nVt.SetTitleByTextIdAndArgNew(e);
  }
  async RefreshCurrency(e) {
    return this.nVt.SetCurrencyItemList(e);
  }
  RefreshSelectTipsText(e, t = !1, ...i) {
    t
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e, ...i)
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e, ...i);
  }
  EmptySelectTipsText() {
    this.GetText(5).SetText("");
  }
  GetCostItemByIndex(e) {
    const t = this.nVt?.GetCurrencyItemList();
    if (t && t.length > e) return t[e].GetRootItem();
  }
}
exports.TopPanel = TopPanel;
// # sourceMappingURL=TopPanel.js.map
