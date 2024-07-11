"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
class ItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LastCloseTimeStamp = 0),
      (this.Xdi = new Array()),
      (this.$di = []);
  }
  OnInit() {
    return !(this.LastCloseTimeStamp = 0);
  }
  OnClear() {
    return (this.Xdi.length = 0), !(this.$di.length = 0);
  }
  LoadGetItemConfigIdList() {
    this.$di =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey,
      ) ?? [];
  }
  AddGetItemConfigIdList(e) {
    this.$di.push(e), this.SaveGetItemConfigIdList();
  }
  IsGotItem(e) {
    return this.$di.includes(e);
  }
  SaveGetItemConfigIdList() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey,
      this.$di,
    );
  }
  IsWaitItemListEmpty() {
    return this.Xdi.length === 0;
  }
  PushWaitItemList(e) {
    this.Xdi.push(e);
  }
  ShiftWaitItemList() {
    return this.Xdi.shift();
  }
}
exports.ItemModel = ItemModel;
// # sourceMappingURL=ItemModel.js.map
