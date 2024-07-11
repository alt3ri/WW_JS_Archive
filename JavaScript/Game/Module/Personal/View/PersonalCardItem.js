"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardItem = void 0);
const UE = require("ue"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalCardBaseItem_1 = require("./PersonalCardBaseItem");
class PersonalCardItem extends PersonalCardBaseItem_1.PersonalCardBaseItem {
  constructor(e, r) {
    super(e, r);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([3, UE.UIItem], [4, UE.UIItem]);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetItem(3),
      r = this.GetItem(4),
      s =
        (e.SetUIActive(!1),
        r.SetUIActive(!1),
        PersonalController_1.PersonalController.CheckCardIsUsing(
          this.CardConfig.Id,
        ));
    s
      ? e.SetUIActive(!0)
      : ((s = PersonalController_1.PersonalController.CheckCardIsUnLock(
          this.CardConfig.Id,
        )),
        r.SetUIActive(!s));
  }
}
exports.PersonalCardItem = PersonalCardItem;
//# sourceMappingURL=PersonalCardItem.js.map
