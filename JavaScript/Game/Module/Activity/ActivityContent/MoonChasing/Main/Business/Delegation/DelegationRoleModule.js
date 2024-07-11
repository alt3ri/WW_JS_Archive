"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelegationRoleModule = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
class RoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Tbt = void 0),
      (this.eTt = () => {
        this.Tbt?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Refresh(e) {
    var t = void 0 !== e;
    this.GetItem(2)?.SetUIActive(!t),
      this.GetTexture(1)?.SetUIActive(t),
      t &&
        ((t =
          ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e)),
        this.SetTextureByPath(t.Icon, this.GetTexture(1)));
  }
  BindClickFunction(e) {
    this.Tbt = e;
  }
}
class DelegationRoleModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RoleItemList = []),
      (this.OnClickEvent = void 0),
      (this.eTt = () => {
        this.OnClickEvent?.();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async bke(e) {
    var t = new RoleItem();
    return (
      t.BindClickFunction(this.eTt),
      await t.CreateThenShowByActorAsync(e.GetOwner()),
      t
    );
  }
  async OnBeforeStartAsync() {
    this.RoleItemList = await Promise.all([
      this.bke(this.GetItem(0)),
      this.bke(this.GetItem(1)),
      this.bke(this.GetItem(2)),
    ]);
  }
  Refresh(e) {
    var t = Array.from(e);
    for (let e = 0; e < this.RoleItemList.length; e++)
      this.RoleItemList[e].Refresh(t[e]);
  }
  SetClickEvent(e) {
    this.OnClickEvent = e;
  }
}
exports.DelegationRoleModule = DelegationRoleModule;
//# sourceMappingURL=DelegationRoleModule.js.map
