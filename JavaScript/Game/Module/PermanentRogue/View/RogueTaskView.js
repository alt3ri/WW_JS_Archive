"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueTaskView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  RogueResTaskThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTaskThemeById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueResOutDefine_1 = require("../Define/RogueResOutDefine"),
  RogueTaskItem_1 = require("./RogueTaskItem"),
  RogueTaskRoleItem_1 = require("./RogueTaskRoleItem"),
  RogueTaskTabItem_1 = require("./RogueTaskTabItem"),
  MAX_ROLE_COUNT = 3;
class RogueTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabLayout = void 0),
      (this.CurrentTypeIndex = 1),
      (this.TabTypeList = []),
      (this.ScrollView = void 0),
      (this.lqe = void 0),
      (this.ypt = []),
      (this.GOe = void 0),
      (this.Ftl = ""),
      (this.qKs = []),
      (this.fqe = () => new RogueTaskTabItem_1.RogueTaskTabItem()),
      (this.ou_ = () => new RogueTaskItem_1.RogueTaskItem()),
      (this.UVc = (i) => {
        for (let e = 0; e < this.TabTypeList.length; e++)
          this.TabLayout.GetLayoutItemByIndex(e).SetToggleState(
            i === this.TabTypeList[e],
            !1,
          );
        (this.CurrentTypeIndex = i), this.Esi(this.CurrentTypeIndex);
      }),
      (this.Q5c = () => {
        this.TabLayout.GetLayoutItemByIndex(
          this.TabTypeList.indexOf(this.CurrentTypeIndex),
        ).RefreshRedDot(),
          this.Esi(this.CurrentTypeIndex);
      }),
      (this._6c = () => {
        var e =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
        this.CloseMe(),
          UiManager_1.UiManager.IsViewOpen("RogueSeasonEntranceView")
            ? UiManager_1.UiManager.NormalResetToView("RogueSeasonEntranceView")
            : UiManager_1.UiManager.OpenView("RogueSeasonEntranceView", e);
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.kOe = () => {
        this.gxl();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
    ]),
      (this.BtnBindInfo = [[6, this._6c]]);
  }
  OnStart() {
    (this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "ActivityRemainingTime",
    )),
      this.gxl(),
      (this.TabLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.fqe,
      )),
      (this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(3),
        this.ou_,
      )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.Awe),
      this.lqe.SetHelpBtnActive(!1);
  }
  OnBeforeDestroy() {
    (this.lqe = void 0), (this.ScrollView = void 0), (this.TabLayout = void 0);
  }
  async OnBeforeShowAsyncImplement() {
    await this.c6c(),
      await this.TabLayout.RefreshByDataAsync(this.cOn()).then(() => {
        this.UVc(this.CurrentTypeIndex);
      });
  }
  OnBeforeShow() {
    (this.GOe = TimerSystem_1.TimerSystem.Forever(
      this.kOe,
      TimeUtil_1.TimeUtil.InverseMillisecond,
    )),
      this.kOe();
  }
  OnAfterHide() {
    TimerSystem_1.TimerSystem.Has(this.GOe) &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.Q5c,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.Q5c,
    );
  }
  async c6c() {
    var i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskRoleList(),
      t = [7, 8, 9];
    if (i.length === MAX_ROLE_COUNT) {
      var s = [];
      for (let e = 0; e < i.length; e++) {
        var r = new RogueTaskRoleItem_1.RogueTaskRoleItem(i[e], !1);
        this.qKs.push(r),
          s.push(r.CreateThenShowByActorAsync(this.GetItem(t[e]).GetOwner()));
      }
      await Promise.all(s);
    }
  }
  cOn() {
    var e,
      i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData(),
      t = RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(
        i.GetTaskThemeId(),
      ),
      s = [];
    this.TabTypeList = [];
    for (const r of t.TabNames)
      0 !== i.GetTaskListByType(r[0]).length &&
        (((e = new RogueResOutDefine_1.RogueTaskRewardTabData()).NameTextId =
          r[1]),
        (e.Index = r[0]),
        (e.ClickedCallback = this.UVc),
        (e.RefreshRedDot = (e) =>
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckTaskRedDot(
            e,
          )),
        s.push(e),
        this.TabTypeList.push(e.Index));
    return (
      (this.CurrentTypeIndex =
        0 < this.TabTypeList.length ? this.TabTypeList[0] : -1),
      s
    );
  }
  Esi(e) {
    (this.ypt.length = 0),
      (this.ypt =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskDataListById(
          e,
        ).sort(
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.SortTaskData,
        )),
      this.ScrollView.RefreshByDataAsync(this.ypt, !0);
    e =
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskProgressByType(
        this.TabTypeList[e - 1],
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(5),
      "RogueRes_Task_Progress",
      e.toFixed(0),
    );
  }
  gxl() {
    var e = MathUtils_1.MathUtils.LongToNumber(
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskEndTime(),
      ),
      e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
        e,
        this.Ftl,
      ),
      i = this.GetText(10);
    i?.SetUIActive(void 0 !== e), i?.SetText(e ?? "0");
  }
}
exports.RogueTaskView = RogueTaskView;
//# sourceMappingURL=RogueTaskView.js.map
