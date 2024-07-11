"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowShowTalk = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const PlotController_1 = require("../PlotController");
class FlowShowTalk {
  constructor() {
    (this.CurShowTalk = void 0),
      (this.CurTalkItemIndex = 0),
      (this.Context = void 0),
      (this.B8 = void 0),
      (this.IXi = void 0),
      (this.PXi = -1),
      (this.xXi = !1),
      (this.FXi = !1),
      (this.TPn = !1),
      (this.W4s = !1),
      (this.K4s = !1),
      (this.HXi = () => {
        let t;
        let i = this.CurShowTalk.TalkItems[this.CurTalkItemIndex];
        i.Options && i.Options.length > 0
          ? ((this.Context.CurOptionId = -1),
            (this.K4s = !0),
            this.Context.IsBackground
              ? ((i = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
                (t =
                  ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                    i,
                  )),
                this.HandleShowTalkItemOption(t, i.Options[t].Actions))
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ShowPlotSubtitleOptions,
                ))
          : this.jXi();
      }),
      (this.OnOptionActionCompleted = () => {
        this.jXi();
      }),
      (this.SubmitSubtitle = (t) => {
        this.Context && !this.Context.IsBackground && this.LPn(t);
      });
  }
  FinishShowTalk() {
    this.WXi(),
      (this.xXi = !1),
      ModelManager_1.ModelManager.PlotModel.CenterTextTransition(!1),
      ModelManager_1.ModelManager.PlotModel?.GrayOptionMap.clear(),
      (ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
      (ModelManager_1.ModelManager.PlotModel.OptionEnable = !1),
      (this.Context.CurTalkId = -1),
      (this.W4s = !1),
      (this.K4s = !1),
      (this.Context.CurOptionId = -1),
      (this.Context.CurSubActionId = 0),
      (this.Context.CurShowTalk = void 0),
      (this.Context.CurShowTalkActionId = 0),
      (this.CurTalkItemIndex = -1),
      (this.CurShowTalk = void 0),
      (this.Context = void 0),
      (this.B8 = void 0),
      (this.TPn = !1),
      PlotController_1.PlotController.ClearUi(),
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
      ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
  }
  Start(t, i) {
    (this.CurShowTalk = t),
      (this.Context = i),
      (this.CurTalkItemIndex = -1),
      (this.B8 = ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel),
      this.B8 === "LevelC" &&
        LevelLoadingController_1.LevelLoadingController.CloseLoading(
          0,
          void 0,
          0,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlotStartShowTalk,
        this.CurShowTalk,
      ),
      (ModelManager_1.ModelManager.PlotModel.CurShowTalk = t),
      this.B8 === "Prompt" || this.Context.IsBackground
        ? this.jXi()
        : ControllerHolder_1.ControllerHolder.PlotController.WaitViewCallback(
            (t) => {
              t && this.jXi();
            },
          );
  }
  jXi() {
    let t;
    this.CurShowTalk
      ? (this.CurTalkItemIndex++,
        !this.CurShowTalk.TalkItems ||
        this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length
          ? this.FinishShowTalk()
          : ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
            this.KXi(t)))
      : ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "当前不在ShowTalk节点",
        );
  }
  SwitchTalkItem(i) {
    const e = this.CurShowTalk.TalkItems.length;
    for (let t = 0; t < e; t++) {
      const s = this.CurShowTalk.TalkItems[t];
      if (s.Id === i) return (this.CurTalkItemIndex = t), void this.KXi(s);
    }
    this.FinishShowTalk();
  }
  async KXi(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "[FlowShowTalk][Subtitle] 字幕显示", [
        "id",
        t.Id,
      ]),
      (this.Context.CurTalkId = t.Id),
      (this.Context.CurOptionId = -1),
      (this.W4s = !1),
      (this.IXi = t),
      this.WXi(),
      (this.FXi = !1),
      (this.TPn = !1),
      await this.DPn(),
      await this.APn(t),
      await this.UPn(),
      (this.TPn = !0),
      this.Fc(),
      this.RPn(),
      this.Context.IsBackground && this.LPn();
  }
  LPn(t) {
    this.CurShowTalk &&
      !this.W4s &&
      ((t = t ?? this.IXi),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowShowTalk][Subtitle] 字幕完成", [
          "id",
          t.Id,
        ]),
      (this.W4s = !0),
      (this.IXi = void 0),
      ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle(),
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
        t.Actions,
        this.HXi,
      ));
  }
  HandleShowTalkItemOption(t, i) {
    this.Context?.CurShowTalk &&
      this.Context.CurOptionId === -1 &&
      this.K4s &&
      ((this.FXi = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[FlowShowTalk][Subtitle] 选择选项", [
          "index",
          t,
        ]),
      (this.Context.CurOptionId = t),
      (this.K4s = !1),
      ControllerHolder_1.ControllerHolder.FlowController.SelectOption(
        this.Context.CurTalkId,
        t,
      ),
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
        i,
        this.OnOptionActionCompleted,
      ));
  }
  Skip() {
    let t, i;
    this.CurTalkItemIndex === -1
      ? this.jXi()
      : this.CurTalkItemIndex < this.CurShowTalk.TalkItems.length
        ? this.K4s
          ? ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
            (i =
              ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                t,
              )),
            this.HandleShowTalkItemOption(i, t.Options[i].Actions))
          : !this.W4s &&
            this.TPn &&
            this.LPn(this.CurShowTalk.TalkItems[this.CurTalkItemIndex])
        : this.FinishShowTalk();
  }
  WXi() {
    this.xXi &&
      !this.FXi &&
      ControllerHolder_1.ControllerHolder.FlowController.LogError(
        "遗漏选项C级",
        ["Miss TalkItem Id", this.PXi],
      ),
      !this.CurShowTalk?.TalkItems ||
        this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length ||
        ((this.xXi =
          !!this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options &&
          this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options.length > 0),
        (this.PXi = this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Id));
  }
  Fc() {
    this.Context?.IsBackground ||
      ModelManager_1.ModelManager.PlotModel.HandlePlayMontage(this.IXi.Montage);
  }
  async DPn() {
    const t = this.IXi?.BackgroundConfig;
    if (t && this.B8 === "LevelC" && !this.Context.IsBackground) {
      const s = new CustomPromise_1.CustomPromise();
      const i = () => {
        s.SetResult();
      };
      switch (t.Type) {
        case "Clean":
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !1,
            !0,
            void 0,
            i,
          );
          break;
        case "Image":
          var e = t;
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !0,
            !0,
            e?.ImageAsset,
            i,
          );
          break;
        case "Icon":
          e = t;
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !0,
            !1,
            e?.ImageAsset,
            i,
          );
          break;
        default:
          i();
      }
      await s.Promise;
    }
  }
  async APn(t) {
    this.B8 === "LevelC" &&
      (await ModelManager_1.ModelManager.PlotModel.PlotTemplate.HandleTemplateShowTalk(
        t,
      ));
  }
  async UPn() {
    if (this.B8 === "LevelC" && !this.Context.IsBackground) {
      const t = new CustomPromise_1.CustomPromise();
      const i = this.IXi.Type === "CenterText";
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
        ModelManager_1.ModelManager.PlotModel.CenterTextTransition(i, () => {
          i ||
            ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0),
            t.SetResult();
        }),
        await t.Promise;
    }
  }
  RPn() {
    this.Context.IsBackground ||
      (this.B8 === "Prompt" &&
        ControllerHolder_1.ControllerHolder.PlotController.ShowTipsView(
          this.IXi,
          this.Context.UiParam,
        )) ||
      (this.B8 === "LevelC" && this.IXi?.Type === "CenterText"
        ? ModelManager_1.ModelManager.PlotModel.ShowTalkCenterText(
            this.IXi,
            this.SubmitSubtitle,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdatePlotSubtitle,
            this.IXi,
          ));
  }
  SelectOption(t, i) {
    this.Context &&
      !this.Context.IsBackground &&
      this.HandleShowTalkItemOption(t, i);
  }
}
exports.FlowShowTalk = FlowShowTalk;
// # sourceMappingURL=FlowShowTalk.js.map
