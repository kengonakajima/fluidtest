#pragma strict

var hero : GameObject;

function Start () { // 最初に1回だけ呼ばれる
    hero = GameObject.Find( "Cube" );
}

function Update () { // 毎フレーム呼ばれる
    var hs:Hero = hero.GetComponent(Hero);
    Debug.Log(hs);
    transform.LookAt( hs.nose );  // 主人公の鼻先をいつも見る FPSのイディオム
    transform.position = hero.transform.position ;

    print( "campos:" + hero.transform.position.x + "," +hero.transform.position.y + " camnose:" + hs.nose + " campitch:" + hs.pitch );
}