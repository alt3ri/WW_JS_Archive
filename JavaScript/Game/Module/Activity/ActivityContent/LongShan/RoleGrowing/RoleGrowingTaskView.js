"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGrowingTaskView = void 0);
const UE = require("ue"),
  LongShanStageById_1 = require("../../../../../../Core/Define/ConfigQuery/LongShanStageById"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  PageDot_1 = require("../../../../Common/PageDot"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityLongShanController_1 = require("../ActivityLongShanController"),
  LongShanTaskItem_1 = require("../LongShanTaskItem");
class RoleGrowingTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.CurrentIndex = 0),
      (this.CaptionItem = void 0),
      (this.PageDotLayout = void 0),
      (this.TaskScroll = void 0),
      (this.WOe = () => {
        var e = this.ActivityBaseData,
          i = e.StageIds[this.CurrentIndex],
          t = e.GetProgress(i),
          t =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(2),
              "LongShanStage_ProgressPercentage",
              t,
            ),
            e.GetStageInfoById(i).cMs);
        t.sort(this.ActivityBaseData.TaskSort),
          this.TaskScroll.RefreshByData(t, void 0, !0);
      }),
      (this.VOe = () => new LongShanTaskItem_1.LongShanTaskItem()),
      (this.HOe = () => new PageDot_1.PageDot()),
      (this.KOe = () => {
        this.RefreshView(this.CurrentIndex - 1);
      }),
      (this.QOe = () => {
        var e = this.ActivityBaseData.StageIds[this.CurrentIndex + 1];
        this.ActivityBaseData.GetStageInfoById(e)
          ? this.RefreshView(this.CurrentIndex + 1)
          : ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(
              e,
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIHorizontalLayout],
      [8, UE.UISprite],
    ]),
      (this.BtnBindInfo = [
        [5, this.KOe],
        [6, this.QOe],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.ActivityBaseData =
      ActivityLongShanController_1.ActivityLongShanController.GetActivityData()),
      (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
        this.GetItem(0),
      )),
      this.CaptionItem.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.CaptionItem.SetTitle(this.ActivityBaseData.GetTitle());
    var e = this.ActivityBaseData.StageIds;
    (this.CurrentIndex = e.indexOf(this.OpenParam)),
      (this.PageDotLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(7),
        this.HOe,
      )),
      await this.PageDotLayout.RefreshByDataAsync(e),
      (this.TaskScroll = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(4),
        this.VOe,
      ));
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(
      void 0,
      this.ActivityBaseData.Id,
    ),
      this.RefreshView(this.CurrentIndex);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LongShanUpdate,
      this.WOe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LongShanUpdate,
      this.WOe,
    );
  }
  RefreshView(e) {
    this.PageDotLayout.GetLayoutItemByIndex(this.CurrentIndex).UpdateShow(!1),
      (this.CurrentIndex = e),
      this.PageDotLayout.GetLayoutItemByIndex(this.CurrentIndex).UpdateShow(!0);
    var e = this.ActivityBaseData.StageIds[this.CurrentIndex],
      i = LongShanStageById_1.configLongShanStageById.GetConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TitleDetail),
      this.SetSpriteByPath(i.Picture, this.GetSprite(8), !1),
      this.GetButton(5).RootUIComp.SetUIActive(0 < this.CurrentIndex),
      this.GetButton(6).RootUIComp.SetUIActive(
        this.CurrentIndex < this.ActivityBaseData.StageIds.length - 1,
      ),
      this.WOe(),
      this.ActivityBaseData.SaveNewStageFlag(e);
  }
}
exports.RoleGrowingTaskView = RoleGrowingTaskView;
//# sourceMappingURL=RoleGrowingTaskView.js.map
