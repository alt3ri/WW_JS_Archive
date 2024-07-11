"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueInfoSpecialView = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoguelikeSelectSpecialItem_1 = require("./RoguelikeSelectSpecialItem");
class RogueInfoSpecialView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Bao = void 0),
      (this.UiViewSequence = void 0),
      (this.bao = () =>
        new RoguelikeSelectSpecialItem_1.RoguelikeSelectSpecialItem(this.qao)),
      (this.qao = (e, i) => {
        e.SetSelect(!1),
          UiManager_1.UiManager.OpenView("RoguelikeSpecialDetailView", i);
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
    this.Bao = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.bao,
    );
  }
  Refresh(e) {
    this.Bao.RefreshByData(e);
  }
}
exports.RogueInfoSpecialView = RogueInfoSpecialView;
// # sourceMappingURL=RogueInfoSpecialView.js.map
