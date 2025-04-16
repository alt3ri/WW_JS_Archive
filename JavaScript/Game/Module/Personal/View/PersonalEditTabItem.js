"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalEditTabItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PersonalEditTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.l4e = void 0),
      (this.z0c = 0),
      (this.OnToggleCallBack = void 0),
      (this.kqe = () => {
        this.OnToggleCallBack &&
          this.OnToggleCallBack(this.GridIndex, this.z0c);
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
  Refresh(e, t, i) {
    let o = "";
    switch ((this.z0c = e)) {
      case 0:
        o = "Personalize_HeadPhoto";
        break;
      case 1:
        (o = "Personalize_Card"), (this.l4e = "PersonalCard");
        break;
      case 2:
        (o = "Personalize_Title"), (this.l4e = "PersonalTitle");
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o), this.BindRedDot();
  }
  SetToggleCallBack(e) {
    this.OnToggleCallBack = e;
  }
  BindRedDot() {
    var e;
    this.l4e &&
      ((e = this.GetItem(2)),
      RedDotController_1.RedDotController.BindRedDot(this.l4e, e, void 0));
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  UnBindRedDot() {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        this.l4e,
        this.GetItem(2),
      ),
      (this.l4e = void 0));
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e);
  }
  OnSelected(e) {
    2 === this.z0c &&
      (LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleUnlockRedDot,
        !1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot,
      )),
      this.SetToggleState(!0);
  }
  OnDeselected(e) {
    this.SetToggleState(!1);
  }
}
exports.PersonalEditTabItem = PersonalEditTabItem;
//# sourceMappingURL=PersonalEditTabItem.js.map
