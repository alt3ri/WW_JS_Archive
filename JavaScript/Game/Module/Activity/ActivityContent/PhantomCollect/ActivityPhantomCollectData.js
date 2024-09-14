"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPhantomCollectData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityPhantomCollectController_1 = require("./ActivityPhantomCollectController");
class ActivityPhantomCollectData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.PhantomCollectRewardList = void 0);
  }
  PhraseEx(t) {
    (void 0 !== t && !t.$ps) || (this.PhantomCollectRewardList = t?.$ps?.Aps);
  }
  GetPhantomCollectRewardList() {
    return this.PhantomCollectRewardList ?? [];
  }
  GetPhantomCollectRewardById(e) {
    return this.PhantomCollectRewardList?.find((t) => t.h5n === e);
  }
  GetCollectPhantomList() {
    var t =
      ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(
        ActivityPhantomCollectController_1.ActivityPhantomCollectController
          .ActivityId,
      );
    return void 0 === t ? [] : t.Phantoms;
  }
  GetExDataRedPointShowState() {
    let e = !1;
    return (
      this.PhantomCollectRewardList?.forEach((t) => {
        t.Y4n === Protocol_1.Aki.Protocol.zps.CMs && (e = !0);
      }),
      e
    );
  }
  GetCollectPhantomCount() {
    var t = this.GetCollectPhantomList();
    let e = 0;
    return (
      t.forEach((t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(t) &&
          e++;
      }),
      e
    );
  }
  UpadatePhantomCollectReward(e) {
    var t;
    void 0 !== this.PhantomCollectRewardList &&
      -1 !==
        (t = this.PhantomCollectRewardList.findIndex((t) => t.h5n === e.h5n)) &&
      (this.PhantomCollectRewardList[t] = e);
  }
}
exports.ActivityPhantomCollectData = ActivityPhantomCollectData;
//# sourceMappingURL=ActivityPhantomCollectData.js.map
