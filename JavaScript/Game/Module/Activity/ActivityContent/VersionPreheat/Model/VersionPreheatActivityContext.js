"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VersionPreheatActivityContext = void 0);
const ActivityData_1 = require("../../../ActivityData"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class VersionPreheatActivityContext extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.y_l = new Map()), (this.E_l = new Map());
  }
  PhraseEx(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("VersionPreheat", 64, "解析活动数据", [
        "ActivityData",
        t,
      ]);
    t = t.$S_;
    if (void 0 !== t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("VersionPreheat", 64, "解析活动数据:[具体]", [
          "ActivityInfo",
          t,
        ]),
        this.E_l.clear();
      for (const i of t.bM_) {
        var e = {
          Meta: i,
          Id: i.M_l,
          UnlockTimestamp: MathUtils_1.MathUtils.LongToNumber(i.yzs),
          Rewarded: i.mLs,
        };
        this.E_l.set(i.M_l, e);
      }
    }
  }
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.VersionPreheatModel.HasNewQuest;
  }
  Dispose() {}
  SyncPreheatSignSurveyInfo(t, e) {
    this.y_l.set(t, e);
  }
  SyncPreheatRewardedState(t) {
    t = this.E_l.get(t);
    void 0 !== t && (t.Rewarded = !0);
  }
  GetVoteLeftCountById(t) {
    t = this.y_l.get(t);
    return void 0 === t ? 0 : MathUtils_1.MathUtils.LongToNumber(t.PM_);
  }
  GetVoteRightCountById(t) {
    t = this.y_l.get(t);
    return void 0 === t ? 0 : MathUtils_1.MathUtils.LongToNumber(t.xM_);
  }
  IsRewardedById(t) {
    t = this.E_l.get(t);
    return void 0 !== t && t.Rewarded;
  }
  IsLeftChosen(t) {
    t = this.y_l.get(t);
    if (void 0 !== t) return t.S_l;
  }
  get QuestCache() {
    return this.E_l;
  }
}
exports.VersionPreheatActivityContext = VersionPreheatActivityContext;
//# sourceMappingURL=VersionPreheatActivityContext.js.map
