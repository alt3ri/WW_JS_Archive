"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalQuickRoleSelectView = void 0);
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer"),
  EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
  QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  PersonalQuickRoleSelectGrid_1 = require("./PersonalQuickRoleSelectGrid");
class PersonalQuickRoleSelectView extends QuickRoleSelectView_1.QuickRoleSelectView {
  constructor() {
    super(...arguments),
      (this.O1l = () => {
        var e = new PersonalQuickRoleSelectGrid_1.PersonalQuickRoleSelectGrid();
        return (
          e.BindOnExtendToggleStateChanged(this.ToggleFunction),
          e.BindOnCanExecuteChange(this.CanExecuteChange),
          e
        );
      }),
      (this.CanExecuteChange = (e, i, r) => {
        return (
          0 !== r ||
          ((r = e),
          ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem,
            r.GetDataId(),
          ) &&
            (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem,
              r.GetDataId(),
            ),
            (e = this.RoleList.indexOf(r)),
            this.RoleScrollView.RefreshGridProxy(e)),
          (r =
            ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >=
            EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) &&
            (this.Data?.OnRoleSelectFull
              ? this.Data?.OnRoleSelectFull()
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "EditBattleTeamRoleFull",
                )),
          !r)
        );
      });
  }
  OnStart() {
    (this.Data = this.OpenParam),
      (this.RoleScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(10).GetOwner(),
        this.O1l,
      )),
      (this.LoadingSequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(
        this.GetItem(13),
      ));
  }
}
exports.PersonalQuickRoleSelectView = PersonalQuickRoleSelectView;
//# sourceMappingURL=PersonalQuickRoleSelectView.js.map
