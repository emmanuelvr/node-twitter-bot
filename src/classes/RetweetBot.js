export default class RetweetBot {

    constructor(conn, params, followRetweetedUser = false) {
        // Setup initial values
        this.conn = conn; // Twit instance
        this.params = params;
        this.followRetweetedUser = followRetweetedUser;
    }

    start() {
        console.log('Starting RetweetBot...');

        let stream = this.conn.stream('statuses/filter', { track: this.params });
        
        let self = this;

        stream.on('tweet', (tweet) => {       
            if(!tweet.retweeted) {
                self.conn.post('statuses/retweet/:id', { id: tweet.id_str }, self.retweeted);
            } else {
                console.error('This tweet was already retweeted.');
            }

            if(self.followRetweetedUser) {
                self.followUser(tweet.user.screen_name);
            }
        });
    }

    retweeted(err, data) {
        if(err) {
            console.error('This tweet was already retweeted.');
            return;
        }
        console.log(`Tweet retweeted:  ${data.text}.`);
    }

    followUser(screen_name) {
        this.conn.post('friendships/create', { screen_name }, (err) => {
            if(err) {
                console.error('Something went wrong following an user.');
                return;
            }
            console.log(`Now following: @${screen_name}.`);
        });
    }

    toggleFollow() {
        this.followRetweetedUser = !this.followRetweetedUser;
        console.log(`followRetweetedUser set to ${this.followRetweetedUser}.`);
    }
}