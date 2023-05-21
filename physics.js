// physcics methods

class PhysicsScene extends Phaser.Scene{
    init(data){
        this.speed = data.speed;
        this.strokes = data.strokes;
    }

    constructor(key, name){
        super(key);
    }
    
    setStroke(x){
        this.stroke = x;
    }

    addStroke(){
        this.stroke += 1;
    }
}