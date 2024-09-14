"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryLevelUpViewData = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MingSuDefine_1 = require("./MingSuDefine");
class DarkCoastDeliveryLevelUpViewData {
  constructor(e, r) {
    (this.PreLevel = 0),
      (this.CurLevel = 0),
      (this.PreLevel = e),
      (this.CurLevel = r);
  }
  GetLevelTexture(e) {
    var r = ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(
      MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID,
    );
    return void 0 === r ? StringUtils_1.EMPTY_STRING : r.GetLevelTexturePath(e);
  }
  GetLevelDataList() {
    var r = ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(
      MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID,
    );
    if (void 0 === r) return [];
    var i = [];
    for (let e = this.PreLevel + 1; e <= this.CurLevel; e++) {
      var t = r.GetLevelData(e);
      void 0 !== t && i.push(t);
    }
    return i;
  }
}
exports.DarkCoastDeliveryLevelUpViewData = DarkCoastDeliveryLevelUpViewData;
//# sourceMappingURL=DarkCoastDeliveryLevelUpViewData.js.map
