// Insert Time Stamp before each console. call
require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

module.exports = {
    morganFormat: () => {
        const dateFormat = require('../node_modules/dateformat');
        return dateFormat(new Date(), 'dd/mm/yyyy HH:MM:ss.l');
    }
}
