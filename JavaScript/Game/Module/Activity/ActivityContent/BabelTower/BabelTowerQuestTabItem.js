"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerQuestTabItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerQuestTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.vua = 0),
      (this.OnClickToggleCallBack = void 0),
      (this.kqe = () => {
        this.OnClickToggleCallBack?.(this.GetExtendToggle(0), this.vua);
      }),
      (this.D1c = () => {
        var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
        this.GetItem(2).SetUIActive(e.GetQuestTabRedDot(this.vua));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BabelTowerRefreshQuestState,
      this.D1c,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BabelTowerRefreshQuestState,
      this.D1c,
    );
  }
  Refresh(e, t, r) {
    this.vua = e;
    e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.GetItem(2).SetUIActive(e.GetQuestTabRedDot(this.vua)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "BabelTowerTaskType_" + this.vua,
      );
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, !1),
      this.OnClickToggleCallBack?.(this.GetExtendToggle(0), this.vua);
  }
}
exports.BabelTowerQuestTabItem = BabelTowerQuestTabItem;
//# sourceMappingURL=BabelTowerQuestTabItem.js.map
