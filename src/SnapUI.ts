class SnapUI extends eui.Component implements eui.UIComponent {
	public rectBG: eui.Rect;
	public imgLogo: eui.Image;
	public gpSnap: eui.Group;
	public lblSnapResult: eui.Label;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}

	private init() {
		this.gpSnap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gpSnapHandler, this);
	}

	private gpSnapHandler() {
		var rt: egret.RenderTexture = new egret.RenderTexture;
		try {
			rt.drawToTexture(this.imgLogo);
			sendSnapData(rt.toDataURL('image/png'));
			this.lblSnapResult.text = '截图结果：成功！';
		}
		catch (ex) {
			this.lblSnapResult.text = '截图结果：失败！' + ex.message;
		}
	}

}