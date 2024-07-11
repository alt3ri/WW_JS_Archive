"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerAreaItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TowerData_1 = require("../TowerData"),
  TowerModel_1 = require("../TowerModel");
class TowerAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.Rjt = !0),
      (this.tDo = -1),
      (this.SPe = void 0),
      (this.iDo = -1),
      (this.oDo = () => {
        this.Rjt
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NeedClearLastDifficulty",
            )
          : (this.SPe.StopCurrentSequence(),
            this.SPe.PlaySequencePurely("Click", !0));
      }),
      (this.K3t = (e) => {
        "Click" === e &&
          UiManager_1.UiManager.OpenView("TowerFloorView", this.tDo);
      }),
      (this.rDo = () => {
        var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          this.iDo,
        );
        this.nDo(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.oDo]]);
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.K3t),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTowerRefresh,
        this.rDo,
      ),
      this.GetText(1).SetUIActive(!1);
  }
  Refresh(e) {
    var t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
    (this.iDo = e), (this.tDo = t.AreaNum);
    let r = "";
    switch (t.AreaNum) {
      case 1:
        r = "Text_TowerOne_Text";
        break;
      case 2:
        r =
          t.Difficulty === TowerData_1.VARIATION_RISK_DIFFICULTY
            ? "Text_TowerThree_Text"
            : "Text_TowerTwo_Text";
        break;
      case 3:
        r =
          t.Difficulty === TowerData_1.VARIATION_RISK_DIFFICULTY
            ? "Text_TowerTwo_Text"
            : "Text_TowerThree_Text";
        break;
      default:
        r = "Text_TowerOne_Text";
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), r), this.nDo(t);
  }
  nDo(e) {
    var t = ModelManager_1.ModelManager.TowerModel.GetAreaAllStars(
        e.Difficulty,
        e.AreaNum,
      ),
      r = this.GetText(3);
    if (
      ((this.Rjt = ModelManager_1.ModelManager.TowerModel.CurrentTowerLock),
      this.GetItem(8)?.SetUIActive(!0),
      this.GetItem(9)?.SetUIActive(!1),
      this.Rjt)
    ) {
      this.GetItem(0).SetUIActive(!0),
        this.GetItem(5).SetUIActive(!1),
        this.GetItem(6).SetUIActive(!1),
        r.SetText("0/" + t);
      const i = UE.Color.FromHex(TowerModel_1.LOCK_COLOR);
      r.SetColor(i), void this.GetItem(7).SetColor(i);
    } else {
      this.GetItem(0).SetUIActive(!1);
      (e = ModelManager_1.ModelManager.TowerModel.GetAreaStars(
        e.Difficulty,
        e.AreaNum,
      )),
        (t = (r.SetText(e + "/" + t), t === e));
      this.GetItem(5).SetUIActive(!t), this.GetItem(6).SetUIActive(t);
      const i = UE.Color.FromHex(
        t ? TowerModel_1.FINISH_COLOR : TowerModel_1.NORMOL_COLOR,
      );
      r.SetColor(i), this.GetItem(7).SetColor(i);
    }
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRefresh,
      this.rDo,
    ),
      (this.Rjt = !0),
      this.SPe?.Clear(),
      (this.SPe = void 0);
  }
}
exports.TowerAreaItem = TowerAreaItem;
//# sourceMappingURL=TowerAreaItem.js.map
