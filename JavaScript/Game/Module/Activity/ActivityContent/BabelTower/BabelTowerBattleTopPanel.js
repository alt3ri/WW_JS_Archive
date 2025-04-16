"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerBattleTopPanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView");
class BabelTowerBattleTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.Tcc = 0),
      (this.Iu1 = !1),
      (this.DTc = (e, t) => {
        0 === t && this.bcc();
      }),
      (this.bcc = () => {
        var e = [],
          t = [],
          i =
            ModelManager_1.ModelManager.BabelTowerModel
              .CurrentChallengeInstData,
          s = i?.BuffSelection;
        if (s)
          for (const a of s) {
            var r = { Id: a, IsDeTerm: !1, CanClick: !0, ShowStar: !1 };
            e.push(r);
          }
        s = i?.DeTermIdList;
        if (s)
          for (const o of s) {
            var n = { Id: o, IsDeTerm: !0, CanClick: !0, ShowStar: !0 };
            t.push(n);
          }
        i = { BuffDataList: e, DeTermDataList: t };
        UiManager_1.UiManager.OpenView("BabelTowerBuffView", i);
      }),
      (this.Lcc = () => {
        var e = ModelManager_1.ModelManager.BabelTowerModel.GetCurStarNum();
        this.Update(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.bcc]]);
  }
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), this.SetVisible(1, !1);
  }
  Reset() {
    super.Reset();
  }
  LZs() {
    this.Iu1 ||
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate,
        this.Lcc,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.地图,
        this.DTc,
      ),
      (this.Iu1 = !0));
  }
  DZs() {
    this.Iu1 &&
      (EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate,
        this.Lcc,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.地图,
        this.DTc,
      ),
      (this.Iu1 = !1));
  }
  Update(e) {
    (this.Tcc = e), this.Refresh();
  }
  Refresh() {
    this.GetText(1).SetText(this.Tcc.toString());
  }
  StartShow() {
    var e =
      ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData
        ?.CurStarNum ?? 0;
    this.Update(e), this.SetVisible(1, !0);
  }
  EndShow() {
    this.SetVisible(1, !1);
  }
  OnShowBattleChildView() {
    this.LZs();
  }
  OnHideBattleChildView() {
    this.DZs();
  }
}
exports.BabelTowerBattleTopPanel = BabelTowerBattleTopPanel;
//# sourceMappingURL=BabelTowerBattleTopPanel.js.map
