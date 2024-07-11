"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChapterDivideFloatTips = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  QuestChapterById_1 = require("../../../../Core/Define/ConfigQuery/QuestChapterById"),
  GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class ChapterDivideFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments),
      (this.aJt = void 0),
      (this.hJt = () => {
        this.CloseMe((t) => {
          t && this.Data.CloseCallback?.();
        });
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, UE.UIText]),
      this.ComponentRegisterInfos.push([3, UE.UITexture]),
      this.ComponentRegisterInfos.push([4, UE.UIButtonComponent]),
      this.BtnBindInfo.push([4, this.hJt]);
  }
  lJt() {
    this.RootItem.SetAlpha(1),
      this.MainText.GetParentAsUIItem().GetParentAsUIItem().SetAlpha(1);
  }
  OnAfterShow() {
    this.lJt(), this.GetButton(4)?.RootUIComp.SetRaycastTarget(!0);
  }
  _Jt(t) {
    (this.aJt = QuestChapterById_1.configQuestChapterById.GetConfig(t)),
      this.aJt ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 11, "策划的章节Id配错了！！", [
            "错误的章节Id",
            t,
          ]));
  }
  SetExtraText(...t) {
    var e = t[0];
    this._Jt(e),
      this.aJt &&
        this.SetTextureByPath(this.aJt.ChapterIcon, this.GetTexture(3)),
      this.aJt &&
        this.ExtraText.SetText(this.CombineChapterExtraText(this.aJt)),
      1 < t.length && ((e = t[1]), this.GetText(2)?.SetText(e));
  }
  OnBeforeShow() {
    var t;
    this.GetButton(4)?.RootUIComp.SetRaycastTarget(!1),
      ("ChapterEndFloatTips" !== this.Info.Name &&
        "FlowChapterEndTips" !== this.Info.Name) ||
        (((t = this.OpenParam).StartSequenceName = "Accomplish"),
        this.UiViewSequence?.SetSequenceName(t));
  }
  CombineChapterExtraText(t) {
    return (
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterNum) +
      "·" +
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SectionNum)
    );
  }
}
exports.ChapterDivideFloatTips = ChapterDivideFloatTips;
//# sourceMappingURL=ChapterDivideFloatTips.js.map
