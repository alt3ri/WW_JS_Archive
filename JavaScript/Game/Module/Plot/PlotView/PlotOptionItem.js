"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotOptionItem = void 0);
const UE = require("ue"),
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
      (this.$1i = void 0),
      (this.vJi = 0),
      (this.Option = void 0),
      (this.MJi = ""),
      (this.SJi = void 0),
      (this.EJi = void 0),
      (this.yJi = 0),
      (this.t_i = void 0),
      (this.OptionIndex = -1),
      (this.IJi = !1),
      (this.TJi = void 0),
      (this.a_i = !1),
      (this.T7e = () => {
        var t = this.$1i.GetToggleItem().GetToggleState();
        return !this.a_i || 1 !== t;
      }),
      (this.__i = () => {
        this.t_i && this.t_i(this);
      }),
      (this.OptionClick = (t = !0) => {
        if (
          t &&
          !this.a_i &&
          ModelManager_1.ModelManager.PlotModel.OptionEnable
        )
          switch (((this.a_i = !0), this.vJi)) {
            case 0:
              this.SJi
                ? (PlotController_1.PlotController.EndInteraction(
                    "Flow" === this.EJi.Type.Type,
                  ),
                  TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
                    this.EJi,
                    this.SJi,
                  ))
                : PlotController_1.PlotController.EndInteraction();
              break;
            case 1:
              this.Option.ReadMarkEnabled &&
                ModelManager_1.ModelManager.PlotModel.MarkGrayOption(
                  this.yJi,
                  this.OptionIndex,
                ),
                this.TJi instanceof PlotView_1.PlotView
                  ? ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SelectOption(
                      this.OptionIndex,
                      this.Option.Actions,
                    )
                  : SequenceController_1.SequenceController.SelectOption(
                      this.OptionIndex,
                    );
          }
      }),
      (this.TJi = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.a_i = !1),
      (this.$1i = new ToggleActionItem_1.ToggleActionItem(this.GetItem(0))),
      this.$1i.SetFunction(this.OptionClick),
      this.$1i.GetToggleItem().OnUndeterminedClicked.Add(this.OptionClick);
    var t = this.$1i.GetToggleItem();
    t.SetToggleState(1),
      t.SetToggleState(0),
      t.CanExecuteChange.Bind(this.T7e),
      this.LJi();
  }
  OnBeforeDestroy() {
    this.DJi(), this.$1i.Destroy();
  }
  LJi() {
    this.$1i.GetToggleItem().OnHover.Add(this.__i);
  }
  DJi() {
    this.$1i.GetToggleItem().OnHover.Clear();
  }
  BindOnHover(t) {
    this.t_i = t;
  }
  SetFollowItemActive(t) {
    this.GetItem(1).SetUIActive(t);
  }
  SetupSubtitleOption(t, e) {
    (this.vJi = 1),
      (this.Option = t),
      (this.MJi = t.TidTalkOption),
      (this.yJi = e),
      (this.OptionIndex = ModelManager_1.ModelManager.PlotModel.GetOptionIndex(
        t,
        e,
      ));
    t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.MJi);
    this.RJi(this.f_i(), t);
  }
  SetupInteractiveOption(t, e) {
    (this.vJi = 0), (this.EJi = t), (this.SJi = e);
    e = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent);
    this.RJi(this.f_i(), e);
  }
  SetupLeaveOption(t) {
    (this.IJi = !0),
      (this.vJi = 0),
      (this.EJi = void 0),
      (this.SJi = void 0),
      this.RJi(this.f_i(), t);
  }
  f_i() {
    let e = void 0;
    switch (this.vJi) {
      case 0: {
        if (!this.EJi) {
          var i = this.IsLeaveItem() ? "Leave" : "Dialog";
          e = this.UJi(i);
          break;
        }
        if (this.IsTask()) {
          var r = this.EJi.Context;
          if (!r) break;
          let t = void 0;
          switch (r.Type) {
            case 2:
              t = r.QuestId;
              break;
            case 6:
              t = r.TreeConfigId;
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
        (t = 1 === this.Option?.OptionStyle ? "OS" : this.EJi.Icon ?? "Dialog"),
          (e = this.UJi(t));
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
  RJi(t, e) {
    let i = e;
    1 === this.vJi &&
      (i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i)),
      this.$1i.SetToggleTexture(t),
      this.$1i.SetToggleText(i);
  }
  UJi(t) {
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
    var t = this.EJi?.Context;
    return (
      !!t &&
      (2 === t.Type ||
        (6 === t.Type &&
          t.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest))
    );
  }
  IsOpenSystemBoard() {
    if ("Actions" === this.EJi?.Type?.Type)
      for (const t of (this.EJi?.Type).Actions)
        if ("OpenSystemBoard" === t.Name) return !0;
    return !1;
  }
  IsLeaveItem() {
    return this.IJi;
  }
  SetToggleGray() {
    this.CheckToggleGray() && this.$1i.GetToggleItem().SetToggleState(2);
  }
  CheckToggleGray() {
    return (
      !!this.Option?.ReadMarkEnabled &&
      ModelManager_1.ModelManager.PlotModel.IsOptionGray(
        this.yJi,
        this.OptionIndex,
      )
    );
  }
  Refresh(t, e, i) {
    t
      ? t instanceof LevelGameplayActionsDefine_1.CommonInteractOption
        ? this.AJi(t)
        : this.PJi(t)
      : this.xJi(),
      (this.a_i = !1),
      this.$1i.GetToggleItem().SetToggleState(0),
      this.SetToggleGray(),
      this.SetFollowItemActive(!1);
  }
  AJi(t) {
    this.TJi instanceof PlotSubtitleView_1.PlotSubtitleView ||
      (this.SetupInteractiveOption(t, this.TJi.InteractController),
      this.SetActive(!0));
  }
  xJi() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      TextById_1.configTextById.GetConfig("Leave").Text,
    );
    this.SetupLeaveOption(t);
  }
  PJi(t) {
    this.SetupSubtitleOption(t, this.TJi.CurrentSubtitle.Id);
  }
  GetToggleItem() {
    return this.$1i?.GetToggleItem();
  }
}
exports.PlotOptionItem = PlotOptionItem;
//# sourceMappingURL=PlotOptionItem.js.map
