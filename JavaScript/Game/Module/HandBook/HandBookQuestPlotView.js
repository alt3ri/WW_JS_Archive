"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestPlotView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById"),
  SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiNavigationNewController_1 = require("../UiNavigation/New/UiNavigationNewController"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  HandBookDefine_1 = require("./HandBookDefine"),
  HandBookQuestPlotItem_1 = require("./HandBookQuestPlotItem"),
  HandBookQuestPlotList_1 = require("./HandBookQuestPlotList"),
  HandBootPlotDynamicItem_1 = require("./HandBootPlotDynamicItem"),
  HandBootQuestDynamicItem_1 = require("./HandBootQuestDynamicItem");
class HandBookQuestPlotView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NodeScrollView = void 0),
      (this.PlotListScrollView = void 0),
      (this.n6t = void 0),
      (this.xPn = void 0),
      (this.PPn = void 0),
      (this.wPn = []),
      (this.BPn = new Map()),
      (this.$Bn = void 0),
      (this.b9i = 0),
      (this.NeedScrollIndex = 0),
      (this.GPn = 0),
      (this.YBn = !1),
      (this.CFn = ""),
      (this.WQs = !1),
      (this.zBn = ""),
      (this.OPn = new Map()),
      (this.ZBn = []),
      (this.NPn = (i, t, e) => {
        var o = new HandBookQuestPlotItem_1.HandBookQuestPlotItem();
        return (
          o.BindClickCallback(this.ebn), o.BindIsSelectFunction(this.tbn), o
        );
      }),
      (this.FPn = (i, t, e) => {
        var o = new HandBookQuestPlotList_1.HandBookQuestPlotList();
        return (
          o.BindClickOptionToggleBack(this.Zu), o.BindOnRefreshNode(this.ibn), o
        );
      }),
      (this.pFe = () => {
        this.CloseMe(),
          HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
      }),
      (this.ebn = (e, i) => {
        if (!this.YBn) {
          this.YBn = !0;
          let t = 0;
          var o = this.wPn.length;
          for (let i = 0; i < o; i++) this.wPn[i].NodeText === e && (t = i);
          this.PlotListScrollView?.ScrollToItemIndex(t).finally(() => {
            (this.YBn = !1), this.ibn(e);
          });
        }
      }),
      (this.kPn = (i = !0, t) => {
        (this.wPn = []),
          this.VPn(),
          this.PlotListScrollView?.RefreshByData(this.wPn, i),
          (this.WQs = !0),
          this.PlotListScrollView?.BindLateUpdate(() => {
            this.PlotListScrollView?.UnBindLateUpdate(),
              (this.WQs = !1),
              t && this.ibn(t),
              this.fje();
          });
      }),
      (this.Z9s = []),
      (this.Zu = (i, t, e, o) => {
        let s = this.BPn.get(i);
        (s = s || new Map()).set(t, e),
          this.BPn.set(i, s),
          this.Z9s.push(i, t, e),
          (this.NeedScrollIndex =
            this.PlotListScrollView?.GetDisplayGridStartIndex() ?? 0),
          this.kPn(),
          HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
      }),
      (this.wwe = () => {
        HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio(),
          this.b9i--,
          this.BPn.clear(),
          this.Og();
      }),
      (this.Pwe = () => {
        HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio(),
          this.b9i++,
          this.BPn.clear(),
          this.Og();
      }),
      (this.ibn = (t) => {
        if (this.CFn !== t && !this.WQs) {
          this.CFn = t;
          let i = !1;
          for (const o of this.NodeScrollView.GetScrollItemItems())
            o?.GetTidText() === t
              ? (o.SetToggleState(1),
                UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForViewSameGroup(
                  o.GetToggleItem()?.GetRootComponent(),
                ),
                (i = !0))
              : o.SetToggleState(0);
          if (!i) {
            let i = 0;
            for (var [e] of this.OPn) {
              if (e === t) break;
              i++;
            }
            this.NodeScrollView?.ScrollToItemIndex(i).finally(() => {
              this.NodeScrollView?.GetScrollItemFromIndex(0)?.SetToggleState(1);
            });
          }
        }
      }),
      (this.tbn = (i) => this.CFn === i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIDynScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIText],
      [8, UE.UIDynScrollViewComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.wwe],
        [6, this.Pwe],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.PPn = new HandBootPlotDynamicItem_1.HandBootPlotDynamicItem()),
      (this.PlotListScrollView = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(8),
        this.GetItem(4),
        this.PPn,
        this.FPn,
      )),
      await this.PlotListScrollView.Init(),
      (this.xPn = new HandBootQuestDynamicItem_1.HandBootQuestDynamicItem()),
      (this.NodeScrollView = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(1),
        this.GetItem(2),
        this.xPn,
        this.NPn,
      )),
      await this.NodeScrollView.Init();
  }
  OnStart() {
    (this.zBn =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ColonTag") ?? ""),
      (this.zBn = this.zBn + " "),
      (this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.n6t.SetCloseCallBack(this.pFe),
      this.n6t.SetHelpBtnActive(!1);
    var i = this.OpenParam;
    (this.$Bn = i.ConfigIdList), (this.b9i = i.Index), this.Og();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPhotoSelect,
      this.$Bn[this.b9i],
    );
  }
  Og() {
    var i = this.$Bn?.length ?? 0;
    if (this.b9i >= i || this.b9i < 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("HandBook", 5, "HandBookPlot_剧情图鉴选择任务出错", [
          "index:",
          this.b9i,
        ]);
    else {
      this.GetButton(5)?.RootUIComp.SetUIActive(0 < this.b9i),
        this.GetButton(6)?.RootUIComp.SetUIActive(this.b9i + 1 < i);
      var i = this.$Bn[this.b9i],
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfig(i);
      if (t) {
        if (
          !ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(t.Type, i)
            ?.IsRead
        ) {
          var e = t.Type;
          const l =
            ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(
              e,
            )?.Type;
          ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedReadRequest(
            l,
            i,
          );
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.Descrtption);
        var o = ModelManager_1.ModelManager.QuestNewModel?.GetQuestConfig(
            t.QuestId,
          ),
          e = o?.TidName
            ? PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidName)
            : "";
        this.n6t.SetTitle(e);
        const l =
          ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(
            t.Type,
          );
        (i = ConfigManager_1.ConfigManager.HandBookConfig?.GetQuestTab(l.Type)),
          (e =
            (this.n6t.SetTitleIcon(i.Icon),
            ConfigManager_1.ConfigManager.HandBookConfig.GetQuestPlotConfig(
              t.QuestId,
            )));
        if (e) {
          i = JSON.parse(e.Data);
          this.OPn.clear(), (this.ZBn = []);
          let t = "";
          for (const u of i) {
            const _ = u.IsHideUi ? "" : u.TidTip;
            if ("" === _) {
              if ("" === t) {
                var s = o?.TidName ?? "",
                  n = this.OPn.get(s);
                if (!n) {
                  (n = []).push(u), (t = s), this.OPn.set(s, n);
                  continue;
                }
              }
              this.OPn.get(t).push(u);
            } else if (
              "" !== t &&
              "" !== _ &&
              PublicUtil_1.PublicUtil.GetConfigTextByKey(t) ===
                PublicUtil_1.PublicUtil.GetConfigTextByKey(_)
            )
              this.OPn.get(t).push(u);
            else {
              let i = this.OPn.get(_);
              i ? i.push(u) : ((i = []).push(u), (t = _), this.OPn.set(_, i));
            }
          }
          var h,
            r = [];
          for ([h] of this.OPn) {
            var a = new HandBookDefine_1.HandBookQuestDynamicData();
            (a.TidText = h), r.push(a), this.ZBn.push(h);
          }
          this.NodeScrollView.RefreshByData(r);
          const _ = r[0].TidText;
          this.kPn(!1, _);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "HandBook",
              5,
              "HandBookPlot_剧情图鉴获取任务对应剧情配置出错",
              ["questId:", t.QuestId],
            );
      }
    }
  }
  VPn() {
    let i = 0;
    for (var [t, e] of this.OPn) {
      var o,
        s = new HandBookDefine_1.HandBookPlotDynamicData();
      (s.NodeText = t), (s.BelongToNode = t), this.wPn.push(s);
      for (const n of e)
        n.Flow.FlowListName &&
          "" !== n.Flow.FlowListName &&
          (o = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
            n.Flow.FlowListName,
            n.Flow.FlowId,
            n.Flow.StateId,
          )) &&
          this.HPn(o, i++, t);
    }
  }
  HPn(i, t, e) {
    this.GPn = 0;
    for (const n of i)
      if ("PlayMovie" === n.Name)
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("HandBook", 5, "播片剧情");
      else if ("ShowTalk" === n.Name)
        for (const h of n.Params.TalkItems)
          if (!(this.GPn && h.Id < this.GPn)) {
            if (
              ((this.GPn = 0), (h.WhoId ?? h.TidTalk) && "Option" !== h.Type)
            ) {
              var o = new HandBookDefine_1.HandBookPlotDynamicData(),
                s =
                  ((o.BelongToNode = e),
                  h.WhoId
                    ? SpeakerById_1.configSpeakerById.GetConfig(h.WhoId)
                    : void 0);
              let i = "";
              " " !==
                (i = s
                  ? (PublicUtil_1.PublicUtil.GetConfigTextByTable(0, s.Id) ??
                    "")
                  : i) &&
                "" !== i &&
                (i += this.zBn),
                (o.TalkOwnerName = i),
                h.PlayVoice &&
                  ((s = PlotAudioById_1.configPlotAudioById.GetConfig(
                    h.TidTalk,
                  )),
                  (o.PlotAudio = s));
              var s = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(h.TidTalk);
              (o.TalkText = s),
                (o.PlotId = t),
                (o.TalkItemId = h.Id),
                this.wPn.push(o);
            }
            h.Options &&
              0 < h.Options.length &&
              ((s = this.BPn.get(t)?.get(h.Id) ?? 0),
              (o = h.Options[s]),
              this.jPn(o.Actions, h.Id),
              this.tVs(h.Options, s, e, t, h.Id)),
              h.Actions && this.jPn(h.Actions, h.Id);
          }
  }
  jPn(i, t) {
    if (i)
      for (const o of i) {
        if ("FinishTalk" === o.Name || "FinishState" === o.Name) return;
        var e;
        "JumpTalk" !== o.Name || (e = o.Params.TalkId) <= t || (this.GPn = e);
      }
  }
  tVs(t, e, o, s, n) {
    const h = new HandBookDefine_1.HandBookPlotDynamicData();
    (h.BelongToNode = o), (h.OptionTalker = !0), this.wPn.push(h);
    for (let i = 0; i < t.length; i++) {
      var r = t[i];
      const h = new HandBookDefine_1.HandBookPlotDynamicData();
      (h.BelongToNode = o),
        (h.OptionIndex = i),
        (h.TalkOption = r),
        (h.IsChoseOption = e === i),
        (h.PlotId = s),
        (h.TalkItemId = n),
        this.wPn.push(h);
    }
  }
  fje() {
    if (0 < this.Z9s.length) {
      for (const i of this.PlotListScrollView?.GetScrollItemItems())
        if (
          i.OptionData?.TalkOption &&
          i.OptionData?.PlotId === this.Z9s[0] &&
          i.OptionData?.TalkItemId === this.Z9s[1] &&
          i.OptionData?.OptionIndex === this.Z9s[2]
        ) {
          UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
            i.GetOptionToggle().GetRootComponent(),
          );
          break;
        }
      this.Z9s = [];
    }
  }
}
exports.HandBookQuestPlotView = HandBookQuestPlotView;
//# sourceMappingURL=HandBookQuestPlotView.js.map
