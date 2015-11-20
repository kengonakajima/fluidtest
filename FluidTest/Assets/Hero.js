#pragma strict

// これは主人公のコード (HeroScript.js)

var pitch : float; // 主人公の向き
var yaw : float; // 主人公の見上げる向き

var dy : float;
var tmpcounter0 = 1;

var cubeprefab : Transform;

var locationAvailable = false;

function prt(x) {
    MenuWindow.setMessage(x);
}

function Start () { // 最初に1回だけ呼ばれる
	pitch = 0;
	dy = 0;
/*
    if( !Input.location.isEnabledByUser ) {
//        Debug.Log( "no location service");
        MenuWindow.setMessage( "no location service");
    } else {
        MenuWindow.setMessage( "GPS service available");
        Input.location.Start();
        locationAvailable = true;
    }
    */

    // First, check if user has location service enabled
    if (!Input.location.isEnabledByUser) {
        prt("no locationservice");
        return;
    }
    // Start service before querying location
    Input.location.Start ();
    // Wait until service initializes
    var maxWait : int = 20;
    while (Input.location.status
           == LocationServiceStatus.Initializing && maxWait > 0) {
        yield WaitForSeconds (1);
        maxWait--;
    }
    // Service didn't initialize in 20 seconds
    if (maxWait < 1) {
        prt ("Timed out");
        return;
    }
    // Connection has failed
    if (Input.location.status == LocationServiceStatus.Failed) {
        prt ("Unable to determine device location");
        return;
    }
    // Access granted and location value could be retrieved
    else {
        prt ("Location: " + Input.location.lastData.latitude + " " +
               Input.location.lastData.longitude + " " +
               Input.location.lastData.altitude + " " +
               Input.location.lastData.horizontalAccuracy + " " +
               Input.location.lastData.timestamp);
    }
    // Stop service if there is no need to query location updates continuously
    Input.location.Stop ();
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
            dy = 1;
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


    // 物体生成
    var f = Input.GetButton( "Fire1" );
    if(f) {
        for(var t = 0;t<16;t++){
            for(var s = 0; s<16; s++){
                var r = 10;
                var cu = Instantiate( cubeprefab,
                                      Vector3( t*r , tmpcounter0 *r, s*r ),
                                      Quaternion.identity );
                //            cubes.Push(cu);
                // (4x4x4) x 256 = 4096 cubes 
                // (6x6x6) x 256 = 27648 cubes
            }
        }        
        tmpcounter0 ++;
    }

    // GPS test
    if( locationAvailable ) {
        var msg = "location status" + Input.location.status;
        MenuWindow.setMessage( msg );
    }
    
}



