"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardBaseItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalCardBaseItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.CardData = void 0),
      (this.CardConfig = void 0),
      (this.NeedShowRedDot = !0),
      (this.OnToggleCallBack = void 0),
      (this.kqe = () => {
        this.OnToggleCallBack &&
          this.OnToggleCallBack(this.GridIndex, this.CardData);
      }),
      (this.$5i = (e) => {
        e === this.CardData.CardId && this.BNe(this.CardData);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[2, this.kqe]]);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPersonalCardRead,
      this.$5i,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPersonalCardRead,
      this.$5i,
    );
  }
  Refresh(e, t, s) {
    (this.CardData = e),
      (this.GridIndex = s),
      (this.CardConfig =
        ConfigManager_1.ConfigManager.InventoryConfig.GetCardItemConfig(
          e.CardId,
        )),
      this.BNe(e),
      this.SetToggleState(t),
      this.SetTextureByPath(this.CardConfig.CardPath, this.GetTexture(0));
  }
  BNe(e) {
    this.GetItem(1).SetUIActive(e.IsUnLock && !e.IsRead && this.NeedShowRedDot);
  }
  SetNeedShowRedDot(e) {
    this.NeedShowRedDot = e;
  }
  SetToggleCallBack(e) {
    this.OnToggleCallBack = e;
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(2).SetToggleState(e);
  }
  OnSelected(e) {
    this.SetToggleState(!0);
  }
  OnDeselected(e) {
    this.SetToggleState(!1);
  }
  GetConfig() {
    return this.CardConfig;
  }
}
exports.PersonalCardBaseItem = PersonalCardBaseItem;
//# sourceMappingURL=PersonalCardBaseItem.js.map
