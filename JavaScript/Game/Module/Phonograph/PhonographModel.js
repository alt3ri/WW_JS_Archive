"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class PhonographModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentPlayMusicId = 0),
      (this.CurrentSelectMusicId = 0),
      (this.CurrentPlayActorEntityId = 0),
      (this.CurrentPlayMusicTime = 0),
      (this.CurrentPlayMusicTotalTime = 0),
      (this.UnlockMusicIds = []),
      (this.NewMusicIds = []),
      (this.RecordMusicIdMap = new Map()),
      (this.Gn_ = new Map());
  }
  set RecordMusicId(e) {
    this.RecordMusicIdMap.set(this.CurrentPlayActorEntityId, e);
  }
  get RecordMusicId() {
    return this.RecordMusicIdMap.get(this.CurrentPlayActorEntityId) ?? 0;
  }
  GetRecordMusicId(e) {
    return this.RecordMusicIdMap.get(e) ?? 0;
  }
  GetPlayIdRecord(e) {
    return this.Gn_.get(e) ?? 0;
  }
  SetPlayIdRecord(e, t) {
    this.Gn_.set(e, t);
  }
  RemovePlayIdRecord(e) {
    this.Gn_.delete(e);
  }
  IsUnlockMusic(e) {
    return (
      !!ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e).Lock ||
      this.UnlockMusicIds.includes(e)
    );
  }
  IsNewMusic(e) {
    return this.NewMusicIds.includes(e);
  }
  RemoveNewMusic(e) {
    e = this.NewMusicIds.indexOf(e);
    0 <= e && this.NewMusicIds.splice(e, 1);
  }
  get EntityActor() {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
      this.CurrentPlayActorEntityId,
    );
    if (e) {
      e = e.Entity?.CheckGetComponent(1);
      if (e) return e.Owner;
    }
  }
  CheckAlbumHasNewMusic(e) {
    for (const t of ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ??
      [])
      if (this.IsNewMusic(t.Id) && t.Album.includes(e)) return !0;
    return !1;
  }
  ClearPlayInfo() {
    (this.CurrentPlayMusicId = 0),
      (this.CurrentPlayActorEntityId = 0),
      (this.CurrentPlayMusicTime = 0),
      (this.CurrentPlayMusicTotalTime = 0);
  }
}
exports.PhonographModel = PhonographModel;
//# sourceMappingURL=PhonographModel.js.map
