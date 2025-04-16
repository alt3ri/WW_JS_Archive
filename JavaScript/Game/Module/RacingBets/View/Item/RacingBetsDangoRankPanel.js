"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoRankPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  RacingBetsDangoRankItem_1 = require("./RacingBetsDangoRankItem"),
  RacingBetsDefine_1 = require("../../RacingBetsDefine");
class RacingBetsDangoRankPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fGo = void 0),
      (this.Bv1 = new Map()),
      (this.DangoRankItemHeight = 0),
      (this.DangoRankInterval =
        RacingBetsDefine_1.RACING_BETS_DANGO_RANK_ITEM_OFFSET_INTERVAL),
      (this.kv1 = []),
      (this.xv1 = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    const t = new CustomPromise_1.CustomPromise();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "RacingBetsRankChangeCurve",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (e) => {
      (this.xv1 = e), t.SetResult(void 0);
    }),
      await t.Promise;
  }
  OnStart() {
    (this.fGo = this.GetItem(0).GetAttachUIChild(0)?.GetOwner()),
      this.fGo &&
        ((this.DangoRankItemHeight = this.fGo.GetUIItem().GetHeight()),
        this.fGo.GetUIItem().SetUIActive(!1));
  }
  async InitAsync(t) {
    this.Bv1.clear(), (this.kv1 = []);
    var i = new Array(t.length);
    for (let e = 0; e < t.length; e++) i[e] = this.Ov1(e, t[e]);
    await Promise.all(i);
  }
  async Ov1(e, t) {
    var i = this.qv1().GetOwner(),
      s = new RacingBetsDangoRankItem_1.RacingBetsDangoRankItem();
    await s.CreateThenShowByActorAsync(i),
      s.Init(t, this.xv1, this.DangoRankInterval),
      this.kv1.push(s),
      this.Bv1.set(t, s);
  }
  qv1() {
    return LguiUtil_1.LguiUtil.CopyItem(
      this.fGo.GetUIItem(),
      this.GetRootItem(),
    );
  }
  async RefreshRankItemAsync() {
    var t = new Array(this.kv1.length);
    for (let e = 0; e < this.kv1.length; e++) t[e] = this.kv1[e].RefreshAsync();
    await Promise.all(t);
  }
}
exports.RacingBetsDangoRankPanel = RacingBetsDangoRankPanel;
//# sourceMappingURL=RacingBetsDangoRankPanel.js.map
