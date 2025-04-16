"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTopPanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleTopPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.n6t = void 0),
      (this.CloseCallback = void 0),
      (this.ClickDetailCallback = void 0),
      (this.jso = () => {
        this.CloseCallback?.();
      }),
      (this.Blo = (e) => {
        ModelManager_1.ModelManager.RogueBattleModel?.ChangeDescMode();
      }),
      (this.blo = () => {
        this.ClickDetailCallback?.();
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
    var e = 0 === ModelManager_1.ModelManager.RogueBattleModel.DescMode ? 1 : 0;
    this.GetExtendToggle(2)?.SetToggleState(e, !1);
  }
  OnBeforeDestroy() {
    this.CloseCallback = void 0;
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
  SetCloseBtnActive(e) {
    this.n6t?.SetCloseBtnActive(e), this.GetButton(1).RootUIComp.SetUIActive(e);
  }
}
exports.RogueBattleTopPanel = RogueBattleTopPanel;
//# sourceMappingURL=RogueBattleTopPanel.js.map
