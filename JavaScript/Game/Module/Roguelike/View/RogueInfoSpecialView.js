"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueInfoSpecialView = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoguelikeSelectSpecialItem_1 = require("./RoguelikeSelectSpecialItem");
class RogueInfoSpecialView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Aho = void 0),
      (this.UiViewSequence = void 0),
      (this.Pho = () =>
        new RoguelikeSelectSpecialItem_1.RoguelikeSelectSpecialItem(this.xho)),
      (this.xho = (e, i) => {
        e.SetSelect(!1),
          UiManager_1.UiManager.OpenView("RoguelikeSpecialDetailView", [
            i,
            void 0,
          ]);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout]];
  }
  OnBeforeCreateImplement() {
    (this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiViewSequence);
  }
  OnStart() {
    this.Aho = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.Pho,
    );
  }
  Refresh(e) {
    this.Aho.RefreshByData(e);
  }
}
exports.RogueInfoSpecialView = RogueInfoSpecialView;
//# sourceMappingURL=RogueInfoSpecialView.js.map
