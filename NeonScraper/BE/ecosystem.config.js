// ecosystem.config.js
module.exports = {
    apps: [
        {
            name: 'server',
            script: './index.ts', // Path to your server entry file
            watch: true, // Optional: enable watching for changes
            instances: 1, // Number of instances to run
            autorestart: true, // Automatically restart on crash
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'scraper',
            script: './scraper/script.ts', // Path to your scraper entry file
            watch: true, // Optional: enable watching for changes
            instances: 1, // Number of instances to run
            autorestart: true, // Automatically restart on crash
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};