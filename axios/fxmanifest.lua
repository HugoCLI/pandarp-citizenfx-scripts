-- Resource Metadata
fx_version 'cerulean'
games { 'gta5' }

author 'Axios'
description 'base Axios'
version '1.0.0'

-- What to run
client_scripts {
    "configuration.js",
    "**/clients/**/*.js",
    "**/clients/**/*.lua",
}
server_script {
    "configuration.js",
    '@mysql-async/lib/MySQL.lua',
    "**/servers/**/*.js",
    "**/servers/**/*.lua",
}

