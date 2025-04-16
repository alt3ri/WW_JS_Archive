"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerNormalQuestItem = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerNormalQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.BOe = 0),
      (this.Wec = void 0),
      (this.Zcc = () => {
        BabelTowerController_1.BabelTowerController.BabelTowerTaskRewardRequest(
          this.BOe,
        );
      }),
      (this.jWt = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.Zcc]]);
  }
  OnStart() {
    this.Wec = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(1),
      this.jWt,
    );
  }
  Refresh(e, r, t) {
    this.BOe = e;
    var i,
      o,
      l =
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerNormalQuest(
          e,
        );
    l &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), l.Title),
      (o =
        0 < l.DropId
          ? ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
              l.DropId,
            )
          : []),
      this.Wec?.RefreshByData(o),
      (e =
        (o =
          BabelTowerController_1.BabelTowerController.GetBabelTowerData()).NormalQuest.get(
          e,
        )?.H6n ?? Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning),
      this.GetButton(3).RootUIComp.SetUIActive(
        e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish,
      ),
      this.GetItem(6).SetUIActive(
        e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken,
      ),
      (i = e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning),
      this.GetText(5).SetUIActive(i),
      this.GetItem(4).SetUIActive(
        e === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken,
      ),
      i) &&
      (e =
        o.NormalLevelDataMap.get(l.LevelId) ??
        o.HardLevelDataMap.get(l.LevelId)) &&
      ((i = MathUtils_1.MathUtils.LongToNumber(e.yzs)),
      TimeUtil_1.TimeUtil.GetServerTimeStamp() >= i
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(5),
            "BabelTowerTaskDoing",
          )
        : ((o = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
            (i - TimeUtil_1.TimeUtil.GetServerTimeStamp()) *
              TimeUtil_1.TimeUtil.Millisecond,
          )),
          this.GetText(5).SetText(o.CountDownText)));
  }
}
exports.BabelTowerNormalQuestItem = BabelTowerNormalQuestItem;
//# sourceMappingURL=BabelTowerNormalQuestItem.js.map
