"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardItem = void 0);
const UE = require("ue"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalCardBaseItem_1 = require("./PersonalCardBaseItem");
class PersonalCardItem extends PersonalCardBaseItem_1.PersonalCardBaseItem {
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([3, UE.UIItem], [4, UE.UIItem]);
  }
  Refresh(e, r, s) {
    super.Refresh(e, r, s);
    var r = this.GetItem(3),
      s = this.GetItem(4),
      o = PersonalController_1.PersonalController.CheckCardIsUsing(
        this.CardConfig.Id,
      );
    r.SetUIActive(o), s.SetUIActive(!e.IsUnLock);
  }
}
exports.PersonalCardItem = PersonalCardItem;
//# sourceMappingURL=PersonalCardItem.js.map
