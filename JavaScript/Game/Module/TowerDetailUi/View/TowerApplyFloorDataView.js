"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerApplyFloorDataView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerController_1 = require("../TowerController");
const TowerData_1 = require("../TowerData");
const TowerRoleComplexItem_1 = require("./TowerRoleComplexItem");
class TowerApplyFloorDataView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.oLo = () => {
        this.CloseMe();
      }),
      (this.nNt = () => {
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
        [6, this.oLo],
        [7, this.nNt],
      ]);
  }
  OnStart() {
    this.h7e();
  }
  h7e() {
    const r = ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor;
    if (r) {
      const o = ModelManager_1.ModelManager.TowerModel.GetFloorData(r.TowerId);
      const t = this.GetItem(8);
      const i = this.GetItem(5);
      for (let e = 0; e < r.Star; e++)
        LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), i);
      const a = this.GetItem(3);
      for (let e = 0; e < o.Star; e++)
        LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), a);
      t.SetUIActive(!1);
      const s = this.GetItem(9);
      const l = this.GetItem(4);
      const n = [];
      for (const T of r.Formation) n.push(T.l3n);
      for (const h of n) {
        const _ = LguiUtil_1.LguiUtil.CopyItem(s, l);
        const M = new TowerRoleComplexItem_1.TowerRoleComplexItem();
        M.CreateThenShowByActorAsync(_.GetOwner()).finally(() => {
          M.RefreshRoleId(h);
        });
      }
      const g = this.GetItem(2);
      const w = [];
      for (const f of o.Formation) w.push(f.l3n);
      for (const p of w) {
        const U = LguiUtil_1.LguiUtil.CopyItem(s, g);
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
      const u = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(
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
// # sourceMappingURL=TowerApplyFloorDataView.js.map
