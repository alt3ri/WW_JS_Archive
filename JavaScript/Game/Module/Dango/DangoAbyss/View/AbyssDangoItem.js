"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssDangoItem = exports.AbyssDangoItemData = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AbyssDangoCircleQulityItem_1 = require("./AbyssDangoCircleQulityItem");
class AbyssDangoItemData {
  constructor() {
    (this.DangoId = 0),
      (this.PlayerId = 0),
      (this.RoleId = 0),
      (this.SelectState = !1),
      (this.OnSelectCallBack = () => {});
  }
}
exports.AbyssDangoItemData = AbyssDangoItemData;
class AbyssDangoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$8i = new AbyssDangoItemData()),
      (this.dDc = void 0),
      (this.mDc = void 0),
      (this.wCo = !1),
      (this.PVi = (e) => {
        this.$8i.OnSelectCallBack(this.$8i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIText],
      [2, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIExtendToggle],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.PVi]]);
  }
  async OnBeforeStartAsync() {}
  OnBeforeDestroy() {
    this.wCo &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        "RedDotDangoFormationRole",
        this.GetItem(8),
      );
  }
  Refresh(e, t, s) {
    (this.$8i = e),
      this.Xbc(e),
      this.Olt(e),
      this.Ybc(e),
      this.mFe(e),
      this.Oqe(e),
      this.NFe(e),
      this.hC1(e),
      e.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        (RedDotController_1.RedDotController.BindRedDot(
          "RedDotDangoFormationRole",
          this.GetItem(8),
          void 0,
          e.DangoId,
        ),
        (this.wCo = !0));
  }
  hC1(e) {
    var t,
      s =
        ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig,
      i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData();
    if (s && i) {
      for (const r of i.GetAbyssChallengeDataList())
        if (r.GetConfig()?.InstId === s.Id)
          return (
            (t = r.GetConfig().RecommendLittleRole.includes(e.DangoId)),
            void this.GetItem(7)?.SetUIActive(t)
          );
      this.GetItem(7)?.SetUIActive(!1);
    }
  }
  Oqe(e) {
    e = e.SelectState ? 1 : 0;
    this.GetExtendToggle(6)?.SetToggleState(e);
  }
  mFe(e) {
    this.fDc(e);
  }
  fDc(s) {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "RefreshQualitySpriteAsync",
      async () => {
        this.dDc
          ? await this.mDc.Promise
          : ((this.dDc =
              new AbyssDangoCircleQulityItem_1.AbyssDangoCircleQualityItem()),
            (this.mDc = new CustomPromise_1.CustomPromise()),
            await this.dDc.CreateByActorAsync(this.GetItem(0).GetOwner()),
            this.mDc.SetResult(),
            this.dDc.SetActive(!0));
        var e =
            ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
              s.DangoId,
            ).GetEquipPluginMap(),
          t = new AbyssDangoCircleQulityItem_1.DangoCircleQualityData();
        (t.PluginIdMap = e), this.dDc.RefreshData(t);
      },
    );
    this.RunAsyncTask(e);
  }
  Ybc(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
      e.DangoId,
    ).GetFormationIcon();
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  Olt(e) {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
        e.DangoId,
      ),
      t = e.GetLevel();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      "AbyssDango_LV",
      t?.toString(),
    ),
      this.GetItem(3)?.SetUIActive(!e.GetIfLock());
  }
  Xbc(e) {
    var t = e.PlayerId;
    (0 !== t && !ModelManager_1.ModelManager.DangoAbyssModel?.CheckIsSelf(t)) ||
    0 === e.RoleId
      ? this.GetTexture(2)?.SetUIActive(!1)
      : (this.GetTexture(2)?.SetUIActive(!0),
        (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleId)),
        this.SetRoleIcon(t.RoleHeadIconCircle, this.GetTexture(2), e.RoleId));
  }
  NFe(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
      e.DangoId,
    ).GetIfLock();
    this.GetItem(5)?.SetUIActive(e);
  }
}
exports.AbyssDangoItem = AbyssDangoItem;
//# sourceMappingURL=AbyssDangoItem.js.map
