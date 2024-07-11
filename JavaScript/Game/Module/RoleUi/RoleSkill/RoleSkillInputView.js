"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillInputView = void 0);
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleSkillInputPanel_1 = require("./RoleSkillInputPanel");
class RoleSkillInputView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pco = void 0),
      (this.lqe = void 0),
      (this.i2e = () => {
        UiManager_1.UiManager.CloseView("RoleSkillInputView");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.Pco = new RoleSkillInputPanel_1.RoleSkillInputPanel();
    const e = this.GetItem(1).GetOwner();
    await this.Pco.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    const e = this.OpenParam;
    this.Pco.RefreshUi(e),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.i2e);
  }
}
exports.RoleSkillInputView = RoleSkillInputView;
// # sourceMappingURL=RoleSkillInputView.js.map
