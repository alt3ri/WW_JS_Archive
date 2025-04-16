"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsRankItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.j6t = void 0), (this.FriendInstanceId = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
    ];
  }
  OnStart() {}
  Refresh(t, e, s) {
    (this.j6t = t), this.Xqe();
  }
  Xqe() {
    var t, e, s;
    this.j6t &&
      ((t = this.j6t),
      (this.FriendInstanceId = t.PlayerId),
      this.GetText(2).SetText(t.Name),
      this.GetText(0).SetText("" + t.RankNum),
      this.GetText(4).SetText("" + t.HitNum),
      this.GetText(5).SetText("" + t.CashNum),
      (e = this.GetTexture(1)),
      (s = t.PlayerHeadPhoto),
      void 0 !==
        (s = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(s))) &&
      (this.SetTextureShowUntilLoaded(s.GetRoleHeadIconCircle(), e),
      t.RankNum <= 3
        ? this.GetSprite(3).SetColor(
            UE.Color.FromHex(RacingBetsRankItem.ColorValueList[t.RankNum]),
          )
        : this.GetSprite(3).SetColor(
            UE.Color.FromHex(RacingBetsRankItem.ColorValueList[0]),
          ));
  }
}
(exports.RacingBetsRankItem = RacingBetsRankItem).ColorValueList = [
  "1d4970ff",
  "e4733eff",
  "b444c8ff",
  "0084ffff",
];
//# sourceMappingURL=RacingBetsRankItem.js.map
