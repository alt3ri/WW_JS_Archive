"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotOptionItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalConfigFromCsvByName_1 = require("../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TalkOptionIconById_1 = require("../../../../Core/Define/ConfigQuery/TalkOptionIconById"),
  TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem"),
  TsInteractionUtils_1 = require("../../Interaction/TsInteractionUtils"),
  PlotSubtitleView_1 = require("../../Sequence/Subtitle/PlotSubtitleView"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  PlotController_1 = require("../PlotController"),
  SequenceController_1 = require("../Sequence/SequenceController"),
  PlotView_1 = require("./PlotView");
class PlotOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(),
      (this.$_i = void 0),
      (this.fzi = 0),
      (this.Option = void 0),
      (this.pzi = ""),
      (this.vzi = void 0),
      (this.Mzi = void 0),
      (this.Ezi = 0),
      (this.tui = void 0),
      (this.OptionIndex = -1),
      (this.Szi = !1),
      (this.yzi = void 0),
      (this.aui = !1),
      (this.Lke = () => {
        var t;
        return (
          !this.$_i.IsPlayingReleaseSequence &&
          ((t = this.$_i.GetToggleItem().GetToggleState()),
          !this.aui || 1 !== t)
        );
      }),
      (this._ui = () => {
        this.tui && this.tui(this);
      }),
      (this.OptionClick = (t = 0) => {
        ModelManager_1.ModelManager.PlotModel.OptionEnable
          ? ((ModelManager_1.ModelManager.PlotModel.OptionEnable = !1),
            (this.aui = !0),
            this.$_i.PlayReleaseSequence().then(
              () => {
                switch ((this.$_i.SetRaycastTarget(!1), this.fzi)) {
                  case 0:
                    this.vzi
                      ? (PlotController_1.PlotController.EndInteraction(
                          "Flow" === this.Mzi.Type.Type,
                        ),
                        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
                          this.Mzi,
                          this.vzi,
                        ))
                      : PlotController_1.PlotController.EndInteraction();
                    break;
                  case 1:
                    ModelManager_1.ModelManager.PlotModel.MarkGrayOption(
                      this.Ezi,
                      this.OptionIndex,
                    ),
                      this.yzi instanceof PlotView_1.PlotView
                        ? ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SelectOption(
                            this.OptionIndex,
                            this.Option.Actions,
                          )
                        : SequenceController_1.SequenceController.SelectOption(
                            this.OptionIndex,
                            this.Ezi,
                          );
                }
              },
              () => {},
            ))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "剧情选项点击失效",
              ["index", this.OptionIndex],
              ["id", this.Ezi],
            );
      }),
      (this.yzi = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    (this.$_i = new ToggleActionItem_1.ToggleActionItem()),
      await this.$_i.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    (this.aui = !1),
      this.$_i.SetFunction(this.OptionClick),
      this.$_i.GetToggleItem().OnUndeterminedClicked.Add(this.OptionClick),
      this.$_i.GetToggleItem().CanExecuteChange.Bind(this.Lke),
      this.Izi();
  }
  OnBeforeDestroy() {
    this.Tzi(), this.$_i.Destroy();
  }
  Izi() {
    this.$_i.GetToggleItem().OnHover.Add(this._ui);
  }
  Tzi() {
    this.$_i.GetToggleItem().OnHover.Clear();
  }
  BindOnHover(t) {
    this.tui = t;
  }
  SetSelectedDisplay(t) {
    if ((this.GetItem(1).SetUIActive(t), this.$_i)) {
      const e = this.$_i.GetToggleItem();
      if (e)
        if (t) e.SetToggleState(0, !1), e.SetToggleState(1, !1);
        else if (this.Option?.ReadMarkEnabled)
          if (this.CheckToggleGray()) {
            const e = this.$_i.GetToggleItem();
            void e.SetToggleState(2);
          } else e.SetToggleState(0, !1);
        else e.SetToggleState(0, !1);
    }
  }
  SetupSubtitleOption(t, e) {
    (this.fzi = 1),
      (this.Option = t),
      (this.pzi = t.TidTalkOption),
      (this.Ezi = e),
      (this.OptionIndex = ModelManager_1.ModelManager.PlotModel.GetOptionIndex(
        t,
        e,
      ));
    t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.pzi);
    this.Lzi(this.fui(), t);
  }
  SetupInteractiveOption(t, e) {
    (this.fzi = 0), (this.Mzi = t), (this.vzi = e);
    e = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent);
    this.Lzi(this.fui(), e);
  }
  SetupLeaveOption(t) {
    (this.Szi = !0),
      (this.fzi = 0),
      (this.Mzi = void 0),
      (this.vzi = void 0),
      this.Lzi(this.fui(), t);
  }
  fui() {
    let e = void 0;
    switch (this.fzi) {
      case 0: {
        if (!this.Mzi) {
          var i = this.IsLeaveItem() ? "Leave" : "Dialog";
          e = this.Dzi(i);
          break;
        }
        if (this.IsTask()) {
          var o = this.Mzi.Context;
          if (!o) break;
          let t = void 0;
          switch (o.Type) {
            case 2:
              t = o.QuestId;
              break;
            case 6:
              t = o.TreeConfigId;
          }
          if (void 0 === t) break;
          i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
          if (!i) break;
          i = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
            i.QuestMarkId,
          );
          e = i?.NpcTaskIcon;
          break;
        }
        let t = "Dialog";
        (t =
          1 === this.Option?.OptionStyle ? "OS" : (this.Mzi.Icon ?? "Dialog")),
          (e = this.Dzi(t));
        break;
      }
      case 1:
        this.Option &&
          ((i = this.Option.Icon ?? 1),
          (i = TalkOptionIconById_1.configTalkOptionIconById.GetConfig(i))) &&
          (e = i.Icon);
    }
    return e ?? "";
  }
  Lzi(t, e) {
    let i = e;
    1 === this.fzi &&
      (i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i)),
      this.$_i.SetToggleTexture(t),
      this.$_i.SetToggleText(i);
  }
  Dzi(t) {
    t =
      GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "EInteractIcon." + t,
      ) ??
      GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "EInteractDefaultIcon." + t,
      );
    return void 0 === t ? "" : t.Value;
  }
  IsTask() {
    var t = this.Mzi?.Context;
    return (
      !!t &&
      (2 === t.Type ||
        (6 === t.Type &&
          t.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest))
    );
  }
  IsOpenSystemBoard() {
    if ("Actions" === this.Mzi?.Type?.Type)
      for (const t of (this.Mzi?.Type).Actions)
        if ("OpenSystemBoard" === t.Name) return !0;
    return !1;
  }
  IsLeaveItem() {
    return this.Szi;
  }
  CheckToggleGray() {
    return ModelManager_1.ModelManager.PlotModel.IsOptionGray(
      this.Ezi,
      this.OptionIndex,
    );
  }
  Refresh(t, e, i) {
    t
      ? t instanceof LevelGameplayActionsDefine_1.CommonInteractOption
        ? this.Rzi(t)
        : this.Uzi(t)
      : this.Azi(),
      (this.aui = !1),
      this.SetSelectedDisplay(!1),
      this.$_i.SetRaycastTarget(!0);
  }
  Rzi(t) {
    this.yzi instanceof PlotSubtitleView_1.PlotSubtitleView ||
      (this.SetupInteractiveOption(t, this.yzi.InteractController),
      this.SetActive(!0));
  }
  Azi() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      TextById_1.configTextById.GetConfig("Leave").Text,
    );
    this.SetupLeaveOption(t);
  }
  Uzi(t) {
    this.SetupSubtitleOption(t, this.yzi.CurrentSubtitle.Id);
  }
  GetToggleItem() {
    return this.$_i?.GetToggleItem();
  }
}
exports.PlotOptionItem = PlotOptionItem;
//# sourceMappingURL=PlotOptionItem.js.map
