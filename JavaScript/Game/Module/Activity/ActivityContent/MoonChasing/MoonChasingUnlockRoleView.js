"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingUnlockRoleView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CharacterItemWithLine_1 = require("./Main/Business/Common/Character/CharacterItemWithLine"),
  CharacterListModule_1 = require("./Main/Business/Common/Character/CharacterListModule");
class MoonChasingUnlockRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CharacterListModule = void 0),
      (this.RoleId = void 0),
      (this.dke = () => new CharacterItemWithLine_1.CharacterItemWithLine()),
      (this.m2e = () => {
        (this.RoleId =
          ModelManager_1.ModelManager.MoonChasingBusinessModel.PopUnlockRoleId()),
          this.RoleId
            ? (this.UiViewSequence?.PlaySequencePurely("Switch"), this.bl())
            : this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.m2e]]);
  }
  async OnBeforeStartAsync() {
    (this.RoleId =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.PopUnlockRoleId()),
      (this.CharacterListModule = new CharacterListModule_1.CharacterListModule(
        this.dke,
      )),
      await this.CharacterListModule.CreateThenShowByActorAsync(
        this.GetItem(2).GetOwner(),
      );
  }
  async RAr(e) {
    await this.SetSpineAssetByPath(
      e.SmallSpineAtlas,
      e.SmallSpineSkeletonData,
      this.GetSpine(0),
    ),
      this.GetSpine(0).SetAnimation(0, "idle", !0);
  }
  async bl() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        this.RoleId,
      ),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name),
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          this.RoleId,
        ));
    await Promise.all([
      this.RAr(e),
      this.CharacterListModule.RefreshByDataAsync(i.GetCharacterDataList()),
    ]),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.JoinDialog);
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.bl();
  }
}
exports.MoonChasingUnlockRoleView = MoonChasingUnlockRoleView;
//# sourceMappingURL=MoonChasingUnlockRoleView.js.map
