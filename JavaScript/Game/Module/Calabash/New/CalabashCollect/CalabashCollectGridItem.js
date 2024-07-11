"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashCollectGridItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomBattleFettersViewItem_1 = require("../../../Phantom/PhantomBattle/View/PhantomBattleFettersViewItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashCollectStarItem_1 = require("./CalabashCollectStarItem");
class CalabashCollectGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.sft = void 0),
      (this.$be = void 0),
      (this.CanToggleChange = void 0),
      (this.OnToggleClick = void 0),
      (this.zbe = () =>
        new CalabashCollectStarItem_1.CalabashCollectStarItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
    ];
    this.BtnBindInfo = [
      [
        0,
        () => {
          this.OnToggleClick?.(this.GridIndex);
        },
      ],
    ];
  }
  async OnBeforeStartAsync() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(
      () => !this.CanToggleChange || this.CanToggleChange(this.GridIndex),
    ),
      (this.sft = new PhantomBattleFettersViewItem_1.VisionDetailMonsterItem()),
      await this.sft?.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      this.sft.SetToggleInteractive(!1),
      (this.$be = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this.zbe,
      ));
  }
  Refresh(t, e, i) {
    let s = (this.Pe = t).DevelopRewardData.MonsterId;
    const a = [];
    let r = 0;
    for (const o of ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardInfoData(
      s,
    )) {
      const h = o.IsUnlock;
      a.push(h), h && r++;
    }
    t.UnlockData
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.SkillName)
      : ((s =
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            s,
          ).MonsterNumber),
        this.GetText(2)?.SetText(s + "???")),
      this.sft.Refresh(
        new PhantomBattleFettersViewItem_1.VisionDetailMonsterItemData(
          t.DevelopRewardData.MonsterId,
          r,
        ),
      ),
      this.$be?.RefreshByData(a);
    s = e ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleStateForce(s),
      s == 1 ? this.OnSelected(!1) : this.RefreshNewItem();
  }
  OnSelected(t) {
    this.Pe?.UnlockData &&
      (ModelManager_1.ModelManager.CalabashModel?.RecordMonsterId(
        this.Pe.DevelopRewardData.MonsterId,
      ),
      this.RefreshNewItem()),
      this.GetExtendToggle(0).SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  RefreshNewItem() {
    const t = ModelManager_1.ModelManager.CalabashModel.CheckMonsterIdInRecord(
      this.Pe.DevelopRewardData.MonsterId,
    );
    this.GetItem(3).SetUIActive(this.Pe.UnlockData && !t);
  }
}
exports.CalabashCollectGridItem = CalabashCollectGridItem;
// # sourceMappingURL=CalabashCollectGridItem.js.map
