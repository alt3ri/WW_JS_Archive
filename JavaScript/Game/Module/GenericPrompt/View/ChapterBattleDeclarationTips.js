"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChapterBattleDeclarationTips = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QuestChapterById_1 = require("../../../../Core/Define/ConfigQuery/QuestChapterById"),
  GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class ChapterBattleDeclarationTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments), (this.aJt = void 0);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, UE.UITexture]);
  }
  _Jt(e) {
    (this.aJt = QuestChapterById_1.configQuestChapterById.GetConfig(e)),
      this.aJt ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 65, "策划的章节Id配错了！！", [
            "错误的章节Id",
            e,
          ]));
  }
  SetExtraText(...e) {
    e = e[0];
    this._Jt(e),
      this.aJt &&
        this.SetTextureByPath(this.aJt.ChapterIcon, this.GetTexture(2));
  }
}
exports.ChapterBattleDeclarationTips = ChapterBattleDeclarationTips;
//# sourceMappingURL=ChapterBattleDeclarationTips.js.map
