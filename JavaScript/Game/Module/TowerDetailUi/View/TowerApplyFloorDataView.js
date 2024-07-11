"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerApplyFloorDataView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TowerController_1 = require("../TowerController"),
  TowerData_1 = require("../TowerData"),
  TowerRoleComplexItem_1 = require("./TowerRoleComplexItem");
class TowerApplyFloorDataView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.eDo = () => {
        this.CloseMe();
      }),
      (this.sOt = () => {
        TowerController_1.TowerController.TowerApplyFloorDataRequest(!0),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [6, this.eDo],
        [7, this.sOt],
      ]);
  }
  OnStart() {
    this.SHe();
  }
  SHe() {
    var r = ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor;
    if (r) {
      var o = ModelManager_1.ModelManager.TowerModel.GetFloorData(r.TowerId),
        t = this.GetItem(8),
        i = this.GetItem(5);
      for (let e = 0; e < r.Star; e++)
        LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), i);
      var a = this.GetItem(3);
      for (let e = 0; e < o.Star; e++)
        LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), a);
      t.SetUIActive(!1);
      var s = this.GetItem(9),
        l = this.GetItem(4),
        n = [];
      for (const T of r.Formation) n.push(T.O6n);
      for (const h of n) {
        var _ = LguiUtil_1.LguiUtil.CopyItem(s, l);
        const M = new TowerRoleComplexItem_1.TowerRoleComplexItem();
        M.CreateThenShowByActorAsync(_.GetOwner()).finally(() => {
          M.RefreshRoleId(h);
        });
      }
      var g = this.GetItem(2),
        w = [];
      for (const f of o.Formation) w.push(f.O6n);
      for (const p of w) {
        var U = LguiUtil_1.LguiUtil.CopyItem(s, g);
        const x = new TowerRoleComplexItem_1.TowerRoleComplexItem();
        x.CreateThenShowByActorAsync(U.GetOwner()).finally(() => {
          x.RefreshRoleId(p);
        });
      }
      s.SetUIActive(!1);
      let e = "";
      e =
        r.Difficulties === TowerData_1.LOW_RISK_DIFFICULTY
          ? "Text_LowRiskAreaFloor_Text"
          : r.Difficulties === TowerData_1.HIGH_RISK_DIFFICULTY
            ? "Text_HighRiskAreaFloor_Text"
            : "Text_VariationAreaFloor_Text";
      var u = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(
        r.TowerId,
      );
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, u, r.FloorNumber);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "CycleTower",
          5,
          "打开爬塔成绩确认框时失败，未能获取到新挑战数据",
        );
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TowerModel.ClearNotConfirmedData();
  }
}
exports.TowerApplyFloorDataView = TowerApplyFloorDataView;
//# sourceMappingURL=TowerApplyFloorDataView.js.map
