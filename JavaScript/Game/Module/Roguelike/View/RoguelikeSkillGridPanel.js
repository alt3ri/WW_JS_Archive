"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSkillGridPanel = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoguelikeSkillNode_1 = require("./RoguelikeSkillNode");
class RoguelikeSkillGridPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.NodeMap = []),
      (this.NodeDataList = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  GetNodeByPos(e) {
    return this.NodeMap[e];
  }
  OnStart() {}
  BuildNode() {
    for (const i of this.NodeDataList) {
      const e = this.GetItem(0 + i.Row);
      const s = new RoguelikeSkillNode_1.RoguelikeSkillNode(
        e,
        i,
        this.RootItem,
      );
      (this.NodeMap[i.Row] = s)
        .CreateThenShowByResourceIdAsync("RoguelikeSkillNodeB", e)
        .then(() => {
          s.Refresh();
        });
    }
  }
  Refresh(e, i, s) {
    (this.NodeDataList = e), this.BuildNode();
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, i) {}
}
exports.RoguelikeSkillGridPanel = RoguelikeSkillGridPanel;
// # sourceMappingURL=RoguelikeSkillGridPanel.js.map
