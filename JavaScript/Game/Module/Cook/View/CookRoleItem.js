"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  CookController_1 = require("../CookController");
class CookRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.oft = void 0),
      (this.sft = void 0),
      (this.eTt = (t) => {
        this.oft && this.oft(this.fGt.RoleId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(3).GetOwner());
  }
  Refresh(t, e, i) {
    t = {
      Type: 2,
      Data: (this.fGt = t),
      ItemConfigId: t.RoleId,
      IsCookUp: t.IsBuff,
    };
    this.sft.Apply(t),
      this.qWe(),
      this.aNt(),
      this.N6e(e, !1),
      this.GetText(2).OnSelfLanguageChange.Bind(() => {
        this.aNt();
      });
  }
  Clear() {
    this.GetText(2).OnSelfLanguageChange.Unbind();
  }
  OnBeforeDestroy() {
    this.sft.Destroy(), (this.sft = void 0);
  }
  aNt() {
    var t;
    CookController_1.CookController.CheckIsBuff(
      this.fGt.RoleId,
      this.fGt.ItemId,
    )
      ? ((t = CookController_1.CookController.GetCookInfoText(this.fGt.RoleId)),
        this.GetText(2).SetText(t))
      : ((t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "DefaultHelperText",
          )),
        this.GetText(2).SetText(t));
  }
  qWe() {
    this.GetText(1).SetText(this.fGt.RoleName);
  }
  BindOnClickedCallback(t) {
    this.oft = t;
  }
  OnSelected(t) {
    this.N6e(!0);
  }
  OnDeselected(t) {
    this.N6e(!1);
  }
  N6e(t, e = !0) {
    var i = this.GetExtendToggle(0);
    t ? i.SetToggleState(1, e) : i.SetToggleState(0, !1);
  }
}
exports.CookRoleItem = CookRoleItem;
//# sourceMappingURL=CookRoleItem.js.map
