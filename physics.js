// physcics methods

class PhysicsScene extends Phaser.Scene{
    init(data){
        this.speed = data.speed;
        this.strokes = data.strokes;
    }

    constructor(key, name){
        super(key);
    }

    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
    }

    gotoScene(key){
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () =>{
            this.scene.start(key, {
                speed: this.speed,
                strokes: this.strokes
            });
        });
    }
    
    setStroke(x){
        this.stroke = x;
    }

    addStroke(){
        this.stroke += 1;
    }

    checkStroke(){
        return this.stroke;
    }
}