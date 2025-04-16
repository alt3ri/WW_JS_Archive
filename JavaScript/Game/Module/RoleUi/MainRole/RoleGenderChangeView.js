"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGenderChangeView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  LoginDefine_1 = require("../../Login/Data/LoginDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MainRoleController_1 = require("../MainRoleController");
class RoleGenderChangeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Ylo = () => {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "GenderTransferSuccess",
        ),
          this.CloseMe();
      }),
      (this.OnClickCancel = () => {
        this.CloseMe();
      }),
      (this.OnClickConfirm = () => {
        var e;
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
          203,
        )?.HasTag(1996802261)
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "CanNotTransferInFight",
              ),
            ),
            this.CloseMe())
          : ModelManager_1.ModelManager.RoleModel.HasAnyTrialRole()
            ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Text_CanNotChangeSexWhenTrail_Text",
              ),
              this.CloseMe())
            : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                240,
              )).FunctionMap.set(2, () => {
                this.Tkl();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIInteractionGroup],
    ]),
      (this.BtnBindInfo = [
        [2, this.OnClickCancel],
        [3, this.OnClickConfirm],
      ]);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (e) {
      var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
        o = ModelManager_1.ModelManager.WorldLevelModel.Sex,
        t = r.ElementId,
        o =
          o === LoginDefine_1.ELoginSex.Boy
            ? LoginDefine_1.ELoginSex.Girl
            : LoginDefine_1.ELoginSex.Boy,
        a = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(o),
        l = a.length;
      let i = void 0,
        n = void 0;
      for (let e = 0; e < l; e++) {
        var s = a[e],
          _ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(s.Id);
        if (t === _.ElementId) {
          (n = s.Id), (i = _);
          break;
        }
      }
      i &&
        (this.SetRoleIcon(r.RoleHeadIconBig, this.GetTexture(0), e),
        this.SetRoleIcon(i.RoleHeadIconBig, this.GetTexture(1), n),
        (o = ModelManager_1.ModelManager.MainRoleModel.CanChangeSex()),
        this.GetInteractionGroup(7)?.SetInteractable(o),
        (r =
          CommonParamById_1.configCommonParamById.GetIntConfig("ChangeSexCd")),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(4),
          "GenderTransfer",
          Math.round(r / TimeUtil_1.TimeUtil.Hour),
        ),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "Cancel"),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "Confirm"));
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRoleChangeEnd,
      this.Ylo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRoleChangeEnd,
      this.Ylo,
    );
  }
  Tkl() {
    var e =
      ModelManager_1.ModelManager.WorldLevelModel.Sex ===
      LoginDefine_1.ELoginSex.Boy
        ? LoginDefine_1.ELoginSex.Girl
        : LoginDefine_1.ELoginSex.Boy;
    MainRoleController_1.MainRoleController.SendRoleSexChangeRequest(e);
  }
}
exports.RoleGenderChangeView = RoleGenderChangeView;
//# sourceMappingURL=RoleGenderChangeView.js.map
