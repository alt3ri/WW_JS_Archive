"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestChapterItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  QuestItem_1 = require("./QuestItem");
class QuestChapterItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.QuestList = void 0),
      (this.pro = 0),
      (this.vro = void 0);
  }
  Init(t, e, i, s, r) {
    this.CreateThenShowByActor(t.GetOwner()),
      t.SetActive(!0),
      (this.vro = r),
      (this.QuestList = []),
      this.UpdateItem(e, i, s),
      this.Mro();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UISprite],
      [6, UE.UISprite],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(!1);
  }
  OnTick(t) {
    if (this.QuestList) for (const e of this.QuestList) e.OnTick(t);
  }
  UpdateItem(t, i, s) {
    this.pro = t;
    var r,
      t =
        ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(i);
    StringUtils_1.StringUtils.IsEmpty(t?.QuestChapterBg) ||
      this.SetSpriteByPath(t.QuestChapterBg, this.GetSprite(5), !1);
    {
      let e = 0;
      for (const h of s) {
        let t = void 0;
        e < this.QuestList.length
          ? (t = this.QuestList[e])
          : ((r = LguiUtil_1.LguiUtil.CopyItem(
              this.GetItem(2),
              this.GetItem(2).GetParentAsUIItem(),
            )),
            (t = new QuestItem_1.QuestItem(this.vro)).SetRootActor(
              r.GetOwner(),
              !0,
            ),
            this.QuestList.push(t)),
          t.UpdateItem(h, i),
          e++;
      }
    }
    this.QuestList.forEach((t, e) => {
      t.SetActiveItem(e < s.length);
    }),
      this.Sro();
  }
  FindByQuestId(e) {
    return this.QuestList.find((t) => t.QuestId === e);
  }
  Sro() {
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetChapterConfig(
        this.pro,
      ),
      e =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterName) ??
        "",
      e =
        (this.GetText(0).SetText(e),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterNum)),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SectionNum);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "QuestChapterText", e, t);
  }
  Mro() {
    var t = this.GetExtendToggle(4);
    t.SetToggleState(1),
      t.OnStateChange.Add((t) => {
        1 === t
          ? this.GetItem(3).SetUIActive(!0)
          : this.GetItem(3).SetUIActive(!1);
      });
  }
  SetSelected(t) {
    t && this.GetExtendToggle(4).SetToggleState(1, !0),
      this.GetSprite(6)?.SetUIActive(t);
  }
}
exports.QuestChapterItem = QuestChapterItem;
//# sourceMappingURL=QuestChapterItem.js.map
