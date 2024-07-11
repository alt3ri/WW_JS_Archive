"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomBattleFettersObtainView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
const PhantomBattleItemView_1 = require("./PhantomBattleItemView");
class PhantomBattleFettersObtainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$Vi = void 0),
      (this.YVi = void 0),
      (this.JVi = (e, t, i) => {
        t = new PhantomBattleItemView_1.PhantomFettersObtainItem(t);
        return (
          t.Init(),
          t.Update(e),
          t.BindOnItemButtonClickedCallback(this.zVi),
          { Key: i, Value: t }
        );
      }),
      (this.zVi = (e) => {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
          "MonsterDetectView",
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            e,
          )?.MonsterProbeId,
        );
      }),
      (this.mIt = () => {
        let e;
        (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter =
          this.$Vi),
          this.CloseMe(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.VisionFilterMonster,
          ),
          UiManager_1.UiManager.IsViewShow("VisionEquipmentView") ||
            ((e =
              ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId()),
            UiManager_1.UiManager.IsViewShow("PhantomBattleFettersView")
              ? UiManager_1.UiManager.CloseAndOpenView(
                  "PhantomBattleFettersView",
                  "VisionEquipmentView",
                  e,
                )
              : UiManager_1.UiManager.OpenView("VisionEquipmentView", e));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.mIt]]);
  }
  OnStart() {
    const e = this.OpenParam;
    (this.YVi = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.JVi,
    )),
      this.ShowFettersObtainView(e);
  }
  ShowFettersObtainView(e) {
    this.SetActive(!0), (this.$Vi = e);
  }
  OnBeforeDestroy() {
    this.YVi.ClearChildren();
  }
}
exports.PhantomBattleFettersObtainView = PhantomBattleFettersObtainView;
// # sourceMappingURL=PhantomBattleFettersObtainView.js.map
