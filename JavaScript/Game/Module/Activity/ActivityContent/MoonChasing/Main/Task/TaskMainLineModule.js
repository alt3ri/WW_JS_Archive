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
        var e,
          i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
            this.Data.TaskId,
          );
        0 === i
          ? ((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              this.Data.UnlockTip,
            )),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e))
          : 3 !== i &&
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
    var e =
      ModelManager_1.ModelManager.MoonChasingModel.CheckQuestIdRedDotState(
        this.Data.TaskId,
      );
    this.GetItem(4).SetUIActive(e);
  }
  SetData(e, i) {
    (this.Data = e), (this.Xy = i);
  }
  RefreshName() {
    var e = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(
      this.Data.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TaskName),
      this.GetText(7)?.SetText((this.Xy + 1).toString());
  }
  RefreshState() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
      this.Data.TaskId,
    );
    this.GetItem(2).SetUIActive(0 === e),
      this.GetItem(1).SetUIActive(3 === e),
      0 === e
        ? this.GetTexture(5).SetColor(UE.Color.FromHex("#8C836DFF"))
        : this.GetTexture(5).SetColor(UE.Color.FromHex("#FFFFFFFF"));
    for (const t of [8, 9, 10]) {
      var i = this.GetTexture(t);
      i.SetChangeColor(0 === e, i.changeColor);
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
  SetData(e, i) {
    this.Data = e;
  }
  RefreshName() {
    var e = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(
      this.Data.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TaskName);
  }
  RefreshState() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
      this.Data.TaskId,
    );
    this.GetItem(2).SetUIActive(0 === e),
      this.GetItem(1).SetUIActive(3 === e),
      0 === e
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
class TaskMainLineModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.wno = []), (this.k0a = 0);
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
    ];
  }
  OnStart() {}
  async OnBeforeShowAsyncImplement() {
    var i,
      t = [],
      s = ConfigManager_1.ConfigManager.TaskConfig.GetAllMainLineTask();
    for (let e = 0; e < s.length; e++)
      this.wno[e] ||
        (0 === s[e].TaskType
          ? (this.wno[e] = new MainLineItem())
          : (this.wno[e] = new MainLineBranchItem()),
        this.wno[e].SetData(s[e], e),
        t.push(
          this.wno[e].CreateThenShowByActorAsync(
            this.GetItem(e + 1).GetOwner(),
          ),
        )),
        5 === e &&
          ((i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
            s[e].TaskId,
          )),
          this.GetItem(9).SetUIActive(3 === i));
    await Promise.all(t);
    var e = s.findIndex((e) => e.Id === this.k0a);
    0 <= e &&
      this.GetScrollViewWithScrollbar(0).ScrollTo(this.wno[e].GetRootItem());
  }
  SetSelectTaskId(e) {
    this.k0a = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i;
    if (!(this.wno.length < 1)) return [(i = this.wno[0].GetRootItem()), i];
  }
}
exports.TaskMainLineModule = TaskMainLineModule;
//# sourceMappingURL=TaskMainLineModule.js.map
