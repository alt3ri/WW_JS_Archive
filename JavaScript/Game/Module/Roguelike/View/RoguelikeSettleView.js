"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSettleRecordItem = exports.RoguelikeSettleView = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
class RoguelikeSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RecordItemList = []),
      (this.SkillPointRewardItem = void 0),
      (this.OutSideRewardItem = void 0),
      (this.Sho = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
          () => {
            UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
          },
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UISprite],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIButtonComponent],
      [18, UE.UIItem],
      [19, UE.UITexture],
      [20, UE.UIText],
      [21, UE.UIText],
    ]),
      (this.BtnBindInfo = [[17, this.Sho]]);
  }
  async OnBeforeStartAsync() {
    (this.SkillPointRewardItem = new RoguelikeSettleCurrencyItem()),
      await this.SkillPointRewardItem.CreateThenShowByActorAsync(
        this.GetItem(18).GetOwner(),
      ),
      (this.OutSideRewardItem = new RoguelikeSettleCurrencyItem()),
      await this.OutSideRewardItem.CreateThenShowByActorAsync(
        this.GetItem(16).GetOwner(),
      );
  }
  OnStart() {
    this.pie();
  }
  OnBeforeDestroy() {
    this.RecordItemList.forEach((e) => {
      e.Destroy();
    }),
      (this.RecordItemList = []);
  }
  pie() {
    const e = this.OpenParam;
    var t =
      (this.GetItem(6).SetUIActive(e.IAs),
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(
        e.vws.R5n,
      ));
    var i = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(t.RoleId);
    var s = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
      e.pws.R5n,
    );
    var o = TimeUtil_1.TimeUtil.GetTimeString(e.kws);
    var o =
      (this.GetText(21).SetText(o),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name),
      ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.RoleId));
    var i =
      (o && this.SetTextureByPath(o.FormationRoleCard, this.GetTexture(1)),
      s
        ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), s.PokemonName),
          this.SetTextureByPath(s.PokemonSettleIcon, this.GetTexture(3)))
        : (this.GetText(4).SetUIActive(!1), this.GetTexture(3).SetUIActive(!1)),
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e.vFn));
    var t =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.MapName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(8),
        i.difficultydescLength() > 0 ? i.DifficultyDesc[0] : "",
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(10),
        "RoguelikeSettlePlayerName",
        ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
      ),
      TimeUtil_1.TimeUtil.DateFormatString(e.Bws));
    var o = (this.GetText(9).SetText(t), Math.floor((e.Pws / e.Uws) * 100));
    var s =
      (this.GetSprite(14).SetFillAmount(o / 100),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(13),
        "RoguelikeSettleProgress",
        o,
      ),
      ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId());
    var i = this.GetItem(0);
    var t = this.GetSprite(5);
    var r = this.GetSprite(14);
    let n = this.GetTexture(19);
    var i =
      (o >= s.RoguelikeSettleS
        ? (i.SetUIActive(!0),
          this.SetSpriteByPath(
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "RoguelikeSettle_S_Sprite",
            ),
            t,
            !1,
          ),
          this.SetSpriteByPath(
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "RoguelikeSettle_S_Bar_Sprite",
            ),
            r,
            !1,
          ),
          this.SetTextureByPath(s.RoguelikeSettleBgS, n))
        : (o >= s.RoguelikeSettleA
            ? (i.SetUIActive(!1),
              this.SetSpriteByPath(
                CommonParamById_1.configCommonParamById.GetStringConfig(
                  "RoguelikeSettle_A_Sprite",
                ),
                t,
                !1,
              ),
              this.SetSpriteByPath(
                CommonParamById_1.configCommonParamById.GetStringConfig(
                  "RoguelikeSettle_A_Bar_Sprite",
                ),
                r,
                !1,
              ))
            : o >= s.RoguelikeSettleB
              ? (i.SetUIActive(!1),
                this.SetSpriteByPath(
                  CommonParamById_1.configCommonParamById.GetStringConfig(
                    "RoguelikeSettle_B_Sprite",
                  ),
                  t,
                  !1,
                ),
                this.SetSpriteByPath(
                  CommonParamById_1.configCommonParamById.GetStringConfig(
                    "RoguelikeSettle_B_Bar_Sprite",
                  ),
                  r,
                  !1,
                ))
              : (i.SetUIActive(!1),
                this.SetSpriteByPath(
                  CommonParamById_1.configCommonParamById.GetStringConfig(
                    "RoguelikeSettle_C_Sprite",
                  ),
                  t,
                  !1,
                ),
                this.SetSpriteByPath(
                  CommonParamById_1.configCommonParamById.GetStringConfig(
                    "RoguelikeSettle_C_Bar_Sprite",
                  ),
                  r,
                  !1,
                )),
          this.SetTextureByPath(s.RoguelikeSettleBgNormal, n)),
      o >= s.RoguelikeSettleS
        ? AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_s")
        : o >= s.RoguelikeSettleA
          ? AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_a")
          : o >= s.RoguelikeSettleB
            ? AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_b")
            : AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_c"),
      LguiUtil_1.LguiUtil.CopyItem(this.GetItem(12), this.GetItem(11)));
    var t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(12), this.GetItem(11));
    var r = Object.keys(e.wPs);
    let a = 0;
    let l = 0;
    let g = 0;
    const _ =
      ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
    for (const u of r)
      Number(u) === _.SkillPoint
        ? (a = e.wPs[u])
        : Number(u) === _.TokenItem
          ? (l = e.wPs[u])
          : Number(u) === _.InsideCurrency && (g = e.wPs[u]);
    (n = new RoguelikeSettleRecordItem(0, e.qws)),
      n.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()),
      (o = new RoguelikeSettleRecordItem(1, e.Gws)),
      o.CreateThenShowByActorAsync(i.GetOwner()),
      (s = new RoguelikeSettleRecordItem(2, g));
    s.CreateThenShowByActorAsync(t.GetOwner());
    let h = !(this.RecordItemList = [n, o, s]);
    for (const U of ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntries())
      U.Insts.includes(e.vFn) && (h = !0);
    this.SkillPointRewardItem.Refresh(_.SkillPoint, a, e.Nws, h),
      this.OutSideRewardItem.Refresh(_.TokenItem, l, e.Nws, h);
  }
}
exports.RoguelikeSettleView = RoguelikeSettleView;
class RoguelikeSettleCurrencyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.CurrencyId = 0), (this.Count = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [5, UE.UIText],
      [4, UE.UITexture],
    ];
  }
  Refresh(e, t, i, s = !1) {
    (this.CurrencyId = e), (this.Count = t);
    var e =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
        this.CurrencyId,
      );
    this.SetTextureByPath(e.Icon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
      this.GetText(2).SetText(this.Count.toString()),
      this.GetText(5).SetText(`x${i / 100}%`),
      i >= RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE
        ? ((e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
            "RoguelikeSettleRateRedBg",
          )),
          this.SetTextureByPath(e, this.GetTexture(4)))
        : i === RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE
          ? ((e =
              ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                "RoguelikeSettleRateGrayBg",
              )),
            this.SetTextureByPath(e, this.GetTexture(4)))
          : ((i =
              ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                "RoguelikeSettleRateGreenBg",
              )),
            this.SetTextureByPath(i, this.GetTexture(4))),
      this.GetItem(3).SetUIActive(s),
      this.RootItem?.SetUIActive(t > 0);
  }
}
class RoguelikeSettleRecordItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.ItemType = void 0),
      (this.Count = 0),
      (this.ItemType = e),
      (this.Count = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    switch ((this.GetText(1).SetText(this.Count.toString()), this.ItemType)) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "RoguelikeSettleKill",
        );
        break;
      case 1:
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "RoguelikeSettleToken",
        );
        break;
      case 2:
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "RoguelikeSettleMoney",
        );
    }
  }
}
exports.RoguelikeSettleRecordItem = RoguelikeSettleRecordItem;
// # sourceMappingURL=RoguelikeSettleView.js.map
