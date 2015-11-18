#pragma strict

// これは主人公のコード (HeroScript.js)

var pitch : float; // 主人公の向き
var yaw : float; // 主人公の見上げる向き

var dy : float;

function Start () { // 最初に1回だけ呼ばれる
	pitch = 0;
	dy = 0;
}

var nose : Vector3; // こういう風に関数の外に変数定義するとGUIで見える
var jumping = false; // ジャンプ中だったらtrue

function Update () { // 毎フレーム呼ばれる

	var mx = Input.GetAxis( "Mouse X" ); // マウス入力　独特なので後で解説
	var my = Input.GetAxis( "Mouse Y" );

    pitch += mx / 10; // FPSのイディオム
    yaw += my / 10;

    var h = Input.GetAxis( "Horizontal"); // キーボード入力。独特なので後で解説。
    var v = Input.GetAxis( "Vertical" );
    var dnose : Vector3;

    var dside : Vector3;

    // FPS特有の移動方向制御
    dnose.x = 1.0 * Mathf.Cos(pitch);
    dnose.y = yaw;
    dnose.z = 1.0 * Mathf.Sin(pitch);
    dside.x = 1.0 * Mathf.Cos(pitch - Mathf.PI/2);
    dside.y = 0;
    dside.z = 1.0 * Mathf.Sin(pitch - Mathf.PI/2);

    // 入力から「鼻先」の位置を決める。
    nose = transform.position + dnose ;
    transform.LookAt( nose );

    var dtr : Vector3;
    dtr = dnose * v/4 + dside * h/4;

    // ジャンプ処理
    var j = Input.GetButton( "Jump" );
    if(j){
        if( dy == 0 ){
            dy = 0.1;
            jumping = true;
        }
    }

    // 見せかけの重力
    if(jumping){
        dy -= 0.005;
    }
    if( transform.position.y < -4 ){
        transform.position.y = -4;
        dy = 0;
        jumping = false;
    }

    dtr.y = dy;

    transform.position += dtr;
}

