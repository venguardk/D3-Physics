// level implementation

class Test extends PhysicsScene{
    constructor(){
        super('test');
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('ball', 'Ball Sprite.png');
        this.load.image('grass','Ground Tile.png');
        this.load.image('flag', 'Flag Sprite.png');
    }

    create(){
        const graphics = this.add.graphics({lineStyle: {width: 10, color: 0xffb600, alpha: 0.5}});
        const line = new Phaser.Geom.Line();
        // const putt = this.add.image(100, 100, 'ball');
        // const tee = this.add.image(100, 200, 'grass');

        // golf ball implementation
        const golf = this.physics.add.image(100, 120, 'ball');
        golf.setDepth(1);
        golf.setScale(0.5);
        golf.setBounce(0.5, 0.5);
        golf.setDrag(0.5, 0.5);
        golf.setCircle(50);
        golf.setCollideWorldBounds(true);
        golf.setDamping(true);
        
        //implementing putting
        this.setStroke(0);
        let scoreBoard = this.add.text(10, 10, "Stroke: 0");

        let angle = 0;

        this.input.on('pointermove', (pointer) =>{
            angle = Phaser.Math.Angle.BetweenPoints(golf, pointer);
            // putt.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, golf.x, golf.y, angle, 128);
            graphics.clear().strokeLineShape(line);
        });

        this.input.on('pointerup', (pointer) =>{
            // golf.enableBody(true, tee.x, tee.y - 100, true, true);
            let distance = Phaser.Math.Distance.BetweenPoints(golf, pointer);

            this.add.text(10, 30, `distance: ${distance}`);
            if(distance < 400){
                distance = 400;
            }
            else if(distance > 1000){
                distance = 1000;
            }
            if (golf.body.velocityx == undefined && golf.body.velocityy == undefined){
                this.physics.velocityFromRotation(angle, distance * 2, golf.body.velocity);
                this.addStroke();
                scoreBoard.setText("Strokes: " + this.stroke);
            }
            
        });

        //platform implementation
        const platform = this.add.tileSprite(400, 200, 100 * 15, 100, 'grass');
        this.physics.add.existing(platform, true);
        const ground = this.add.tileSprite(1500, 1020, 100 * 5, 100, 'grass');
        this.physics.add.existing(ground, true);

        //implementing hole
        const goal = this.add.image(1800, 970, 'flag');
        const zone = this.add.zone(goal.x, goal.y + 50, 100, 100);
        this.physics.add.existing(zone, true);
        this.physics.add.overlap(zone, golf, (_zone, golf) =>{
            this.time.delayedCall(1000, () =>{
                this.gotoScene('score');
            })
        })

        //colliders
        this.physics.add.collider(golf, platform);
        this.physics.add.collider(golf, ground);
        

        this.add.text(10, 20, `ball speed: ${golf.body.speed}`);
    }
}

class Score extends PhysicsScene{
    constructor(){
        super("score");
    }

    create(){
        this.add.text(10,10, 'Score');
        this.add.text(10,20, `Total Strokes: ${this.checkStroke()}`);
        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h * 0.25).setOrigin(0, 0).setFillStyle(0xccd1d1);
        this.add.text(this.w *0.75 + this.s, this.s)
            .setText("Total Strokes: " + this.strokes);
    }
}

const game = new Phaser.Game({
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 100}
        }
    },
    scene:[Test, Score],
    title: "Physics"
});