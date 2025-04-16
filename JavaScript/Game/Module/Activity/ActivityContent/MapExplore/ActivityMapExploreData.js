"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMapExploreData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityData_1 = require("../../ActivityData");
class ActivityMapExploreData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.ETt = 3), (this.TaskList = []);
  }
  GetExDataRedPointShowState() {
    return !!this.IsFirstUnlockState(1) || this.IsCanGetReward();
  }
  IsCanGetReward() {
    return this.TaskList.some((t) => t.IsCanGet);
  }
  Uuc() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ExploreActivityFirstUnlock,
        0,
      ) ?? 0
    );
  }
  SetFirstUnlockState(t) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.ExploreActivityFirstUnlock,
      t,
    );
  }
  IsFirstUnlockState(t) {
    return this.Uuc() === t;
  }
  PhraseEx(t) {
    this.TaskList.length = 0;
    var e = t.ltc;
    if (e) {
      for (const r of ConfigManager_1.ConfigManager.ActivityMapExploreConfig.GetExploreTaskList(
        t.s5n,
      )) {
        var o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          r.DropId,
        );
        const a = [];
        o?.DropPreview.forEach((t, e) => {
          a.push([e, t]);
        }),
          this.TaskList.push({
            TaskId: r.TaskId,
            RewardDesc: r.Desc,
            RewardItemId: a[0][0] ?? this.ETt,
            RewardItemCount: a[0][1],
            IsComplete: !1,
            IsCanGet: !1,
            IsRunning: !0,
          });
      }
      this.IsFirstUnlockState(0) &&
        this.CanPreOpen() &&
        this.SetFirstUnlockState(1),
        this.UpdateTaskState(e.E$s);
    }
  }
  UpdateTaskState(t) {
    if (t) {
      for (const o of this.TaskList) {
        var e = t[o.TaskId.toString()];
        e &&
          ((o.IsComplete =
            e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken),
          (o.IsCanGet =
            e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish),
          (o.IsRunning = !o.IsComplete && !o.IsCanGet));
      }
      this.Duc(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ActivityMapExploreStateUpdate,
        );
    }
  }
  Duc() {
    this.TaskList.sort((t, e) =>
      t.IsCanGet !== e.IsCanGet
        ? t.IsCanGet
          ? -1
          : 1
        : t.IsRunning !== e.IsRunning
          ? t.IsRunning
            ? -1
            : 1
          : t.TaskId - e.TaskId,
    );
  }
}
exports.ActivityMapExploreData = ActivityMapExploreData;
//# sourceMappingURL=ActivityMapExploreData.js.map
