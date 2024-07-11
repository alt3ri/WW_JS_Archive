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
      (this.nVt = void 0),
      (this.ZAn = void 0),
      (this.eUn = void 0),
      (this.tUn = []),
      (this.iUn = new Map()),
      (this.aPn = void 0),
      (this.q8i = 0),
      (this.NeedScrollIndex = 0),
      (this.nUn = 0),
      (this.hPn = !1),
      (this.MOn = ""),
      (this.m6s = !1),
      (this._Pn = ""),
      (this.sUn = new Map()),
      (this.uPn = []),
      (this.aUn = (i, t, e) => {
        var s = new HandBookQuestPlotItem_1.HandBookQuestPlotItem();
        return (
          s.BindClickCallback(this.cPn), s.BindIsSelectFunction(this.mPn), s
        );
      }),
      (this.lUn = (i, t, e) => {
        var s = new HandBookQuestPlotList_1.HandBookQuestPlotList();
        return (
          s.BindClickOptionToggleBack(this.Zu), s.BindOnRefreshNode(this.dPn), s
        );
      }),
      (this.i2e = () => {
        this.CloseMe(),
          HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
      }),
      (this.cPn = (e, i) => {
        if (!this.hPn) {
          this.hPn = !0;
          let t = 0;
          var s = this.tUn.length;
          for (let i = 0; i < s; i++) this.tUn[i].NodeText === e && (t = i);
          this.PlotListScrollView?.ScrollToItemIndex(t).finally(() => {
            (this.hPn = !1), this.dPn(e);
          });
        }
      }),
      (this.hUn = (i = !0, t) => {
        (this.tUn = []),
          this._Un(),
          this.PlotListScrollView?.RefreshByData(this.tUn, i),
          (this.m6s = !0),
          this.PlotListScrollView?.BindLateUpdate(() => {
            this.PlotListScrollView?.UnBindLateUpdate(),
              (this.m6s = !1),
              t && this.dPn(t);
          });
      }),
      (this.D4s = []),
      (this.nHe = () => {
        if (0 < this.D4s.length) {
          for (const i of this.PlotListScrollView?.GetScrollItemItems())
            if (
              i.OptionData?.TalkOption &&
              i.OptionData?.PlotId === this.D4s[0] &&
              i.OptionData?.TalkItemId === this.D4s[1] &&
              i.OptionData?.OptionIndex === this.D4s[2]
            ) {
              UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
                i.GetOptionToggle().GetRootComponent(),
              );
              break;
            }
          this.D4s = [];
        }
      }),
      (this.Zu = (i, t, e, s) => {
        let o = this.iUn.get(i);
        (o = o || new Map()).set(t, e),
          this.iUn.set(i, o),
          this.D4s.push(i, t, e),
          (this.NeedScrollIndex =
            this.PlotListScrollView?.GetDisplayGridStartIndex() ?? 0),
          this.hUn(),
          HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
      }),
      (this.wwe = () => {
        this.q8i--, this.iUn.clear(), this.Og();
      }),
      (this.Pwe = () => {
        this.q8i++, this.iUn.clear(), this.Og();
      }),
      (this.dPn = (t) => {
        if (this.MOn !== t && !this.m6s) {
          this.MOn = t;
          let i = !1;
          for (const s of this.NodeScrollView.GetScrollItemItems())
            s?.GetTidText() === t
              ? (s.SetToggleState(1), (i = !0))
              : s.SetToggleState(0);
          if (!i) {
            let i = 0;
            for (var [e] of this.sUn) {
              if (e === t) break;
              i++;
            }
            this.NodeScrollView?.ScrollToItemIndex(i).finally(() => {
              this.NodeScrollView?.GetScrollItemFromIndex(0)?.SetToggleState(1);
            });
          }
        }
      }),
      (this.mPn = (i) => this.MOn === i);
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
    (this.eUn = new HandBootPlotDynamicItem_1.HandBootPlotDynamicItem()),
      (this.PlotListScrollView = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(8),
        this.GetItem(4),
        this.eUn,
        this.lUn,
      )),
      this.PlotListScrollView.BindLateUpdate(this.nHe),
      await this.PlotListScrollView.Init(),
      (this.ZAn = new HandBootQuestDynamicItem_1.HandBootQuestDynamicItem()),
      (this.NodeScrollView = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(1),
        this.GetItem(2),
        this.ZAn,
        this.aUn,
      )),
      await this.NodeScrollView.Init();
  }
  OnStart() {
    (this._Pn =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ColonTag") ?? ""),
      (this._Pn = this._Pn + " "),
      (this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.nVt.SetCloseCallBack(this.i2e),
      this.nVt.SetHelpBtnActive(!1);
    var i = this.OpenParam;
    (this.aPn = i.ConfigIdList), (this.q8i = i.Index), this.Og();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPhotoSelect,
      this.aPn[this.q8i],
    );
  }
  Og() {
    var i = this.aPn?.length ?? 0;
    if (this.q8i >= i || this.q8i < 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("HandBook", 5, "HandBookPlot_剧情图鉴选择任务出错", [
          "index:",
          this.q8i,
        ]);
    else {
      this.GetButton(5)?.RootUIComp.SetUIActive(0 < this.q8i),
        this.GetButton(6)?.RootUIComp.SetUIActive(this.q8i + 1 < i);
      var i = this.aPn[this.q8i],
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
        var s = ModelManager_1.ModelManager.QuestNewModel?.GetQuestConfig(
            t.QuestId,
          ),
          e = s?.TidName
            ? PublicUtil_1.PublicUtil.GetConfigTextByKey(s.TidName)
            : "";
        this.nVt.SetTitle(e);
        const l =
          ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(
            t.Type,
          );
        (i = ConfigManager_1.ConfigManager.HandBookConfig?.GetQuestTab(l.Type)),
          (e =
            (this.nVt.SetTitleIcon(i.Icon),
            ConfigManager_1.ConfigManager.HandBookConfig.GetQuestPlotConfig(
              t.QuestId,
            )));
        if (e) {
          i = JSON.parse(e.Data);
          this.sUn.clear(), (this.uPn = []);
          let t = "";
          for (const f of i) {
            const _ = f.IsHideUi ? "" : f.TidTip;
            if ("" === _) {
              if ("" === t) {
                var o = s?.TidName ?? "",
                  n = this.sUn.get(o);
                if (!n) {
                  (n = []).push(f), (t = o), this.sUn.set(o, n);
                  continue;
                }
              }
              this.sUn.get(t).push(f);
            } else if (
              "" !== t &&
              "" !== _ &&
              PublicUtil_1.PublicUtil.GetConfigTextByKey(t) ===
                PublicUtil_1.PublicUtil.GetConfigTextByKey(_)
            )
              this.sUn.get(t).push(f);
            else {
              let i = this.sUn.get(_);
              i ? i.push(f) : ((i = []).push(f), (t = _), this.sUn.set(_, i));
            }
          }
          var h,
            r = [];
          for ([h] of this.sUn) {
            var a = new HandBookDefine_1.HandBookQuestDynamicData();
            (a.TidText = h), r.push(a), this.uPn.push(h);
          }
          this.NodeScrollView.RefreshByData(r);
          const _ = r[0].TidText;
          this.hUn(!1, _);
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
  _Un() {
    let i = 0;
    for (var [t, e] of this.sUn) {
      var s,
        o = new HandBookDefine_1.HandBookPlotDynamicData();
      (o.NodeText = t), (o.BelongToNode = t), this.tUn.push(o);
      for (const n of e)
        n.Flow.FlowListName &&
          "" !== n.Flow.FlowListName &&
          (s = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
            n.Flow.FlowListName,
            n.Flow.FlowId,
            n.Flow.StateId,
          )) &&
          this.uUn(s, i++, t);
    }
  }
  uUn(i, t, e) {
    this.nUn = 0;
    for (const n of i)
      if ("PlayMovie" === n.Name)
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("HandBook", 5, "播片剧情");
      else if ("ShowTalk" === n.Name)
        for (const h of n.Params.TalkItems)
          if (!(this.nUn && h.Id < this.nUn)) {
            if (
              ((this.nUn = 0), (h.WhoId ?? h.TidTalk) && "Option" !== h.Type)
            ) {
              var s = new HandBookDefine_1.HandBookPlotDynamicData(),
                o =
                  ((s.BelongToNode = e),
                  h.WhoId
                    ? SpeakerById_1.configSpeakerById.GetConfig(h.WhoId)
                    : void 0);
              let i = "";
              " " !==
                (i = o
                  ? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, o.Id) ?? ""
                  : i) &&
                "" !== i &&
                (i += this._Pn),
                (s.TalkOwnerName = i),
                h.PlayVoice &&
                  ((o = PlotAudioById_1.configPlotAudioById.GetConfig(
                    h.TidTalk,
                  )),
                  (s.PlotAudio = o));
              var o = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(h.TidTalk);
              (s.TalkText = o),
                (s.PlotId = t),
                (s.TalkItemId = h.Id),
                this.tUn.push(s);
            }
            h.Options &&
              0 < h.Options.length &&
              ((o = this.iUn.get(t)?.get(h.Id) ?? 0),
              (s = h.Options[o]),
              this.cUn(s.Actions, h.Id),
              this.mFs(h.Options, o, e, t, h.Id)),
              h.Actions && this.cUn(h.Actions, h.Id);
          }
  }
  cUn(i, t) {
    if (i)
      for (const s of i) {
        if ("FinishTalk" === s.Name || "FinishState" === s.Name) return;
        var e;
        "JumpTalk" !== s.Name || (e = s.Params.TalkId) <= t || (this.nUn = e);
      }
  }
  mFs(t, e, s, o, n) {
    const h = new HandBookDefine_1.HandBookPlotDynamicData();
    (h.BelongToNode = s), (h.OptionTalker = !0), this.tUn.push(h);
    for (let i = 0; i < t.length; i++) {
      var r = t[i];
      const h = new HandBookDefine_1.HandBookPlotDynamicData();
      (h.BelongToNode = s),
        (h.OptionIndex = i),
        (h.TalkOption = r),
        (h.IsChoseOption = e === i),
        (h.PlotId = o),
        (h.TalkItemId = n),
        this.tUn.push(h);
    }
  }
}
exports.HandBookQuestPlotView = HandBookQuestPlotView;
//# sourceMappingURL=HandBookQuestPlotView.js.map
