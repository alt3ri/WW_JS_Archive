"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityPermanentRogueController_1 = require("../PermanentRogue/ActivityPermanentRogueController"),
  MapRogueExploreEndView_1 = require("./View/MapRogueExploreEndView");
class MapRogueController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20683, this.QGc),
      Net_1.Net.Register(15622, this.KGc),
      Net_1.Net.Register(28059, this.XGc),
      Net_1.Net.Register(23307, this.YGc),
      Net_1.Net.Register(16340, this.UNc),
      Net_1.Net.Register(23917, this.Br1),
      Net_1.Net.Register(17269, this.HR1);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20683),
      Net_1.Net.UnRegister(15622),
      Net_1.Net.UnRegister(28059),
      Net_1.Net.UnRegister(23307),
      Net_1.Net.UnRegister(16340),
      Net_1.Net.UnRegister(23917),
      Net_1.Net.UnRegister(17269);
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static async RequestInstResultEnd() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
      e =
        (0 !== e &&
          ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(
            e,
          ),
        new Protocol_1.Aki.Protocol.knc()),
      e = await Net_1.Net.CallAsync(28078, e);
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        29875,
      ),
      ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo(),
      e?.pac && UiManager_1.UiManager.OpenView("RogueBattleSettleView", e.pac);
  }
  static RequestInstLeave() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    0 !== e &&
      ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(
        e,
      ),
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest().finally(
        () => {
          ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo();
        },
      );
  }
  static RequestMove(e, a) {
    var o = new Protocol_1.Aki.Protocol.bnc();
    (o.Jsc = { sac: e, aac: [] }),
      Net_1.Net.Call(17204, o, (e) => {
        e
          ? e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                24749,
              ),
              a?.(!1))
            : a?.(!0)
          : a?.(!1);
      });
  }
  static RequestExecuteOp(e, a, o) {
    var r = new Protocol_1.Aki.Protocol.Pnc();
    (r.w5n = e),
      (r.lI1 = a),
      Net_1.Net.Call(27388, r, (e) => {
        e
          ? (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                24749,
              ),
              o?.(!1)),
            o?.(!0),
            ModelManager_1.ModelManager.MapRogueModel.GameInfo?.SetInteractAvailable(
              3,
              !0,
            ))
          : o?.(!1);
      });
  }
  static CheckInMapRogueInstance() {
    var e;
    return !(
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      !(e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) ||
      34 !== e.InstSubType
    );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "MapRogueMainView",
      this.DNc,
      "MapRogueController.CanOpenMainView",
    ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "RogueBattleMapSummaryView",
        this.VE1,
        "MapRogueController.CanOpenSummaryView",
      );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "MapRogueMainView",
      this.DNc,
    ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "RogueBattleMapSummaryView",
        this.VE1,
      );
  }
  static OpenRogueTipsView(e, a, o, r) {
    a = { TextId: a, TextParam: o ?? [], FinishCallback: r };
    0 === e
      ? UiManager_1.UiManager.OpenView("MapRogueFloatTipsAView", a)
      : UiManager_1.UiManager.OpenView("MapRogueFloatTipsBView", a);
  }
  static OpenRogueMenuView() {
    UiManager_1.UiManager.OpenView("RogueBattleMapSummaryView");
  }
  static OpenRogueFetterView(e) {
    e = { TabName: "RogueBattleMapSummaryFettersTabView", FetterId: e };
    UiManager_1.UiManager.OpenView("RogueBattleMapSummaryView", e);
  }
  static OpenExploreEnd() {
    var e = new MapRogueExploreEndView_1.ExploreEndViewData();
    UiManager_1.UiManager.OpenView("MapRogueExploreEndView", e);
  }
  static OpenExplore() {
    var e = new MapRogueExploreEndView_1.ExploreEndViewData();
    UiManager_1.UiManager.OpenView("MapRogueExploreView", e);
  }
  static OpenMapHelpView() {
    UiManager_1.UiManager.OpenView("RogueBattleMapHelpView");
  }
}
(exports.MapRogueController = MapRogueController),
  ((_a = MapRogueController).KGc = (e) => {
    var a = {
      InstanceId: e.r6n,
      RandomSeed: e.Iac,
      MapGrids: ModelManager_1.ModelManager.MapRogueModel.CreateMapGridDataList(
        e.Eac,
        e.Iac,
      ),
      MapWidth: e.oBc,
      MapHeight: e.nBc,
      PlayerGridIndex: e.c5n,
      MoodMin: e.hBc,
      MoodMax: e.aBc,
      InitMood: e.rBc,
      TeamLv: e.Sr1,
      InBattle: e.iWn,
      CurrencyItemId: e.xd1,
      MoodRuleId: e.Qu1,
      RoleLevel: e.Ebs,
      RoleMaxStar: e._p1,
    };
    ModelManager_1.ModelManager.MapRogueModel.ResetGameInfo(),
      ModelManager_1.ModelManager.MapRogueModel.RefreshGameInfo(a),
      e.Anc?.eac &&
        ModelManager_1.ModelManager.MapRogueModel.GenerateOpList(e.Anc.eac),
      e.Unc &&
        ModelManager_1.ModelManager.RogueBattleModel?.InitOptionData(e.Unc),
      e.Mhc &&
        ModelManager_1.ModelManager.RogueBattleModel?.InitGainData(e.Mhc),
      e.Mr1 &&
        ModelManager_1.ModelManager.RogueBattleModel.InitFormationData(e.Mr1),
      (ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar = e._p1);
  }),
  (MapRogueController.XGc = (e) => {
    var a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (a) {
      for (const t of Object.keys(e.lBc)) {
        var o = Number.parseInt(t),
          r = e.lBc[t];
        ModelManager_1.ModelManager.MapRogueModel.RefreshMapGridData(o, r);
      }
      void 0 !== e.zM1 && (a.PlayerGridIndex = e.zM1);
    }
  }),
  (MapRogueController.YGc = (e) => {
    ModelManager_1.ModelManager.MapRogueModel.GameInfo &&
      (ModelManager_1.ModelManager.MapRogueModel.GameInfo.SetMood(e.rBc, e.sps),
      (ModelManager_1.ModelManager.MapRogueModel.GameInfo.MoodRuleId = e.Qu1));
  }),
  (MapRogueController.HR1 = (e) => {
    var a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    a && a.SetMood(a.Mood, void 0, e.hBc, e.aBc);
  }),
  (MapRogueController.UNc = (e) => {
    var a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (a) {
      (a.InBattle = e.iWn),
        e.iWn
          ? a.HasBindView && UiManager_1.UiManager.CloseView("MapRogueMainView")
          : a.HasBindView || UiManager_1.UiManager.OpenView("MapRogueMainView");
      for (const o of ModelManager_1.ModelManager.MapRogueModel.GetAllOpData())
        o.BattleStateUpdate(e.iWn, a);
    }
  }),
  (MapRogueController.Br1 = (e) => {
    ModelManager_1.ModelManager.MapRogueModel.GameInfo &&
      (ModelManager_1.ModelManager.MapRogueModel.GameInfo.SetTeamLv(
        e.Sr1,
        e.sps,
      ),
      ModelManager_1.ModelManager.MapRogueModel.SetRoleLevel(e.Ebs));
  }),
  (MapRogueController.QGc = (e) => {
    if (ModelManager_1.ModelManager.MapRogueModel.GameInfo) {
      for (const a of e.Oac)
        ModelManager_1.ModelManager.MapRogueModel.RemoveOpData(a);
      for (const o of e.kac)
        ModelManager_1.ModelManager.MapRogueModel.UpdateOpData(o);
      for (const r of e.Bac)
        ModelManager_1.ModelManager.MapRogueModel.AddOpData(r);
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpDataList(!1);
    }
  }),
  (MapRogueController.DNc = () => {
    var e;
    return (
      !!_a.CheckInMapRogueInstance() &&
      !!(e = ModelManager_1.ModelManager.MapRogueModel.GameInfo) &&
      !e.InBattle
    );
  }),
  (MapRogueController.VE1 = () => {
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    return !!e && 3 !== e.GameStage;
  });
//# sourceMappingURL=MapRogueController.js.map
