"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDecodeView = void 0);
const UE = require("ue");
const Json_1 = require("../../../../Core/Common/Json");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const SignalDecodeGamePlayById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeGamePlayById");
const SignalDecodeTabColorById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeTabColorById");
const SignalDecodeWaveformById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeWaveformById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SignalDecodeTabItem_1 = require("./SignalDecodeTabItem");
const ANIM_TIME = 1500;
const SLOT_OUTLINE_WIDTH = 3;
const SLOT_WIDTH = 60;
const SLOT_INTERVAL = 19;
const SLOT_PADDING_LEFT = 10;
const UNIT_HEIGHT = 100;
class SignalDecodeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.OMo = ""),
      (this.kMo = void 0),
      (this.FMo = void 0),
      (this.VMo = void 0),
      (this.HMo = void 0),
      (this.jMo = void 0),
      (this.WMo = 0),
      (this.KMo = 0),
      (this.QMo = 0),
      (this.XMo = -0),
      (this.$Mo = -0),
      (this.k_t = 0),
      (this.YMo = 0),
      (this.JMo = !1),
      (this.cVe = 0),
      (this.zMo = 0),
      (this.ZMo = 0),
      (this.eSo = () => {
        if (
          this.VMo &&
          this.VMo.length &&
          !(TimeUtil_1.TimeUtil.GetServerTime() - this.cVe <= this.zMo)
        ) {
          this.cVe = TimeUtil_1.TimeUtil.GetServerTime();
          const i = this.VMo[0].GetAnchorOffsetX();
          var t = this.jMo.get(0);
          var t = this.tSo(t);
          var t = Math.abs(t - i);
          if (!(t > this.ZMo)) {
            for (let i = 0; i < this.VMo.length; i++) {
              const e = this.VMo[i];
              if (!e.IsUIActiveInHierarchy()) return;
              var s = this.jMo.get(i);
              var s = this.tSo(s);
              e.SetAnchorOffsetX(s);
            }
            this.kMo[this.QMo - 1].SetComplete(),
              TimerSystem_1.TimerSystem.Delay(() => {
                for (const t of this.VMo) this.iSo(t);
                (this.VMo.length = 0), this.jMo.clear();
                const i = ++this.QMo;
                i <= 4 ? this.oSo(i) : this.Gei(-1);
              }, 1e3 * this.zMo);
          }
        }
      }),
      (this.wvo = () => {
        UiManager_1.UiManager.CloseView("SignalDecodeView");
      }),
      (this.rSo = () => {
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(
          Protocol_1.Aki.Protocol.dqs.Proto_SignalBreak,
          this.OMo,
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
        [3, this.eSo],
        [4, this.wvo],
      ]);
  }
  OnStart() {
    this.GetItem(5).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(7).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1);
    var i = this.GetTexture(11);
    var i = ((this.WMo = i.GetWidth()), this.GetSprite(2));
    (this.FMo = []),
      this.FMo.push(i),
      (this.VMo = []),
      (this.HMo = []),
      (this.jMo = new Map()),
      (this.QMo = 1),
      (this.k_t = 0),
      (this.XMo = 0),
      (this.$Mo = 0),
      (this.cVe = 0),
      (this.zMo =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "SignalDecodeFailStopTime",
        ) ?? 0.8),
      (this.ZMo =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "SignalDecodeSuccessRange",
        ) ?? 50),
      (this.OMo = this.OpenParam),
      this.OMo &&
        ((i =
          SignalDecodeGamePlayById_1.configSignalDecodeGamePlayById.GetConfig(
            this.OMo,
          ))
          ? this._no(i)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 19, "找不到信号破译配置", [
              "id",
              this.OMo,
            ]));
  }
  OnAfterShow() {
    this.Gei(++this.k_t);
  }
  OnTick(i) {
    (this.$Mo += i), this.nSo(), this.sSo(i), (this.XMo = this.$Mo);
  }
  nSo() {
    this.$Mo > ANIM_TIME &&
      this.XMo <= ANIM_TIME &&
      (this.Gei(++this.k_t), (this.$Mo = 0), (this.XMo = 0));
  }
  sSo(i) {
    if (
      ((this.JMo = TimeUtil_1.TimeUtil.GetServerTime() - this.cVe > this.zMo),
      this.VMo && this.VMo.length !== 0 && this.JMo)
    )
      for (const e of this.VMo) {
        var t = e.GetAnchorOffsetX();
        var t =
          (e.SetAnchorOffsetX(t + (i / 1e3) * 250 * this.KMo),
          e.GetAnchorOffsetX());
        t >= this.WMo &&
          (e.SetAnchorOffsetX(t - this.WMo - 85), e.SetUIActive(!0));
      }
  }
  Gei(i) {
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
          this.oSo(this.QMo);
        break;
      case -1:
        this.GetItem(7).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!0),
          TimerSystem_1.TimerSystem.Delay(this.rSo, 1e3);
    }
  }
  _no(i) {
    let t, e, s;
    i.SignalData1
      ? ((this.kMo = []),
        (s = this.GetItem(1)),
        (t = this.GetItem(0)),
        (e = new SignalDecodeTabItem_1.SignalDecodeTabItem(
          1,
          i.SignalData1,
          s,
        )),
        this.kMo.push(e),
        s.SetUIActive(!0),
        i.SignalData2 &&
          ((e = LguiUtil_1.LguiUtil.CopyItem(s, t)),
          (e = new SignalDecodeTabItem_1.SignalDecodeTabItem(
            2,
            i.SignalData2,
            e,
          )),
          this.kMo.push(e)),
        i.SignalData3 &&
          ((e = LguiUtil_1.LguiUtil.CopyItem(s, t)),
          (e = new SignalDecodeTabItem_1.SignalDecodeTabItem(
            3,
            i.SignalData3,
            e,
          )),
          this.kMo.push(e)),
        i.SignalData4 &&
          ((e = LguiUtil_1.LguiUtil.CopyItem(s, t)),
          (s = new SignalDecodeTabItem_1.SignalDecodeTabItem(
            4,
            i.SignalData4,
            e,
          )),
          this.kMo.push(s)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Quest", 19, "找不到信号1", ["id", this.OMo]);
  }
  oSo(i) {
    let t, e, s;
    this.kMo &&
      this.kMo.length !== 0 &&
      ((t = this.kMo[i - 1].WaveformId),
      (e =
        SignalDecodeWaveformById_1.configSignalDecodeWaveformById.GetConfig(t))
        ? (s =
            SignalDecodeTabColorById_1.configSignalDecodeTabColorById.GetConfig(
              i,
            ))
          ? (this.aSo(s), this.hSo(s), this.lSo(e), this._So(e, s), this.uSo())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 19, "找不到信号破译页签的颜色配置", [
              "tabIndex",
              i,
            ])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 19, "找不到信号谱面配置", ["id", t]));
  }
  aSo(i) {
    for (const t of this.kMo) t.UpdateColor(i), t.OnProcess(this.QMo);
  }
  hSo(i) {
    this.GetTexture(9).SetColor(UE.Color.FromHex(i.VacancyColor)),
      this.GetTexture(10).SetColor(UE.Color.FromHex(i.VacancyColor)),
      this.GetTexture(11).SetColor(UE.Color.FromHex(i.DefaultColor));
  }
  lSo(i) {
    const s = this.GetSprite(2);
    const h = s.GetParentAsUIItem();
    (this.KMo = i.SpeedRate),
      Json_1.Json.Parse(i.SignalFragment).forEach((i, t) => {
        let e = void 0;
        t < this.FMo.length
          ? (e = this.FMo[t])
          : ((e = this.cSo(s, h)), this.FMo.push(e));
        t = this.tSo(t);
        e.SetAnchorOffsetX(t), e.SetHeight(UNIT_HEIGHT * i);
      });
  }
  _So(i, t) {
    const e = this.GetItem(12);
    const s = Json_1.Json.Parse(i.MissingParts);
    this.YMo = i.Offset;
    for (let i = s.length - 1; i >= 0; --i) {
      var h;
      let r = s[i] === 1;
      const o = this.FMo[i];
      r
        ? (o.SetUIActive(!0),
          o.SetColor(UE.Color.FromHex(t.VacancyColor)),
          (h =
            ((r = this.mSo(o, e)).SetColor(UE.Color.FromHex(t.HighlightColor)),
            this.tSo(i))),
          r.SetAnchorOffsetX(h),
          this.VMo.push(r),
          this.jMo.set(this.VMo.length - 1, i),
          this.YMo > this.VMo.length && r.SetUIActive(!1))
        : o.SetUIActive(!1);
    }
  }
  uSo() {
    const i = this.jMo.get(this.YMo);
    const t = this.tSo(i + 1);
    for (const s of this.VMo) {
      const e = s.GetAnchorOffsetX();
      s.SetAnchorOffsetX(e - t);
    }
  }
  tSo(i) {
    return (
      i * (2 * SLOT_OUTLINE_WIDTH + SLOT_WIDTH + SLOT_INTERVAL) +
      SLOT_PADDING_LEFT +
      SLOT_OUTLINE_WIDTH
    );
  }
  mSo(i, t) {
    return this.HMo.length === 0
      ? this.cSo(i, t)
      : ((t = this.HMo.pop()).SetHeight(i.GetHeight()), t);
  }
  cSo(i, t) {
    return LguiUtil_1.LguiUtil.DuplicateActor(
      i.GetOwner(),
      t,
    ).GetComponentByClass(UE.UISprite.StaticClass());
  }
  iSo(i) {
    i.SetAnchorOffsetX(-1e4), this.HMo.push(i);
  }
}
exports.SignalDecodeView = SignalDecodeView;
// # sourceMappingURL=SignalDecodeView.js.map
