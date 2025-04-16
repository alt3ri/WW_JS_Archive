"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportSettlementView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LevelPlayReportController_1 = require("../../../LevelPlayReport/LevelPlayReportController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PunishReportSettlementConditionItem_1 = require("./PunishReportSettlementConditionItem"),
  PunishReportSettlementSuccessItem_1 = require("./PunishReportSettlementSuccessItem");
class PunishReportSettlementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cfl =
        new PunishReportSettlementSuccessItem_1.PunishReportSettlementSuccessItem()),
      (this.TGl = []),
      (this.SPe = void 0),
      (this.LGl = 0),
      (this.UGl = () => {
        for (const e of this.TGl) e.PlaySequence().finally(this.yct);
      }),
      (this.yct = () => {
        this.LGl++,
          this.LGl >= this.TGl.length &&
            TimerSystem_1.TimerSystem.Delay(() => {
              UiManager_1.UiManager.CloseView(this.Info.Name);
            }, 2e3);
      }),
      (this.e8l = (e) => {
        "Start01" === e && this.UGl();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam,
      i = e.States,
      t =
        (await this.Lfl(),
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id),
      e = e.TreeConfigId,
      r =
        (await LevelPlayReportController_1.LevelPlayReportController.RequestLevelPlayVarAsync(
          t,
          e,
        ),
        ModelManager_1.ModelManager.LevelPlayReportModel.GetLevelPlayReportTarget(
          t,
          e,
        )),
      s = [],
      n = this.GetItem(0);
    n?.SetUIActive(!1);
    for (let t = 0; t < r.ConditionTxtIds.length; t++) {
      var a = r.ConditionTxtIds[t],
        o = r.States[t],
        l =
          new PunishReportSettlementConditionItem_1.PunishReportSettlementConditionItem();
      let e = this.GetItem(1);
      0 !== t && (e = LguiUtil_1.LguiUtil.CopyItem(e, n)),
        s.push(l.CreateThenShowByActorAsync(e.GetOwner()));
      var h = i.length > t ? i[t] : 0;
      l.Init(a, o, h), this.TGl.push(l);
    }
    await Promise.all(s);
  }
  async Lfl() {
    await this.cfl.CreateByResourceIdAsync(
      "UiView_Challenge_Success_Prefab",
      this.RootItem,
    ),
      await this.cfl.HideAsync();
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.e8l);
  }
  OnAfterShow() {
    this.cfl.ShowTip(),
      TimerSystem_1.TimerSystem.Delay(() => {
        this.GetItem(0)?.SetUIActive(!0),
          this.SPe?.PlayLevelSequenceByName("Start01");
      }, 1e3);
  }
}
exports.PunishReportSettlementView = PunishReportSettlementView;
//# sourceMappingURL=PunishReportSettlementView.js.map
