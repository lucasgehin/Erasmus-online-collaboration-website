mysql -uipviope -pipviope -e 'drop database ipviope; create database ipviope;'
node force_database_reset.js  
node inject_data_status.js 
node inject_data_country.js 
node inject_data_project.js 
node inject_data_user.js 
node inject_data_news.js
node inject_data_event.js
node inject_data_rooms.js

mysql -uipviope -pipviope ipviope < Rainbow.dump 
