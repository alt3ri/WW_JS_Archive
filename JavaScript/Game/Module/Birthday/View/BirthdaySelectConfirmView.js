"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BirthdaySelectConfirmView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById"),
  RoleSkinBirthdayById_1 = require("../../../../Core/Define/ConfigQuery/RoleSkinBirthdayById"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LogReportDefine_1 = require("../../LogReport/LogReportDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class BirthdaySelectConfirmView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Hp1 = void 0),
      (this.$p1 = () => {
        UiManager_1.UiManager.CloseAndOpenView(
          this.Info.Name,
          "BirthdayRoleSelectView",
          this.Hp1,
        );
      }),
      (this.jp1 = () => {
        this.RS1(),
          UiManager_1.UiManager.CloseAndOpenView(
            this.Info.Name,
            "BirthdayLetterView",
            this.Hp1,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.$p1],
        [2, this.jp1],
      ]);
  }
  OnBeforeShow() {
    this.Hp1 = this.OpenParam;
    var e = this.Hp1.RoleId;
    let i =
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.GetRoleSkinId();
    i = i || RoleInfoById_1.configRoleInfoById.GetConfig(e).SkinId;
    var r = RoleSkinBirthdayById_1.configRoleSkinBirthdayById.GetConfig(i);
    r &&
      (this.SetTextureByPath(r.RolePortrait, this.GetTexture(0)),
      (r = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(
        this.Hp1.Year,
      )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "BirthdayConfirmText",
        this.Hp1.Year,
        r.getMonth() + 1,
        r.getDate(),
      ),
      (r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        RoleInfoById_1.configRoleInfoById.GetConfig(e).Name,
      )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(5),
        "BirthdaySelected_GO",
        r,
      ),
      (e = ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(e)),
      this.GetText(4)?.SetUIActive(e),
      e) &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        "PrefabTextItem_434004484_Text",
        r,
      );
  }
  RS1() {
    var e = this.Hp1.RoleId,
      i = new LogReportDefine_1.BirthdaySelectRoleEvent(),
      e =
        ((i.i_role_id = e),
        ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(e)),
      e =
        ((i.b_if_selected_role = e),
        ModelManager_1.ModelManager.BirthdayModel.GetBirthdayCount());
    (i.i_birthday_count = e),
      (i.i_trigger_type = 1),
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
  }
}
exports.BirthdaySelectConfirmView = BirthdaySelectConfirmView;
//# sourceMappingURL=BirthdaySelectConfirmView.js.map
