"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBuffSelectView = exports.RoleBuffSelectItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RogueSelectResult_1 = require("../Define/RogueSelectResult"),
  RoguelikeController_1 = require("../RoguelikeController"),
  RogueSelectBaseView_1 = require("./RogueSelectBaseView"),
  TopPanel_1 = require("./TopPanel"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net");
class RoleBuffSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.RogueGainEntry = void 0),
      (this.vho = void 0),
      (this.Mho = (e) => {
        this.vho?.();
      });
  }
  Refresh(e, t, i) {
    this.Update(e), this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
  }
  Update(e) {
    (this.RogueGainEntry = e), this.PKt();
  }
  SetToggleStateChangeCallback(e) {
    this.vho = e;
  }
  IsSelect() {
    return 1 === this.GetExtendToggle(0).GetToggleState();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Mho]]);
  }
  PKt() {
    var e =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterBuffConfig(
        this.RogueGainEntry.ConfigId,
      );
    e &&
      (0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
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
      (this.ulo = void 0),
      (this.clo = void 0),
      (this.ButtonItem = void 0),
      (this.RoleBuffSelectLayout = void 0),
      (this.m8t = () => {
        var e;
        this.ulo.RogueGainEntryList.length <= 0
          ? (((e = new Protocol_1.Aki.Protocol.c_s()).RHn =
              this.ulo?.Index ?? 0),
            (e.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
            Net_1.Net.Call(16693, e, () => {
              UiManager_1.UiManager.CloseView(
                this.Info.Name,
                this.ulo?.CallBack,
              );
            }))
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
        var e;
        this.ulo.RogueGainEntryList?.length <= 0
          ? this.ButtonItem.SetEnableClick(!0)
          : ((e = this.GetRoleBuffSelectItem()),
            this.ButtonItem.SetEnableClick(void 0 !== e));
      }),
      (this.Tlo = () => {
        var e = new RoleBuffSelectItem();
        return e.SetToggleStateChangeCallback(this.RefreshBtnEnableClick), e;
      }),
      (this.OnDescModelChange = () => {
        this.PKt();
      }),
      (this.RoguelikeChooseDataResult = (e, t, i, s) => {
        i &&
          s === this.ulo?.Index &&
          ((i = this.GetRoleBuffSelectItem()),
          ((s = new RogueSelectResult_1.RogueSelectResult(
            e,
            t,
            i?.RogueGainEntry,
          )).CallBack = this.ulo.CallBack),
          UiManager_1.UiManager.CloseAndOpenView(
            this.Info.Name,
            "RogueRoleSelectResultView",
            s,
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
    (this.clo = new TopPanel_1.TopPanel()),
      this.AddChild(this.clo),
      await this.clo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
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
      (this.ulo = this.OpenParam),
      (this.clo.CloseCallback = this.CloseMySelf),
      (this.ButtonItem = new ButtonItem_1.ButtonItem(
        this.GetButton(4).GetRootComponent(),
      )),
      this.ButtonItem.SetFunction(this.m8t),
      (this.RoleBuffSelectLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.Tlo,
      ));
  }
  OnBeforeDestroy() {
    this.clo.Destroy();
  }
  OnBeforeShow() {
    this.PKt();
  }
  PKt() {
    this.Llo(), this.Dlo(), this.RefreshBtnText(), this.RefreshBtnEnableClick();
  }
  Llo() {
    this.clo.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_7_TEXT),
      this.clo.RefreshSelectTipsText(
        RoguelikeDefine_1.ROGUELIKEVIEW_8_TEXT,
        !0,
      );
  }
  Dlo() {
    this.RoleBuffSelectLayout.RefreshByData(this.ulo.RogueGainEntryList ?? []);
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_15_TEXT);
  }
}
exports.RoleBuffSelectView = RoleBuffSelectView;
//# sourceMappingURL=RoleBuffSelectView.js.map
