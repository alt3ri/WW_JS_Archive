"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
class ItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LastCloseTimeStamp = 0),
      (this.XCi = new Array()),
      (this.foh = new Array()),
      (this.$Ci = []);
  }
  OnInit() {
    return (this.LastCloseTimeStamp = 0), (this.foh = []), !0;
  }
  OnClear() {
    return (this.XCi.length = 0), (this.$Ci.length = 0), !(this.foh.length = 0);
  }
  LoadGetItemConfigIdList() {
    this.$Ci =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey,
      ) ?? [];
  }
  AddGetItemConfigIdList(t) {
    this.$Ci.push(t), this.SaveGetItemConfigIdList();
  }
  IsGotItem(t) {
    return this.$Ci.includes(t);
  }
  SaveGetItemConfigIdList() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey,
      this.$Ci,
    );
  }
  IsWaitItemListEmpty() {
    return 0 === this.XCi.length;
  }
  PushWaitItemList(t) {
    this.XCi.push(t);
  }
  ShiftWaitItemList() {
    return this.XCi.shift();
  }
  IsWaitPhantomListEmpty() {
    return 0 === this.foh.length;
  }
  PushWaitPhantomItem(t) {
    this.foh.push(t);
  }
  ShiftWaitPhantomList() {
    return this.foh.shift();
  }
  GmClearWaitItemList() {
    this.XCi = [];
  }
}
exports.ItemModel = ItemModel;
//# sourceMappingURL=ItemModel.js.map
