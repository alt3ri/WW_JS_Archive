"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreBabelSuccessItem = void 0);
const UE = require("ue"),
  BabelTowerBuffById_1 = require("../../../../Core/Define/ConfigQuery/BabelTowerBuffById"),
  BabelTowerDeTermById_1 = require("../../../../Core/Define/ConfigQuery/BabelTowerDeTermById"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreBabelSuccessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RCc = void 0),
      (this.gDo = () => {
        return new BabelTowerUnlockBuffItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIHorizontalLayout],
    ];
  }
  OnStart() {
    this.RCc = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.gDo,
    );
  }
  Refresh(e) {
    var r = e.StarTextParam,
      r =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          r.TextKey,
          ...r.Params,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TipTextId),
        e.NewBabelBuffIds),
      e = e.NewBabelDeTermIds;
    if (0 === r.length && 0 === e.length) this.GetItem(2).SetUIActive(!1);
    else {
      this.GetItem(2).SetUIActive(!0);
      var i = [];
      for (const t of r) {
        const e = { Id: t, IsDeTerm: !1, CanClick: !1 };
        i.push(e);
      }
      for (const s of e) {
        const e = { Id: s, IsDeTerm: !0, CanClick: !1 };
        i.push(e);
      }
      i.sort((e, r) =>
        e.IsDeTerm === r.IsDeTerm ? e.Id - r.Id : e.IsDeTerm ? 1 : -1,
      ),
        this.RCc?.RefreshByData(i);
    }
  }
}
exports.RewardExploreBabelSuccessItem = RewardExploreBabelSuccessItem;
class BabelTowerUnlockBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.aFi = () => {
        var e = {
          IsDeTerm: this.Pe.IsDeTerm,
          ConfigId: this.Pe.Id,
          ShowWays: !1,
        };
        UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.aFi]]);
  }
  Refresh(e, r, i) {
    let t = void 0,
      s = void 0;
    var o,
      a = (this.Pe = e).IsDeTerm;
    (s = (
      a
        ? ((o = BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(
            e.Id,
          )),
          (t = o.NameText),
          o)
        : ((o = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(e.Id)),
          (t = o.NameText),
          o)
    ).Texture),
      this.GetItem(3).SetUIActive(!a),
      this.GetItem(4).SetUIActive(a),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t),
      this.SetTextureByPath(s, this.GetTexture(0));
  }
}
//# sourceMappingURL=RewardExploreBabelSuccessItem.js.map
