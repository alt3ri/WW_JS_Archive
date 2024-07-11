"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
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
    this.lwn(e.bBs);
  }
  OnPhotoMemoryUpdate(e) {
    this.lwn(e.bBs),
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
  lwn(e) {
    this.hwn.clear(), this.awn.clear();
    for (const r of e) {
      var t = this._wn(r),
        t = (this.hwn.set(r.J4n, t), t.GetCollectDataList());
      for (const o of t) this.awn.set(o.GetId(), o);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FragmentRewardEntranceRedDot,
    );
  }
  GetCollectedIds() {
    var e,
      t = [];
    for ([, e] of this.hwn)
      for (const r of e.GetCollectDataList())
        r.GetIfUnlock() && t.push(r.GetId());
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
    var t = e.BBs.J4n;
    let r = this.awn.get(t);
    r ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("FragmentMemory", 28, "记忆历程数据刷新时找不到数据", [
          "id",
          t,
        ]),
      (r = new FragmentMemoryData_1.FragmentMemoryCollectData())),
      r.Phrase(e.BBs),
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
}
exports.FragmentMemoryModel = FragmentMemoryModel;
//# sourceMappingURL=FragmentMemoryModel.js.map
