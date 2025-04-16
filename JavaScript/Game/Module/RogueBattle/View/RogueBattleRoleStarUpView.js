"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleRoleStarUpView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueBattleFetterUpItem_1 = require("../Component/RogueBattleFetterUpItem");
class RogueBattleRoleStarUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this._m1 = void 0),
      (this.jv1 = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
            this.OpenParam,
          ).Data.ap1.Ih1.Ld1,
          e =
            ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
              e,
            );
        e &&
          RoleController_1.RoleController.OpenRoleMainView(1, 0, [
            e.TrialRoleId,
          ]);
      }),
      (this.$An = (e) => {
        "InturnPlay" === e && this._m1?.PlayTurnAnimation();
      }),
      (this.ilo = () => {
        ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(
          this.OpenParam,
          (e) => {
            e && this.CloseMe();
          },
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [6, this.ilo],
        [7, this.jv1],
      ]);
  }
  async OnBeforeStartAsync() {
    this._m1 = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(4),
      () => new RogueBattleFetterUpItem_1.RogueBattleFetterUpItem(),
      this.GetItem(5).GetOwner(),
    );
    var e = this.BuildFetterData();
    return (
      this.RefreshView(),
      await this._m1.RefreshByDataAsync(e),
      super.OnBeforeStartAsync()
    );
  }
  OnAfterShow() {
    this._m1?.GetScrollItemMap().forEach((e) => {
      e.PlayExpAnimation();
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  BuildFetterData() {
    const r = [];
    const n = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
      this.OpenParam,
    ).Data.ap1.Ih1;
    var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
      n.Ld1,
    );
    const i = n.Ad1 - n.wd1;
    return (
      e.BondIds.forEach((t) => {
        var e = n.Th1.find((e) => e.v9n === t);
        e
          ? r.push({ OldRoleBondInfo: e, AddStar: i })
          : r.push({
              OldRoleBondInfo:
                ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(
                  t,
                ),
              AddStar: i,
            });
      }),
      r
    );
  }
  RefreshView() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam)
        .Data.ap1.Ih1,
      t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.Ud1);
    let r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
      e.Ld1,
    ).FormationRoleCard;
    t &&
      -1 !== (t = t.GetRoleSkinId()) &&
      ((t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t)),
      (r = t.FormationRoleCard)),
      this.SetTextureShowUntilLoaded(r, this.GetTexture(3)),
      this.GetText(1).SetText("" + e.wd1),
      this.GetText(2).SetText("" + e.Ad1);
  }
}
exports.RogueBattleRoleStarUpView = RogueBattleRoleStarUpView;
//# sourceMappingURL=RogueBattleRoleStarUpView.js.map
