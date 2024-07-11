"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopPanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeController_1 = require("../RoguelikeController");
class TopPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.n6t = void 0),
      (this.CloseCallback = void 0),
      (this.jso = () => {
        this.CloseCallback?.();
      }),
      (this.Blo = (e) => {
        ModelManager_1.ModelManager.RoguelikeModel.UpdateDescModel(1 === e);
      }),
      (this.blo = () => {
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
        [1, this.jso],
        [2, this.Blo],
        [4, this.blo],
      ]);
  }
  OnStart() {
    (this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.n6t.SetCloseBtnActive(!1),
      this.n6t.SetHelpBtnActive(!1);
  }
  OnBeforeShow() {
    this.RefreshTabBtn();
  }
  RefreshTabBtn() {
    var e =
      0 === ModelManager_1.ModelManager.RoguelikeModel.GetDescModel() ? 1 : 0;
    this.GetExtendToggle(2)?.SetToggleState(e, !0);
  }
  OnBeforeDestroy() {
    this.CloseCallback = void 0;
  }
  RefreshTitle(e) {
    this.n6t.SetTitleByTextIdAndArgNew(e);
  }
  async RefreshCurrency(e) {
    return this.n6t.SetCurrencyItemList(e);
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
    var t = this.n6t?.GetCurrencyItemList();
    if (t && t.length > e) return t[e].GetRootItem();
  }
}
exports.TopPanel = TopPanel;
//# sourceMappingURL=TopPanel.js.map
