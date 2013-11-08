spawn = require('child_process').spawn

fs = require "fs"
path = require "path"

next = (err, files, current_path)->
	if not err
		for file in files
			if file isnt "node_modules"
				file_path = current_path+file
				compile file_path


current_path = '.'

fs.readdir current_path, (err, files)->
	next err, files, ''


compile = (file)->
	
	fs.lstat file, (err, stat)->

		if stat.isDirectory()
			fs.readdir file, (err, files)->
				next err, files, file+'/'

		else if stat.isFile()
			ext = file[-7..-1]
			
			if ext is ".coffee"

				exec = 'coffee'
				exec = "coffee.cmd" if process.platform is "win32"			
				
				coffee = spawn exec, ["-c", file]
				coffee.stderr.on 'data', (data) ->
					process.stderr.write data.toString()
				coffee.stdout.on 'data', (data) ->
					console.log data.toString()
				coffee.on 'error', (data) ->
					console.trace data.toString()
