// startJobs.js
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger'); // Use Winston for logging

const jobsDirectory = path.join(__dirname, 'jobs');

fs.readdirSync(jobsDirectory).forEach((file) => {
    if (file.endsWith('.js')) {
        const jobPath = path.join(jobsDirectory, file);
        const job = require(jobPath);
        
        if (job && typeof job.start === 'function') {
            job.start();
            logger.info(`Started job: ${file}`);
        } else {
            logger.error(`Failed to start job: ${file}`);
        }
    }
});
