// level implementation

class Test extends Phaser.Scene{
    constructor(){
        super('test');
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('ball', 'Ball Sprite.png');
        this.load.image('grass','Ground Tile.png');
    }

    create(){
        // implementing putting
        const graphics = this.add.graphics({lineStyle: {width: 10, color: 0xffb600, alpha: 0.5}});
        const line = new Phaser.Geom.Line();
        const putt = this.add.image(100, 100, 'ball');
        const tee = this.add.image(100, 200, 'grass');

        // golf ball implementation
        const golf = this.physics.add.image(putt.x, putt.y, 'ball');
        golf.setScale(0.5);
        golf.setBounce(0.5, 0.5);
        golf.setDrag(0.5, 0.5);
        golf.setCircle(50);
        golf.setCollideWorldBounds(true);
        golf.setDamping(true);

        
        
        golf.disableBody(true, true);

        let angle = 0;

        this.input.on('pointermove', (pointer) =>{
            angle = Phaser.Math.Angle.BetweenPoints(tee, pointer);
            putt.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, tee.x, tee.y - 100, angle, 128);
            graphics.clear().strokeLineShape(line);
        });

        this.input.on('pointerup', () =>{
            golf.enableBody(true, tee.x, tee.y - 100, true, true);
            this.physics.velocityFromRotation(angle, 600, golf.body.velocity);
        });

        //platform implementation
        const platform = this.add.tileSprite(400, 300, 100 * 10, 100, 'grass');
        this.physics.add.existing(platform, true);

        //colliders
        this.physics.add.collider(golf, platform);
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
    scene:[Test],
    title: "Physics"
});