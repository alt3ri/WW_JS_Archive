"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBuffSelectView = exports.RoleBuffSelectItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const RoguelikeController_1 = require("../RoguelikeController");
const RogueSelectBaseView_1 = require("./RogueSelectBaseView");
const TopPanel_1 = require("./TopPanel");
class RoleBuffSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.RogueGainEntry = void 0),
      (this.yao = void 0),
      (this.Iao = (e) => {
        this.yao?.();
      });
  }
  Refresh(e, t, i) {
    this.Update(e), this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
  }
  Update(e) {
    (this.RogueGainEntry = e), this.PWt();
  }
  SetToggleStateChangeCallback(e) {
    this.yao = e;
  }
  IsSelect() {
    return this.GetExtendToggle(0).GetToggleState() === 1;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Iao]]);
  }
  PWt() {
    const e =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterBuffConfig(
        this.RogueGainEntry.ConfigId,
      );
    e &&
      (ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0
        ? this.GetText(1).ShowTextNew(e.AffixDescSimple)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            e.AffixDesc,
            ...e.AffixDescParam,
          ),
      this.GetText(3).ShowTextNew(e.AffixTitle),
      this.SetSpriteByPath(e.AffixIcon, this.GetSprite(2), !1),
      this.GetItem(4).SetUIActive(this.RogueGainEntry.IsNew));
  }
}
exports.RoleBuffSelectItem = RoleBuffSelectItem;
class RoleBuffSelectView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments),
      (this.dho = void 0),
      (this.Cho = void 0),
      (this.ButtonItem = void 0),
      (this.RoleBuffSelectLayout = void 0),
      (this.m6t = () => {
        let e;
        this.dho.RogueGainEntryList.length <= 0
          ? RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
              3,
            )
          : (e = this.GetRoleBuffSelectItem())
            ? ((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
                e.RogueGainEntry),
              RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
                3,
              ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Roguelike", 9, "当前没有选中的角色Buff");
      }),
      (this.RefreshBtnEnableClick = () => {
        let e;
        this.dho.RogueGainEntryList?.length <= 0
          ? this.ButtonItem.SetEnableClick(!0)
          : ((e = this.GetRoleBuffSelectItem()),
            this.ButtonItem.SetEnableClick(void 0 !== e));
      }),
      (this.Rho = () => {
        const e = new RoleBuffSelectItem();
        return e.SetToggleStateChangeCallback(this.RefreshBtnEnableClick), e;
      }),
      (this.OnDescModelChange = () => {
        this.PWt();
      }),
      (this.RoguelikeChooseDataResult = (e, t, i, s) => {
        i &&
          s === this.dho?.Index &&
          ((i = this.GetRoleBuffSelectItem()),
          UiManager_1.UiManager.CloseAndOpenView(
            this.Info.Name,
            "RogueRoleSelectResultView",
            new RogueSelectResult_1.RogueSelectResult(e, t, i?.RogueGainEntry),
          ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UITexture],
    ];
  }
  GetRoleBuffSelectItem() {
    for (const e of this.RoleBuffSelectLayout.GetLayoutItemList())
      if (e.IsSelect()) return e;
  }
  async OnBeforeStartAsync() {
    (this.Cho = new TopPanel_1.TopPanel()),
      this.AddChild(this.Cho),
      await this.Cho.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    let e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
    e &&
      ((e =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(
          e.ConfigId,
        )),
      (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleId)),
      this.SetTextureByPath(e.RolePortrait, this.GetTexture(1)),
      this.SetTextureByPath(e.RolePortrait, this.GetTexture(5)));
  }
  OnStart() {
    (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = void 0),
      (this.dho = this.OpenParam),
      (this.Cho.CloseCallback = this.CloseMySelf),
      (this.ButtonItem = new ButtonItem_1.ButtonItem(
        this.GetButton(4).GetRootComponent(),
      )),
      this.ButtonItem.SetFunction(this.m6t),
      (this.RoleBuffSelectLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.Rho,
      ));
  }
  OnBeforeDestroy() {
    this.Cho.Destroy();
  }
  OnBeforeShow() {
    this.PWt();
  }
  PWt() {
    this.Uho(), this.Aho(), this.RefreshBtnText(), this.RefreshBtnEnableClick();
  }
  Uho() {
    this.Cho.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_7_TEXT),
      this.Cho.RefreshSelectTipsText(
        RoguelikeDefine_1.ROGUELIKEVIEW_8_TEXT,
        !0,
      );
  }
  Aho() {
    this.RoleBuffSelectLayout.RefreshByData(this.dho.RogueGainEntryList ?? []);
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_15_TEXT);
  }
}
exports.RoleBuffSelectView = RoleBuffSelectView;
// # sourceMappingURL=RoleBuffSelectView.js.map
