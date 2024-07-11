"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../../Help/HelpController"),
  TimeOfDayDefine_1 = require("../../../TimeOfDay/TimeOfDayDefine"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivityRunController_1 = require("./ActivityRunController"),
  ActivityRunCycleItem_1 = require("./ActivityRunCycleItem"),
  ActivityRunItem_1 = require("./ActivityRunItem"),
  TIMERGAP = 1e3;
class ActivityRunView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.GOe = void 0),
      (this.c3e = void 0),
      (this.m3e = void 0),
      (this.d3e = void 0),
      (this.C3e = void 0),
      (this.lqe = void 0),
      (this.g3e = (e) => {
        var i =
          ModelManager_1.ModelManager.ActivityModel?.GetCurrentSelectActivity();
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
      }),
      (this.VOe = () => {
        return new ActivityRunItem_1.ActivityRunItem();
      }),
      (this.f3e = () => new ActivityRunCycleItem_1.ActivityRunCycleItem()),
      (this.p3e = () => {
        this.v3e(), this.M3e(), this.E3e(), this.S3e(), this.y3e(), this.I3e();
      }),
      (this.T3e = (e) => {
        this.C3e.ScrollToGridIndex(e.GridIndex, !0);
      }),
      (this.r3e = (e) => {
        this.C3e?.RefreshAllGridProxies();
      }),
      (this.L3e = () => {
        var e;
        ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
          ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
        ).GetIsShow() &&
          ((e = {
            MarkId:
              ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunMarkId(
                ModelManager_1.ModelManager.ActivityRunModel
                  .CurrentSelectChallengeId,
              ),
            MarkType: 13,
            OpenAreaId: 0,
          }),
          WorldMapController_1.WorldMapController.OpenView(2, !1, e));
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.D3e = () => {
        this.OpenHelpView();
      }),
      (this.R3e = !1),
      (this.kOe = () => {
        this.y3e();
        var e,
          i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
            ModelManager_1.ModelManager.ActivityRunModel
              .CurrentSelectChallengeId,
          );
        i &&
          ((i = i.GetIsShow()) &&
            this.R3e !== i &&
            ((e = this.C3e.GetSelectedGridIndex()),
            this.C3e.RefreshGridProxy(e),
            this.v3e(),
            this.E3e(),
            this.M3e(),
            this.S3e()),
          (this.R3e = i));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIVerticalLayout],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIText],
      [17, UE.UIText],
    ]),
      (this.BtnBindInfo = [[6, this.L3e]]);
  }
  U3e() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.Awe),
      this.lqe.SetHelpCallBack(this.D3e),
      this.lqe.SetTitle(this.m3e.GetTitle());
  }
  OnStart() {
    (this.m3e =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()),
      (this.c3e = this.m3e.GetChallengeDataArray()),
      this.U3e();
    var e = this.GetVerticalLayout(7);
    this.d3e = new GenericLayout_1.GenericLayout(e, this.VOe);
    e = this.GetItem(1)
      .GetOwner()
      .GetComponentByClass(UE.UILoopScrollViewComponent.StaticClass());
    (this.C3e = new LoopScrollView_1.LoopScrollView(
      e,
      this.GetItem(2).GetOwner(),
      this.f3e,
    )),
      this.GetItem(2).SetUIActive(!1),
      this.GetButton(11).RootUIComp.SetUIActive(!1),
      this.GetButton(12).RootUIComp.SetUIActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectActivityRunChallengeItem,
      this.p3e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClickActivityRunChallenge,
        this.T3e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetRunActivityReward,
        this.r3e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityClose,
        this.g3e,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectActivityRunChallengeItem,
      this.p3e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClickActivityRunChallenge,
        this.T3e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetRunActivityReward,
        this.r3e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityClose,
        this.g3e,
      );
  }
  S3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
      ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
    ).GetIsShow();
    this.GetItem(3)?.SetUIActive(e), this.GetItem(9).SetUIActive(!e);
  }
  M3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
      ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
    );
    e && this.GetButton(6).RootUIComp.SetUIActive(e.GetIsShow());
  }
  I3e() {
    this.UiViewSequence.HasSequenceNameInPlaying("Switch")
      ? this.UiViewSequence.ReplaySequence("Switch")
      : this.UiViewSequence.PlaySequence("Switch");
  }
  OpenHelpView() {
    var e = this.m3e.GetHelpId();
    HelpController_1.HelpController.OpenHelpById(e);
  }
  OnBeforeShow() {
    ActivityRunController_1.ActivityRunController.SelectDefaultChallengeId(
      ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity(),
    ),
      this.A3e(),
      this.P3e();
  }
  P3e() {
    this.GOe = TimerSystem_1.TimerSystem.Forever(this.kOe, TIMERGAP);
  }
  y3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
      ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
    );
    e.GetIsShow() ||
      ((e = this.x3e(e.BeginOpenTime, "ActiveToOpenTime")),
      this.GetText(10).SetText(e));
  }
  x3e(e, i) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    let r = Number(e) - t,
      n = (r <= 10 && (r = 10), TimeUtil_1.TimeUtil.GetCountDownData(r));
    r >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY &&
      (n = TimeUtil_1.TimeUtil.GetCountDownData(r, 3, 2));
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i);
    let o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return (o = o.replace("{0}", n.CountDownText));
  }
  A3e() {
    var i = this.c3e.length,
      t = new Array();
    for (let e = 0; e < i; e++) t.push(this.c3e[e].Id);
    this.C3e.RefreshByDataAsync(t).then(() => {
      this.C3e.SelectGridProxy(
        ModelManager_1.ModelManager.ActivityRunModel.GetStartViewSelectIndex(),
        !0,
      );
    });
  }
  v3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
      ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
    );
    e && ((e = e.GetScoreArray()), this.d3e.RefreshByData(e));
  }
  E3e() {
    var e,
      i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
        ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
      );
    i &&
      (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "ActiveRunMaxPoint"),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "ActiveRunMinTime"),
      0 === i.GetMiniTime()
        ? ((e =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "ActivityRunNoPoint",
            )),
          (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
          this.GetText(4)?.SetText(e),
          this.GetText(5)?.SetText(e))
        : (LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(15),
            "ActiveRunMaxPoint",
          ),
          this.GetText(4)?.SetText(i.GetMaxScore().toString()),
          (e = TimeUtil_1.TimeUtil.GetTimeString(i.GetMiniTime())),
          this.GetText(5)?.SetText(e.toString())),
      this.GetText(17).ShowTextNew("ReadyToFightText"));
  }
  OnBeforeDestroy() {
    void 0 !== this.GOe &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0)),
      RedDotController_1.RedDotController.UnBindRedDot("ActivityRun");
  }
}
exports.ActivityRunView = ActivityRunView;
//# sourceMappingURL=ActivityRunView.js.map
