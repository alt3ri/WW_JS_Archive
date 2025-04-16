"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketMainView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../../../Ui/UiLayer"),
  HelpController_1 = require("../../../../Help/HelpController"),
  ItemRewardController_1 = require("../../../../ItemReward/ItemRewardController"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityScratchTicketController_1 = require("../ActivityScratchTicketController"),
  ActivityScratchTicketDefine_1 = require("../ActivityScratchTicketDefine"),
  ScratchTicketData_1 = require("../Data/ScratchTicketData"),
  ScratchTicketCellItem_1 = require("./Item/ScratchTicketCellItem"),
  ScratchTicketConditionItem_1 = require("./Item/ScratchTicketConditionItem"),
  ScratchTicketRewardItemGrid_1 = require("./Item/ScratchTicketRewardItemGrid"),
  ScratchTicketTabItem_1 = require("./Item/ScratchTicketTabItem");
class ScratchTicketMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.gLt = void 0),
      (this.lqe = void 0),
      (this.anl = void 0),
      (this.o8a = void 0),
      (this.B7t = void 0),
      (this._nl = void 0),
      (this.H3e = void 0),
      (this.Lol = void 0),
      (this.unl = void 0),
      (this.cnl = void 0),
      (this.TDe = void 0),
      (this.jvl = void 0),
      (this.e8 = TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.$An = (i) => {
        "Refresh" === i && (this.dnl(this.cnl), this.Wvl(this.cnl));
      }),
      (this.uOl = () => {
        var i = this.Lol.GetRoundDataList();
        this.B7t.RefreshByData(i), this.Cnl();
      }),
      (this.mnl = (i, t) => {
        void 0 !== this.unl && this.unl.SetSelect(!1, !1);
        var e = this.cnl;
        (this.unl = t),
          this.unl.SetSelect(!0, !1),
          (this.cnl = i),
          this.Qvl(this.cnl, e),
          this.dnl(this.cnl),
          this.Cnl();
      }),
      (this.gnl = (i) => {
        var t;
        i.IsLock() &&
          (void 0 === this.cnl || 1 !== this.cnl.GetRoundState()
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "ScratchCardActivity_ClickTips02",
              )
            : this.Lol.GetRemainCount() <= 0
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                  "ScratchCardActivity_ClickTips01",
                )
              : ((t = this.cnl.Id),
                ActivityScratchTicketController_1.ActivityScratchTicketController.SendScratchCardRewardRequest(
                  t,
                  i.Index,
                  this.pnl,
                )));
      }),
      (this.pnl = (r, i, h, c) => {
        if (i === this.cnl.Id && !(h.length <= 0))
          if (1 === h.length)
            UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", !0),
              this.nSl(h[0]),
              this.C0l(),
              TimerSystem_1.TimerSystem.Delay(() => {
                UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", !1),
                  this.p_l(r, c);
              }, h[0].DelayInterval);
          else {
            this.nSl(h[0]);
            let t = h[0].DelayInterval,
              e = 1,
              s = 0;
            this.C0l(),
              UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", !0);
            this.TDe = TimerSystem_1.TimerSystem.Forever((i) => {
              (s += i) < t ||
                ((s %= t),
                e >= h.length
                  ? (UiLayer_1.UiLayer.SetShowMaskLayer(
                      "ScratchTicketMainView",
                      !1,
                    ),
                    this.p_l(r, c),
                    this.jm())
                  : (t =
                      e === h.length - 1
                        ? (this.nSl(h[e]),
                          ActivityScratchTicketDefine_1.LAST_DELAY_INTERVAL)
                        : (this.nSl(h[e]), h[e].DelayInterval)),
                e++);
            }, ActivityScratchTicketDefine_1.FOREVER_DELAY_INTERVAL);
          }
      }),
      (this.khl = () => {
        var i;
        2 === this.cnl.GetRoundState()
          ? ((i = this.Lol.GetRoundDataList()),
            this.B7t.RefreshByData(i),
            this.fnl())
          : this.Cnl();
      }),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this.pcr = () => {
        HelpController_1.HelpController.OpenHelpById(this.Lol.GetHelpId());
      }),
      (this.n8a = () =>
        new ScratchTicketConditionItem_1.ScratchTicketConditionItem()),
      (this.Mnl = () => {
        var i = new ScratchTicketTabItem_1.ScratchTicketTabItem();
        return i.SetClickToggleCallback(this.mnl), i;
      }),
      (this.Snl = () => {
        var i = new ScratchTicketCellItem_1.ScratchTicketCellItem();
        return i.SetClickCallback(this.gnl), i;
      }),
      (this.CreateRewardGridItem = () => {
        return new ScratchTicketRewardItemGrid_1.ScratchTicketRewardItemGrid();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIVerticalLayout],
      [5, UE.UIGridLayout],
      [6, UE.UIItem],
      [7, UE.UIMultiTemplateLayout],
      [9, UE.UISprite],
      [8, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Lol = this.OpenParam),
      this.Lol instanceof ScratchTicketData_1.ScratchTicketData
        ? ((this.o8a = new GenericLayout_1.GenericLayout(
            this.GetVerticalLayout(3),
            this.n8a,
          )),
          (this._nl = new GenericLayout_1.GenericLayout(
            this.GetGridLayout(5),
            this.Snl,
          )),
          (this.H3e = new GenericLayout_1.GenericLayout(
            this.GetMultiTemplateLayout(7),
            this.CreateRewardGridItem,
          )),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(6))),
          this.lqe.SetCloseCallBack(this.Jvt),
          this.lqe.SetHelpCallBack(this.pcr),
          await this.lqe.SetCurrencyItemList([this.Lol.GetCostItemId()]),
          (this.gLt = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
          await this.gLt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
          (this.anl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
            void 0,
          )),
          await this.anl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
          await this.ynl(),
          await this.yll(),
          this.Cnl())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("ScratchTicket", 58, "ScratchTicketMainView无效输入");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnScratchTicketConditionRefresh,
        this.uOl,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnScratchTicketConditionRefresh,
        this.uOl,
      );
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (0 !== i.length && !isNaN(Number(i[0]))) {
      (i = Number(i[0])), (i = this._nl?.GetItemByIndex(i));
      if (void 0 !== i) return [i, i];
    }
  }
  async ynl() {
    this.B7t = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(4),
      this.Mnl,
    );
    var i = this.Lol.GetRoundDataList();
    await this.B7t.RefreshByDataAsync(i);
  }
  async yll() {
    var i,
      t = this.Lol.GetFirstProgressRoundDataIndex();
    t < 0 ||
      ((i = this.Lol.GetRoundDataList()),
      (this.unl = this.B7t.GetLayoutItemByKey(t)),
      this.unl.SetSelect(!0, !1),
      (this.cnl = i[t]),
      (i = this.cnl.GetCellDataList()),
      await this._nl.RefreshByDataAsync(i));
  }
  fnl() {
    var i = this.Lol.GetFirstProgressRoundDataIndex();
    i < 0 || this.B7t.GetLayoutItemByKey(i).SetSelect(!0, !0);
  }
  dnl(i) {
    const t = i.GetDiagonalResultList();
    if (!(t.length <= 0)) {
      UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", !0),
        this.nSl(t[0]),
        this.vnl(t[0].RewardList);
      let i = 1;
      this.jvl = TimerSystem_1.TimerSystem.Forever(() => {
        i >= t.length
          ? (UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", !1),
            this.Kvl())
          : (this.nSl(t[i]), i++);
      }, ActivityScratchTicketDefine_1.REVEAL_DELAY_INTERVAL);
    }
  }
  Cnl() {
    var i;
    this.Lol.GetScratchCardActivityConfig() &&
      this.Lol.LocalConfig &&
      (this.gLt.SetTitleByText(this.Lol.GetTitle()),
      this.H3e.RefreshByData(this.cnl.GetRemainRewardList()),
      this.FNe(),
      (i = this.cnl.GetRoundState()),
      this.anl.PanelLock.SetUiActive(0 === i),
      this.anl.PanelActivate.SetUiActive(2 === i),
      this.anl.FunctionButton.SetUiActive(!1),
      this.anl.PanelActivate.SetTextByTextId(
        "ScratchCardActivity_CompleteDesc",
      ),
      (i = this.cnl.Config.TogRoundIcon),
      this.SetSpriteByPath(i, this.GetSprite(9), !1, void 0),
      (i = this.Lol.IsAllRoundFinish()),
      this.lqe.SetCurrencyItemVisible(!i),
      this.GetItem(10).SetUIActive(!i),
      this.GetItem(8).SetUIActive(i),
      (i = this.Lol.GetConditionDataList()),
      this.o8a.RefreshByData(i));
  }
  FNe() {
    var i = this.Lol.EndOpenTime,
      t = TimeUtil_1.TimeUtil.GetServerTime(),
      i = Math.max(i - t, 1);
    const e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i),
      s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "ScratchCardActivity_TimeDesc",
      );
    if (
      (this.gLt.SetTimeTextByText(
        StringUtils_1.StringUtils.Format(s, e.CountDownText),
      ),
      0 === this.cnl.GetRoundState())
    ) {
      (i = this.cnl.GetUnlockTime() * TimeUtil_1.TimeUtil.Millisecond - t),
        (t = this.cnl.GetPreRoundState());
      if (0 < i) {
        const e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i),
          s = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "ScratchCardActivity_NoJoinTips01",
            ),
            e.CountDownText,
          );
        this.anl.PanelLock.SetTextByText(s);
      } else
        2 !== t
          ? this.anl.PanelLock.SetTextByTextId(
              "ScratchCardActivity_NoJoinTips02",
            )
          : this.anl.PanelLock.SetTextByTextId(
              "ScratchCardActivity_NoJoinTips03",
            );
    }
  }
  OnTick(i) {
    (this.e8 += i),
      this.e8 >= TimeUtil_1.TimeUtil.InverseMillisecond &&
        (this.FNe(), (this.e8 %= TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  OnBeforeHide() {
    UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", !1),
      this.jm(),
      this.Kvl();
  }
  jm() {
    TimerSystem_1.TimerSystem.Has(this.TDe) &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  Kvl() {
    TimerSystem_1.TimerSystem.Has(this.jvl) &&
      (TimerSystem_1.TimerSystem.Remove(this.jvl), (this.jvl = void 0));
  }
  C0l() {
    TimerSystem_1.TimerSystem.Delay(() => {
      this.PlaySequence("Shake");
    }, ActivityScratchTicketDefine_1.SHOW_SHAKE_INTERVAL);
  }
  Qvl(i, t) {
    var i = this.Lol.GetRoundDataIndex(i),
      t = this.Lol.GetRoundDataIndex(t),
      e = i < t,
      s = Math.min(i, t),
      i = Math.max(i, t);
    1 === i &&
      0 === s &&
      this.UiViewSequence.PlaySequencePurely("SwitchA", !0, e),
      2 === i &&
        0 === s &&
        this.UiViewSequence.PlaySequencePurely("SwitchB", !0, e),
      2 === i &&
        1 === s &&
        this.UiViewSequence.PlaySequencePurely("SwitchC", !0, e);
  }
  Wvl(i) {
    i = this.Lol.GetRoundDataIndex(i);
    1 === i
      ? this.UiViewSequence.PlaySequencePurely("SwitchA", !0)
      : 2 === i && this.UiViewSequence.PlaySequencePurely("SwitchB", !0);
  }
  p_l(i, t) {
    0 === i
      ? (ActivityScratchTicketController_1.ActivityScratchTicketController.ShowScratchTicketRewardTip(
          t,
        ),
        this.khl())
      : ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
          ActivityScratchTicketDefine_1.SCRATCH_TICKET_REWRAD_CONFIG_ID,
          t,
          this.khl,
        );
  }
  nSl(i) {
    0 < i.RewardList.length && this.vnl(i.RewardList),
      "Empty" !== i.SequenceName &&
        this.UiViewSequence.PlaySequence(i.SequenceName);
  }
  vnl(i) {
    for (const s of i) {
      var t = this._nl.GetLayoutItemByKey(s.Index),
        e = this.cnl.GetCellDataByIndex(s.Index);
      void 0 !== t && t.RefreshByResultData(e, s);
    }
  }
}
exports.ScratchTicketMainView = ScratchTicketMainView;
//# sourceMappingURL=ScratchTicketMainView.js.map
