"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPhantomCollectData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityPhantomCollectController_1 = require("./ActivityPhantomCollectController");
class ActivityPhantomCollectData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.PhantomCollectRewardList = void 0);
  }
  PhraseEx(t) {
    (void 0 !== t && !t.p0s) || (this.PhantomCollectRewardList = t?.p0s?.s0s);
  }
  GetPhantomCollectRewardList() {
    return this.PhantomCollectRewardList ?? [];
  }
  GetPhantomCollectRewardById(e) {
    return this.PhantomCollectRewardList?.find((t) => t.Ikn === e);
  }
  GetCollectPhantomList() {
    const t =
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
        t.ckn === Protocol_1.Aki.Protocol.D0s.j0s && (e = !0);
      }),
      e
    );
  }
  GetCollectPhantomCount() {
    const t = this.GetCollectPhantomList();
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
    let t;
    void 0 !== this.PhantomCollectRewardList &&
      (t = this.PhantomCollectRewardList.findIndex((t) => t.Ikn === e.Ikn)) !==
        -1 &&
      (this.PhantomCollectRewardList[t] = e);
  }
}
exports.ActivityPhantomCollectData = ActivityPhantomCollectData;
// # sourceMappingURL=ActivityPhantomCollectData.js.map
