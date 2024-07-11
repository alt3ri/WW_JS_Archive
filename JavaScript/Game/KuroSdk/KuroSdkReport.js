"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkReportLevel =
    exports.SdkReportChapter =
    exports.SdkReportDirectBuy =
    exports.SdkReportPay =
    exports.SdkReportRecharge =
    exports.SdkReportStartFlow =
    exports.SdkReportQuestFinish =
    exports.SdkReportBattleTech =
    exports.SdkReportClickEnterGame =
    exports.SdkReportCreateRole =
    exports.SdkReportChangeAccount =
    exports.SdkReportOpenPrivacy =
    exports.SdkReportGameInitFinish =
    exports.KuroSdkReport =
      void 0);
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const HotPatchKuroSdk_1 = require("../../Launcher/HotPatchKuroSdk/HotPatchKuroSdk");
const SdkReportData_1 = require("../../Launcher/HotPatchKuroSdk/SdkReportData");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const PayShopDefine_1 = require("../Module/PayShop/PayShopDefine");
const KILLPHANTOMMISSION = 139000025;
const CAPTUREPHANTOMMISSION = 139000026;
const CHAPTERCPRE1 = 139000025;
const CHAPTERCPRE2 = 139000026;
const CHAPTERC11 = 139000027;
const CHAPTERC12 = 139000029;
const CHAPTERC13 = 139000030;
const CHAPTERC14 = 139000031;
const CHAPTERC15 = 114000020;
const CHAPTERC16 = 140000004;
const KILLPHANTOMSTEP1 = 6;
const KILLPHANTOMSTEP2 = 10;
const KILLPHANTOMSTEP3 = 91;
const KILLPHANTOMSTEP4 = 132;
const GOJINZHOU = 16;
const STARTFLOW = 1;
const STARTSTATE = 1;
const RECHARGEONE = 1;
const RECHARGETWO = 2;
const RECHARGETHREE = 3;
const RECHARGEFOUR = 4;
const RECHARGEFIVE = 5;
const RECHARGESIX = 6;
const REPORTLEVEL8 = 8;
const REPORTLEVEL10 = 10;
const REPORTLEVEL12 = 12;
const REPORTLEVEL15 = 15;
const REPORTLEVEL20 = 20;
const REPORTLEVEL25 = 25;
const REPORTLEVEL30 = 30;
const REPORTLEVEL35 = 35;
const REPORTLEVEL40 = 40;
const REPORTLEVEL45 = 45;
const CREATEROLEEVENTID = "101104";
const BATTLEEVENTID = "101803";
const QUESTEVENTID = "101805";
const FLOWEVENTID = "123000";
class KuroSdkReport {
  static Init() {
    this.mEe();
  }
  static Report(e) {
    HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(e);
  }
  static mEe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.REe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.UEe,
      );
  }
  static OnPlayerLevelChange(e) {
    let t;
    SdkReportLevel.IfNeedReport(e) &&
      (((t = new SdkReportLevel(void 0)).Level = e), this.Report(t));
  }
  static OnPlotFinish(e) {
    let t;
    SdkReportStartFlow.IfNeedReport(e.FlowId, e.FlowStateId) &&
      (((t = new SdkReportStartFlow(void 0)).FlowId = e.FlowId),
      this.Report(t));
  }
  static OnSdkPay() {
    const e = new SdkReportPay(void 0);
    this.Report(e);
  }
  static OnPayShopDirectBuy(e) {
    let t;
    SdkReportDirectBuy.IfNeedReport(e) &&
      (((t = new SdkReportDirectBuy(void 0)).PayItemId = e), this.Report(t));
  }
  static OnChapterStart(e, t) {}
}
(exports.KuroSdkReport = KuroSdkReport),
  ((_a = KuroSdkReport).UEe = (e) => {
    let t;
    SdkReportRecharge.IfNeedReport(e.PayItemId) &&
      (((t = new SdkReportRecharge(void 0)).PayItemId = e.PayItemId),
      _a.Report(t));
  }),
  (KuroSdkReport.DEe = (e, t) => {
    let r;
    SdkReportQuestFinish.IfNeedReport(e) &&
      (((r = new SdkReportQuestFinish(void 0)).QuestId = e), _a.Report(r)),
      SdkReportChapter.IfNeedReport(e, 0) &&
        t === Protocol_1.Aki.Protocol.kMs.Proto_Finish &&
        (((r = new SdkReportChapter(void 0)).TreeConfigId = e), _a.Report(r));
  }),
  (KuroSdkReport.REe = (e, t, r) => {
    let E;
    e.Type === 6 &&
      ((E = e.TreeConfigId),
      (e = e.NodeId),
      SdkReportBattleTech.IfNeedReport(E, e)) &&
      r === Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Finished &&
      (((r = new SdkReportBattleTech(void 0)).TreeConfigId = E),
      (r.NodeId = e),
      _a.Report(r));
  });
class SdkReportGameInitFinish extends SdkReportData_1.SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Game_Initialize" : "";
  }
}
exports.SdkReportGameInitFinish = SdkReportGameInitFinish;
class SdkReportOpenPrivacy extends SdkReportData_1.SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Game_Privacy" : "";
  }
}
exports.SdkReportOpenPrivacy = SdkReportOpenPrivacy;
class SdkReportChangeAccount extends SdkReportData_1.SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Change_account" : "";
  }
}
exports.SdkReportChangeAccount = SdkReportChangeAccount;
class SdkReportCreateRole extends SdkReportData_1.SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Completed_Registration" : "event_1";
  }
  GetEventDataJson() {
    return (
      this.IfGlobalSdk
        ? ((this.EventData = new Map()),
          this.EventData.set("eventId", CREATEROLEEVENTID))
        : ((this.EventData = new Map()),
          this.EventData.set("param1", CREATEROLEEVENTID)),
      super.GetEventDataJson()
    );
  }
}
exports.SdkReportCreateRole = SdkReportCreateRole;
class SdkReportClickEnterGame extends SdkReportData_1.SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "click_entergame" : "event_2";
  }
}
exports.SdkReportClickEnterGame = SdkReportClickEnterGame;
class SdkReportBattleTech extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments), (this.TreeConfigId = 0), (this.NodeId = 0);
  }
  static IfNeedReport(e, t) {
    return (
      (e === KILLPHANTOMMISSION &&
        (t === KILLPHANTOMSTEP1 ||
          t === KILLPHANTOMSTEP2 ||
          t === KILLPHANTOMSTEP3)) ||
      (e === CAPTUREPHANTOMMISSION && KILLPHANTOMSTEP4 === t) ||
      (e === CAPTUREPHANTOMMISSION && GOJINZHOU === t)
    );
  }
  GetEventName() {
    return (this.IfGlobalSdk && SdkReportBattleTech.AEe.get(this.NodeId)) || "";
  }
  GetEventDataJson() {
    return (
      (this.EventData = new Map()),
      this.EventData.set("eventId", BATTLEEVENTID),
      this.EventData.set("TreeId", this.TreeConfigId.toString()),
      this.EventData.set("StepId", this.NodeId.toString()),
      super.GetEventDataJson()
    );
  }
}
(exports.SdkReportBattleTech = SdkReportBattleTech).AEe = new Map([
  [KILLPHANTOMSTEP1, "Beginner_level_Battle_Teach_Finish"],
  [KILLPHANTOMSTEP2, "Intermediater_level_Battle_Teach_Finish"],
  [KILLPHANTOMSTEP3, "Advanced_level_Battle_Teach_Finish"],
  [KILLPHANTOMSTEP4, "capture_Teach_Finish"],
  [GOJINZHOU, "Prologue_Task_Finish"],
]);
class SdkReportQuestFinish extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments), (this.QuestId = 0);
  }
  static IfNeedReport(e) {
    if (
      e === CAPTUREPHANTOMMISSION &&
      ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 3
    )
      return !0;
    return !1;
  }
  GetEventName() {
    return (
      (this.IfGlobalSdk && SdkReportQuestFinish.AEe.get(this.QuestId)) || ""
    );
  }
  GetEventDataJson() {
    return (
      this.QuestId === CAPTUREPHANTOMMISSION &&
        ((this.EventData = new Map()),
        this.EventData.set("eventId", QUESTEVENTID),
        this.EventData.set("QuestId", this.QuestId.toString())),
      super.GetEventDataJson()
    );
  }
}
(exports.SdkReportQuestFinish = SdkReportQuestFinish).AEe = new Map([
  [CAPTUREPHANTOMMISSION, "Prologue_Task_Finish"],
]);
class SdkReportStartFlow extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments), (this.FlowId = 0);
  }
  GetEventName() {
    return this.IfGlobalSdk ? "Anime_end" : "";
  }
  static IfNeedReport(e, t) {
    return e === STARTFLOW && t === STARTSTATE;
  }
  GetEventDataJson() {
    return (
      (this.EventData = new Map()),
      this.EventData.set("eventId", FLOWEVENTID),
      this.EventData.set("FlowId", this.FlowId.toString()),
      super.GetEventDataJson()
    );
  }
}
exports.SdkReportStartFlow = SdkReportStartFlow;
class SdkReportRecharge extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments), (this.PayItemId = 0);
  }
  static IfNeedReport(e) {
    return e >= RECHARGEONE && e <= RECHARGESIX;
  }
  GetEventName() {
    if (this.IfGlobalSdk) {
      const e = SdkReportRecharge.AEe.get(this.PayItemId);
      return e || "";
    }
    const e = SdkReportRecharge.PEe.get(this.PayItemId);
    return e || "";
  }
}
((exports.SdkReportRecharge = SdkReportRecharge).AEe = new Map([
  [RECHARGEONE, "Purchase_099"],
  [RECHARGETWO, "Purchase_499"],
  [RECHARGETHREE, "Purchase_1499"],
  [RECHARGEFOUR, "Purchase_2999"],
  [RECHARGEFIVE, "Purchase_4999"],
  [RECHARGESIX, "Purchase_9999"],
])),
  (SdkReportRecharge.PEe = new Map([
    [RECHARGEONE, "event_5"],
    [RECHARGETWO, "event_6"],
    [RECHARGETHREE, "event_7"],
    [RECHARGEFOUR, "event_8"],
    [RECHARGEFIVE, "event_9"],
    [RECHARGESIX, "event_10"],
  ]));
class SdkReportPay extends SdkReportData_1.SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "" : "event_4";
  }
}
exports.SdkReportPay = SdkReportPay;
class SdkReportDirectBuy extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments), (this.PayItemId = 0);
  }
  static IfNeedReport(e) {
    return (
      e === PayShopDefine_1.MONTH_CARD_SHOP_ID ||
      e === PayShopDefine_1.BATTLE_PASS_PRIMARY_ID ||
      e === PayShopDefine_1.BATTLE_PASS_HIGH_ID ||
      e === PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID
    );
  }
  GetEventName() {
    return (
      (this.IfGlobalSdk && SdkReportDirectBuy.AEe.get(this.PayItemId)) || ""
    );
  }
}
(exports.SdkReportDirectBuy = SdkReportDirectBuy).AEe = new Map([
  [PayShopDefine_1.MONTH_CARD_SHOP_ID, "Monthly_card"],
  [PayShopDefine_1.BATTLE_PASS_PRIMARY_ID, "BattlePass_Primary"],
  [PayShopDefine_1.BATTLE_PASS_HIGH_ID, "BattlePass_HIGH"],
  [
    PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID,
    "BattlePass_Primary_To_HIGH",
  ],
]);
class SdkReportChapter extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments), (this.TreeConfigId = 0);
  }
  static IfNeedReport(e, t) {
    return (
      e === CHAPTERCPRE1 ||
      e === CHAPTERCPRE2 ||
      e === CHAPTERC11 ||
      e === CHAPTERC12 ||
      e === CHAPTERC13 ||
      e === CHAPTERC14 ||
      e === CHAPTERC15 ||
      e === CHAPTERC16
    );
  }
  GetEventName() {
    if (this.IfGlobalSdk) {
      const e = SdkReportChapter.AEe.get(this.TreeConfigId);
      return e || "";
    }
    const e = SdkReportChapter.PEe.get(this.TreeConfigId);
    return e || "";
  }
}
((exports.SdkReportChapter = SdkReportChapter).AEe = new Map([
  [CHAPTERCPRE1, "Complete_pre_1"],
  [CHAPTERCPRE2, "Complete_pre_2"],
  [CHAPTERC11, "Complete_C1_1"],
  [CHAPTERC12, "Complete_C1_2"],
  [CHAPTERC13, "Complete_C1_3"],
  [CHAPTERC14, "Complete_C1_4"],
  [CHAPTERC15, "Complete_C1_5"],
  [CHAPTERC16, "Complete_C1_6"],
])),
  (SdkReportChapter.PEe = new Map([
    [CHAPTERCPRE1, "event_12"],
    [CHAPTERCPRE2, "event_13"],
    [CHAPTERC11, "event_14"],
    [CHAPTERC12, "event_15"],
    [CHAPTERC13, "event_16"],
    [CHAPTERC14, "event_17"],
    [CHAPTERC15, "event_18"],
    [CHAPTERC16, "event_19"],
  ]));
class SdkReportLevel extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments), (this.Level = 0);
  }
  static IfNeedReport(e) {
    return !!SdkReportLevel.xEe.includes(e);
  }
  GetEventName() {
    return this.IfGlobalSdk
      ? StringUtils_1.StringUtils.Format("Level_{0}", this.Level.toString())
      : SdkReportLevel.PEe.get(this.Level) || "";
  }
}
((exports.SdkReportLevel = SdkReportLevel).xEe = new Array(
  REPORTLEVEL8,
  REPORTLEVEL10,
  REPORTLEVEL12,
  REPORTLEVEL15,
  REPORTLEVEL20,
  REPORTLEVEL25,
  REPORTLEVEL30,
  REPORTLEVEL35,
  REPORTLEVEL40,
  REPORTLEVEL45,
)),
  (SdkReportLevel.PEe = new Map([
    [REPORTLEVEL8, "event_20"],
    [REPORTLEVEL10, "event_21"],
    [REPORTLEVEL12, "event_22"],
    [REPORTLEVEL15, "event_23"],
    [REPORTLEVEL20, "event_24"],
    [REPORTLEVEL25, "event_25"],
    [REPORTLEVEL30, "event_26"],
    [REPORTLEVEL35, "event_27"],
    [REPORTLEVEL40, "event_28"],
    [REPORTLEVEL45, "event_29"],
  ]));
// # sourceMappingURL=KuroSdkReport.js.map
