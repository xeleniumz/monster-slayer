function getRandomValue(min,max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0, 
            winner: null,
            logs: [],
        };
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth < 0 ? '0%' : this.monsterHealth + '%'};
        },
        playerBarStyles() {
            return {width: this.playerHealth < 0 ? '0%' : this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },
    methods: {
        startGame() {
            this.playerHealth =  100,
            this.monsterHealth = 100,
            this.currentRound = 0, 
            this.winner = null;
            this.logMsg = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.attackLog('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8,15);
            this.playerHealth -= attackValue;
            this.attackLog('monster','attack',attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.attackLog('player','special-attack',attackValue);
            this.attackPlayer();
        },
        healthPlayer() {
            this.currentRound++;
            const healthValue = getRandomValue(8,20);
            if(this.playerHealth + healthValue > 100) {
                this.playerHealth = 100;
            }else{
                this.playerHealth += healthValue; 
            }
            this.attackLog('player','health',healthValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        attackLog(by,type,value) {
            this.logs.unshift({
                by,
                type,
                value,
            });
        },
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0){
                // draw
                this.winner = 'draw';
            }else if(value <= 0){
                // player lose
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0){
                // draw
                this.winner = 'draw';
            }else if(value <= 0){
                // monster lose
                this.winner = 'player';
            }
        }
    }
}).mount("#game");