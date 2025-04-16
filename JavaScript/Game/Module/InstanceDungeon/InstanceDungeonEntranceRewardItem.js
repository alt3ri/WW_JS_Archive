"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceRewardItem = void 0);
const ue_1 = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
class InstanceDungeonEntranceRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uth = void 0),
      (this.Jhi = void 0),
      (this.zhi = !0),
      (this.Zhi = 0),
      (this.gMl = 0),
      (this.eli = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.R2e = () => {
        UiManager_1.UiManager.OpenView("InstanceDungeonReward");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIScrollViewWithScrollbarComponent],
      [1, ue_1.UIButtonComponent],
      [2, ue_1.UIText],
      [3, ue_1.UIItem],
      [4, ue_1.UIText],
      [5, ue_1.UIItem],
      [6, ue_1.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.R2e]]);
  }
  OnStart() {
    (this.Jhi = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.eli,
    )),
      this.Uth && this.RefreshItem(this.Uth.InstanceId);
  }
  OnBeforeDestroy() {
    this.Jhi && (this.Jhi = void 0);
  }
  RefreshItem(e) {
    var i, t, r, n, a;
    this.InAsyncLoading()
      ? (this.Uth = { InstanceId: e })
      : ((i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)),
        (t =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceDungeonReward(
            e,
          )),
        (r =
          ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
            i?.RewardId,
          )?.RewardId),
        this.SetRewardBtnActive(1 < (r?.size ?? 0)),
        (a = (r =
          ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(e))
          ? 0
          : ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
              i?.FirstRewardId ?? 0,
            )?.length),
        (n =
          ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
            i?.ExchangeRewardId ?? 0,
          )?.length),
        this.SetFirstRewardLength(a),
        this.SetExchangeRewardLength(n),
        (a =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetInstanceFirstRewardId(
            e,
          )),
        this.RefreshRewardText(!r && 0 !== a),
        this.RefreshReward(
          t[0],
          t[1] ||
            ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstanceCompatible(
              e,
            ),
        ),
        this.SetDoubleRewardActivity(
          ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
            i?.CustomTypes ?? [],
          ),
        ));
  }
  RefreshReward(e, i) {
    (this.zhi = !i),
      this.Jhi.RefreshByData(e, () => {
        var i = this.Jhi?.GetScrollItemList(),
          t = i?.length ?? 0;
        for (let e = 0; e < t; e++) {
          var r = i[e];
          r.SetReceivedVisible(!this.zhi),
            r.SetFirstRewardVisible(e < this.Zhi),
            r.SetExchangeRewardVisible(
              e >= this.Zhi && e < this.Zhi + this.gMl,
            );
        }
      });
  }
  RefreshRewardText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "Text_RewardPreview_Text",
    );
  }
  SetRewardBtnActive(e) {
    this.GetButton(1).GetOwner().GetUIItem().SetUIActive(e),
      this.GetItem(6)?.SetUIActive(e);
  }
  SetDoubleRewardActivity(e) {
    this.GetItem(3).SetUIActive(void 0 !== e),
      this.GetItem(5).SetUIActive(void 0 !== e),
      e &&
        ((e = e.GetNumTxtAndParam()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e[0], e[1], e[2]));
  }
  SetFirstRewardLength(e) {
    this.Zhi = e;
  }
  SetExchangeRewardLength(e) {
    this.gMl = e;
  }
}
exports.InstanceDungeonEntranceRewardItem = InstanceDungeonEntranceRewardItem;
//# sourceMappingURL=InstanceDungeonEntranceRewardItem.js.map
