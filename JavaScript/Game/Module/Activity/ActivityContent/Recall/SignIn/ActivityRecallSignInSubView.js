"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallSignInSubView = void 0);
const UE = require("ue"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine"),
  ActivityRecallSignPanel_1 = require("./ActivityRecallSignPanel");
class ActivityRecallSignInSubView extends ActivityRecallDefine_1.ActivityMainSubViewBase {
  constructor() {
    super(...arguments), (this.ica = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    (this.ica = new ActivityRecallSignPanel_1.ActivityRecallSignPanel()),
      await this.ica.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnRefreshByData(e) {
    this.ica.RefreshByData(e);
  }
}
exports.ActivityRecallSignInSubView = ActivityRecallSignInSubView;
//# sourceMappingURL=ActivityRecallSignInSubView.js.map
