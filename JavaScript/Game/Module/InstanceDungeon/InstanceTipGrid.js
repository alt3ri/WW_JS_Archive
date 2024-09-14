"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceTipGrid = void 0);
const ue_1 = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../Util/LguiUtil");
class InstanceTipGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.sOe = void 0),
      (this.s_i = !0),
      (this.a_i = !1),
      (this.h_i = []);
  }
  Initialize(t) {
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIItem],
      [2, ue_1.UIItem],
      [3, ue_1.UIButtonComponent],
      [4, ue_1.UIItem],
    ];
  }
  OnBeforeDestroy() {
    for (const t of this.h_i) t.Destroy();
    this.h_i.length = 0;
  }
  Refresh(t) {
    t && (this.NUe = t), this.Yli(), this.l_i(), this.__i();
  }
  ClearGrid() {
    for (const t of this.h_i) t.Destroy();
    this.h_i.length = 0;
  }
  Yli() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ),
      t =
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          t.CustomTypes,
        ),
      t =
        (this.GetItem(4).SetUIActive(void 0 !== t),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(
          this.NUe,
        )),
      t =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
          t,
        ),
      i =
        ((this.sOe = t),
        (this.a_i = this.sOe && 0 < this.sOe.length),
        this.GetItem(2).GetOwner()),
      e = this.GetItem(1);
    let r = 0;
    var s =
      ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
        this.NUe,
      ) ||
      ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstanceCompatible(
        this.NUe,
      );
    for (const o of this.sOe) {
      let t = this.h_i[r++];
      t ||
        ((t =
          new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
          LguiUtil_1.LguiUtil.DuplicateActor(i, e),
        ),
        this.h_i.push(t)),
        t.Refresh(o),
        t.SetReceivedVisible(s),
        t.SetActive(!0);
    }
    for (let t = this.sOe.length; t < this.h_i.length; ++t)
      this.h_i[t].SetActive(!1);
    this.GetItem(2).SetUIActive(!1);
  }
  l_i() {
    this.RootItem.SetUIActive(this.a_i && this.s_i);
  }
  __i() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.NUe,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.MapName);
  }
}
exports.InstanceTipGrid = InstanceTipGrid;
//# sourceMappingURL=InstanceTipGrid.js.map
