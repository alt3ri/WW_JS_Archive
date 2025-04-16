"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpGridEvent = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpGridEvent extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments),
      (this.InEventView = !1),
      (this.StepSize = 2),
      (this.EventStepUpdateFunc = void 0);
  }
  ToString() {
    return (
      `[GridEvent] IncId:${this.IncId} InStart:${this.IsInStart} InPlot:${this.IsInPlot} PlotStepId:` +
      this.CurrentStepId
    );
  }
  OnUpdate(t) {
    this.IsStartExecute && this.ksi(t);
  }
  ksi(t) {
    var e, i;
    this.IsInStart
      ? ((e = this.Data.rac?.hr1?.J2s ?? 0),
        (e =
          ConfigManager_1.ConfigManager.MapRogueConfig.GetGridEventConfigById(
            e,
          )) &&
        ((i =
          ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()).EventStartSpineType.includes(
          e.EventType,
        ) && t.RoleAnimProxy("Fight", !1),
        i.EventStartSeqType.includes(e.EventType))
          ? UiManager_1.UiManager.OpenView("MapRogueEventStartView", this.IncId)
          : this.Execute(t))
      : this.IsInPlot &&
        !t.InBattle &&
        (this.InEventView
          ? this.EventStepUpdateFunc?.(this.CurrentStepId)
          : 3 ===
              ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(
                this.CurrentStepId,
              )?.Type
            ? this.ExecuteStep(this.CurrentStepId, 0)
            : UiManager_1.UiManager.OpenView(
                "MapRogueGridEventView",
                this.IncId,
                (t) => {
                  this.InEventView = t;
                },
              ));
  }
  OnBattleStateUpdate(t, e) {
    t &&
      this.InEventView &&
      UiManager_1.UiManager.CloseView("MapRogueGridEventView", () => {
        this.InEventView = !1;
      });
  }
  OnStartExecute(t) {
    this.ksi(t);
  }
  OnExecute(t) {
    1 === this.CurrentStep && this.ExecuteOp();
  }
  OnFinish(t) {}
  OnDelete(t) {
    this.InEventView &&
      UiManager_1.UiManager.CloseView("MapRogueGridEventView", () => {
        this.InEventView = !1;
      });
  }
  ExecuteStep(t, e) {
    this.CurrentStepId === t &&
      this.Data.rac.Eh1._r1 === Protocol_1.Aki.Protocol._r1.Proto_WaitConfirm &&
      ((this.OpExecuteClientId = e), this.ExecuteOp());
  }
  get IsInStart() {
    return (
      this.Data.rac?.yh1 === Protocol_1.Aki.Protocol.yh1.Proto_SpecialEffect
    );
  }
  get IsInPlot() {
    return (
      this.Data.rac?.yh1 === Protocol_1.Aki.Protocol.yh1.Proto_EventPloting
    );
  }
  get CurrentPlotId() {
    return this.IsInPlot ? (this.Data.rac?.Eh1?.lr1 ?? 0) : 0;
  }
  get CurrentStepId() {
    return this.IsInPlot ? (this.Data.rac?.Eh1?.kqs ?? 0) : 0;
  }
  get CurrentPlotBgId() {
    return this.IsInPlot ? (this.Data.rac?.Eh1?.ur1 ?? 0) : 0;
  }
  get CurrentPlotBgmId() {
    return this.IsInPlot ? (this.Data.rac?.Eh1?.dr1 ?? 0) : 0;
  }
  get CurrentOptions() {
    return this.IsInPlot ? (this.Data.rac?.Eh1?.cr1 ?? []) : [];
  }
}
exports.MapRogueOpGridEvent = MapRogueOpGridEvent;
//# sourceMappingURL=MapRogueOpGridEvent.js.map
