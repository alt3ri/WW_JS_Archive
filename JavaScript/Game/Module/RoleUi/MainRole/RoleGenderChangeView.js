"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGenderChangeView = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LoginDefine_1 = require("../../Login/Data/LoginDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MainRoleController_1 = require("../MainRoleController");
class RoleGenderChangeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.EPe = void 0),
      (this.elo = () => {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "GenderTransferSuccess",
        ),
          this.Plo(!1),
          this.CloseMe();
      }),
      (this.OnClickCancel = () => {
        this.CloseMe();
      }),
      (this.OnClickConfirm = () => {
        let e;
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
          185,
        )?.HasTag(1996802261)
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "CanNotTransferInFight",
              ),
            ),
            this.CloseMe())
          : (this.Plo(!0),
            (e =
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleGenderSwitchDelayTime()),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(4),
              "GenderTransfering",
            ),
            this.PlayArrowSequence(),
            TimerSystem_1.TimerSystem.Delay(() => {
              this.xlo();
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
    const e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (e) {
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.StopArrowSequence();
      const n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      var t = ModelManager_1.ModelManager.WorldLevelModel.Sex;
      const o = n.ElementId;
      var t =
        t === LoginDefine_1.ELoginSex.Boy
          ? LoginDefine_1.ELoginSex.Girl
          : LoginDefine_1.ELoginSex.Boy;
      const s = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(t);
      const a = s.length;
      let i = void 0;
      let r = void 0;
      for (let e = 0; e < a; e++) {
        const l = s[e];
        const _ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(l.Id);
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
      this.elo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRoleChangeEnd,
      this.elo,
    );
  }
  OnBeforeDestroy() {}
  PlayArrowSequence() {
    this.EPe && this.EPe.PlayLevelSequenceByName("Arrow");
  }
  StopArrowSequence() {
    this.EPe && this.EPe.StopSequenceByKey("Arrow");
  }
  xlo() {
    const e =
      ModelManager_1.ModelManager.WorldLevelModel.Sex ===
      LoginDefine_1.ELoginSex.Boy
        ? LoginDefine_1.ELoginSex.Girl
        : LoginDefine_1.ELoginSex.Boy;
    MainRoleController_1.MainRoleController.SendRoleSexChangeRequest(e),
      this.StopArrowSequence();
  }
  Plo(e) {
    this.GetButton(2).SetSelfInteractive(!e),
      this.GetButton(3).SetSelfInteractive(!e),
      this.ChildPopView?.SetCloseBtnInteractive(!e);
  }
}
exports.RoleGenderChangeView = RoleGenderChangeView;
// # sourceMappingURL=RoleGenderChangeView.js.map
