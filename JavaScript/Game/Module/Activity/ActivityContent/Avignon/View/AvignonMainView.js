"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonActivityMainView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  AvignonStageItem_1 = require("./Item/AvignonStageItem");
class AvignonActivityMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.AvignonProtocolData = void 0),
      (this.lqe = void 0),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.pcc = () => {
        UiManager_1.UiManager.OpenView(
          "QuestView",
          this.AvignonProtocolData.GetCurrentLockQuestId(),
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.pcc]]);
  }
  async OnBeforeStartAsync() {
    (this.AvignonProtocolData = this.OpenParam),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetTitle(this.AvignonProtocolData.GetTitle()),
      this.lqe.SetHelpBtnActive(!1),
      this.lqe.SetCloseCallBack(this.AMo);
    var e = ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigAll();
    if (e) {
      var t = [];
      for (let i = 0; i < e?.length; i++) {
        var s = new AvignonStageItem_1.AvignonStageItem();
        t.push(
          s.CreateThenShowByActorAsync(this.GetItem(1 + i).GetOwner(), e[i].Id),
        );
      }
      await Promise.all(t);
    }
    var i = this.AvignonProtocolData.IsAllStagesUnlock();
    this.GetButton(4).RootUIComp.SetUIActive(!i);
  }
}
exports.AvignonActivityMainView = AvignonActivityMainView;
//# sourceMappingURL=AvignonMainView.js.map
