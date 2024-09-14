"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastRewardItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  Y_BIAS = 30;
class BlackCoastRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this._7s = void 0),
      (this.Pe = void 0),
      (this.zkt = () => {
        switch (this._7s) {
          case 1:
            this.Zkt(!1);
            break;
          case 0:
            this.RequestGetAllAvailableReward?.();
            break;
          case 2:
            this.Zkt(!0);
        }
      }),
      (this.RequestGetAllAvailableReward = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UINiagara],
      [7, UE.UINiagara],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.zkt]]);
  }
  OnStart() {
    this.GetUiNiagara(6).SetAlpha(0),
      this.GetUiNiagara(6).SetUIActive(!0),
      this.GetUiNiagara(7).SetUIActive(!1);
  }
  Refresh(t, e, s) {
    var i = (this.Pe = t).GetState();
    this.SetRewardGoalValue(t.Goal),
      this.RefreshRewardState(i, void 0 === this._7s);
  }
  SetRewardGoalValue(t) {
    this.GetText(0).SetText(t.toString());
  }
  RefreshRewardState(e, t) {
    var s = this.GetUiNiagara(7);
    if ((s.SetUIActive(!1), s.Deactivate(), t || this._7s !== e)) {
      var i = [this.GetSprite(4), this.GetSprite(2), this.GetSprite(3)];
      for (let t = 0; t < i.length; t++) i[t].SetUIActive(t === e);
      this.GetItem(8).SetUIActive(0 === e),
        this.GetUiNiagara(6).SetAlpha(0 === e ? 1 : 0),
        2 !== e || t || (s.SetUIActive(!0), s.ActivateSystem(!0)),
        (this._7s = e);
    }
  }
  Zkt(t) {
    var e = [];
    for (const r of this.Pe.GetPreviewReward()) {
      var s = { Id: r[0].ItemId, Num: r[1], Received: t };
      e.push(s);
    }
    var i = {
      RewardLists: e,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, Y_BIAS, 0),
    };
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      i,
    );
  }
}
exports.BlackCoastRewardItem = BlackCoastRewardItem;
//# sourceMappingURL=BlackCoastRewardItem.js.map
