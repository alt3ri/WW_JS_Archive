"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceTipGrid = void 0);
const ue_1 = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
class InstanceTipGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.sOe = void 0),
      (this.s1i = !0),
      (this.a1i = !1),
      (this.h1i = []);
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
    for (const t of this.h1i) t.Destroy();
    this.h1i.length = 0;
  }
  Refresh(t) {
    t && (this.NUe = t), this.Yhi(), this.l1i(), this._1i();
  }
  ClearGrid() {
    for (const t of this.h1i) t.Destroy();
    this.h1i.length = 0;
  }
  Yhi() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.NUe,
    );
    var t =
      ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
        t.CustomTypes,
      );
    const i =
      (this.GetItem(4).SetUIActive(void 0 !== t),
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(
        this.NUe,
      ));
    var t =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
        i,
      );
    const e =
      ((this.sOe = t),
      (this.a1i = this.sOe && this.sOe.length > 0),
      this.GetItem(2).GetOwner());
    const r = this.GetItem(1);
    let s = 0;
    const o = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
      this.NUe,
    );
    for (const a of this.sOe) {
      let t = this.h1i[s++];
      t ||
        ((t =
          new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
          LguiUtil_1.LguiUtil.DuplicateActor(e, r),
        ),
        this.h1i.push(t)),
        t.Refresh(a),
        i || t.SetReceivedVisible(o),
        t.SetActive(!0);
    }
    for (let t = this.sOe.length; t < this.h1i.length; ++t)
      this.h1i[t].SetActive(!1);
    this.GetItem(2).SetUIActive(!1);
  }
  l1i() {
    this.RootItem.SetUIActive(this.a1i && this.s1i);
  }
  _1i() {
    const t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.NUe,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.MapName);
  }
}
exports.InstanceTipGrid = InstanceTipGrid;
// # sourceMappingURL=InstanceTipGrid.js.map
