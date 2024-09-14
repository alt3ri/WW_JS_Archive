"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDecodeView = void 0);
const UE = require("ue"),
  Json_1 = require("../../../../Core/Common/Json"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  SignalDecodeGamePlayById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeGamePlayById"),
  SignalDecodeTabColorById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeTabColorById"),
  SignalDecodeWaveformById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeWaveformById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  SignalDecodeTabItem_1 = require("./SignalDecodeTabItem"),
  ANIM_TIME = 1500,
  SLOT_OUTLINE_WIDTH = 3,
  SLOT_WIDTH = 60,
  SLOT_INTERVAL = 19,
  SLOT_PADDING_LEFT = 10,
  UNIT_HEIGHT = 100;
class SignalDecodeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.qEo = ""),
      (this.GEo = void 0),
      (this.NEo = void 0),
      (this.OEo = void 0),
      (this.kEo = void 0),
      (this.FEo = void 0),
      (this.VEo = 0),
      (this.HEo = 0),
      (this.jEo = 0),
      (this.WEo = -0),
      (this.KEo = -0),
      (this.ict = 0),
      (this.QEo = 0),
      (this.XEo = !1),
      (this.L6e = 0),
      (this.$Eo = 0),
      (this.YEo = 0),
      (this.JEo = () => {
        if (
          this.OEo &&
          this.OEo.length &&
          !(TimeUtil_1.TimeUtil.GetServerTime() - this.L6e <= this.$Eo)
        ) {
          this.L6e = TimeUtil_1.TimeUtil.GetServerTime();
          var i = this.OEo[0].GetAnchorOffsetX(),
            t = this.FEo.get(0),
            t = this.zEo(t),
            t = Math.abs(t - i);
          if (!(t > this.YEo)) {
            for (let i = 0; i < this.OEo.length; i++) {
              var e = this.OEo[i];
              if (!e.IsUIActiveInHierarchy()) return;
              var s = this.FEo.get(i),
                s = this.zEo(s);
              e.SetAnchorOffsetX(s);
            }
            this.GEo[this.jEo - 1].SetComplete(),
              TimerSystem_1.TimerSystem.Delay(() => {
                for (const t of this.OEo) this.ZEo(t);
                (this.OEo.length = 0), this.FEo.clear();
                var i = ++this.jEo;
                i <= 4 ? this.eSo(i) : this.Gti(-1);
              }, 1e3 * this.$Eo);
          }
        }
      }),
      (this.AMo = () => {
        UiManager_1.UiManager.CloseView("SignalDecodeView");
      }),
      (this.tSo = () => {
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(
          Protocol_1.Aki.Protocol.h3s.Proto_SignalBreak,
          this.qEo,
        ),
          UiManager_1.UiManager.CloseView("SignalDecodeView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UITexture],
      [11, UE.UITexture],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.JEo],
        [4, this.AMo],
      ]);
  }
  OnStart() {
    this.GetItem(5).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(7).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1);
    var i = this.GetTexture(11),
      i = ((this.VEo = i.GetWidth()), this.GetSprite(2));
    (this.NEo = []),
      this.NEo.push(i),
      (this.OEo = []),
      (this.kEo = []),
      (this.FEo = new Map()),
      (this.jEo = 1),
      (this.ict = 0),
      (this.WEo = 0),
      (this.KEo = 0),
      (this.L6e = 0),
      (this.$Eo =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "SignalDecodeFailStopTime",
        ) ?? 0.8),
      (this.YEo =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "SignalDecodeSuccessRange",
        ) ?? 50),
      (this.qEo = this.OpenParam),
      this.qEo &&
        ((i =
          SignalDecodeGamePlayById_1.configSignalDecodeGamePlayById.GetConfig(
            this.qEo,
          ))
          ? this.sso(i)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 19, "找不到信号破译配置", [
              "id",
              this.qEo,
            ]));
  }
  OnAfterShow() {
    this.Gti(++this.ict);
  }
  OnTick(i) {
    (this.KEo += i), this.iSo(), this.oSo(i), (this.WEo = this.KEo);
  }
  iSo() {
    this.KEo > ANIM_TIME &&
      this.WEo <= ANIM_TIME &&
      (this.Gti(++this.ict), (this.KEo = 0), (this.WEo = 0));
  }
  oSo(i) {
    if (
      ((this.XEo = TimeUtil_1.TimeUtil.GetServerTime() - this.L6e > this.$Eo),
      this.OEo && 0 !== this.OEo.length && this.XEo)
    )
      for (const e of this.OEo) {
        var t = e.GetAnchorOffsetX(),
          t =
            (e.SetAnchorOffsetX(t + (i / 1e3) * 250 * this.HEo),
            e.GetAnchorOffsetX());
        t >= this.VEo &&
          (e.SetAnchorOffsetX(t - this.VEo - 85), e.SetUIActive(!0));
      }
  }
  Gti(i) {
    switch (i) {
      case 1:
        this.GetItem(5).SetUIActive(!0);
        break;
      case 2:
        this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!0);
        break;
      case 3:
        this.GetItem(6).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!0),
          this.eSo(this.jEo);
        break;
      case -1:
        this.GetItem(7).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!0),
          TimerSystem_1.TimerSystem.Delay(this.tSo, 1e3);
    }
  }
  sso(i) {
    var t, e, s;
    i.SignalData1
      ? ((this.GEo = []),
        (s = this.GetItem(1)),
        (t = this.GetItem(0)),
        (e = new SignalDecodeTabItem_1.SignalDecodeTabItem(
          1,
          i.SignalData1,
          s,
        )),
        this.GEo.push(e),
        s.SetUIActive(!0),
        i.SignalData2 &&
          ((e = LguiUtil_1.LguiUtil.CopyItem(s, t)),
          (e = new SignalDecodeTabItem_1.SignalDecodeTabItem(
            2,
            i.SignalData2,
            e,
          )),
          this.GEo.push(e)),
        i.SignalData3 &&
          ((e = LguiUtil_1.LguiUtil.CopyItem(s, t)),
          (e = new SignalDecodeTabItem_1.SignalDecodeTabItem(
            3,
            i.SignalData3,
            e,
          )),
          this.GEo.push(e)),
        i.SignalData4 &&
          ((e = LguiUtil_1.LguiUtil.CopyItem(s, t)),
          (s = new SignalDecodeTabItem_1.SignalDecodeTabItem(
            4,
            i.SignalData4,
            e,
          )),
          this.GEo.push(s)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Quest", 19, "找不到信号1", ["id", this.qEo]);
  }
  eSo(i) {
    var t, e, s;
    this.GEo &&
      0 !== this.GEo.length &&
      ((t = this.GEo[i - 1].WaveformId),
      (e =
        SignalDecodeWaveformById_1.configSignalDecodeWaveformById.GetConfig(t))
        ? (s =
            SignalDecodeTabColorById_1.configSignalDecodeTabColorById.GetConfig(
              i,
            ))
          ? (this.rSo(s), this.nSo(s), this.sSo(e), this.aSo(e, s), this.hSo())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 19, "找不到信号破译页签的颜色配置", [
              "tabIndex",
              i,
            ])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 19, "找不到信号谱面配置", ["id", t]));
  }
  rSo(i) {
    for (const t of this.GEo) t.UpdateColor(i), t.OnProcess(this.jEo);
  }
  nSo(i) {
    this.GetTexture(9).SetColor(UE.Color.FromHex(i.VacancyColor)),
      this.GetTexture(10).SetColor(UE.Color.FromHex(i.VacancyColor)),
      this.GetTexture(11).SetColor(UE.Color.FromHex(i.DefaultColor));
  }
  sSo(i) {
    const s = this.GetSprite(2),
      h = s.GetParentAsUIItem();
    (this.HEo = i.SpeedRate),
      Json_1.Json.Parse(i.SignalFragment).forEach((i, t) => {
        let e = void 0;
        t < this.NEo.length
          ? (e = this.NEo[t])
          : ((e = this.lSo(s, h)), this.NEo.push(e));
        t = this.zEo(t);
        e.SetAnchorOffsetX(t), e.SetHeight(UNIT_HEIGHT * i);
      });
  }
  aSo(i, t) {
    var e = this.GetItem(12),
      s = Json_1.Json.Parse(i.MissingParts);
    this.QEo = i.Offset;
    for (let i = s.length - 1; 0 <= i; --i) {
      var h,
        r = 1 === s[i],
        o = this.NEo[i];
      r
        ? (o.SetUIActive(!0),
          o.SetColor(UE.Color.FromHex(t.VacancyColor)),
          (h =
            ((r = this._So(o, e)).SetColor(UE.Color.FromHex(t.HighlightColor)),
            this.zEo(i))),
          r.SetAnchorOffsetX(h),
          this.OEo.push(r),
          this.FEo.set(this.OEo.length - 1, i),
          this.QEo > this.OEo.length && r.SetUIActive(!1))
        : o.SetUIActive(!1);
    }
  }
  hSo() {
    var i = this.FEo.get(this.QEo),
      t = this.zEo(i + 1);
    for (const s of this.OEo) {
      var e = s.GetAnchorOffsetX();
      s.SetAnchorOffsetX(e - t);
    }
  }
  zEo(i) {
    return (
      i * (2 * SLOT_OUTLINE_WIDTH + SLOT_WIDTH + SLOT_INTERVAL) +
      SLOT_PADDING_LEFT +
      SLOT_OUTLINE_WIDTH
    );
  }
  _So(i, t) {
    return 0 === this.kEo.length
      ? this.lSo(i, t)
      : ((t = this.kEo.pop()).SetHeight(i.GetHeight()), t);
  }
  lSo(i, t) {
    return LguiUtil_1.LguiUtil.DuplicateActor(
      i.GetOwner(),
      t,
    ).GetComponentByClass(UE.UISprite.StaticClass());
  }
  ZEo(i) {
    i.SetAnchorOffsetX(-1e4), this.kEo.push(i);
  }
}
exports.SignalDecodeView = SignalDecodeView;
//# sourceMappingURL=SignalDecodeView.js.map
