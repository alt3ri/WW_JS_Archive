"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById"),
  LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  PageDot_1 = require("../../../Common/PageDot"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../../Help/HelpController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityLongShanController_1 = require("./ActivityLongShanController"),
  LongShanTaskItem_1 = require("./LongShanTaskItem");
class LongShanView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.GOe = void 0),
      (this.NOe = 0),
      (this.lqe = void 0),
      (this.tPe = void 0),
      (this.OOe = void 0),
      (this.kOe = () => {
        var e,
          i =
            ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
        i.CheckIfInOpenTime
          ? ((e = TimeUtil_1.TimeUtil.GetServerTime()),
            (i = Math.max(i.EndOpenTime - e, 1)),
            (e = this.FOe(i)),
            (i =
              TimeUtil_1.TimeUtil.GetCountDownDataFormat2(i, e[0], e[1])
                .CountDownText ?? ""),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "ActivityRemainingTime",
              i,
            ))
          : this.CloseMe();
      }),
      (this.VOe = () => new LongShanTaskItem_1.LongShanTaskItem()),
      (this.HOe = () => new PageDot_1.PageDot()),
      (this.jOe = (e, i) => {
        var t, n;
        return e.mMs !== i.mMs
          ? e.mMs
            ? 1
            : -1
          : e.dMs !== i.dMs
            ? e.dMs
              ? -1
              : 1
            : (t = LongShanTaskById_1.configLongShanTaskById.GetConfig(
                  e.s5n,
                ).SortId) !==
                (n = LongShanTaskById_1.configLongShanTaskById.GetConfig(
                  i.s5n,
                ).SortId)
              ? t - n
              : e.s5n - i.s5n;
      }),
      (this.WOe = () => {
        var e =
            ActivityLongShanController_1.ActivityLongShanController.GetActivityData(),
          i = e.StageIds[this.NOe],
          t = e.GetProgress(i),
          t =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(2),
              "LongShanStage_ProgressPercentage",
              t,
            ),
            e.GetStageInfoById(i).cMs);
        t.sort(this.jOe), this.OOe?.RefreshByData(t, void 0, !0);
      }),
      (this.KOe = () => {
        this.RefreshView(this.NOe - 1);
      }),
      (this.QOe = () => {
        var e =
            ActivityLongShanController_1.ActivityLongShanController.GetActivityData(),
          i = e.StageIds[this.NOe + 1];
        e.GetStageInfoById(i)
          ? this.RefreshView(this.NOe + 1)
          : ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(
              i,
            );
      }),
      (this.XOe = () => {
        var e =
          ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetHelpId();
        HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.$Oe = () => {
        this.CloseMe();
      }),
      (this.g3e = (e) => {
        var i =
          ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
        e.has(i.Id) &&
          ((e = () => {
            this.CloseMe();
          }),
          (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(
            1,
            e,
          ),
          i.FunctionMap.set(0, e),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          ));
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
      [8, UE.UIText],
      [9, UE.UITexture],
    ]),
      (this.BtnBindInfo = [
        [5, this.KOe],
        [6, this.QOe],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LongShanUpdate,
      this.WOe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityClose,
        this.g3e,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LongShanUpdate,
      this.WOe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityClose,
        this.g3e,
      );
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetHelpCallBack(this.XOe),
      this.lqe.SetCloseCallBack(this.$Oe);
    var e =
        ActivityLongShanController_1.ActivityLongShanController.GetActivityData(),
      e = (this.lqe.SetTitle(e.GetTitle()), e.StageIds);
    (this.NOe = e.indexOf(this.OpenParam)),
      (this.tPe = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(7),
        this.HOe,
      )),
      await this.tPe.RefreshByDataAsync(e),
      (this.OOe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(4),
        this.VOe,
      ));
  }
  OnBeforeShow() {
    (this.GOe = TimerSystem_1.TimerSystem.Forever(
      this.kOe,
      TimeUtil_1.TimeUtil.InverseMillisecond,
    )),
      this.RefreshView(this.NOe),
      this.kOe();
  }
  OnBeforeHide() {
    TimerSystem_1.TimerSystem.Has(this.GOe) &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  FOe(e) {
    return e > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : e > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 1]
        : e > CommonDefine_1.SECOND_PER_MINUTE
          ? [1, 0]
          : [0, 0];
  }
  RefreshView(e) {
    this.tPe.GetLayoutItemByIndex(this.NOe).UpdateShow(!1),
      (this.NOe = e),
      this.tPe.GetLayoutItemByIndex(this.NOe).UpdateShow(!0);
    var e =
        ActivityLongShanController_1.ActivityLongShanController.GetActivityData(),
      i = e.StageIds[this.NOe],
      i = LongShanStageById_1.configLongShanStageById.GetConfig(i);
    this.SetTextureByPath(i.Picture, this.GetTexture(9)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TitleDetail),
      this.WOe(),
      this.GetButton(5).RootUIComp.SetUIActive(0 < this.NOe),
      this.GetButton(6).RootUIComp.SetUIActive(
        this.NOe < e.StageIds.length - 1,
      );
  }
}
exports.LongShanView = LongShanView;
//# sourceMappingURL=LongShanView.js.map
