"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleLinkUnlockView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleLinkUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.NOe = 0),
      (this.OnClickDetail = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        );
        e &&
          (e =
            ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
              e.Data.ap1.Ih1.Ld1,
            )) &&
          RoleController_1.RoleController.OpenRoleMainView(1, 0, [
            e.TrialRoleId,
          ]);
      }),
      (this.OnClickConfirm = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        );
        e &&
          (!(e = e.Data.ap1.jo1) || this.NOe >= e.length - 1
            ? ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(
                this.OpenParam,
              )
            : (this.NOe++, this.RefreshLinkInfo()));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.OnClickConfirm],
        [6, this.OnClickDetail],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseBtnActive(!1),
      this.RefreshLinkInfo();
  }
  RefreshLinkInfo() {
    var e,
      i,
      t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    !t ||
      !(t = t.Data.ap1.jo1) ||
      this.NOe >= t.length ||
      ((t = t[this.NOe]),
      (i =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t)) &&
        (this.SetSpriteByPath(i.Icon, this.GetSprite(3), !1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name),
        (t =
          ModelManager_1.ModelManager.RogueBattleModel?.GetRoleBondDataById(
            t,
          ))) &&
        ((e = i.LinkEffectDesc.get(t.F6n)),
        (i = i.LinkEffectDescParam.get(t.F6n)),
        e) &&
        i &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          e,
          ...i.split("#"),
        ));
  }
}
exports.RogueBattleLinkUnlockView = RogueBattleLinkUnlockView;
//# sourceMappingURL=RogueBattleLinkUnlockView.js.map
