"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerDailyQuestItem = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  BabelTowerController_1 = require("./BabelTowerController"),
  BabelTowerDailyQuestBuffOrDeTermItem_1 = require("./BabelTowerDailyQuestBuffOrDeTermItem");
class BabelTowerDailyQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.BOe = 0),
      (this.Wec = void 0),
      (this.Qec = void 0),
      (this.jWt = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.xDo = () => {
        return new BabelTowerDailyQuestBuffOrDeTermItem_1.BabelTowerDailyQuestBuffOrDeTermItem();
      }),
      (this.Zcc = () => {
        BabelTowerController_1.BabelTowerController.BabelTowerDailyTaskRewardRequest(
          this.BOe,
        );
      }),
      (this.e1c = () => {
        var e =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDailyQuest(
            this.BOe,
          );
        e &&
          ((ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle =
            e.JumpToLevelId),
          UiManager_1.UiManager.IsViewHide("BabelTowerHardLevelChoseView")
            ? UiManager_1.UiManager.NormalResetToView(
                "BabelTowerHardLevelChoseView",
                () => {
                  UiManager_1.UiManager.CloseView("BabelTowerQuestView");
                },
              )
            : UiManager_1.UiManager.NormalResetToView(
                "BabelTowerMainView",
                () => {
                  UiManager_1.UiManager.OpenView(
                    "BabelTowerHardLevelChoseView",
                    void 0,
                    () => {
                      UiManager_1.UiManager.CloseView("BabelTowerQuestView");
                    },
                  );
                },
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.Zcc],
        [5, this.e1c],
      ]);
  }
  OnStart() {
    this.GetText(4).SetUIActive(!1),
      (this.Wec = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(1),
        this.jWt,
      )),
      (this.Qec = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(6),
        this.xDo,
      ));
  }
  Refresh(e, r, i) {
    this.BOe = e;
    var o =
      ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDailyQuest(e);
    if (o) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o.Title);
      var t =
        0 < o.DropId
          ? ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
              o.DropId,
            )
          : [];
      this.Wec?.RefreshByData(t);
      var t =
          BabelTowerController_1.BabelTowerController.GetBabelTowerData().DailyQuest.get(
            e,
          )?.H6n ?? Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning,
        a =
          (this.GetButton(3).RootUIComp.SetUIActive(
            t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish,
          ),
          this.GetButton(5).RootUIComp.SetUIActive(
            t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning,
          ),
          this.GetItem(8).SetUIActive(
            t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken,
          ),
          []);
      for (const s of o.ShowDeTerm) {
        var l =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(s);
        a.push(l.Texture);
      }
      for (const u of o.ShowBuff) {
        var n =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(u);
        a.push(n.Texture);
      }
      this.Qec?.RefreshByData(a);
    }
  }
}
exports.BabelTowerDailyQuestItem = BabelTowerDailyQuestItem;
//# sourceMappingURL=BabelTowerDailyQuestItem.js.map
