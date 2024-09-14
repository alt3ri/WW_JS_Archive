"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseInBattleTips = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TowerDefenceController_1 = require("../TowerDefenceController"),
  WAITING_TO_CLOSE = 2e3;
class TowerDefenseInBattleTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), (this.DOt = void 0), (this.ioa = 1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.DOt = new SmallItemGrid_1.SmallItemGrid()),
      await this.DOt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.bl();
  }
  OnAfterDestroy() {
    TowerDefenceController_1.TowerDefenseController.TryReopenInBattleTip();
  }
  bl() {
    this.ioa =
      ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomLevelInBattle();
    var e =
        TowerDefenceController_1.TowerDefenseController.BuildPhantomIconInBattleData(),
      e =
        (this.DOt.Apply(e),
        TowerDefenceController_1.TowerDefenseController.BuildPhantomTipsInBattleData());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TitleTextId),
      e.DescArgs
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            e.DescTextId,
            ...e.DescArgs,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.DescTextId);
  }
  OnAfterPlayStartSequence() {
    this.lSa().finally(() => {
      TowerDefenceController_1.TowerDefenseController.ResetCurrentPhantomLevelUpFlag(
        this.ioa,
      ),
        this.CloseMe();
    });
  }
  async lSa() {
    await TimerSystem_1.TimerSystem.Wait(WAITING_TO_CLOSE);
  }
}
exports.TowerDefenseInBattleTips = TowerDefenseInBattleTips;
//# sourceMappingURL=TowerDefenceInBattleTips.js.map
