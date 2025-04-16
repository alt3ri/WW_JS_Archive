"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionShowTalk = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../Abilities/FormationDataController"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionShowTalk extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    switch (
      ((this.Context.CurShowTalk = this.ActionInfo.Params),
      (this.Context.CurShowTalkActionId = this.ActionInfo.ActionId),
      this.Context.OptionsHistory.set(
        this.Context.CurShowTalkActionId,
        new Map(),
      ),
      this.Context.OptionsCollection.push([
        this.Context.CurShowTalkActionId.toString(),
        [],
      ]),
      ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel)
    ) {
      case "LevelA":
      case "LevelB":
        this.aYi();
        break;
      case "LevelC":
        this.hYi();
        break;
      case "LevelD":
      case "Prompt":
        FormationDataController_1.FormationDataController.GlobalIsInFight &&
        ModelManager_1.ModelManager.PlotModel.PlotConfig.SkipTalkWhenFighting
          ? this.FinishExecute(!0)
          : this.hYi();
    }
  }
  hYi() {
    var e = this.ActionInfo.Params,
      t = this.Context,
      a = this.Runner;
    this.FinishExecute(!0, !1), a.FlowShowTalk.Start(e, t);
  }
  aYi() {
    var e,
      t,
      a = this.ActionInfo.Params;
    a?.SequenceDataAsset
      ? ((e = this.Runner),
        (t = this.Context),
        this.FinishExecute(!0, !1),
        e.FlowSequence.Init(a, t),
        e.FlowSequence.Start())
      : this.FinishExecute(!0);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionShowTalk = FlowActionShowTalk;
//# sourceMappingURL=FlowActionShowTalk.js.map
