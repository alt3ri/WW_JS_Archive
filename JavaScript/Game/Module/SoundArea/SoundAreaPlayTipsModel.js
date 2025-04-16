"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundAreaPlayTipsModel = void 0);
const SoundAreaPlayInfoById_1 = require("../../../Core/Define/ConfigQuery/SoundAreaPlayInfoById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
class SoundAreaPlayTipsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.FO_ = new Map());
  }
  OnLeaveLevel() {
    return this.FO_.clear(), !0;
  }
  NO_(e) {
    return (
      SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e)
        ?.MaxCountType ?? 0
    );
  }
  AddShowInfoIdCount(e) {
    var o,
      r,
      a = this.NO_(e);
    0 === a
      ? ((r =
          (o =
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips,
            ) ?? new Map()).get(e) ?? 0),
        o.set(e, (r += 1)),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips,
          o,
        ))
      : 1 === a && ((r = this.FO_.get(e) ?? 0), this.FO_.set(e, (r += 1)));
  }
  GetInfoIdShowCount(e) {
    var o = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e),
      r = this.NO_(e);
    if (o?.MaxCount) {
      if (0 === r)
        return (
          (
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips,
            ) ?? new Map()
          ).get(e) ?? 0
        );
      if (1 === r) return this.FO_.get(e) ?? 0;
    }
    return 0;
  }
  CheckInfoIdCanShow(e) {
    var o = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
    if (o?.MaxCount && this.GetInfoIdShowCount(e) >= o?.MaxCount) return !1;
    return !0;
  }
}
exports.SoundAreaPlayTipsModel = SoundAreaPlayTipsModel;
//# sourceMappingURL=SoundAreaPlayTipsModel.js.map
