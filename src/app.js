import Twit from 'twit';
import config from './config';
import RetweetBot from './classes/RetweetBot';
import TweetBot from './classes/TweetBot';

let announcements = [
    'Si tienes medicinas disponibles para quien las necesite, inicia tu tweet con "DISPONIBLE", si estás buscando, inicia tu tweet con "BUSCO" para hacer más claras las intenciones de tu tweet y sacar mayor provecho de esta cuenta.'
];

let conn = new Twit(config);

let rts = new RetweetBot(conn, '#serviciopublico', true);
let tweets = new TweetBot(conn, announcements);

tweets.start();
rts.start();