"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailScrollItemNew = void 0);
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DAY_GAP = 7;
class MailScrollItemNew extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.R4e = void 0),
      (this.Uyi = void 0),
      (this.Ayi = void 0),
      (this.SelectTrigger = !1),
      (this.IsInit = !1),
      (this.Xy = -1),
      (this.Pe = void 0),
      (this.OnExtendToggleStateChanged = (i) => {
        i === 1 && this?.Uyi(this.Xy, this.Pe);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  Update(i, t) {
    (this.Xy = t),
      (this.Pe = i),
      this.SelectTrigger
        ? (this.OnSelected(!0), (this.SelectTrigger = !1))
        : t === this.Ayi?.()
          ? this.OnSelected(!1)
          : this.OnDeselected(!1),
      this.GetText(1).SetText(i.Title),
      this.GetText(3).SetText(i.Sender);
    let e;
    var t = TimeUtil_1.TimeUtil.CalculateDayGapBetweenNow(
      i.Time,
      i.Time > TimeUtil_1.TimeUtil.GetServerTime(),
    );
    t > DAY_GAP
      ? ((e = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(i.Time)),
        this.GetText(4).SetText(`${e.Year}/${e.Month}/` + e.Day))
      : t >= 1
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "Text_FriendOfflineSomeDay_Text",
            t,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "Text_Today_Text",
          ),
      this.GetItem(5).SetUIActive(!i.GetWasScanned()),
      this.GetItem(2).SetUIActive(i.GetMailLevel() === 2),
      i.GetWasScanned() || i.GetAttachmentStatus() !== 2
        ? i.GetWasScanned() && i.GetAttachmentStatus() === 2
          ? ((e =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_IconRewardA",
              )),
            this.SetSpriteByPath(e, this.GetSprite(0), !1),
            this.GetItem(6).SetAlpha(1))
          : i.GetWasScanned() && i.GetAttachmentStatus() === 1
            ? ((t =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  "SP_IconRewardB",
                )),
              this.SetSpriteByPath(t, this.GetSprite(0), !1),
              this.GetItem(6).SetAlpha(0.4))
            : i.GetWasScanned() || i.GetAttachmentStatus() !== 0
              ? i.GetWasScanned() &&
                i.GetAttachmentStatus() === 0 &&
                ((e =
                  ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                    "SP_IconMailB",
                  )),
                this.SetSpriteByPath(e, this.GetSprite(0), !1),
                this.GetItem(6).SetAlpha(0.4))
              : ((t =
                  ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                    "SP_IconMailA",
                  )),
                this.SetSpriteByPath(t, this.GetSprite(0), !1),
                this.GetItem(6).SetAlpha(1))
        : ((i =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_IconRewardA",
            )),
          this.SetSpriteByPath(i, this.GetSprite(0), !1),
          this.GetItem(6).SetAlpha(1));
  }
  BindSelectCall(i) {
    this.Uyi = i;
  }
  BindGetSelectedIndexFunction(i) {
    this.Ayi = i;
  }
  OnSelected(i) {
    this.RootActor.GetComponentByClass(
      UE.UIExtendToggle.StaticClass(),
    ).SetToggleState(1, i);
  }
  OnDeselected(i) {
    (this.SelectTrigger = !1),
      this.RootActor.GetComponentByClass(
        UE.UIExtendToggle.StaticClass(),
      ).SetToggleState(0, i);
  }
  GetUsingItem(i) {
    return this.GetRootItem().GetOwner();
  }
  async Init(i) {
    await super.CreateByActorAsync(i.GetOwner(), void 0, !0),
      (this.R4e = this.RootActor.GetComponentByClass(
        UE.UIExtendToggle.StaticClass(),
      )),
      this.R4e.OnStateChange.Add(this.OnExtendToggleStateChanged),
      (this.IsInit = !0);
  }
  ClearItem() {
    this.R4e.OnStateChange.Clear(), (this.Uyi = void 0), this.Destroy();
  }
}
exports.MailScrollItemNew = MailScrollItemNew;
// # sourceMappingURL=MailScrollItemNew.js.map
