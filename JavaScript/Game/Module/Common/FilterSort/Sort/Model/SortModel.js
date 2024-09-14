"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SortModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  SortLogic_1 = require("../Logic/SortLogic");
class SortModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.dUt = new Map()),
      (this.CUt = new SortLogic_1.SortLogic());
  }
  SetSortResultData(e, o) {
    this.dUt.set(e, o);
  }
  DeleteSortResultData(e) {
    this.dUt.delete(e);
  }
  GetSortResultData(e) {
    return this.dUt.get(e);
  }
  SortDataList(e, o, t, ...a) {
    this.CUt.SortDataList(e, o, t, ...a);
  }
  SortDataByData(e, o, t, a) {
    this.CUt.SortDataByData(e, o, t, a);
  }
  GetSortConfigData(e, o) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(e, o))
      return (
        (e = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(
          e,
          o,
        )),
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig,
        )?.get(e)
      );
  }
  SetSortConfigData(o, t, a) {
    if (ConfigManager_1.ConfigManager.SortConfig.IsConfigSortSave(o, t)) {
      o = ConfigManager_1.ConfigManager.SortConfig.GetConfigSortFormatId(o, t);
      let e = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig,
      );
      (e = e || new Map()).set(o, a),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.SortConfig,
          e,
        );
    }
  }
}
exports.SortModel = SortModel;
//# sourceMappingURL=SortModel.js.map
