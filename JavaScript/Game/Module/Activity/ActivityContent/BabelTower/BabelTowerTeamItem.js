"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerTeamItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BabelTowerTeamRoleItem_1 = require("./BabelTowerTeamRoleItem");
class BabelTowerTeamItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.NSn = void 0),
      (this.OSn = void 0),
      (this.kSn = []),
      (this.jSn = void 0),
      (this.OnClickBtnCallBack = void 0),
      (this.nqe = () => {
        this.OnClickBtnCallBack?.();
      }),
      (this.KSn = () => new BabelTowerTeamRoleItem_1.BabelTowerTeamRoleItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.nqe]]);
  }
  async OnBeforeStartAsync() {
    (this.NSn = new CommonSelectItem_1.CommonElementItem()),
      (this.OSn = new CommonSelectItem_1.CommonElementItem()),
      await this.NSn.CreateByActorAsync(this.GetItem(3).GetOwner()),
      this.NSn.SetActive(!0),
      await this.OSn.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.OSn.SetActive(!0),
      this.kSn.push(this.NSn),
      this.kSn.push(this.OSn),
      (this.jSn = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(5),
        this.KSn,
      ));
  }
  RefreshItem(e, t) {
    this.jSn?.RefreshByData(e);
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t),
      i =
        (this.kSn.forEach((e) => {
          e.SetActive(!1);
        }),
        e?.RecommendElement ?? []);
    for (let e = 0; e < i.length; e++)
      0 !== i[e] &&
        (this.kSn[e].SetActive(!0), this.kSn[e].Refresh(i[e], !1, e));
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
      t,
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "BossRushRecommendLevel",
      e,
    );
  }
}
exports.BabelTowerTeamItem = BabelTowerTeamItem;
//# sourceMappingURL=BabelTowerTeamItem.js.map
