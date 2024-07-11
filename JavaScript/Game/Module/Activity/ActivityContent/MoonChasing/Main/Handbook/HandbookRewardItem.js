"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandbookRewardItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  Y_BIAS = 30,
  REWARD_BACKGROUND_COLOR_UNFINISHED = "00000033",
  REWARD_BACKGROUND_COLOR_FINISHED = "F3EAAB1E";
class HandbookRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.O9s = void 0),
      (this.Pe = void 0),
      (this.zkt = () => {
        switch (this.O9s) {
          case 0:
            this.Zkt(!1);
            break;
          case 1:
            this.e2t();
            break;
          case 2:
            this.Zkt(!0);
        }
      });
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
      [9, UE.UIText],
      [10, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.zkt]]);
  }
  OnStart() {
    this.GetUiNiagara(6).SetAlpha(0),
      this.GetUiNiagara(6).SetUIActive(!0),
      this.GetUiNiagara(7).SetUIActive(!1);
  }
  Refresh(e, t, r) {
    var s,
      e =
        ModelManager_1.ModelManager.MoonChasingModel.GetHandbookRewardDataById(
          e,
        );
    e &&
      ((this.Pe = e),
      (s =
        ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount()),
      (s = e.GetState(s)),
      this.SetRewardGoalValue(s, e.Goal),
      this.RefreshRewardState(s, void 0 === this.O9s));
  }
  SetRewardGoalValue(t, r) {
    var s = [this.GetText(0), this.GetText(10), this.GetText(9)];
    for (let e = 0; e < s.length; e++) {
      var i = e === t;
      s[e].SetUIActive(i), i && s[e].SetText(r.toString());
    }
  }
  RefreshRewardState(t, e) {
    var r = this.GetUiNiagara(7);
    if ((r.SetUIActive(!1), r.Deactivate(), e || this.O9s !== t)) {
      var s = [this.GetSprite(2), this.GetSprite(4), this.GetSprite(3)];
      for (let e = 0; e < s.length; e++) s[e].SetUIActive(e === t);
      this.GetItem(8).SetUIActive(1 === t);
      var i =
          0 === t
            ? REWARD_BACKGROUND_COLOR_UNFINISHED
            : REWARD_BACKGROUND_COLOR_FINISHED,
        i = UE.Color.FromHex(i);
      this.GetSprite(5).SetColor(i),
        this.GetUiNiagara(6).SetAlpha(1 === t ? 1 : 0),
        2 !== t || e || (r.SetUIActive(!0), r.ActivateSystem(!0)),
        (this.O9s = t);
    }
  }
  e2t() {
    ControllerHolder_1.ControllerHolder.MoonChasingController.RequestAllAvailableHandbookReward();
  }
  Zkt(e) {
    var t = [];
    for (const i of this.Pe.GetPreviewReward()) {
      var r = { Id: i[0].ItemId, Num: i[1], Received: e };
      t.push(r);
    }
    var s = {
      RewardLists: t,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, Y_BIAS, 0),
    };
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      s,
    );
  }
}
exports.HandbookRewardItem = HandbookRewardItem;
//# sourceMappingURL=HandbookRewardItem.js.map
