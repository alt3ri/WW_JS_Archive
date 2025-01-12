"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGenderChangeView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LoginDefine_1 = require("../../Login/Data/LoginDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MainRoleController_1 = require("../MainRoleController");
class RoleGenderChangeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.Ylo = () => {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "GenderTransferSuccess",
        ),
          this.D1o(!1),
          this.CloseMe();
      }),
      (this.OnClickCancel = () => {
        this.CloseMe();
      }),
      (this.OnClickConfirm = () => {
        var e;
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
          188,
        )?.HasTag(1996802261)
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "CanNotTransferInFight",
              ),
            ),
            this.CloseMe())
          : (this.D1o(!0),
            (e =
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleGenderSwitchDelayTime()),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(4),
              "GenderTransfering",
            ),
            this.PlayArrowSequence(),
            TimerSystem_1.TimerSystem.Delay(() => {
              this.R1o();
            }, e));
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
    ]),
      (this.BtnBindInfo = [
        [2, this.OnClickCancel],
        [3, this.OnClickConfirm],
      ]);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (e) {
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.StopArrowSequence();
      var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
        t = ModelManager_1.ModelManager.WorldLevelModel.Sex,
        o = n.ElementId,
        t =
          t === LoginDefine_1.ELoginSex.Boy
            ? LoginDefine_1.ELoginSex.Girl
            : LoginDefine_1.ELoginSex.Boy,
        s = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(t),
        a = s.length;
      let i = void 0,
        r = void 0;
      for (let e = 0; e < a; e++) {
        var l = s[e],
          _ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(l.Id);
        if (o === _.ElementId) {
          (r = l.Id), (i = _);
          break;
        }
      }
      i &&
        (this.SetRoleIcon(n.RoleHeadIconBig, this.GetTexture(0), e),
        this.SetRoleIcon(i.RoleHeadIconBig, this.GetTexture(1), r),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "GenderTransfer"),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "Cancel"),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "Confirm"));
    }
  }
  OnAfterShow() {}
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
  OnBeforeDestroy() {}
  PlayArrowSequence() {
    this.SPe && this.SPe.PlayLevelSequenceByName("Arrow");
  }
  StopArrowSequence() {
    this.SPe && this.SPe.StopSequenceByKey("Arrow");
  }
  R1o() {
    var e =
      ModelManager_1.ModelManager.WorldLevelModel.Sex ===
      LoginDefine_1.ELoginSex.Boy
        ? LoginDefine_1.ELoginSex.Girl
        : LoginDefine_1.ELoginSex.Boy;
    MainRoleController_1.MainRoleController.SendRoleSexChangeRequest(e),
      this.StopArrowSequence();
  }
  D1o(e) {
    this.GetButton(2).SetSelfInteractive(!e),
      this.GetButton(3).SetSelfInteractive(!e),
      this.ChildPopView?.SetCloseBtnInteractive(!e);
  }
}
exports.RoleGenderChangeView = RoleGenderChangeView;
//# sourceMappingURL=RoleGenderChangeView.js.map
