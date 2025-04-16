"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographConfig = void 0);
const PhonographAlbumAll_1 = require("../../../Core/Define/ConfigQuery/PhonographAlbumAll"),
  PhonographAlbumById_1 = require("../../../Core/Define/ConfigQuery/PhonographAlbumById"),
  PhonographMusicAll_1 = require("../../../Core/Define/ConfigQuery/PhonographMusicAll"),
  PhonographMusicById_1 = require("../../../Core/Define/ConfigQuery/PhonographMusicById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class PhonographConfig extends ConfigBase_1.ConfigBase {
  GetMusicList() {
    return PhonographMusicAll_1.configPhonographMusicAll.GetConfigList();
  }
  GetMusicById(e) {
    return PhonographMusicById_1.configPhonographMusicById.GetConfig(e);
  }
  GetMusicAlbumList() {
    return PhonographAlbumAll_1.configPhonographAlbumAll.GetConfigList();
  }
  GetMusicAlbumById(e) {
    return PhonographAlbumById_1.configPhonographAlbumById.GetConfig(e);
  }
  GetUnlockItemIds() {
    const e = this.GetMusicList();
    if (!e) return [];
    var r =
      ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(60004);
    const o = [];
    return (
      r.forEach((r) => {
        e.some((e) => e.ItemId === r.GetConfigId()) && o.push(r.GetConfigId());
      }),
      o
    );
  }
}
exports.PhonographConfig = PhonographConfig;
//# sourceMappingURL=PhonographConfig.js.map
