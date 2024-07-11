"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestTypeItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  QuestChapterItem_1 = require("./QuestChapterItem"),
  QuestItem_1 = require("./QuestItem");
class QuestItemData {
  constructor(t, i) {
    (this.QuestId = t), (this.QuestType = i);
  }
}
class QuestTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Cno = void 0),
      (this.QuestType = 0),
      (this.Pno = void 0),
      (this.xno = void 0),
      (this.wno = void 0),
      (this.Bno = void 0),
      (this.bno = () => {
        var t = this.GetItem(1);
        t.SetUIActive(!t.bIsUIActive);
      });
  }
  Init(t, i, s) {
    (this.QuestType = i),
      (this.Cno = s),
      t.SetUIActive(!0),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.bno]]);
  }
  OnStart() {
    this.GetItem(4).SetUIActive(!0);
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
      this.QuestType,
    );
    StringUtils_1.StringUtils.IsEmpty(t?.TypeColor) ||
      this.GetSprite(7).SetColor(UE.Color.FromHex(t?.TypeColor ?? ""));
    this.GetText(2).SetText(
      ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeName(
        this.QuestType,
      ),
    );
    var i,
      t = t.QuestTypeTitleIcon;
    0 !== t?.length &&
      ((i = this.GetSprite(3)), this.SetSpriteByPath(t, i, !1)),
      (this.Pno = []),
      (this.xno = []),
      this.UpdateList();
  }
  OnTick(t) {
    if (this.xno) for (const i of this.xno) i.OnTick(t);
    if (this.Pno) for (const s of this.Pno) s.OnTick(t);
  }
  UpdateList() {
    this.qno();
    const s = this.wno,
      e = this.Bno;
    let i = 0;
    for (const o of e) {
      let t = void 0;
      var r;
      i < this.xno.length
        ? (t = this.xno[i]).UpdateItem(o.ChapterId, o.QuestType, o.QuestList)
        : ((r = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), this.GetItem(1))),
          (t = new QuestChapterItem_1.QuestChapterItem()).Init(
            r,
            o.ChapterId,
            o.QuestType,
            o.QuestList,
            this.Cno,
          ),
          this.xno.push(t)),
        i++;
    }
    this.xno.forEach((t, i) => {
      t.SetActive(i < e.length);
    }),
      (i = 0);
    for (const a of s) {
      let t = void 0;
      var h;
      i < this.Pno.length
        ? (t = this.Pno[i])
        : ((h = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), this.GetItem(1))),
          (t = new QuestItem_1.QuestItem(this.Cno)).SetRootActor(
            h.GetOwner(),
            !0,
          ),
          this.Pno.push(t)),
        t.UpdateItem(a.QuestId, a.QuestType),
        i++;
    }
    this.Pno.forEach((t, i) => {
      t.SetActiveItem(i < s.length);
    });
  }
  UpdateItem(i) {
    let t = this.Pno.find((t) => t.QuestId === i);
    if (!t)
      for (const e of this.xno) {
        var s = e.FindByQuestId(i);
        if (s) {
          t = s;
          break;
        }
      }
    t && t.UpdateItem(t.QuestId, t.QuestType);
  }
  OnSelect(t) {
    let s = t;
    t || ((t = this.GetDefaultItem()), (s = t?.QuestId ?? 0)),
      this.Pno.forEach((t) => {
        t.SetSelected(t.QuestId === s), t.SetNotAllowNoneSelect();
      });
    for (const e of this.xno) {
      let i = !1;
      e.QuestList.forEach((t) => {
        t.SetSelected(t.QuestId === s),
          t.SetNotAllowNoneSelect(),
          t.QuestId === s && (i = !0);
      }),
        e.SetSelected(i);
    }
  }
  GetDefaultItem() {
    if (0 !== this.Pno.length || 0 !== this.xno.length)
      return (0 !== this.xno.length ? this.xno[0].QuestList : this.Pno)[0];
  }
  IsQuestEmpty() {
    return 0 === this.wno?.length && 0 === this.xno?.length;
  }
  UpdateListTrackState() {
    for (const s of this.Pno) {
      s.UpdateTrackIconActive();
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(s.QuestId);
      t && s.UpdateFunctionIcon(t);
    }
    for (const e of this.xno)
      for (const r of e.QuestList) {
        r.UpdateTrackIconActive();
        var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r.QuestId);
        i && r.UpdateFunctionIcon(i);
      }
  }
  GetQuestItem(i) {
    for (const s of this.xno) {
      var t = s.QuestList.find((t) => t.QuestId === i);
      if (t) return t;
    }
    return this.Pno.find((t) => t.QuestId === i);
  }
  qno() {
    (this.wno = []), (this.Bno = []);
    for (const i of ConfigManager_1.ConfigManager.QuestNewConfig.GetQuesTypesByMainType(
      this.QuestType,
    )) {
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(i.Id);
      if (t) {
        t.sort((t, i) => t.Id - i.Id);
        for (const s of t)
          s.CanShowInUiPanel() &&
            (s.ChapterId
              ? this.Gno(s.ChapterId, s.Type, s.Id)
              : this.wno.push(new QuestItemData(s.Id, s.Type)));
      }
    }
  }
  Gno(t, i, s) {
    for (const e of this.Bno)
      if (e.ChapterId === t) return void e.QuestList.push(s);
    this.Bno.push({ ChapterId: t, QuestType: i, QuestList: [s] });
  }
}
exports.QuestTypeItem = QuestTypeItem;
//# sourceMappingURL=QuestTypeItem.js.map
