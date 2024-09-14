"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCorniceMeetingMainView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../../Help/HelpController"),
  TimeOfDayDefine_1 = require("../../../TimeOfDay/TimeOfDayDefine"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController"),
  ActivityCorniceMeetingRewardItem_1 = require("./ActivityCorniceMeetingRewardItem"),
  ActivityCorniceMeetingTabItem_1 = require("./ActivityCorniceMeetingTabItem");
class ActivityCorniceMeetingMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.m3e = void 0),
      (this.h4a = void 0),
      (this.H3e = void 0),
      (this.GOe = void 0),
      (this.PVa = []),
      (this.l4a = () => {
        var e =
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
        e.GetIsShow(e.CurrentSelectLevelPlayId) &&
          (e = e.GetLevelEntryData(e.CurrentSelectLevelPlayId)) &&
          ((e = { MarkId: e.GetMarkId(), MarkType: 24, OpenAreaId: 0 }),
          WorldMapController_1.WorldMapController.OpenView(2, !1, e));
      }),
      (this.g3e = (e) => {
        var i;
        e.has(
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController
            .ActivityId,
        ) &&
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
      }),
      (this._4a = (e) => {
        var i =
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
        (i.CurrentSelectLevelPlayId = e),
          (this.m3e = i.GetLevelEntryData(e)),
          this.u4a(),
          this.S3e(),
          this.c4a(),
          this.y3e(),
          this.PlaySequenceAsync("Switch", !0);
      }),
      (this.f3e = () => {
        var e =
          new ActivityCorniceMeetingTabItem_1.ActivityCorniceMeetingTabItem();
        return this.PVa.push(e), e;
      }),
      (this.VOe = () => {
        return new ActivityCorniceMeetingRewardItem_1.ActivityCorniceMeetingRewardItem();
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.D3e = () => {
        var e =
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetHelpId();
        HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.R3e = !1),
      (this.kOe = () => {
        this.y3e();
        var e,
          i =
            ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
        i &&
          ((i = i.GetIsShow(i.CurrentSelectLevelPlayId)) &&
            this.R3e !== i &&
            ((e = this.h4a.GetSelectedGridIndex()),
            this.h4a.RefreshGridProxy(e),
            this.c4a(),
            this.S3e()),
          (this.R3e = i));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIVerticalLayout],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[7, this.l4a]]);
  }
  OnStart() {
    var e =
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    (this.m3e = e.GetLevelEntryData(e.GetDefaultSelectLevelPlayId())),
      (this.H3e = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(4),
        this.VOe,
      )),
      (this.h4a = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        this.f3e,
      )),
      this.U3e(),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.kOe, 1e3));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickActivityCorniceMeetingTab,
      this._4a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityClose,
        this.g3e,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickActivityCorniceMeetingTab,
      this._4a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityClose,
        this.g3e,
      );
  }
  OnBeforeShow() {
    this.Eua(), this.u4a(), this.S3e(), this.c4a();
  }
  OnBeforeDestroy() {
    void 0 !== this.GOe &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0)),
      RedDotController_1.RedDotController.UnBindRedDot(
        "ActivityCorniceMeeting",
      );
  }
  U3e() {
    var e =
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.Awe),
      this.lqe.SetHelpCallBack(this.D3e),
      this.lqe.SetTitle(e.GetTitle());
  }
  y3e() {
    var e =
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    e.GetIsShow(e.CurrentSelectLevelPlayId) ||
      ((e = e.GetLevelEntryData(e.CurrentSelectLevelPlayId)),
      (e = this.x3e(e.UnlockTime / 1e3, "ActiveToOpenTime")),
      this.GetText(8).SetText(e));
  }
  x3e(e, i) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    let r = Number(e) - t,
      o = (r <= 10 && (r = 10), TimeUtil_1.TimeUtil.GetCountDownData(r));
    r >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY &&
      (o = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(r));
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i);
    let n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return (n = n.replace("{0}", o.CountDownText));
  }
  u4a() {
    var e = this.m3e.GetRewardList();
    this.H3e.RefreshByData(e);
  }
  Eua() {
    const e =
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    var i = e.GetLevelPlayIdList();
    this.h4a.BindOnScrollValueChanged((e) => {
      let i = !1,
        t = !1;
      for (let e = 0; e < this.PVa.length; e++) {
        var r = this.PVa[e];
        r &&
          (r =
            ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(
              r.LevelPlayId,
            )) &&
          (r.GetRedDot() && e < this.h4a.GetDisplayGridStartIndex() && (i = !0),
          r.GetRedDot()) &&
          e > this.h4a.GetDisplayGridEndIndex() &&
          (t = !0);
      }
      this.GetItem(10).SetUIActive(i), this.GetItem(11).SetUIActive(t);
    }),
      this.h4a.RefreshByData(i, !1, () => {
        this.h4a?.SelectGridProxy(e.GetSelectLevelPlayIdIndex());
      });
  }
  S3e() {
    var e =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData(),
      e = e.GetIsShow(e.CurrentSelectLevelPlayId);
    this.GetVerticalLayout(4)?.RootUIComp.SetUIActive(e),
      this.GetItem(3).SetUIActive(!e),
      this.GetButton(7)?.RootUIComp.SetUIActive(e);
  }
  c4a() {
    var e =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData(),
      e = e.GetLevelEntryData(e.CurrentSelectLevelPlayId),
      i = TimeUtil_1.TimeUtil.GetTimeString(e.RemainTime);
    0 === e?.MaxScore
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(5),
          "ActivityCorniceMeetingScoreNoRecord",
        )
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(5),
          "Text_ItemCost_Text",
          e.MaxScore.toString(),
          e?.GetMaxScoreConfig(),
        ),
      this.GetItem(9).SetUIActive(e.IsAllFinished()),
      this.GetText(6).SetText(i),
      this.GetItem(12).SetUIActive(e.IsUnlock());
  }
}
exports.ActivityCorniceMeetingMainView = ActivityCorniceMeetingMainView;
//# sourceMappingURL=ActivityCorniceMeetingMainView.js.map
