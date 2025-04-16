"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseRankTimeModel = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RankTimeItemModel_1 = require("../../InstanceDungeon/InstanceDungeonComponentModel/RankTimeItemModel"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TowerDefenseRankViewModel_1 = require("./TowerDefenseRankViewModel");
class TowerDefenseRankTimeModel extends RankTimeItemModel_1.RankTimeItemModelBase {
  OnButtonClick() {
    var e = new TowerDefenseRankViewModel_1.TowerDefenseRankViewModel();
    (e.InstanceId = this.InstanceId),
      UiManager_1.UiManager.OpenView("TowerDefenseRankView", e);
  }
  OnGetContent() {
    var e;
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.IsPassedInstance(
      this.InstanceId,
    )
      ? ((e =
          ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetBestScoreText(
            this.InstanceId,
          )),
        new LguiUtil_1.TableTextArgNew("ChallengeOL_Bestrecord", e))
      : new LguiUtil_1.TableTextArgNew("ChallengeOL_Norecord");
  }
}
exports.TowerDefenseRankTimeModel = TowerDefenseRankTimeModel;
//# sourceMappingURL=TowerDefenseRankTimeModel.js.map
