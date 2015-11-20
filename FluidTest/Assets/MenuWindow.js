#pragma strict

static var msg = "MenuWindow initialized";

function Start () {
    setMessage("TTT");
}
function OnGUI () {
    GUI.Label (Rect (10,10,100,100), msg );
}
static function setMessage( m:String ) {
    msg = m;
}

function Update () {

}