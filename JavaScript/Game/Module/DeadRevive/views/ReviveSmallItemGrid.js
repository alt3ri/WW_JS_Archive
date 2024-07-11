"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReviveSmallItemGrid = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
class ReviveSmallItemGrid extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments),
      (this.ItemId = void 0),
      (this.j3 = void 0),
      (this.q2t = -1),
      (this.Rgt = 1),
      (this.F2t = () => {
        this.q2t <= 0
          ? (void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
            (this.j3 = void 0))
          : (this.RefreshCoolDown(),
            (this.q2t -=
              TimerSystem_1.MIN_TIME /
              CommonDefine_1.MILLIONSECOND_PER_SECOND));
      });
  }
  Refresh(e, i) {
    this.ItemId = e;
    const t =
      ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e);
    this.Apply({
      Data: e,
      Type: 4,
      ItemConfigId: e,
      BottomText: i > 0 ? "" + i : "",
      CoolDownTime: t,
    }),
      (this.q2t = t),
      (this.Rgt =
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(
          this.ItemId,
        )),
      void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = TimerSystem_1.TimerSystem.Forever(
        this.F2t,
        TimerSystem_1.MIN_TIME,
      ));
  }
  RefreshCoolDown() {
    const e = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
      this.ItemId,
    );
    this.SetCoolDown(e, this.Rgt);
  }
  OnDestroyed() {
    (this.ItemId = void 0) !== this.j3 &&
      TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = void 0),
      (this.q2t = -1),
      (this.Rgt = 1);
  }
}
exports.ReviveSmallItemGrid = ReviveSmallItemGrid;
// # sourceMappingURL=ReviveSmallItemGrid.js.map
