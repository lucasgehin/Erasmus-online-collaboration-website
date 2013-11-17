# Imports
DB = require "../../connect_database"
# Define

get_news_list = (callback)->
	sql = """
		SELECT *
		FROM news
		ORDER BY id DESC
	"""

	params = []

	next = (err, rows , fields)->
		if err
			console.warn err
		else
			callback rows

	DB.query sql, params, next

# Exports

exports.get_news_list = get_news_list