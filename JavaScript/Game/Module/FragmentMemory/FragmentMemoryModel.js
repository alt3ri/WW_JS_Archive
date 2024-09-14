"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FragmentMemoryData_1 = require("./FragmentMemoryData");
class FragmentMemoryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ActivitySubViewTryPlayAnimation = ""),
      (this.MemoryFragmentMainViewTryPlayAnimation = ""),
      (this.awn = new Map()),
      (this.CurrentTrackMapMarkId = 0),
      (this.CurrentTrackFragmentId = 0),
      (this.hwn = new Map()),
      (this.CurrentUnlockCollectId = 0);
  }
  OnPhotoMemoryResponse(e) {
    this.lwn(e.FBs);
  }
  OnPhotoMemoryUpdate(e) {
    this.HQa(e.FBs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
      );
  }
  TryRemoveCurrentTrackEntity() {
    0 !== this.CurrentTrackMapMarkId &&
      (ModelManager_1.ModelManager.MapModel.RemoveMapMark(
        7,
        this.CurrentTrackMapMarkId,
      ),
      (this.CurrentTrackMapMarkId = 0));
  }
  HQa(e) {
    for (const r of e) {
      var t = r.s5n,
        o = this.hwn.get(t),
        o =
          (o ? o.Phrase(r) : ((o = this._wn(r)), this.hwn.set(t, o)),
          this.hwn.get(t).GetCollectDataList());
      for (const n of o) this.awn.set(n.GetId(), n);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FragmentRewardEntranceRedDot,
    );
  }
  lwn(e) {
    this.hwn.clear(), this.awn.clear();
    for (const o of e) {
      var t = this._wn(o),
        t = (this.hwn.set(o.s5n, t), t.GetCollectDataList());
      for (const r of t) this.awn.set(r.GetId(), r);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FragmentRewardEntranceRedDot,
    );
  }
  GetCollectedIds() {
    var e,
      t = [];
    for ([, e] of this.hwn)
      for (const o of e.GetCollectDataList())
        o.GetIfUnlock() && t.push(o.GetId());
    return t;
  }
  GetAllFragmentTopic() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetAllPhotoMemoryTopic();
  }
  GetTopicUnlockState(e) {
    return void 0 !== this.GetTopicDataById(e);
  }
  GetUnlockConditionText(e) {
    e =
      ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
        e,
      ).ConditionGroupId;
    return (
      LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e) ??
      ""
    );
  }
  OnPhotoMemoryCollectUpdate(e) {
    var t = e.VBs.s5n;
    let o = this.awn.get(t);
    o ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("FragmentMemory", 28, "记忆历程数据刷新时找不到数据", [
          "id",
          t,
        ]),
      (o = new FragmentMemoryData_1.FragmentMemoryCollectData())),
      o.Phrase(e.VBs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
      );
  }
  _wn(e) {
    var t = new FragmentMemoryData_1.FragmentMemoryTopicData();
    return t.Phrase(e), t;
  }
  GetCollectDataById(e) {
    e = this.awn.get(e);
    if (e) return e;
  }
  GetTopicDataById(e) {
    e = this.hwn.get(e);
    if (e) return e;
  }
  GetRedDotState() {
    for (var [, e] of this.hwn) if (e.GetRedDotState()) return !0;
    return !1;
  }
  GetTopicFirstOpenRedDotState(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.FragmentMemoryOpened,
      void 0,
    );
    return !t || !t.includes(e);
  }
  GetCurrentActivityFragmentMemoryRedDotState() {
    var e =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
        Protocol_1.Aki.Protocol.uks.Proto_PhotoMemoryActivity,
      );
    if (e && 0 < e.length) for (const t of e) if (t.EntranceRedDot()) return !0;
    return !1;
  }
  SaveTopicOpened(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.FragmentMemoryOpened,
      void 0,
    );
    (t = t || []).includes(e) ||
      (t.push(e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FragmentMemoryOpened,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FragmentRewardTopicRedDot,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FragmentRewardEntranceRedDot,
      ));
  }
}
exports.FragmentMemoryModel = FragmentMemoryModel;
//# sourceMappingURL=FragmentMemoryModel.js.map
