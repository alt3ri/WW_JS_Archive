"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityNoviceJourneyData = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityNoviceJourneyData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.fke = new Set());
  }
  GetExDataRedPointShowState() {
    return this.pke();
  }
  PhraseEx(e) {
    e = e.C0s;
    this.SetReceiveData(e.i0s);
  }
  pke() {
    for (const e of ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetNoticeJourneyConfigList())
      if (this.GetRewardStateByLevel(e.Id) === 2) return !0;
    return !1;
  }
  SetReceiveData(e) {
    for (const t of e) this.fke.add(t);
  }
  AddReceivedData(e) {
    this.fke.add(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.NoticeJourneyReceive,
        e,
      );
  }
  CheckRewardReceived(e) {
    return this.fke.has(e);
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
// # sourceMappingURL=ActivityNoviceJourneyData.js.map
