fx_version 'cerulean'
games { 'gta5' }

author 'Axios'
description 'base Axios'
version '1.0.0'

ui_page 'nui/main.html'

files {
	'nui/main.html',
    'nui/styles.css',
    'nui/inputs.css',
    'nui/listeners.js',
    'nui/elements.js',
    'nui/__init__.js',
}
client_scripts {
	'*.lua',
}