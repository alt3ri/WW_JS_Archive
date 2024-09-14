"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskMainLineModule = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MainLineItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.Xy = 0),
      (this.OnSkipToTask = () => {
        var i,
          t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
            this.Data.TaskId,
          );
        0 === t
          ? ((i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              this.Data.UnlockTip,
            )),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i))
          : 3 !== t &&
            (ModelManager_1.ModelManager.MoonChasingModel.ReadQuestIdUnlockFlag(
              this.Data.TaskId,
            ) && this.RefreshRedDot(),
            ControllerHolder_1.ControllerHolder.QuestNewController.TryTrackAndOpenWorldMap(
              this.Data.TaskId,
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [5, UE.UITexture],
      [4, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[3, this.OnSkipToTask]]);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  RefreshRedDot() {
    var i =
      ModelManager_1.ModelManager.MoonChasingModel.CheckQuestIdRedDotState(
        this.Data.TaskId,
      );
    this.GetItem(4).SetUIActive(i);
  }
  SetData(i, t) {
    (this.Data = i), (this.Xy = t);
  }
  RefreshName() {
    var i = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(
      this.Data.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskName),
      this.GetText(7)?.SetText((this.Xy + 1).toString());
  }
  RefreshState() {
    var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
      this.Data.TaskId,
    );
    this.GetItem(2).SetUIActive(0 === i),
      this.GetItem(1).SetUIActive(3 === i),
      0 === i
        ? this.GetTexture(5).SetColor(UE.Color.FromHex("#8C836DFF"))
        : this.GetTexture(5).SetColor(UE.Color.FromHex("#FFFFFFFF"));
    for (const e of [8, 9, 10]) {
      var t = this.GetTexture(e);
      t.SetChangeColor(0 === i, t.changeColor);
    }
  }
  RefreshImage() {
    StringUtils_1.StringUtils.IsEmpty(this.Data.Icon) ||
      this.SetTextureByPath(this.Data.Icon, this.GetTexture(5));
  }
  IsPrevTaskActive() {
    return (
      0 === this.Data.PrevTaskId ||
      0 !==
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
          this.Data.PrevTaskId,
        )
    );
  }
  Refresh() {
    this.RefreshName(),
      this.IsPrevTaskActive()
        ? (this.RefreshState(), this.RefreshImage(), this.RefreshRedDot())
        : this.SetActive(!1);
  }
}
class MainLineBranchItem extends MainLineItem {
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [5, UE.UITexture],
      [4, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.OnSkipToTask]]);
  }
  SetData(i, t) {
    this.Data = i;
  }
  RefreshName() {
    var i = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(
      this.Data.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskName);
  }
  RefreshState() {
    var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
      this.Data.TaskId,
    );
    this.GetItem(2).SetUIActive(0 === i),
      this.GetItem(1).SetUIActive(3 === i),
      0 === i
        ? this.GetTexture(5).SetColor(UE.Color.FromHex("#8C836DFF"))
        : this.GetTexture(5).SetColor(UE.Color.FromHex("#FFFFFFFF"));
  }
  Refresh() {
    this.RefreshName(),
      this.IsPrevTaskActive()
        ? (this.RefreshState(), this.RefreshImage(), this.RefreshRedDot())
        : this.SetActive(!1);
  }
}
const QUEST_ON_MAINLINE_LAST_INDEX = 5;
class TaskMainLineModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wno = []),
      (this.hMa = 0),
      (this.RNa = !1),
      (this.Lbt = !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIHorizontalLayout],
    ];
  }
  OnStart() {}
  async OnBeforeShowAsyncImplement() {
    var t,
      e = [],
      s = ConfigManager_1.ConfigManager.TaskConfig.GetAllMainLineTask();
    for (let i = 0; i < s.length; i++)
      this.wno[i] ||
        (0 === s[i].TaskType
          ? (this.wno[i] = new MainLineItem())
          : (this.wno[i] = new MainLineBranchItem()),
        this.wno[i].SetData(s[i], i),
        e.push(
          this.wno[i].CreateThenShowByActorAsync(
            this.GetItem(i + 1).GetOwner(),
          ),
        )),
        i === QUEST_ON_MAINLINE_LAST_INDEX &&
          ((t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
            s[i].TaskId,
          )),
          this.GetItem(9).SetUIActive(3 === t));
    await Promise.all(e);
    let r = -1;
    if (this.RNa) {
      for (let i = this.wno.length - 1; 0 <= i; i--)
        if (this.wno[i].IsPrevTaskActive()) {
          r = i;
          break;
        }
    } else r = s.findIndex((i) => i.Id === this.hMa);
    if (0 <= r) {
      let i = this.wno[r].GetRootItem();
      1 === s[r].TaskType && (i = this.GetItem(9));
      const h = this.GetHorizontalLayout(10),
        n = this.GetScrollViewWithScrollbar(0);
      h.OnLateUpdate.Bind(() => {
        this.Lbt ? (this.Lbt = !1) : (n?.ScrollTo(i), h?.OnLateUpdate.Unbind());
      });
    }
  }
  SetSelectTaskId(i, t) {
    (this.hMa = i), (this.RNa = t);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t, e;
    if (!(i.length < 2))
      return "Start" === (e = i[1])
        ? this.wno.length < 1
          ? void 0
          : [(t = this.wno[0].GetRootItem()), t]
        : "End" !== e ||
            i.length < 3 ||
            ((t = i[2]),
            (e = this.GetScrollViewWithScrollbar(0)),
            this.wno.length < 1) ||
            ((i = this.wno[this.wno.length - 1]),
            e.ScrollTo(i.GetRootItem()),
            void 0 === (e = this.GetGuideUiItem(t)))
          ? void 0
          : [e, e];
  }
}
exports.TaskMainLineModule = TaskMainLineModule;
//# sourceMappingURL=TaskMainLineModule.js.map
