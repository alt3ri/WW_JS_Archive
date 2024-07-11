"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleReplaceView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiActorPool_1 = require("../../../Ui/UiActorPool");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const RoguelikeController_1 = require("../RoguelikeController");
const ElementPanel_1 = require("./ElementPanel");
const RogueSelectBaseView_1 = require("./RogueSelectBaseView");
const RoleSelectItem_1 = require("./RoleSelectItem");
const TopPanel_1 = require("./TopPanel");
class RoleReplaceView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments),
      (this.RoguelikeChooseData = void 0),
      (this.TopPanel = void 0),
      (this.ElementPanel = void 0),
      (this.ButtonItem = void 0),
      (this.RoleSelectItemLayout = void 0),
      (this.m6t = () => {
        this.RoguelikeChooseData.RogueGainEntryList.length <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Roguelike", 9, "当前可选角色为0")
          : ((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
              this.RoguelikeChooseData.RogueGainEntryList[0]),
            RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
              3,
            ));
      }),
      (this.CreateRoleSelectItem = () => {
        return new RoleSelectItem_1.RoleSelectItem();
      }),
      (this.OnDescModelChange = () => {
        this.bl();
      }),
      (this.RoguelikeChooseDataResult = (e, i, t, o) => {
        t &&
          o === this.RoguelikeChooseData?.Index &&
          UiManager_1.UiManager.CloseAndOpenView(
            this.Info.Name,
            "RogueRoleSelectResultView",
            new RogueSelectResult_1.RogueSelectResult(e, i, void 0),
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
    ];
  }
  async OnCreateAsync() {
    const e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      RoguelikeDefine_1.ROLE_SELECT_ITEM,
    );
    this.UiPoolActorPrivate = await UiActorPool_1.UiActorPool.GetAsync(e);
  }
  async OnBeforeStartAsync() {
    (this.ElementPanel = new ElementPanel_1.ElementPanel()),
      await this.ElementPanel.CreateThenShowByActorAsync(
        this.GetItem(3).GetOwner(),
      ),
      (this.TopPanel = new TopPanel_1.TopPanel()),
      this.AddChild(this.TopPanel),
      await this.TopPanel.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      );
  }
  OnStart() {
    this.UiPoolActorPrivate.UiItem.SetUIParent(
      this.GetHorizontalLayout(1).GetRootComponent(),
    ),
      (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
        void 0),
      (this.RoguelikeChooseData = this.OpenParam),
      (this.TopPanel.CloseCallback = this.CloseMySelf),
      this.ElementPanel.SetActive(!1),
      (this.ButtonItem = new ButtonItem_1.ButtonItem(
        this.GetButton(2).GetRootComponent(),
      )),
      this.ButtonItem.SetFunction(this.m6t),
      (this.RoleSelectItemLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.CreateRoleSelectItem,
      ));
  }
  OnBeforeDestroy() {
    this.TopPanel.Destroy(),
      this.ElementPanel.Destroy(),
      this.RecycleUiPoolActor();
  }
  OnBeforeShow() {
    this.bl();
  }
  bl() {
    this.RefreshPhantomSelectItemList(),
      this.RefreshTopPanel(),
      this.RefreshElementPanel(),
      this.RefreshBtnText(),
      this.Pao();
  }
  RefreshTopPanel() {
    this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_3_TEXT);
    var e = this.Eao();
    const i =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(
        e[0].ConfigId,
      );
    var e =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(
        e[1].ConfigId,
      );
    this.TopPanel.RefreshSelectTipsText(
      RoguelikeDefine_1.ROGUELIKEVIEW_4_TEXT,
      !1,
      new LguiUtil_1.TableTextArgNew(i?.RoleName),
      new LguiUtil_1.TableTextArgNew(e?.RoleName),
    );
  }
  RefreshElementPanel() {
    this.ElementPanel.Refresh();
  }
  RefreshPhantomSelectItemList() {
    const e = this.Eao();
    this.RoleSelectItemLayout.RefreshByData(e);
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_14_TEXT);
  }
  Eao() {
    const e = new Array();
    const i = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
    return (
      i && e.push(i),
      this.RoguelikeChooseData.RogueGainEntryList.length > 0 &&
        e.push(this.RoguelikeChooseData.RogueGainEntryList[0]),
      e
    );
  }
  Pao() {
    this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_23_TEXT),
      this.GetText(5).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_24_TEXT);
  }
}
exports.RoleReplaceView = RoleReplaceView;
// # sourceMappingURL=RoleReplaceView.js.map
