"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTogetherRoleItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../Util/LguiUtil");
class ShipTogetherRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.sft = void 0),
      (this.H5e = void 0),
      (this.ZBl = void 0),
      (this._n_ = !1),
      (this.kqe = (t) => {
        1 === t
          ? this.ZBl?.(this.H5e, this.dFe)
          : 0 === t && this.ZBl?.(void 0, 0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(4).GetOwner()),
      (this.H5e = this.GetExtendToggle(0)),
      this.H5e?.OnStateChange.Add(this.kqe);
  }
  Refresh(t, i, e) {
    this.dFe = t.GetRoleId();
    var s =
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
          ?.GetRoleIdList ?? [],
      s =
        ((this._n_ = s.includes(this.dFe)),
        this._Oe(),
        {
          Data: t,
          SkinId: t.GetRoleSkinId(),
          Type: 2,
          ItemConfigId: this.dFe,
          IsBlack: this._n_,
        }),
      s =
        (this.sft?.Apply(s),
        this.sft?.BindOnCanExecuteChange(() => !1),
        this.GetText(1)?.SetText(t.GetRoleRealName()),
        t.GetFavorData().GetFavorLevel());
    this.GetText(2).SetUIActive(!this._n_),
      this._n_
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            "CannotInviteInFormation",
          )
        : this.GetText(3)?.SetText("" + s);
  }
  BindOnClickToggleCallBack(t) {
    this.ZBl = t;
  }
  _Oe() {
    this._n_
      ? this.H5e?.SetToggleState(2)
      : this.dFe ===
          ModelManager_1.ModelManager.ShipTogetherModel.ShipTogetherRoleId
        ? this.H5e?.SetToggleState(1, !0)
        : this.H5e?.SetToggleState(0);
  }
}
exports.ShipTogetherRoleItem = ShipTogetherRoleItem;
//# sourceMappingURL=ShipTogetherRoleItem.js.map
