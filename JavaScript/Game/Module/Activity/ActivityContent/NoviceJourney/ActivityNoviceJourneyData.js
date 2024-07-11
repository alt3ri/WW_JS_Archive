"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityNoviceJourneyData = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData");
class ActivityNoviceJourneyData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.B2e = new Set());
  }
  GetExDataRedPointShowState() {
    return this.b2e();
  }
  PhraseEx(e) {
    e = e.Ups;
    this.SetReceiveData(e.vps);
  }
  b2e() {
    for (const e of ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetNoticeJourneyConfigList())
      if (2 === this.GetRewardStateByLevel(e.Id)) return !0;
    return !1;
  }
  SetReceiveData(e) {
    for (const t of e) this.B2e.add(t);
  }
  AddReceivedData(e) {
    this.B2e.add(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.NoticeJourneyReceive,
        e,
      );
  }
  CheckRewardReceived(e) {
    return this.B2e.has(e);
  }
  GetRewardStateByLevel(e) {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel() < e
      ? 1
      : this.CheckRewardReceived(e)
        ? 3
        : 2;
  }
}
exports.ActivityNoviceJourneyData = ActivityNoviceJourneyData;
//# sourceMappingURL=ActivityNoviceJourneyData.js.map
