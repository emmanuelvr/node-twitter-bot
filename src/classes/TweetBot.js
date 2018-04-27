export default class Tweet {

    constructor(conn, tweets = [], interval = 3600000) {
        // Setup initial values
        this.conn = conn; // Twit instance
        this.tweets = tweets;
        this.index = 0;
        this.interval = interval;
    }

    start() {
        if(this.tweets.length == 0) {
            console.error('Can\'t start queue without tweets.');
            return;
        }

        console.log('Starting TweetBot...');

        this.handleTweets();
        this.queue = setInterval(this.handleTweets, this.interval);
    }

    stop() {
        clearInterval(this.queue);
    }

    handleTweets() {
        this.tweet(this.tweets[this.index]);

        let newIndex = this.index + 1;

        if(newIndex < this.tweets.length) {
            this.index = newIndex;
        } else {
            this.index = 0;
        }
    }

    handleTweet(err, data) {
        if(err) {
            console.error('Something went wrong posting the tweet: ', err.message);
            return;
        }
        console.log(`Tweet sent: ${data.text}`);
    }

    tweet(tweet) {
        this.conn.post('statuses/update', { status: tweet }, this.handleTweet);
    }
}