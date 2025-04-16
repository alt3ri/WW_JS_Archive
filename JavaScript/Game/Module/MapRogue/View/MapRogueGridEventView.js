"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGridEventView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  GridEventCompChoice_1 = require("./Components/GridEventCompChoice"),
  GridEventCompDesc_1 = require("./Components/GridEventCompDesc"),
  GridEventCompEnding_1 = require("./Components/GridEventCompEnding"),
  SPINE_DEFAULT_ANIM_NAME = "idle";
class MapRogueGridEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Wr1 = []),
      (this.Qr1 = 0),
      (this.Kr1 = !0),
      (this.AutoState = !1),
      (this.Xr1 = 0),
      (this.OpData = void 0),
      (this.CurrentBgId = 0),
      (this.CurrentBgmId = 0),
      (this.ehr = () => {
        (this.Kr1 = !this.Kr1),
          this.GetItem(7).SetUIActive(this.Kr1),
          this.GetItem(1).SetUIActive(this.Kr1);
      }),
      (this.ry1 = () => {
        var t = this.en1();
        t &&
          1 === t.StepType &&
          ((this.AutoState = !0),
          2 === this.ViewState
            ? (this.XTt(), this.XTt())
            : 3 === this.ViewState && this.XTt());
      }),
      (this.B6e = () => {
        0 !== this.ViewState &&
          ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd();
      }),
      (this.$An = (t) => {
        "Change" === t && this.WNe();
      }),
      (this.bzt = !1),
      (this.w8i = (t) => (this.bzt = !0)),
      (this.b8i = (t) => !(this.bzt = !1)),
      (this.XTt = () => {
        if (!this.bzt) {
          var t = this.en1();
          if (t)
            switch (t.StepType) {
              case 1:
                2 === this.ViewState
                  ? t.MaskClick?.()
                  : 3 === this.ViewState &&
                    (this.GetItem(5).SetUIActive(!1),
                    this.GetItem(6).SetUIActive(!1),
                    this.GetButton(8).RootUIComp.SetUIActive(!1),
                    this.Jr1(t.StepId, 0));
                break;
              case 2:
                break;
              case 4:
                3 === this.ViewState &&
                  (this.GetButton(8).RootUIComp.SetUIActive(!1),
                  this.Jr1(t.StepId, 0));
            }
        }
      }),
      (this.tn1 = (t, i) => {
        switch (i) {
          case 1:
            this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!0);
            break;
          case 2:
          case 4:
            this.GetButton(8).RootUIComp.SetUIActive(!1);
        }
        this.ViewState = 3;
      }),
      (this.Jr1 = (t, i) => {
        this.OpData?.ExecuteStep(t, i);
      }),
      (this.eo1 = (t) => {
        this.QCa(this.OpData.CurrentPlotBgId, !0),
          this.jE1(this.OpData.CurrentPlotBgmId),
          this.to1(t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIVerticalLayout],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.SpineSkeletonAnimationComponent],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.ehr],
        [8, this.XTt],
        [9, this.ry1],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Xr1 = this.OpenParam),
      (this.OpData = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
        this.Xr1,
      )),
      (this.OpData.EventStepUpdateFunc = this.eo1),
      this.GetButton(8).RootUIComp.SetUIActive(!1);
    var t = this.GetScrollViewWithScrollbar(2),
      t =
        (t.OnPointerBeginDragCallBack.Bind(this.w8i),
        t.OnPointerEndDragCallBack.Bind(this.b8i),
        this.GetItem(5).SetUIActive(!1),
        this.GetItem(6).SetUIActive(!1),
        []),
      t =
        (t.push(this.zDn()),
        this.OpData.IsInPlot && t.push(this.to1(this.OpData.CurrentStepId)),
        await Promise.all(t),
        ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventPlotById(
          this.OpData.CurrentPlotId,
        ));
    t && this.lqe.SetTitleLocalText(t.Title),
      this.QCa(this.OpData.CurrentPlotBgId, !1),
      this.jE1(this.OpData.CurrentPlotBgmId);
  }
  OnStart() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnBeforeDestroy() {
    this.OpData &&
      ((this.OpData.EventStepUpdateFunc = void 0), (this.OpData = void 0)),
      (this.Wr1.length = 0);
  }
  async zDn() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      this.lqe.SetCloseCallBack(this.B6e),
      this.lqe.SetCurrencyItemList([
        ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId(),
      ]);
  }
  QCa(t, i) {
    0 !== t &&
      this.CurrentBgId !== t &&
      ((this.CurrentBgId = t),
      !i || this.UiViewSequence.HasSequenceNameInPlaying("Switch")
        ? this.WNe()
        : this.UiViewSequence.PlaySequence("Switch"));
  }
  WNe() {
    var t,
      i,
      e,
      s,
      h,
      r,
      n = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgById(
        this.CurrentBgId,
      );
    n &&
      ((t = this.GetTexture(0)),
      (i = this.GetItem(11)),
      (e = this.GetSpine(10)),
      (s =
        !StringUtils_1.StringUtils.IsEmpty(n.BgPath) ||
        !StringUtils_1.StringUtils.IsEmpty(n.BgFemalePath)),
      (r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
      s
        ? ((h = 0 === r ? n.BgFemalePath : n.BgPath),
          this.SetTextureByPath(h, t))
        : ((h = 0 === r ? n.BgSpineAtlasFemalePath : n.BgSpineAtlasPath),
          (r = 0 === r ? n.BgSpineSkeletonFemalePath : n.BgSpineSkeletonPath),
          this.SetSpineAssetByPath(h, r, e),
          e.SetAnimation(0, SPINE_DEFAULT_ANIM_NAME, !0)),
      t.SetUIActive(s),
      i.SetUIActive(!s));
  }
  jE1(t) {
    0 !== t &&
      this.CurrentBgmId !== t &&
      ((this.CurrentBgmId = t),
      (t = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgmById(t))) &&
      ((t = t.BgmPath), AudioSystem_1.AudioSystem.PostEvent(t));
  }
  set ViewState(t) {
    this.Qr1 !== t && (this.Qr1 = t);
  }
  get ViewState() {
    return this.Qr1;
  }
  io1() {
    return this.GetVerticalLayout(3).RootUIComp;
  }
  en1() {
    var t = this.Wr1.length;
    if (0 < t) return this.Wr1[t - 1];
  }
  fze(t) {
    const i = this.GetScrollViewWithScrollbar(2),
      e = (0, puerts_1.$ref)(new UE.Vector2D(i.ContentUIItem.RelativeLocation));
    TimerSystem_1.TimerSystem.Delay(() => {
      i.ScrollToBottom(e, t, !1);
    }, 100);
  }
  async CreateComponentChoice(t, i) {
    t = new GridEventCompChoice_1.GridEventChoice(t);
    (t.CanInteractCallback = this.tn1),
      (t.ExecuteStep = this.Jr1),
      this.Wr1.push(t),
      await t.CreateByResourceIdAsync("UiItem_RandomEventChoose", this.io1()),
      await t.Refresh(i);
  }
  async CreateComponentDesc(t) {
    t = new GridEventCompDesc_1.GridEventCompDesc(t);
    (t.CanInteractCallback = this.tn1),
      this.Wr1.push(t),
      await t.CreateByResourceIdAsync("UiItem_RandomEventDesc", this.io1()),
      t.Refresh(this.AutoState);
  }
  async CreateComponentEnding(t) {
    t = new GridEventCompEnding_1.GridEventCompEnding(t);
    (t.CanInteractCallback = this.tn1),
      this.Wr1.push(t),
      await t.CreateByResourceIdAsync("UiItem_RandomEventEnd", this.io1()),
      t.Refresh();
  }
  async to1(t) {
    if (0 !== t) {
      var i =
        ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(t);
      if (i) {
        switch (
          ((this.ViewState = 1),
          this.GetButton(8).RootUIComp.SetUIActive(!0),
          i.Type)
        ) {
          case 1:
            if ((await this.CreateComponentDesc(t), this.AutoState)) {
              const e = this.en1()?.GetOriginalItem?.();
              return e && this.fze(e), void this.Jr1(t, 0);
            }
            this.GetItem(5).SetUIActive(!0), this.GetItem(6).SetUIActive(!1);
            break;
          case 2:
            (this.AutoState = !1),
              await this.CreateComponentChoice(t, this.OpData.CurrentOptions);
            break;
          case 3:
            (this.AutoState = !1), this.Jr1(t, 0);
            break;
          case 4:
            (this.AutoState = !1), await this.CreateComponentEnding(t);
            break;
          default:
            (this.AutoState = !1),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "RogueBattle",
                  37,
                  "[MapRogue] 步骤类型生成错误",
                  ["StepId", t],
                );
        }
        const e = this.en1()?.GetOriginalItem?.();
        e && this.fze(e), (this.ViewState = 2);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RogueBattle",
            37,
            "[MapRogue] 无法查询到对应步骤,结束执行",
            ["StepId", t],
          );
    }
  }
}
exports.MapRogueGridEventView = MapRogueGridEventView;
//# sourceMappingURL=MapRogueGridEventView.js.map
