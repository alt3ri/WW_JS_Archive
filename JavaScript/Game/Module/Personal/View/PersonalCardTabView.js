"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardTabView = void 0);
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  PersonalCardComponent_1 = require("./PersonalCardComponent");
class PersonalCardTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), (this.z5i = void 0);
  }
  OnStart() {
    this.z5i ||
      (this.z5i = new PersonalCardComponent_1.PersonalCardComponent(
        this.RootItem,
        !0,
        this.ExtraParams,
      ));
  }
  OnBeforeDestroy() {
    this.z5i && (this.z5i.Destroy(), (this.z5i = void 0));
  }
}
exports.PersonalCardTabView = PersonalCardTabView;
//# sourceMappingURL=PersonalCardTabView.js.map
