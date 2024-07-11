"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReviveSmallItemGrid = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
class ReviveSmallItemGrid extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments),
      (this.ItemId = void 0),
      (this.j3 = void 0),
      (this.GFt = -1),
      (this.k0t = 1),
      (this.VFt = () => {
        this.GFt <= 0
          ? (void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
            (this.j3 = void 0))
          : (this.RefreshCoolDown(),
            (this.GFt -=
              TimerSystem_1.MIN_TIME /
              CommonDefine_1.MILLIONSECOND_PER_SECOND));
      });
  }
  Refresh(e, i) {
    this.ItemId = e;
    var t =
      ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e);
    this.Apply({
      Data: e,
      Type: 4,
      ItemConfigId: e,
      BottomText: 0 < i ? "" + i : "",
      CoolDownTime: t,
    }),
      (this.GFt = t),
      (this.k0t =
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(
          this.ItemId,
        )),
      void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = TimerSystem_1.TimerSystem.Forever(
        this.VFt,
        TimerSystem_1.MIN_TIME,
      ));
  }
  RefreshCoolDown() {
    var e = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
      this.ItemId,
    );
    this.SetCoolDown(e, this.k0t);
  }
  OnDestroyed() {
    (this.ItemId = void 0) !== this.j3 &&
      TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = void 0),
      (this.GFt = -1),
      (this.k0t = 1);
  }
}
exports.ReviveSmallItemGrid = ReviveSmallItemGrid;
//# sourceMappingURL=ReviveSmallItemGrid.js.map
