"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRougeData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData");
class ActivityRougeData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.TFe = 0), (this.LFe = 0), (this.qra = !1);
  }
  set FunctionBtnRedDot(t) {
    (this.qra = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  get FunctionBtnRedDot() {
    return this.qra;
  }
  PhraseEx(t) {
    t = t.Wps;
    t
      ? ((this.TFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Pps))),
        (this.LFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Ups))),
        (this.qra = this.GetIfFirstOpen()))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Roguelike", 59, "ActivityRougeData无肉鸽额外数据");
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  get ReceiveEndOpenTime() {
    return this.LFe;
  }
  get RedPointShowState() {
    return (
      2 !== this.GetRogueActivityState() &&
      (!!this.GetIfFirstOpen() ||
        (!!this.IsUnLock() && !!this.GetExDataRedPointShowState()))
    );
  }
  GetExtraConfig() {
    return ConfigManager_1.ConfigManager.ActivityRogueConfig.GetActivityUniversalConfig(
      this.Id,
    );
  }
  GetExDataRedPointShowState() {
    return (
      ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeAchievementRedDot() ||
      ModelManager_1.ModelManager.RoguelikeModel.CheckHasCanUnlockSkill() ||
      ModelManager_1.ModelManager.RoguelikeModel.CheckRoguelikeShopRedDot() ||
      this.qra
    );
  }
  GetRogueActivityState() {
    return this.CheckIfInOpenTime()
      ? 0
      : this.CheckIfInTimeInterval(this.TFe, this.LFe)
        ? 1
        : 2;
  }
}
exports.ActivityRougeData = ActivityRougeData;
//# sourceMappingURL=ActivityRogueData.js.map
